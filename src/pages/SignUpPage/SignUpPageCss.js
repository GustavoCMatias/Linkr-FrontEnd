

import styled from "styled-components";

export const SignUpContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #000;
height: 100vh;
max-height: 100vh;
width: 100vw;
background-color: green;
`

export const Title = styled.h1`
font-family: passion one;
font-style: normal;
font-weight: 700;
font-size: 76px;
color: #fff;
height: 175px;
padding-top: 20px;
padding-bottom: 20px;
width: 100%;
background-color: #000;
text-align: center;
justify-content: center;

p{
    font-size: 23px;
    line-height: 34px;
}
`
export const FormContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height:100%;
background-color: #333333;
padding-top: 40px;

input{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: oswald,sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    color: #000;
    width: 330px;
    height: 55px;
    margin-bottom: 13px;
    padding: 15px;
    border: none;
    border-radius: 6px;  
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    background-color: ${(props) => (props.disabled ? "#F2F2F2" : "#FFFFFF")};
    color: ${(props) => (props.disabled ? "#AFAFAF" : "#666666")};

    &::placeholder {
        font-family: oswald;
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 32px;
        color: #9F9F9F;
    }
    font-family: oswald;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    color: #000000;
}
button{
    width: 330px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${(props) => (props.disabled ? 'grey' : '#1877F2')};
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    font-size: 22px;
    line-height: 32px;
    text-align: center;
    margin-top: 5px;
    &:hover {
        background: #E8EBEF;
    }
    &:focus {
        outline: none;
    }
    font-family: oswald;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 32px;
    color: #fff;
}
`
export const TextContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 15px;
h3{
    font-size: 17px;
    line-height: 20px;
    color: #ffffff;
    font-family: lato;
    font-style: normal;
    font-weight: 400;
}
a{
        color: #fff;
    }
`

