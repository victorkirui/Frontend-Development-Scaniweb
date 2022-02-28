import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'

export const BtnWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`
export const Button = styled(LinkR)`
    border-radius:50px;
    padding:${({big})=> (big ? "20px 50px" : "15px 30px")};
    background:${({primary})=>(primary ? "red" : "white")};
    color:${({primary})=>(primary ? "#fff" : "#000")};
    border:none;
    outline:none;
    text-decoration:none;
    cursor:pointer;
    
    &:hover{
        background:${({primary})=>(primary ? "#fff" : "red")};
        color:${({primary})=>(primary ? "#000" : "#fff")};
        transition: all 0.2s ease-in;
    }
`

