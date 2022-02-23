import styled from 'styled-components'
import {Link as LinkS} from 'react-scroll'
import {Link as LinkR} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'

export const SideBarContainer = styled.div`
    width:50%;
    height:100%;
    position:absolute;
    top:0;
    right:0;
    z-index:999;
    background:#000;

    opacity:${({isOpen}) => (isOpen ? '100%' : '0%')};
    top:${({isOpen}) => (isOpen ? '0' : '-100%')};
    transition:all 0.3s ease-in-out;
`
export const Icon = styled.div`
    position:absolute;
    top:1.5rem;
    right:1.5rem;
    font-size:1.7rem;
`
export const CloseIcon = styled(AiOutlineClose)`
    color:#fff;
`
export const SideBarMenuWrapper = styled.div`
    display:grid;
    width:100%;
    height:100%;
    display:grid;
    align-items: center;
    justify-content: center;
`
export const SideMenuWrap = styled.ul`
    list-style:none;
    width:100%;
    display:grid;
    align-items: center;
    justify-content: center;
    grid-template-columns:1fr;
    grid-template-rows:repeat(6,80px);
    margin-top:20vh;

    @media screen and (max-width:425px){
        grid-template-rows: repeat(6,60px);
    }
`
export const SideBarLink = styled(LinkS)`
    text-decoration:none;
    color:#fff;
    font-size:16px;
    cursor:pointer;
    text-align:center;
    text-transform:uppercase;

    &:hover{
        color:red;
        transition: all 0.2s ease-in-out;
    }
`
export const SideBarBtn = styled.div`
    margin-top: -30vh;
    display:flex;
    justify-content:center;
    align-items:center;
`
export const SideBtnLink = styled(LinkR)`
    text-decoration:none;
    padding:16px 50px;
    border-radius:50px;
    background:red;
    color: #000;
    cursor:pointer;
    border:none;
    outline:none;

    &:hover{
        background:#fff;
        transition: all 0.2s ease-in-out;
    }
`