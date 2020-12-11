import Axios from "axios";
import { API_URL } from "../../Constants.js"
export const USER_NAME_SESSION_ATTRIBUTE_NAME='authenticatedUser'

class AuthenticationService {

  executeJwtAuthenticationService(username,password){

    return Axios.post(`${API_URL}/authenticate`,{
      username,
      password

  })

  }
  createJWTToken(token){
    let tokenJwt='Bearer '+ token
    sessionStorage.setItem("USER_TOKEN",tokenJwt)
    console.log(tokenJwt)
    return tokenJwt

  }
  registerSuccessfulLoginForJwt(username, token) {

    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem("USER_TOKEN", this.createJWTToken(token));
    this.setupAxiosInterceptors();
  }

  logout() {
    sessionStorage.removeItem("ROLE");
    sessionStorage.removeItem("USER_TOKEN");
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("USER_TOKEN");
    if (user === null ) return false
    return true
  }
  isAdmin(){
    let user = sessionStorage.getItem("USER_TOKEN");
    let role=sessionStorage.getItem("ROLE");
    if (user === null || role==="" ) return false
    return true
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return ''
    return user
  }
  setupAxiosInterceptors(){

    Axios.interceptors.request.use(
    (config) => {
      if(this.isUserLoggedIn()){
        config.headers.authorization=sessionStorage.getItem("USER_TOKEN")
      }
     return config
    }
    )

  }

}
export default new AuthenticationService();
