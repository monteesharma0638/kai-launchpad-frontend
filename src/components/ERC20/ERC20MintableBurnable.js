import { ContractFactory, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { setToken } from "../../functions/fetchFunctions";
import ERC20MintableBurnableContract from "./../../contracts/ERC20MintableBurnable.json";

const initData = {
  btn: "Submit",
  notice:
    "After submit the details you have to connect to the wallet and make a transaction. it will create your token on the selected chain and launch it as well on this site",
};

function ERC20MintableBurnable() {
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const {address} = useAccount();

  const [state, setState] = useState({
    initData: {},
  });

  const { data: signer } = useSigner();
  const timeInstances = new Date().toISOString().split(":");
  const currentTimeString = `${timeInstances[0]}:${timeInstances[1]}`;

  const [value, setValue] = useState({
    name: "",
    symbol: "",
    decimals: "",
    intialSupply: "",
    price: "",
    description: "",
    webUrl: "",
    startTime: currentTimeString,
    endTime: currentTimeString,
  });

  useEffect(() => {
    setState({
      initData: initData,
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (signer) {
      try {
        const contract = new ContractFactory(
          ERC20MintableBurnableContract.abi,
          ERC20MintableBurnableContract.bytecode,
          signer
        );
        const account = address;
        const hash = await contract.deploy(
          value.name,
          value.symbol,
          value.decimals,
          ethers.BigNumber.from(value.intialSupply).mul(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(value.decimals))),
          ethers.utils.parseEther(value.price),
          false,
          
          parseFloat(new Date(value.startTime).getTime() / 1000).toFixed(0),
          parseFloat(new Date(value.endTime).getTime() / 1000).toFixed(0)
        );
        const contractAddress = hash.address;
        await setToken(
          contractAddress,
          chain,
          value.name,
          value.symbol,
          value.decimals,
          value.intialSupply,
          value.price,
          value.startTime,
          value.endTime,
          "ERC20MintableBurnable",
          value.description,
          value.webUrl,
          account
        );
        navigate("/launchpad-dashboard/" + contractAddress + "/" + chain.id);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className="apply-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="apply-form card no-hover">
              <form onSubmit={(e) => handleSubmit(e, value)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                    id="name"
                    required
                  />
                  <small className="form-text mt-2">
                    Enter the name of your Token
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="symbol">Symbol</label>
                  <input
                    type="text"
                    value={value.symbol}
                    onChange={(e) =>
                      setValue({ ...value, symbol: e.target.value })
                    }
                    id="symbol"
                    required
                  />
                  <small className="form-text mt-2">
                    Enter the symbol of your token
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="decimals">Decimals</label>
                  <input
                    type="number"
                    min="1"
                    max="18"
                    value={value.decimals}
                    onChange={(e) =>
                      setValue({ ...value, decimals: e.target.value })
                    }
                    id="decimals"
                    required
                  />
                  <small className="form-text mt-2">
                    Enter the decimals of your token It denotes the fraction of
                    your token
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="intial-supply">Initial Supply</label>
                  <input
                    type="number"
                    min="0"
                    value={value.intialSupply}
                    onChange={(e) =>
                      setValue({ ...value, intialSupply: e.target.value })
                    }
                    id="intial-supply"
                    required
                  />
                  <small className="form-number mt-2">
                    Let us know initial supply of the token
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="intial-price">price</label>
                  <input
                    type="number"
                    value={value.price}
                    onChange={(e) =>
                      setValue({ ...value, price: e.target.value })
                    }
                    min="0"
                    step="0.00000001"
                    id="intial-price"
                    required
                  />
                  <small className="form-text mt-2">
                    What will be the initial offering price of the token
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Describe your token</label>
                  <textarea
                    value={value.description}
                    onChange={(e) =>
                      setValue({ ...value, description: e.target.value })
                    }
                    id="description"
                    placeholder="Short Description"
                    cols={30}
                    rows={3}
                  />
                  <small className="form-text mt-2">
                    This will show as the token description on the website.
                    (Optional)
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="web-url">Website URL</label>
                  <input
                    type="text"
                    id="web-url"
                    value={value.webUrl}
                    onChange={(e) =>
                      setValue({ ...value, webUrl: e.target.value })
                    }
                  />
                  <small className="form-text mt-2">
                    Your website address(Leave it blank if don't have any)
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="start-time">Sale Start Time</label>
                  <input
                    type={"datetime-local"}
                    value={value.startTime}
                    onChange={(e) =>
                      setValue({ ...value, startTime: e.target.value })
                    }
                    id="start-time"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="end-time">Sale End Time</label>
                  <input
                    type="datetime-local"
                    id="end-time"
                    value={value.endTime}
                    onChange={(e) =>
                      setValue({ ...value, endTime: e.target.value })
                    }
                  />
                </div>
                <span className="d-inline-block">{state.initData.notice}</span>
                <button type="submit" className="btn btn-bordered active mt-4">
                  {state.initData.btn} <i className="icon-login ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ERC20MintableBurnable;