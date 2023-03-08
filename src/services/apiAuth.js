import axios from "axios";



function signUp(body) {
    return axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
}

function singIn(body) {
    return axios.post(`${process.env.REACT_APP_API_URL}/sing-in`, body);
  
  }

const apiAuth = {
    signUp, 
    singIn
}
export default apiAuth;