/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function CompanyModalComponent({
  companyName,
  team,
  position,
  jobDuties,
  projects,
  skillSets,
  startDate,
  endDate,
  present,
  logo }: {
    companyName: string;
    team: string;
    position: string;
    jobDuties: string;
    projects: string;
    skillSets: string;
    startDate: any;
    endDate: any;
    present: boolean;
    logo: string;
  }) {

  const [toStartDate, setToStartDate] = useState('')
  const [toEndDate, setToEndDate] = useState('')
  const [totalYear, setTotalYear] = useState(0)
  const [totalMonth, setTotalMonth] = useState(0)

  useEffect(() => {
    if (present === true) {
      setToStartDate(new Date(startDate.seconds * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      setToEndDate("Present")
      const today = new Date()
      const tempTotalYear = today.getFullYear() - startDate.toDate().getFullYear()
      const tempTotalMonth = today.getMonth() - startDate.toDate().getMonth()
      setTotalYear(tempTotalYear)
      setTotalMonth(tempTotalMonth)
    } else {
      setToStartDate(new Date(startDate.seconds * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      setToEndDate(new Date(endDate.seconds * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      const tempTotalYear = endDate.toDate().getFullYear() - startDate.toDate().getFullYear()
      const tempTotalMonth = endDate.toDate().getMonth() - startDate.toDate().getMonth()
      setTotalYear(tempTotalYear)
      setTotalMonth(tempTotalMonth)
    }
  }, [])

  return (
    <div className='flex flex-col font-light p-1 sm:p-1 md:p-1 lg:p-5'>
      {/* company logo */}
      <div className='bg-[#9a9a9a17] p-5 sm:p-5 md:p-5 lg:p-10 rounded-lg'>
        <img src={logo} alt="JavaScape" width={500} />
      </div>
      {/* headline */}
      <span className='text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{companyName}</span>
      {/* description */}
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Team: </span>{team}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Position: </span>{position}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Job Duties: </span>{jobDuties}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Projects: </span>{projects}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Skill Sets: </span>{skillSets}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'>
        <span className='font-medium'>Period: </span>
        {totalYear.toString()} {totalYear > 1 ? "Years" : "Year"} {totalMonth.toString()} {totalMonth > 1 ? "Months" : "Month"}, {toStartDate} - {toEndDate}
      </span>
    </div>
  )
}
