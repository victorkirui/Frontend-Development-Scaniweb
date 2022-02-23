import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav`
    background:#000;
    height:80px;
    display:flex;
    align-items:center; 
    justify-content: center;
`
export const NavContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:80px;
    width:1000px;
    padding:0 24px;
`
export const NavLogo = styled(LinkR)`
    cursor:pointer;
    color:#fff;
    display:flex;
    text-decoration:none;
`
export const Burger = styled.nav`
    display:none;
    
    @media screen and (max-width:768px){
        display:block;
        color:#fff;
        height:80px;
        font-size:1.8rem;
        position:absolute;
        top:0;
        right:0;
        transform: translate(-100%,30%);
    }
`
export const Menu = styled.ul`
    list-style:none;
    display:flex;
    align-items:center;
    height:80px;

    @media screen and (max-width:768px){
        display:none;
    }
`
export const MenuItem = styled.li`
    padding:0 16px;
`
export const MenuLink = styled(LinkS)`
    text-decoration:none;
    cursor:pointer;
    color:#fff;

    &.active{
        border-bottom:2px solid green;
    }
`
export const NavBtn = styled.button`
    background:green;
    display:flex;
    align-items: center;
    justify-content:center;
    padding:10px 22px;
    cursor:pointer;
    border:none;
    outline: none;
    border-radius:50px;

    &:hover{
        background:#fff;
        color:green;
        transition:all 0.2s ease-in-out;
    }

    @media screen and (max-width:768px){
        display:none;
    }
`
export const BtnLink = styled(LinkR)`
    text-decoration:none;
    color:red;
`