import { Loader } from '@mantine/core';

export default function Loading() {
    return (
        <div>
            {
                localStorage.getItem("theme") === "light" ?
                    <div className='flex justify-center items-center h-screen bg-white'>
                        <Loader />
                    </div> :
                    <div className='flex justify-center items-center h-screen bg-[#0B1A33]'>
                        <Loader />
                    </div>
            }
        </div>
    )
}
