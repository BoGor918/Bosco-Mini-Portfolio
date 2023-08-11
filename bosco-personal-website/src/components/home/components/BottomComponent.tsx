import { useState, useContext } from 'react'
import CompanyGrid from '../../grids/CompanyGrid'
import EduGrid from '../../grids/EduGrid'
import ProjectGrid from '../../grids/ProjectGrid'
import SkillGrid from '../../grids/SkillGrid'
import { BiGrid, BiObjectsVerticalBottom, BiBookContent, BiCalendarCheck } from "react-icons/bi";
import { Button } from '@mantine/core';
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddCompanyModalComponent from '../../modal/company/AddCompanyModalComponent';
import AddEducationModalComponent from '../../modal/education/AddEducationModalComponent';
import AddProjectModalComponent from '../../modal/project/AddProjectModalComponent';
import AddSkillModalComponent from '../../modal/skill/AddSkillModalComponent';

export default function BottomComponent() {
    const {
        authUser
    } = useContext(MapperContext);

    const [opened, { open, close }] = useDisclosure(false);

    const [selected, setSelected] = useState<string | number>("1");

    const navClicked = (e: any) => {
        setSelected(e)
    }

    const selectedStyle = "opacity-100 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] dark:bg-white mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const unSelectedStyle = "opacity-0 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] dark:bg-[#94A3B8] mt-[0.5px] rounded-full transition duration-500 ease-in-out"

    const iconStyleSelected = "text-[#9A9A9A] dark:text-white"
    const iconStyleUnSelected = "text-[#9A9A9A] dark:text-[#94A3B8]"

    const textSytleSelected = "ml-1 mt-[0.3rem] hidden sm:hidden md:hidden lg:block text-[#9A9A9A] dark:text-white"
    const textSytleUnSelected = "ml-1 mt-[0.3rem] hidden sm:hidden md:hidden lg:block text-[#9A9A9A] dark:text-[#94A3B8]"

    return (
        <div className='self-center w-full max-w-[355px] sm:max-w-[355px] md:max-w-[355px] lg:max-w-[910px] flex flex-col items-center justify-center font-light'>
            {/* nav line */}
            <div className='animate-fade-up animate-delay-200 animate-once flex flex-col justify-end items-end'>
                {/* Add Button= */}
                {
                    authUser !== null ?
                        <Button onClick={open} className='text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] mt-[-0.5rem] mr-[-1.1rem] hover:bg-transparent text-[#9A9A9A] dark:text-[#94A3B8] font-normal'>
                            {
                                selected === "1" ?
                                    "+ Add Work" :
                                    selected === "2" ?
                                        "+ Add Education" :
                                        selected === "3" ?
                                            "+ Add Project" :
                                            "+ Add Skill"
                            }
                        </Button> :
                        <></>
                }
                <div className='w-[355px] sm:w-[355px] md:w-[355px] lg:w-[900px] h-[1px] bg-[#9a9a9a60] dark:bg-[#94A3B860]' />
            </div>
            {/* nav button pc */}
            <div className='flex animate-fade-up animate-delay-200 animate-once mt-[-1px]'>
                {/* option 1 */}
                <button onClick={() => navClicked("1")} className='flex flex-col items-center content-center mr-5 sm:mr-5 md:mr-5 lg:mr-12'>
                    <div className={selected === "1" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiGrid className={selected === "1" ? iconStyleSelected : iconStyleUnSelected} size={30} />
                        <span className={selected === "1" ? textSytleSelected : textSytleUnSelected}>WORKS</span>
                    </div>
                </button>
                {/* option 2 */}
                <button onClick={() => navClicked("2")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={selected === "2" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiObjectsVerticalBottom className={selected === "2" ? iconStyleSelected : iconStyleUnSelected} size={30}  />
                        <span className={selected === "2" ? textSytleSelected : textSytleUnSelected}>EDUS</span>
                    </div>
                </button>
                {/* option 3 */}
                <button onClick={() => navClicked("3")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={selected === "3" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiBookContent className={selected === "3" ? iconStyleSelected : iconStyleUnSelected} size={30}  />
                        <span className={selected === "3" ? textSytleSelected : textSytleUnSelected}>PROJECTS</span>
                    </div>
                </button>
                {/* option 4 */}
                <button onClick={() => navClicked("4")} className='flex flex-col items-center content-center ml-5 sm:ml-5 md:ml-5 lg:ml-12'>
                    <div className={selected === "4" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.5rem]'>
                        <BiCalendarCheck className={selected === "4" ? iconStyleSelected : iconStyleUnSelected} size={30}  />
                        <span className={selected === "4" ? textSytleSelected : textSytleUnSelected}>SKILLS</span>
                    </div>
                </button>
            </div>
            {/* display grid */}
            <div className='animate-fade-up animate-delay-300 animate-once '>
                {
                    selected === "1" ? <CompanyGrid /> : selected === "2" ? <EduGrid /> : selected === "3" ? <ProjectGrid /> : <SkillGrid />
                }
            </div>
            {/* add item modal */}
            <Modal opened={opened} onClose={close} size="lg" padding="xl" title={selected === "1" ? "Add Work" : selected === "2" ? "Add Education" : selected === "3" ? "Add Project" : "Add Skill"} centered>
                {
                    selected === "1" ? <AddCompanyModalComponent /> :
                        selected === "2" ?
                            <AddEducationModalComponent /> :
                            selected === "3" ?
                                <AddProjectModalComponent /> :
                                <AddSkillModalComponent />

                }
            </Modal>
        </div>
    )
}
