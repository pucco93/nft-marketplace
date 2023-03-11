import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Onboarding.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/appStore";
import Step from "../../models/Step";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { winemakerChecker } from "../../utilities/Utilities";

export interface IOnboardingProps {}

const Onboarding = (props: IOnboardingProps) => {
  const [currentIndex, updateIndex] = useState<number>(0);
  const [isWinemaker, setWinemaker] = useState<boolean>(false);
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.value
  );

  const customerOnBoarding = [
    WelcomeStep(isWinemaker),
    BuyStep(),
    UpdatePriceStep(),
    PrivatePublicStep(),
  ];

  const wineMakerOnBoarding = [
    WelcomeStep(isWinemaker),
    MintStep(),
    MintMultipleStep(),
    UpdatePriceStep(),
    PrivatePublicStep(),
  ];

  const goBack = () => {
    if (currentIndex !== 0) {
      updateIndex((currentIndex) => (currentIndex -= 1));
      window.scroll(-Number(window.innerWidth), 0);
    }
  };

  const goAhead = () => {
    if (
      currentIndex <=
      (isWinemaker
        ? wineMakerOnBoarding.length - 1
        : customerOnBoarding.length - 1)
    ) {
      updateIndex((currentIndex) => (currentIndex += 1));
      window.scroll(Number(window.innerWidth), 0);
    }
  };

  useEffect(() => {
    setWinemaker(winemakerChecker(connectedAccount));
  }, [connectedAccount]);

  return (
    <section className={styles.onboardingSection}>
      <>
        {currentIndex !== 0 && (
          <div className={styles.backwardArrowContainer} onClick={goBack}>
            <div className={styles.backwardArrow}>
              <ChevronLeftIcon className={styles.backwardArrowIcon} />
            </div>
          </div>
        )}
        {isWinemaker
          ? wineMakerOnBoarding.map(
              (step, index) =>
                currentIndex === index && (
                  <PageComponent step={step} key={index} />
                )
            )
          : customerOnBoarding.map(
              (step, index) =>
                currentIndex === index && (
                  <PageComponent step={step} key={index} />
                )
            )}
        {currentIndex !== (isWinemaker ? 4 : 3) && (
          <div className={styles.forwardArrowContainer} onClick={goAhead}>
            <div className={styles.forwardArrow}>
              <ChevronRightIcon className={styles.forwardArrowIcon} />
            </div>
          </div>
        )}
      </>
    </section>
  );
};

export default Onboarding;

interface IPageComponentProps {
  step: Step;
}

const PageComponent = (props: IPageComponentProps) => {
  const { imagePath, imageAlt, title, steps, icon } = props.step;
  const [currentStepIndex, updateStepIndex] = useState<number>(0);

  const prevStep = () => {
    if (currentStepIndex > 0) {
      updateStepIndex((currentStepIndex) => (currentStepIndex -= 1));
    }
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      updateStepIndex((currentStepIndex) => (currentStepIndex += 1));
    }
  };

  return (
    <div className={styles.step}>
      <Image src={imagePath} alt={imageAlt} fill className={styles.bgImage} />
      <div className={styles.rightLayer}>
        <div className={styles.rightLayerInfos}>
          {icon ? (
            <div className={styles.titleContainer}>
              <div className={styles.iconTitle}>{icon}</div>
              <h2 className={styles.onboardingTitle}>{title}</h2>
            </div>
          ) : (
            <h2 className={styles.onboardingTitle}>{title}</h2>
          )}
          <p className={styles.onboardingParagraph}>
            {steps[currentStepIndex]}
          </p>
          <div className={styles.arrowContainer}>
            <div className={styles.prevStepContainer}>
              {currentStepIndex > 0 && steps?.length > 1 && (
                <IconButton
                  aria-label="left internal step arrow"
                  as={AiOutlineLeftCircle}
                  variant="link"
                  className={styles.prevStep}
                  onClick={prevStep}
                />
              )}
            </div>
            <div className={styles.nextStepContainer}>
              {currentStepIndex < steps.length - 1 && steps?.length > 1 && (
                <IconButton
                  aria-label="right internal step arrow"
                  as={AiOutlineRightCircle}
                  variant="link"
                  className={styles.nextStep}
                  onClick={nextStep}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeStep = (isWinemaker: boolean): Step => {
  return {
    imagePath: "/assets/wine_onboarding_1.png",
    imageAlt:
      "https://www.freepik.com/free-vector/happy-couple-producing-natural-wine-isolated-flat-illustration_13146326.htm#query=illustrations%20wine&position=3&from_view=search&track=ais",
    title: "Benvenuto sul tutorial di Vevino",
    steps: [
      `Segui il tutorial su questa pagina per imparare ${
        isWinemaker
          ? " creare la tua prima bottiglia di vino"
          : " comprare la tua bottiglia di vino e cambiarne il prezzo"
      }`,
      "Per poter effettuare le operazioni che si illustrano nei prossimi passi occorre avere un portafogli Metamask.",
    ],
    icon: undefined,
  };
};

const MintStep = (): Step => {
  return {
    imagePath: "/assets/wine_onboarding_2.png",
    imageAlt:
      "https://www.freepik.com/free-vector/tiny-cartoon-characters-with-vines-producing-natural-wine-male-female-persons-with-huge-organic-wine-bottle-barrel-flat-vector-illustration-alcohol-drinks-concept-banner-website-design_22344042.htm#query=illustrations%20wine&position=45&from_view=search&track=ais",
    title: "Scopri come creare la tua prima bottiglia",
    steps: [
      "Per iniziare a creare la tua bottiglia vai alla pagina La mia cantina",
      "Clicca sul pulsante Crea NFT e compila il form che si apre",
      "La bottiglia é stata creata ed é giá in vendita per i clienti",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="50px"
        height="50px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <path d="M737 5104 c-337 -61 -619 -325 -709 -664 l-23 -85 0 -1795 0 -1795 22 -82 c87 -325 327 -566 654 -655 l84 -23 1795 0 1795 0 85 23 c317 84 568 335 652 652 l23 85 0 1795 0 1795 -23 85 c-91 344 -373 605 -717 665 -126 22 -3516 21 -3638 -1z m3604 -318 c168 -36 326 -162 398 -318 22 -45 44 -110 50 -142 15 -84 15 -3448 0 -3532 -31 -172 -161 -339 -321 -413 -45 -22 -110 -44 -142 -50 -84 -15 -3448 -15 -3532 0 -172 31 -339 161 -413 321 -22 45 -44 110 -50 142 -8 41 -11 584 -11 1770 0 1429 3 1722 14 1777 36 167 162 325 318 399 46 21 106 43 133 48 30 6 728 10 1770 11 1440 0 1731 -2 1786 -13z" />
          <path d="M2480 3872 c-20 -11 -44 -37 -57 -62 l-23 -43 0 -524 0 -523 -523 0 -524 0 -43 -23 c-59 -31 -82 -76 -78 -147 5 -67 27 -102 84 -130 39 -19 59 -20 562 -20 l522 0 0 -522 c0 -503 1 -523 20 -562 31 -62 63 -81 140 -81 77 0 109 19 140 81 19 39 20 59 20 562 l0 522 522 0 c503 0 523 1 562 20 62 31 81 63 81 140 0 77 -19 109 -81 140 -39 19 -59 20 -562 20 l-522 0 0 522 c0 503 -1 523 -20 562 -28 57 -63 79 -130 84 -41 2 -64 -2 -90 -16z" />
        </g>
      </svg>
    ),
  };
};

const MintMultipleStep = (): Step => {
  return {
    imagePath: "/assets/wine_onboarding_3.png",
    imageAlt:
      "https://www.freepik.com/free-vector/friends-toasting-together-illustration_6525947.htm#query=illustrations%20wine&position=4&from_view=search&track=ais",
    title: "Scopri come creare piú bottiglie con un solo click",
    steps: [
      "Dalla pagina La mia collezione clicca sul pulsante Crea NFT e compila il form che si apre. Verrá generato un numero per ogni bottiglia creata che andrá da 001 al numero di bottiglie richieste fino ad un massimo di 200.",
      "Le bottiglie sono state create e giá in vendita per gli utenti.",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="50px"
        height="50px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <path d="M1544 4900 c-200 -30 -370 -167 -443 -359 -23 -61 -25 -83 -30 -276 l-6 -210 -210 -6 c-193 -5 -215 -7 -276 -30 -168 -64 -291 -198 -346 -374 -17 -57 -18 -131 -18 -1510 l0 -1450 22 -70 c59 -185 192 -319 378 -378 l70 -22 1450 0 c1379 0 1453 1 1510 18 176 55 306 174 372 343 25 65 27 81 32 279 l6 210 210 6 c198 5 214 7 279 32 167 66 290 200 343 372 17 57 18 135 18 1510 l0 1450 -22 70 c-58 183 -188 314 -373 378 l-65 22 -1425 1 c-784 1 -1448 -2 -1476 -6z m2866 -438 c20 -9 43 -32 53 -52 16 -33 17 -118 15 -1437 l-3 -1402 -30 -31 c-42 -44 -81 -51 -245 -48 l-145 3 -5 1060 c-4 851 -8 1068 -19 1100 -44 131 -153 267 -260 324 -135 72 -31 65 -1211 71 l-1065 5 -3 140 c-2 77 0 154 3 172 7 37 48 91 79 103 12 5 647 9 1411 9 1304 1 1392 0 1425 -17z m-847 -855 c15 -9 35 -29 44 -44 17 -26 18 -108 21 -1406 1 -894 -1 -1392 -8 -1416 -5 -20 -24 -50 -40 -66 l-31 -30 -1402 -3 c-1319 -2 -1404 -1 -1437 15 -20 10 -43 33 -53 53 -16 33 -17 118 -15 1437 l3 1401 25 27 c53 57 -30 55 1475 52 1310 -2 1392 -3 1418 -20z" />
          <path d="M2062 3189 c-46 -14 -118 -88 -131 -135 -7 -24 -11 -166 -11 -371 l0 -332 -347 -3 c-334 -3 -350 -4 -388 -25 -77 -41 -115 -105 -115 -193 0 -84 53 -161 132 -194 31 -13 93 -16 378 -16 l340 0 0 -340 c0 -371 2 -384 58 -443 48 -51 97 -70 168 -65 78 5 136 41 174 108 l25 45 3 348 3 347 331 0 c373 0 391 3 454 65 98 98 77 261 -44 332 l-47 28 -347 3 -347 3 -3 347 -3 347 -28 47 c-49 84 -160 126 -255 97z" />
        </g>
      </svg>
    ),
  };
};

const UpdatePriceStep = (): Step => {
  return {
    imagePath: "/assets/wine_onboarding_4.png",
    imageAlt:
      "https://www.freepik.com/free-vector/male-female-characters-producing-wine-holding-vine-sitting-barrel-having-alcohol-drink-cartoon-people-process-natural-winemaking-flat-vector-illustration-organic-wine-concept_21684130.htm#query=illustrations%20wine&position=0&from_view=search&track=ais",
    title: "Scopri come cambiare il prezzo ad una bottiglia",
    steps: [
      "Per cmabiare il prezzo alla tua prima bottiglia vai alla pagina La mia collezione",
      "Clicca sul pulsante 'Modifica bottiglia' sulla bottiglia che vuoi aggiornare",
      "Nel popup che si apre inserisci il nuovo prezzo e conferma",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="50px"
        height="50px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <path d="M2905 4940 c-49 -10 -116 -28 -147 -39 -86 -30 -225 -105 -298 -160 -36 -27 -545 -530 -1131 -1118 -1033 -1034 -1068 -1070 -1103 -1143 -54 -110 -73 -220 -58 -325 14 -93 41 -168 86 -237 50 -74 1593 -1620 1664 -1666 181 -117 421 -117 605 0 44 28 371 349 1128 1106 922 923 1074 1079 1124 1155 69 106 124 229 156 352 l24 90 0 785 0 785 -27 68 c-55 138 -151 245 -271 306 -125 62 -108 61 -922 60 -678 -1 -748 -2 -830 -19z m1592 -382 c22 -15 51 -44 64 -65 l24 -38 0 -720 c0 -718 0 -720 -23 -798 -28 -97 -66 -174 -125 -252 -25 -33 -508 -522 -1074 -1087 -724 -723 -1039 -1032 -1065 -1043 -46 -19 -108 -19 -151 -1 -39 16 -1577 1554 -1594 1594 -19 42 -16 118 6 160 28 54 2101 2121 2171 2165 92 58 186 91 310 111 14 2 338 3 721 2 l695 -1 41 -27z" />
          <path d="M3456 4165 c-254 -70 -435 -326 -413 -584 12 -134 71 -263 163 -355 219 -219 571 -220 789 -1 115 115 166 235 166 397 1 151 -48 273 -156 387 -72 76 -163 130 -261 156 -71 18 -220 18 -288 0z m219 -374 c125 -56 152 -209 54 -303 -57 -55 -146 -67 -215 -30 -31 16 -83 79 -90 108 -4 14 -4 49 -2 79 10 124 138 198 253 146z" />
        </g>
      </svg>
    ),
  };
};

const BuyStep = (): Step => {
  return {
    imagePath: "/assets/wine_onboarding_5.png",
    imageAlt:
      "https://www.freepik.com/free-vector/wine-vineyard_6147477.htm#query=illustrations%20wine&position=14&from_view=search&track=ais",
    title: "Scopri come comprare la tua prima bottiglia",
    steps: [
      "Per comprare la tua prima bottiglia vai alla pagina Marketplace",
      "Clicca sul pulsante 'Acquista' della bottiglia che si intende comprare",
      "Dal popup che si apre confermare di voler acquistare la bottiglia",
      "La bottiglia é stata acquistata ed é ora disponibile nella tua collezione",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="50px"
        height="50px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <path d="M95 4746 c-94 -42 -124 -169 -58 -247 45 -53 74 -59 265 -59 95 0 179 -4 187 -9 11 -7 72 -422 232 -1573 120 -859 223 -1581 229 -1603 27 -93 108 -183 206 -227 40 -18 72 -23 180 -26 l130 -4 -13 -51 c-74 -286 165 -587 467 -587 302 0 541 301 466 588 l-13 52 427 0 427 0 -13 -52 c-75 -287 164 -588 466 -588 301 0 541 301 467 587 l-14 52 203 3 c186 3 205 5 230 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -27 21 -31 21 -1661 26 -898 3 -1637 9 -1641 13 -8 8 -42 229 -43 279 l-1 28 1618 2 1617 3 57 27 c70 32 146 106 176 170 13 29 101 415 228 1005 174 812 205 967 201 1019 -9 127 -92 245 -212 301 l-60 28 -1992 3 c-1096 1 -1993 3 -1994 5 0 1 -11 70 -23 154 -15 99 -31 168 -47 200 -31 65 -107 139 -177 171 -56 26 -62 27 -272 30 -165 2 -222 -1 -245 -12z m4695 -881 c11 -13 -23 -182 -188 -952 -123 -575 -206 -939 -214 -944 -7 -5 -734 -9 -1614 -9 l-1602 0 -6 33 c-3 17 -62 437 -130 932 -69 495 -128 912 -130 928 l-5 27 1938 0 c1722 0 1940 -2 1951 -15z m-2807 -2879 c103 -43 128 -177 48 -257 -65 -65 -157 -65 -222 0 -124 123 13 325 174 257z m1760 0 c103 -43 128 -177 48 -257 -65 -65 -157 -65 -222 0 -124 123 13 325 174 257z" />
        </g>
      </svg>
    ),
  };
};

const PrivatePublicStep = (): Step => {
  return {
    imagePath: "/assets/wine_onboarding_6.png",
    imageAlt:
      "https://www.freepik.com/free-vector/friends-toasting-together-design_6543318.htm#page=4&query=wine%20flat&position=8&from_view=search&track=ais",
    title: "Scopri come bloccare la vendita/rimettere in vendita una bottiglia",
    steps: [
      "Per poter rendere pubblica/privata una bottiglia vai alla pagina La mia collezione",
      "Clicca sul pulsante Modifica bottiglia",
      "Dal popup che si apre seleziona 'rendi privato/metti in vendita' e conferma la scelta",
      "La bottiglia é ora privata e non piú in vendita/ é ora pubblica e tornata in vendita",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="50px"
        height="50px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#ffffff"
          stroke="none"
        >
          <path d="M2387 5105 c-348 -59 -643 -273 -793 -576 -104 -210 -114 -282 -114 -841 l0 -448 -207 0 c-144 0 -230 -5 -278 -15 -225 -47 -413 -235 -460 -460 -22 -104 -22 -2186 0 -2290 47 -225 235 -413 460 -460 105 -22 3025 -22 3130 0 225 47 413 235 460 460 12 59 15 238 15 1145 0 1193 2 1151 -66 1290 -51 103 -161 213 -264 264 -140 68 -96 66 -1302 66 l-1088 0 0 443 c0 349 3 457 15 512 39 188 177 362 355 448 209 102 409 102 619 0 78 -37 109 -59 177 -127 65 -66 90 -99 123 -168 61 -126 71 -186 71 -445 l0 -223 201 0 201 0 -4 268 c-5 249 -7 274 -32 367 -95 360 -368 645 -723 755 -155 48 -341 61 -496 35z m1719 -2297 c21 -15 50 -44 64 -65 l25 -37 0 -1086 0 -1086 -25 -37 c-14 -21 -43 -50 -64 -65 l-39 -27 -1507 0 -1507 0 -39 27 c-21 15 -50 44 -64 65 l-25 37 -3 1064 c-1 705 1 1076 8 1102 12 46 80 116 124 129 18 6 646 9 1522 8 l1491 -2 39 -27z" />
          <path d="M2461 2244 c-153 -41 -271 -198 -271 -360 0 -95 68 -233 140 -284 l29 -20 3 -253 3 -254 27 -40 c41 -63 90 -88 168 -88 84 0 137 33 175 108 25 50 25 54 25 288 l0 238 29 20 c73 52 141 189 141 285 0 165 -118 320 -275 361 -72 18 -123 18 -194 -1z" />
        </g>
      </svg>
    ),
  };
};
