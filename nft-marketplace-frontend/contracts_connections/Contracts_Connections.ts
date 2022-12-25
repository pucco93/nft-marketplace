import Web3 from 'web3';
import { store } from "../store/appStore";
import { connect } from "../store/slices/ConnectAccountSlice";
import useAlert from '../hooks/useAlert';
import { metamask_account } from '../Constants/Constants';
// import TimelessNFT from './abis/TimelessNFT.json';


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

export { connectWallet };