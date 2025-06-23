#!/bin/bash
set -e

# Gera identificador único
RAND=$RANDOM
CONTAINER=brevly-pg-e2e-$RAND
DB=brevly_test_$RAND
USER=postgres
PASS=postgres
PORT=55432

# Sobe o container
docker run --name $CONTAINER -e POSTGRES_USER=$USER -e POSTGRES_PASSWORD=$PASS -e POSTGRES_DB=$DB -p $PORT:5432 -d postgres:15

# Espera o banco subir
npx wait-port $PORT

# Exporta a URL para os comandos seguintes
export DATABASE_URL=postgres://$USER:$PASS@localhost:$PORT/$DB

# Migra e roda os testes
pnpm run migrate:test
dotenv -e .env.test -- vitest run src/controllers/*.e2e.spec.ts

# Derruba o container ao final
docker rm -f $CONTAINER 