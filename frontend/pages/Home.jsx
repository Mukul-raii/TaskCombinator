import React,{useContext} from 'react'
import NavBar from '../src/components/navbar'
import Herosection from '../src/components/home/Herosection'

import { AuthContext } from '../context/AuthContext'
const Home = () => {
  const {user} = useContext(AuthContext);
  
  console.log(user);
  
  return (
    <div>
      <NavBar />
      <Herosection/>
    </div>
  )
}

export default Home
