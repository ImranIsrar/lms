
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

import Layout from '../../components/resuable/widgets/Layout'
import CourseCard from '../../components/resuable/widgets/CourseCard'
import filterCourse from '../../Services/filterCourse'
// import useSavedUser from '../../hooks/SavedUser'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'


const MyCoures = () => {

  // Image Path
  const imagePath = import.meta.env.VITE_IMAGES_PATH;

  // Get User
  // const user = useSavedUser('authUser');
  const data = secureLocalStorage.getItem('authUser');
  const user = (data && data !== 'undefined' && data != undefined) ? JSON.parse(data) : null;

  // Set My Courses
  const [myCourses, setMyCourses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // let myCouresArray = [];
  useEffect(() => {
      const getMyCourse = () => {
        filterCourse.getMyCourse(null, user.id)
          .then((res) => {
            let data = res.data[0];
            console.log(data);
            setMyCourses(data?.cousres);
            setIsLoading(true);
          })
          .catch((err) => {
            toast.error("You do't Selected Course Yet.");
          });
      }
      getMyCourse();
  }, [user.id]);

  return (
    <>
      <Layout secClass="pt-100 pb-100">
        <h3 className="mb-4">My learning</h3>
        <Tabs
          defaultActiveKey="all-courses"
          id="my-learning-courses"
          className="single-course-tabs my-learning-courses bg-transparent"
        >
          <Tab eventKey="all-courses" title="All Courses">
            <Row>
              {
                isLoading ? (
                  myCourses.length ? (
                    myCourses &&
                    myCourses?.map((item, index) => (
                      <Col lg={4} key={item?.id || index}>
                        <Card className="select-course border-0 bg-white my-learning-course">
                          <Link to={`/my-class/${item.slug}`} className="d-block overflow-hidden position-relative course-thumbanil">
                            <Card.Img variant="top" src={`${imagePath}/${item?.img}`} className="w-100 img-fluid" />

                            <div className="course-play position-absolute">
                              <FontAwesomeIcon icon={faCirclePlay} />
                            </div>
                          </Link>

                          <Card.Body>
                            <h5><Link to={`/my-class/${item.slug}`}>{item?.title}</Link></h5>
                            <div className="author d-flex items-center justify-content-between">
                              <div>Instructor User</div>
                              <div>Start Course</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <h2>You do't Selected Course Yet</h2>
                  )
                ) : (
                  <h1>Loading ...</h1>
                )
              }
            </Row>
          </Tab>
          <Tab eventKey="wishlist" title="Wishlist">
            Whislist Here
          </Tab>
        </Tabs>
      </Layout>
    </>
  )
}

export default MyCoures
