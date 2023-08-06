import { useRef, useEffect, CSSProperties } from 'react'
import PersonalIcon from '../../../images/Personal_Icon.png'
import CountUp from 'react-countup';
import { Button } from '@mantine/core';
import CV from '../../../files/CV.pdf'
import { BiMoon } from "react-icons/bi";
import { BsInstagram, BsLinkedin, BsGithub, BsWhatsapp, BsEnvelope } from "react-icons/bs";

export default function TopComponent() {
    const boxRef = useRef<HTMLDivElement>(null);
    const workStartDate = new Date(2021, 5, 1);
    const currentDate = new Date();
    const totalYear = currentDate.getFullYear() - workStartDate.getFullYear();

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
        <div className='flex justify-center items-center font-light mt-[5rem]'>
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
                className="animate-fade-up animate-delay-0 animate-once flex mx-10 rounded-full border-[3.5px] border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)] mr-4"
            >
                <img src={PersonalIcon} className='rounded-full border-[4px] border-white' alt='Personal Icon' width={200} />
            </div>
            {/* info */}
            <div className='animate-fade-up animate-delay-100 animate-once mx-10'>
                {/* col-1 */}
                <div className='flex justify-center items-center ml-[-0.15rem]'>
                    <span className='mr-5 text-[27px]'>CHEUNG Tsz Lai</span>
                    <Button className='mx-5 bg-[#4094F4] text-white rounded-md px-[20px] py-[5px] text-[14px] ml-4'>
                        <a href={CV} download='CHEUNG_Tsz_Lai_Bosco_CV'>Download CV</a>
                    </Button>
                    <button className='ml-2'>
                        <BiMoon size={24} />
                    </button>
                </div>
                {/* col-2 */}
                <div className='flex items-center text-[16px] my-4'>
                    <span className='mr-4'><CountUp className='font-bold' start={100} end={totalYear} duration={3} /><span className='font-bold'>+</span> Yrs Exp</span>
                    <span className='mx-4'><CountUp className='font-bold' start={100} end={5} duration={3} /><span className='font-bold'>+</span> Projects</span>
                    <span className='ml-4'><CountUp className='font-bold' start={100} end={10} duration={3} /><span className='font-bold'>+</span> Skills</span>
                </div>
                {/* col-3 */}
                <div className='flex flex-col text-[16px]'>
                    <span className='font-bold'>Bosco</span>
                    <span className='text-[#9A9A9A]'>Solutions Developer</span>
                    <span className='text-[#9A9A9A]'>Web / App Design + Development, Photo / Video Editing</span>
                    <span className='text-[#9A9A9A]'>Email: cheungtszlai0918@gmail.com</span>
                    <span className='text-[#9A9A9A]'>Phone: +852 67708560</span>
                </div>
                {/* col-4 */}
                <div className='flex items-center text-[16px] ml-[-0.1rem] my-4'>
                    <button className='mr-5'>
                        <BsInstagram size={24} color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsLinkedin size={24} color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsGithub size={24} color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsWhatsapp size={24} color='#9A9A9A' />
                    </button>
                    <button className='ml-5'>
                        <BsEnvelope size={24} color='#9A9A9A' />
                    </button>
                </div>
            </div>
        </div>
    )
}
