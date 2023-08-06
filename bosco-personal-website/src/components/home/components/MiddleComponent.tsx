import Icon from "../../../images/Personal_Icon.png"
import { AiOutlinePlus } from "react-icons/ai";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
import { useContext } from "react";

export default function MiddleComponent() {
    const {
        authUser
    } = useContext(MapperContext);

    return (
        <div className="animate-fade-up animate-delay-150 animate-once ml-[0px] sm:md:ml-[0px] md:ml-[0px] lg:ml-[30px] mt-[2rem] mb-[3rem] w-full">
            <div className="flex overflow-x-scroll scroll-smooth">
                {
                    authUser !== null ?
                        <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                            <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                                <AiOutlinePlus className="p-[20px] text-[75px] sm:text-[75px] md:text-[75px] lg:text-[95px]" color="#9A9A9A" />
                            </button>
                        </div> : <></>
                }
                <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>
                <div className="flex flex-col mx-[0.7rem] sm:mx-[1rem] md:mx-[1rem] lg:mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full w-[75px] sm:w-[75px] md:w-[75px] lg:w-[95px]" src={Icon} alt="img" />
                    </button>
                    <span className="self-center mt-[0.5rem] text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Hobbie 01</span>
                </div>

            </div>
        </div>
    );
}