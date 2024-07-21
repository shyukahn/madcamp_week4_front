import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/TopNavMenu.css'

const TopNavMenu : React.FC = ()=> {

  const isLogin = localStorage.getItem('isLogin') === 'True';

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
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to='/ranking'>
            랭킹
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link" + (isActive ? "-click" : "")} to={isLogin ? '/mypage' : '/login'}>
            {isLogin ? '마이페이지' : '로그인'}
          </NavLink>
        </nav>
        <hr />
      </div>
    </div>
  );
}

export default TopNavMenu;