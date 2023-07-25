import { useState } from 'react'
import CompanyGrid from './grids/CompanyGrid'
import EduGrid from './grids/EduGrid'
import SkillGrid from './grids/SkillGrid'

export default function MiddleComponent() {
    const [selected, setSelected] = useState("1")

    const navClicked = (e: any) => {
        setSelected(e)
    }

    const selectedStyle = "opacity-100 mr-[-6.5px]"
    const unSelectedStyle = "opacity-0 mr-[-6.5px]"

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
                    <div className='flex mt-[8px]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: '#9A9A9A', transform: '', msFilter: '' }}><path d="M15 3H4.984c-1.103 0-2 .897-2 2v14.016c0 1.103.897 2 2 2H19c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-4zm4 5h-3V5h3v3zM4.984 10h3v4.016h-3V10zm5 0H14v4.016H9.984V10zM16 10h3v4.016h-3V10zm-2-5v3H9.984V5H14zM7.984 5v3h-3V5h3zm-3 11.016h3v3h-3v-3zm5 3v-3H14v3H9.984zm6.016 0v-3h3.001v3H16z"></path>
                        </svg>
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>WORKS</span>
                    </div>
                </button>
                {/* option 2 */}
                <button onClick={() => navClicked("2")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "2" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex mt-[8px]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: '#9A9A9A', transform: '', msFilter: '' }}><path d="M2 20h20v2H2zM4 3v14a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1zm2 1h3v12H6zM13 17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1zm2-9h3v8h-3z"></path>
                        </svg>
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>EDUS</span>
                    </div>
                </button>
                {/* option 3 */}
                <button onClick={() => navClicked("3")} className='flex flex-col items-center content-center mx-12'>
                    <svg className={selected === "3" ? selectedStyle : unSelectedStyle} xmlns="http://www.w3.org/2000/svg" width="100" height="3" viewBox="0 0 100 3" fill="none">
                        <path d="M0 2H138" stroke="#A7A7A7" strokeWidth="3" />
                    </svg>
                    <div className='flex mt-[8px]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: '#9A9A9A', transform: '', msFilter: '' }}><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z"></path><path d="M15 7h3v2h-3zm0 4h3v2h-3z"></path>
                        </svg>
                        <span className='ml-1 text-[#9A9A9A] mt-[0.3rem]'>SKILLS</span>
                    </div>
                </button>
            </div>
            {
                selected === "1" ? <CompanyGrid /> : selected === "2" ? <EduGrid /> : <SkillGrid />
            }
        </div>
    )
}
