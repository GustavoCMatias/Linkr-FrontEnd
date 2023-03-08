import styled from "styled-components"
import { AiOutlineDown } from "react-icons/ai";

export default function Navbar({userProfilePic}) {
    return (
        <NavbarContainer>
            <p>linkr</p>
            <div>
                <AiOutlineDown />
                <img src={userProfilePic}/>
            </div>
        </NavbarContainer>
    )
}

const NavBar = styled.div`
    height: 72px;
    padding: 10px;
    background-color: #151515;
    display:flex;
    justify-content: space-between;
    p{
        height: 54px;
        width: 108px;
        margin-left:8px;
        color: white;
        font-family: Passion One;
        font-size: 49px;
        font-weight: 700;
        line-height: 54px;
    }
    div{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
`