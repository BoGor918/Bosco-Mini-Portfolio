/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface MapperContextType {
    authUser: any;
}

export const MapperContext = createContext<MapperContextType>({
    authUser: null,
});

export default function MapperContextProvider(props: any) {
    const [authUser, setAuthUser] = useState<any>(null);

    // set logged user data for authentication
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    return (
        <MapperContext.Provider value={{
            authUser,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}