import styled from "styled-components";

export const StyledTitlePage = styled.h1`
    font-size: 43px;
    text-align: center;
    margin: 150px 0 43px 0;
    color: #FFFFFF;
    font-family: Oswald;
    font-weight: 700;
    line-height: 64px;
    text-align:left;
`

export const StyledBoxPost = styled.div`
    width: 611px;
    height: 209px;
    margin-bottom: 29px;
    padding:16px;
    gap:5px 18px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
export const ProfilePicture = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
`

export const CreatePostContainer = styled.div`
    height:166px;
    width:502px;
    h2{
        height: 40px;
        width: 445px;
        font-family: Lato;
        font-size: 20px;
        font-weight: 300;
        line-height: 24px;
        text-align: left;
        color: #707070;
    }
`
export const FormPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    height: 101px;
    width: 503px;
    border-radius: 5px;
    input{
        height: 30px;
        width: 503px;
        border-radius: 5px;
        font-size: 15px;
        background-color: #EFEFEF;
        border: none;
        padding:5px 13px;
        margin-bottom:5px;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-family: Lato;
            font-size: 15px;
            font-weight: 300;
            text-align: left;
            color: #949494;
        }
    }
    textarea{
        height: 66px;
        width: 503px;
        border-radius: 5px;
        font-size: 15px;
        background-color: #EFEFEF;
        border: none;
        padding:5px 13px;
        margin-bottom:5px;
        resize:none;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-family: Lato;
            font-size: 15px;
            font-weight: 300;
            text-align: left;
            color: #949494;
        }
    }
`

export const ButtonContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    button{
        height: 31px;
        width: 112px;
        border-radius: 5px;
        border: 0px;
        cursor: pointer;
        background-color: #1877F2;
        &:focus {
            outline: none;
        }
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        color: #fff;
    }
`

export const PostsContainer = styled.div`
    width: 611px;
    h2{
        font-family: Lato;
        font-size:32px;
        color: white;
        font-weight: 700;
        text-align: center;
    }
`

export const LeftContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`

export const TimelineContainer = styled.div`
display: flex;
flex-direction: row;
height: 100%;
`

export const RightContainer = styled.div`
height: 100%;
margin-left: 25px;
@media screen and (max-width: 600px){
        display: none;
    }
`