import { useNavigate } from 'react-router-dom';
import { SideMenuItem } from '../../models/sideMenuItem';

export const SideNavbar = () => {
    const navigate = useNavigate();

    const sideMenuItems: SideMenuItem[] = [
        { id: 1, label: 'Dashboard', routeUrl: '/' },
        { id: 2, label: 'Products', routeUrl: '/products' },
        // { id: 2, label: 'Incidents', routeUrl: '/incidents' },
        { id: 3, label: 'Users', routeUrl: '/users' },
        { id: 4, label: 'Settings', routeUrl: '/settings' },
    ];

    function onMenuItemClick(event: any, data: SideMenuItem) {
        event.preventDefault();
        navigate(data.routeUrl);
    }

    return (
        <nav className="nav flex-lg-column border-end shadow-lg" style={{ width: '250px' }}>
            {sideMenuItems.map(item => (
                <a className="nav-link" key={item.id} onClick={(e: any) => onMenuItemClick(e, item)}>{item.label}</a>
            ))}
            {/* <Link to={'/'} >
                    <a className="nav-link" key={item.id} onClick={(e: any) => onMenuItemClick(e, item)}>{item.label}</a>
                </Link>
                <Link to={'incidents'} >
                    <a className="nav-link">Incidents</a>
                </Link>

                <Link to={'settings'} >
                    <a className="nav-link disabled">Settings</a>
                </Link> */}
        </nav>
    )
}
