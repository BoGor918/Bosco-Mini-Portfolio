import JavaScape from '../../images/JavaScape_Card.png'

export default function ProjectGrid() {
    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[2rem] mb-[5rem]'>
            <div className='mx-1'>
                <img src={JavaScape} alt='PCCW' width={295} />
            </div>
            <div className='mx-1'>
                <img src={JavaScape} alt='PCCW' width={295} />
            </div>
            <div className='mx-1 opacity-0'>
                <img src={JavaScape} alt='PCCW' width={295} />
            </div>
        </div>
    )
}
