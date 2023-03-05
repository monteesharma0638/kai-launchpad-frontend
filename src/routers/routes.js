import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ProjectOne from "../themes/project-one";
import ProjectTwo from "../themes/project-two";
import ProjectThree from "../themes/project-three";
import ProjectFour from "../themes/project-four";
import ProjectSingle from "../themes/project-single";
import StakingOne from "../themes/staking-one";
import StakingTwo from "../themes/staking-two";
import Farming from "../themes/farming";
import Leaderboard from "../themes/leaderboard";
import Apply from "../themes/apply";
import Wallet from "../themes/wallet-connect";
import HelpCenter from "../themes/help-center";
import Contact from "../themes/contact";
import Login from "../themes/login";
import Register from "../themes/register";
import Reset from "../themes/reset";
import Tokenomics from "../themes/tokenomics";
import Tier from "../themes/tier-system";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import DataContext from "../DataContext";
import ERC20 from "../themes/ERC20";
import LaunchpadDashboardPage from "../themes/LauchpadDashboardPage";
import ERC20Explorer from "../themes/ERC20Explorer";
import ClientERC20 from "../themes/ClientERC20";
import ERC721 from "../themes/ERC721";
import LauchpadNftDashboard from "../themes/LaunchpadNftDashboard";

function MyRouts() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={ <DataContext><ThemeOne /></DataContext> } />
            <Route exact path="/project-one" element={ <DataContext><ProjectOne /></DataContext> } />
            <Route exact path="/project-two" element={ <DataContext><ProjectTwo /></DataContext> } />
            <Route exact path="/erc20explorer" element={ <DataContext><ERC20Explorer /></DataContext> } />
            <Route exact path="/project-three" element={ <DataContext><ProjectThree /></DataContext> } />
            <Route exact path="/project-four" element={ <DataContext><ProjectFour /></DataContext> } />
            <Route exact path="/project-single" element={ <DataContext><ProjectSingle /></DataContext> } />
            <Route exact path="/client-erc20/:contractAddress/:chainId" element={ <DataContext><ClientERC20 /></DataContext> } />
            <Route exact path="/staking-one" element={ <DataContext><StakingOne /></DataContext> } />
            <Route exact path="/erc721explorer" element={ <DataContext><StakingTwo /></DataContext> } />
            <Route exact path="/farming" element={ <DataContext><Farming /></DataContext> } />
            <Route exact path="/leaderboard" element={ <DataContext><Leaderboard /></DataContext> } />
            <Route exact path="/apply" element={ <DataContext><Apply /></DataContext> } />
            <Route exact path="/launchpad-dashboard/:contractAddress/:chainId" element={ <DataContext><LaunchpadDashboardPage /></DataContext> } />
            <Route exact path="/launchpad-nft-dashboard/:contractAddress/:chainId" element={ <DataContext><LauchpadNftDashboard /></DataContext> } />
            <Route exact path="/erc20/:type" element={ <DataContext><ERC20 /></DataContext> } />
            <Route exact path="/wallet-connect" element={ <DataContext><Wallet /></DataContext> } />
            <Route exact path="/help-center" element={ <DataContext><HelpCenter /></DataContext> } />
            <Route exact path="/contact" element={ <DataContext><Contact /></DataContext> } />
            <Route exact path="/erc721/queryable" element={ <DataContext><ERC721 /></DataContext> } />
            <Route exact path="/login" element={ <DataContext><Login /></DataContext> } />
            <Route exact path="/register" element={ <DataContext><Register /></DataContext> } />
            <Route exact path="/reset" element={ <DataContext><Reset /></DataContext> } />
            <Route exact path="/tokenomics" element={ <DataContext><Tokenomics /></DataContext> } />
            <Route exact path="/tier-system" element={ <DataContext><Tier /></DataContext> } />
            <Route exact path="/blog" element={ <DataContext><Blog /></DataContext> } />
            <Route exact path="/blog-single" element={ <DataContext><BlogSingle /></DataContext> } />
          </Routes>
        </BrowserRouter>
      </div>
    )
}
export default MyRouts;