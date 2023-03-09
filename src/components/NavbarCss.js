import styled from "styled-components"

export const NavbarContainer = styled.div`
    height: 72px;
    width:100%;
    padding: 10px;
    background-color: #151515;
    display:flex;
    justify-content: space-between;
    position:fixed;
    top:0;
    left:0;
    z-index:1;
    h1{
        height: 54px;
        width: 108px;
        margin-left:8px;
        color: white;
        font-family: Passion One;
        font-size: 49px;
        font-weight: 700;
        line-height: 54px;
    }
`
export const OptionsProfileContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:8px;
    p{
        font-size:28px;
        color:white;
    }
    img{
        height: 53px;
        width: 53px;
        border-radius: 27px;
    }
`

export const SearchBarContainer = styled.div`
    width: 563px;
    position: relative;
    @media (max-width: 768px) {
        width:96.5%;
        position:fixed;
        top:82px;
    }
`

export const SearchBar = styled.input`
    width:100%;
    height: 45px;
    border-radius: 8px;
    background-color: #FFFFFF;
    position:absolute;
    border-style:none;
    padding-left:17px;
    display:flex;
    z-index:2;
    &:focus-visible{
            outline: none;
        }
        ::placeholder{
            color: #C6C6C6;
            height: 23px;
            width: 146px;
            font-family: Lato;
            font-size: 19px;
            font-weight: 400;
            line-height: 23px;
        }
`

export const SearchResultsContainer = styled.div`
    width: 100%;
    padding-bottom:18px;
    border-radius: 8px;
    background-color: #E7E7E7;
    display:flex;
    flex-direction:column;
    position:absolute;
`

export const SearchResult = styled.div`
    width: 100%;
    height:55px;
    border-radius: 8px;
    padding-left:17px;
    gap:12px;
    display:flex;
    align-items:center;
    img{
        height: 39px;
        width: 39px;
        border-radius: 304px;
    }
    p{
        height: 23px;
        width: 122px;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        text-align: left;
        color: #515151;
    }
`