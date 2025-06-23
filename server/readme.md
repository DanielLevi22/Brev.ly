# Automação Local e CI/CD

## Scripts disponíveis

- `pnpm db:test:up`: Sobe o banco de dados de teste via Docker.
- `pnpm db:test:down`: Para o banco de dados de teste.
- `pnpm db:migrate:test`: Executa as migrações no banco de teste.
- `pnpm test:full`: Sobe o banco de teste, executa as migrações, roda todos os testes e derruba o banco ao final.

## Como rodar os testes localmente

1. Suba o banco de teste:
   ```sh
   pnpm db:test:up
   ```
2. Rode as migrações:
   ```sh
   pnpm db:migrate:test
   ```
3. Execute os testes:
   ```sh
   pnpm test
   ```
4. Pare o banco de teste:
   ```sh
   pnpm db:test:down
   ```

Ou rode tudo de forma automatizada:
```sh
pnpm test:full
```

## Integração Contínua (CI)

O workflow do GitHub Actions já está configurado para:
- Subir o banco de teste isolado
- Rodar migrações
- Executar todos os testes

Certifique-se de manter as variáveis de ambiente e secrets atualizadas no repositório para garantir a segurança e funcionamento do pipeline.

---

Para dúvidas ou problemas, consulte a documentação ou abra uma issue. 

sudo lsof -i :5432 

docker ps -a 

docker rm brevly_test_db 