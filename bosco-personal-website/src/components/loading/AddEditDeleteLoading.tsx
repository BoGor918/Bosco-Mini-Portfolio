// mantine
import { Loader } from '@mantine/core';

export default function AddEditDeleteLoading() {
    return (
        <div>
            {/* loader on different color theme */}
            {
                localStorage.getItem("theme") === "light" ?
                    <div className='flex justify-center items-center h-screen bg-white'>
                        <Loader size="lg" />
                    </div> :
                    <div className='flex justify-center items-center h-screen bg-[#0B1A33]'>
                        <Loader size="lg" />
                    </div>
            }
        </div>
    )
}
