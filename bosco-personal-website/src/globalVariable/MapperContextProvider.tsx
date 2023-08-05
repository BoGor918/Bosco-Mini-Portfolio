/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase";


interface MapperContextType {
    userArray: any;
    authUser: any;
}

export const MapperContext = createContext<MapperContextType>({
    userArray: [],
    authUser: null,
});

export default function MapperContextProvider(props: any) {
    const [userData, setUserData] = useState<{ id: string }[]>([]);
    const [authUser, setAuthUser] = useState<any>(null);

    // set all user data
    const userArray = [
        userData.map((user: any) => user.Username),
        userData.map((user: any) => user.Email),
        userData.length,
    ]

    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")

    // set logged user data for authentication
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)
            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    }, [authUser])

    console.log(authUser?.email)

    return (
        <MapperContext.Provider value={{
            userArray,
            authUser,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}