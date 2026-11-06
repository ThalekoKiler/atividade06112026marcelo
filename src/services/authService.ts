const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface LoginCredentials {
    email: string;
    password: string;
    admin?: boolean;
}

export interface AuthResponse {
    access_token: string;
}

export async function loginService(credentials: LoginCredentials): Promise<string> {
    const payload: Record<string, unknown> = {
        email: credentials.email,
        password: credentials.password
    };

    if (credentials.admin) {
        payload.admin = true;
    }

    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
            throw new Error('Email ou senha incorretos!');
        }
        throw new Error(`Erro no servidor (${response.status})`);
    }

    const data: AuthResponse = await response.json();

    // Persiste o token no storage do navegador
    localStorage.setItem('access_token', data.access_token);

    return data.access_token;
}