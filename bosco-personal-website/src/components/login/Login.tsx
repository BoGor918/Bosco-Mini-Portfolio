import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  const login = () => {
    const email = prompt("Email:", "") || "";
    const password = prompt("Password:", "") || "";

    signInWithEmailAndPassword(auth, email, password);

    navigate("/");
  };

  login();
  return (
    <></>
  )
}
