import { AiOutlineDown,AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { AuthContext } from "../context/user.context";
import { NavbarContainer, OptionsProfileContainer,SearchBar,SearchBarContainer,SearchResult,SearchResultsContainer } from "./NavbarCss";

export default function Navbar() {
    const [userPicture, setUserPicture] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const data = useContext(AuthContext);

    useEffect(() => {
        console.log(data);
        const config={
            Authorization: `Bearer: ${data.token}}`
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/${data.user}`,config)
        .then(res=>{
            console.log(res)
            setUserPicture(res.data.picture_url);
        })
        .catch(err=>console.log(err));
    }, [])

    function onNameSearchChange(e) {
        
        setSearchName(e.target.value);
        axios.get(`${process.env.REACT_APP_API_URL}/users/:${searchName}`)
        .then(res=>{
            console.log(res.data)
            setSearchResults(res.data);
        })
        .catch(err=>console.log(err));
    }
    return (
        <NavbarContainer>
            <h1>linkr</h1>
            <SearchBarContainer>
                <DebounceInput
                    element={SearchBar}
                    minLength={3}
                    debounceTimeout={300}
                    value={searchName}
                    onChange={onNameSearchChange}
                    placeholder={'Search for people'}>
                </DebounceInput>
                {searchResults.length > 0 && <SearchResultsContainer>
                    <SearchResult></SearchResult>
                    {searchResults.map(searchElement => {
                        return <SearchResult>
                            <img src={searchElement.picture} />
                            <p>{searchElement.name}</p>
                        </SearchResult>
                    })}
                </SearchResultsContainer>}
            </SearchBarContainer>
            <OptionsProfileContainer>
                <p><AiOutlineDown /></p>
                <img src={userPicture} />
            </OptionsProfileContainer>
        </NavbarContainer>
    )
}