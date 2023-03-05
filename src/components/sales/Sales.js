import React, { useState } from "react";

function Tokenomics({ tokenData, explorer }) {
  const [data, setData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const numberOfPages = Number(parseFloat(tokenData.sales.length / 10).toFixed()) + 1;

  function incrementPage(selectedPage) {
    if (selectedPage < numberOfPages) {
      setSelectedPage(selectedPage + 1);
    }
  }

  function decrementPage(selectedPage) {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  }

  React.useEffect(() => {
    const newData = tokenData.sales.length? tokenData.sales.slice((selectedPage-1)*10, selectedPage*10): [];
    setData(newData);
  }, [selectedPage, tokenData])

  return (
    <section className="leaderboard-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table token-content table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Buyer</th>
                    <th scope="col">Eth Amount</th>
                    <th scope="col">Token Amount</th>
                    <th scope="col">Time</th>
                    <th scope="col">hash</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => {
                    return (
                      <tr key={`tokd_${idx}`}>
                        <td><a target="_blank" href={`${explorer}/address/${item.to}`}>{item.to.substring(0,5)}...</a></td>
                        <td>{(Number(item.ethAmount)/10**18).noExponents()}</td>
                        <td>{Number(Number(item.tokenAmount)/(10**tokenData.decimals)).noExponents()}</td>
                        <td>{new Date(item.timestamp*1000).toLocaleDateString()} {new Date(item.timestamp*1000).toLocaleTimeString()}</td>
                        <td><a target="_blank" href={`${explorer}/tx/${item.hash}`}>{item.hash.substring(0, 5)}...</a></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <nav>
              <ul className="page-numbers">
                <li>
                  <a
                    className="next page-numbers"
                    onClick={() => decrementPage(selectedPage)}
                    >
                    <i className="icon-arrow-left" />
                  </a>
                </li>
                <li>
                  <a
                    className={`page-numbers ${
                      selectedPage === 1 ? "current" : ""
                    }`}
                    href="#"
                    onClick={() => setSelectedPage(1)}
                  >
                    1
                  </a>
                </li>
                <li>
                  <span className="page-numbers dots">…</span>
                </li>
                <li>
                  <span aria-current="page" className="page-numbers current">
                    {selectedPage}
                  </span>
                </li>
                <li>
                  <span className="page-numbers dots">…</span>
                </li>
                <li>
                  <a className="page-numbers" onClick={() => setSelectedPage(numberOfPages)}>
                    {numberOfPages}
                  </a>
                </li>
                <li>
                  <a className="next page-numbers" onClick={() => incrementPage(selectedPage)}>
                    <i className="icon-arrow-right" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tokenomics;
