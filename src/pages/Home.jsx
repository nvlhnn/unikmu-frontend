import { Category } from '@material-ui/icons'
import React from 'react'
import tw from 'twin.macro'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'

const Container = tw.div`
  h-auto
  w-full

`
const Home = () => {
  return (
    <Container>
      {/* <div className="w-full h-60" style={{ position: "sticky" }}>
        jhajshajhs
      </div>
      <div className="h-[1000px] w-full">
        ajshajshas
      </div> */}
      <Navbar />
      <Slider />
      {/* <Category/> */}
      {/* <div className="h-[2000px] w-full">

      </div> */}
    </Container>
  )
}

export default Home