import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { SharedContext } from '../../context/shared-context';

const Dashboard = () => {



    return (
        <SharedContext.Provider value={{data: 'yes'}}>
            <div>
                <h1>Dashboard Page</h1>
            </div>
        </SharedContext.Provider>

    )
}

export default React.memo(Dashboard);
