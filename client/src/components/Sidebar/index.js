import React from 'react';
import { Wrapper, Bar, Bars, NavMenu, NavLink } from './Sidebar';

const Sidebar = () => {
  return (
    <>
      <Wrapper>
        <Bars />
        <Bar>
          <h1>Hello, User</h1>
        </Bar>
        <NavMenu>
          <NavLink to='/dashboard' activeStyle>
            Home
          </NavLink>
          <NavLink to='/convert' activeStyle>
            Convert
          </NavLink>
          <NavLink to='/telegram' activeStyle>
            Telegram
          </NavLink>
          <NavLink to='/twitter' activeStyle>
            Twitter
          </NavLink>
        </NavMenu>
      </Wrapper>
    </>
  );
};

export default Sidebar;
