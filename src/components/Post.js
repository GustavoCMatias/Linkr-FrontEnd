import styled from "styled-components";
import { ProfilePicture } from "../pages/Timeline/TimelineCss";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbTrashFilled, TbPencil } from "react-icons/tb";
import { AuthContext } from "../context/user.context";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from 'react-tooltip'


export default function Post({ post, RefreshList }) {
    const [postMessage, setPostMessage] = useState(post.message);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState([]);
    const [postUrl, setPostUrl] = useState('');
    const [postPicture, setPostPicture] = useState('');
    const [deletePostMode, setDeletePostMode] = useState(false);
    const [editPostMode, setEditPostMode] = useState(false);
    const [messageEditable, setMessageEditable] = useState(post.message);
    const { user, token } = useContext(AuthContext);
    const [usersLikedPost, setUsersLikePost] = useState(post.likes.likers);
    const [likesCount, setLikesCount] = useState(post.likes.count_likes);
    const inputRef = useRef(null);

    function DeletePost() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.delete(`${process.env.REACT_APP_API_URL}/timeline/${post.post_id}`, config)
            .then(res => {
                setDeletePostMode(false);
                RefreshList();
            })
            .catch(err => {
                setDeletePostMode(false);
                alert('It was not possible to delete the post');
            })
    }

    function UpdatePost() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const body = {
            link: post.link,
            message: messageEditable
        }
        axios.put(`${process.env.REACT_APP_API_URL}/timeline/${post.post_id}`, body, config)
            .then(res => {
                setEditPostMode(false);
                setPostMessage(messageEditable);
            })
            .catch(err => {
                setEditPostMode(false);
                console.log(err)
            })
    }

    function ToggleLikePost() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${process.env.REACT_APP_API_URL}/${post.post_id}/likes`, {}, config)
            .then(res => {
                console.log(res)
                switch (res.status) {
                    case (200):
                        setUsersLikePost([...usersLikedPost, user.username]);
                        setLikesCount(Number(likesCount) + 1);
                        break;
                    case (204):
                        setUsersLikePost(usersLikedPost.filter(u => u != user.username));
                        setLikesCount(Number(likesCount) - 1)
                        break;
                    default:
                        console.log('algo de errado não está certo')
                        break;
                }
                if (res.status == 204) {

                }
                else if (res.status == 200) {

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function likesToolTipString() {
        switch (usersLikedPost.length) {
            case (0):
                return 'Be the first to like this post'
            case (1):
                if (usersLikedPost.includes(user.username)) {
                    return 'Você'
                }
                else return usersLikedPost[0];
            case (2):
                if (usersLikedPost.includes(user.username)) {
                    return ('Você and ' + usersLikedPost.find(u => u != user.usename))
                }
                else return (usersLikedPost[0] + ' and ' + usersLikedPost[1])
            default:
                const temp = usersLikedPost.filter(u => u != user.usename);
                if (usersLikedPost.includes(user.username)) {
                    return ('Você, ' + usersLikedPost.find(u => u != user.usename) + ' and other ' + (likesCount - 2) + ' people')
                }
                else return (temp[0] + ', ' + temp[1] + ' and other ' + (likesCount - 2) + ' people')
        }
    }

    useEffect(() => {
        console.log(post.hashtags)
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

    useEffect(() => {
        const handleEsc = (event) => {
            console.log(messageEditable);
            if (event.keyCode === 27) {
                setEditPostMode(false);
                setMessageEditable(postMessage);
            }
            else if (event.keyCode === 13) {
                UpdatePost();
            }
        };
        if (editPostMode) {
            inputRef.current.focus();
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener('keydown', handleEsc)
            }
        }
    }, [editPostMode, messageEditable]);

    return (
        <>
            {deletePostMode && <DeletePostContainer>
                <DeleteOptionsPopUpContainer>
                    <h1>Are you sure you want to delete this post?</h1>
                    <OptionsDeleteContainer>
                        <h2 onClick={() => setDeletePostMode(false)} data-test="cancel" >No, go back</h2>
                        <h3 onClick={DeletePost} data-test="confirm" >Yes,delete it</h3>
                    </OptionsDeleteContainer>
                </DeleteOptionsPopUpContainer>
            </DeletePostContainer>}
            <StyledBoxPostContainer>
                <PostUserLikesContainer>
                    <ProfilePicture src={post.profile_picture} alt='' />
                    <h6 onClick={ToggleLikePost} data-test="like-btn" >{usersLikedPost.includes(user.username) ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart style={{ color: 'white' }} />}</h6>
                    <p data-tooltip-id={post.post_id} data-test="counter" >{likesCount} likes</p>
                </PostUserLikesContainer>
                <PostContentsContainer>
                    <PostOwnerContainer>
                        <h1><Link to={`/user/${post.user_id}`} data-test="username" >{post.username}</Link></h1>
                        {user.id == post.user_id && <EditAndDeleteContainer>
                            <h6 onClick={() => setEditPostMode(!editPostMode)} data-test="edit-btn"><TbPencil /></h6>
                            <h6 onClick={() => setDeletePostMode(true)} data-test="delete-btn"><TbTrashFilled /></h6>
                        </EditAndDeleteContainer>}
                    </PostOwnerContainer>
                    {editPostMode ? <textarea
                        value={messageEditable}
                        onChange={(e) => setMessageEditable(e.target.value)}
                        ref={inputRef}
                        data-test="edit-input"></textarea> :
                        <h2>{postMessage}

                            {post.hashtags[0]===null?'':post.hashtags.map(item => {
                                return (
                                    <Link to={`/hashtag/${item}`}>
                                        <PostHashtag>
                                            &nbsp;#{item}
                                        </PostHashtag>
                                    </Link>)
                                    
                            })}
                        </h2>}
                    <LinkContainer>
                        <div>
                            <h3>{postTitle}</h3>
                            <h4 data-test="description">{postDescription}</h4>
                            <a data-test="link" href={postUrl}><h5>{postUrl}</h5></a>
                        </div>
                        <img src={postPicture} alt='' />
                    </LinkContainer>
                </PostContentsContainer>
            </StyledBoxPostContainer>
            <ReactTooltip
                id={`${post.post_id}`}
                place="bottom"
                variant="light"
                content={likesToolTipString}
                data-test="tooltip"
            />
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
    width:502px;;
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
    textarea{
        height: 44px;
        width: 503px;
        border-radius: 7px;
        margin-bottom:8px;
        background-color: #FFFFFF;
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        text-align: left;
        color: #4C4C4C;
        &:focus{
            outline:none;
            resize:none;
        }
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

const PostHashtag = styled.span`
    font-family: Lato;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
`

const PostUserLikesContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:4px;
    h6{
        font-size:20px;
        margin-top:15px;
        height: 18px;
        width: 20px;
    }
    p{
        height: 13px;
        width: 50px;
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
    }
`

const PostOwnerContainer = styled.div`
    display:flex;
    justify-content:space-between;
    a{
        color: inherit; 
        text-decoration: inherit;
    }
`

const EditAndDeleteContainer = styled.div`
    display:flex;
    gap:5px;
    h6{
        font-size:20px;
        color:white;
    }
`

const DeletePostContainer = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    background-color:white;
    opacity:0.9;
    display:flex;
    justify-content:center;
    align-items:center;
`

const DeleteOptionsPopUpContainer = styled.div`
    height: 262px;
    width: 597px;
    border-radius: 50px;
    background-color: #333333;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    h1{
        width: 350px;
        font-family: Lato;
        font-size: 34px;
        font-weight: 700;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
    }
`

const OptionsDeleteContainer = styled.div`
    display:flex;
    justify-content:space-between;
    gap:27px;
    h2{
        padding-top:6px;
        height: 37px;
        width: 134px;
        border-radius: 5px;
        background: #FFFFFF;
        font-family: Lato;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        color: #1877F2;
        text-align:center;
    }
    h3{
        padding-top:6px;
        height: 37px;
        width: 134px;
        border-radius: 5px;
        background: #1877F2;
        font-family: Lato;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        color: #FFFFFF;
        text-align:center;
    }
`