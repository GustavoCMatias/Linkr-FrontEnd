import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Navbar from "../../components/Navbar"

export default function UserPage(props){
    const user = props|'';
    const {id:userId} = useParams();
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const token = '';

    useEffect(() => {
        const config={
            Authorization: `Bearer: ${token}}`
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
            <Navbar userProfilePic={user.picture}/>
            <UserPageContainer>
                <img src={userPicture}/>
                <p>{userName}'s posts</p>
            </UserPageContainer>
        </>
    )
}

const UserPageContainer = styled.div`
    height: 158px;
    margin:0 auto;
    margin-top:72px;
    padding:18px;
    gap:18px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    img{
        height: 50px;
        width: 50px;
        border-radius: 26.5px;
    }
    p{
        height: 64px;
        color: white;
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
    }
    @media (max-width: 768px) {
        margin-top: 100px;
    }
`