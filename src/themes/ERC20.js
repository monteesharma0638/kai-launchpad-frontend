import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ERC20Mintable from "../components/ERC20/ERC20Mintable";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import { useParams } from "react-router-dom";
import ERC20MintableBurnable from "../components/ERC20/ERC20MintableBurnable";
import ERC20FixedSupply from "../components/ERC20/ERC20FixedSupply";


function ERC20() {
  const {type} = useParams();

  function Apply(){
    switch(type){
      case "mintable": return <ERC20Mintable />;
      case "mintableburnable": return <ERC20MintableBurnable />;
      case "fixedSupply": return <ERC20FixedSupply />;
      default: return <ERC20Mintable />;
    }
  }

  return (
    <div className="main">
      <Header />
      <Breadcrumb title="ERC20 Token Launchpad" subpage="Token Launchpad" page={`ERC20 ${type}`} />
      {
        Apply()
      }
      {/* <Cta /> */}
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default ERC20;
