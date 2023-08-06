import Poly from '../../images/Poly_Card.png'
import HKCC from '../../images/HKCC_Card.png'

export default function EduGrid() {
    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[2rem] mb-[5rem]'>
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
