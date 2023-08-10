/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase";


interface MapperContextType {
    userArray: any;
    authUser: any;
    companyData: any;
    schoolData: any;
}

export const MapperContext = createContext<MapperContextType>({
    userArray: [],
    authUser: null,
    companyData: [],
    schoolData: [],
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

    const [companyData, setCompanyData] = useState<{ id: string }[]>([]);
    const [schoolData, setSchoolData] = useState<{ id: string }[]>([]);
    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")

    // get company info
    const companyCollectionRef = collection(firestore, "Company")
    const schoolCollectionRef = collection(firestore, "School")

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

    useEffect(() => {
        const q = query(companyCollectionRef, orderBy("CreateDate", "desc"));
        const w = query(schoolCollectionRef, orderBy("CreateDate", "desc"));
        onSnapshot(q, (snapshot) =>
        setCompanyData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        onSnapshot(w, (snapshot) =>
        setSchoolData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    }, [authUser]);

    return (
        <MapperContext.Provider value={{
            userArray,
            authUser,
            companyData,
            schoolData,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}