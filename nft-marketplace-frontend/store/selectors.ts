import NFT from "../models/NFT";
import Filters from "../models/Filters";
import { RootState } from "./appStore";

export const getMyCollection = (state: RootState) => {
    return state.nfts.value?.filter(item => item?.owner.toLowerCase() === state.connectAccount.value.toLowerCase());
};

export const getCollection = (state: RootState) => {
    const filters = state.filters.value;
    if(filters) return sortNFTs(filters, filterNFTs(filters, state.nfts.value));
    return state.nfts.value.filter(item => item.owner.toLowerCase() !== state.connectAccount.value.toLowerCase());
};

export const getConnectedAccount = (state: RootState) => state.connectAccount.value;

export const getCount = (state: RootState) => state.filters.value.count;

export const getSortField = (state: RootState) => state.filters.value.sortField;

export const getSortOrder = (state: RootState) => state.filters.value.sortOrder;

export const getFilters = (state: RootState) => state.filters.value;

export const getPrices = (state: RootState) => {
    return {
        bottomPrice: state.filters.value.bottomPrice,
        upperPrice: state.filters.value.topPrice
    };
};

export const getYear = (state: RootState) => {
    return state.filters.value.year;
};

export const sortAsc = (first: string | number, second: string | number) => {
    return (first > second) ? 1 : ((first < second) ? -1 : 0);
};

export const sortDesc = (first: string | number, second: string | number) => {
    return (first > second) ? -1 : ((first < second) ? 1 : 0);
};

export const sortNFTs = (filters: Filters, nfts: NFT[]) => {
    if(!filters.sortField && !filters.sortOrder) return nfts;
    return nfts.sort((firstNFT: NFT, secondNFT: NFT) => {
        const { name: nameFirst, year: yearFirst, cost: costFirst } = firstNFT;
        const { name: nameSecond, year: yearSecond, cost: costSecond } = secondNFT;
        return filters.sortOrder === 'asc' || filters.sortOrder === 'a-z' ? sortAsc(nameFirst, nameSecond) : sortDesc(nameFirst, nameSecond);
    })
};

export const filterNFTs = (filters: Filters, nfts: NFT[]) => {
    return nfts.filter((nft: NFT) => {
        if(filters.bottomPrice && Number(nft.cost) < filters.bottomPrice)  return false;
        if(filters.topPrice && Number(nft.cost) > filters.topPrice) return false;
        if(filters.year && Number(nft.year) === filters.year) return false;
        if(filters.winery && nft.author) return false;
        return true;
    });
};