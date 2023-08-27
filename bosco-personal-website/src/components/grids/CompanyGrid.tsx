// others
import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
// global variable
import { MapperContext } from '../../globalVariable/MapperContextProvider';
// mantine components
import { Modal } from '@mantine/core';
// page components
import CompanyModalComponent from '../modal/company/CompanyModalComponent';
// react lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// company interface
interface Company {
    id: string;
    CompanyName: string;
    Team: string;
    Position: string;
    JobDuties: string;
    Projects: string;
    SkillSets: [];
    StartDate: any;
    EndDate: any;
    Present: boolean;
    Logo: string;
    CreateDate: Date;
}

export default function CompanyGrid() {
    // global variable
    const {
        companyData
    } = useContext(MapperContext);

    // modal hook
    const [opened, { open, close }] = useDisclosure(false);
    // selected company
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    // open modal with set selected company
    const openModal = (company: Company) => {
        setSelectedCompany(company);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem]'>
            {/* company grids */}
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1'>
                {companyData.map((company: any, i: any) => (
                    <div key={i} onClick={() => openModal(company)} className='bg-white shadow-md rounded-sm flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[298px] cursor-pointer'>
                        <LazyLoadImage
                            className='p-2 sm:p-2 md:p-2 lg:p-5'
                            src={company.Logo}
                            alt={company.CompanyName}
                            effect="blur"
                        />
                    </div>
                ))}
            </div>
            {/* modal components */}
            {
                localStorage.getItem('theme') === "light" ?
                    <Modal opened={opened} onClose={close} size="lg" centered>
                        {selectedCompany && (
                            <CompanyModalComponent
                                docID={selectedCompany.id}
                                companyName={selectedCompany.CompanyName}
                                team={selectedCompany.Team}
                                position={selectedCompany.Position}
                                jobDuties={selectedCompany.JobDuties}
                                projects={selectedCompany.Projects}
                                skillSets={selectedCompany.SkillSets}
                                startDate={selectedCompany.StartDate}
                                endDate={selectedCompany.EndDate}
                                present={selectedCompany.Present}
                                logo={selectedCompany.Logo}
                                createDate={selectedCompany.CreateDate}
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
                        {selectedCompany && (
                            <CompanyModalComponent
                                docID={selectedCompany.id}
                                companyName={selectedCompany.CompanyName}
                                team={selectedCompany.Team}
                                position={selectedCompany.Position}
                                jobDuties={selectedCompany.JobDuties}
                                projects={selectedCompany.Projects}
                                skillSets={selectedCompany.SkillSets}
                                startDate={selectedCompany.StartDate}
                                endDate={selectedCompany.EndDate}
                                present={selectedCompany.Present}
                                logo={selectedCompany.Logo}
                                createDate={selectedCompany.CreateDate}
                            />
                        )}
                    </Modal>
            }
        </div>
    );
}