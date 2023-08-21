/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// page components
import TopComponent from "./components/TopComponent";
// import MiddleComponent from "./components/MiddleComponent";
// import BottomComponent from "./components/BottomComponent";

export default function Home() {
    // navigate hook
    const navigate = useNavigate();

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

    return (
        <div className="bg-white dark:bg-[#0B1A33] flex flex-col">
            {/* page components */}
            <TopComponent />
            {/* <MiddleComponent />
            <BottomComponent /> */}
        </div>
    );
}