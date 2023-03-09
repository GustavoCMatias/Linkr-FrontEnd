import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Navbar from "../../components/Navbar.js"
import Post from "../../components/Post.js";
import { HashtagsBlock } from "../../components/HashtagBlock.js";

export default function HashtagPage(props) {
    const user = props | '';
    const { hashtag } = useParams();
    const token = '91461640-e721-4c63-af9b-09f666fe1805';
    const url = 'http://localhost:5000'

    const [posts, setPosts] = React.useState([])

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        axios.get(`${url}/hashtag/${hashtag}`, config)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            {/* <Navbar userProfilePic={user.picture} /> */}
            <HashtagPageContainer>
            <p># {hashtag}</p>
                {posts.map( item => <Post></Post>)}
            <HashtagsBlock></HashtagsBlock>
            </HashtagPageContainer>
        </>
    )
}

const HashtagPageContainer = styled.div`
    height: 158px;
    margin:0 auto;
    margin-top:72px;
    padding:18px;
    gap:18px;

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
        margin-bottom: 40px;
    }

    @media (max-width: 768px) {
        margin-top: 100px;
    }
`

