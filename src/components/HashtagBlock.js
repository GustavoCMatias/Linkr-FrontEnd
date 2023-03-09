import React, { useEffect } from "react";
import styled from "styled-components"
import axios from "axios";



export function HashtagsBlock(){
    const token = '91461640-e721-4c63-af9b-09f666fe1805';
    const url = 'http://localhost:5000'
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
    return(
        <HashtagContainer>
            <h1>trending</h1>
            <div></div>
            <ul>
                {hashtags.map(item => <li key={item.hashtag_name}> # {item.hashtag_name} </li>)}
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
`