import styled from "styled-components";
import { ProfilePicture } from "../pages/Timeline/TimelineCss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState([]);
    const [postUrl, setPostUrl] = useState('');
    const [postPicture, setPostPicture] = useState('');
    useEffect(() => {
        const config = {
            headers: {
                url: post.link
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/link`, config)
            .then(res => {
                setPostTitle(res.data.title);
                setPostDescription(res.data.description);
                setPostUrl(res.data.url);
                if (res.data.image) setPostPicture(res.data.image[0]);
            })
    }, [])
    return (
        <>
            <StyledBoxPostContainer>
                <ProfilePicture src="" />
                <PostContentsContainer>
                    <h1>{post.name}</h1>
                    <h2>{post.message}</h2>
                    <LinkContainer>
                        <div>
                            <h3>{postTitle}</h3>
                            <h4>{postDescription}</h4>
                            <a href={postUrl}><h5>{postUrl}</h5></a>
                        </div>
                        <img src={postPicture} alt='' />
                    </LinkContainer>
                </PostContentsContainer>
            </StyledBoxPostContainer>
        </>
    )
}

const StyledBoxPostContainer = styled.div`
    height: 276px;
    width: 611px;
    margin-bottom:16px;
    padding:16px;
    gap:5px 18px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    background-color: #171717;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
const PostContentsContainer = styled.div`
    height:237px;
    width:611px;
    gap:7px;
    h1{
        height: 23px;
        width: 502px;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        color:white;
        overflow:hidden;
    }
    h2{
        height: 52px;
        width: 502px;
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
        color: #B7B7B7;
        overflow:hidden;
    }
`
const LinkContainer = styled.div`
    height: 155px;
    width: 503px;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    display:flex;
    justify-content:space-between;
    div{
        margin: 24px 19px;
    }
    h3{
        margin-bottom:8px;
        height: 38px;
        width: 250px;
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
        color: #CECECE;
        overflow:hidden;
    }
    h4{
        height: 39px;
        width: 303px;
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #9B9595;
        overflow:hidden;
    }
    h5{
        margin-top:13px;
        height: 13px;
        width: 263px;
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #CECECE;
        overflow:hidden;
    }
    img{
        height: 155px;
        width: 155px;
        border-top-right-radius:13px;
        border-bottom-right-radius:13px;
    }
`