import PCCW_Logo from '../../images/PCCW_Logo.png'
import SPAI_Logo from '../../images/SPAI_Logo.png'
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import CompanyModalComponent from '../modal/CompanyModalComponent';

interface Company {
    companyName: string;
    team: string;
    position: string;
    jobDuties: string;
    projects: string;
    skillSets: string;
    years: string;
    logo: string;
}

export default function CompanyGrid() {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const companyData: Company[] = [
        {
            companyName: "Lenovo PCCW Solutions",
            team: "Financial Services",
            position: "Solutions Developer & Business Analyst",
            jobDuties: "App Development & Customer Management",
            projects: "Insurance & Bank Applications",
            skillSets: "React TS / Angular TS / Ionic / Python / Java",
            years: "03/07/2022 - Present",
            logo: PCCW_Logo,
        },
        {
            companyName: "Sisters Pro AI Solutions Limited",
            team: "Project Team",
            position: "Project Developer",
            jobDuties: "Web / App Development & Customer Management",
            projects: "Vendor Projects",
            skillSets: "React JS",
            years: "01/05/2022 - 01/05/2023",
            logo: SPAI_Logo,
        },
        {
            companyName: "Sisters Pro AI Solutions Limited",
            team: "Project Team",
            position: "Project Developer",
            jobDuties: "Web / App Development & Customer Management",
            projects: "Vendor Projects",
            skillSets: "React JS",
            years: "01/05/2022 - 01/05/2023",
            logo: SPAI_Logo,
        },
        {
            companyName: "Sisters Pro AI Solutions Limited",
            team: "Project Team",
            position: "Project Developer",
            jobDuties: "Web / App Development & Customer Management",
            projects: "Vendor Projects",
            skillSets: "React JS",
            years: "01/05/2022 - 01/05/2023",
            logo: SPAI_Logo,
        },
        {
            companyName: "Sisters Pro AI Solutions Limited",
            team: "Project Team",
            position: "Project Developer",
            jobDuties: "Web / App Development & Customer Management",
            projects: "Vendor Projects",
            skillSets: "React JS",
            years: "01/05/2022 - 01/05/2023",
            logo: SPAI_Logo,
        },
    ];

    const openModal = (company: Company) => {
        setSelectedCompany(company);
        open();
    };

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-1 md:gap-1 lg:gap-2'>
                {companyData.map((company, i) => (
                    <div key={i} onClick={() => openModal(company)} className='flex justify-center items-center shadow-md w-[125px] sm:w-[125px] md:w-[125px] lg:w-[292px] h-[125px] sm:h-[125px] md:h-[125px] lg:h-[292px] cursor-pointer'>
                        <img className='w-full p-5' src={company.logo} alt={company.companyName} />
                    </div>
                ))}
            </div>
            <Modal opened={opened} onClose={close} size="lg" centered>
                {selectedCompany && (
                    <CompanyModalComponent
                        companyName={selectedCompany.companyName}
                        team={selectedCompany.team}
                        position={selectedCompany.position}
                        jobDuties={selectedCompany.jobDuties}
                        projects={selectedCompany.projects}
                        skillSets={selectedCompany.skillSets}
                        years={selectedCompany.years}
                        logo={selectedCompany.logo}
                    />
                )}
            </Modal>
        </div>
    );
}