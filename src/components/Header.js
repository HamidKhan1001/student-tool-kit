import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/images/aelogo.png';

const Header = () => (
  // <header className="header-area">
  //   <div className="logo-container">
  //     <Link to="/">
  //       <img src={Logo} alt="AdmissionsExpress Logo" className="logo-image" />
  //       <span className="logo-text">AdmissionsExpress</span>
  //     </Link>
  //   </div>
  //   <ul className="nav">
  //     <li><a href="#about">About Us</a></li>
  //     <li><a href="#services">Services</a></li>
  //     <li><a href="#how-it-works">How It Works</a></li>
  //     <li><a href="#testimonials">Testimonials</a></li>
  //     <li><a href="#contact">Contact Us</a></li>
  //     <li><Link to="/auth">Sign In/Sign Up</Link></li>
  //   </ul>
  // </header>
        <header class="header-area header-sticky">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                {/* <!-- ***** Logo Start ***** --> */}
                <Link to="/"className="logo">
                  <img src="/aelogo.png" alt="Logo" style={{ height: '50px', width: 'auto' }} />
                  Admissions Express
                </Link>
                {/* <!-- ***** Logo End ***** --> */}
                {/* <!-- ***** Menu Start ***** --> */}
                <ul class="nav">
                  <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
                  <li><a href="meetings.html">Meetings</a></li>
                  <li class="scroll-to-section"><a href="#apply">Apply Now</a></li>
                  <li class="has-sub">
                    <a href="javascript:void(0)">Pages</a>
                    <ul class="sub-menu">
                      <li><a href="meetings.html">Upcoming Meetings</a></li>
                      <li><a href="meeting-details.html">Meeting Details</a></li>
                    </ul>
                  </li>
                  <li class="scroll-to-section"><a href="#courses">Courses</a></li>
                  <li class="scroll-to-section"><Link to="/auth">Sign In/Sign Up</Link></li>
                </ul>
                <a class='menu-trigger'>
                  <span>Menu</span>
                </a>
                {/* <!-- ***** Menu End ***** --> */}
              </nav>
            </div>
          </div>
        </div>
      </header>
);

export default Header;
