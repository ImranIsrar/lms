
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import ThemeButton from '../resuable/widgets/Button';
import secureLocalStorage from 'react-secure-storage';
import SocialsLogin from '../../Services/Socailslogin';
import AuthForm from '../../Services/AuthForm';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { userSelectedCourses } from '../../features/lmsSlice';
import filterCourse from '../../Services/filterCourse';

// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GoogleButton = ({ onLoginStart, setIsSending }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);

  return (
    <>
      <LoginSocialGoogle
        isOnlyGetToken
        client_id={import.meta.env.VITE_APP_GG_APP_ID}
        onLoginStart={onLoginStart}
        scope="openid profile email"
        onResolve={(res) => {

          // Set Token
          secureLocalStorage.setItem('token', res?.data.access_token);

          // Google Response token Pass to API to Get User Info
          SocialsLogin.googleLogin(null)
            .then((loginRes) => {

              // Google Response Email Exists or not
              AuthForm.userExists(null, loginRes.data.email)
                .then((userExistsRes) => {

                  // When User Exists
                  if(userExistsRes.data.length) {

                    // Check Provider Exists or not
                    if(userExistsRes.data[0].hasOwnProperty('provider')) {

                      // Check Provider (google == google) Not (google != facebook)
                      if(res.provider === userExistsRes.data[0].provider.name) {

                        secureLocalStorage.setItem("authUser", JSON.stringify(userExistsRes.data[0]));
                        
                        // Check login user take any Course
                        filterCourse.getMyCourse(null, userExistsRes.data[0].id)
                          .then((resCourse) => {
                            if(resCourse.data.length) {
                              dispatch(userSelectedCourses(resCourse.data[0].cousres));
                            }
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
                            secureLocalStorage.removeItem('token');
                            secureLocalStorage.removeItem('authUser');

                            toast.error('Something went wrong')
                          })
                      } else {
                        secureLocalStorage.removeItem('token');
                        toast.error("Email Already Exists!");
                      }
                    } else {
                      secureLocalStorage.removeItem('token');
                      toast.error("Please Enter Valid Information!");
                    }
                  }

                  // When User not Exists
                  else {
                    
                    // Generate Random Password
                    let password = window.crypto.getRandomValues(new BigUint64Array(2));
                    password = password[0].toString(36) + password[1].toString(36).toUpperCase();

                    // Set User
                    const user = {
                      first_name: loginRes.data.name,
                      last_name: "",
                      email: loginRes.data.email,
                      password: password,
                      picture: loginRes.data.picture,
                      provider: {
                        name: res.provider,
                        sub: loginRes.data.sub
                      }
                    }
                    
                    AuthForm.signup(user)
                      .then((signupRes) => {
                        
                        secureLocalStorage.setItem("authUser", JSON.stringify(signupRes.data.user));
                        setIsSending(true);
                        toast.success("Register Successfully!");
                      })
                      .catch((signupError) => {
                        secureLocalStorage.removeItem('token');
                        toast.error("Something went wrong");
                      });

                    // Redirection Based Cart
                    Object.keys(cart).length === 0 ? (
                      navigate("/", { replace: true })
                    ) : (
                      navigate("/checkout", { replace: true })
                    )
                  }
                })
                .catch((userExistsErr) => {
                  secureLocalStorage.removeItem('token');
                  toast.error("Something went wrong");
                });
            })
            .catch((loginError) => {
              secureLocalStorage.removeItem('token');
              toast.error('Something went wrong');
            })
        }}
        onReject={(err) => {
          toast.error("Error!: " + err.data.message);
        }}
      >
        <ThemeButton 
          buttonText="Signin with Google"
          buttonClass="d-block w-100 google-btn"
          buttonTag="button"
          buttonBeforeIcon={<svg style={{ width: '32px', height: '32px' }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z /><path fill=#4CAF50 d=M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>}
        />
      </LoginSocialGoogle>
    </>
  )
}
export default GoogleButton