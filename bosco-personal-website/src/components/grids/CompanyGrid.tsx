import PCCW from '../../images/PCCW_Logo.png'
import SPAI from '../../images/SPAI_Logo.png'

export default function CompanyGrid() {
    return (
        <div className='flex justify-center items-center mt-[2rem] mb-[5rem]'>
            <div className='mx-1'>
                <img src={PCCW} alt='PCCW' width={295} />
            </div>
            <div className='mx-1'>
                <img src={SPAI} alt='PCCW' width={295} />
            </div>
            <div className='mx-1 opacity-0'>
                <img src={PCCW} alt='PCCW' width={295} />
            </div>
        </div>
    )
}
