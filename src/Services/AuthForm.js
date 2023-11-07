
import requests from "./httpService";

const AuthForm = {
  login(body) {
    return requests.post(`/login`, body)
  },
  signup(body) {
    return requests.post(`/register`, body)
  }, 
  userExists(body, email, provider) {
    return requests.get(`/users?email=${email}`, body)
  }, 
}

export default AuthForm;