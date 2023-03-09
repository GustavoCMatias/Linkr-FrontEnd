import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Post from '../../components/Post';
import { ButtonContainer, CreatePostContainer, ProfilePicture, StyledBoxPost, StyledTitlePage, FormPostContainer,PostsContainer } from '../Timeline/TimelineCss';
import { AuthContext } from '../../context/user.context';

export default function Timeline() {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [postsTimeline, setPostsTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/timeline`)
            .then(res => {
                console.log(res, 'use effect');
                setPostsTimeline(res.data);
                setIsLoading(false);
            })
            .catch(err => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [])

    const [form, setForm] = useState({
        link: '',
        description: ''
    });

    function handleForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    function createPost(e) {
        e.preventDefault();
        setDisabled(true);
        const body = {
            link: form.link,
            description: form.description
        }
        const config = {
            Authorization: `Bearer: ${token}}`
        }
        axios.post(`${process.env.REACT_APP_API_URL}timeline`, body, config)
            .then(res => {
                setDisabled(false);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <Navbar />
            <StyledTitlePage>timeline</StyledTitlePage>
            <StyledBoxPost>
                <ProfilePicture src={user.picture_url} alt=''/>
                <CreatePostContainer>
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
                            />

                            <textarea
                                id='description'
                                type='textarea'
                                value={form.description}
                                placeholder='Awesome article about #javascript'
                                onChange={handleForm}
                                height={'66px'}
                                required
                            />
                            <ButtonContainer>
                                <button type='submit' disabled={disabled}>Publish</button>
                            </ButtonContainer>
                        </form>
                    </FormPostContainer>
                </CreatePostContainer>
            </StyledBoxPost>
            <PostsContainer>
                {
                    isLoading ?
                        <h2>Loading</h2> :
                        postsTimeline.length == 0 ?
                            <h2>There are no posts yet</h2> :
                            postsTimeline.map(post=>{
                                <Post post={post}/>
                            })
                }
            </PostsContainer>
        </>
    )
}