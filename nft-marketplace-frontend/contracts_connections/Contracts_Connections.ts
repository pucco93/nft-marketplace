import Web3 from 'web3';
import { store } from "../store/appStore";
import { connect } from "../store/slices/ConnectAccountSlice";
import { setNFTs } from "../store/slices/NFTsSlice";
import { setTransactions } from '../store/slices/TransactionsSlice';
import { setContract } from '../store/slices/ContractSlice';
import useAlert from '../hooks/useAlert';
import { metamask_account } from '../constants/Constants';
import WineNFT from '../contracts/build/contracts/WineNFT.json';
import NFT from '../models/NFT';
import { cancelLoading, setLoading } from '../store/slices/LoadingSlice';

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
      name: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
      year: Number(nft.year),
      isBuyable: nft.isBuyable || (nft.isBuyable === undefined && true)
    }))
    .reverse();
};

const loadWeb3 = async () => {
  store.dispatch(setLoading({show: true, msg: ''}));

  const { ethereum } = window;
  try {
    if (!ethereum) return alert('Please install Metamask')

    window.web3 = new Web3(ethereum);

    window.web3 = new Web3(window.web3.currentProvider);

    const web3 = window.web3;
    // const accounts = await web3.eth.getAccounts();
    // store.dispatch(connect(accounts[0]));

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
      store.dispatch(setNFTs(mappedNFTs));
      store.dispatch(setTransactions(mappedTransactions));
      store.dispatch(setContract(contract));
    }

    store.dispatch(cancelLoading());
  } catch (error) {
    console.log(error);
    store.dispatch(cancelLoading());
    //   alert('Please connect your metamask wallet!');
  }
};


const mintNFT = async (nft: any) => {
  const { name, description, properties } = nft.data;
  const metadataURI = nft.url;
  let cost = properties.price;
  let year = properties.year;
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether');
    const contract = store.getState().contract.value;
    const account = store.getState().connectAccount.value;
    const mintPrice = window.web3.utils.toWei('0.01', 'ether');

    await contract?.methods
      .payToMint(name, description, metadataURI, cost, year)
      .send({ from: account, value: mintPrice });

    store.dispatch(cancelLoading());

    useAlert(`La bottiglia ${name} creato!`, 'green');
    return true;
  } catch (error: any) {
    useAlert(error.message, 'red');
    store.dispatch(cancelLoading());
  }
};

const buyNFT = async ({ id, cost }: NFT) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether');
    const contract = store.getState().contract.value;
    const buyer = store.getState().connectAccount.value;

    await contract?.methods.payToBuy(Number(id)).send({ from: buyer, value: cost });

    store.dispatch(cancelLoading());

    useAlert(`La bottiglia é stata acquistata!`, 'green');
    return true;
  } catch (error: any) {
    useAlert(error.message, 'red');
    store.dispatch(cancelLoading());
  }
};

const updateNFT = async ({ id, cost }: NFT) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether');
    const contract = store.getState().contract.value;
    const buyer = store.getState().connectAccount.value;

    await contract?.methods.changePrice(Number(id), cost).send({ from: buyer });

    store.dispatch(cancelLoading());

    useAlert(`Il prezzo é stato aggiornato!`, 'green');
    return true;
  } catch (error: any) {
    useAlert(error.message, 'red');
    store.dispatch(cancelLoading());
  }
};

const updateNFTPrivacy = async ({ id, isBuyable }: NFT) => {
  try {
    const contract = store.getState().contract.value;
    const buyer = store.getState().connectAccount.value;

    await contract?.methods.changePrivacy(Number(id), isBuyable).send({ from: buyer });

    store.dispatch(cancelLoading());

    useAlert(`Bottiglia ora ${isBuyable ? 'pubblica' : 'privata'}!`, 'green');
    return true;
  } catch (error: any) {
    useAlert(error.message, 'red');
    store.dispatch(cancelLoading());
  }
};

const getNFTs = async () => {
  try {
    const contract = store.getState().contract.value;
    const nfts = await contract?.methods.getAllNFTs().call();
    const mappedNFTs = structuredNfts(nfts);
    store.dispatch(setNFTs(mappedNFTs));
  } catch (error: any) {
    useAlert(error.message, 'red');
    store.dispatch(cancelLoading());
  }
  return;
};

export { connectWallet, loadWeb3, mintNFT, buyNFT, updateNFT, updateNFTPrivacy, getNFTs };