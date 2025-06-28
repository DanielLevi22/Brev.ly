#!/bin/bash

# Script de backup automático do banco de dados Brev.ly
# Este script faz backup do PostgreSQL e envia para S3

set -e

# Configurações
BACKUP_DIR="/tmp/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="brevly_backup_${DATE}.sql"
COMPRESSED_FILE="${BACKUP_FILE}.gz"
S3_PATH="s3://${BACKUP_S3_BUCKET}/database-backups/"

# Criar diretório de backup
mkdir -p ${BACKUP_DIR}

echo "Iniciando backup do banco de dados em $(date)"

# Fazer backup do PostgreSQL
echo "Executando pg_dump..."
pg_dump \
  --host=postgres \
  --port=5432 \
  --username=${POSTGRES_USER} \
  --dbname=${POSTGRES_DB} \
  --verbose \
  --clean \
  --no-owner \
  --no-privileges \
  > ${BACKUP_DIR}/${BACKUP_FILE}

# Verificar se o backup foi criado com sucesso
if [ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
    echo "ERRO: Backup não foi criado!"
    exit 1
fi

# Comprimir o backup
echo "Comprimindo backup..."
gzip ${BACKUP_DIR}/${BACKUP_FILE}

# Verificar se a compressão foi bem-sucedida
if [ ! -f "${BACKUP_DIR}/${COMPRESSED_FILE}" ]; then
    echo "ERRO: Compressão falhou!"
    exit 1
fi

# Enviar para S3
echo "Enviando backup para S3..."
aws s3 cp ${BACKUP_DIR}/${COMPRESSED_FILE} ${S3_PATH}${COMPRESSED_FILE}

# Verificar se o upload foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "Backup enviado com sucesso para S3: ${S3_PATH}${COMPRESSED_FILE}"
else
    echo "ERRO: Falha no upload para S3!"
    exit 1
fi

# Limpar arquivos temporários
echo "Limpando arquivos temporários..."
rm -f ${BACKUP_DIR}/${COMPRESSED_FILE}

# Manter apenas os últimos 7 backups no S3
echo "Removendo backups antigos (mantendo apenas os últimos 7 dias)..."
aws s3 ls ${S3_PATH} | \
  awk '{print $4}' | \
  sort -r | \
  tail -n +8 | \
  xargs -I {} aws s3 rm ${S3_PATH}{} || true

echo "Backup concluído com sucesso em $(date)"

# Log de sucesso
echo "$(date): Backup realizado com sucesso - ${COMPRESSED_FILE}" >> /var/log/backup.log 