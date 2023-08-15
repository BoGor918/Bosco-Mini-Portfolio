// others
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// global components
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// mantine components
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// page components
import CompanyGrid from '../../grids/CompanyGrid'
import EduGrid from '../../grids/EduGrid'
import ProjectGrid from '../../grids/ProjectGrid'
import SkillGrid from '../../grids/SkillGrid'
import AddCompanyModalComponent from '../../modal/company/AddCompanyModalComponent';
import AddEducationModalComponent from '../../modal/education/AddEducationModalComponent';
import AddProjectModalComponent from '../../modal/project/AddProjectModalComponent';
import AddSkillModalComponent from '../../modal/skill/AddSkillModalComponent';
// icons
import { BiGrid, BiObjectsVerticalBottom, BiBookContent, BiCalendarCheck } from "react-icons/bi";

export default function BottomComponent() {
    // global variable
    const {
        authUser
    } = useContext(MapperContext);
    // model hook
    const [opened, { open, close }] = useDisclosure(false);
    // navigate hook
    const navigate = useNavigate();
    // url parameter
    const queryParameters = new URLSearchParams(window.location.search)
    const widget = queryParameters.get("w")

    // set nav function
    const navClicked = (e: any) => {
        navigate(`?w=${e}`)
    }

    // style variable
    const selectedStyle = "opacity-100 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] dark:bg-white mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const unSelectedStyle = "opacity-0 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[125px] h-[2px] bg-[#9a9a9a] dark:bg-[#94A3B8] mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const selected3Style = "opacity-100 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[150px] h-[2px] bg-[#9a9a9a] dark:bg-white mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const unSelected3Style = "opacity-0 w-[50px] sm:w-[50px] md:w-[50px] lg:w-[150px] h-[2px] bg-[#9a9a9a] dark:bg-[#94A3B8] mt-[0.5px] rounded-full transition duration-500 ease-in-out"
    const iconStyleSelected = "text-[#9A9A9A] dark:text-white"
    const iconStyleUnSelected = "text-[#9A9A9A] dark:text-[#94A3B8]"
    const textSytleSelected = "ml-1 mt-[0.3rem] hidden sm:hidden md:hidden lg:block text-[#9A9A9A] dark:text-white"
    const textSytleUnSelected = "ml-1 mt-[0.3rem] hidden sm:hidden md:hidden lg:block text-[#9A9A9A] dark:text-[#94A3B8]"

    return (
        <div className='self-center w-full max-w-[355px] sm:max-w-[355px] md:max-w-[355px] lg:max-w-[910px] flex flex-col items-center justify-center font-light mb-[5rem]'>
            {/* nav line */}
            <div className='animate-fade-up animate-delay-200 animate-once flex flex-col justify-end items-end'>
                {/* Add Button= */}
                {
                    authUser !== null ?
                        <Button onClick={open} className='text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] mt-[-0.5rem] mr-[-1.1rem] hover:bg-transparent text-[#9A9A9A] dark:text-[#94A3B8] font-normal'>
                            {
                                widget === "1" || widget === null ?
                                    "+ Add Work" :
                                    widget === "2" ?
                                        "+ Add Education" :
                                        widget === "3" ?
                                            "+ Add Project" :
                                            widget === "4" ?
                                                "+ Add Skill" : ""
                            }
                        </Button> :
                        <></>
                }
                <div className='w-[355px] sm:w-[355px] md:w-[355px] lg:w-[900px] h-[1px] bg-[#9a9a9a60] dark:bg-[#94A3B860]' />
            </div>
            {/* nav button */}
            <div className='flex animate-fade-up animate-delay-200 animate-once mt-[-1px]'>
                {/* option 1 */}
                <button onClick={() => navClicked("1")} className='flex flex-col items-center content-center mr-5 sm:mr-5 md:mr-5 lg:mr-12'>
                    <div className={widget === "1" || widget === null ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiGrid className={widget === "1" ? iconStyleSelected : iconStyleUnSelected} size={30} />
                        <span className={widget === "1" ? textSytleSelected : textSytleUnSelected}>WORKS</span>
                    </div>
                </button>
                {/* option 2 */}
                <button onClick={() => navClicked("2")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={widget === "2" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiObjectsVerticalBottom className={widget === "2" ? iconStyleSelected : iconStyleUnSelected} size={30} />
                        <span className={widget === "2" ? textSytleSelected : textSytleUnSelected}>EDUS</span>
                    </div>
                </button>
                {/* option 3 */}
                <button onClick={() => navClicked("3")} className='flex flex-col items-center content-center mx-5 sm:mx-5 md:mx-5 lg:mx-12'>
                    <div className={widget === "3" ? selected3Style : unSelected3Style} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.4rem]'>
                        <BiBookContent className={widget === "3" ? iconStyleSelected : iconStyleUnSelected} size={30} />
                        <span className={widget === "3" ? textSytleSelected : textSytleUnSelected}>PROJECTS</span>
                    </div>
                </button>
                {/* option 4 */}
                <button onClick={() => navClicked("4")} className='flex flex-col items-center content-center ml-5 sm:ml-5 md:ml-5 lg:ml-12'>
                    <div className={widget === "4" ? selectedStyle : unSelectedStyle} />
                    <div className='flex items-center mt-[8px] mr-[0rem] sm:mr-[0rem] md:mr-[0rem] lg:mr-[0.5rem]'>
                        <BiCalendarCheck className={widget === "4" ? iconStyleSelected : iconStyleUnSelected} size={30} />
                        <span className={widget === "4" ? textSytleSelected : textSytleUnSelected}>SKILLS</span>
                    </div>
                </button>
            </div>
            {/* display grid */}
            <div className='animate-fade-up animate-delay-300 animate-once '>
                {
                    widget === "1" || widget === null ? <CompanyGrid /> : widget === "2" ? <EduGrid /> : widget === "3" ? <ProjectGrid /> : widget === "4" ? <SkillGrid /> : <></>
                }
            </div>
            {/* add item modal */}
            {
                localStorage.getItem('theme') === "light" ?
                    <Modal opened={opened} onClose={close} size="lg" padding="xl" title={widget === "1" || widget === null ? "Add Work" : widget === "2" ? "Add Education" : widget === "3" ? "Add Project" : "Add Skill"} centered>
                        {
                            widget === "1" || widget === null ?
                                <AddCompanyModalComponent /> :
                                widget === "2" ?
                                    <AddEducationModalComponent /> :
                                    widget === "3" ?
                                        <AddProjectModalComponent /> :
                                        widget === "4" ?
                                            <AddSkillModalComponent /> :
                                            <></>

                        }
                    </Modal> :
                    <Modal opened={opened} onClose={close} size="lg" padding="xl" title={widget === "1" || widget === null ? "Add Work" : widget === "2" ? "Add Education" : widget === "3" ? "Add Project" : "Add Skill"} centered
                        styles={{
                            header: {
                                backgroundColor: "#0B1A33",
                            },
                            content: {
                                backgroundColor: "#0B1A33",
                            },
                            title: {
                                color: "white",
                            }
                        }}
                    >
                        {
                            widget === "1" || widget === null ?
                                <AddCompanyModalComponent /> :
                                widget === "2" ?
                                    <AddEducationModalComponent /> :
                                    widget === "3" ?
                                        <AddProjectModalComponent /> :
                                        widget === "4" ?
                                            <AddSkillModalComponent /> :
                                            <></>
                        }
                    </Modal>
            }
        </div>
    )
}