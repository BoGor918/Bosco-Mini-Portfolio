import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import CompanyModalComponent from '../modal/company/CompanyModalComponent';
import { MapperContext } from '../../globalVariable/MapperContextProvider';

interface Company {
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
}

export default function CompanyGrid() {
    const {
        companyData
    } = useContext(MapperContext);

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const openModal = (company: Company) => {
        setSelectedCompany(company);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-0 sm:mx-0 md:mx-0 lg:mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1'>
                {companyData.map((company: any, i: any) => (
                    <div key={i} onClick={() => openModal(company)} className='bg-white shadow-md flex justify-center items-center h-[115.66px] sm:h-[115.66px] md:h-[115.66px] lg:h-[298px] cursor-pointer'>
                        <img className='p-2 sm:p-2 md:p-2 lg:p-5' src={company.Logo} alt={company.CompanyName} />
                    </div>
                ))}
            </div>
            <Modal opened={opened} onClose={close} size="lg" centered>
                {selectedCompany && (
                    <CompanyModalComponent
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
                    />
                )}
            </Modal>
        </div>
    );
}