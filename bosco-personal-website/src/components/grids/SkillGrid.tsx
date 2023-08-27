// others
import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
// global variable
import { MapperContext } from '../../globalVariable/MapperContextProvider';
// mantine components
import { Modal } from '@mantine/core';
// page components
import SkillModalComponent from '../modal/skill/SkillModalComponent';
// react lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// skill interface
interface Skill {
    id: string;
    SkillName: string;
    Logo: string;
    CreateDate: Date;
}

export default function SkillGrid() {
    // global variable
    const {
        skillData
    } = useContext(MapperContext);

    // modal hook
    const [opened, { open, close }] = useDisclosure(false);
    // selected skill
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    // open modal with set selected skill
    const openModal = (project: Skill) => {
        setSelectedSkill(project);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem]'>
            {/* skill grid */}
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1'>
                {skillData.map((skill: any, i: any) => (
                    <div key={i} onClick={() => openModal(skill)} className='bg-white shadow-md rounded-sm flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[175px] cursor-pointer'>
                        <LazyLoadImage
                            className='w-full p-4 sm:p-4 md:p-4 lg:p-10'
                            src={skill.Logo}
                            alt={skill.SkillName}
                            effect="blur"
                        />
                    </div>
                ))}
            </div>
            {/* modal components */}
            {
                localStorage.getItem('theme') === "light" ?
                    <Modal opened={opened} onClose={close} size="md" centered>
                        {selectedSkill && (
                            <SkillModalComponent
                                docID={selectedSkill.id}
                                skillName={selectedSkill.SkillName}
                                logo={selectedSkill.Logo}
                                createDate={selectedSkill.CreateDate}
                            />
                        )}
                    </Modal> :
                    <Modal opened={opened} onClose={close} size="md" centered
                        styles={{
                            header: {
                                backgroundColor: "#0B1A33",
                            },
                            content: {
                                backgroundColor: "#0B1A33",
                            },
                        }}
                    >
                        {selectedSkill && (
                            <SkillModalComponent
                                docID={selectedSkill.id}
                                skillName={selectedSkill.SkillName}
                                logo={selectedSkill.Logo}
                                createDate={selectedSkill.CreateDate}
                            />
                        )}
                    </Modal>
            }

        </div>

    );
}