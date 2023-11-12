
import { addToCartCourse } from "../features/lmsSlice";

const usehandleAddToCart = (product, dispatch) => {
  
  console.log('product', product);
  const addToCart = dispatch(addToCartCourse(product));
  return addToCart;
}

export default usehandleAddToCart
