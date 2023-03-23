import { SignInContainer, Title, FormContainer, TextContainer } from './SignInPageCss.js';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import apiAuth from '../../services/apiAuth.js';
import { AuthContext } from '../../context/user.context.js';
import { useEffect } from 'react';


export default function SignInPage() {

    const navigate = useNavigate();
    const { keepLoggedIn, token } = useContext(AuthContext)

    const [form, setForm] = useState({ email: "", password: "" });
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
       if (token) {
        keepLoggedIn ({ token: token });
       }
      }, [token]);    
    

    function signIn(e) {
        e.preventDefault();
        setDisabled(true);

        apiAuth
            .singIn(form)
            .then((res) => {
                console.log('SOU O RES.DATA', res.data.token);
                keepLoggedIn(res.data);

            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 401) {
                    alert('Verify your email address or password!')
                } else (
                    alert('Something went wrong, please try again later')
                );

                if (!form.email || !form.password) {
                    alert(`attention: ${err.response.data}`)
                }
                return setDisabled(false);
            });
    }

    function handleForm(e) {
        setForm({ ...form, [e.target.id]: e.target.value });
    }
    return (
        <SignInContainer>
            <Title>
                linkr
                <p>save, share and discover
                    <br />
                    the best links on the web</p>
            </Title>

            <FormContainer disabled={disabled}>
                <form onSubmit={signIn}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleForm}
                        data-test="email"
                    />

                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleForm}
                        data-test="password"
                    />

                    <button
                        type="submit"
                        data-test="login-btn"
                    >
                        Sign In
                    </button>
                </form>

                <TextContainer>
                    <Link to="/sign-up" data-test="sign-up-link">
                        <h3>First time? Create an account!</h3>
                    </Link>
                </TextContainer>
            </FormContainer>
        </SignInContainer>
    );
}