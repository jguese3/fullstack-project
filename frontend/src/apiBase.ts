

export const getApiBase = (): string => {
  const { hostname, protocol } = window.location;

  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);

  if (codespacesMatch) {
    const baseName = codespacesMatch[1];
    return `${protocol}//${baseName}-3001.app.github.dev/api`;
  }

  return 'http://localhost:3001/api';
};

export const API_BASE = getApiBase();
