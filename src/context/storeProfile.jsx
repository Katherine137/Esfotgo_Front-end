import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"

const getAuthHeaders = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser?.state?.token}`,
        },
    }
}


const storeProfile = create((set) => ({
        
    user: null,
    clearUser: () => set({ user: null }),
    profile: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const respuesta = await axios.get(url, getAuthHeaders())
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
        }
    },

    updateProfile: async (url, data) => {
        try {
            const respuesta = await axios.put(url, data, getAuthHeaders())
            set({ user: respuesta.data })
            toast.success("Perfil actualizado correctamente") 
            return respuesta
        } catch (error) {
            console.log(error)
            const mensaje = error.response?.data?.msg || "Error al actualizar el perfil"
            toast.error(mensaje)
            throw error
        }
    },

    updatePasswordProfile: async (url, data) => {
        try {
            const respuesta = await axios.put(url, data, getAuthHeaders())
            toast.success("Contraseña actualizada correctamente") 
            return respuesta
        } catch (error) {
            console.log(error)
            const mensaje = error.response?.data?.msg || "Error al actualizar la contraseña"
            toast.error(mensaje)
            throw error
        }
    }
    })
)

export default storeProfile
