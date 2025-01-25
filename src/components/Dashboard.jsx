import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <>
            <div className="relative flex h-[calc(100vh-3rem)] overflow-y-hidden">
                <Sidebar />
                <div className="w-full overflow-scroll overflow-x-hidden">
                    <div className='mx-auto w-full py-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}