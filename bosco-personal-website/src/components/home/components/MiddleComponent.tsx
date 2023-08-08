import Icon from "../../../images/Personal_Icon.png"
import { AiOutlinePlus } from "react-icons/ai";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
import { useContext } from "react";

export default function MiddleComponent() {
    const {
        authUser
    } = useContext(MapperContext);

    return (
        <div className="self-center w-full max-w-[400px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[910px] animate-fade-up animate-delay-150 animate-once ml-[0px] sm:md:ml-[0px] md:ml-[0px] lg:ml-[30px] mt-[2rem] mb-[3rem]">
            <div className="flex overflow-x-scroll scroll-smooth no-scrollbar">
                {
                    authUser !== null ?
                        <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                            <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                                <AiOutlinePlus className="p-[20px] text-[75px] sm:text-[75px] md:text-[75px] lg:text-[95px]" color="#9A9A9A" />
                            </button>
                            <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Add New</span>
                        </div> : <></>
                }
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.8em] sm:mx-[0.8em] md:mx-[0.8em] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
            </div>
        </div>
    );
}