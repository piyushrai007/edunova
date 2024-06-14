import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className={`main-header clearfix ${isActive ? 'active' : ''}`} onClick={handleClick}role="header">
      <div className="logo">
        <Link to="/"><em>SMART</em> LEARN</Link>
      </div>
      {/* <Link to="#menu" className={`menu-link ${isActive ? 'active' : ''}`} onClick={handleClick}><i className="fa fa-bars"></i></Link>
      <nav id="menu" className={`main-nav ${isActive ? 'active' : ''}`} role="navigation">
        <ul className="main-menu">
          
          <li><Link to="#section4">subjects</Link></li>
          <li><Link to="#section5">Video</Link></li>
          <li><Link to="#section6">Contact</Link></li>
          <li><Link to="/register" className="external" style={{backgroundColor: '#f5a425', color: '#ffffff', padding: '10px 20px', borderRadius: '5px'}}>Register</Link></li>
        </ul>
      </nav> */}
    </header>
  );
}