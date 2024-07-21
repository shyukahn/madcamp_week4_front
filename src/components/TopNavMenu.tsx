import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/TopNavMenu.css'

const TopNavMenu : React.FC = ()=> {

  return (
    <div className='top-nav-menu'>
      <div className='logo'>
        로고
      </div>
      <div className='menu-container'>
        <nav className='nav-container'>
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to='/'>
            방 찾기
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to='/'>
            방 만들기
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to='/'>
            랭킹
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to='/'>
            마이페이지
          </NavLink>
        </nav>
        <hr />
      </div>
    </div>
  );
}

export default TopNavMenu;