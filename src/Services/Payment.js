
import requests from "./httpService"

const checkoutPayment = {
  payment(body) {
    return requests.post(`/payment`, body)
  }
}
export default checkoutPayment;