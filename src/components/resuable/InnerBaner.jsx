
import { Fragment } from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"


const InnerBaner = ({ heading, breadcurmb }) => {
  return (
    <>
      <section className="custom-header background position-relative pt-100 pb-100">
        <Container className="text-center">
          <h2 className="mb-2 text-capitalize">{heading}</h2>

          <ul className="paginaed d-flex flex-wrap justify-content-center">
            {
              breadcurmb && breadcurmb?.map((item, index) => (
                item.hasOwnProperty('branch') ? (
                  <Fragment key={index}>
                    <li className="text-capitalize" >
                      <Link to={item?.slug}>{item?.name}</Link>
                    </li>
                    <li className="text-capitalize">{item?.branch?.name}</li>
                  </Fragment>
                ) : (
                  index != breadcurmb.length - 1 ? (
                    <li className="text-capitalize" key={index}>
                      <Link to={item?.slug}>{item?.name}</Link>
                    </li>
                  ) : (
                    <li className="text-capitalize" key={index}>{item?.name}</li>
                  )
                )
              ))
            }
          </ul>
        </Container>
      </section>
    </>
  )
}

export default InnerBaner
