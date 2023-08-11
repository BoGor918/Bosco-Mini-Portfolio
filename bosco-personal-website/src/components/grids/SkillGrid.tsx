import { useContext, useState } from 'react';
import { MapperContext } from '../../globalVariable/MapperContextProvider';
import SkillModalComponent from '../modal/skill/SkillModalComponent';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

interface Skill {
    SkillName: string;
    Logo: string;
}

export default function SkillGrid() {
    const {
        skillData
    } = useContext(MapperContext);

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    const openModal = (project: Skill) => {
        setSelectedSkill(project);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1'>
                {skillData.map((skill: any, i: any) => (
                    <div key={i} onClick={() => openModal(skill)} className='bg-white shadow-md flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[175px] cursor-pointer'>
                        <img className='w-full p-4 sm:p-4 md:p-4 lg:p-10' src={skill.Logo} alt={skill.ProjectName} />
                    </div>
                ))}
            </div>
            <Modal opened={opened} onClose={close} size="xs" centered>
                {selectedSkill && (
                    <SkillModalComponent
                        skillName={selectedSkill.SkillName}
                        logo={selectedSkill.Logo}
                    />
                )}
            </Modal>
        </div>

    );
}