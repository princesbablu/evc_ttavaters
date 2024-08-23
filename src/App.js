import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// STYLES
import './assets/scss/styles.scss';
import "./assets/scss/theme/dashboard/swapping.scss"
// PAGES
import HomePage from './Pages/Home';
import ErrorPage from './Pages/Error';
import Dashboard from './Pages/Dashboard';
import Navbar from './Pages/Dashboard/Globals/Navbar';
import Sidebar from './Pages/Dashboard/Globals/Sidebar';
import EvcAvatars from './Pages/Dashboard/EvcAvatars';
import TokenDetails from './Pages/Dashboard/TokenDetails';
import Swapping from './Pages/Dashboard/Swapping';
// import SwapComponent from './Pages/Dashboard/SwapComponent';
import RankBonus from './Pages/Dashboard/RankBonus';
import TeamStatistics from './Pages/Dashboard/TeamStatistics/TeamStatistics';
import BuyBurn from './Pages/Dashboard/BuyBurn';
import NftMinerRewards from './Pages/Dashboard/NftMinerRewards';
import Error from './Pages/Dashboard/Globals/Error';
import About from './Pages/Home/About';
import Tockenomics from './Pages/Home/Tockenomics';
import NftSlider from './Pages/Home/NftSlider';
import How from './Pages/Home/How';
import MintNew from './Pages/Dashboard/Mint/MyNFTs';
import ReferralLink from './Pages/Dashboard/ReferralLink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './Pages/Home/Products';
import SwappingNew from './Pages/Dashboard/SwappingNew';
import TrendProducts from './Pages/Dashboard/TrendProducts';


function App() {

  const [sideToggle, setSideToggle] = useState(false);

  // dev: Sponsor/Reference Address
  const queryString = window.location.search;
  console.log("queryString ", (queryString).slice(0, 6));
  const parameters = new URLSearchParams(queryString);
  console.log("parameters ", parameters);
  const value = parameters.get("ref");
  console.log("value", value);
  if (queryString.slice(0, 6) === "?ref=$") {
    window.localStorage.setItem("sponsorAddress", value.slice(1));
  }

  const DashNavbar = (item) => {
    return (
      <>
        <Navbar sideToggle={sideToggle} setSideToggle={setSideToggle} />
        <Sidebar sideToggle={sideToggle} setSideToggle={setSideToggle} />
        {item}
      </>
    );
  };


  return (

    <>
      <span id="home"></span>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/Tockenomics" element={<Tockenomics />} />
        <Route path="/NftSlider" element={<NftSlider />} />
        <Route path="/How" element={<How />} />
        <Route path="/dashboard">
          <Route index element={DashNavbar(<EvcAvatars />)} />
          <Route path="main" element={DashNavbar(<Dashboard />)} />
          <Route path="tt-avatars" element={DashNavbar(<EvcAvatars />)} />
          <Route path="token-details" element={DashNavbar(<TokenDetails />)} />
          <Route path="myavatars" element={DashNavbar(<MintNew />)} />
          <Route path="swap" element={DashNavbar(<Swapping />)} />
          <Route path="rank-bonus" element={DashNavbar(<RankBonus />)} />
          <Route path="team-statistics" element={DashNavbar(<TeamStatistics />)} />
          <Route path="buy-burn" element={DashNavbar(<BuyBurn />)} />
          <Route path="avatar-mining-reward" element={DashNavbar(<NftMinerRewards />)} />
          <Route path="tred-products" element={DashNavbar(<TrendProducts />)} />
          <Route path="referralLink" element={DashNavbar(<ReferralLink />)} />
          <Route path="*" element={DashNavbar(<Error />)} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;