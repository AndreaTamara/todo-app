import { useEffect, useState } from "react"

function useLocalStorage(dataName, initialValue) {
    
    const [data, setData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
       
        try {
            setTimeout(() => {
                const localStorageData = localStorage.getItem(dataName);
                let parsedData;
                if (!localStorageData) {
                    localStorage.setItem(dataName, JSON.stringify(initialValue));
                    parsedData = initialValue;
                } else {
                    parsedData = JSON.parse(localStorageData)
                }
                setData(parsedData);
                setIsLoading(false);
            }, 1000)
        }
        catch (error) {
            setError(error)
        }
        
    },[])

    const saveNewData = (newData) => {
        localStorage.setItem(dataName, JSON.stringify(newData));
        setData(newData);
    }
    

    return { data, saveNewData, isLoading, error }
}

export { useLocalStorage }