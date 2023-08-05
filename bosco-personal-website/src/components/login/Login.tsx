/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useContext, CSSProperties } from 'react'
import { TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
import { MapperContext } from '../../globalVariable/MapperContextProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import PersonalIcon from '../../images/Personal_Icon.png'

export default function Login(): any {
    // Get user data from context
    const {
        userArray,
        authUser
    } = useContext(MapperContext);

    // Login variables
    const loginEmailOrUsername = useRef<HTMLInputElement>(null);
    const loginPassword = useRef<HTMLInputElement>(null);

    // Navigate function
    const navigate = useNavigate()

    // Login function
    const Login = async () => {
        try {
            let haveUsername = false;

            // if user is using email to login
            if (
                loginEmailOrUsername.current &&
                loginEmailOrUsername.current.value &&
                loginEmailOrUsername.current.value.includes('.') &&
                loginEmailOrUsername.current.value.includes('@') &&
                loginPassword.current &&
                loginPassword.current.value
            ) {
                await signInWithEmailAndPassword(
                    auth,
                    loginEmailOrUsername.current.value,
                    loginPassword.current.value
                );
            } else {
                // if user is using username to login
                for (let i = 0; i < userArray[0].length; i++) {
                    if (
                        loginEmailOrUsername.current &&
                        loginEmailOrUsername.current.value &&
                        Object.is(userArray[0][i], loginEmailOrUsername.current.value)
                    ) {
                        if (loginPassword.current && loginPassword.current.value) {
                            await signInWithEmailAndPassword(
                                auth,
                                userArray[1][i],
                                loginPassword.current.value
                            );
                        }

                        haveUsername = true;
                        break;
                    }
                }
                if (!haveUsername) {
                    alert("Invalid Email / Username or Password, Plz Try Again");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Invalid Email / Username or Password, Plz Try Again");
        }
    };

    // Enter key press event and call Login function
    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                Login();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const boxElement = boxRef.current;

        if (!boxElement) {
            return;
        }

        const updateAnimation = () => {
            const angle =
                (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
            boxElement.style.setProperty("--angle", `${angle}deg`);
            requestAnimationFrame(updateAnimation);
        };

        requestAnimationFrame(updateAnimation);
    }, []);

    return (
        authUser !== null ? navigate('/') :
            <div className='flex justify-center items-center h-screen'>
                <div className='flex flex-col justify-center items-center'>
                    {/* personal icon */}
                    <div
                        ref={boxRef}
                        style={
                            {
                                "--angle": "0deg",
                                "--border-color": "linear-gradient(var(--angle), #00A3FF, #21FAC6)",
                                "--bg-color": "linear-gradient(#131219, #131219)",
                            } as CSSProperties
                        }
                        className="animate-fade-up animate-delay-0 animate-once flex mb-[1rem] rounded-full border-[3.5px] border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                    >
                        <img src={PersonalIcon} className='rounded-full border-[4px] border-white' alt='Personal Icon' width={200} />
                    </div>
                    {/* email or username field */}
                    <TextInput
                        ref={loginEmailOrUsername}
                        className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-75 animate-once'
                        size="md"
                        label="Email or Username"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                    />
                    {/* password field */}
                    <TextInput
                        ref={loginPassword}
                        type='password'
                        className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-100 animate-once'
                        size="md"
                        label="Password"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                    />
                    {/* login button */}
                    <Button onClick={Login} size='md' className='bg-[#4094F4] w-[300px] my-[0.5rem] animate-fade-up animate-delay-150 animate-once'>Login</Button>
                    {/* sec line */}
                    <div className='animate-fade-up animate-delay-200 animate-once flex justify-center items-center w-[300px] bg-[#9A9A9A] text-[#9A9A9A] h-[0.5px] my-[1.5rem]'>
                        <span className='bg-white px-2'>Or</span>
                    </div>
                    {/* back to home page */}
                    <div className='text-[#9A9A9A] animate-fade-up animate-delay-300 animate-once'>
                        <span>Back To <button className='underline' onClick={() => navigate("/")}>Home Page</button></span>
                    </div>
                    {/* social icon */}
                    <div className='flex items-center mt-4 animate-fade-up animate-delay-500 animate-once'>
                        <button className='mr-5'>
                            <BsInstagram size={24} color='#9A9A9A' />
                        </button>
                        <button className='mx-5'>
                            <BsLinkedin size={24} color='#9A9A9A' />
                        </button>
                        <button className='ml-5'>
                            <BsGithub size={24} color='#9A9A9A' />
                        </button>
                    </div>
                </div>
            </div>
    )
}
