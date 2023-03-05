import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import CreateERC721 from "../components/ERC721/CreateERC721";

export default function ERC721() {
  return (
    <div className="main">
      <Header />
      <Breadcrumb title="ERC721" subpage="NFT" page="ERC721 Queryable" />
      <CreateERC721 />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}
