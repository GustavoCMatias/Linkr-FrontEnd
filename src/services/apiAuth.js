import axios from "axios";



function signUp(body) {
    return axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
}

function singIn(body) {
    return axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);

}

function returnUser(token) {
    return axios.get(`${process.env.REACT_APP_API_URL}/return-user`, token);
} 

const apiAuth = {
    signUp,
    singIn,
    returnUser
}
export default apiAuth;