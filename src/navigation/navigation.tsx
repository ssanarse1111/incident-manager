import { Navbar } from './navbar/navbar';
import './navigation.css'
import { Outlet } from 'react-router-dom';
import { SideNavbar } from './side-navbar/side-navbar';

export const Navigation = () => {
    
    return (
        <div>
            <Navbar />
            <div className='d-lg-flex align-items-lg-stretch'>
                <SideNavbar />
                <div className='flex-fill px-5 py-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
