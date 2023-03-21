import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { HashtagsBlock } from "../../components/HashtagBlock";
import Navbar from "../../components/Navbar"
import Post from '../../components/Post';
import { AuthContext } from "../../context/user.context";
import { PostsContainer } from "../Timeline/TimelineCss";

export default function UserPage() {
    const { hashtag } = useParams();
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(AuthContext);

    function RefreshList() {
        setPostsTimeline([]);
        setIsLoading(true);
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`, config)
            .then(res => {
                console.log(res);
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [postsTimeline])


    return (
        <>
            <Navbar />
            <PostsGlobalContainer>
                <LeftContainer>
                    <UserPageContainer data-test="post">
                        <p data-test="hashtag-title" ># {hashtag}</p>
                    </UserPageContainer>

                    <PostsContainer>
                        {
                            isLoading ?
                                <h2>Loading</h2> :
                                postsTimeline.length == 0 ?
                                    <h2>There are no posts yet</h2> :
                                    postsTimeline.map(post => {
                                        return <Post key={post.post_id} post={post} RefreshList={RefreshList} />
                                    })
                        }
                    </PostsContainer>
                </LeftContainer>
                <RightContainer>
                    <HashtagsBlock />
                </RightContainer>
            </PostsGlobalContainer>
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

const LeftContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`

const RightContainer = styled.div`
display: flex;
margin-top: 233px;
margin-left: 25px;
@media screen and (max-width: 600px){
        display: none;
    }
`

const PostsGlobalContainer = styled.div`
display: flex;
flex-direction: row;
height: auto;
`