import styled from "styled-components"
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { AuthContext } from '../context/user.context';
import { Link } from "react-router-dom"

export default function Navbar() {
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { user } = useContext(AuthContext);
    const { logUserOut } = useContext(AuthContext);
    const [logout, setLogout] = useState(false);
    const logUserOutRef = useRef();
    const [ followingUsers,setFollowingUsers] = useState([]);
    const {token} = useContext(AuthContext)

    function onNameSearchChange(e) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        setSearchName(e.target.value);
        if (e.target.value.length < 3) { setSearchResults([]) }
        axios.get(`${process.env.REACT_APP_API_URL}/users/${e.target.value}`,config)
            .then(res => {
                setSearchResults(res.data[0].sort((a,b)=>b.following - a.following));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        function toggleClickOutside(e) {
            if (
                logUserOutRef.current &&
                !logUserOutRef.current.contains(e.target)
            ) {
                setLogout(false);
            }
        };

        document.addEventListener("click", toggleClickOutside);

        return () => {
            document.removeEventListener("click", toggleClickOutside);
        };
    }, []);

    function toggleLogout(e) {
        e.stopPropagation();
        setLogout(!logout);
    }

    return (
        <>
            <NavbarContainer>
                <h1>linkr</h1>
                <SearchBarContainer>
                    <DebounceInput
                        element={SearchBar}
                        minLength={3}
                        debounceTimeout={300}
                        value={searchName}
                        onChange={onNameSearchChange}
                        placeholder={'Search for people'}
                        data-test="search" >
                    </DebounceInput>
                    {searchResults.length > 0 && <SearchResultsContainer>
                        <SearchResult></SearchResult>
                        {searchResults.map(searchElement => {
                            return <SearchResult key={searchElement.id} data-test="user-search">
                                <img src={searchElement.picture} alt='' />
                                <Link to={`/user/${searchElement.id}`}><p>{searchElement.username}</p></Link>
                                {searchElement.following&&<h3>following</h3>}
                            </SearchResult>
                        })}
                    </SearchResultsContainer>}
                </SearchBarContainer>
                <OptionsProfileContainer onClick={toggleLogout} logout={logout}>
                    <p><AiOutlineDown /></p>
                    <img data-test="avatar" src={user?.picture_url} alt=''/>
                </OptionsProfileContainer>
            </NavbarContainer>

            <LogoutContainer logout={logout} data-test="menu" >
                <button
                    onClick={logUserOut}
                    logout={logout}
                    ref={logUserOutRef}
                    className="logoutButton"
                    data-test="logout" 
                >Logout
                </button>
            </LogoutContainer>
        </>
    )
}

const NavbarContainer = styled.div`
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
const OptionsProfileContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:8px;
    p{
        font-size:28px;
        color:white;
        transform: ${(props) => props.logout ? "rotate(180deg)" : "rotate(0deg)"}
    }
    img{
        height: 53px;
        width: 53px;
        border-radius: 27px;
    }
`

const SearchBarContainer = styled.div`
    width: 563px;
    position: relative;
    @media (max-width: 768px) {
        width:96.5%;
        position:fixed;
        top:82px;
    }
`

const SearchBar = styled.input`
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

const SearchResultsContainer = styled.div`
    width: 100%;
    padding-bottom:18px;
    border-radius: 8px;
    background-color: #E7E7E7;
    display:flex;
    flex-direction:column;
    position:absolute;
`

const SearchResult = styled.div`
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

        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        text-align: left;
        color: #515151;
    }
    h3{
        height: 18px;
        width: 140px;
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        text-align: left;
        color: #C5C5C5;
    }
`

const LogoutContainer = styled.div`
    height: 47px;
    position: fixed;
    right: -5px;
    top: 72px;
    align-content: flex-end;
    display: ${(props) => (props.logout ? "block" : "none")};
button{
    width: 150px;
    height: 47px;
    border-radius: 0px 0px 20px 20px;
    background-color: #171717;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #fff;
    border-style: none;
    }
`