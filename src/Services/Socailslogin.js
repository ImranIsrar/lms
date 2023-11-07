
import requests from "./httpService";

const SocialsLogin = {
  googleLogin(body) {
    return requests.get(`${import.meta.env.VITE_APP_GG_APP_USERINFO}`, body)
  },
  facebookLogin(body) {
    const fields = 'id,email,name, picture.type(large)';
    return requests.get(`${import.meta.env.VITE_APP_FB_APP_USERINFO}?fields=${fields}`, body)
  },
}
export default SocialsLogin;