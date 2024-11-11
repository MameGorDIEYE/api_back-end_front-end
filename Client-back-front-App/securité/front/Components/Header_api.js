import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import logoLight from '../Assets/2SHITECH.png';
import logoDark from '../Assets/logo-tech.png';
import searchIconLight from '../Assets/logo-search-icon-light.png';
import searchIconDark from '../Assets/logo-search-icon-dark.png';
import toggleIconLight from '../Assets/Logo-UGB.png';

const Header = ({ theme, setTheme }) => {
  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logoLight : logoDark} alt='' className='logo' />
      <ul>
        <li><Link to='/'>Accueil</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
          <>
            <li><Link to='/'>Deconnexion</Link></li>
          </>
        {/*)}*/}
      </ul>
      <div className='search-box'>
        <input type='text' placeholder='Search' />
        <img src={theme === 'light' ? searchIconLight : searchIconDark} alt='' />
      </div>
      <img onClick={toggleMode} src={toggleIconLight} alt='' className='toggle-icon' />
    </div>
  );
};

export default Header;
