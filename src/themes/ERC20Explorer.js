import React, { useEffect } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ExploreERC20 from "../components/erc20explorer/ExploreERC20";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import { getAllERC20 } from "../functions/fetchFunctions";
import chains from "./../functions/icons.json";

function getGroups(startTime, endTime)  {
  startTime = new Date(startTime);
  endTime = new Date(endTime);
  const currentTime = new Date();
  const newArray = [];
  if(startTime > currentTime){
    newArray.push("upcoming");
  }

  if(startTime < currentTime && endTime > currentTime){
    newArray.push("ongoing");
  }

  if(endTime < currentTime){
    newArray.push("ended");
  }

  return newArray;
} 


function ERC20Explorer() {
  const [data, setData] = React.useState([]);

  useEffect(function () {
    getAllERC20().then((result) => {
      const mapped = result.map((value, index) => ({
        id: index,
        img: "http://google.com",
        group: getGroups(value.startTime, value.endTime),
        blockchain: chains[value.chainId],
        title: `${value.name}(${value.symbol})`,
        reg_date: new Date(value.startTime).toDateString(),
        raise: "120k",
        val: "4.8M",
        price: "$"+value.initialPrice/(10**value.decimals),
        progress: "42%",
        mecha: "0/298,064 MECHA",
        busd: "0 BUSD",
        address: value.address,
        chainId: value.chainId,
        deployerAddress: value.deployerAddress
      }))
      setData(mapped);
      console.log(mapped);
    });
  }, []);
  return (
    <div className="main">
      <Header />
      <Breadcrumb
        title="Project Style 2"
        subpage="Project"
        page="Project Style 2"
      />
      {
        data.length? 
        <ExploreERC20  data={data}/>:
        <></>
      }
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default ERC20Explorer;
