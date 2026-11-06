import { Link, NavLink } from 'react-router'

export function Navbar(){

    const linkClass = "rounded-lg px-3 py-2 transition"

    return (
        <nav className='bg-slate-900 text-white'>
            
            <div className='mx-auto flex max-w-6xl 
                items-center justify-between px-6 py-4'>
                
                <Link to="/" className='text-xl font-bold'>
                    HelpDesk Lite
                </Link>

                <div className='flex gap-4'>

                    <NavLink to="/" end className={ ({isActive}) => 
                        `${linkClass} ${
                            isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                    }>
                        Inicio
                    </NavLink>

                    <NavLink to="/chamados" className={ ({isActive}) => 
                        `${linkClass} ${
                            isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                    }>
                        Chamados
                    </NavLink>

                    <NavLink to="/chamado/novo" className={ ({isActive}) => 
                        `${linkClass} ${
                            isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                    }>
                        Novo Chamado
                    </NavLink>          
                </div>

            </div>
        </nav>
    )

}