module.exports = {
  // Apenas arquivos do projeto, não dependências
  '*.{js,ts,tsx}': (filenames) => {
    // Filtrar apenas arquivos do projeto
    const projectFiles = filenames.filter(
      (file) =>
        !file.includes('node_modules') &&
        !file.includes('.pnpm') &&
        (file.startsWith('server/') || file.startsWith('web/') || file.startsWith('docs/') || file.startsWith('.github/') || file === '.lintstagedrc.js' || file === 'commitlint.config.js')
    );

    if (projectFiles.length === 0) return [];

    return [
      `prettier --write --ignore-unknown ${projectFiles.join(' ')}`
    ];
  },

  '*.{json,md,yml,yaml}': (filenames) => {
    // Filtrar apenas arquivos do projeto
    const projectFiles = filenames.filter(
      (file) =>
        !file.includes('node_modules') &&
        !file.includes('.pnpm') &&
        (file.startsWith('server/') || file.startsWith('web/') || file.startsWith('docs/') || file.startsWith('.github/') || file === 'package.json' || file === 'pnpm-workspace.yaml' || file === '.releaserc.json')
    );

    if (projectFiles.length === 0) return [];

    return [
      `prettier --write --ignore-unknown ${projectFiles.join(' ')}`
    ];
  }
}; 