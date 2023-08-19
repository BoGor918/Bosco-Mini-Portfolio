// others
import { useContext } from "react";
// global components
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// icons
import { BsInstagram, BsLinkedin, BsGithub, BsWhatsapp, BsEnvelope } from "react-icons/bs";

export default function MiddleComponent() {
    // global variable
    const {
        openURL,
        authUser
    } = useContext(MapperContext);

    // style variable
    const parentStyle = "self-center w-full max-w-[415px] sm:max-w-[415px] md:max-w-[415px] lg:max-w-[910px] animate-fade-up animate-delay-150 animate-once ml-[0px] sm:md:ml-[0px] md:ml-[0px] lg:ml-[30px] mt-[2rem] sm:mt-[2rem] md:mt-[2rem] lg:mt-[4rem] mb-[1.5rem] sm:mb-[1.5rem] md:mb-[1.5rem] lg:mb-[3rem]"
    const parentAuthStyle = "self-center w-full max-w-[415px] sm:max-w-[415px] md:max-w-[415px] lg:max-w-[910px] animate-fade-up animate-delay-150 animate-once ml-[0px] sm:md:ml-[0px] md:ml-[0px] lg:ml-[30px] mt-[2rem] sm:mt-[2rem] md:mt-[2rem] lg:mt-[4rem] mb-[1rem] sm:mb-[1rem] md:mb-[1rem] lg:mb-[3rem]"
    const buttonStyle = "border-[1.5px] border-[#9a9a9a62] dark:border-[#94A3B8] rounded-full p-[2px]"
    const textStyle = "text-black dark:text-[#94A3B8] self-center mt-[0.5rem] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px]"
    const iconStyle = "text-[#9A9A9A] dark:text-[#94A3B8] p-[20px] text-[67px] sm:text-[67px] md:text-[67px] lg:text-[75px]"
    const iconBoxStyle = "flex flex-col mx-[1.1rem] sm:mx-[1.1rem] md:mx-[1.1rem] lg:mx-[2rem]"

    return (
        <div className={authUser === null ? parentStyle : parentAuthStyle}>
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar">
                {/* instragm box */}
                <div className={iconBoxStyle} style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://www.instagram.com/cheungtszlai/")} className={buttonStyle}>
                        <BsInstagram className={iconStyle} />
                    </button>
                    <span className={textStyle}>Instragm</span>
                </div>
                {/* linkedin box */}
                <div className={iconBoxStyle} style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://www.linkedin.com/in/tsz-lai-bosco-cheung-2476791b2/")} className={buttonStyle}>
                        <BsLinkedin className={iconStyle} />
                    </button>
                    <span className={textStyle}>LinkedIn</span>
                </div>
                {/* github box */}
                <div className={iconBoxStyle} style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://github.com/BoGor918")} className={buttonStyle}>
                        <BsGithub className={iconStyle} />
                    </button>
                    <span className={textStyle}>GitHub</span>
                </div>
                {/* whatsapp box */}
                <div className={iconBoxStyle} style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("https://wa.link/8zfh0o")} className={buttonStyle}>
                        <BsWhatsapp className={iconStyle} />
                    </button>
                    <span className={textStyle}>WhatsApp</span>
                </div>
                {/* email box */}
                <div className={iconBoxStyle} style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button onClick={() => openURL("mailto:cheungtszlai@gmail.com")} className={buttonStyle}>
                        <BsEnvelope className={iconStyle} />
                    </button>
                    <span className={textStyle}>Email</span>
                </div>
            </div>
        </div>
    );
}