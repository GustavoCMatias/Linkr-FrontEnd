import React, { useEffect, useContext } from "react";
import styled from "styled-components"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/user.context';



export function HashtagsBlock(){
    const { token } = useContext(AuthContext);
    const url = process.env.REACT_APP_API_URL
    const [hashtags, setHashtags] = React.useState([])

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        axios.get(`${url}/trending/hashtag`, config)
            .then(res => {
                setHashtags(res.data);
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <HashtagContainer data-test="trending">
            <h1>trending</h1>
            <div></div>
            <ul>
                {hashtags.map(item => {
                    <Link to={`/hashtag/${item.hashtag_name}`}>
                        <li key={item.hashtag_name} data-test="hashtag">
                            # {item.hashtag_name}
                        </li>
                    </Link>
                })}
            </ul>
        </HashtagContainer>
    )
}

const HashtagContainer = styled.div`
    height: 406px;
    width: 301px;
    border-radius: 16px;

    background-color: #171717;

    h1{
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;

        color: #FFFFFF;

        margin-top: 10px;
        margin-left: 16px;

    }
    div{
        border: 1px solid #484848;
        margin-top: 12px;
        margin-bottom: 22px;
    }
    li{
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-align: left;

        color: #FFFFFF;
        margin-bottom: 15px;
        margin-left: 16px;

    }
    @media (max-width: 600px ){
    display: none;
    }
`