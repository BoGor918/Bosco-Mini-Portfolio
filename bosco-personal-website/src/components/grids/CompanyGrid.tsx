import PCCW from '../../images/PCCW_Card.png'
import SPAI from '../../images/SPAI_Card.png'
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import ModalComponent from '../modal/ModalComponent';

export default function CompanyGrid() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className='animate-fade animate-delay-0 animate-once flex justify-center items-center mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[2rem] mb-[5rem]'>
            <Modal opened={opened} onClose={close} size="lg" centered>
                {/* Modal content */}
                <ModalComponent />
            </Modal>
            <div className='mx-2 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-0 lg:gap-2'>
                <div onClick={open} className='cursor-pointer'>
                    <img className='w-full' src={PCCW} alt='PCCW' />
                </div>
                <div onClick={open} className='cursor-pointer'>
                    <img className='w-full' src={SPAI} alt='SPAI' />
                </div>
            </div>
        </div>
    );
}