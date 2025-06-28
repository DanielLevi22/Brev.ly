module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação, ponto e vírgula, etc
        'refactor', // Refatoração
        'perf',     // Melhoria de performance
        'test',     // Adicionando ou corrigindo testes
        'build',    // Build do sistema ou dependências externas
        'ci',       // Mudanças em CI/CD
        'chore',    // Outras mudanças que não afetam src ou test
        'revert'    // Reverte um commit anterior
      ]
    ],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  }
}; 