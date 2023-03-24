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
    const { id: userId } = useParams();
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowButtonLoading, setIsFollowButtonLoading] = useState(true);
    const { token, user } = useContext(AuthContext);

    function RefreshList() {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/timeline/${userId}`)
            .then(res => {
                console.log(res);
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }

    function ToggleFollowButton(){
        setIsFollowButtonLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${process.env.REACT_APP_API_URL}/user/${isFollowing?'unfollow':'follow'}`,{userId},config)
            .then(res => {
                console.log(res);
                setIsFollowing(!isFollowing);
                setIsFollowButtonLoading(false);
            })
            .catch(err =>{ 
                console.log(err);
                setIsFollowButtonLoading(false);
            });
    }

    useEffect(() => {
        setIsFollowButtonLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, config)
            .then(res => {
                console.log(res);
                setUserName(res.data.username);
                setUserPicture(res.data.picture);
                setIsFollowing(res.data.isFollowing);
                setIsFollowButtonLoading(false);
            })
            .catch(err => alert('An error occured, please refresh the page'));
    }, [])

    useEffect(() => {
        RefreshList();
    }, [])

    return (
        <>
            <Navbar />
            <PostsGlobalContainer>
                <LeftContainer>
                    <UserPageContainer data-test="post">
                        <img src={userPicture} />
                        <p>{userName}'s posts</p>
                        {(userId != user.id && !isFollowButtonLoading)
                            && <FollowButton onClick={ToggleFollowButton} disabled={isFollowButtonLoading} isFollowing={isFollowing}>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </FollowButton>}

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
    width: 611px;
    margin-top:72px;
    padding:18px;
    gap:18px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position: relative;
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
align-items:flex-start;
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

const FollowButton = styled.button`
    position: absolute;
    right: -326px;
    height: 31px;
    width: 112px;
    border-radius: 5px;
    color: ${props=>props.isFollowing?'#1877F2':'white'};
    background: ${props=>props.isFollowing?'white':'#1877F2'};
    border: none;
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
`