"use client"
import { httpAxios } from "@/db/httpHelper";
import { toast } from "react-toastify";

const { createContext, useState, useEffect, useContext } = require("react");

export const UserContext = createContext({})

export const UserProvider = ({children}) => {
    
    const [user,setUser] = useState(undefined);

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await httpAxios.get('/api/current');
                // console.log(currentUser);
                if (currentUser?.data?.success) {
                    setUser({...currentUser})
                }
                else{
                    setUser(undefined)
                }
            } catch (error) {
                console.log(error);
                setUser(undefined);
                toast.error("Error in Current User");
            }
        }
        init();

    return (() => {
        init();
    }) 
    },[])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}