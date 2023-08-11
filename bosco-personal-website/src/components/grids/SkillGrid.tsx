import { useContext } from 'react';
import { MapperContext } from '../../globalVariable/MapperContextProvider';

export default function SkillGrid() {
    const {
        skillData
    } = useContext(MapperContext);

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <div className='mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-1 md:gap-1 lg:gap-4'>
                {skillData.map((skill: any, i: any) => (
                    <div key={i} className='flex justify-center items-center shadow-md w-[110px] sm:w-[110px] md:w-[110px] lg:w-[175px] h-[110px] sm:h-[110px] md:h-[110px] lg:h-[175px] cursor-pointer'>
                        <img className='w-full p-4 sm:p-4 md:p-4 lg:p-10' src={skill.Logo} alt={skill.ProjectName} />
                    </div>
                ))}
            </div>
        </div>
    );
}