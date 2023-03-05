export const serverUrl = process.env.REACT_APP_SERVER_URI;

export async function setToken(address, network, name, symbol, decimals, initialSupply, initialPrice, startTime, endTime, tokenType, description, website, deployerAddress){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    network,
    address,
    name,
    symbol,
    decimals,
    initialSupply,
    initialPrice,
    startTime,
    endTime,
    tokenType,
    description,
    website,
    deployerAddress
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const result = await fetch(`${serverUrl}/setToken`, requestOptions).then(response => response.json());
  return result.code? result.message: 0;
}

export async function setNft(network, address, name, symbol, maxSupply, price, website, description, ipfs, startTime, endTime, deployerAddress){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    network,
    address, 
    name,
    symbol,
    maxSupply,
    price,
    website,
    description,
    ipfs,
    startTime,
    endTime,
    deployerAddress
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const result = await fetch(`${serverUrl}/setNft`, requestOptions).then(response => response.json());
  return result.code? result.message: 0;
}

export async function getAllERC20(){
  const result = await fetch(`${serverUrl}/getAllERC20`).then(response => response.json());
  return result.code? result.data: 0;
}

export async function getAllERC721(){
  const result = await fetch(`${serverUrl}/getAllERC721`).then(response => response.json());
  return result.code? result.data: 0;
}

export async function getToken(contractAddress, chainId){
  const result = await fetch(`${serverUrl}/getToken?contractAddress=${contractAddress}&chainId=${chainId}`).then(response => response.json());
  return result.code? result.data: 0;
}

export async function getNft(contractAddress, chainId){
  const result = await fetch(`${serverUrl}/getNft?contractAddress=${contractAddress}&chainId=${chainId}`).then(response => response.json());
  return result.code? result.data: 0;
}

export async function uploadProfilePicture(fileInput, signature, contractAddress, chainId){
  var formdata = new FormData();
  formdata.append("signature", signature);
  formdata.append("contractAddress", contractAddress);
  formdata.append("chainId", chainId);
  formdata.append("avatar", fileInput.files[0]);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const result = await fetch(`${serverUrl}/updateProfilePicture`, requestOptions)
    .then(response => response.json());
  return result.code? result.message: 0;
}
