import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import WineryPresenter from "../components/Winery/WineryPresenter";
import { loadWeb3 } from "../contracts_connections/Contracts_Connections";

export interface IWineriesProps {}

const Wineries = () => {
  loadWeb3();
  const wineries = WineriesData;

  return (
    <>
      <Header />
        <WineryPresenter wineries={wineries} />
      <Footer />
    </>
  );
};

export default Wineries;


const WineriesData = [
    {
        title: 'Tenute Lunelli',
        bgImage: '/assets/lunelli_carapace.jpeg',
        logoImage: '/assets/tenute_lunelli_transparent.webp',
        description: 'Forte dell’esperienza enologica di tre generazioni, la famiglia Lunelli sceglie di coltivare fino in fondo la passione per l’eccellenza vitivinicola affiancando ai successi conseguiti con il Trentodoc Ferrari una collezione di vini fermi di alta qualità, espressione di tre cantine in altrettante regioni italiane: Tenuta Margon in Trentino, Tenuta Podernovo in Toscana e Tenuta Castelbuono in Umbria.',
        site: 'https://www.tenutelunelli.it/en/index.php'
    },
    {
        title: 'Marchesi Antinori',
        bgImage: '/assets/cantina_antinori.jpeg',
        logoImage: '/assets/Marchesi_Antinori_logo_transparent.webp',
        description: 'La Famiglia Antinori si dedica alla produzione vinicola da più di seicento anni: da quando, nel 1385, Giovanni di Piero Antinori entrò a far parte dell\' Arte Fiorentina dei Vinattieri. In tutta la sua lunga storia, attraverso 26 generazioni, la famiglia ha sempre gestito direttamente questa attività con scelte innovative e talvolta coraggiose ma sempre mantenendo inalterato il rispetto per le tradizioni e per il territorio.',
        site: 'https://www.antinori.it/it/vini/'
    },
    {
        title: 'Filodivino',
        bgImage: '/assets/cantina_filodivino.jpeg',
        logoImage: '/assets/filodivino_logo_transparent.png',
        description: 'Studiare la tradizione e la storia del territorio per proporne un’interpretazione originale e distintiva. Questa è l’essenza della nostra filosofia vinicola. Tutto ruota attorno al Verdicchio e alla Lacrima, coltivati con certificazione biologica e accogliendo i principi base della biodinamica. In cantina interveniamo il meno possibile per lasciare che ogni vitigno e ogni annata si esprimano nella forma più pura.',
        site: 'https://www.filodivino.it/'
    },
    {
        title: 'Frescobaldi',
        bgImage: '/assets/cantina_frescobaldi.jpeg',
        logoImage: '/assets/frescobaldi_logo_transparent.png',
        description: 'Frescobaldi incarna l’essenza della Toscana, la sua straordinaria vocazione per la viticoltura e la diversità dei suoi territori.​ L’unicità di Frescobaldi nasce proprio dalla rappresentazione di questa diversità dalle sue tenute e da vini che esprimono un caleidoscopio di aromi e sensazioni. Dietro ogni vino Frescobaldi si sente forte il cuore delle persone, agronomi ed enologi che vivono la vigna e il terroir per coglierne ogni dettaglio. La loro arte richiede la regola ferrea del rispetto. Il rispetto della nostra tradizione, che ci guida anche quando scegliamo soluzioni innovative. Il rispetto della Toscana, che consideriamo una terra vivente, da coltivare nell’equilibrio e nell’armonia. Il rispetto di ogni singolo terroir, che grazie a una combinazione unica di suoli, altitudini e microclimi, ci regala vini con una personalità propria e irripetibile.​',
        site: 'https://www.frescobaldi.com/it/'
    }
];
