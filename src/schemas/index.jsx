

import * as Yup from "yup";

// For Loging
export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email required")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    "Invalid Email"
  ),
  password: Yup.string().min(6).required("Password required")
});

// For Signup
export const SingupSchema = Yup.object({
  first_name: Yup.string().min(2).max(25).required("First Name Required"),
  last_name: Yup.string().min(2).max(25).required("Last Name Required"),
  email: Yup.string().email().required("Email required")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    "Invalid Email"
  ),
  // phone: Yup.string().required("Phone Required").matches(
  //   /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
  //   "Invalid Phone"
  // ),
  password: Yup.string().min(6).required("Password required")
});

