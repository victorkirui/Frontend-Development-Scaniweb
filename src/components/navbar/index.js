import React from 'react'
import { Nav,NavContainer,NavLogo,Burger,Menu,MenuItem,MenuLink,NavBtn,BtnLink } from './NavElements'
import { FaBars } from 'react-icons/fa';

const NavBar = ({toggleNav}) => {
  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo to="/">LOGO</NavLogo>
          <Burger onClick={toggleNav}>
            <FaBars/>
          </Burger>

          <Menu>
            <MenuItem>
              <MenuLink to="about">About</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="services">Services</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="discover">Discover</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="signup">Sign Up</MenuLink>
            </MenuItem>
          </Menu>

          <NavBtn>
            <BtnLink to="/signin">Sign In</BtnLink>
          </NavBtn>

        </NavContainer>
      </Nav>
    </>
  )
}

export default NavBar