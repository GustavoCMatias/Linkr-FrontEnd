import {SignInContainer, Title,  FormContainer, TextContainer} from './SignInPageCss.js';

export default function SignInPage() {
    return (
        <SignInContainer>

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

                <button type='submit' >Sign Up</button>
            </form>

            <TextContainer>
                <Link to='/register'>
                    <h3>First time? Create an account!</h3>
                </Link>
            </TextContainer>
        </FormContainer>

    </SignInContainer >
    )
}