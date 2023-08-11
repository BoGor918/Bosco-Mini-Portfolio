import { useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
import { BsInstagram, BsLinkedin, BsGithub, BsWhatsapp, BsEnvelope } from "react-icons/bs";

export default function MiddleComponent() {
    const { 
        openURL 
    } = useContext(MapperContext);

    return (
        <div className="self-center w-full max-w-[415px] sm:max-w-[415px] md:max-w-[415px] lg:max-w-[910px] animate-fade-up animate-delay-150 animate-once ml-[0px] sm:md:ml-[0px] md:ml-[0px] lg:ml-[30px] mt-[2rem] sm:mt-[2rem] md:mt-[2rem] lg:mt-[4rem] mb-[3rem]">
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar">
                <div className="flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://www.instagram.com/cheungtszlai/")} className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <BsInstagram className="p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]" color="#9A9A9A" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]">Instragm</span>
                </div>
                <div className="flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://www.linkedin.com/in/tsz-lai-bosco-cheung-2476791b2/")} className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <BsLinkedin className="p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]" color="#9A9A9A" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]">LinkedIn</span>
                </div>
                <div className="flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://github.com/BoGor918")} className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <BsGithub className="p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]" color="#9A9A9A" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]">GitHub</span>
                </div>
                <div className="flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://wa.link/mthj8s")} className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <BsWhatsapp className="p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]" color="#9A9A9A" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]">WhatsApp</span>
                </div>
                <div className="flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("mailto:cheungtszlai@gmail.com")} className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <BsEnvelope className="p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]" color="#9A9A9A" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]">Email</span>
                </div>
            </div>
        </div>
    );
}