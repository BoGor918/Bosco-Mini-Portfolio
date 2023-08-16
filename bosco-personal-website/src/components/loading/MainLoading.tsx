// others
import { useEffect } from 'react';
// mantine
import { Loader } from '@mantine/core';

export default function MainLoading() {
    // set theme color to meta content and body background color
    useEffect(() => {
        const handleThemeColorChange = () => {
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');

            if (themeColorMeta && localStorage.getItem("theme") === 'dark') {
                themeColorMeta.setAttribute('content', '#0B1A33'); // Set the new theme color
                document.body.style.backgroundColor = '#0B1A33';
            } else if (themeColorMeta && localStorage.getItem("theme") === 'light') {
                themeColorMeta?.setAttribute('content', '#FFFFFF'); // Set the new theme color
                document.body.style.backgroundColor = '#FFFFFF';
            }
        };
        handleThemeColorChange();
    }, []);

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
