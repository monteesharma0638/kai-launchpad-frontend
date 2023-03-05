export function getDayVolume(sales, days){
  const oneDay = 86400;
  const timestamp = (new Date().getTime()/1000) - (oneDay*days);
  let tokenVolume = 0, ethVolume = 0;
  sales.forEach(value => {
    if(value.timestamp > timestamp){
      tokenVolume += value.tokenAmount;
      ethVolume += value.ethAmount;
    }
  })
  return {
    tokenVolume,
    ethVolume
  };
}

export function getTotalVolume(sales){
  let tokenVolume = 0, ethVolume = 0;
  sales.forEach(value => {
    tokenVolume += value.tokenAmount;
    ethVolume += value.ethAmount;
  })
  return {
    tokenVolume,
    ethVolume
  }
}