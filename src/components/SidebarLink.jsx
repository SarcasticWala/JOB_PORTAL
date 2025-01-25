import * as Icons from 'react-icons/vsc';
import { NavLink, matchPath, useLocation } from "react-router-dom"

export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname) || location.pathname.startsWith(route);
    }

    return (
        <NavLink 
            to={link.path}
            className={`flex flex-col items-center gap-y-1 ${matchRoute(link.path) ? 'text-[#00a264]' : 'text-[#42464d]'}`}
        >
            <Icon className="text-4xl" />
            <span className=''>{link.name}</span>
        </NavLink>
    )
}