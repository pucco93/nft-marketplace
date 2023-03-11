import NFT from "../models/NFT";

// SessionStorage constants
export const metamask_account: string = 'vevino-metamask-account';
export const mailing_list: string = 'vevino-mailing-list';
export const disclaimer_shown: string = 'vevino-disclaimer-shown';

// Others

export const mockNFT: NFT = {
    id: 0,
    owner: '', 
    cost: '',
    name: '',
    author: '',
    isBuyable: true, // For future features
    description: '',
    image: '',
    metadataURI: '',
    timestamp: ''
};
