import React, { Component } from "react";
import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/gameon-json/cta";

export default function Cta() {
  const [state, setState] = React.useState({
    data: {},
  });
  React.useEffect(function () {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setState({
          data: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="cta-area p-0">
      <div className="container">
        <div className="row">
          <div className="col-12 card">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-5 text-center">
                <img src={state.data.img} alt="" />
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <h2 className="m-0">Kainet Launchpad</h2>
                <p>Create & Launch your own ERC20 tokens and ERC721 Collectibles with Kainet</p>
                <a
                  className="btn btn-bordered active d-inline-block"
                  href="/erc20/mintable"
                >
                  <i className={state.data.btnIcon} />
                  Apply
                </a>
              </div>
            </div>
            <a className="cta-link" href="/erc20/mintable" />
          </div>
        </div>
      </div>
    </section>
  );
}
