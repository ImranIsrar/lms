
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import ThemeButton from "./resuable/widgets/Button"
import { useDispatch } from "react-redux";
import { removeToCartCourse } from "../features/lmsSlice";


const CheckoutProduct = ({ cart }) => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;
  const dispatch = useDispatch();

  return (
    <>
      {
        cart && cart?.map((course, index) => (
          <div className="cart-detail" key={course?.id || index}>
            <Card className="border-0">
              <Card.Body>
                <div className="card-info d-flex flex-wrap align-items-center">
                  <div className="cart-info-img">
                    <Link to="/course/title">
                      <img src={course?.img ? `${imagePath}/${course?.img}` : 'https://via.placeholder.com/115x73.png'}
                        alt=""
                        width="115"
                        height="73"
                      />
                    </Link>
                  </div>

                  <div className="cart-info-detailing select-course mb-0">
                    <Row className="align-items-center">
                      <Col lg={8} className="cart-info-detailbox">
                        {/* Course Title */}
                        <h5>
                          <Link to={`/course/${course?.slug}`}>{course?.title}</Link>
                        </h5>

                        {/* Course Author */}
                        <p className="mb-0">By
                          {
                            (course?.author && course?.author?.author_name) ?
                              course?.author?.author_name : 'Admin'
                          }
                        </p>
                        
                        {/* Course Lesson */}
                        <ul className="lectures d-flex flex-wrap mb-0">
                          <li>{course?.lesson != 0 ? course?.lesson : 0} <span>Lectures</span></li>
                          <li>2 Weeks <span>Total Length</span></li>
                        </ul>

                      </Col>

                      <Col lg={4} className="cart-pricing text-end">
                        <h4 style={{ marginBottom: '20px' }}>

                          {/* Old Price */}
                          { 
                            (course?.old_price != "" && course?.old_price != 0)  && (
                              <del style={{ fontSize: '16px', color: 'var(--text)' }}>
                                <bdi>${course?.old_price}</bdi>
                              </del>
                            )
                          } {""}

                          {/* Regular Price */}
                            <ins style={{ fontSize: '24px' }}>
                              <bdi>${course?.price}</bdi>
                            </ins>
                        </h4>
                        <ThemeButton
                          buttonText="Remove"
                          buttonTag="button"
                          buttonClass="remove p-0"
                          buttonHandle={() => dispatch(removeToCartCourse(course?.id))}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
      }
    </>
  )
}

export default CheckoutProduct
