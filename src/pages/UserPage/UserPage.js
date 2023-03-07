import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"

export default function UserPage(props){
    const{userProfile,userPicture} = props;
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const [searchName,setSearchName] = useState('');
    const token = '';

    useEffect(() => {
        const config={
            Authorization: `Bearer: ${token}}`
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`,config)
        .then(res=>{
            setUserName = res.data;
        })
        .catch(err=>console.log(err));
    }, [])
    
    return(
        <>
            <NavBar>
                <SearchBarContainer>
                    <SearchBar type={'text'} value={searchName} onChange={(e)=>setSearchName(e.target.value)} placeholder={'Search for people'}></SearchBar>
                </SearchBarContainer>
            </NavBar>
            <UserPageContainer>
                <img/>
                <p>{userProfile}'s posts</p>
            </UserPageContainer>
        </>
    )
}

const NavBar = styled.div``

const SearchBarContainer = styled.div`
    height: 45px;
    width: 563px;
    border-radius: 8px;
    background-color: #FFFFFF;
`

const SearchBar = styled.input`

`

const UserPageContainer = styled.div`
    height: 64px;
    width: 611px;
    border-radius: 16px;
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
        width: 423px;
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
    }
`