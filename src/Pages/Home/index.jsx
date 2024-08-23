import React, { useEffect } from 'react'
import Appbar from '../../Components/Global/Appbar';
import Footer from '../../Components/Global/Footer';
import Hero from './Hero';
import About from './About';
import Tockenomics from './Tockenomics';
import NftSlider from './NftSlider';
import How from './How';
import Roadmap from './Roadmap';
import Affiliate from './Affiliate';
import Socials from './Socials';
//dev: COMPONENTS
import { FaChevronUp } from 'react-icons/fa';
import Icon from '../../Components/Single/Icon';
//dev: Import Swiper styles
import 'swiper/css';
import Products from './Products';
import { background } from '@chakra-ui/react';

const Home = ({ title }) => {

  useEffect(() => {
    document.title = title ? title : 'TT Avatars | Home';
  }, [])

  
  return (
    <>
      <Appbar mobile="offcanvas" />
      <Hero />
      <About />
      <Products/>
      <Tockenomics/>
      <NftSlider/>
      <How/>
      <Roadmap/>
      <Affiliate/>
      <Socials/>
      <Footer/>
      {/* BACK TO TOP */}
      {/* <div className="backToTop" id="home">
        <a href="#home">
          <Icon className="bg-custom text-white p-3" style={{background:"#4E8664"}}circle> <FaChevronUp /> </Icon>
        </a>
      </div> */}
    </>
  )
}

export default Home;