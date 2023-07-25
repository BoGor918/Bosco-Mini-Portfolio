import Poly from '../../images/Poly_Logo.png'
import HKCC from '../../images/HKCC_Logo.png'

export default function SkillGrid() {
    return (
        <div className='flex justify-center items-center mt-[2rem] mb-[5rem]'>
            <div className='mx-1'>
                <img src={Poly} alt='PCCW' width={295} />
            </div>
            <div className='mx-1'>
                <img src={HKCC} alt='PCCW' width={295} />
            </div>
            <div className='mx-1 opacity-0'>
                <img src={Poly} alt='PCCW' width={295} />
            </div>
        </div>
    )
}
