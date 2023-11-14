
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from 'react-router-dom';

import filterCourse from '../Services/filterCourse';
import { faClock, faDownload, faGraduationCap, faSignal, faUnlockKeyhole, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThemeButton from './resuable/widgets/Button';

const CourseIntroduction = ({ title }) => {

  // Image Path
  const imagePath = import.meta.env.VITE_IMAGES_PATH;

  const newTitle = title.replace(/-/g, ' ');
  const [singleCourse, setSingleCourse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Course Introduction run');
    // Get Single Course
    const getSingleCourse = () => {
      filterCourse.getFilterCourse(null, 'slug', title)
        .then((res) => {

          console.log('res.data', res.data[0])
          setSingleCourse(res.data[0]);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
    getSingleCourse();
  }, []);

  return (
    <>
      {
        isLoading ? (
          Object.keys(singleCourse).length ? (
            <Row>
              <Col lg={8}>
                <div className="single-course-detail">
                  {/* Title */}
                  <h2 className="text-capitalize">{newTitle}</h2>

                  {/* Meta */}
                  <ul className="meta d-flex flex-wrap align-items-center mb-4">
                    <li>
                      <Link to={`/category/${singleCourse?.category?.name.replace(/\s+/g, '-').toLowerCase()}`} className="meta-category">{singleCourse?.category?.name}</Link>
                    </li>
                    <li><span>4</span> Students</li>
                    <li>Last Updated <span>{singleCourse.update_date}</span></li>
                  </ul>

                  {/* Author */}
                  <div className="admin d-flex align-items-center mb-4 pb-2">
                    <div>
                      <img
                        src={`${imagePath}/${singleCourse.author.author_img}`}
                        className="rounded-circle me-2"
                        alt="Instructor"
                        width="36"
                        height="36"
                      />
                    </div>
                    <div>
                      <span className="pe-2">Created By</span>
                      <Link to="#" className="course-instructor" style={{ color: 'var(--primary)' }}>
                        {singleCourse.author.author_name}
                      </Link>
                    </div>
                  </div>

                  <h4 className="mb-3">What you'll learn In This Course</h4>
                  <ul className="not-style mb-50">
                    <li>We will learn how to do correctly warm up</li>
                    <li>We will learn why warm up is important</li>
                    <li>Improved fitness through exercises</li>
                    <li>We will learn how we can contour our body shape</li>
                  </ul>

                  <Tabs
                    defaultActiveKey="overview"
                    id="single-course-tabs"
                    className="single-course-tabs"
                  >
                    <Tab eventKey="overview" title="Overview">
                      <p>Complete Workout For Weight Loss & Muscle Building</p>
                      <p>In this course I will take you through the process of becoming a fitness expert step by step. You will learn everything you need to know about the fundamentals of good training programs and how to design your very own program for you or your clients.</p>
                      <p>I created this course for stay-at-home moms, college students, and anybody passionate about health and fitness who wants to create extra income or make a living doing what they love… fitness!</p>
                      <p><i>Complete workout for Fitness, Weight loss, Weight gain, & Body Building</i></p>
                      <p>By the end of this course you will get Fitness Certification from Institute of Pakistan!</p>
                      <ul>
                        <li>Learn weight loss for real & forever in A simple Manner</li>
                        <li>How to lose weight very fast</li>
                        <li>Improved fitness through exercise</li>
                        <li>We will learn how we can contour our body shape</li>
                      </ul>
                    </Tab>

                    <Tab eventKey="requirements" title="Requirements">
                      <ul>
                        <li>Passion for fitness</li>
                        <li>Commitment to complete the course</li>
                        <li>Access To Gym and Gym Equipment</li>
                        <li>Comfortable clothes and shoes</li>
                      </ul>
                    </Tab>

                    <Tab eventKey="course-for" title="Who Is This Course For">
                      <ul>
                        <li>This course are for those who want to live life with fitness</li>
                        <li>This course are for those who want to know about simple & easy exercises</li>
                        <li>This course is for those who want to make a change in their lifestyle.</li>
                        <li>This course is for those who want to lose thigh or hip fat, belly fat, side or love handles</li>
                      </ul>
                    </Tab>
                  </Tabs>
                </div>
              </Col>

              <Col lg={4}>
                <Card className="border-0 course-card select-course">
                  <Card.Img variant="top" src={`${imagePath}/${singleCourse.img}`} />
                  <Card.Body>
                    <div className="course-card-header d-flex flex-wrap justify-content-between align-items-center mb-30">
                      <div>
                        <h4>
                          {
                            singleCourse.oldPrice ? (
                              <>
                                <ins>
                                  <bdi>${singleCourse.price}</bdi>
                                </ins>{""}
                                <del>
                                  <bdi>${singleCourse.oldPrice}</bdi>
                                </del>
                              </>
                            ) : (
                              <ins className="text-decoration-none">
                                <bdi>${singleCourse.price}</bdi>
                              </ins>
                            )
                          }
                        </h4>
                      </div>

                      <div><p className="mb-0" style={{ color: 'var(--text)' }}>Offer for today</p></div>
                    </div>

                    <ul className="course-card-detail">
                      {/* <li className="pt-0">
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faDesktop} />
                          </span>
                          Live Class
                        </div>
                        <div>
                          No
                        </div>
                      </li> */}

                      <li className="pt-0">
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faSignal} />
                          </span>
                          <span>Category</span>
                        </div>

                        <div>{singleCourse.category.name}</div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faClock} />
                          </span>
                          <span>Duration</span>
                        </div>

                        <div>{singleCourse.duration}</div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faUserGraduate} />
                          </span>
                          <span>Lectures</span>
                        </div>

                        <div>{singleCourse.lecture}</div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faDownload} />
                          </span>
                          <span>Resources</span>
                        </div>

                        <div>0 downloadable</div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faGraduationCap} />
                          </span>
                          <span>Enrolled</span>
                        </div>

                        <div>0 Students</div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center">
                          <span className="pe-2">
                            <FontAwesomeIcon icon={faUnlockKeyhole} />
                          </span>
                          <span>Access</span>
                        </div>

                        <div>{singleCourse.access_time}</div>
                      </li>
                    </ul>

                    <div className="coupon text-center">
                      <Link to="#" className="d-inline-block">Apply Coupon</Link>
                    </div>

                    <ThemeButton 
                      buttonText="View Cart"
                      buttonClass="default-btn block w-100 text-center mt-3"
                      buttonLink="/checkout"
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <h2 className="text-capitalize text-center result-not-found">
                <span>404</span> Result Not Found
              </h2>
            </>
          )
        ) : (
          <h2 className="text-capitalize text-center loading">Loading <span>...</span></h2>
        )
      }
    </>
  )
}

export default CourseIntroduction
