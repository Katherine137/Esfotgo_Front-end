// useFetch.js
import axios from "axios"
import { toast } from "react-toastify"


export function useFetch() {

    const fetchDataBackend = async (url, data=null, method="GET", headers = {}) => 
        {
            // 1. INICIO: Mostrar Toast de Carga
            const loadingToast = toast.loading("Procesando solicitud...")
            
            try {
                const options = {
                    method,
                    url,
                    headers: {
                        "Content-Type": "application/json",
                        ...headers,
                    },
                    data
                }
                const response = await axios(options)
                
                // 2. ÉXITO: Descartar Toast de Carga y Mostrar Éxito
                toast.dismiss(loadingToast)
                toast.success(response?.data?.msg || "Operación exitosa")
                
                return response?.data // Retorna los datos para que 'loginUser' navegue

            } catch (error) {
                // 3. FALLO: Descartar Toast de Carga y Mostrar Error
                toast.dismiss(loadingToast)
                console.error("Error en la petición:", error)
                
                // Extraer el mensaje de error del backend (si existe) o usar un genérico
                const errorMessage = error.response?.data?.msg || "Error de conexión o credenciales incorrectas.";
                toast.error(errorMessage)
                
                // **IMPORTANTE**: Retornar explícitamente 'null' o 'false' en caso de error
                return null; 
            }
    }
    return fetchDataBackend
}