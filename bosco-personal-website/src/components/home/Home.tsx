/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import TopComponent from "./components/TopComponent";
import MiddleComponent from "./components/MiddleComponent";
import BottomComponent from "./components/BottomComponent";

// http://localhost:3000/login?eon=cheungtszlai0918@gmail.com&p=Bc010918
export default function Home() {
    const navigate = useNavigate();

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
        <div className="flex flex-col w-full max-w-[355px] sm:max-w-[355px] md:max-w-[355px] lg:max-w-[910px] mx-auto">
            <TopComponent />
            <MiddleComponent />
            <BottomComponent />
        </div>
    );
}