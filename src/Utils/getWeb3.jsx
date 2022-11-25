import Web3 from "web3";


const getWeb3= () =>
  new Promise((resolve, reject) => {
    
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
        
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
       else if (window.web3) {
         const web3 = window.web3;
        resolve(web3);
      }
       else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        alert("Metamask extension not detected");
        resolve(web3);
      }
   });



export default getWeb3;
