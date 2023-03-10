import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import Post from '../../components/Post';
import { ButtonContainer, CreatePostContainer, ProfilePicture, StyledBoxPost, StyledTitlePage, FormPostContainer, PostsContainer } from '../Timeline/TimelineCss';
import { AuthContext } from '../../context/user.context';

export default function Timeline() {
    const [disabled, setDisabled] = useState(false);
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/timeline`)
            .then(res => {
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [postsTimeline])

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
                alert("There was an error publishing your link");
                setDisabled(false);
            })
    }
    return (
        <>
            <Navbar />
            <StyledTitlePage>timeline</StyledTitlePage>
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
            <PostsContainer data-test="post">
                {
                    isLoading ?
                        <h2>Loading</h2> :
                        postsTimeline.length == 0 ?
                            <h2 data-test="message">There are no posts yet</h2> :
                            postsTimeline.map(post => {
                                return <Post key={post.post_id} post={post} RefreshList={RefreshList} />
                            })
                }
            </PostsContainer>
        </>
    )
}