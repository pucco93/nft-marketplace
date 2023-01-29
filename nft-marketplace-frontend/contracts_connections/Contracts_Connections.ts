import Web3 from 'web3';
import { store } from "../store/appStore";
import { connect } from "../store/slices/ConnectAccountSlice";
import { updateNFTs } from "../store/slices/NFTsSlice";
import { setTransactions } from '../store/slices/TransactionsSlice';
import { setContract } from '../store/slices/ContractSlice';
import useAlert from '../hooks/useAlert';
import { metamask_account } from '../constants/Constants';
import WineNFT from '../contracts/build/contracts/WineNFT.json';
import NFT from '../models/NFT';

const connectWallet = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) return alert('Please install Metamask');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        sessionStorage.setItem(metamask_account, accounts[0]);
        store.dispatch(connect(accounts[0]));
    } catch (error) {
        useAlert(JSON.stringify(error), 'red');
    }
};

const structuredNfts = (nfts: any): NFT[] => {
    return nfts
        .map((nft: any) => ({
            id: Number(nft.id),
            owner: nft.owner,
            cost: window.web3.utils.fromWei(nft.cost),
            title: nft.title,
            description: nft.description,
            metadataURI: nft.metadataURI,
            timestamp: nft.timestamp,
        }))
        .reverse();
};

const loadWeb3 = async () => {
    const { ethereum } = window;
    try {
        if (!ethereum) return alert('Please install Metamask')

        window.web3 = new Web3(ethereum);

        window.web3 = new Web3(window.web3.currentProvider);

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        store.dispatch(connect(accounts[0]));

        const networkId = await web3.eth.net.getId();
        const networkData = WineNFT.networks[networkId];

        if (networkData) {
            const contract = new web3.eth.Contract(
                WineNFT.abi,
                networkData.address
            );
            const nfts = await contract.methods.getAllNFTs().call();
            const transactions = await contract.methods.getAllTransactions().call();

            const mappedNFTs = structuredNfts(nfts);
            const mappedTransactions = structuredNfts(transactions);
            store.dispatch(updateNFTs(mappedNFTs));
            store.dispatch(setTransactions(mappedTransactions));
            debugger
            store.dispatch(setContract(contract));
        } else {
            window.alert('TimelessNFT contract not deployed to detected network.');
        }
    } catch (error) {
        console.log(error);
        //   alert('Please connect your metamask wallet!');
    }
}


const mintNFT = async (nft: NFT) => {
  let { title, description, metadataURI, cost } = nft;
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether');
      const contract = store.getState().contract;
      const account = store.getState().connectAccount;
      const mintPrice = window.web3.utils.toWei('0.01', 'ether');
  
      await contract.methods
        .payToMint(title, description, metadataURI, cost)
        .send({ from: account, value: mintPrice });
  
      return true
    } catch (error: any) {
      useAlert(error.message, 'red');
    }
  }
  
  const buyNFT = async ({ id, cost }: NFT) => {
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether');
      const contract = store.getState().contract;
      const buyer = store.getState().connectAccount;
  
      await contract.methods.payToBuy(Number(id)).send({ from: buyer, value: cost });
  
      return true
    } catch (error: any) {
      useAlert(error.message, 'red')
    }
  }
  
  const updateNFT = async ({ id, cost }: NFT) => {
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether');
      const contract = store.getState().contract;
      const buyer = store.getState().connectAccount;
  
      await contract.methods.changePrice(Number(id), cost).send({ from: buyer });
  
      return true
    } catch (error: any) {
      useAlert(error.message, 'red')
    }
  }

export { connectWallet, loadWeb3, mintNFT, buyNFT, updateNFT };