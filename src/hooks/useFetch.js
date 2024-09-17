//the custom Hook function must start with "use"
//this custom hook should not just send some requests, instead,it should also manage all the related states.Sooo to make this hook useful and reusable,we should also import useState here 
import { useEffect, useState } from "react";

export function useFetch (fetchFn, initialValue) {
    const [isFetching , setIsFetching]= useState();
    const [error , setError] = useState();
    const [fetchedData , setFetchedData] = useState(initialValue);



    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn();
            setFetchedData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);

      //here we can return an array or an object it's up to u ..or return a number but here we have 3 state values so i choose a object 
      return {
        isFetching ,
        error,
        fetchedData,
        setFetchedData

      }

    
}