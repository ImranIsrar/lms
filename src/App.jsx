
import { Route, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";

import Header from "./components/resuable/Header"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import Category from "./pages/Category"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import Footer from "./components/resuable/Footer"

import NotFound from "./pages/NotFound"
import SingleCourse from "./pages/SingleCourse";
import MyCoures from "./pages/MyCourses";
import MyClass from "./pages/MyClass";


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
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/courses" element={<Courses /> } />
        <Route path="/course/:title" element={<SingleCourse /> } />
        <Route path="/category/:title" element={<Category /> } />
        <Route path="/auth" element={<Auth /> } />
        <Route path="/checkout" element={<Checkout /> } />
        <Route path="/my-courses" element={<MyCoures /> } />
        <Route path="/my-class/:title" element={<MyClass /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
