import { useEffect, useReducer, useState } from "react";
import { TYPES } from "../actions/todosActions";
import {todosInicialState, todosReducer} from '../reducers/todosReducer'

function useLocalStorage(dataName, initialValue) {

    const [state, dispacth] = useReducer(todosReducer,todosInicialState);
   const {todos} = state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    let parsedData
    
    useEffect(() => {
       
        try {
            setTimeout(() => {
                const localStorageData = localStorage.getItem(dataName);
                
                if (!localStorageData || localStorageData==='undefined') {
                    localStorage.setItem(dataName, JSON.stringify(initialValue));
                    parsedData = initialValue
                } else {
                    parsedData = JSON.parse(localStorageData)
                    dispacth({type: TYPES.FETCH_DATA_FROM_LOCALSTORAGE,payload: parsedData}) 
                }
               
                setIsLoading(false);
            }, 1000)
        }
        catch (error) {
            setError(error)
        }
        
    },[])

    const saveNewData = (newData) => {
        
        localStorage.setItem(dataName, JSON.stringify(newData));
        
    }
    

    return { todos,saveNewData, isLoading, error,dispacth}
}


export { useLocalStorage }