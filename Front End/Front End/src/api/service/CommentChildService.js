import Axios from "axios";
import { API_URL } from "../../Constants.js"
class CommentChildService {
   retrieveAllComment() {

   const data =  Axios.get(`${API_URL}/commentchild?page=1&limit=20&status=1`);
    return data;
  }
  retrieveComment(id) {

    return Axios.get(`${API_URL}/commentchild/${id}`);
  }
  deleteComment(id) {
    return Axios.delete(`${API_URL}/commentchild/${id}`);
  }
  updateCommenty(id,comment) {

     return Axios.put(`${API_URL}/commentchild/${id}`,comment);
   }
   createComment(comment) {

     return Axios.post(`${API_URL}/commentchild`,comment);
   }
}
export default new CommentChildService();
