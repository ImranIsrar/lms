
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Card, Col, Row } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';

import HeroBanner from '../../components/HeroBanner'
import SectionTitle from '../../components/resuable/widgets/SectionTitle'
import CourseCard from '../../components/resuable/widgets/CourseCard';
import ThemeButton from '../../components/resuable/widgets/Button';
import CategoryBox from '../../components/resuable/widgets/CategoryBox';
import filterCourse from '../../Services/filterCourse';
import handleAddToCart from '../../hooks/handleAddToCart';
import Layout from '../../components/resuable/widgets/Layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

  // Image Path
  const imagePath = import.meta.env.VITE_IMAGES_PATH;
  const dispatch = useDispatch();

  // Setting Courses
  const [courseState, setCourseState] = useState(false);
  const [course, setCourse] = useState({
    popularCourses: [],
    featureCourses: [],
    mostViewCourses: [],
    categories: []
  });


  // Getting Courses
  useEffect(() => {
    console.log('Home UseEffect');
    // Get Popular Course
    const getPopularCourses = () => {
      filterCourse.getFilterCourse(null, 'popular', 'y')
        .then((res) => {

          let data = res?.data.sort(function (a, b) { return b?.views - a?.views });
          setCourse(prevState => ({
            ...prevState,
            popularCourses: data
          }));
          setCourseState(true);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getPopularCourses();

    // Get Feature Course
    const getFeatureCourses = () => {
      filterCourse.getFilterCourse(null, 'feature', 'y')
        .then((res) => {
          setCourse(prevState => ({
            ...prevState,
            featureCourses: res?.data
          }));
          setCourseState(true);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getFeatureCourses();

    // Get Most Viewed
    const getMostViewCourses = () => {
      filterCourse.getCourse(null)
        .then((res) => {

          let data = res?.data.sort(function (a, b) { return b?.views - a?.views });
          setCourse(prevState => ({
            ...prevState,
            mostViewCourses: data
          }));
          setCourseState(true);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getMostViewCourses();

    // Get Most Viewed
    const getCategories = () => {
      filterCourse.getCategory(null)
        .then((res) => {

          setCourse(prevState => ({
            ...prevState,
            categories: res?.data
          }));
          setCourseState(true);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getCategories();
  }, []);

  // Owl Carousel Configuration
  const testimonialOptions = {
    items: 1,
    nav: false,
    dots: true,
    rewind: true,
    autoplay: true
  };

  return (
    <>
      <HeroBanner />

      {/* Popuar Courses */}
      <Layout secClass="courses popular-courses pt-100 pb-70">
        <SectionTitle
          subHeading="Popular Courses"
          heading="Expand Your Career Opportunity With Our Courses"
          subHeadingClass="mb-2"
          headingClass="mb-0"
          sectionClass="mb-50 text-center mx-auto"
        />

        <Row>
          {
            !courseState ? (
              <h2 className="text-center">Loading ....</h2>
            ) : (
              course?.popularCourses &&
              course?.popularCourses?.map((item, index) => (
                <Col lg={3} key={index} className="d-flex">
                  <CourseCard
                    id={item?.id}
                    img={item?.img ? `${imagePath}/${item?.img}` : 'https://via.placeholder.com/261x174.png'}
                    heading={item?.title && item?.title}
                    text={item?.short_description && item?.short_description}
                    link={`/course/${item?.slug}`}
                    cardClass="select-course border-0"
                    author={item?.author?.author_name ? item?.author?.author_name : 'Unkown Instructor'}
                    authorImg={item?.author?.author_img ? `${imagePath}/${item?.author?.author_img}` : 'https://via.placeholder.com/25x25.png'}
                    oldPrice={item?.old_price && item?.old_price}
                    newPrice={item?.price ? item?.price : 0}
                    handleAddToCart={() => handleAddToCart(item, dispatch)}
                  />
                </Col>
              ))
            )
          }
        </Row>
      </Layout>

      {/* Feature Courses */}
      <Layout secClass="courses feature-courses pt-100 pb-70 bg-sky">
        <div className="d-flex justify-content-between align-items-center mb-50">
          <SectionTitle
            subHeading="Featured Courses"
            heading="Find Yours From The Featured"
            subHeadingClass="mb-2"
            headingClass="mb-0"
          />

          <div>
            <ThemeButton
              buttonText="View All"
              buttonClass="default-btn"
              buttonLink="/courses"
            />
          </div>
        </div>

        <Row>
          {
            !courseState ? (
              <h2 className="text-center">Loading ....</h2>
            ) : (
              course?.featureCourses &&
              course?.featureCourses?.map((item, index) => (
                <Col lg={3} key={index} className="d-flex">
                  <CourseCard
                    id={item?.id}
                    img={item?.img ? `${imagePath}/${item?.img}` : 'https://via.placeholder.com/261x174.png'}
                    heading={item?.title && item?.title}
                    text={item?.short_description && item?.short_description}
                    link={`/course/${item?.slug}`}
                    cardClass="select-course border-0"
                    author={item?.author?.author_name ? item?.author?.author_name : 'Unkown Instructor'}
                    authorImg={item?.author?.author_img ? `${imagePath}/${item?.author?.author_img}` : 'https://via.placeholder.com/25x25.png'}
                    oldPrice={item?.old_price && item?.old_price}
                    newPrice={item?.price ? item?.price : 0}
                    handleAddToCart={() => handleAddToCart(item, dispatch)}
                  />
                </Col>
              ))
            )
          }
        </Row>
      </Layout>

      {/* Most View Courses */}
      <Layout secClass="courses feature-courses pb-70 bg-sky">
        <div className="d-flex justify-content-between align-items-center mb-50">
          <SectionTitle
            subHeading="Most Viewed Courses"
            heading="Students Are Also Viewing"
            subHeadingClass="mb-2"
            headingClass="mb-0"
          />

          <div>
            <ThemeButton
              buttonText="View All"
              buttonClass="default-btn"
              buttonLink="/courses"
            />
          </div>
        </div>

        <Row>
          {
            !courseState ? (
              <h2 className="text-center">Loading ....</h2>
            ) : (
              course?.mostViewCourses &&
              course?.mostViewCourses?.map((item, index) => (
                <Col lg={3} key={index} className="d-flex">
                  <CourseCard
                    id={item?.id}
                    img={item?.img ? `${imagePath}/${item?.img}` : 'https://via.placeholder.com/261x174.png'}
                    heading={item?.title && item?.title}
                    text={item?.short_description && item?.short_description}
                    link={`/course/${item?.slug}`}
                    cardClass="select-course border-0"
                    author={item?.author?.author_name ? item?.author?.author_name : 'Unkown Instructor'}
                    authorImg={item?.author?.author_img ? `${imagePath}/${item?.author?.author_img}` : 'https://via.placeholder.com/25x25.png'}
                    oldPrice={item?.old_price && item?.old_price}
                    newPrice={item?.price ? item?.price : 0}
                    handleAddToCart={() => handleAddToCart(item, dispatch)}
                  />
                </Col>
              ))
            )
          }
        </Row>
      </Layout>

      {/* Top Categories */}
      <Layout secClass="top-categories pt-100 pb-100">
        <SectionTitle
          subHeading="Top Categories"
          heading="Browse Top Categories"
          subHeadingClass="mb-2"
          headingClass="mb-0"
          sectionClass="mb-50 text-center mx-auto"
        />

        <Row>
          {
            !courseState ? (
              <h2 className="text-center">Loading ....</h2>
            ) : (
              course?.categories &&
              course?.categories?.map((item, index) => (
                <CategoryBox key={index}
                  categoryText={item?.name}
                  categoryLink={`/category/${item?.slug}`}
                  categoryClass="single-categorie d-flex justify-content-between align-items-center align-items-center"
                  categoryIcon={<FontAwesomeIcon icon={faArrowRight} />}
                />
              ))
            )
          }
        </Row>

        <div className="browse-all">
          <p className="text-center">
            Browse All {""}
            <ThemeButton
              buttonText="Courses"
              buttonLink="/courses"
              buttonAfterIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </p>
        </div>
      </Layout>

      {/* Online Education */}
      <Layout secClass="online-edu pb-100">
        <Row className="align-items-center flex-lg-row-reverse">
          <Col lg={6}>
            <div className="online-edu-img position-relative">
              <img src={`${imagePath}/transform-img.png`} alt="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="online-edu-content">
              <h2 className="mb-3">Transform Your Life Through Online Education</h2>
              <p>Instructors from around the world teach millions of students on Edmy. We provide the tools and skills to teach what you love. And you can also achieve your goal.</p>
              <ThemeButton
                buttonText="Find Out How"
                buttonLink="/courses"
                buttonClass="btn default-btn"
              />
            </div>
          </Col>
        </Row>
      </Layout>

      {/* Why Chosse Us */}
      <Layout
        secClass="why-chosse-us bg-gray position-relative pt-100 pb-70"
        secAfterContainerContent={<img src={`${imagePath}/feature-shape-1.svg`} className="shape shape-1" alt="" />}
      >
        <SectionTitle
          subHeading="Our Features"
          heading="Why You Should Choose Edmy"
          sectionClass="mx-auto text-center  mb-50"
        />

        <Row>
          <Col lg={3} md={6}>
            <div className="single-features text-center">
              <img src={`${imagePath}/feature-1.svg`} alt="" className="mb-4" />
              <h4>Expert-Led Video Courses</h4>
              <p>Instructors from around the world teach millions of students on Edmy through video.</p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="single-features text-center">
              <img src={`${imagePath}/feature-1.svg`} alt="" className="mb-4" />
              <h4>Expert-Led Video Courses</h4>
              <p>Instructors from around the world teach millions of students on Edmy through video.</p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="single-features text-center">
              <img src={`${imagePath}/feature-1.svg`} alt="" className="mb-4" />
              <h4>Expert-Led Video Courses</h4>
              <p>Instructors from around the world teach millions of students on Edmy through video.</p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="single-features text-center">
              <img src={`${imagePath}/feature-1.svg`} alt="" className="mb-4" />
              <h4>Expert-Led Video Courses</h4>
              <p>Instructors from around the world teach millions of students on Edmy through video.</p>
            </div>
          </Col>
        </Row>
      </Layout>

      {/* Testimonial */}
      <Layout secClass="online-edu testimonial pt-100 pb-70">
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="position-relative">
              <img src={`${imagePath}/testimonial-1.png`} alt="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="online-edu-content">
              <h2 className="mb-3">Our Students Are Our Strength. See What They Say About Us</h2>

              <OwlCarousel options={testimonialOptions}>
                <div className='item'>
                  <Card className="border-0 testimonial-user">
                    <Card.Body className="p-0">
                      <div className="testimonial-user-content mb-3">
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </div>

                      <div className="testimonial-user-info d-flex align-items-center flex-wrap">
                        <div className="testimonial-user-img">
                          <img src={`${imagePath}/author-1.jpg`} alt=""
                            width="55"
                            height="55"
                            className="rounded-circle"
                            style={{ maxWidth: '55px' }}
                          />
                        </div>

                        <div className="testimonial-user-title">
                          <h6 className="mb-0">
                            Jhon Smith
                            <span>, React Developer</span>
                          </h6>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className='item'>
                  <Card className="border-0 testimonial-user">
                    <Card.Body className="p-0">
                      <div className="testimonial-user-content mb-3">
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </div>

                      <div className="testimonial-user-info d-flex align-items-center flex-wrap">
                        <div className="testimonial-user-img">
                          <img src={`${imagePath}/author-1.jpg`} alt=""
                            width="55"
                            height="55"
                            className="rounded-circle"
                            style={{ maxWidth: '55px' }}
                          />
                        </div>

                        <div className="testimonial-user-title">
                          <h6 className="mb-0">
                            Jhon Smith
                            <span>, React Developer</span>
                          </h6>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className='item'>
                  <Card className="border-0 testimonial-user">
                    <Card.Body className="p-0">
                      <div className="testimonial-user-content mb-3">
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </div>

                      <div className="testimonial-user-info d-flex align-items-center flex-wrap">
                        <div className="testimonial-user-img">
                          <img src={`${imagePath}/author-1.jpg`} alt=""
                            width="55"
                            height="55"
                            className="rounded-circle"
                            style={{ maxWidth: '55px' }}
                          />
                        </div>

                        <div className="testimonial-user-title">
                          <h6 className="mb-0">
                            Jhon Smith
                            <span>, React Developer</span>
                          </h6>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </OwlCarousel>
            </div>
          </Col>
        </Row>
      </Layout>

      {/* Brands */}
      <Layout secClass="brands bg-gray pt-100 pb-100">
        <Row>
          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-1.png`} alt="" width="145" height="125" />
          </Col>

          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-2.png`} alt="" width="145" height="125" />
          </Col>

          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-1.png`} alt="" width="145" height="125" />
          </Col>

          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-1.png`} alt="" width="145" height="125" />
          </Col>

          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-1.png`} alt="" width="145" height="125" />
          </Col>

          <Col lg={2} md={4} sm={6}>
            <img src={`${imagePath}/brand-1.png`} alt="" width="145" height="125" />
          </Col>
        </Row>
      </Layout>

      {/* Bussiness Instructor */}
      <Layout secClass="online-edu become-instructor pt-100 pb-100">
        <Row className="align-items-center flex-lg-row-reverse">
          <Col lg={6}>
            <div className="online-edu-img position-relative">
              <img src={`${imagePath}/teaching-img.png`} alt="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="online-edu-content">
              <h2 className="mb-3">Become An Instructor Today And Start Teaching</h2>
              <p>Instructors from around the world teach millions of students on Edmy. We provide the tools and skills to teach what you love. And you can also achieve your goal with us.</p>

              <Row>
                <Col lg={6} sm={6}>
                  <ul className="become-insturctor-list">
                    <li className="d-flex align-items-center">
                      <img src={`${imagePath}/teaching-icon-1.svg`} alt="" />
                      <h3 className="mb-0">Expert Instruction</h3>
                    </li>
                    <li className="d-flex align-items-center">
                      <img src={`${imagePath}/teaching-icon-3.svg`} alt="" />
                      <h3 className="mb-0">Remote Learning</h3>
                    </li>
                  </ul>
                </Col>

                <Col lg={6} sm={6}>
                  <ul className="become-insturctor-list">
                    <li className="d-flex align-items-center">
                      <img src={`${imagePath}/teaching-icon-1.svg`} alt="" />
                      <h3 className="mb-0">Expert Instruction</h3>
                    </li>
                    <li className="d-flex align-items-center">
                      <img src={`${imagePath}/teaching-icon-3.svg`} alt="" />
                      <h3 className="mb-0">Remote Learning</h3>
                    </li>
                  </ul>
                </Col>
              </Row>


              <ThemeButton
                buttonText="Find Out How"
                buttonLink="/courses"
                buttonClass="btn default-btn"
              />
            </div>
          </Col>
        </Row>
      </Layout>

      {/* Bussiness Card */}
      <Layout>
        <div className="bg-gray bussiness-card-wrapper">
          <Row className="align-items-center">
            <Col lg={7}>
              <div>
                <img src={`${imagePath}/business-img.png`} alt="" />
              </div>
            </Col>
            <Col lg={5}>
              <h2>Be A Member Of Edmy Business & Start Earning Limitless Today</h2>
              <p>Instructors from around the world teach millions of students on Edmy. We provide the tools and skills to teach what you love. And you can also achieve your goal with us.</p>
              <ThemeButton
                buttonText="Get Edmy Business"
                buttonLink="/become-an-instructor/"
                buttonClass="btn default-btn"
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  )
}

export default Home
