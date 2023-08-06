import { useState } from 'react'
import CompanyGrid from '../../grids/CompanyGrid'
import EduGrid from '../../grids/EduGrid'
import ProjectGrid from '../../grids/ProjectGrid'
import { BiGrid, BiObjectsVerticalBottom, BiBookContent, BiCalendarCheck } from "react-icons/bi";

export default function BottomComponent() {
    const [selected, setSelected] = useState("1")

    const navClicked = (e: any) => {
        setSelected(e)
    }

    const selectedStyle = "opacity-100 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const unSelectedStyle = "opacity-0 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] mt-[0.5px] rounded-full transition duration-500 ease-in-out"

    return (
        <div className='flex flex-col items-center justify-center font-light'>
            {/* nav line */}
            <div className='animate-fade-up animate-delay-200 animate-once w-[385px] sm:w-[385px] md:w-[385px] lg:w-[900px] h-[1px] bg-[#9a9a9a60]' />
            {/* nav button pc */}
            <div className='flex animate-fade-up animate-delay-200 animate-once mt-[-1px]'>
                {/* option 1 */}
                <button onClick={() => navClicked("1")} className='flex flex-col items-center content-center mr-5 sm:mr-5 md:mr-5 lg:mr-12'>
                    <div className={selected === "1" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiGrid size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] hidden sm:hidden md:hidden lg:block'>WORKS</span>
                    </div>
                </button>
                {/* option 2 */}
                <button onClick={() => navClicked("2")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={selected === "2" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiObjectsVerticalBottom size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem] hidden sm:hidden md:hidden lg:block'>EDUS</span>
                    </div>
                </button>
                {/* option 3 */}
                <button onClick={() => navClicked("3")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={selected === "3" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiBookContent size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem] hidden sm:hidden md:hidden lg:block'>PROJECTS</span>
                    </div>
                </button>
                {/* option 4 */}
                <button onClick={() => navClicked("4")} className='flex flex-col items-center content-center ml-5 sm:ml-5 md:ml-5 lg:ml-12'>
                    <div className={selected === "4" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.5rem]'>
                        <BiCalendarCheck size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem] hidden sm:hidden md:hidden lg:block'>SKILLS</span>
                    </div>
                </button>
            </div>
            <div className='animate-fade-up animate-delay-300 animate-once '>
                {
                    selected === "1" ? <CompanyGrid /> : selected === "2" ? <EduGrid /> : <ProjectGrid />
                }
            </div>
        </div>
    )
}
