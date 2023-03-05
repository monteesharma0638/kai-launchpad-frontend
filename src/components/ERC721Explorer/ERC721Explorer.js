import React from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  allChains as chains,
} from "wagmi";
import { getAllERC721, serverUrl } from "../../functions/fetchFunctions";
import ERC721AQueryable from "../../contracts/NftQueryable.json";
import Countdown from "react-countdown";
import chainLogos from "../../functions/icons.json";

const state = [
  {
    id: 1,
    img: "/img/thumb_3.png",
    img_1: "/img/thumb_6.png",
    title: "Participate IGO Stake",
    title_1: "Farming Stake",
    category: "Game",
    collapse_link: "#collapseOne",
    collapse_id: "collapseOne",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC making it over.",
    staked: "0 LP",
    earned: "0.00 Game",
    apy: "25%",
    price: "$9,524,07.19",
    value: "$24571,957.94",
    input_title_1: "Deposit",
    input_title_2: "Withdraw",
    input_btn_1: "Approve",
    input_btn_2: "Withdraw",
    reward_title: "Pending rewards",
    reward: "0.00 BUSD",
    reward_content: "Rewards are depleted, ask admins to fund it.",
    actionBtn: "Claim",
  },
  {
    id: 2,
    img: "/img/thumb_4.png",
    img_1: "/img/thumb_7.png",
    title: "Gaming Stake",
    title_1: "Gaming Stake",
    category: "Staking",
    collapse_link: "#collapseTwo",
    collapse_id: "collapseTwo",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC making it over.",
    staked: "0 LP",
    earned: "0.00 Game",
    apy: "14%",
    price: "$7,742,57.29",
    value: "$14517,257.72",
    input_title_1: "Deposit",
    input_title_2: "Withdraw",
    input_btn_1: "Approve",
    input_btn_2: "Withdraw",
    reward_title: "Pending rewards",
    reward: "0.00 BUSD",
    reward_content: "Rewards are depleted, ask admins to fund it.",
    actionBtn: "Claim",
  },
];

export default function ERC721Explorer({ limit }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getAllERC721()
      .then((data) => {
        data = data.map((value, index) => ({
          ...value,
          collapse_link: `#collapse${index}`,
          collapse_id: `collapse${index}`,
        }));
        if (limit) {
          data.length = limit;
        }
        return data;
      })
      .then(setData);
  }, [limit]);

  function getNativeCurrency(chainId) {
    try {
      if(chainId){
        const native = chains.filter((value) => value.id === Number(chainId))[0]
          .nativeCurrency.symbol;
        return native;
      }
      else {
        return "eth";
      }
    } catch (err) {
      return "eth";
    }
  }

  return (
    <section className="staking-area">
      <div id="gameon-accordion" className="container accordion">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            {/* Single Accordion Item */}
            {data.map((item, idx) => {
              return (
                <div key={`fard_${idx}`} className="single-accordion-item">
                  {/* Card Header */}
                  <div className="card-header bg-inherit border-0 p-0">
                    <h2 className="m-0">
                      <button
                        className="btn staking-btn d-block text-left w-100 py-4"
                        type="button"
                        data-toggle="collapse"
                        data-target={item.collapse_link}
                      >
                        <div className="row">
                          <div className="col-12 col-md-8">
                            <div className="media flex-column flex-md-row">
                              <img
                                className="avatar-max-lg"
                                src={`${serverUrl}/getTokenImage?account=${item.deployerAddress}&contractAddress=${item.address}&chainId=${item.chainId}`}
                                alt="Loading.."
                                onError={(e) => {
                                  e.target.src = chainLogos[item.chainId];
                                }}
                              />
                              <div className="content media-body mt-4 mt-md-0 ml-md-4">
                                <h4 className="m-0">
                                  {item.name} ({item.symbol})
                                </h4>
                                <span className="d-inline-block mt-2">
                                  {item.tokenType}
                                </span>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row staking-info align-items-center justify-content-center mt-4 mt-md-5">
                          <div className="col single-item">
                            <span>
                              {item.initialPrice}{" "}
                              {getNativeCurrency(item.chainId)}
                            </span>
                            <span>Price/Nft</span>
                          </div>
                          <div className="col single-item">
                            <span>{item.maxSupply}</span>
                            <span>Max Supply</span>
                          </div>
                          <div className="col single-item">
                            <span>
                              <TotalSupply
                                contractAddress={item.address}
                                chainId={item.chainId}
                              />{" "}
                            </span>
                            <span>Current Supply</span>
                          </div>
                          <div className="col single-item">
                            <span>
                              <PercentSold
                                contractAddress={item.address}
                                chainId={item.chainId}
                                maxSupply={item.maxSupply}
                              />{" "}
                              %
                            </span>
                            <span>Sold</span>
                          </div>
                          <div className="col single-item">
                            <div className="countdown-times">
                              {item.startTime > new Date() ? (
                                <div className="countdown-times">
                                  <h6 className="my-2">Registration in:</h6>
                                  {data ? (
                                    <Countdown
                                      renderer={({
                                        days,
                                        hours,
                                        minutes,
                                        seconds,
                                      }) => (
                                        <span
                                          style={{
                                            color: days < 2 ? "green" : "",
                                          }}
                                        >
                                          {days} d: {hours} h: {minutes} m:{" "}
                                          {seconds} sec
                                        </span>
                                      )}
                                      date={new Date(item.startTime)}
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
                                      renderer={({
                                        days,
                                        hours,
                                        minutes,
                                        seconds,
                                      }) => (
                                        <span
                                          style={{
                                            color: days < 2 ? "red" : "",
                                          }}
                                        >
                                          {days} d: {hours} h: {minutes} m:{" "}
                                          {seconds} sec
                                        </span>
                                      )}
                                      date={new Date(item.endTime)}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </h2>
                  </div>
                  <BuyNft item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TotalSupply({ contractAddress, chainId }) {
  const { data } = useContractRead({
    address: contractAddress,
    chainId,
    abi: ERC721AQueryable.abi,
    functionName: "totalSupply",
  });

  return data ? Number(data).noExponents() : 0;
}

function PercentSold({ contractAddress, chainId, maxSupply }) {
  const { data } = useContractRead({
    address: contractAddress,
    chainId,
    abi: ERC721AQueryable.abi,
    functionName: "totalSupply",
  });

  return data ? (Number(data) / Number(maxSupply)) * 100 : 0;
}

function BuyNft({ item }) {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const [inputValue, setInputValue] = React.useState(0);
  const payValue = inputValue * Number(item.initialPrice);

  const { write: buyNft } = useContractWrite({
    address: item.address,
    chainId: item.chainId,
    abi: ERC721AQueryable.abi,
    functionName: "buyNft",
    overrides: {
      value: payValue ? window.BigInt(payValue * 10 ** 18) : 0,
    },
  });

  function handleChange(e) {
    try {
      const value = Number(e.target.value);
      if (value) {
        setInputValue(value);
      } else {
        setInputValue(0);
      }
    } catch (err) {
      console.log(err.message);
      setInputValue(0);
    }
  }

  function getNativeCurrency(chainId) {
    try {
      return chains.filter((value) => value.id === Number(chainId))[0]
        .nativeCurrency.symbol;
    } catch (err) {
      return "eth";
    }
  }
  return (
    <div
      id={item.collapse_id}
      className="collapse"
      data-parent="#gameon-accordion"
    >
      {/* Card Body */}
      <div className="card-body">
        <div className="row">
          {/* Single Staking Item */}
          {chain && chain.id === Number(item.chainId) ? (
            <div className="col-12 col-md-4 single-staking-item input-box">
              <span className="item-title mb-2">
                Amount ( No. of {item.symbol})
              </span>
              <div className="input-area d-flex flex-column">
                <div className="input-text">
                  <input
                    type="text"
                    placeholder={0.0}
                    onChange={handleChange}
                    value={inputValue}
                  />
                </div>
                <a href="#" onClick={buyNft} className="btn input-btn mt-2">
                  Purchase
                </a>
              </div>
            </div>
          ) : (
            <>Wrong Network or Not Connected</>
          )}
          {/* Single Staking Item */}
          <div className="col-12 col-md-4 single-staking-item input-box"></div>
          {/* Single Staking Item */}
          <div className="col-12 col-md-4 single-staking-item input-box">
            <span className="item-title mb-2">you have to pay</span>
            <div className="input-area d-flex flex-column">
              <h4 className="price m-0">
                {payValue} {getNativeCurrency(item.chainId)}
              </h4>
              <span className="reward my-2">
                you have to be owner to access launchpad dashboard
              </span>
              <a
                href={"/launchpad-nft-dashboard/" + item.address + "/" + item.chainId}
                className={
                  "btn input-btn mt-2" +
                  (address === item.deployerAddress ? "" : " disabled")
                }
              >
                <i className="fa-solid fa-lock mr-1" /> Launchpad
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
