
import { addToCartCourse } from "../features/lmsSlice";

const handleAddToCart = (product, dispatch) => {
  
  console.log('product', product);
  const addToCart = dispatch(addToCartCourse(product));
  return addToCart;
}

export default handleAddToCart
