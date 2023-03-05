import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Project from "../components/clientERC20/ERC20Client";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import { useParams } from "react-router-dom";
import { useContractReads } from "wagmi";
import ERC20Mintable from "./../contracts/ERC20Mintable.json";

function ClientERC20() {
  const { contractAddress, chainId } = useParams();

  const contract = {
    address: contractAddress,
    abi: ERC20Mintable.abi,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "name",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "symbol",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "tokenPrice",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "decimals",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "startTime",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "endTime",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "totalSupply",
        chainId: Number(chainId),
      },
    ],
  });

  return (
    <div className="main">
      <Header />
      {data && data.length ? (
        <>
          <Breadcrumb title={data[0]} subpage="ERC20" page={data[0]} />
          <Project data={data} />
        </>
      ) : (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "100%" }}
          ></div>
        </div>
      )}
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default ClientERC20;
