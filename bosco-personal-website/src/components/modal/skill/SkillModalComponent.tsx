export default function SkillModalComponent({
  skillName,
  logo
}: {
  skillName: string,
  logo: string
}) {

  return (
    <div className='flex flex-col font-light p-3'>
      {/* project logo */}
      <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
        <img src={logo} alt={skillName} width={150} />
      </div>
      {/* headline */}
      <span className='text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{skillName}</span>
    </div>
  )
}
