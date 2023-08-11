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
    projectData: any;
    skillData: any;
    techStackDataSet: any;
    openURL: (url: string) => void;
}

export const MapperContext = createContext<MapperContextType>({
    userArray: [],
    authUser: null,
    companyData: [],
    schoolData: [],
    projectData: [],
    skillData: [],
    techStackDataSet: [],
    openURL: () => {},
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
    const [projectData, setProjectData] = useState<{ id: string }[]>([]);
    const [skillData, setSkillData] = useState<{ id: string }[]>([]);

    const techStackDataSet = skillData.map((skill: any) => skill.SkillName)
    

    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")

    // get company info
    const companyCollectionRef = collection(firestore, "Company")
    const schoolCollectionRef = collection(firestore, "School")
    const projectCollectionRef = collection(firestore, "Project")
    const skillCollectionRef = collection(firestore, "Skill")

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
        const r = query(projectCollectionRef, orderBy("CreateDate", "desc"));
        const t = query(skillCollectionRef, orderBy("CreateDate", "desc"));
        onSnapshot(q, (snapshot) =>
            setCompanyData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        onSnapshot(w, (snapshot) =>
            setSchoolData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        onSnapshot(r, (snapshot) =>
            setProjectData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        onSnapshot(t, (snapshot) =>
            setSkillData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    }, [authUser]);

    const openURL = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        <MapperContext.Provider value={{
            userArray,
            authUser,
            companyData,
            schoolData,
            projectData,
            skillData,
            techStackDataSet,
            openURL
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}