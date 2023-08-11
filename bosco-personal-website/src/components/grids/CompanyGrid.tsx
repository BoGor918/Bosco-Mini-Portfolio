import { useState, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import CompanyModalComponent from '../modal/company/CompanyModalComponent';
import { MapperContext } from '../../globalVariable/MapperContextProvider';
import { Tooltip } from '@mantine/core';

interface Company {
    CompanyName: string;
    Team: string;
    Position: string;
    JobDuties: string;
    Projects: string;
    SkillSets: string;
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
            <div className='mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-1 md:gap-1 lg:gap-2'>
                {companyData.map((company: any, i: any) => (
                    <div key={i} onClick={() => openModal(company)} className='flex justify-center items-center shadow-md w-[110px] sm:w-[110px] md:w-[110px] lg:w-[292px] h-[110px] sm:h-[110px] md:h-[110px] lg:h-[292px] cursor-pointer'>
                        <img className='w-full p-2 sm:p-2 md:p-2 lg:p-5' src={company.Logo} alt={company.CompanyName} />
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