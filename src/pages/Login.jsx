import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../hooks/useFetch'
import { ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form'
import storeAuth from "../context/storeAuth";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }} = useForm()
    const fetchDataBackend = useFetch()
    const { setToken, setRol } = storeAuth()

    const loginUser = async(dataForm) =>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/login`
        const response = await fetchDataBackend(url, dataForm, "POST")
        setToken(response.token)
        setRol(response.Rol)
        if(response){
            navigate('/dashboard')
        }
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <ToastContainer/>
            
            <div className="hidden sm:block sm:w-1/2 bg-[url('./assets/dragon.png')] bg-cover bg-center"></div>
            <div className="bg-linear-to-b from-blue-950 to-rose-950 w-full sm:w-1/2 flex justify-center items-center bg-white p-4">
            
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-slate-500">Bienvenido(a)</h1>
                
                    <p className="text-blue-300 text-center my-4">Por favor ingrese sus credenciales</p>

                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo"
                                className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-1 text-neutral-950"
                                {...register("email", { required: "El correo es obligatorio" })}
                            />
                                {errors.email && <p className="text-red-900">{errors.email.message}</p>}
                        </div>

                        <div className="mb-3">
                            
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-blue-300 px-2 py-1 pr-10"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                    {errors.password && <p className="text-red-900">{errors.email.message}</p>}

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-950 hover:text-neutral-950"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl 
                            hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</button>
                    </form>

                    <button className="w-full mt-5 flex items-center justify-center border py-2 rounded-xl text-sm hover:bg-black hover:text-white">
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" />
                        Iniciar sesión con Google
                    </button>

                    <div className="mt-3 flex justify-between text-sm">
                        <Link to="/forgot/id" className="text-neutral-950 hover:text-blue-900 font-medium">  ¿Olvidaste tu contraseña? </Link>
                        <Link to="/" className="text-neutral-950 hover:text-blue-900 font-medium">Hogar</Link>
                        <Link to="/dashboard" className="text-neutral-950">dash</Link>
                    </div>
                    <br />
                    <div className="flex justify-center">
                    <Link to="/Register" className="block w-24 py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300">Registrarse </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;