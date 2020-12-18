import Axios from "axios";
import { API_URL } from "../../Constants.js"
class UserDataService {
   retrieveAllUsers() {
   // console.log("executed service");
   const data =  Axios.get(`${API_URL}/user?page=1&limit=200`);
    return data;
  }
  retrieveUser(id) {
  //  console.log("executed service");
    return Axios.get(`${API_URL}/user/id/${id}`);
  }
  retrieveAllByStatus(status) {
    // console.log("executed service");
    const data =  Axios.get(`${API_URL}/user/status/${status}`);
     return data;
   }
  retrieveCommentOfUser(username) {
    //  console.log("executed service");
      return Axios.get(`${API_URL}/user/comment/${username}`);
    }
  retrieveUserByUsername(username) {
    //  console.log("executed service");
      return Axios.get(`${API_URL}/user/username/${username}`);
    }
  deleteUsers(id) {
   // console.log("executed service");
    return Axios.delete(`${API_URL}/user/${id}`);
  }
  updateUser(id,user) {
    // console.log("executed service");
     return Axios.put(`${API_URL}/user/${id}`,user);
   }
   changePassword(id,user) {
    // console.log("executed service");
     return Axios.put(`${API_URL}/user/changePassword/${id}`,user);
   }
   createUser(user) {
    // console.log("executed service");
     return Axios.post(`${API_URL}/user`,user);
   }
   sendMail(mail) {
    // console.log("executed service");
     return Axios.post(`${API_URL}/sendEmail/${mail}`);
   }
}
export default new UserDataService();
