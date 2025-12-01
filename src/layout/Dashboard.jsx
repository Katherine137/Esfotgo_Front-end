import { Link, Outlet, useLocation } from "react-router-dom"
import storeAuth from "../context/storeAuth"
import storeProfile from "../context/storeProfile"

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { clearToken } = storeAuth()
    const { user } = storeProfile()

    return(
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex justify-between items-center px-4 md:px-6">
                <img className="h-28 w-auto object-contain" src="/dragon_logo_2.png" alt="" />

                <div className='flex justify-center items-center gap-4 mp-4 text-md font-semibold text-black'>  Usuario - {user?.nombre} 
                    <img className="h-15 w-auto object-contain rounded-full border-black border-2" src="/Buho_1.png" alt="usuario" />
                </div>
                    
                <Link to="/" className="bg-red-700 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-800 hover:scale-105 transition-transform duration-200" onClick={() => clearToken()}>Salir</Link>

            </div>
            
            <div className="flex mt-16 justify-center">
                <div className='md:w-1/5 bg-white px-5 py-4'>
                    <img className="h-auto w-auto rounded-full border-black border-2" src="/Buho_1.png" alt="usuario" />
    
                    <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span>  Bienvenido - {user?.nombre}</p>

                    <p className='text-slate-400 text-center my-4 text-sm'> Rol - {user?.rol}</p>

                    <div className="flex gap-5">
                        <div className="w-28 text-center h-12 rounded-lg border-white border-2 shadow-lg hover:bg-blue-400">
                            <Link to='/dashboard' 
                                className={`${urlActual === '/dashboard' ? 'text-blue-950 text-center' : 'text-shadow-blue-950'} text-xl block mt-2`}>Dashboard</Link>
                        </div>

                        <div className="w-28 text-center h-12 rounded-lg border-white border-2 shadow-lg hover:bg-blue-400">
                            <Link to='/dashboard/profile' 
                                className={`${urlActual === '/dashboard/profile' ? 'text-blue-950 text-center' : 'text-shadow-blue-950'} text-xl block mt-2`}> Perfil </Link>
                        </div>
                        
                        <div className="w-28 text-center h-12 rounded-lg border-white border-2 shadow-lg hover:bg-blue-400">
                            <Link to='/dashboard/event' 
                                className={`${urlActual === '/dashboard/event' ? 'text-blue-950 text-center' : 'text-shadow-blue-950'} text-xl block mt-2`}>Eventos</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='overflow-y-scroll p-8'>
                <Outlet />
            </div> 
            <div className="bg-gray-900 text-white mt-auto">
                <div className=" max-w-7xl mx-auto px-4 py-8 border-t border-gray-800 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2025 ESFOTgo. Todos los derechos reservados. | Desarrollado con estudiantes para la comunidad ESFOT                            </p>
                </div>
            </div>
        </div>
    )
}
export default Dashboard