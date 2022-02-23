import React from 'react'
import { SideBarContainer,Icon,CloseIcon,SideBarMenuWrapper,SideMenuWrap,SideBarLink,SideBarBtn,SideBtnLink } from './SideBarElements'

const SideBar = ({isOpen,toggleNav}) => {
  return (
    <>
        <SideBarContainer isOpen={isOpen} onClick={toggleNav} >
            <Icon onClick={toggleNav}>
                <CloseIcon/>
            </Icon>
            <SideBarMenuWrapper>
                <SideMenuWrap>
                    <SideBarLink to="about" onClick={toggleNav}>
                        About
                    </SideBarLink>
                    <SideBarLink to="services" onClick={toggleNav}>
                        Services
                    </SideBarLink>
                    <SideBarLink to="discover" onClick={toggleNav}>
                        Discover
                    </SideBarLink>
                    <SideBarLink to="signup" onClick={toggleNav}>
                        Sign Up
                    </SideBarLink>
                </SideMenuWrap>
                <SideBarBtn>
                    <SideBtnLink to='/signin'>Sign In</SideBtnLink>
                </SideBarBtn>
            </SideBarMenuWrapper>
        </SideBarContainer>
    </>
  )
}

export default SideBar