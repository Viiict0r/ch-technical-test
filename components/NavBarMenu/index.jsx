import React from 'react';
import { Avatar } from 'antd';
import { FiBell } from 'react-icons/fi';

import './styles.less';

function NavBarMenu() {
  return (
    <div className="container">
      <div className="navbarmenu__container">
        <div className="navbarmenu__logo">
          <strong>ANIMEFLIX</strong>
        </div>
        <div className="navbarmenu__profile">
          <FiBell size={18} color="#fff" />
          <div className="navbarmenu__profile-user">
            <Avatar
              size="default"
              src="https://profaci.com.br/l/custom/img/depoimentos/boy-avatar.png"
            />
            <p>Visitante</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarMenu;