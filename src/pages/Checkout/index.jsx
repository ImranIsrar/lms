
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ThemeButton from '../../components/resuable/widgets/Button'
import CheckoutProduct from '../../components/CheckoutProduct'
import StripeContainer from '../../components/StripeContainer'
import InnerBaner from '../../components/resuable/InnerBaner'
import secureLocalStorage from 'react-secure-storage'
import Layout from '../../components/resuable/widgets/Layout'
// import useSavedUser from '../../hooks/SavedUser'


const Checkout = () => {

  const { cart, qty } = useSelector((state) => state.app);
  
  // Get User
  // const user = useSavedUser('authUser');
  const data = secureLocalStorage.getItem('authUser');
  const user = (data && data !== 'undefined' && data != undefined) ? JSON.parse(data) : null;

  const breadCurmbNav = [
    { "name": 'home', "slug": "/" },
    { "name": 'Checkout', "slug": "/checkout" }
  ];

  return (
    <>
      <InnerBaner 
        heading="Checkout"
        breadcurmb={breadCurmbNav}
      />

      <Layout secClass="cart-sec pt-100 pb-100">
        {/* Cart Total */}
        {
            user && (
              <p className="your-cart">
                <span>{qty ? qty : 0}</span> courses in your cart
              </p>
            )
          }

          {/* Cart Product */}
          {
            // When Cart Empty
            Object.keys(cart).length === 0 ? (
              <Row>
                <Col lg={8} className={Object.keys(cart).length === 0 ? 'mx-auto' : ''}>
                  <div className="cart-box text-center">
                    <h1 className="font-weight-bolder">Empty</h1>

                    <ThemeButton
                      buttonText="Continue Shopping"
                      buttonLink="/courses"
                      buttonClass="btn default-btn"
                    />
                  </div>
                </Col>
              </Row>
            ) : (

              user ? (
                <Row>
                  {/* Cart Detail */}
                  <Col lg={8}>
                    <CheckoutProduct cart={cart} />
                  </Col>

                  {/* Place Order */}
                  <Col lg={4}>
                    <div className="cart-detail">
                      <Card className="border-0">
                        <Card.Body className="cart-total">
                          <div className="d-flex justify-content-between mb-3">
                            <div className="cart-total-label">
                              <h5>Total</h5>
                            </div>

                            <div className="text-end select-course mb-0">
                              <h5>
                                <ins>
                                  <bdi>${'1200'}</bdi>
                                </ins>
                              </h5>
                              <del style={{ fontSize: '16px', color: 'var(--text)' }}>
                                <bdi>${'499'}.00</bdi>
                              </del>
                            </div>
                          </div>

                          {/* <ThemeButton
                            buttonText="Place Order"
                            buttonTag="button"
                            buttonClass="btn default-btn d-block w-100"
                          /> */}
                          <StripeContainer />
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col lg={8} className='mx-auto'>
                    <div className="cart-box text-center">
                      <h1 className="font-weight-bolder">Your are not Login</h1>

                      <ThemeButton
                        buttonText="Login Now"
                        buttonLink="/auth"
                        buttonClass="btn default-btn"
                      />
                    </div>
                  </Col>
                </Row>
              )
            )
          }
      </Layout>
    </>
  )
}

export default Checkout
