
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const CategoryBox = ({ categoryText, categoryTextClass, categoryLink, categoryClass, categoryIcon }) => {
  return (
    <>
      { categoryText &&
        <Col lg={3} sm={6}>
        <Link 
          to={ categoryLink ? categoryLink : '#'}
          className={ categoryClass ? categoryClass : 'single-categorie' }
        >
          <h4 className={ categoryTextClass ? categoryTextClass : 'mb-0' }>{ categoryText }</h4>
          { categoryIcon && <span className="d-flex">{categoryIcon}</span> }
        </Link>
        </Col>
      }
    </>
  )
}

export default CategoryBox
