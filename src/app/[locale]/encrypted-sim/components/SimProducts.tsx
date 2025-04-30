import CardDescription from "./CardDescription";
import CardSim from "./CardSim";
import LogoSvg1 from "/public/images/encrypted-sim/icons/encriptados_logo.svg";
// import CharacteristicDatasSvg from "/public/images/encrypted-sim/icons/characteristic-data.svg";
// import CharacteristicSpeedSvg from "/public/images/encrypted-sim/icons/characteristic-speed.svg";
// import CharacteristicAppSvg from "/public/images/encrypted-sim/icons/characteristic-app.svg";
// import CharacteristicAnonimitySvg from "/public/images/encrypted-sim/icons/characteristic-anonymity.svg";
// import CharacteristicReplaceSvg from "/public/images/encrypted-sim/icons/characteristic-replace.svg";
// import CharacteristicVoiceSvg from "/public/images/encrypted-sim/icons/characteristic-voice.svg";
// import CharacteristicComunicationsSvg from "/public/images/encrypted-sim/icons/characteristic-communications.svg";
// import CharacteristicTopUpSvg from "/public/images/encrypted-sim/icons/characteristic-top-up.svg";
// import EncryptedSimData from "/public/images/encrypted-sim/Encrypted_sim_card.png";
// import EncryptedSimImsi from "/public/images/encrypted-sim/Encrypted_sim_card_IMSI.png";
// import EncryptedSimMinutes from "/public/images/encrypted-sim/Encrypted_sim_card_minutes.png";
// import EncriptedEsim from "/public/images/encrypted-sim/Encrypted_sim_card_eSIM.png";
// import IcomImsiSvg from "/public/images/encrypted-sim/icons/icon-imsi.svg";
// import IcomMinutesSvg from "/public/images/encrypted-sim/icons/icon-minutes.svg";
// import IconDataSvg from "/public/images/encrypted-sim/icons/icon-data.svg";
// import IcomSimSvg from "/public/images/encrypted-sim/icons/icon-sim.svg";
// import { useTranslations } from "next-intl";
import { useGetProducts } from "@/features/products/queries/useGetProducts";

const SimProductsPage: React.FC = () => {
  const { data } = useGetProducts("sim");

  console.log(data?.data);

  // const commonFeatures = [
  //   {
  //     icon: CharacteristicDatasSvg,
  //     alt: t("commonFeatures.dataMobile"),
  //     description: t("commonFeatures.dataMobile"),
  //   },
  //   {
  //     icon: CharacteristicSpeedSvg,
  //     alt: t("commonFeatures.speed"),
  //     description: t("commonFeatures.speed"),
  //   },
  //   {
  //     icon: CharacteristicAppSvg,
  //     alt: t("commonFeatures.appAvailable"),
  //     description: t("commonFeatures.appAvailable"),
  //   },
  // ];

  // const cardData = [
  //   {
  //     logoSrc: LogoSvg1,
  //     title: t("products.data.title"),
  //     description: t("products.data.description"),
  //     features: commonFeatures,
  //     productImage: EncryptedSimData,
  //     featuresCardSim: [
  //       t("products.data.featuresCardSim.0"),
  //       t("products.data.featuresCardSim.1"),
  //       t("products.data.featuresCardSim.2"),
  //       t("products.data.featuresCardSim.3"),
  //     ],
  //     priceRange: t("products.data.priceRange"),
  //     headerIcon: IconDataSvg,
  //     headerTitle: t("products.data.headerTitle"),
  //   },
  //   {
  //     logoSrc: LogoSvg1,
  //     title: t("products.minutes.title"),
  //     description: t("products.minutes.description"),
  //     features: [
  //       {
  //         icon: CharacteristicAnonimitySvg,
  //         alt: t("commonFeatures.privacyAnonymity"),
  //         description: t("commonFeatures.privacyAnonymity"),
  //       },
  //       {
  //         icon: CharacteristicReplaceSvg,
  //         alt: t("commonFeatures.substituteNumber"),
  //         description: t("commonFeatures.substituteNumber"),
  //       },
  //       {
  //         icon: CharacteristicVoiceSvg,
  //         alt: t("commonFeatures.callback"),
  //         description: t("commonFeatures.callback"),
  //       },
  //       {
  //         icon: CharacteristicVoiceSvg,
  //         alt: t("commonFeatures.voiceFilters"),
  //         description: t("commonFeatures.voiceFilters"),
  //       },
  //       {
  //         icon: CharacteristicAppSvg,
  //         alt: t("commonFeatures.appAvailable"),
  //         description: t("commonFeatures.appAvailable"),
  //       },
  //     ],
  //     productImage: EncryptedSimMinutes,
  //     featuresCardSim: [
  //       t("products.minutes.featuresCardSim.0"),
  //       t("products.minutes.featuresCardSim.1"),
  //       t("products.minutes.featuresCardSim.2"),
  //       t("products.minutes.featuresCardSim.3"),
  //       t("products.minutes.featuresCardSim.4"),
  //     ],
  //     priceRange: t("products.minutes.priceRange"),
  //     headerIcon: IcomMinutesSvg,
  //     headerTitle: t("products.minutes.headerTitle"),
  //   },
  //   {
  //     logoSrc: LogoSvg1,
  //     title: t("products.imsi.title"),
  //     description: t("products.imsi.description"),
  //     features: [
  //       {
  //         icon: CharacteristicAnonimitySvg,
  //         alt: t("commonFeatures.privacyAnonymity"),
  //         description: t("commonFeatures.privacyAnonymity"),
  //       },
  //       {
  //         icon: CharacteristicComunicationsSvg,
  //         alt: t("commonFeatures.encryptedCommunications"),
  //         description: t("commonFeatures.encryptedCommunications"),
  //       },
  //       {
  //         icon: CharacteristicReplaceSvg,
  //         alt: t("commonFeatures.replaceIMSI"),
  //         description: t("commonFeatures.replaceIMSI"),
  //       },
  //       {
  //         icon: CharacteristicAppSvg,
  //         alt: t("commonFeatures.appAvailable"),
  //         description: t("commonFeatures.appAvailable"),
  //       },
  //     ],
  //     productImage: EncryptedSimImsi,
  //     featuresCardSim: [
  //       t("products.imsi.featuresCardSim.0"),
  //       t("products.imsi.featuresCardSim.1"),
  //       t("products.imsi.featuresCardSim.2"),
  //       t("products.imsi.featuresCardSim.3"),
  //     ],
  //     priceRange: t("products.imsi.priceRange"),
  //     headerIcon: IcomImsiSvg,
  //     headerTitle: t("products.imsi.headerTitle"),
  //   },
  //   {
  //     logoSrc: LogoSvg1,
  //     title: t("products.esim.title"),
  //     description: t("products.esim.description"),
  //     features: [
  //       {
  //         icon: CharacteristicAnonimitySvg,
  //         alt: t("commonFeatures.privacyAnonymity"),
  //         description: t("commonFeatures.privacyAnonymity"),
  //       },
  //       {
  //         icon: CharacteristicTopUpSvg,
  //         alt: t("commonFeatures.unlimitedDataPlans"),
  //         description: t("commonFeatures.unlimitedDataPlans"),
  //       },
  //       {
  //         icon: CharacteristicComunicationsSvg,
  //         alt: t("commonFeatures.encryptedCommunications"),
  //         description: t("commonFeatures.encryptedCommunications"),
  //       },
  //       {
  //         icon: CharacteristicAppSvg,
  //         alt: t("commonFeatures.appAvailable"),
  //         description: t("commonFeatures.appAvailable"),
  //       },
  //     ],
  //     productImage: EncriptedEsim,
  //     featuresCardSim: [
  //       t("products.esim.featuresCardSim.0"),
  //       t("products.esim.featuresCardSim.1"),
  //       t("products.esim.featuresCardSim.2"),
  //       t("products.esim.featuresCardSim.3"),
  //     ],
  //     priceRange: t("products.esim.priceRange"),
  //     headerIcon: IcomSimSvg,
  //     headerTitle: t("products.esim.headerTitle"),
  //   },
  //   {
  //     logoSrc: LogoSvg1,
  //     title: t("products.sim.title"),
  //     description: t("products.sim.description"),
  //     features: [
  //       {
  //         icon: CharacteristicAnonimitySvg,
  //         alt: t("commonFeatures.unlimitedDataPlans"),
  //         description: t("commonFeatures.unlimitedDataPlans"),
  //       },
  //       {
  //         icon: CharacteristicTopUpSvg,
  //         alt: t("commonFeatures.ultraFastConnection"),
  //         description: t("commonFeatures.ultraFastConnection"),
  //       },
  //       {
  //         icon: CharacteristicComunicationsSvg,
  //         alt: t("commonFeatures.easyToUseApp"),
  //         description: t("commonFeatures.easyToUseApp"),
  //       },
  //       {
  //         icon: CharacteristicReplaceSvg,
  //         alt: t("commonFeatures.easyToUseApp"),
  //         description: t("commonFeatures.easyToUseApp"),
  //       },
  //       {
  //         icon: CharacteristicAppSvg,
  //         alt: t("commonFeatures.easyToUseApp"),
  //         description: t("commonFeatures.easyToUseApp"),
  //       },
  //     ],
  //     productImage: EncryptedSimImsi,
  //     featuresCardSim: [
  //       t("products.sim.featuresCardSim.0"),
  //       t("products.sim.featuresCardSim.1"),
  //       t("products.sim.featuresCardSim.2"),
  //       t("products.sim.featuresCardSim.3"),
  //     ],
  //     priceRange: t("products.sim.priceRange"),
  //     headerIcon: IcomImsiSvg,
  //     headerTitle: t("products.sim.headerTitle"),
  //   },
  // ];

  return (
    <div className="flex flex-col gap-5">
      {data?.data.map((card, index) => (
        <div
          key={index}
          className="
            bg-custom-linear 
            sm:!bg-transparent 
            shadow-lg 
            sm:shadow-none 
            gap-6 
            flex flex-col 
            sm:flex-row                       
            my-0 
            rounded-3xl 
            sm:p-0
            ls:p-0
            p-4
            py-10
            sm:py-0
            ls:py-0
          "
        >
          <CardDescription
            logoSrc={LogoSvg1}
            title={card?.title}
            description={card?.description}
            features={card?.features}
          />
          <CardSim
            productImage={card?.image}
            advantages={card.advantages}
            priceRange={card.price}
            headerIcon={""}
            headerTitle={card.title}
          />
        </div>
      ))}
    </div>
  );
};
export default SimProductsPage;
