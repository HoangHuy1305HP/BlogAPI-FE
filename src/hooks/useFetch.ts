import {useState, useEffect} from 'react';

export function useFetch<T>(fetchFn: () => Promise<T>, dep: unknown[]) {
    const [data,setData] = useState<T|null>(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string|null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const result = await fetchFn();
                setData(result)
            } catch (error) {
                if(error instanceof Error) {
                    setError(error.message)
                }
            }
            finally {setLoading(false)}
        }
        fetchData()
    },[...dep])
    return {data,loading,error}
}