export default function IntroductionModalComponent() {
  // style variable
  const textStyle = 'text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]'

  return (
    <div className='flex flex-col font-light p-3'>
      {/* headline */}
      <span className='font-medium text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px]'>
        Welcome To My Mini Portfolio Website
      </span>
      {/* description */}
      <span className={textStyle}>
        The Mini Portfolio Website is a dynamic and efficient web app built with <b>Node</b>, <b>React</b>, <b>TypeScript</b>, <b>Firebase</b>, and <b>Mantine</b>. This powerful stack forms the foundation for showcasing your skills, projects, and accomplishments. With responsive design, it presents my work experience, education, projects, and skills in an engaging manner.
      </span>
    </div>
  )
}
