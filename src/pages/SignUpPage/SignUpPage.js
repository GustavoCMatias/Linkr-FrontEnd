import { SignUpContainer, Title, FormContainer, TextContainer } from './SignUpPageCss';
import apiAuth from '../../services/apiAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        pictureUrl: ''
    });

    function handleForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    function createAccount(e) {
        e.preventDefault();

        const body = {
            email: form.email,
            password: form.password,
            username: form.username,
            pictureUrl: form.pictureUrl
        }

        apiAuth
            .signUp(body)
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <SignUpContainer>

            <Title>
                linkr
                <p>save, share and discover
                    <br />
                    the best links on the web</p>
            </Title>

            <FormContainer>
                <form onSubmit={createAccount}>
                    <input
                        id='email'
                        type='text'
                        value={form.email}
                        placeholder='email'
                        onChange={handleForm}
                        required
                    />

                    <input
                        id='password'
                        type='password'
                        value={form.password}
                        placeholder='password'
                        onChange={handleForm}
                        required
                    />

                    <input
                        id='username'
                        type='text'
                        value={form.username}
                        placeholder='username'
                        onChange={handleForm}
                        required
                    />

                    <input
                        id='pictureUrl'
                        type='text'
                        value={form.pictureUrl}
                        placeholder='picture url'
                        onChange={handleForm}
                        required
                    />


                    <button type='submit' >Sign Up</button>
                </form>

                <TextContainer>
                    <Link to='/'>
                        <h3>Switch back to log in</h3>
                    </Link>
                </TextContainer>
            </FormContainer>

        </SignUpContainer >
    )
}
