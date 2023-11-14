
import { Suspense, useLayoutEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

import Header from "./components/resuable/Header"
import Footer from "./components/resuable/Footer"
// const Header = lazy(() => import("./components/resuable/Header"));
const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const Category = lazy(() => import("./pages/Category"));
const Auth = lazy(() => import("./pages/Auth"));
const Checkout = lazy(() => import("./pages/Checkout"));
// const Footer = lazy(() => import("./components/resuable/Footer"));
const SingleCourse = lazy(() => import("./pages/SingleCourse"));
const MyCoures = lazy(() => import("./pages/MyCourses"));
const MyClass = lazy(() => import("./pages/MyClass"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  console.log('App Render');
  // Getting Token
  const token = secureLocalStorage.getItem("token");
  useLayoutEffect(() => {

    // If token is empty or not Exists
    !token || token == null || token == '' && (
      toast.error('Oops Token Expire'),
      dispatch(userLogout())
    )
  }, [token]);

  return (
    <>
      <Header />
      <Suspense fallback={<h1>Loading ...</h1>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:title" element={<SingleCourse />} />
          <Route path="/category/:title" element={<Category />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-courses" element={<MyCoures />} />
          <Route path="/my-class/:title" element={<MyClass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
