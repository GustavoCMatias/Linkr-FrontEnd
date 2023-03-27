import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import Post from '../../components/Post';
import { ButtonContainer, CreatePostContainer, ProfilePicture, StyledBoxPost, StyledTitlePage, FormPostContainer, PostsContainer, LeftContainer, TimelineContainer, RightContainer, NewPostsButton } from '../Timeline/TimelineCss';
import { AuthContext } from '../../context/user.context';
import { HashtagsBlock } from '../../components/HashtagBlock';
import useInterval from 'use-interval';
import { BiRefresh } from "react-icons/bi";

export default function Timeline() {
    const [disabled, setDisabled] = useState(false);
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userFollows, setUserFollows] = useState([]);
    const { user } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const [standByPosts, setStandByPosts] = useState([]);
    const [awaitingPosts, setAwaitingPosts] = useState(0);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/userfollows`, config)
            .then(res => {
                setUserFollows(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        const config = {
            params: {
                requester_id: user.id
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/timeline/?userId=${user.id}`, config)
            .then(res => {
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [])

    const [form, setForm] = useState({
        link: '',
        description: ''
    });

    function RefreshList() {
        setPostsTimeline([]);
        setIsLoading(true);
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    function createPost(e) {
        e.preventDefault();
        setDisabled(true);
        const body = {
            link: form.link,
            message: form.description
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, config)
            .then(res => {
                setDisabled(false);
                setForm({
                    link: '',
                    description: ''
                });
                setPostsTimeline(postsTimeline);
            })
            .catch(err => {
                console.log('ERRO POST', err);
                alert("There was an error publishing your link");
                setDisabled(false);
            })
    }

    function fetchFollowersPosts() {
        const lastPost = postsTimeline[0] ? postsTimeline[0].post_id : 0;
        console.log('lastPost:', lastPost);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/timeline/?userId=${user.id}`, config)
            .then((res) => {
                const newPosts = res.data.filter((post) => post.post_id > lastPost);

                if (newPosts.length !== 0) {
                    const newStandByPosts = [...newPosts, ...postsTimeline];
                    setStandByPosts(newStandByPosts);
                    setAwaitingPosts(newPosts.length);
                }
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "An error occured while trying to fetch new posts, please refresh the page"
                );
            });
    }

    function showMorePosts() {
        setAwaitingPosts(0);
        setPostsTimeline(standByPosts);
    }

    useInterval(fetchFollowersPosts, 3000);

    {
        awaitingPosts > 0 && (
            <NewPostsButton onClick={showMorePosts}>
                {awaitingPosts} new posts, load more! <BiRefresh></BiRefresh>
            </NewPostsButton>
        )
    }

    return (
        <>
            <Navbar />
            <StyledTitlePage>timeline</StyledTitlePage>
            <TimelineContainer>
                <LeftContainer>
                    <StyledBoxPost>
                        <ProfilePicture src={user.picture_url} alt='' />
                        <CreatePostContainer data-test="publish-box">
                            <h2>What are you going to share today?</h2>
                            <FormPostContainer>
                                <form onSubmit={createPost}>
                                    <input
                                        id='link'
                                        type='text'
                                        value={form.link}
                                        placeholder='http://...'
                                        onChange={handleForm}
                                        height={'30px'}
                                        required
                                        data-test="link"
                                    />

                                    <textarea
                                        id='description'
                                        type='textarea'
                                        value={form.description}
                                        placeholder='Awesome article about #javascript'
                                        onChange={handleForm}
                                        height={'66px'}
                                        data-test="description"
                                    />
                                    <ButtonContainer>
                                        <button
                                            data-test="publish-btn"
                                            type='submit' disabled={disabled}>{disabled ? 'Publishing...' : 'Publish'}
                                        </button>
                                    </ButtonContainer>
                                </form>
                            </FormPostContainer>
                        </CreatePostContainer>
                    </StyledBoxPost>

                    {
                        awaitingPosts > 0 && (<NewPostsButton onClick={showMorePosts}> {awaitingPosts} new posts, load more! </NewPostsButton>)
                    }

                    <PostsContainer data-test="post">
                        {
                            isLoading ?
                                <h2>Loading</h2> :
                                postsTimeline.length == 0 ?
                                    <h2 data-test="message">{
                                        userFollows.length == 0 ?
                                            "You don't follow anyone yet. Search for new friends!" :
                                            "No posts found from your friends"
                                    }</h2> :
                                    postsTimeline.map(post => {
                                        return <Post key={post.post_id} post={post} RefreshList={RefreshList} />
                                    })
                        }
                    </PostsContainer>
                </LeftContainer>
                <RightContainer>
                    <HashtagsBlock />
                </RightContainer>
            </TimelineContainer>
        </>
    )
}