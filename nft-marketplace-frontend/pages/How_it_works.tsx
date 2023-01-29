import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export interface IHowItWorksProps {

}

// Pensavo di inserire qui una sorta di scroll view che ogni volta che scrolli si mouve avanti, pero magari in orizzontale con ogni volta un pallino di unítinerario non so bene come spiegare una sorta di o->o->o->o->o
// ogni o ê una istruzione su come bisogna fare determinate cose.
// REACT STEPPER implementarlo da soli

const HowItWorks = () => {

    return(
        <>
            <Header />

            <p style={{padding: '100px 0px 0px', display: 'flex', justifyContent: 'center'}}>This section is work in progess!</p>
            <p style={{padding: '0px 0px 100px 0px', display: 'flex', justifyContent: 'center'}}>Check it again in some days if the feature has been released!</p>
                
            <Footer />
        </>
    );
};

export default HowItWorks;