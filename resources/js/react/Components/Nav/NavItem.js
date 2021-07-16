import {NavLink, useLocation} from "react-router-dom";

function NavItem(props)
{
    const {
        label,
        icon : Icon,
        to,
        strict,
    } = props;

    const pathName = useLocation().pathname;

    const active = strict ? pathName == to : pathName.includes(to);

    return(
        <li className={`font-normal group relative m-3 ${active ? 'bg-gray-700 rounded-xl' : ''}`}>
            <NavLink to={to}>
                <div className={`p-3 ps-6 flex items-center space-s-3 transition text-gray-200  ${ active ? 'font-semibold' : 'group-hover:text-gray-50'}`}>
                    <span className={`transition ${active ? 'text-primary-300' : 'text-gray-100 group-hover:text-primary-300'}`}><Icon/></span>
                    <span>{label}</span>
                </div>
            </NavLink>
        </li>
    )
}

export default NavItem;