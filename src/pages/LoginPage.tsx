import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { loginService } from '../services/authService';

export function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await loginService({
                email,
                password,
                admin: isAdmin,
            });

            // Redireciona para a página principal após obter o token
            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocorreu um erro inesperado ao autenticar!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-200">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">HelpDesk</h1>
                    <p className="text-sm text-slate-500 mt-1">Acesse sua conta para continuar</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@helpdesk.local"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="checkbox"
                            id="adminCheckbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="adminCheckbox" className="text-sm text-slate-600 select-none cursor-pointer">
                            Entrar como Administrador
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
                    Credenciais didáticas: <br />
                    <code>usuario@helpdesk.local / Usuario@123</code>
                </div>
            </div>
        </div>
    );
}