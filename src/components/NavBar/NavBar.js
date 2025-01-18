import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-left">
          <Menu 
            className="menu-icon mobile-only" 
            size={24} 
            onClick={() => setShowMobileMenu(true)}
          />
          <Link to="/" className="logo-container">
            <img 
              className="logo" 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
              alt="Netflix" 
            />
          </Link>
          <div className="nav-links desktop-only">
            <Link to="/">Home</Link>
            <Link to="/tv-shows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/new">New & Popular</Link>
            <Link to="/my-list">My List</Link>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="search-container" ref={searchRef}>
            <div className={`search-box ${showSearch ? 'search-active' : ''}`}>
              {showSearch ? (
                <X 
                  className="search-close" 
                  size={20} 
                  onClick={() => setShowSearch(false)}
                />
              ) : (
                <Search 
                  className="search-icon" 
                  size={24} 
                  onClick={() => setShowSearch(true)}
                />
              )}
              <input 
                type="text" 
                placeholder="Titles, people, genres" 
                className={`search-input ${showSearch ? 'show' : ''}`}
              />
            </div>
          </div>

          <Bell className="notification-icon" size={24} />

          <div className="profile-menu" ref={dropdownRef}>
            <div 
              className="profile-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                className="avatar" 
                src={user?.photoURL || "https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"}
                alt="Avatar" 
              />
              <ChevronDown 
                className={`dropdown-icon ${showDropdown ? 'rotated' : ''}`} 
                size={16} 
              />
            </div>

            {showDropdown && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={handleLinkClick}>
                  <img 
                    className="dropdown-avatar" 
                    src={user?.photoURL || "https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"}
                    alt="Avatar" 
                  />
                  <span>{user?.displayName || user?.email}</span>
                </Link>
                <Link to="/profile" className="dropdown-item" onClick={handleLinkClick}>
                  Account Settings
                </Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Sign out of Netflix
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-header">
          <X size={24} className="close-menu" onClick={() => setShowMobileMenu(false)} />
        </div>
        <div className="mobile-menu-content">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/tv-shows" onClick={handleLinkClick}>TV Shows</Link>
          <Link to="/movies" onClick={handleLinkClick}>Movies</Link>
          <Link to="/new" onClick={handleLinkClick}>New & Popular</Link>
          <Link to="/my-list" onClick={handleLinkClick}>My List</Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;