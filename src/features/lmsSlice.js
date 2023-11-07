
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import filterCourse from "../Services/filterCourse";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";


// secureLocalStorage.clear();

const initialState = {
  cart: [],
  courseUniqueId: [],
  courses: {},
  totalPrice:0,
  qty: 0,
  message: '',
  loading: false,
};


export const getCoursesWithPage = createAsyncThunk(
  "getCourses",
  async (args, { rejectWithValue }) => {
    try {
      const { page, limit } = args;
      const response = await filterCourse.getCourseWithPaginate(null, page, limit);
      console.log('response', response);
      return response;
    } catch (error) {
       return rejectWithValue(error);
    }
  }
);

export const lmsSlice = createSlice({
  name: 'lmsSlice',
  initialState,
  reducers: {
    addToCartCourse: (state, action) => {

      state.cart.length < 1 ? (
        state.cart.push(action.payload)
      ) : (
        state.cart = [],
        state.totalPrice = '0',
        state.qty = '0',
        state.cart.push(action.payload)
      );

      // Calcultiong Total Price & Total Qty  
      state.cart?.find((cart) => (
        state.totalPrice = parseFloat(state.totalPrice) + parseFloat(cart?.price),
        state.qty = parseInt(state.qty) + parseInt(cart?.qty)
      ))
    },
    removeToCartCourse: (state, action) => {

      if(state.cart.length > 0) {
        
        // Get Remove Cart Index
        const index = state.cart?.findIndex((find) => find?.id == action.payload);
        // Minus Remove Cart Index Price from Total Price
        state.totalPrice = parseFloat(state.totalPrice) - parseFloat(state.cart[index]?.price);
        // Minus Remove Cart Index Quantity from Total Quantity
        state.qty = parseInt(state.qty) - parseInt(state.cart[index]?.qty);
        // Remove Product
        state.cart?.splice(index, 1);
      } else {
        toast.error("Failed: Something went wrong!");
      }
    },
    userSelectedCourses: (state, action) => {
      action.payload.map((courseId) => {
        if(!state.courseUniqueId.includes(courseId.id)) {
          state.courseUniqueId.push(courseId.id)
        }
      });
    },
    userLogout: (state) => {
      secureLocalStorage.clear();
    }
  },
  extraReducers: {

    /* ------- Get Courses ------- */
    [getCoursesWithPage.pending]: (state) => {
      state.loading = true;
    },
    [getCoursesWithPage.fulfilled]: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
      console.log('action.payload', action.payload)
    },
    [getCoursesWithPage.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
  }
});

export const { addToCartCourse, userSelectedCourses, userLogout, removeToCartCourse } = lmsSlice.actions;
export default lmsSlice.reducer;
