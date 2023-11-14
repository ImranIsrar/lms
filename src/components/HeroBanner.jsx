
import { memo } from "react";
import { Col, Form, Row } from "react-bootstrap";

import ThemeButton from "./resuable/widgets/Button";
import Layout from "./resuable/widgets/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";


const HeroBanner = () => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;

  return (
    <>
      <Layout
        secClass="hero-banner background position-relative"
        secContainerFluid={true}
        secAfterContainerContent={
          <>
            <LazyLoadImage src={`${imagePath}/shape-2.svg`} alt="" className="shape shape-2" width="134" height="147" />
            <LazyLoadImage src={`${imagePath}/shape-3.svg`} alt="" width="166" height="66" className="shape shape-3" />
          </>
        }
        secStyle={{
          backgroundImage: `url(${imagePath}/banner-bg.jpg)`,
          backgroundPosition: '50% 50%'
        }}
      >
        <Row className="algin-items-center">
          <Col lg={6}>
            <div className="banner-img position-relative">
              <LazyLoadImage
                src={`${imagePath}/banner-img-1.png`}
                alt=""
                className="img-fluid"
                width="793"
                height="555"
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="hero-banner-content">
              <h1>Improve Your Online Learning Experience Better Instantly</h1>
              <p>We have <span>40k+</span> Online courses & <span>500K+</span> Online registered student. Find your desired Courses from them.</p>
              <Form className="search-form position-relative mb-4">
                <div className="d-flex flex-wrap">
                  <div className="search-form-input d-flex">
                    <Form.Control type="search"
                      name="search"
                      placeholder="Search Courses"
                    />
                  </div>
                  <div className="search-form-submit">
                    <ThemeButton
                      buttonText="Search Now"
                      buttonTag="button"
                      buttonType="submit"
                      buttonClass="btn default-btn"
                      buttonAfterIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    />
                  </div>
                </div>
              </Form>

              <ul className="trusted-people d-flex flex-wrap align-items-center">
                <li>
                  <LazyLoadImage src={`${imagePath}/client-1.jpg`} alt="" width="46" height="46" className="rounded-circle" />
                  <LazyLoadImage src={`${imagePath}/client-2.jpg`} alt="" width="46" height="46" className="rounded-circle" />
                  <LazyLoadImage src={`${imagePath}/client-3.jpg`} alt="" width="46" height="46" className="rounded-circle" />
                </li>
                <li>
                  <span className="ps-2">500K+ People already trusted us.</span> {""}
                  <ThemeButton
                    buttonText="View Courses"
                    buttonLink="/courses"
                    buttonClass="read-more"
                    buttonAfterIcon={<FontAwesomeIcon icon={faArrowRight} />}
                  />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default memo(HeroBanner)
