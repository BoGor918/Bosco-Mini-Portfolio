/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useEffect, useRef, useContext, CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mantine
import { TextInput, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// global components
import { MapperContext } from '../../globalVariable/MapperContextProvider';
// firebase
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
// files
import PersonalIcon from '../../images/Personal_Icon.png'
// icons
import { BiMoon, BiSolidMoon } from "react-icons/bi";
// page components
import Loading from '../loading/Loading';
import IntroductionModalComponent from '../modal/introduction/IntroductionModalComponent';

export default function Login(): any {
    // global variable
    const {
        userArray,
        authUser,
    } = useContext(MapperContext);
    // theme color variable
    const [theme, setTheme] = useState('');
    // icon box
    const boxRef = useRef<HTMLDivElement>(null);
    // Login variables
    const [loginEmailOrUsername, setLoginEmailOrUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    // model hook
    const [opened, { open, close }] = useDisclosure(false);
    // loading hook
    const [loading, setLoading] = useState(true);
    // navigate hook
    const navigate = useNavigate()

    // login function
    const Login = async () => {
        try {
            let haveUsername = false;

            // if user is using email to login
            if (loginEmailOrUsername.includes('.') && loginEmailOrUsername.includes('@')) {
                await signInWithEmailAndPassword(
                    auth,
                    loginEmailOrUsername,
                    loginPassword
                );
            } else {
                // if user is using username to login
                for (let i = 0; i < userArray[0].length; i++) {
                    if (Object.is(userArray[0][i], loginEmailOrUsername)) {
                        await signInWithEmailAndPassword(
                            auth,
                            userArray[1][i],
                            loginPassword
                        );
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

    // icon box animation
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

    // set color theme from local storage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // set color theme to local storage
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // handle click color theme switch function
    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // set theme color to meta content and body background color
    useEffect(() => {
        const handleThemeColorChange = () => {
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');

            if (themeColorMeta && theme === 'dark') {
                themeColorMeta.setAttribute('content', '#0B1A33'); // Set the new theme color
                document.body.style.backgroundColor = '#0B1A33';
            } else if (themeColorMeta && theme === 'light') {
                themeColorMeta?.setAttribute('content', '#FFFFFF'); // Set the new theme color
                document.body.style.backgroundColor = '#FFFFFF';
            }
        };
        handleThemeColorChange();
    }, [theme]);

    // loading function
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [])

    return (
        authUser !== null ? navigate('/?w=1') :
            loading ? <Loading /> :
                <div className='bg-white dark:bg-[#0B1A33] flex justify-center items-center h-screen'>
                    <div className='flex flex-col justify-center items-center'>
                        {/* personal icon */}
                        <div
                            onClick={() => open()}
                            ref={boxRef}
                            style={
                                {
                                    "--angle": "0deg",
                                    "--border-color": "linear-gradient(var(--angle), #00A3FF, #21FAC6)",
                                    "--bg-color": "linear-gradient(#131219, #131219)",
                                } as CSSProperties
                            }
                            className="cursor-pointer animate-fade-up animate-delay-0 animate-once flex mb-[1rem] rounded-full border-[3px] border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                        >
                            <img src={PersonalIcon} className='rounded-full border-[4px] border-white' alt='Personal Icon' width={190} />
                        </div>
                        {/* email field */}
                        {
                            theme === 'dark' ?
                                <TextInput
                                    onChange={(event) => setLoginEmailOrUsername(event.currentTarget.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            Login();
                                        }
                                    }}
                                    className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-75 animate-once'
                                    size="md"
                                    label="Email or Username"
                                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    styles={{
                                        label: {
                                            color: "white",
                                        },
                                    }}
                                /> :
                                <TextInput
                                    onChange={(event) => setLoginEmailOrUsername(event.currentTarget.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            Login();
                                        }
                                    }}
                                    className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-75 animate-once'
                                    size="md"
                                    label="Email or Username"
                                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                                />
                        }
                        {/* password field */}
                        {
                            theme === 'dark' ?
                                <TextInput
                                    onChange={(event) => setLoginPassword(event.currentTarget.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            Login();
                                        }
                                    }}
                                    type='password'
                                    className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-100 animate-once'
                                    size="md"
                                    label="Password"
                                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                                    styles={{
                                        label: {
                                            color: "white",
                                        },
                                    }}
                                /> :
                                <TextInput
                                    onChange={(event) => setLoginPassword(event.currentTarget.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            Login();
                                        }
                                    }}
                                    type='password'
                                    className='w-[300px] my-[0.2rem] animate-fade-up animate-delay-100 animate-once'
                                    size="md"
                                    label="Password"
                                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                                />
                        }
                        {/* login button */}
                        <Button onClick={Login} size='md' className='bg-[#4094F4] w-[300px] my-[0.5rem] animate-fade-up animate-delay-150 animate-once'>Login</Button>
                        {/* sec line */}
                        <div className='text-[#9A9A9A] dark:text-[#94A3B8] animate-fade-up animate-delay-200 animate-once flex justify-center items-center w-[300px] bg-[#9A9A9A] dark:bg-[#94A3B8] h-[0.5px] my-[1.5rem]'>
                            <span className='bg-white dark:bg-[#0B1A33] px-2'>Or</span>
                        </div>
                        {/* back to home page */}
                        <div className='text-[#9A9A9A] dark:text-[#94A3B8] animate-fade-up animate-delay-300 animate-once'>
                            <span>Back To <button className='underline' onClick={() => navigate("/")}>Home Page</button></span>
                        </div>
                        {/* theme button */}
                        <div className='flex items-center mt-4 animate-fade-up animate-delay-500 animate-once'>
                            <button onClick={handleThemeSwitch}>
                                {
                                    theme === 'light' ?
                                        <BiMoon className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' /> :
                                        <BiSolidMoon className='text-white text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' />
                                }
                            </button>
                        </div>
                    </div>
                    {/* modal components */}
                    {
                        localStorage.getItem('theme') === "light" ?
                            <Modal opened={opened} onClose={close} size="lg" title="About This Website" centered>
                                <IntroductionModalComponent />
                            </Modal> :
                            <Modal opened={opened} onClose={close} size="lg" title="About This Website" centered
                                styles={{
                                    header: {
                                        backgroundColor: "#0B1A33",
                                    },
                                    content: {
                                        backgroundColor: "#0B1A33",
                                    },
                                    title: {
                                        color: "#94A3B8",
                                    }
                                }}
                            >
                                <IntroductionModalComponent />
                            </Modal>
                    }
                </div>
    )
}
