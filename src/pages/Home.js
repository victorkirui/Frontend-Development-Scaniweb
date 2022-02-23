import React,{ useState } from 'react'
import NavBar from '../components/navbar'
import SideBar from '../components/sideBar'

const Home = () => {

    const [isOpen,setIsOpen] = useState(false)

    const toggleNav = () => {
        setIsOpen(!isOpen)
    }

  return (
    <>
        <NavBar toggleNav={toggleNav} />
        <SideBar isOpen={isOpen} toggleNav={toggleNav} />
    </>
  )
}

export default Home