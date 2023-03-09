import styled from "styled-components"

export const UserPageContainer = styled.div`
    height: 158px;
    margin:0 auto;
    margin-top:72px;
    padding:18px;
    gap:18px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    img{
        height: 50px;
        width: 50px;
        border-radius: 26.5px;
    }
    p{
        height: 64px;
        color: white;
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
    }
    @media (max-width: 768px) {
        margin-top: 100px;
    }
`