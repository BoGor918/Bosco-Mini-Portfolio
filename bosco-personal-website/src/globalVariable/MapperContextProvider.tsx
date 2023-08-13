/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, createContext, useEffect } from "react";
// firebase
import { auth, firestore } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'

// variable interface
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

// create context
export const MapperContext = createContext<MapperContextType>({
    userArray: [],
    authUser: null,
    companyData: [],
    schoolData: [],
    projectData: [],
    skillData: [],
    techStackDataSet: [],
    openURL: () => { },
});

export default function MapperContextProvider(props: any) {
    // auth user
    const [authUser, setAuthUser] = useState<any>(null);
    // user data
    const [userData, setUserData] = useState<{ id: string }[]>([]);
    // set compareuser data
    const userArray = [
        userData.map((user: any) => user.Username),
        userData.map((user: any) => user.Email),
        userData.length,
    ]
    // company data
    const [companyData, setCompanyData] = useState<{ id: string }[]>([]);
    // school data
    const [schoolData, setSchoolData] = useState<{ id: string }[]>([]);
    // project data
    const [projectData, setProjectData] = useState<{ id: string }[]>([]);
    // skill data
    const [skillData, setSkillData] = useState<{ id: string }[]>([]);
    // tech stack data
    const techStackDataSet = skillData.map((skill: any) => skill.SkillName)
    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")
    // get company collection from firestore
    const companyCollectionRef = collection(firestore, "Company")
    // get school collection from firestore
    const schoolCollectionRef = collection(firestore, "School")
    // get project collection from firestore
    const projectCollectionRef = collection(firestore, "Project")
    // get skill collection from firestore
    const skillCollectionRef = collection(firestore, "Skill")

    // set logged user data for authentication
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    // get user data from firestore
    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)
            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    }, [authUser])

    // get company, school, project, and skill data from firestore
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

    // open url function
    const openURL = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        // pass the value in provider and return
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