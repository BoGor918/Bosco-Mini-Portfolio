import PCCW from '../../images/PCCW_Card.png'
import SPAI from '../../images/SPAI_Card.png'
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import ModalComponent from '../modal/ModalComponent';

export default function CompanyGrid() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className='flex justify-center items-center mt-[2rem] mb-[5rem]'>
            <Modal opened={opened} onClose={close} size="lg" centered>
                {/* Modal content */}
                <ModalComponent />
            </Modal>
            <div onClick={open} className='mx-1'>
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
