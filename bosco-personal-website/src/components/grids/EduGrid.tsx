// others
import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
// global variable
import { MapperContext } from '../../globalVariable/MapperContextProvider';
// mantine components
import { Modal } from '@mantine/core';
// page components
import EducationModalComponent from '../modal/education/EducationModalComponent';

// school interface
interface School {
    id: string;
    SchoolName: string;
    Type: string;
    Title: string;
    GPA: string;
    StartDate: any;
    EndDate: any;
    Present: boolean;
    Logo: string;
    CreateDate: Date;
}

export default function EduGrid() {
    // global variable
    const {
        schoolData
    } = useContext(MapperContext);

    // modal hook
    const [opened, { open, close }] = useDisclosure(false);
    // selected school
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    // open modal with set selected school
    const openModal = (school: School) => {
        setSelectedSchool(school);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem]'>
            {/* school grid */}
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1'>
                {schoolData.map((school: any, i: any) => (
                    <div key={i} onClick={() => openModal(school)} className='bg-white shadow-md rounded-sm flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[298px] cursor-pointer'>
                        <img className='w-full p-4 sm:p-4 md:p-4 lg:p-10' src={school.Logo} alt={school.SchoolName} />
                    </div>
                ))}
            </div>
            {/* modal components */}
            {
                localStorage.getItem('theme') === "light" ?
                    <Modal opened={opened} onClose={close} size="lg" centered>
                        {selectedSchool && (
                            <EducationModalComponent
                                docID={selectedSchool.id}
                                schoolName={selectedSchool.SchoolName}
                                type={selectedSchool.Type}
                                title={selectedSchool.Title}
                                gpa={selectedSchool.GPA}
                                startDate={selectedSchool.StartDate}
                                endDate={selectedSchool.EndDate}
                                present={selectedSchool.Present}
                                logo={selectedSchool.Logo}
                                createDate={selectedSchool.CreateDate}
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
                        {selectedSchool && (
                            <EducationModalComponent
                                docID={selectedSchool.id}
                                schoolName={selectedSchool.SchoolName}
                                type={selectedSchool.Type}
                                title={selectedSchool.Title}
                                gpa={selectedSchool.GPA}
                                startDate={selectedSchool.StartDate}
                                endDate={selectedSchool.EndDate}
                                present={selectedSchool.Present}
                                logo={selectedSchool.Logo}
                                createDate={selectedSchool.CreateDate}
                            />
                        )}
                    </Modal>
            }
        </div>
    );
}