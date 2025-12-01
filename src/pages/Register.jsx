import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../hooks/useFetch"

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const registerUser = async (dataForm) =>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
        await fetchDataBackend(url, dataForm, "POST")
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            
            <ToastContainer/>

            <div className="hidden sm:block sm:w-1/2 bg-[url('/Dragon_1.png')] bg-cover bg-center"></div>

            <div className="bg-linear-to-b from-blue-950 to-rose-950 w-full sm:w-1/2 flex justify-center items-center bg-white p-4">
            
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-slate-500">Bienvenido(a)</h1>
                
                    <p className="text-blue-300 text-center my-4">Por favor ingrese sus datos</p>

                    <form onSubmit={handleSubmit(registerUser)}>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Nombre</label>
                            <input type="text" placeholder="Ingresa tu nombre" className="block w-full rounded-md border
                            border-blue-500  py-1 px-1.5 text-neutral-950"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && <p className="text-red-900">{errors.nombre.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Apellido</label>
                            <input type="text" placeholder="Ingresa tu apellido" className="block w-full rounded-md border
                            border-blue-500 py-1 px-1.5 text-neutral-950"
                            {...register("apellido", { required: "El apellido es obligatorio"})}
                            />
                            {errors.apellido && <p className="text-red-900">{errors.apellido.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Teléfono</label>
                            <input type="text" inputMode="tel" placeholder="Ingresa tu teléfono" className="block w-full 
                            rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                            {...register("teléfono", { required: "El teléfono es obligatorio"})}
                            />
                            {errors.telefono && <p className="text-red-900">{errors.apellido.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                            <input
                            type="email" placeholder="Ingresa tu correo"
                            className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-1 text-neutral-950"
                            {...register("email", {required: "El correo electrónico es obligatorio"})}
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
                                    {...register("password", { required: "La contraseña es obligatoria"})}
                                />
                                    {errors.password && <p className="text-red-900">{errors.password.message}</p>}

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
                        <div className="mb-3">
                            <button className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300">
                            Registrarse</button>
                        </div>
                    </form>

                    <div className="mt-3 flex justify-between text-sm">
                        <p className="text-neutral-950 font-medium">¿Ya tiene una cuenta?</p>
                        <Link to="/Login" className="block w-24 py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300"> Iniciar sesión </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}