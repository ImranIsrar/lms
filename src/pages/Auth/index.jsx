
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

import { SingupSchema, loginSchema } from "../../schemas";
import AuthForm from "../../Services/AuthForm";
import { userSelectedCourses } from "../../features/lmsSlice";
import filterCourse from "../../Services/filterCourse";
import InnerBaner from "../../components/resuable/InnerBaner";
import GoogleButton from "../../components/SocialButton/GoogleButton";
import FacebookButton from "../../components/SocialButton/FacebookButton";
import Layout from "../../components/resuable/widgets/Layout";




const Auth = () => {

  const imagePath = import.meta.env.VITE_IMAGES_PATH;

  const login = useRef(null);
  const register = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const { cart } = useSelector((state) => state.app);

  // Switch Form
  const [activeForm, setActiveForm] = useState('register');
  const handleSwitchForm = (key) => {

    key == 'login' ? (
      setActiveForm('login'),
      login.current.style.display = 'block',
      register.current.style.display = 'none'
    ) : (
      setActiveForm('register'),
      register.current.style.display = 'block',
      login.current.style.display = 'none'
    )
  }

  // For Login
  const FormikLogin = useFormik({

    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (value) => {

      setIsSending(false);

      AuthForm.login(value)
        .then((res) => {
          // console.log(res);

          secureLocalStorage.setItem('token', res?.data?.accessToken);
          secureLocalStorage.setItem("authUser", JSON.stringify(res?.data?.user));

          filterCourse.getMyCourse(null, res?.data?.user.id)
            .then((resCourse) => {

              dispatch(userSelectedCourses(resCourse.data[0].cousres));
              setIsSending(true);
              toast.success("Login Successfully!");

              // Redirection Based Cart
              Object.keys(cart).length === 0 ? (
                navigate("/", { replace: true })
              ) : (
                navigate("/checkout", { replace: true })
              )
            })
            .catch((resCourseError) => {
              toast.error('Something went wrong')
            })
        })
        .catch((err) => {
          toast.error("Failed: Please Enter Valid Information.");
        })
    }
  });

  // For Register
  const FormikSignup = useFormik({

    initialValues: { first_name: "", last_name: "", email: "", password: "" },
    validationSchema: SingupSchema,
    onSubmit: (value) => {

      setIsSending(false);

      AuthForm.signup(value)
        .then((res) => {
          console.log(res);

          secureLocalStorage.setItem('token', res?.data?.accessToken);
          secureLocalStorage.setItem("authUser", JSON.stringify(res?.data?.user));

          setIsSending(true);
          toast.success("Register Successfully!");

          // Redirection Based Cart
          Object.keys(cart).length === 0 ? (
            navigate("/", { replace: true })
          ) : (
            navigate("/checkout", { replace: true })
          )
        })
        .catch((err) => {
          toast.error("Failed: Please Enter Valid Information.");
        });
    }
  });

  const breadCurmbNav = [
    { "name": 'home', "slug": "/" },
    { "name": 'Auth', "slug": "/auth" }
  ];

  // const REDIRECT_URI = window.location.href;
  const onLoginStart = useCallback(() => {

    // Disabled Button
    setIsSending(false);
  }, []);


  return (
    <>
      <InnerBaner
        heading="Authentication"
        breadcurmb={breadCurmbNav}
      />

      {/* Auth */}
      <Layout secClass="auth pt-100 pb-100">
        <Row>
          <Col lg={6}>
            <img src={`${imagePath}/register-img.png`} alt="" className="mx-auto d-block" />
          </Col>
          <Col lg={6}>
            <h2>Create your account</h2>

            <Tabs
              defaultActiveKey="register"
              id="auth-tab"
              className="auth-list nav nav-tabs justify-content-between"
              style={{ padding: '10px' }}
              onSelect={handleSwitchForm}
            >
              <Tab eventKey="register" title="Register">
                <form onSubmit={FormikSignup.handleSubmit} id="register-form" ref={register}>

                  {/* First Name */}
                  <div className="form-floating mb-3">
                    <input id={`register_first_name`} type="text" name="first_name" placeholder="First Name"
                      autoComplete="off"
                      className={`form-control ${FormikSignup.errors.name && FormikSignup.touched.name ? 'input-error' : ''}`}
                      value={FormikSignup.values.first_name}
                      onChange={FormikSignup.handleChange}
                      onBlur={FormikSignup.handleBlur}
                    />
                    <label htmlFor={`register_first_name`}>First Name</label>
                  </div>

                  {/* Last Name */}
                  <div className="form-floating mb-3">
                    <input id={`register_last_name`} type="text" name="last_name" placeholder="Last Name"
                      autoComplete="off"
                      className={`form-control ${FormikSignup.errors.name && FormikSignup.touched.name ? 'input-error' : ''}`}
                      value={FormikSignup.values.last_name}
                      onChange={FormikSignup.handleChange}
                      onBlur={FormikSignup.handleBlur}
                    />
                    <label htmlFor={`register_last_name`}>Last Name</label>
                  </div>

                  {/* Email */}
                  <div className="form-floating mb-3">
                    <input id={`register_email`} type="email" name="email" placeholder="name@example.com"
                      autoComplete="off"
                      className={`form-control ${FormikSignup.errors.email && FormikSignup.touched.email ? 'input-error' : ''}`}
                      value={FormikSignup.values.email}
                      onChange={FormikSignup.handleChange}
                      onBlur={FormikSignup.handleBlur}
                    />
                    <label htmlFor={`register_email`}>Email</label>
                  </div>

                  {
                    /* Phone */
                    // activeForm != 'login' ? (
                    //   <div className="form-floating mb-3">
                    //     <input id="phone" type="text" name="phone" placeholder="Phone"
                    //       autoComplete="off"
                    //       className={`form-control ${errors.phone && touched.phone ? 'input-error' : ''}`}
                    //       value={values.phone}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //     />
                    //     <label htmlFor="phone">Phone</label>
                    //   </div>
                    // ) : (
                    //   ''
                    // )
                  }

                  {/* Password */}
                  <div className="form-floating mb-3">
                    <input id={`register_password`} type="password" name="password" placeholder="Password"
                      autoComplete="off"
                      className={`form-control ${FormikSignup.errors.password && FormikSignup.touched.password ? 'input-error' : ''}`}
                      value={FormikSignup.values.password}
                      onChange={FormikSignup.handleChange}
                      onBlur={FormikSignup.handleBlur}
                    />
                    <label htmlFor={`register_password`}>Passowrd</label>
                  </div>

                  <div className="d-block">
                    <button className={
                      `btn default-btn d-block w-100
                          ${(FormikSignup.dirty && FormikSignup.isValid) || isSending ? '' : 'disabled'}
                        `
                    }
                      id={`register_submit`} type="submit">Register Now</button>
                  </div>

                  {/* <SignIn /> */}
                </form>
              </Tab>

              <Tab eventKey="login" title="Login" >
                <form onSubmit={FormikLogin.handleSubmit} id="login-form" ref={login} style={{ display: 'none' }}>

                  {/* Email */}
                  <div className="form-floating mb-3">
                    <input id={`login_email`} type="email" name="email" placeholder="name@example.com"
                      autoComplete="off"
                      className={`form-control ${FormikLogin.errors.email && FormikLogin.touched.email ? 'input-error' : ''}`}
                      value={FormikLogin.values.email}
                      onChange={FormikLogin.handleChange}
                      onBlur={FormikLogin.handleBlur}
                    />
                    <label htmlFor={`login_email`}>Email</label>
                  </div>

                  {/* Password */}
                  <div className="form-floating mb-3">
                    <input id={`login_password`} type="password" name="password" placeholder="Password"
                      autoComplete="off"
                      className={`form-control ${FormikLogin.errors.password && FormikLogin.touched.password ? 'input-error' : ''}`}
                      value={FormikLogin.values.password}
                      onChange={FormikLogin.handleChange}
                      onBlur={FormikLogin.handleBlur}
                    />
                    <label htmlFor={`login_password`}>Passowrd</label>
                  </div>

                  <div className="d-block">
                    <button className={`btn default-btn d-block w-100 ${(FormikLogin.dirty && FormikLogin.isValid) || isSending ? '' : 'disabled'}`}
                      id={`login_submit`} type="submit">Send</button>
                  </div>
                </form>
              </Tab>
            </Tabs>

            <div className="mt-3">
              <div className="mb-2">
                {/* Google Login */}
                <GoogleButton
                  onLoginStart={onLoginStart}
                  setIsSending={setIsSending}
                />
              </div>

              <div>
                {/* Facebook Login */}
                <FacebookButton
                  onLoginStart={onLoginStart}
                  setIsSending={setIsSending}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default Auth
