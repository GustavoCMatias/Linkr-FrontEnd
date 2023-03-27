import { SignUpContainer, Title, FormContainer, TextContainer } from './SignUpPageCss';
import apiAuth from '../../services/apiAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        picture_url: ''
    });

    function handleForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    function createAccount(e) {
        e.preventDefault();
        setDisabled(true);

        const body = {
            email: form.email,
            password: form.password,
            username: form.username,
            picture_url: form.picture_url
        }

        apiAuth
            .signUp(body)
            .then((res) => {
                setDisabled(false);
                navigate("/");
            })
            .catch((err) => {
                console.log('ERROR MESSAGE:', err.response.data);
                setDisabled(false);
                if (err.response.status === 409) {
                    alert('This account is already in use')
                } else if (err.response.status === 422) {
                    alert('Something went wrong, verify your information and try again')
                } else (
                    alert('Something went wrong, please try again later')
                );

                /* if (!form.email || !form.password || !form.username || !form.picture_url) {
                    alert(`attention: ${err.response.data}`);
                    console.log(err.response.status);
                } */
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

            <FormContainer disabled={disabled}>
                <form onSubmit={createAccount}>
                    <input
                        id='email'
                        type='text'
                        value={form.email}
                        placeholder='email'
                        onChange={handleForm}
                        data-test="email"
                        required
                    />

                    <input
                        id='password'
                        type='password'
                        value={form.password}
                        placeholder='password'
                        onChange={handleForm}
                        data-test="password"
                        required
                    />

                    <input
                        id='username'
                        type='text'
                        value={form.username}
                        placeholder='username'
                        onChange={handleForm}
                        data-test="username"
                        required
                    />

                    <input
                        id='picture_url'
                        type='text'
                        value={form.picture_url}
                        placeholder='picture url'
                        onChange={handleForm}
                        data-test="picture-url"
                        required
                    />


                    <button
                        type='submit'
                        data-test="sign-up-btn"
                        disabled={disabled}
                    >
                        Sign Up
                    </button>
                </form>

                <TextContainer>
                    <Link to='/' data-test="login-link">
                        <h3>Switch back to log in</h3>
                    </Link>
                </TextContainer>
            </FormContainer>

        </SignUpContainer >
    )
}
