import React, { createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext()

const ContextApi=(({children})=>{

const [currency, setCurrency]= useState("INR");
const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
    }, [currency]);

    //useEffect does is that whenever our app or component is rendered it gonne run whatever is in our useEffect
    //useEffect will run evevry time as our currency changes so add currency in the list of dependencies so whenever currency changes if else will run


  return <Crypto.Provider value={{currency,symbol,setCurrency}}>{children}</Crypto.Provider>

  //Provider is a component that provides the state to its children. It will hold the "store" and be the parent of all the components that might need that store.
  //Consumer is a component that consumes and uses the state
  
})

const CryptoState= ()=>{
    return useContext(Crypto);
}

export default ContextApi;
export {CryptoState};

//to export our state to whole of our aap we use useContext hook and useContext will take the context that we have created i.e. Crypto

