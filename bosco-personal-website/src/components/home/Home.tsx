import TopComponent from "./components/TopComponent";
import MiddleComponent from "./components/MiddleComponent";
import BottomComponent from "./components/BottomComponent";

export default function Home() {
    return (
        <div className="flex flex-col w-full max-w-[910px] mx-auto">
            <TopComponent />
            <MiddleComponent />
            <BottomComponent />
        </div>
    )
}
