import { useEffect, useState } from "react";
import axios from "axios";
import { authAxios, authenticationService } from "../services/authentication-services";

export const useFetch=(endpoint, initialData=[])=>{
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPosts();
    }, [])


    const fetchPosts = async () => {
        setLoading(true);

        try {
            let ax = axios
            if (authenticationService.isAuthenticated){
                ax = authAxios
            }
            const res = await ax.get(endpoint);
            const data = res.data
            setData(data)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error
    }

}
