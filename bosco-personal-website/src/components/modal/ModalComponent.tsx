import PCCWLogo from '../../images/PCCW_Logo.png'

export default function ModalComponent() {

  return (
    <div className='flex flex-col font-light p-5'>
      {/* company logo */}
      <div className='bg-[#9a9a9a17] p-10 rounded-lg'>
        <img src={PCCWLogo} alt="JavaScape" width={500} />
      </div>
      {/* headline */}
      <span className='text-[25px] font-medium mt-5 mb-1'>Lenovo PCCW Solutions</span>
      {/* description */}
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Team:</span> Financial Services - Focus on Insurance & Bank Projects</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Position:</span> Solutions Developer & Business Analyst</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Job Duties:</span> Application Development & Customer Management</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Skill Sets:</span> React / Angular / Ionic / Python / Java</span>
      <span className='text-[16px] text-[#9A9A9A] text-justify'><span className='font-medium'>Yrs:</span> 2, 03/07/2023 - Present</span>
    </div>
  )
}
