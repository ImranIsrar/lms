
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Dropdown, Navbar, Row } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";

import ThemeButton from "./widgets/Button";
import { userLogout } from "../../features/lmsSlice";
// import useSavedUser from "../../hooks/SavedUser";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowRightFromBracket, faBook, faCartShopping, faCreditCard, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { resetPersistedState, store } from "../../app/store";

const Header = () => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;
  const { qty } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  // Add / Remove Class Onscroll on Header
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 133) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Get User
  const data = secureLocalStorage.getItem('authUser');
  const isUser = (data && data !== 'undefined' && data != undefined) ? JSON.parse(data) : null;
  // const [isUser, setIsUser] = useState(parseData);
  // console.log('isUser', isUser)

  return (
    <>
      <div className="topbar">
        <Container fluid>
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="topbar-left">
                <p className="mb-0">Keep learning with free resources during COVID-19.
                  {" "}
                  <ThemeButton
                    buttonText="Learn more"
                    buttonClass="text-white"
                    buttonAfterIcon={<FontAwesomeIcon icon={faArrowRight} />}
                  />
                </p>
              </div>
            </Col>

            <Col lg={4}>
              <ul className="topbar-right d-flex justify-content-end mb-0">
                <li className="d-flex align-items-center">
                  <Link to="/become-an-instructor">Become An Instructor</Link>
                </li>
                {
                  isUser ? (
                    <li className="auth-link">
                      <ThemeButton
                        buttonText="Signout"
                        buttonClass="p-0 text-white signout"
                        buttonTag="button"
                        buttonBeforeIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                        buttonHandle={
                          (e) => {
                            dispatch(userLogout());
                            secureLocalStorage.removeItem('authUser');
                            // setIsUser(null);
                            resetPersistedState(store); //  clears the persisted state data
                          }
                        }
                      />
                    </li>
                  ) : (
                    <li className="auth-link">
                      <ThemeButton
                        buttonText="Signin"
                        buttonLink="/auth"
                        buttonClass="p-0"
                        buttonBeforeIcon={<FontAwesomeIcon icon={faArrowRight} />}
                      />
                    </li>
                  )
                }
              </ul>
            </Col>
          </Row>
        </Container>
      </div >

      <header className={isScrolled ? 'is-sticky' : ''}>
        <Navbar expand="lg" bg="light" data-bs-theme="light">
          <Container fluid>
            <Link className="navbar-brand" to="/">
              <img
                src={`${import.meta.env.VITE_IMAGES_PATH}/logo.png`}
                alt=""
                width="134"
                height="37"
              />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
              <ul className="navbar-nav d-flex mx-auto mb-0">
                <li>
                  <Link to="/" className="active">Home</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/become-an-instructor">Become An Instructor</Link>
                </li>
              </ul>

              <ul className="others-options d-flex align-items-center mb-0">
                <li>
                  <Link className="cart" to={!isUser ? "/auth" : "/checkout"}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>{qty}</span>
                  </Link>
                </li>
                <li>
                  {
                    !isUser ? (
                      <ThemeButton
                        buttonText="Register Now"
                        buttonClass="btn default-btn"
                        buttonLink="/auth"
                      />
                    ) : (
                      <Dropdown className="user-dropdown">
                        <Dropdown.Toggle variant="" id="dropdown-basic" className="p-0 border-0">
                          <img src={`${imagePath}/admin-9.jpg`} alt={isUser?.first_name} width="35" height="35" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to="#" className="default-btn">
                            <div className="d-flex align-items-center">
                              <div className="img">
                                <img src={`${imagePath}/admin-9.jpg`} alt={isUser?.first_name} width="35" height="35" />
                              </div>
                              <span className="ps-3">
                                <span className="fw-semibold fs-16 mb-1 d-block">{isUser?.first_name}</span>
                                <span className="d-block fs-13 mt-minus-2">{isUser?.email}</span>
                              </span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Divider />

                          <Dropdown.Item as={Link} to="/my-courses" className="default-btn">
                            <FontAwesomeIcon icon={faBook} />
                            <span className="ps-4">My learning</span>
                          </Dropdown.Item>

                          <Dropdown.Item as={Link} to="#" className="default-btn">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span className="ps-4">My Purchases</span>
                          </Dropdown.Item>

                          <Dropdown.Item as={Link} to="#" className="default-btn">
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="ps-4">Wishlist</span>
                          </Dropdown.Item>

                          <Dropdown.Item as={Link} to="#" className="default-btn">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="ps-4">Account settings</span>
                          </Dropdown.Item>
                          <Dropdown.Divider />

                          <Dropdown.Item as={Link} to="#" className="default-btn"
                            onClick={(e) => {
                                dispatch(userLogout());
                                secureLocalStorage.removeItem('authUser');
                                // setIsUser(null);
                                resetPersistedState(store); 
                              }
                            }
                          >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span className="ps-4">Log out</span>
                          </Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>
                    )
                  }
                </li>
              </ul>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
