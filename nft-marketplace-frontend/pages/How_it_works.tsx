import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Onboarding from '../components/Onboarding/Onboarding';
import { loadWeb3 } from '../contracts_connections/Contracts_Connections';

export interface IHowItWorksProps {

}

// Pensavo di inserire qui una sorta di scroll view che ogni volta che scrolli si mouve avanti, pero magari in orizzontale con ogni volta un pallino di unítinerario non so bene come spiegare una sorta di o->o->o->o->o
// ogni o ê una istruzione su come bisogna fare determinate cose.
// REACT STEPPER implementarlo da soli

const HowItWorks = () => {
    loadWeb3();

    return(
        <>
            <Header isStepper />

            <Onboarding />
                
            <Footer isStepper />
        </>
    );
};

export default HowItWorks;