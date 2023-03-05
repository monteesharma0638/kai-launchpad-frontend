import React, { useEffect, useState } from "react";
import axios from "axios";
import Sales from "../sales/Sales";
import { useParams } from "react-router-dom";
import { useNetwork, useSignMessage } from "wagmi";
import Countdown from "react-countdown";
import { getDayVolume, getTotalVolume } from "../../functions/commanFunctions";
import icons from "../../functions/icons.json";
import { serverUrl, uploadProfilePicture } from "../../functions/fetchFunctions";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/gameon-json/staking";

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

const oldContent = [
  {
    id: 1,
    tabID: "tab-one",
    tabClass: "tab-pane fade show active",
    tabLink: "tab-one",
    period: "7 Days",
    lock: "Yes",
    fee: "30%",
    status: "Unlocked",
    apy: "0%",
    days: 7,
  },
  {
    id: 2,
    tabID: "tab-two",
    tabClass: "tab-pane fade",
    tabLink: "tab-two",
    period: "14 Days",
    lock: "Yes",
    fee: "30%",
    status: "Unlocked",
    apy: "12%",
    days: 14,
  },
  {
    id: 3,
    tabID: "tab-three",
    tabClass: "tab-pane fade",
    tabLink: "tab-three",
    period: "30 Days",
    lock: "Yes",
    fee: "30%",
    status: "Unlocked",
    apy: "25%",
    days: 30,
  },
  {
    id: 4,
    tabID: "tab-four",
    tabClass: "tab-pane fade",
    tabLink: "tab-four",
    period: "60 Days",
    lock: "No",
    fee: "30%",
    status: "Unlocked",
    apy: "35%",
    days: 60,
  },
];
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

function LaunchpadDashboard({ tokenData, data }) {
  const { contractAddress, chainId } = useParams();
  const { chains } = useNetwork();
  const chain = chains.filter((value) => value.id === Number(chainId))[0];
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      uploadProfilePicture(variables.fileInput, data, contractAddress, chainId);
    },
  });

  if (!data) {
    data = [];
  }
  const [state, setState] = useState({
    data: {},
    tabData: [],
    tabContent: [],
    features: [],
  });

  const totalVolume = getTotalVolume(tokenData.sales);

  const tabContent = oldContent.map((value) => {
    const { tokenVolume, ethVolume } = getDayVolume(
      tokenData.sales,
      value.days
    );
    const percent = (ethVolume / totalVolume.ethVolume) * 100;
    return {
      ...value,
      lock: tokenVolume / 10 ** tokenData.decimals,
      status: ethVolume / 10 ** 18,
      fee: percent,
    };
  });


  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setState({
          data: res.data,
          tabData: res.data.tabData,
          tabContent: res.data.tabContent,
          features: res.data.features,
        });
        // console.log(state.data)
        const tabData = [
          {
            id: 1,
            tabID: "tab-one-tab",
            tabClass: "tab-link active",
            tabLink: "#tab-one",
            title: "07 Days",
          },
          {
            id: 2,
            tabID: "tab-two-tab",
            tabClass: "tab-link",
            tabLink: "#tab-two",
            title: "14 Days",
          },
          {
            id: 3,
            tabID: "tab-three-tab",
            tabClass: "tab-link",
            tabLink: "#tab-three",
            title: "30 Days",
          },
          {
            id: 4,
            tabID: "tab-four-tab",
            tabClass: "tab-link",
            tabLink: "#tab-four",
            title: "60 Days",
          },
        ];
      })
      .catch((err) => console.log(err));
  }, []);

  const startTime = data ? new Date(tokenData.startTime).getTime() : 0;
  const endTime = data ? new Date(tokenData.endTime).getTime() : 0;
  const currentTime = new Date().getTime();
  const totalSupply = data[0] / 10 ** tokenData.decimals;
  const tokenVolume =
    Number(totalVolume.tokenVolume) / 10 ** tokenData.decimals;
  const ethVolume = Number(totalVolume.ethVolume) / 10 ** 18;

  return (
    <section className="staking-area">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="card no-hover staking-card single-staking">
              <h3 className="m-0">{tokenData.name}</h3>
              <span className="balance">
                Price: {Number(tokenData.initialPrice).noExponents()}{" "}
                {chain.nativeCurrency.symbol}
              </span>
              <ul
                className="nav nav-tabs staking-tabs border-0 my-3 my-md-4"
                id="myTab"
                role="tablist"
              >
                {state.tabData.map((item, idx) => {
                  return (
                    <li
                      key={`std_${idx}`}
                      className="nav-item"
                      role="presentation"
                    >
                      <a
                        className={item.tabClass}
                        id={item.tabID}
                        data-toggle="tab"
                        href={item.tabLink}
                        role="tab"
                        aria-selected="true"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content mt-md-3" id="myTabContent">
                {tabContent.map((item, idx) => {
                  return (
                    <div
                      key={`stcd_${idx}`}
                      className={item.tabClass}
                      id={item.tabID}
                      role="tabpanel"
                    >
                      <div className="staking-tab-content">
                        {/* Info Box */}
                        <div className="info-box d-flex justify-content-between">
                          <div className="info-left">
                            <ul className="list-unstyled">
                              <li>
                                <strong>Lock period:</strong> {item.period}
                              </li>
                              <li>
                                <strong>Token sold:</strong>{" "}
                                {Number(item.lock).noExponents()}
                              </li>
                              <li>
                                <strong>
                                  {chain.nativeCurrency.symbol} raised:
                                </strong>{" "}
                                {Number(item.status).noExponents()}
                              </li>
                              <li>
                                <strong>Variation total: </strong>{" "}
                                {parseFloat(item.fee).toFixed(2)} %
                              </li>
                            </ul>
                          </div>
                          <div className="info-right d-flex flex-column">
                            <span>{parseFloat(item.fee).toFixed(0)} %</span>
                            <span>Collection*</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input type="text" placeholder={0.0} />
                    <a href="#">Max</a>
                  </div>
                  <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    {state.data.input_btn_1}
                  </a>
                </div>
                <div className="input-area d-flex flex-column flex-md-row">
                  <div className="input-text">
                    <input type="text" placeholder={0.0} />
                    <a href="#">Max</a>
                  </div>
                  <a href="#" className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    {state.data.input_btn_2}
                  </a>
                </div>
              </div> */}
              <span>{tokenData.description}</span>
              <span className="mt-3">
                <strong>Some short description</strong>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="card project-card no-hover">
              <div className="media">
              <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Tap to change">
                <label htmlFor="file-input" id="file-input-label" >
                  <img
                    className="card-img-top avatar-max-lg"
                    src={`${serverUrl}/getTokenImage?account=${data[5]}&contractAddress=${contractAddress}&chainId=${chainId}`}
                    alt="Loading.."
                    onError={(e) => {
                      e.target.src=initData.img;
                    }}
                  />
                </label>
                </span>
                <input accept="image/*" onChange={e => signMessage({
                  message: "uploadProfile",
                  fileInput: e.target 
                })} type="file" style={{display: "none"}} id="file-input" />
                <div className="media-body ml-4">
                  <h4 className="m-0">{tokenData.name}</h4>
                  <div className="countdown-times">
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
              </div>
              {/* Project Body */}
              <div className="card-body">
                <div className="items">
                  {/* Single Item */}
                  <div className="single-item">
                    <span>Total raise: </span>
                    <span>
                      {" "}
                      {Number(
                        totalVolume.ethVolume / 10 ** 18
                      ).noExponents()}{" "}
                      {chain.nativeCurrency.symbol}
                    </span>
                  </div>
                  {/* Single Item */}
                  <div className="single-item">
                    <span>Token Sold: </span>
                    <span>
                      {" "}
                      {Number(
                        totalVolume.tokenVolume / 10 ** tokenData.decimals
                      ).noExponents()}
                    </span>
                  </div>
                  {/* Single Item */}
                </div>
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
                      {chain.nativeCurrency.symbol}
                    </span>
                  </div>
                </div>
              </div>
              {/* Project Footer */}
              <div className="project-footer d-flex align-items-center mt-4 mt-md-5">
                {/* <a className="btn btn-bordered-white btn-smaller" href="/login">
                  {initData.actionBtn}
                </a> */}
                {/* Social Share */}
                <div className="social-share ml-auto">
                  <ul className="d-flex list-unstyled">
                    {socialData.map((item, idx) => {
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
              {/* Blockchain Icon */}

              <div className="blockchain-icon">
                <img src={icons[chainId]} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {tokenData && chainId ? (
        <Sales
          explorer={chain.blockExplorers.default.url}
          tokenData={tokenData}
        />
      ) : (
        <div> No data found. </div>
      )}
    </section>
  );
}

export default LaunchpadDashboard;
