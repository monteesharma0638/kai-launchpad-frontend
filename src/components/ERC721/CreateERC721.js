import { ContractFactory } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork, useSigner } from "wagmi";
import NftQueryable from "../../contracts/NftQueryable.json";
import { setNft } from "../../functions/fetchFunctions";

const initData = {
  sub_heading: "Create ERC721A Queryable",
  heading: "NFT Collection",
  btn: "Submit Transaction",
  icon_1: "icon text-effect icon-location-pin m-0",
  icon_2: "icon text-effect icon-call-out m-0",
  icon_3: "icon text-effect icon-envelope-open m-0",
  title_1: "Create Collectibles",
  title_2: "Launch Dashboard",
  title_3: "Check Sale Stats",
  address: "2709 Euclid Avenue, Irvine, California",
  map_heading: "Get Google Map Link",
  map_link: "https://www.google.com/maps",
  phone_1: "+805-298-8971",
  phone_2: "+626-773-0240",
  mail_1: "info@yourcompany.com",
  mail_2: "support@webmail.com",
};

export default function CreateERC721() {
  const [state, setState] = React.useState({
    initData: {},
  });
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const {address} = useAccount();

  const { data: signer } = useSigner();
  const timeInstances = new Date().toISOString().split(":");
  const currentTimeString = `${timeInstances[0]}:${timeInstances[1]}`;

  const [inputValue, setInputValue] = React.useState({
    name: "",
    symbol: "",
    maxSupply: "",
    price: "",
    website: "",
    description: "",
    ipfs: "",
    startTime: currentTimeString,
    endTime: currentTimeString
  });

  

  React.useEffect(() => {
    setState({
      initData: initData,
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (signer) {
      try {
        const contract = new ContractFactory(
          NftQueryable.abi,
          NftQueryable.bytecode,
          signer
        );
        const hash = await contract.deploy(
          inputValue.name,
          inputValue.symbol,
          inputValue.ipfs,
          window.BigInt(parseFloat(inputValue.price*(10**18)).toFixed(0)),
          window.BigInt(parseFloat(inputValue.maxSupply).toFixed(0)),
          false,
          window.BigInt(parseFloat(new Date(inputValue.startTime).getTime() / 1000).toFixed(0)),
          window.BigInt(parseFloat(new Date(inputValue.endTime).getTime() / 1000).toFixed(0))
        );
        const contractAddress = hash.address;
        console.log(contractAddress);
        setNft(chain, contractAddress, inputValue.name, inputValue.symbol, inputValue.maxSupply, inputValue.price, inputValue.website, inputValue.description, inputValue.ipfs, inputValue.startTime, inputValue.endTime, address);
        navigate("/launchpad-nft-dashboard/" + contractAddress + "/" + chain.id);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className="apply-area contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            <div className="apply-form card no-hover">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end mb-4">
                <div className="intro-content">
                  <span className="intro-text">
                    {state.initData.sub_heading}
                  </span>
                  <h3 className="mt-3 mb-0">{state.initData.heading}</h3>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="first-name">Collection Name</label>
                  <input
                    type="text"
                    id="collection-name"
                    name="collection-name"
                    placeholder="e.g. John Official collection"
                    required="required"
                    value={inputValue.name}
                    onChange={e => setInputValue({...inputValue, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="collection-symbol">Collection Symbol</label>
                  <input
                    type="text"
                    id="collection-symbol"
                    name="collection-symbol"
                    placeholder="e.g. JohnNft"
                    required="required"
                    value={inputValue.symbol}
                    onChange={e => setInputValue({...inputValue, symbol: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="collection-supply">Max supply</label>
                  <input
                    type="number"
                    id="collection-supply"
                    name="collection-supply"
                    required="required"
                    value={inputValue.maxSupply}
                    onChange={e => setInputValue({...inputValue, maxSupply: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required="required"
                    step="0.002"
                    value={inputValue.price}
                    onChange={e => setInputValue({...inputValue, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="e.g. https://yourwebsite.com"
                    required="required"
                    value={inputValue.website}
                    onChange={e => setInputValue({...inputValue, website: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ipfs">Base Url (ipfs)</label>
                  <input
                    type="text"
                    id="ipfs"
                    name="ipfs"
                    placeholder="e.g. ipfs://...."
                    required="required"
                    value={inputValue.ipfs}
                    onChange={e => setInputValue({...inputValue, ipfs: e.target.value})}
                  />
                  <small className="form-text mt-2">
                    path of directory uploaded on ipfs.
                    eg. ipfs://0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="some short description"
                    cols={30}
                    rows={3}
                    required="required"
                    value={inputValue.description}
                    onChange={e => setInputValue({...inputValue, description: e.target.value})}
                  />
                  <small className="form-text mt-2">
                    Describe your collectible
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="start-time">Sale Start Time</label>
                  <input
                    type={"datetime-local"}
                    value={inputValue.startTime}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, startTime: e.target.value })
                    }
                    id="start-time"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="end-time">Sale End Time</label>
                  <input
                    type="datetime-local"
                    id="end-time"
                    value={inputValue.endTime}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, endTime: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-bordered active">
                  {state.initData.btn} <i className="icon-login ml-2" />
                </button>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="contact-items mt-4 mt-md-0">
              {/* Single Card */}
              <div className="card no-hover staking-card">
                <div className="media">
                  <i className="icon text-effect icon-location-pin m-0" />
                  <div className="media-body ml-4">
                    <h4 className="m-0">{state.initData.title_1}</h4>
                    <p className="my-3">{state.initData.address}</p>
                    <a
                      className="notice"
                      href={state.initData.map_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {state.initData.map_heading}
                    </a>
                  </div>
                </div>
              </div>
              {/* Single Card */}
              <div className="card no-hover staking-card my-4">
                <div className="media">
                  <i className="icon text-effect icon-call-out m-0" />
                  <div className="media-body ml-4">
                    <h4 className="m-0">{state.initData.title_2}</h4>
                    <span className="d-inline-block mt-3 mb-1">
                      {state.initData.phone_1}
                    </span>
                    <span className="d-inline-block">
                      {state.initData.phone_2}
                    </span>
                  </div>
                </div>
              </div>
              {/* Single Card */}
              <div className="card no-hover staking-card">
                <div className="media">
                  <i className="icon text-effect icon-envelope-open m-0" />
                  <div className="media-body ml-4">
                    <h4 className="m-0">{state.initData.title_3}</h4>
                    <span className="d-inline-block mt-3 mb-1">
                      {state.initData.mail_1}
                    </span>
                    <span className="d-inline-block">
                      {state.initData.mail_2}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
