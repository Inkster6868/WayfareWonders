import {useState,useEffect} from "react";

const useFetch= (url)=>{

    const[data,setData]=useState([]); /* initially data is not present */
    const[error,seterror]=useState(null)
    const[Loading,setLoading]=useState(false) /* initially it is not loading  */

    /* now when the first time this page renders then we perform this operation and on the change of the url */
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);

        try {
            const res =await fetch(url);

            if(!res.ok) {
                seterror('failed to fetch');
            }
            const result=await res.json()
            setData(result.data);   /* the data received from the backend */
            setLoading(false);
        } catch (error) {
                seterror(error.message);
                setLoading(false);
        }
    }
    fetchData();
    },[url])

    return{
        data,
        error,
        Loading
    }

}

export default useFetch;