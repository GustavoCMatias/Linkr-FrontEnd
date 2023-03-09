import { ProfilePicture } from "../pages/Timeline/TimelineCss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/user.context";
import { StyledBoxPostContainer, PostContentsContainer, LinkContainer } from "./PostCss";
import { Link } from "react-router-dom";

export default function Post({ data }) {
    console.log(data)
    //useContext(AuthContext)
    /* useEffect(() => {
        axios.get('/link/:id')
        .then(res=>{
            console.log(res)
        })
    }, []) */

    return (
        <>
            <StyledBoxPostContainer>
                <ProfilePicture src={data?.picture_url}/>
                <PostContentsContainer>
                <Link to={`user/${data?.id}`}><h1>{data?.name}</h1></Link>
                    <h2>{data?.message}</h2>
                    <LinkContainer>
                        <div>
                            <h3>Como aplicar o Material UI em um
                                projeto React</h3>
                            <h4>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h4>
                            <h5>https://medium.com/@pshrmn/a-simple-react-router</h5>
                        </div>
                        <img />
                    </LinkContainer>
                </PostContentsContainer>
            </StyledBoxPostContainer>
        </>
    )
}