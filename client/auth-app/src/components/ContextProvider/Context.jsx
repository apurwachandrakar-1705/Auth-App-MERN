import React, { createContext, useState } from 'react'
export const LoginContext = createContext("");
const Context = ({children}) => {
    const[loginData,setLoginData]=useState("")
  return (
    <div>
      <LoginContext.Provider value={{loginData,setLoginData}}>{children}</LoginContext.Provider>
    </div>
  )
}

export default Context
