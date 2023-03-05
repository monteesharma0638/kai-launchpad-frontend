import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { useAccount, useContractReads, allChains as chainsAll } from "wagmi";
import {
  getAllERC20,
  getToken,
  serverUrl,
} from "../../functions/fetchFunctions";
import ERC20Mintable from "./../../contracts/ERC20Mintable.json";
import chains from "../../functions/icons.json";

const initData = {
  sub_heading: "Exclusive",
  heading: "Multi-chain IGOs",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  actionBtn: "Purchase",
  filter_1: "All",
  filter_2: "Ongoing",
  filter_3: "Upcoming",
  filter_4: "Ended IGO",
};

// const data = [
//   {
//     id: "1",
//     img: "/img/thumb_1.png",
//     group: '["ongoing","ended"]',
//     blockchain: "/img/ethereum.png",
//     title: "Metaverse 3D",
//     reg_date: "2022-12-30",
//     raise: "100k",
//     val: "2.8M",
//     allocation: "$0",
//     progress: "25%",
//     mecha: "0/100,069 MECHA",
//     busd: "0 BUSD",
//   },
//   {
//     id: "2",
//     img: "/img/thumb_2.png",
//     group: '["upcoming","ended"]',
//     blockchain: "/img/binance.png",
//     title: "Pixel Pix",
//     reg_date: "2022-11-25",
//     raise: "85k",
//     val: "1.9M",
//     allocation: "$0",
//     progress: "8%",
//     mecha: "0/94,752 MECHA",
//     busd: "0 BUSD",
//   },
//   {
//     id: "3",
//     img: "/img/thumb_3.png",
//     group: '["ongoing"]',
//     blockchain: "/img/ethereum-gold.png",
//     title: "Cyber City",
//     reg_date: "2022-11-18",
//     raise: "69k",
//     val: "3.2M",
//     allocation: "$0",
//     progress: "12%",
//     mecha: "0/87,074 MECHA",
//     busd: "0 BUSD",
//   },
//   {
//     id: "4",
//     img: "/img/thumb_4.png",
//     group: '["ended","ongoing"]',
//     blockchain: "/img/solana.png",
//     title: "Real Hunter",
//     reg_date: "2022-12-28",
//     raise: "90k",
//     val: "2.6M",
//     allocation: "$0",
//     progress: "27%",
//     mecha: "0/532,399 MECHA",
//     busd: "0 BUSD",
//   },
//   {
//     id: "5",
//     img: "/img/thumb_5.png",
//     group: '["ended","upcoming"]',
//     blockchain: "/img/ethereum-gold.png",
//     title: "BitHotel",
//     reg_date: "2022-10-30",
//     raise: "120k",
//     val: "4.8M",
//     allocation: "$0",
//     progress: "42%",
//     mecha: "0/298,064 MECHA",
//     busd: "0 BUSD",
//   },
//   {
//     id: "6",
//     img: "/img/thumb_6.png",
//     group: '["upcoming","ended"]',
//     blockchain: "/img/ethereum.png",
//     title: "CryptoPunk",
//     reg_date: "2022-11-30",
//     raise: "89k",
//     val: "4.6M",
//     allocation: "$0",
//     progress: "64%",
//     mecha: "0/396,074 MECHA",
//     busd: "0 BUSD",
//   },
// ];

const socialData = [
  // {
  //   id: "1",
  //   link: "twitter",
  //   icon: "fab fa-twitter",
  // },
  // {
  //   id: "2",
  //   link: "telegram",
  //   icon: "fab fa-telegram",
  // },
  // {
  //   id: "3",
  //   link: "globe",
  //   icon: "fas fa-globe",
  // },
  // {
  //   id: "4",
  //   link: "discord",
  //   icon: "fab fa-discord",
  // },
];

function ExploreERC20({ data }) {
  // {
  //     id: "5",
  //     img: "/img/thumb_5.png",
  //     group: '["ended","upcoming"]',
  //     blockchain: "/img/ethereum-gold.png",
  //     title: "BitHotel",
  //     reg_date: "2022-10-30",
  //     raise: "120k",
  //     val: "4.8M",
  //     allocation: "$0",
  //     progress: "42%",
  //     mecha: "0/298,064 MECHA",
  //     busd: "0 BUSD"
  // }
  return (
    <section className="project-area explore-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <div className="intro-content">
                <span className="intro-text">{initData.sub_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
                <p>{initData.content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-12">
            {/* Explore Menu */}
            <div
              className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-md-4"
              data-toggle="buttons"
            >
              <label className="btn active d-table text-uppercase p-2">
                <input
                  type="radio"
                  defaultValue="all"
                  defaultChecked
                  className="explore-btn"
                />
                <span>{initData.filter_1}</span>
              </label>
              <label className="btn d-table text-uppercase p-2">
                <input
                  type="radio"
                  defaultValue="ongoing"
                  className="explore-btn"
                />
                <span>{initData.filter_2}</span>
              </label>
              <label className="btn d-table text-uppercase p-2">
                <input
                  type="radio"
                  defaultValue="upcoming"
                  className="explore-btn"
                />
                <span>{initData.filter_3}</span>
              </label>
              <label className="btn d-table text-uppercase p-2">
                <input
                  type="radio"
                  defaultValue="ended"
                  className="explore-btn"
                />
                <span>{initData.filter_4}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="row explore-items items inner">
          {data.map((item, idx) => (
            <div
              key={`pd_${idx}`}
              className="col-12 col-md-6 col-lg-4 item explore-item"
              data-groups={item.group}
            >
              <Contractcard item={item} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreERC20;

export function Contractcard({ item, idx }) {
  const [tokenData, setTokenData] = React.useState(0);
  const {address} = useAccount();

  React.useEffect(() => {
    getToken(item.address, item.chainId).then((result) => {
      if (result.length) {
        setTokenData(result[0]);
      } else {
        setTokenData(0);
      }
    });
  }, [item]);

  const contract = {
    address: item.address,
    abi: ERC20Mintable.abi,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "totalSupply",
        chainId: Number(item.chainId),
      },
      {
        ...contract,
        functionName: "tokenPrice",
        chainId: Number(item.chainId),
      },
      {
        ...contract,
        functionName: "antibot",
        chainId: Number(item.chainId),
      },
      {
        ...contract,
        functionName: "startTime",
        chainId: Number(item.chainId),
      },
      {
        ...contract,
        functionName: "endTime",
        chainId: Number(item.chainId),
      },
      {
        ...contract,
        functionName: "owner",
        chainId: Number(item.chainId),
      },
    ],
  });

  const startTime = data ? Number(data[3]) * 1000 : 0;
  const endTime = data ? Number(data[4]) * 1000 : 0;
  const currentTime = new Date().getTime();
  const totalSupply = tokenData && data && data.length
    ? Number(data[0]) / 10 ** tokenData.decimals
    : 0;
  const tokenVolume = tokenData
    ? Number(
        tokenData.sales
          .map((value) => value.tokenAmount)
          .reduce((partialSum, a) => partialSum + a, 0)
      ) /
      10 ** tokenData.decimals
    : 0;
  const ethVolume = tokenData
    ? Number(
        tokenData.sales
          .map((value) => value.ethAmount)
          .reduce((partialSum, a) => partialSum + a, 0)
      ) /
      10 ** 18
    : 0;
  

  return (
    <div className="card project-card">
      <div className="media">
        <a href={"/client-erc20/" + item.address + "/" + item.chainId}>
          <img
            className="card-img-top avatar-max-lg"
            src={`${serverUrl}/getTokenImage?account=${item.deployerAddress}&contractAddress=${item.address}&chainId=${item.chainId}`}
            alt="Loading.."
            onError={(e) => {
              e.target.src = chains[item.chainId];
            }}
          />
        </a>
        <div className="media-body ml-4">
          <a href={"/client-erc20/" + item.address + "/" + item.chainId}>
            <h4 className="m-0">{item.title}</h4>
          </a>
          {startTime > currentTime ? (
            <div className="countdown-times">
              <h6 className="my-2">Registration in:</h6>
              {data ? (
                <Countdown
                  renderer={({ days, hours, minutes, seconds }) => (
                    <span style={{ color: days < 2 ? "green" : "" }}>
                      {days} d: {hours} h: {minutes} m: {seconds} sec
                    </span>
                  )}
                  date={new Date(startTime)}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="countdown-times">
              <h6 className="my-2">Ending in:</h6>
              {data ? (
                <Countdown
                  renderer={({ days, hours, minutes, seconds }) => (
                    <span style={{ color: days < 2 ? "red" : "" }}>
                      {days} d: {hours} h: {minutes} m: {seconds} sec
                    </span>
                  )}
                  date={new Date(endTime)}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      {/* Project Body */}
      <div className="card-body">
        <div className="item-progress">
          <div className="progress mt-4 mt-md-5">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${parseFloat(
                  (tokenVolume / Number(totalSupply)) * 100
                ).toFixed(4)}%`,
              }}
              aria-valuenow={parseFloat(
                (tokenVolume / Number(totalSupply)) * 100
              ).toFixed(4)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {parseFloat((tokenVolume / Number(totalSupply)) * 100).toFixed(4)}
              %
            </div>
          </div>
          <div className="progress-sale d-flex justify-content-between mt-3">
            <span>
              {Number(tokenVolume).noExponents()}/
              {Number(totalSupply).noExponents()}
            </span>
            <span>
              {Number(ethVolume).noExponents()} {chainsAll.filter(value => value.id === Number(item.chainId))[0].nativeCurrency.symbol}
            </span>
          </div>
        </div>
      </div>
      {/* Project Footer */}
      <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
        <a
          className="btn btn-bordered-white btn-smaller"
          href={"/client-erc20/" + item.address + "/" + item.chainId}
        >
          {initData.actionBtn}
        </a>
        {
          data && data[5] && (data[5] === address)? (
            <a
              className="btn btn-bordered-white btn-smaller"
              href={"/launchpad-dashboard/" + item.address + "/" + item.chainId}
            >
              Launchpad
            </a>
          ):(
            <></>
          )
        }
        {/* Social Share */}
        <div className="social-share ml-auto">
          <ul className="d-flex list-unstyled">
            {socialData.map((item, idx) => (
              <li key={`sd_${idx}`}>
                <a href="/#">
                  <i className={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Blockchain Icon */}
      <div className="blockchain-icon">
        <img src={item.blockchain} alt="" />
      </div>
    </div>
  );
}
