import React, { Component } from "react";
import { useNetwork } from "wagmi";
import { getAllERC20 } from "../../functions/fetchFunctions";
import chains from "../../functions/icons.json";
import { Contractcard } from "../erc20explorer/ExploreERC20";

const initData = {
  sub_heading: "Project",
  heading: "Upcoming ICOs",
  btn: "View More",
  actionBtn: "Participate",
};

const data = [
  {
    id: "1",
    img: "/img/thumb_1.png",
    blockchain: "/img/ethereum.png",
    title: "Metaverse 3D",
    reg_date: "2022-12-30",
    raise: "100k",
    val: "2.8M",
    allocation: "$0",
    progress: "25%",
    mecha: "0/100,069 MECHA",
    busd: "0 BUSD",
  }
];

const socialData = [
  {
    id: "1",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "2",
    link: "telegram",
    icon: "fab fa-telegram",
  },
  {
    id: "3",
    link: "globe",
    icon: "fas fa-globe",
  },
  {
    id: "4",
    link: "discord",
    icon: "fab fa-discord",
  },
];

function getGroups(startTime, endTime) {
  startTime = new Date(startTime);
  endTime = new Date(endTime);
  const currentTime = new Date();
  const newArray = [];
  if (startTime > currentTime) {
    newArray.push("upcoming");
  }

  if (startTime < currentTime && endTime > currentTime) {
    newArray.push("ongoing");
  }

  if (endTime < currentTime) {
    newArray.push("ended");
  }

  return newArray;
}

export default function ProjectOne() {
  const [tokenData, setTokenData] = React.useState([]);

  React.useEffect(function () {
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
        price: "$" + value.initialPrice / 10 ** value.decimals,
        progress: "42%",
        mecha: "0/298,064 MECHA",
        busd: "0 BUSD",
        address: value.address,
        chainId: value.chainId,
        deployerAddress: value.deployerAddress
      }));
      setTokenData(mapped);
    });
  }, []);
  console.log(tokenData);

  return tokenData && tokenData.length ? (
    <Slider tokenData={tokenData} />
  ) : (
    <></>
  );
}

function Slider({ tokenData }) {
  return (
    <section id="explore" className="project-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span className="intro-text">{initData.sub_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <a className="btn content-btn" href="/erc20explorer">
                  {initData.btn}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="project-slides">
          <div className="swiper-container slider-mid items">
            <div className="swiper-wrapper">
              {tokenData.map((item, idx) =>
                item ? (
                  <div key={`pd_${idx}`} className="swiper-slide item">
                    <Contractcard item={item} idx={idx} />
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
}
