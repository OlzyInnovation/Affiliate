import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Dashboard.css';

import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
  return (
    <>
      <div className='wrapper'>
        <Sidebar />

        <div className='relative md:ml-64 bg-blueGray-100'>
          {/* <AdminNavbar /> */}
          {/* Header */}
          {/* <HeaderStats /> */}
          <div className='px-4 md:px-10 mx-auto w-full -m-24'>
            <Switch>
              <Route path='/dashboard/convert' exact component={Dashboard} />
              <Route path='/dashboard/convert' exact component={Dashboard} />
              {/* <Redirect from='/admin' to='/admin/dashboard' /> */}
            </Switch>
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </div>
    </>
  );
}
