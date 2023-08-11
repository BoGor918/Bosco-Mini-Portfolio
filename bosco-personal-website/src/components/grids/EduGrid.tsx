import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import EducationModalComponent from '../modal/education/EducationModalComponent';
import { MapperContext } from '../../globalVariable/MapperContextProvider';

interface School {
    SchoolName: string;
    Type: string;
    Title: string;
    GPA: string;
    StartDate: any;
    EndDate: any;
    Present: boolean;
    Logo: string;
}

export default function EduGrid() {
    const {
        schoolData
    } = useContext(MapperContext);

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    const openModal = (school: School) => {
        setSelectedSchool(school);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1'>
                {schoolData.map((school: any, i: any) => (
                    <div key={i} onClick={() => openModal(school)} className='bg-white shadow-md flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[298px] cursor-pointer'>
                        <img className='w-full p-4 sm:p-4 md:p-4 lg:p-10' src={school.Logo} alt={school.SchoolName} />
                    </div>
                ))}
            </div>
            <Modal opened={opened} onClose={close} size="lg" centered>
                {selectedSchool && (
                    <EducationModalComponent
                        schoolName={selectedSchool.SchoolName}
                        type={selectedSchool.Type}
                        title={selectedSchool.Title}
                        gpa={selectedSchool.GPA}
                        startDate={selectedSchool.StartDate}
                        endDate={selectedSchool.EndDate}
                        present={selectedSchool.Present}
                        logo={selectedSchool.Logo}
                    />
                )}
            </Modal>
        </div>
    );
}