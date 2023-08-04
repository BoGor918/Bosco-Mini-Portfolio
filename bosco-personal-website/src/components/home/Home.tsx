/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import TopComponent from "./components/TopComponent";
import MiddleComponent from "./components/MiddleComponent";
import BottomComponent from "./components/BottomComponent";

// http://localhost:3000/login?eon=cheungtszlai0918@gmail.com&p=Bc010918
export default function Home() {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (window.location.pathname === "/login") {
            if (queryParameters.get("eon") !== null && queryParameters.get("p") !== null) {
                if (queryParameters.get("eon")!.includes('.') && queryParameters.get("eon")!.includes('@')) {
                    signInWithEmailAndPassword(auth, queryParameters.get("eon")!, queryParameters.get("p")!)
                        .then(() => {
                            console.log("Signed in as " + auth.currentUser?.email);
                            navigate("/");
                        })
                        .catch((error) => {
                            alert("Invaild email or password, Plz Try Again.");
                            navigate("/");
                        });
                }
            }
        } else if (window.location.pathname === "/logout") {
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
        <div className="flex flex-col w-full max-w-[910px] mx-auto">
            <TopComponent />
            <MiddleComponent />
            <BottomComponent />
        </div>
    );
}