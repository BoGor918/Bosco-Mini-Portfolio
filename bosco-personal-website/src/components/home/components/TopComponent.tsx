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
        <div className='self-center w-full max-w-[375px] sm:max-w-[375px] md:max-w-[375px] lg:max-w-[910px] flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center font-light mt-[5rem]'>
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
                className="animate-fade-up animate-delay-0 animate-once flex mx-0 sm:mx-0 md:mx-0 lg:mx-10 rounded-full border-[3.5px] border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)] mr-0 sm:mr-0 md:mr-0 lg:mr-4"
            >
                <img src={PersonalIcon} className='rounded-full border-[4px] border-white' alt='Personal Icon' width={200} />
            </div>
            {/* info */}
            <div className='animate-fade-up animate-delay-100 animate-once mx-10'>
                {/* col-1 */}
                <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center ml-[-0.15rem]'>
                    <span className='mr-0 sm:mr-0 md:mr-0 lg:mr-5 my-4 sm:my-4 md:my-4 lg:my-0 text-[24px] sm:text-[24px] md:text-[24px] lg:text-[27px]'>CHEUNG Tsz Lai</span>
                    <div className='flex justify-center items-center mb-2 sm:mb-2 md:mb-2 lg:mb-0'>
                        <Button className='mx-0 sm:mx-0 md:mx-0 lg:mx-5 bg-[#4094F4] text-white rounded-md px-[15px] sm:px-[15px] md:px-[15px] lg:px-[20px] py-[5px] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] ml-0 sm:ml-0 md:ml-0 lg:ml-4'>
                            <a href={CV} download='CHEUNG_Tsz_Lai_Bosco_CV'>Download CV</a>
                        </Button>
                        <button className='ml-5 sm:ml-5 md:ml-5 lg:ml-2'>
                            <BiMoon className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' />
                        </button>
                    </div>
                </div>
                {/* col-2 */}
                <div className='flex justify-center sm:justify-center md:justify-center lg:justify-start items-center text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] my-4'>
                    <span className='mr-4'><CountUp className='font-bold' start={100} end={totalYear} duration={3} /><span className='font-bold'>+</span> Yrs Exp</span>
                    <span className='mx-4'><CountUp className='font-bold' start={100} end={5} duration={3} /><span className='font-bold'>+</span> Projects</span>
                    <span className='ml-4'><CountUp className='font-bold' start={100} end={10} duration={3} /><span className='font-bold'>+</span> Skills</span>
                </div>
                {/* col-3 */}
                <div className='flex flex-col text-center sm:text-center md:text-center lg:text-start text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]'>
                    <span className='font-bold'>Bosco</span>
                    <span className='text-[#9A9A9A]'>Solutions Developer</span>
                    <span className='text-[#9A9A9A]'>Web / App Design + Development, Photo / Video Editing</span>
                    <span className='text-[#9A9A9A]'>Email: cheungtszlai0918@gmail.com</span>
                    <span className='text-[#9A9A9A]'>Phone: +852 67708560</span>
                </div>
                {/* col-4 */}
                <div className='flex items-center justify-center sm:justify-center md:justify-center lg:justify-start text-[16px] ml-[0rem] sm:ml-[0rem] md:ml-[0rem] lg:ml-[-0.1rem] my-4'>
                    <button className='mr-5'>
                        <BsInstagram className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsLinkedin className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsGithub className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' color='#9A9A9A' />
                    </button>
                    <button className='mx-5'>
                        <BsWhatsapp className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' color='#9A9A9A' />
                    </button>
                    <button className='ml-5'>
                        <BsEnvelope className='text-[22px] sm:text-[22px] md:text-[22px] lg:text-[24px]' color='#9A9A9A' />
                    </button>
                </div>
            </div>
        </div>
    )
}
