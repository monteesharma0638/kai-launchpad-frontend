import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ERC721Explorer from "../components/ERC721Explorer/ERC721Explorer";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";

export default function StakingTwo() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb
        title="Explore Collections"
        subpage="collections"
        page="ERC721"
      />
      <ERC721Explorer />
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}
