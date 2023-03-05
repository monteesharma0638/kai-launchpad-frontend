import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import LaunchpadDashboard from "../components/LauchpadDashboard/LauchpadDashboard";
import { getToken } from "../functions/fetchFunctions";
import { useParams } from "react-router-dom";
import ERC20Mintable from "./../contracts/ERC20Mintable.json";
import { useAccount, useContractReads } from "wagmi";

function LauchpadDashboardPage() {
  const { contractAddress, chainId } = useParams();
  const [tokenData, setTokenData] = useState(0);
  const { address } = useAccount();

  const contract = {
    address: contractAddress,
    abi: ERC20Mintable.abi,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "totalSupply",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "tokenPrice",
        chainId: Number(chainId),
      },
      {
        ...contract,
        functionName: "antibot",
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
        functionName: "owner",
        chainId: Number(chainId)
      },
      {
        ...contract,
        functionName: "decimals",
        chainId: Number(chainId)
      }
    ],
    watch: true
  });

  useEffect(() => {
    getToken(contractAddress, chainId).then((data) => {
      if (data.length) {
        setTokenData(data[0]);
      }
    });
  }, [contractAddress, chainId]);

  // console.log(tokenData, data);

  return (
    <div className="main">
      <Header />
      <Breadcrumb
        title={tokenData.name}
        subpage="ERC20 Launchpad"
        page={tokenData.name}
      />
      {
       data && data[5] !== address?
       (
        <h3>Please Connect with owner account</h3>
       ):
       (
        tokenData && data ? (
         <LaunchpadDashboard tokenData={tokenData} data={data} />
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
       ))
        }
      <Cta />
      <Footer />
      <ModalSearch />
      <ModalMenu />
    </div>
  );
}

export default LauchpadDashboardPage;
