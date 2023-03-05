import { ethers } from "ethers";
import React from "react";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";
import {
  useAccount,
  useBalance,
  useContract,
  useContractWrite,
  allChains,
} from "wagmi";
import { getToken, serverUrl, setToken } from "../../functions/fetchFunctions";
import ERC20Mintable from "./../../contracts/ERC20Mintable.json";
import chains from "./../../functions/icons.json";

const initData = {
  img: "/img/thumb_2.png",
  blockchain: "/img/ethereum.png",
  title: "Metaverse",
  reg_date: "2022-11-30",
  raise: "100k",
  val: "2.8M",
  allocation: "$0",
  progress: "25%",
  mecha: "0/100,069 MECHA",
  busd: "0 BUSD",
  actionBtn: "Claim Token",
  video_img: "/img/thumb_6.png",
  video_icon: "fa-solid fa-play",
  video_link: "https://www.youtube.com/watch?v=fzBTvDraO5U",
};

const summaryData = {
  title: "Project Summary",
  content_1:
    "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
  content_2:
    "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
};

const overviewData = {
  title: "Project Overview",
  list_heading: "Lorem ipsum dolor sit",
  content:
    "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
};

const tokenmetricsData = {
  title: "Token Metrics",
  content:
    "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
};

const roadmapData = {
  title: "Roadmap",
  content_1:
    "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
  content_2:
    "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
};

const socialData = [
  
];

const overviewList = [
  {
    id: "1",
    content: "Far far away",
  },
  {
    id: "2",
    content: "Behind the word mountains",
  },
  {
    id: "3",
    content: "Far from the countries Vokalia and Consonantia",
  },
  {
    id: "4",
    content: "There live the blind texts",
  },
];

const tokenList = [
  {
    id: "1",
    title: "Fundraised:",
    content: "$500,000",
  },
  {
    id: "2",
    title: "Platfrom Raise:",
    content: "$120,000 + $5,000",
  },
  {
    id: "3",
    title: "Price:",
    content: "$0.05",
  },
  {
    id: "4",
    title: "Lock-up:",
    content: "25% unlocked on TGE, 4 months cliff, then 5% on a monthly basis",
  },
];

function ERC20Client({ data }) {
  const [name, symbol, tokenPrice, decimals] = data;
  const { contractAddress, chainId } = useParams();
  const price = Number(tokenPrice) / 10 ** Number(decimals);
  const [tokenData, setTokenData] = React.useState(0);

  React.useEffect(() => {
    getToken(contractAddress, chainId).then((result) => {
      setTokenData(result[0]);
    });
  }, [contractAddress, chainId]);

  const [inputValue, setInputValue] = React.useState({
    eth: 0,
    token: 0,
  });

  const contract = useContractWrite({
    address: contractAddress,
    abi: ERC20Mintable.abi,
    functionName: "buyToken",
  });
  const { address } = useAccount();
  const balance = useBalance({
    addressOrName: address,
    chainId: Number(chainId),
  });

  const [state, setState] = React.useState({
    initData: {},
    summaryData: {},
    overviewData: {},
    tokenmetricsData: {},
    roadmapData: {},
    socialData: [],
    overviewList: [],
    tokenList: [],
  });

  React.useEffect(() => {
    setState({
      initData: initData,
      summaryData: summaryData,
      overviewData: overviewData,
      tokenmetricsData: tokenmetricsData,
      roadmapData: roadmapData,
      socialData: socialData,
      overviewList: overviewList,
      tokenList: tokenList,
    });
  }, []);

  function handleEthChange(e) {
    const value = e.target.value;
    setInputValue({
      eth: value,
      token: value / price,
    });
  }

  function handleTokenChange(e) {
    const value = e.target.value;
    setInputValue({
      eth: value * price,
      token: value,
    });
  }

  function buyToken(eth) {
    const value = ethers.utils.parseEther(eth);
    contract.write({
      recklesslySetUnpreparedOverrides: {
        value,
      },
    });
  }

  const startTime = data ? Number(data[5]) * 1000 : 0;
  const endTime = data ? Number(data[6]) * 1000 : 0;
  const currentTime = new Date().getTime();
  const totalSupply = tokenData
    ? Number(data[6]) / 10 ** tokenData.decimals
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
    <section className="item-details-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            {/* Project Card */}
            <div className="card project-card no-hover">
              <div className="media">
                <img
                  className="card-img-top avatar-max-lg"
                  src={tokenData? `${serverUrl}/getTokenImage?account=${tokenData.deployerAddress}&contractAddress=${contractAddress}&chainId=${chainId}`: chains[chainId]}
                    alt="Loading.."
                    onError={(e) => {
                      e.target.src=chains[chainId];
                    }}
                />
                <div className="media-body ml-4">
                  <h4 className="m-0">{name}</h4>
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
                      {parseFloat(
                        (tokenVolume / Number(totalSupply)) * 100
                      ).toFixed(4)}
                      %
                    </div>
                  </div>
                  <div className="progress-sale d-flex justify-content-between mt-3">
                    <span>
                      {Number(tokenVolume).noExponents()}/
                      {Number(totalSupply).noExponents()}
                    </span>
                    <span>
                      {Number(ethVolume).noExponents()}{" "}
                      {tokenData
                        ? allChains.filter(
                            (value) => value.id === Number(tokenData.chainId)
                          )[0].nativeCurrency.symbol
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              {/* Project Footer */}
              <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
                <a
                  className="btn btn-bordered-white btn-smaller"
                  onClick={(e) => buyToken(inputValue.eth)}
                >
                  {state.initData.actionBtn}
                </a>
                {/* Social Share */}
                <div className="social-share ml-auto">
                  <ul className="d-flex list-unstyled">
                    {state.socialData.map((item, idx) => {
                      return (
                        <li key={`sd_${idx}`}>
                          <a href="/#">
                            <i className={item.icon} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-2">
                  <div className="input-text" style={{ width: "100%" }}>
                    <input
                      type="number"
                      value={inputValue.eth}
                      onChange={handleEthChange}
                      placeholder={0.0}
                    />
                    <span>
                      {" "}
                      {balance.data? balance.data.formatted: 0} {balance.data? balance.data.symbol: ""}
                    </span>
                  </div>
                </div>
                <div className="input-area d-flex flex-column flex-md-row mb-2">
                  <div className="input-text" style={{ width: "100%" }}>
                    <input
                      type="number"
                      value={inputValue.token}
                      onChange={handleTokenChange}
                      placeholder={0.0}
                    />
                    <div>{symbol}</div>
                    {/* <a href="#">Max </a> */}
                  </div>
                </div>
              </div>
              {/* Blockchain Icon */}
              <div className="blockchain-icon">
                <img src={chains[chainId]} alt="" />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 items mt-5 mt-lg-0">
            <div className="card project-card single-item-content no-hover item ml-lg-4">
              <h3 className="m-0">{state.summaryData.title}</h3>
              <p>{}</p>
              <p>
                {tokenData
                  ? tokenData.description
                  : "No Description to display"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ERC20Client;
