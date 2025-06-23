# Automação Local, Testes Isolados e CI/CD

## Scripts disponíveis

- `pnpm dev`: Sobe o banco de desenvolvimento via Docker, servidor em modo watch, ambiente sempre limpo.
- `pnpm test:unit`: Executa apenas os testes unitários (sem banco).
- `pnpm test:e2e`: Sobe o banco de teste via Docker Compose, roda migrações, executa E2E e derruba o banco ao final (ambiente compartilhado).
- `pnpm test:e2e:isolated`: **(Recomendado)** Sobe um container PostgreSQL exclusivo para cada execução, roda migrações e testes E2E, e remove o container ao final. Totalmente isolado, ideal para CI/CD e execuções paralelas.
- `pnpm test:full`: Executa unitários + E2E.
- `pnpm migrate:dev|test|prod`: Executa migrações para cada ambiente.
- `pnpm docker:up|down|restart`: Controle manual do Docker Compose.

## Como rodar os testes E2E isolados

1. Execute:
   ```sh
   pnpm run test:e2e:isolated
   ```
   Isso irá:
   - Criar um container PostgreSQL exclusivo para o teste
   - Rodar as migrações
   - Executar todos os testes E2E
   - Remover o container ao final

2. Não é necessário subir/parar banco manualmente. Cada execução é 100% isolada.

## Integração Contínua (CI)

O workflow do GitHub Actions está configurado para:
- Rodar testes E2E em containers isolados
- Garantir ambiente limpo e sem conflitos
- Rodar migrações e todos os testes automaticamente

## Dicas e Troubleshooting

- Se precisar inspecionar containers:
  ```sh
  docker ps -a
  docker logs <nome_do_container>
  docker rm -f <nome_do_container>
  ```
- Se a porta 5432 estiver ocupada, o script isolado usa 55432 por padrão.
- As variáveis de ambiente do banco são geradas automaticamente no script isolado.

---

Para dúvidas ou problemas, consulte a documentação ou abra uma issue.

sudo lsof -i :5432 

docker ps -a 

docker rm brevly_test_db 