import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'; // Import icon dari Ant Design
import './Header.css';

export default function Header({ logoSrc, variant }) {
  const location = useLocation(); // Dapatkan path aktif
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`cs_site_header cs_style1 cs_sticky_header ${
        mobileToggle ? 'cs_mobile_toggle_active' : ''
      } ${variant} ${isSticky ? 'cs_active_sticky' : ''}`}
    >
      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <Link className="cs_site_branding" to="/">
              <img src={logoSrc} alt="Logo" />
            </Link>
            <div className="cs_nav_container">
              <nav className="cs_nav">
                <ul
                  className={`${
                    mobileToggle ? 'cs_nav_list cs_active' : 'cs_nav_list'
                  }`}
                >
                  <li>
                    <Link
                      to="/"
                      className={location.pathname === '/' ? 'active' : ''}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/doctors"
                      className={location.pathname === '/doctors' ? 'active' : ''}
                    >
                      Medis
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={location.pathname === '/blog' ? 'active' : ''}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/PlaylistPage"
                      className={
                        location.pathname === '/PlaylistPage' ? 'active' : ''
                      }
                    >
                      Playlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Kalkulator"
                      className={
                        location.pathname === '/Kalkulator' ? 'active' : ''
                      }
                    >
                      Kalkulator
                    </Link>
                  </li>
                </ul>
                <span
                  className={
                    mobileToggle
                      ? 'cs_menu_toggle cs_teggle_active'
                      : 'cs_menu_toggle'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </nav>
            </div>
            <div className="cs_user_icon_container">
              <Link
                to="/LoginPage"
                className={
                  location.pathname === '/LoginPage' ? 'active' : ''
                }
              >
                <div className="cs_user_icon_circle">
                  <UserOutlined style={{ fontSize: '20px', color: '#007bff' }} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
