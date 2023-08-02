import { useState } from 'react'
import CompanyGrid from './grids/CompanyGrid'
import EduGrid from './grids/EduGrid'
import ProjectGrid from './grids/ProjectGrid'
import { BiGrid, BiObjectsVerticalBottom, BiBookContent, BiCalendarCheck } from "react-icons/bi";

export default function MiddleComponent() {
    const [selected, setSelected] = useState("1")

    const navClicked = (e: any) => {
        setSelected(e)
    }

    const selectedStyle = "opacity-100 mr-[-6.5px] transition duration-500 ease-in-out"
    const unSelectedStyle = "opacity-0 mr-[-6.5px] transition duration-500 ease-in-out"

    return (
        <div className='flex flex-col items-center justify-center font-light mt-[4rem]'>
            {/* nav line */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="900" height="2" viewBox="0 0 900 2" fill="none">
                    <path d="M0 1H1200" stroke="#9A9A9A" strokeOpacity="0.6" />
                </svg>
            </div>
            {/* nav button */}
            <div className='flex mt-[-1.5px]'>
                {/* option 1 */}
                <button onClick={() => navClicked("1")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "1" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex items-center mt-[8px]'>
                        <BiGrid size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A]'>WORKS</span>
                    </div>
                </button>
                {/* option 2 */}
                <button onClick={() => navClicked("2")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "2" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex items-center mt-[8px]'>
                        <BiObjectsVerticalBottom size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>EDUS</span>
                    </div>
                </button>
                {/* option 3 */}
                <button onClick={() => navClicked("3")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "3" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex items-center mt-[8px]'>
                        <BiBookContent size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>PROJECTS</span>
                    </div>
                </button>
                {/* option 4 */}
                <button onClick={() => navClicked("4")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "4" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex items-center mt-[8px]'>
                        <BiCalendarCheck size={30} color='#9A9A9A' />
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>SKILLS</span>
                    </div>
                </button>
            </div>
            {
                selected === "1" ? <CompanyGrid /> : selected === "2" ? <EduGrid /> : <ProjectGrid />
            }
        </div>
    )
}
