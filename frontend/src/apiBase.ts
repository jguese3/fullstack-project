// apiBase.ts — resolves the correct backend URL (localhost or Codespaces)
export const getApiBase = (): string => {
  const { hostname, protocol } = window.location;
  const match = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);
  if (match) return `${protocol}//${match[1]}-3001.app.github.dev/api`;
  return 'http://localhost:3001/api';
};

export const API_BASE = getApiBase();
