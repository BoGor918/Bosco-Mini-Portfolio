/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// page components
import TopComponent from "./components/TopComponent";
import MiddleComponent from "./components/MiddleComponent";
import BottomComponent from "./components/BottomComponent";
import Loading from "../loading/Loading";

export default function Home() {
    // navigate hook
    const navigate = useNavigate();
    // loading hook
    const [loading, setLoading] = useState(true);

    // sign out function
    useEffect(() => {
        if (window.location.pathname === "/logout") {
            signOut(auth)
                .then(() => {
                    console.log("Signed out");
                    navigate("/");
                })
                .catch((error) => {
                    alert("Sign-out Failed");
                });
        }
    }, []);

    // loading function
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="bg-white dark:bg-[#0B1A33] flex flex-col overflow-hidden">
                        {/* page components */}
                        <TopComponent />
                        <MiddleComponent />
                        <BottomComponent />
                    </div>
            }
        </>
    );
}