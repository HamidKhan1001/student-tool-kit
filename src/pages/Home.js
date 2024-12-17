import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoBackground from '../components/VideoBackground';
import UniversitySlider from '../components/UniversitySlider';
import SignInSignUp from './SignInSignUp';
import 'jquery';
import Slider from 'react-slick';

import Header from '../components/Header';
// Import other components used in home page

const Home = () => {
    const [cardIndex, setCardIndex] = useState(0);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [activeLink, setActiveLink] = useState('home');
    const howitworks = [
        {
          title: 'Create Your Profile',
          description: 'Begin by creating a comprehensive profile that includes your academic records, extracurricular achievements, and career interests.',
        },
        {
          title: 'Get Matched with Universities',
          description: 'Use our AI-powered Profile Matching to identify best-fit universities and programs.',
        },
        {
          title: 'Consult with Advisors',
          description: 'Speak with a U.S.-based advisor within four hours of your request to get personalized guidance.',
        },
        {
          title: 'Submit Applications',
          description: 'Apply to multiple universities without restrictions and receive support throughout each step of the process.',
        },
        {
          title: 'Prepare for Success',
          description: 'Benefit from our financial aid assistance, interview preparation, and visa application guidance to maximize your chances of success.',
        },
        {
          title: 'Receive Admissions Notifications',
          description: 'With a 99% success rate, you’ll soon be on your way to attending a university that aligns with your goals.',
        }
      ];
      const courses = [
          {
            name: 'Computer Science',
            description: 'Learn programming and software development',
            detailedDescription: 'Our Computer Science program covers fundamental concepts of programming, algorithms, data structures, and software engineering. Students will gain hands-on experience with modern technologies.',
            rank: '#1 Most Popular Major'
          },
          {
            name: 'Business Administration',
            description: 'Develop business management skills',
            detailedDescription: 'The Business Administration program provides comprehensive knowledge of business principles, management strategies, and entrepreneurship. Students learn through real-world case studies and internships.',
            rank: '#2 Most Popular Major'
          },
          {
            name: 'Engineering',
            description: 'Solve complex technical challenges',
            detailedDescription: 'Our Engineering program offers specializations in mechanical, electrical, and civil engineering. Students work on innovative projects and learn from industry-experienced faculty.',
            rank: '#3 Most Popular Major'
          }
        ];
      
      const cards = [
        {
          name: 'University of California',
          description: 'Highly ranked public university in California.',
          detailedDescription: 'The University of California is known for its world-class research and academic excellence. It offers a variety of undergraduate and graduate programs in diverse fields.',
          rank: '1st in Public Universities (U.S.)'
        },
        {
          name: 'Cincinnati University',
          description: 'Top-tier university in Ohio.',
          detailedDescription: 'The University of Cincinnati is renowned for its engineering programs and innovative teaching methods. It has a vibrant campus and offers multiple research opportunities.',
          rank: '75th in National Universities (U.S.)'
        },
        {
          name: 'University of Arizona',
          description: 'Research-focused university in the Southwest.',
          detailedDescription: 'Located in Tucson, the University of Arizona is famous for its research in agriculture and environmental science. It also has a strong business and law school.',
          rank: '115th in National Universities (U.S.)'
        }
      ];
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setNavbarVisible(false);
        } else {
          setNavbarVisible(true);
        }
      };
    
      const handleSlide = (direction) => {
        if (direction === 'left') {
          setCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
        } else if (direction === 'right') {
          setCardIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : 0)); // One card at a time
        }
      };
    
      const handleLinkClick = (link) => {
        setActiveLink(link);
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
  return (
    <>
     
    {/* <!-- ***** Header Area Start ***** --> */}
<Header/>
    {/* <!-- ***** Header Area End ***** --> */}

    {/* <!-- ***** Main Banner Area Start ***** --> */}
    <section class="section main-banner" id="top" data-section="section1">
      {/* <video autoplay muted loop id="bg-video">
      <source src="assets/images/course-video.mp4" type="video/mp4" />
  </video> */}
      <video autoPlay loop muted id="bg-video">
        <source src="/vid.mp4" type="video/mp4" />
      </video>

      <div class="video-overlay header-text">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="caption">
                <h6>Hello Students</h6>
                <h2>Welcome to Admissions Express</h2>
                <p>This is an edu meeting HTML CSS template provided by <a rel="nofollow" href="https://templatemo.com/page/1" target="_blank">TemplateMo website</a>. This is a Bootstrap v5.1.3 layout. The video background is taken from Pexels website, a group of young people by <a rel="nofollow" href="https://www.pexels.com/@pressmaster" target="_blank">Pressmaster</a>.</p>
                <div class="main-button-red">
                  <div class="scroll-to-section"><Link to="/auth" className="cta-button">Sign In / Sign Up</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- ***** Main Banner Area End ***** --> */}

    <section class="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="owl-service-item owl-carousel">

              <div class="item">
                <div class="icon">
                  <img src="assets/images/service-icon-01.png" alt="" />
                </div>
                <div class="down-content">
                  <h4>Best Education</h4>
                  <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                </div>
              </div>

              <div class="item">
                <div class="icon">
                  <img src="assets/images/service-icon-02.png" alt="" />
                </div>
                <div class="down-content">
                  <h4>Best Teachers</h4>
                  <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                </div>
              </div>

              <div class="item">
                <div class="icon">
                  <img src="assets/images/service-icon-03.png" alt="" />
                </div>
                <div class="down-content">
                  <h4>Best Students</h4>
                  <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                </div>
              </div>

              <div class="item">
                <div class="icon">
                  <img src="assets/images/service-icon-02.png" alt="" />
                </div>
                <div class="down-content">
                  <h4>Online Meeting</h4>
                  <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                </div>
              </div>

              <div class="item">
                <div class="icon">
                  <img src="assets/images/service-icon-03.png" alt="" />
                </div>
                <div class="down-content">
                  <h4>Best Networking</h4>
                  <p>Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="our-courses" id="courses">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Featured Universities</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...{
              dots: true,
              infinite: true,
              speed: 700,
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              pauseOnHover: true,
              cssEase: "ease-in-out",
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]
            }}>
              {cards.map((card, index) => (
                <div key={index} className="university-card" style={{
                  margin: '15px',
                  backgroundColor: '#1e88e5',
                  borderRadius: '20px',
                  padding: '35px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                  }
                }}>
                  <div className="university-icon" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '25px'
                  }}>
                    <img 
                      src="assets/images/service-icon-03.png" 
                      alt={card.name} 
                      style={{
                        background: 'linear-gradient(145deg, #2b4db7, #1e88e5)',
                        padding: '22px',
                        borderRadius: '50%',
                        width: '115px',
                        height: '115px',
                        objectFit: 'contain',
                        boxShadow: '0 8px 16px rgba(30,136,229,0.2)'
                      }} 
                    />
                  </div>
                  <div className="university-content" style={{textAlign: 'center'}}>
                    <h4 style={{
                      color: '#ffffff',
                      fontSize: '26px',
                      fontWeight: '700',
                      marginBottom: '18px',
                      letterSpacing: '0.5px'
                    }}>{card.name}</h4>
                    <p style={{
                      color: '#ffffff',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '0'
                    }}>{card.description}</p>
                  </div>
                </div>
              ))}
            </Slider>    
          </div>
        </div>
      </div> 
    </section>      
    <section class="upcoming-meetings" id="meetings">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Upcoming Meetings</h2>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="categories">
              <h4>Meeting Catgories</h4>
              <ul>
                <li><a href="#">Sed tempus enim leo</a></li>
                <li><a href="#">Aenean molestie quis</a></li>
                <li><a href="#">Cras et metus vestibulum</a></li>
                <li><a href="#">Nam et condimentum</a></li>
                <li><a href="#">Phasellus nec sapien</a></li>
              </ul>
              <div class="main-button-red">
                <a href="meetings.html">All Upcoming Meetings</a>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-6">
                <div class="meeting-item">
                  <div class="thumb">
                    <div class="price">
                      <span>$22.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-01.jpg" alt="New Lecturer Meeting" /></a>
                  </div>
                  <div class="down-content">
                    <div class="date">
                      <h6>Nov <span>10</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>New Lecturers Meeting</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="meeting-item">
                  <div class="thumb">
                    <div class="price">
                      <span>$36.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-02.jpg" alt="Online Teaching" /></a>
                  </div>
                  <div class="down-content">
                    <div class="date">
                      <h6>Nov <span>24</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Online Teaching Techniques</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="meeting-item">
                  <div class="thumb">
                    <div class="price">
                      <span>$14.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-03.jpg" alt="Higher Education" /></a>
                  </div>
                  <div class="down-content">
                    <div class="date">
                      <h6>Nov <span>26</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Higher Education Conference</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="meeting-item">
                  <div class="thumb">
                    <div class="price">
                      <span>$48.00</span>
                    </div>
                    <a href="meeting-details.html"><img src="assets/images/meeting-04.jpg" alt="Student Training" /></a>
                  </div>
                  <div class="down-content">
                    <div class="date">
                      <h6>Nov <span>30</span></h6>
                    </div>
                    <a href="meeting-details.html"><h4>Student Training Meetup</h4></a>
                    <p>Morbi in libero blandit lectus<br />cursus ullamcorper.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="apply-now" id="apply">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 align-self-center">
            <div class="row">
              <div class="col-lg-12">
                <div class="item">
                  <h3>APPLY FOR BACHELOR DEGREE</h3>
                  <p>You are allowed to use this edu meeting CSS template for your school or university or business. You can feel free to modify or edit this layout.</p>
                  <div class="main-button-red">
                    <div class="scroll-to-section"><a href="#contact">Join Us Now!</a></div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="item">
                  <h3>APPLY FOR BACHELOR DEGREE</h3>
                  <p>You are not allowed to redistribute the template ZIP file on any other template website. Please contact us for more information.</p>
                  <div class="main-button-yellow">
                    <div class="scroll-to-section"><a href="#contact">Join Us Now!</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="accordions is-first-expanded">
              <article class="accordion">
                <div class="accordion-head">
                  <span>About Edu Meeting HTML Template</span>
                  <span class="icon">
                    <i class="icon fa fa-chevron-right"></i>
                  </span>
                </div>
                <div class="accordion-body">
                  <div class="content">
                    <p>If you want to get the latest collection of HTML CSS templates for your websites, you may visit <a rel="nofollow" href="https://www.toocss.com/" target="_blank">Too CSS website</a>. If you need a working contact form script, please visit <a href="https://templatemo.com/contact" target="_parent">our contact page</a> for more info.</p>
                  </div>
                </div>
              </article>
              <article class="accordion">
                <div class="accordion-head">
                  <span>HTML CSS Bootstrap Layout</span>
                  <span class="icon">
                    <i class="icon fa fa-chevron-right"></i>
                  </span>
                </div>
                <div class="accordion-body">
                  <div class="content">
                    <p>Etiam posuere metus orci, vel consectetur elit imperdiet eu. Cras ipsum magna, maximus at semper sit amet, eleifend eget neque. Nunc facilisis quam purus, sed vulputate augue interdum vitae. Aliquam a elit massa.<br /><br />
                      Nulla malesuada elit lacus, ac ultricies massa varius sed. Etiam eu metus eget nibh consequat aliquet. Proin fringilla, quam at euismod porttitor, odio odio tempus ligula, ut feugiat ex erat nec mauris. Donec viverra velit eget lectus sollicitudin tincidunt.</p>
                  </div>
                </div>
              </article>
              <article class="accordion">
                <div class="accordion-head">
                  <span>Please tell your friends</span>
                  <span class="icon">
                    <i class="icon fa fa-chevron-right"></i>
                  </span>
                </div>
                <div class="accordion-body">
                  <div class="content">
                    <p>Ut vehicula mauris est, sed sodales justo rhoncus eu. Morbi porttitor quam velit, at ullamcorper justo suscipit sit amet. Quisque at suscipit mi, non efficitur velit.<br /><br />
                      Cras et tortor semper, placerat eros sit amet, porta est. Mauris porttitor sapien et quam volutpat luctus. Nullam sodales ipsum ac neque ultricies varius.</p>
                  </div>
                </div>
              </article>
              <article class="accordion last-accordion">
                <div class="accordion-head">
                  <span>Share this to your colleagues</span>
                  <span class="icon">
                    <i class="icon fa fa-chevron-right"></i>
                  </span>
                </div>
                <div class="accordion-body">
                  <div class="content">
                    <p>Maecenas suscipit enim libero, vel lobortis justo condimentum id. Interdum et malesuada fames ac ante ipsum primis in faucibus.<br /><br />
                      Sed eleifend metus sit amet magna tristique, posuere laoreet arcu semper. Nulla pellentesque ut tortor sit amet maximus. In eu libero ullamcorper, semper nisi quis, convallis nisi.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="our-courses" id="howitworks">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>How It Works</h2>
            </div>
          </div>
          <div class="col-lg-12">
            <Slider {...{
              dots: true,
              infinite: true,
              speed: 700,
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              pauseOnHover: true,
              cssEase: "ease-in-out",
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]
            }}>
              {howitworks.map((item, index) => (
                <div key={index} className="howitworks-card" style={{
                  margin: '15px',
                  backgroundColor: '#1e88e5',
                  borderRadius: '20px',
                  padding: '35px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                  }
                }}>
                  <div className="howitworks-icon" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '25px'
                  }}>
                    <img
                      src="assets/images/service-icon-01.png" 
                      alt={item.title}
                      style={{
                        background: 'linear-gradient(145deg, #2b4db7, #1e88e5)',
                        padding: '22px',
                        borderRadius: '50%',
                        width: '115px',
                        height: '115px',
                        objectFit: 'contain',
                        boxShadow: '0 8px 16px rgba(30,136,229,0.2)'
                      }}
                    />
                  </div>
                  <div className="howitworks-content" style={{textAlign: 'center'}}>
                    <h4 style={{
                      color: '#ffffff',
                      fontSize: '26px',
                      fontWeight: '700',
                      marginBottom: '18px',
                      letterSpacing: '0.5px'
                    }}>{item.title}</h4>
                    <div className="info">
                      <div className="row">
                        <div className="col-12">
                          <p style={{ color: '#ffffff' }}>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>            
            </div>
        </div>
      </div>
    </section>
    <section class="our-facts">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-12">
                <h2>A Few Facts About Our University</h2>
              </div>
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-12">
                    <div class="count-area-content percentage">
                      <div class="count-digit">94</div>
                      <div class="count-title">Succesed Students</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="count-area-content">
                      <div class="count-digit">126</div>
                      <div class="count-title">Current Teachers</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-12">
                    <div class="count-area-content new-students">
                      <div class="count-digit">2345</div>
                      <div class="count-title">New Students</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="count-area-content">
                      <div class="count-digit">32</div>
                      <div class="count-title">Awards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 align-self-center">
            <div class="video">
              <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank"><img src="assets/images/play-icon.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-us" id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 align-self-center">
            <div class="row">
              <div class="col-lg-12">
                <form id="contact" action="" method="post">
                  <div class="row">
                    <div class="col-lg-12">
                      <h2>Let's get in touch</h2>
                    </div>
                    <div class="col-lg-4">
                      <fieldset>
                        <input name="name" type="text" id="name" placeholder="YOURNAME...*" required="" />
                      </fieldset>
                    </div>
                    <div class="col-lg-4">
                      <fieldset>
                        <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="YOUR EMAIL..." required="" />
                      </fieldset>
                    </div>
                    <div class="col-lg-4">
                      <fieldset>
                        <input name="subject" type="text" id="subject" placeholder="SUBJECT...*" required="" />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <textarea name="message" type="text" class="form-control" id="message" placeholder="YOUR MESSAGE..." required=""></textarea>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <button type="submit" id="form-submit" class="button">SEND MESSAGE NOW</button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="right-info">
              <ul>
                <li>
                  <h6>Phone Number</h6>
                  <span>010-020-0340</span>
                </li>
                <li>
                  <h6>Email Address</h6>
                  <span>info@meeting.edu</span>
                </li>
                <li>
                  <h6>Street Address</h6>
                  <span>Rio de Janeiro - RJ, 22795-008, Brazil</span>
                </li>
                <li>
                  <h6>Website URL</h6>
                  <span>www.meeting.edu</span>
                </li>
              </ul>
            </div>
          </div>
        </div> 
      </div>
      <div class="footer">
        <p>Copyright © 2022 Edu Meeting Co., Ltd. All Rights Reserved.
          <br />Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a></p>
      </div>
    </section>
    </>
  );
};

export default Home;