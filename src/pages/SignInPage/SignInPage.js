import { SignInContainer, Title, FormContainer, TextContainer } from './SignInPageCss.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiAuth from '../../services/apiAuth.js';


export default function SignInPage() {

    const navigate = useNavigate();
    //const { setUser } = useContext(UserContext);

    const [form, setForm] = useState({ email: "", password: "" });

    function signIn(e) {
        e.preventDefault();

    apiAuth
      .singIn(form)
      .then((res) => {
        console.log(res.data);
        //setUser(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
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

            <FormContainer>
                <form onSubmit={signIn}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleForm}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleForm}
                    />

                    <button type="submit">Sign In</button>
                </form>

                <TextContainer>
                    <Link to="/sign-up">
                        <h3>First time? Create an account!</h3>
                    </Link>
                </TextContainer>
            </FormContainer>
        </SignInContainer>
    );
}