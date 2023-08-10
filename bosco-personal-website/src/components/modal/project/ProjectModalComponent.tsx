/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function ProjectModalComponent({
  projectName,
  description,
  techStack,
  link,
  logo }: {
    projectName: string,
    description: string,
    techStack: [],
    link: [],
    logo: string
  }) {

  const [techStackList, setTechStackList] = useState('')

  useEffect(() => {
    var tempTechStackList = ''

    for (let i = 0; i < techStack.length; i++) {
      if (i === techStack.length - 1) {
        tempTechStackList += techStack[i]
      } else {
        tempTechStackList += techStack[i] + ' / '
      }
    }

    setTechStackList(tempTechStackList)
  }, [])

  return (
    <div className='flex flex-col font-light p-1 sm:p-1 md:p-1 lg:p-5'>
      {/* company logo */}
      <div className='bg-[#9a9a9a17] p-[3rem] sm:p-[3rem] md:p-[3rem] lg:p-[6rem] rounded-lg'>
        <img src={logo} alt="JavaScape" width={500} />
      </div>
      {/* headline */}
      <span className='text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{projectName}</span>
      {/* description */}
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Description: </span>{description}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Tech Stack(s): </span>{techStackList}</span>
      <span className='text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A]'><span className='font-medium'>Link(s):<br /></span>
        <span>
          {
            link.map((link: any) => {
              return (
                <span>
                  <a href={link} target='_blank' rel='noreferrer' className='text-[#9A9A9A] hover:underline'>{link}<br /></a>
                </span>
              )
            })
          }
        </span>
      </span>
    </div>
  )
}
