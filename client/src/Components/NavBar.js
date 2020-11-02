import React from 'react';
import ChartIcon from './Icons/ChartIcon';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <header>
        <Link to='/'><ChartIcon /><h1 className="title">COT Reports</h1></Link>
      </header>
      <nav>Easy to read Commitments of Traders (COT) reports</nav>
    </div>
  );
}

export default NavBar;