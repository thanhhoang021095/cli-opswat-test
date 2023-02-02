import { useState, useEffect } from 'react';
import api from '../api';

export const useFetch = (url: string, isLoadingApp?: boolean): {
    response: any,
    error: Error,
    isLoading: boolean
} => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await api.get(url);
                
                setResponse(data);
                setIsLoading(false)
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
        
    }, [url, isLoadingApp]);
    return { response, error, isLoading };
};
