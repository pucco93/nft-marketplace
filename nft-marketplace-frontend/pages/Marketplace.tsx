import styles from '../styles/Marketplace.module.css'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export interface IMarketplaceProps {

}

const Marketplace = (props: IMarketplaceProps) => {

    return(
        <>
            <Header />

            <Footer />
        </>
    );
};

export default Marketplace;