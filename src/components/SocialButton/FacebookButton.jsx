import { toast } from "react-toastify";
import { LoginSocialFacebook } from "reactjs-social-login"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

import SocialsLogin from "../../Services/Socailslogin";
import AuthForm from "../../Services/AuthForm";
import filterCourse from "../../Services/filterCourse";
import { userSelectedCourses } from "../../features/lmsSlice";
import ThemeButton from "../resuable/widgets/Button";



const FacebookButton = ({ onLoginStart, setIsSending }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);

  return (
    <>
      <LoginSocialFacebook
        isOnlyGetToken
        appId={import.meta.env.VITE_APP_FB_APP_ID}
        onLoginStart={onLoginStart}
        fieldsProfile={
          'public_profile, email'
        }
        onResolve={(res) => {
          console.log(res);

          // Set Token
          secureLocalStorage.setItem('token', res?.data.accessToken);

          // Facebook Response token Pass to API to Get User Info
          SocialsLogin.facebookLogin(null)
            .then((loginRes) => {

              // Facebook Response Email Exists or not
              AuthForm.userExists(null, loginRes.data.email)
                .then((userExistsRes) => {
                  
                  // When User Exists
                  if(userExistsRes.data.length) {

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
                      picture: loginRes.data.picture.data.url,
                      provider: {
                        name: res.provider,
                        sub: loginRes.data.id
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
            });
        }}
        onReject={(err) => {
          toast.error("Error!: " + (!err.authResponse  && "Popup Closed"));
        }}
      >
        <ThemeButton
          buttonText="Signin with Facebook"
          buttonClass="d-block w-100 google-btn"
          buttonTag="button"
          buttonBeforeIcon={<svg style={{ width: '32px', height: '32px' }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 48 48"><linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#0d61a9" /><stop offset={1} stopColor="#16528c" /></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"/><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05" /><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07" /><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"/></svg>}
        />
      </LoginSocialFacebook>
    </>
  )
}

export default FacebookButton
