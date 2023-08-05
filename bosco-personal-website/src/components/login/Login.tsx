import { useEffect, useRef, CSSProperties } from 'react'
import { TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
import PersonalIcon from '../../images/Personal_Icon.png'

export default function Login() {
    const navigate = useNavigate();

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
        <div className='flex justify-center items-center h-screen animate-fade-up animate-delay-300 animate-once'>
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
                    className="flex mb-[1rem] rounded-full border-[3.5px] border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
                >
                    <img src={PersonalIcon} className='rounded-full border-[4px] border-white' alt='Personal Icon' width={200} />
                </div>
                {/* email or username field */}
                <TextInput
                    className='w-[300px] my-[0.2rem]'
                    size="md"
                    label="Email or Username"
                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                />
                {/* password field */}
                <TextInput
                    type='password'
                    className='w-[300px] my-[0.2rem]'
                    size="md"
                    label="Password"
                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                />
                {/* login button */}
                <Button size='md' className='bg-[#4094F4] w-[300px] my-[0.5rem]'>Login</Button>
                {/* sec line */}
                <div className='flex justify-center items-center w-[300px] bg-[#9A9A9A] text-[#9A9A9A] h-[0.5px] my-[1.5rem]'>
                    <span className='bg-white px-2'>Or</span>
                </div>
                {/* back to home page */}
                <div className='text-[#9A9A9A]'>
                    <span>Back To <button className='underline' onClick={() => navigate("/")}>Home Page</button></span>
                </div>
                {/* social icon */}
                <div className='flex items-center mt-4'>
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
