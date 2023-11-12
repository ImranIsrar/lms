
import { Button, Col, Form, InputGroup, Pagination, Row } from "react-bootstrap";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionTitle from "../../components/resuable/widgets/SectionTitle";
import CourseCard from "../../components/resuable/widgets/CourseCard";
import { getCoursesWithPage } from "../../features/lmsSlice";
import usehandleAddToCart from "../../hooks/handleAddToCart";
import InnerBaner from "../../components/resuable/InnerBaner";
import Layout from "../../components/resuable/widgets/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



const Courses = () => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.app);

  const [allCourses, setAllCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [paged, setPaged] = useState({ page: 1, limit: 10 });
  const [totalPages, setTotalPages] = useState(1);


  // Get All Courses Based On Page
  useEffect(() => {
    dispatch(getCoursesWithPage(paged));
  }, [paged.page, totalPages]);


  // This useEffect will run whenever courses.data changes
  useEffect(() => {
    
    if (courses.data) {
      console.log('Course Page useEffect', courses.data)
      
      setAllCourses(courses.data);
      setFilterCourses(courses.data);
      setTotalPages(
        parseInt(courses.countData) > paged.limit
          ? Math.ceil(parseInt(courses.countData) / paged.limit)
          : 1
      );
    }
  }, [paged.page]);


  const handlePagination = (page) => {
    
    setPaged(prevState => ({
      ...prevState,
      page: page
    }));
  }

  // Previous Page
  const handlePrevPage = () => {
    
    setPaged(prevState => ({
      ...prevState,
      page: paged.page > 1 ? (paged.page - 1) : 1,
    }));
  }

  // Next Page
  const handleNextPage = () => {
    
    setPaged(prevState => ({
      ...prevState,
      page: paged.page != totalPages ? (paged.page + 1) : totalPages,
    }));
  }

  // Arrange Order (Ascending / Desdending)
  const handleSordBy = (changeValue) => {
    
    if (changeValue == 'ASC') {

      let coursesArray = [...allCourses];
      let data = coursesArray.sort(function (a, b) {
        const priceA = parseFloat(a?.price) || 0;
        const priceB = parseFloat(b?.price) || 0;

        return priceA - priceB;
      });
      setFilterCourses(data);
    } else {

      let coursesArray = [...allCourses];
      let data = coursesArray.sort(function (a, b) {
        const priceA = parseFloat(a?.price) || 0;
        const priceB = parseFloat(b?.price) || 0;

        return priceB - priceA;
      });
      setFilterCourses(data);
    }
  }

  // OnkeyUp Search
  const hanleSearch = (changeValue) => {
    
    let coursesArray = [...allCourses];
    const filtered = coursesArray.filter((course) => {
      return course.title.toLowerCase().includes(changeValue.toLowerCase());
    });
    setFilterCourses(filtered);
  }

  const breadCurmbNav = [
    { "name": 'home', "slug": "/" },
    { "name": 'courses', "slug": "/courses" }
  ];


  // Handle Add To Cart
  const handleAddToCart = useCallback((item) => {
    usehandleAddToCart(item, dispatch)
  }, [dispatch]);

  return (
    <>
      <InnerBaner
        heading="Courses"
        breadcurmb={breadCurmbNav}
      />

      <Layout secClass="all-courses pt-100 pb-100">
        {/* Section Title */}
        <SectionTitle
          subHeading="Courses"
          subHeadingClass="mb-2"
          heading="Expand Your Career Opportunity With Our Courses"
          headingClass="mb-0"
          sectionClass="mx-auto text-center mb-50"
        />

        {/* Filteration */}
        <Row className="align-items-center mb-4">
          <Col lg={6} md={5}>
            <p>We found <span style={{ color: '#0d0c0c' }}>{courses?.countData}</span> courses available for you</p>
          </Col>

          <Col lg={6} md={7}>
            <div className="filtration">
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <Form>
                    <InputGroup className="gray-input-box">
                      <Form.Control
                        placeholder="Search Courses"
                        aria-label="Sort By"
                        aria-describedby="filter-course"
                        className="border-0 bg-transparent py-0 rounded-0"
                        onChange={(e) => hanleSearch(e.target.value)}
                      />
                      <Button type="submit" variant="" id="filter-course" className="p-0" style={{ color: 'var(--primary)' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Button>
                    </InputGroup>
                  </Form>
                </div>

                <div>
                  <Form>
                    <div className="gray-input-box">
                      <Form.Select aria-label="Course Sort"
                        className="border-0 bg-transparent py-0 rounded-0 form-control"
                        onChange={(e) => handleSordBy(e.target.value)}
                      >
                        <option value="">Sort By</option>
                        <option value="ASC">Price: low to high</option>
                        <option value="DESC">Price: high to low</option>
                      </Form.Select>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* All Courses */}
        <Row>
          {
            filterCourses?.map((item, index) => (
              <Col lg={3} key={item?.id}>
                <CourseCard
                  img={item?.img ? `${imagePath}/${item?.img}` : 'https://via.placeholder.com/261x174.png'}
                  heading={item?.title && item?.title}
                  text={item?.short_description && item?.short_description}
                  link={`/course/${item?.slug}`}
                  cardClass="select-course border-0"
                  author={item?.author?.author_name ? item?.author?.author_name : 'Unkown Instructor'}
                  authorImg={item?.author?.author_img ? `${imagePath}/${item?.author?.author_img}` : 'https://via.placeholder.com/25x25.png'}
                  oldPrice={item?.old_price && item?.old_price}
                  newPrice={item?.price ? item?.price : 0}
                  handleAddToCart={() => handleAddToCart(item)}
                />
              </Col>
            ))
          }
        </Row>

        {/* Pagination */}
        <Row>
          <Col lg={6}>
            <Form.Select
              aria-label="Select Page"
              defaultValue={paged.page}
              onChange={(e) => setPaged(prevState => ({ ...prevState, page: e.target.value }))}
            >
              {
                Array(totalPages).fill().map((pageItme, index) => (
                  <Fragment key={index + '_pagination'}>
                    <option
                      value={index + 1}
                      disabled={paged.page == index + 1 ? true : false}
                    >
                      {index + 1}
                    </option>
                  </Fragment>
                ))
              }
            </Form.Select>
          </Col>

          <Col lg={12}>
            <Pagination className="justify-content-end">
              <Pagination.Prev onClick={handlePrevPage} disabled={paged.page > 1 ? false : true} />
              {
                Array(totalPages).fill().map((pageItme, index) => (
                  <Pagination.Item key={index} active={index + 1 === paged.page}
                    onClick={() => handlePagination(index + 1)}
                  > {index + 1}
                  </Pagination.Item>
                ))
              }
              <Pagination.Next onClick={handleNextPage} disabled={paged.page != totalPages ? false : true} />
            </Pagination>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default Courses
