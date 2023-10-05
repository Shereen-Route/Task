import { createContext, useEffect, useState } from "react";

   export const customerContext =createContext();

   export function CustomerProvide({children}){
      
    const [Tranactions, setTranactions] = useState(null)
    const [Amount, setAmount] = useState(null)
    useEffect(() => {
     if(localStorage.getItem("tran")){
        let data = localStorage.getItem("tran")
       setTranactions(data)
     }
       if(localStorage.getItem('Amount')){
      let data = localStorage.getItem('Amount')
      setAmount(data)
     }
    }, [])
    
    return <customerContext.Provider value={{Tranactions,setTranactions,setAmount,Amount}}>
       {children}
    </customerContext.Provider>
   }