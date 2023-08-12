import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import ProjectModalComponent from '../modal/project/ProjectModalComponent';
import { MapperContext } from '../../globalVariable/MapperContextProvider';

interface Project {
    ProjectName: string;
    TechStack: [];
    Description: string;
    Link: []
    Logo: string;
}

export default function ProjectGrid() {
    const {
        projectData
    } = useContext(MapperContext);

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1'>
                {projectData.map((project: any, i: any) => (
                    <div key={i} onClick={() => openModal(project)} className='bg-white shadow-md flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[298px] cursor-pointer'>
                        <img className='w-full p-4 sm:p-4 md:p-4 lg:p-10' src={project.Logo} alt={project.ProjectName} />
                    </div>
                ))}
            </div>
            {
                localStorage.getItem('theme') === "light" ?
                    <Modal opened={opened} onClose={close} size="lg" centered>
                        {selectedProject && (
                            <ProjectModalComponent
                                projectName={selectedProject.ProjectName}
                                description={selectedProject.Description}
                                techStack={selectedProject.TechStack}
                                link={selectedProject.Link}
                                logo={selectedProject.Logo}
                            />
                        )}
                    </Modal> :
                    <Modal opened={opened} onClose={close} size="lg" centered
                        styles={{
                            header: {
                                backgroundColor: "#0B1A33",
                            },
                            content: {
                                backgroundColor: "#0B1A33",
                            },
                        }}
                    >
                        {selectedProject && (
                            <ProjectModalComponent
                                projectName={selectedProject.ProjectName}
                                description={selectedProject.Description}
                                techStack={selectedProject.TechStack}
                                link={selectedProject.Link}
                                logo={selectedProject.Logo}
                            />
                        )}
                    </Modal>
            }
        </div>
    );
}