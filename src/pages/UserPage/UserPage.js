import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar"
import { AuthContext } from "../../context/user.context";
import {UserPageContainer} from "./UserPageCss"

export default function UserPage(){
    const {id:userId} = useParams();
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const data = useContext(AuthContext);

    useEffect(() => {
        console.log(data);
        const config={
            Authorization: `Bearer: ${data.token}}`
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`,config)
        .then(res=>{
            setUserName(res.data.name);
            setUserPicture(res.data.picture);
        })
        .catch(err=>console.log(err));
    }, [])
    
    return(
        <>
            <Navbar/>
            <UserPageContainer>
                <img src={userPicture}/>
                <p>{userName}'s posts</p>
            </UserPageContainer>
        </>
    )
}