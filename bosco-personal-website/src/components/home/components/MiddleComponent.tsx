import Icon from "../../../images/Personal_Icon.png"
import { AiOutlinePlus } from "react-icons/ai";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
import { useContext } from "react";

export default function MiddleComponent() {
    const {
        authUser
    } = useContext(MapperContext);

    return (
        <div className="animate-fade-up animate-delay-150 animate-once ml-[30px] mt-[2rem] mb-[3rem] w-full">
            <div className="flex overflow-x-scroll scroll-smooth">
                {
                    authUser !== null ?
                        <div className="flex flex-col mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                            <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                                <AiOutlinePlus className="p-[20px]" size={95} color="#9A9A9A" />
                            </button>
                        </div> : <></>
                }
                <div className="flex flex-col mx-[2rem]" style={{ flexBasis: "auto", flexGrow: 0, flexShrink: 0 }}>
                    <button className="border-[1.5px] border-[#9a9a9a62] rounded-full p-[2px]">
                        <img className="rounded-full" src={Icon} alt="img" width={95} />
                    </button>
                    <span className="self-center mt-[0.5rem]">Hobbie 01</span>
                </div>
            </div>
        </div>
    );
}