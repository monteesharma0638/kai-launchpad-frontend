import React from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Project from "../components/Project/ProjectOne";
import ProjectTwo from "../components/Project/ProjectTwo";
import Content from "../components/Content/Content";
import Team from "../components/Team/Team";
import Work from "../components/Work/Work";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import ERC721Explorer from "../components/ERC721Explorer/ERC721Explorer";

export default function ThemeOne() {
  return (
    <div className="main">
      <Header />
      <Hero />
      <Project />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span className="intro-text">Project</span>
                <h3 className="mt-3 mb-0"> Recent Nft Collections </h3>
              </div>

              <div className="intro-btn">
                <a className="btn content-btn" href="/erc20explorer">
                  view more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ERC721Explorer limit={5} />
      <Content />
      <Work />
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}
