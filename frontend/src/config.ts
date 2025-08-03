export const { VITE_BACKEND_URL = "http://localhost:3000" } = import.meta.env;

export const authUrl = `${VITE_BACKEND_URL}/api/v1/auth`;
export const templatesUrl = `${VITE_BACKEND_URL}/api/v1/templates`;