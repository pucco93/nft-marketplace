import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export interface IWineriesProps {

}

const Wineries = () => {

    return(
        <>
            <Header />

            <p style={{padding: '100px 0px 0px', display: 'flex', justifyContent: 'center'}}>This section is work in progess!</p>
            <p style={{padding: '0px 0px 100px 0px', display: 'flex', justifyContent: 'center'}}>Check it again in some days if the feature has been released!</p>

            <Footer />
        </>
    );
};

export default Wineries;