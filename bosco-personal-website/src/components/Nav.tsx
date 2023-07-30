import React, { useState, useRef, useEffect } from 'react';

function Navbar() {
    const [animationWidth, setAnimationWidth] = useState(100);
    const [animationLeft, setAnimationLeft] = useState(0);

    useEffect(() => {
        const firstLink = document.querySelector("button");
        if (firstLink) {
            setAnimationWidth(firstLink.clientWidth);
            setAnimationLeft(firstLink.offsetLeft);
        }
    }, []);

    const handleMenuItemClick = (event: any) => {
        event.preventDefault();
        setAnimationWidth(event.target.clientWidth);
        setAnimationLeft(event.target.offsetLeft);
    };

    return (
        <nav className="relative mx-auto mt-12 w-590 h-50 rounded-md shadow-sm font-sans flex justify-center items-center">
            <button onClick={handleMenuItemClick} className="text-[#9A9A9A] uppercase text-center relative z-10 inline-block w-100">
                <div>
                    <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: '#9A9A9A', transform: '', msFilter: '' }}><path d="M15 3H4.984c-1.103 0-2 .897-2 2v14.016c0 1.103.897 2 2 2H19c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-4zm4 5h-3V5h3v3zM4.984 10h3v4.016h-3V10zm5 0H14v4.016H9.984V10zM16 10h3v4.016h-3V10zm-2-5v3H9.984V5H14zM7.984 5v3h-3V5h3zm-3 11.016h3v3h-3v-3zm5 3v-3H14v3H9.984zm6.016 0v-3h3.001v3H16z"></path>
                    </svg>
                    WORKS
                </div>
            </button>
            <button onClick={handleMenuItemClick} className="text-[#9A9A9A] uppercase text-center relative z-10 inline-block w-110">
                EDUS
            </button>
            <button onClick={handleMenuItemClick} className="text-[#9A9A9A] uppercase text-center relative z-10 inline-block w-100">
                PROJECTS
            </button>
            <button onClick={handleMenuItemClick} className="text-[#9A9A9A] uppercase text-center relative z-10 inline-block w-160">
                SKILLS
            </button>
            <div
                className="absolute h-5 top-0 z-0 bg-green-500 rounded-md transition-all duration-500"
                style={{ width: animationWidth, left: animationLeft }}
            />
        </nav>
    );
}

export default Navbar;