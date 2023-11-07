import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;
  return (
    <>
      <footer className="bg-sky position-relative">
        <div className="pt-100 pb-70">
          <Container>
            <Row>
              <Col lg={3} sm={6}>
                <Link to="/" className="mb-3 d-block">
                  <img src={`${imagePath}/logo.png`} alt="" />
                </Link>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis mi suscipit bibendum sit amet, consectetur.</p>
              </Col>

              <Col lg={3} sm={6}>
                <h5>Quick Link</h5>
                <ul className="quick-links">
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link to="/terms-conditions/">Terms & Conditions</Link>
                  </li>
                </ul>
              </Col>

              <Col lg={3} sm={6}>
                <h5>Help Center</h5>
                <ul className="quick-links">
                  <li>
                    <Link to="#">Support</Link>
                  </li>
                  <li>
                    <Link to="/faq">Get Help</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </Col>

              <Col lg={3} sm={6}>
                <h5>Contact Info</h5>
                <ul className="quick-links contact-info">
                  <li>
                    <span>Call Us: </span>
                    <Link to="tel:000 000 0000">000 000 0000</Link>
                  </li>
                  <li>
                    <span>Address: </span>
                    +7011 Vermont Ave, Los Angeles, CA 90044
                  </li>
                  <li>
                    <span>Mail Us: </span>
                    <Link to="mailto:info@gmail.com">info@gmail.com</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>

          <img src={`${imagePath}/footer-shape-1.png`} className="shape shape-1" alt="" />
          <img src={`${imagePath}/footer-shape-2.png`} className="shape shape-2" alt="" />
        </div>

        <div className="copyright text-center">
          <Container>
            <p className="mb-0">© LMS 2023 is Proudly Owned by <Link to="https://websouls.com/" target="_blank">Websouls.com</Link></p>
          </Container>
        </div>
      </footer>
    </>
  )
}

export default Footer
