import styled from "styled-components";
import { ProfilePicture } from "../pages/Timeline/TimelineCss";
import urlMetaData from 'url-metadata'
import { useEffect } from "react";

export default function Post({name}){
    useEffect(() => {
        urlMetaData('http://bit.ly/2ePIrDy').then(
            function (metadata) { 
              console.log(metadata)
            },
            function (error) { 
              console.log(error)
            })
    }, [])
    
    return(
        <>
            <StyledBoxPostContainer>
                <ProfilePicture />
                <PostContentsContainer>
                    <h1>Juvenal Juvêncio </h1>
                    <h2>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</h2>
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
    width:611px;
    gap:7px;
    h1{
        height: 23px;
        width: 502px;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        color:white;
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
    }
    img{
        height: 155px;
        width: 155px;
        border-top-right-radius:13px;
        border-bottom-right-radius:13px;
    }
`