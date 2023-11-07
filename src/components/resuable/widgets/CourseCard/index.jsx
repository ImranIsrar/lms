
import { Button, Card } from "react-bootstrap";
import ThemeButton from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = ({
  id, img, heading, text, link, cardClass,
  author, authorImg,
  oldPrice, newPrice,
  handleAddToCart
}) => {

  const { courseUniqueId } = useSelector((state) => state.app);

  return (
    <>
      <Card className={cardClass && cardClass}>
        {/* Course Image */}
        {
          img && (
            <div className="mb-3 d-block overflow-hidden">
              <Card.Img variant="top" src={img} className="w-100 img-fluid" />
            </div>
          )
        }

        {/* Course Body */}
        <Card.Body className="pt-0">
          {/* Course Front */}
          <div className="course-front">

            {/* Title */}
            {
              heading && 
                <Link to={link}>
                  <Card.Title className="mb-2">{heading.length <= 45 ? heading : heading.slice(0, 45) + '...'}</Card.Title>
                </Link>
            }

            {/* Author */}
            {
              author && (
                <div className="admin d-flex align-items-center mb-2">
                  <div>
                    <img
                      src={authorImg}
                      className="rounded-circle me-2"
                      alt="Instructor"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div>
                    <span className="pe-2">By</span>
                    {author}
                  </div>
                </div>
              )
            }

            {/* Price */}
            {
              newPrice && (
                <h4>
                  {
                    oldPrice ? (
                      <>
                        <del>
                          <bdi>${oldPrice}</bdi>
                        </del> {""}
                        <ins>
                          <bdi>${newPrice}</bdi>
                        </ins>
                      </>
                    ) : (
                      <ins>
                        <bdi>${newPrice}</bdi>
                      </ins>
                    )
                  }
                </h4>
              )
            }
          </div>

          {/* Course Back */}
          <div className="course-back d-flex align-items-center">
            <div>
              {/* Title */}
              {
                heading && 
                  <Link to={link}>
                    <Card.Title className="mb-2">{heading}</Card.Title>
                  </Link>
              }

              {/* Text */}
              {
                text && (
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                )
              }

              { heading && (
                <div className="courses-btn d-flex justify-content-between align-items-center">
                  <div>
                    { 
                      courseUniqueId.length > 0 && courseUniqueId.includes(id) ? (
                        <ThemeButton 
                          buttonText="View My Course"
                          buttonClass="btn default-btn"
                          buttonLink={`/my-class/${heading.replace(/\s+/g, '-').toLowerCase()}`}
                        />
                      ) : (
                        <ThemeButton 
                          buttonText="Add To Cart"
                          buttonClass="btn default-btn"
                          buttonTag="button"
                          buttonHandle={handleAddToCart}
                        />
                      )
                    }
                  </div>
                  <div>
                    <Button type="button" className="wish" variant="" >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CourseCard
