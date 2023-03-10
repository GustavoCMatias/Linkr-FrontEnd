import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Navbar from "../../components/Navbar"
import Post from '../../components/Post';
import { AuthContext } from "../../context/user.context";
import { PostsContainer } from "../Timeline/TimelineCss";

export default function UserPage(){
    const {id:userId} = useParams();
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token ,user} = useContext(AuthContext);
    
    function RefreshList(){
        setPostsTimeline([]);
        setIsLoading(true);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/timeline/${userId}`)
            .then(res => {
                console.log(res);
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [postsTimeline])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`,config)
            .then(res => {
                console.log(res);
                setUserName(res.data.username);
                setUserPicture(res.data.picture);
            })
            .catch(err => console.log(err));
    }, [])
    
    return(
        <>
            <Navbar/>
            <UserPageContainer data-test="post">
                <img src={userPicture}/>
                <p>{userName}'s posts</p>
            </UserPageContainer>
            <PostsContainer>
                {
                    isLoading ?
                        <h2>Loading</h2> :
                        postsTimeline.length == 0 ?
                            <h2>There are no posts yet</h2> :
                            postsTimeline.map(post => {
                                return <Post key={post.post_id} post={post} RefreshList={RefreshList}/>
                            })
                }
            </PostsContainer>
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