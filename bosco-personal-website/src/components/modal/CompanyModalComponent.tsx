export default function CompanyModalComponent({
  companyName,
  team,
  position,
  jobDuties,
  projects,
  skillSets,
  years,
  logo }: {
    companyName: string;
    team: string;
    position: string;
    jobDuties: string;
    projects: string;
    skillSets: string;
    years: string;
    logo: string;
  }) {
  return (
    <div className='flex flex-col font-light p-5'>
      {/* company logo */}
      <div className='bg-[#9a9a9a17] p-10 rounded-lg'>
        <img src={logo} alt="JavaScape" width={500} />
      </div>
      {/* headline */}
      <span className='text-[25px] font-medium mt-5 mb-1'>{companyName}</span>
      {/* description */}
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Team: </span>{team}</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Position: </span>{position}</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Job Duties: </span>{jobDuties}</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Projects: </span>{projects}</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Skill Sets: </span>{skillSets}</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Yrs: </span>{years}</span>
    </div>
  )
}
