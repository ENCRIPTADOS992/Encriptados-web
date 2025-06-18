// "use client";

// import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { Shield, Lock, Wifi, Key } from "lucide-react";

// const SecureFeatures = () => {
//   const t = useTranslations("SecurePage.features");

//   const features = [
//     {
//       icon: <Shield className="w-8 h-8 text-[rgba(63,211,255,1)]" />,
//       text: t("feature1"),
//       bg: "bg-gradient-to-r from-[rgba(63,211,255,1)] to-[rgba(168,235,255,1)] text-[rgba(27,27,27,1)]"
//     },
//     {
//       icon: <Lock className="w-8 h-8 text-white" />,
//       text: t("feature2"),
//       bg: "bg-[#1A1A1A] text-white"
//     },
//     {
//       icon: <Wifi className="w-8 h-8 text-[rgba(63,211,255,1)]" />,
//       text: t("feature3"),
//       bg: "bg-gradient-to-r from-[rgba(63,211,255,1)] to-[rgba(168,235,255,1)] text-[rgba(27,27,27,1)]"
//     },
//     {
//       icon: <Key className="w-8 h-8 text-white" />,
//       text: t("feature4"),
//       bg: "bg-[#1A1A1A] text-white"
//     }
//   ];

//   return (
//     <section className="bg-[#F7FAFC] pt-[40px] px-4 lg:px-20">
//       <div className="hidden lg:block max-w-7xl mx-auto grid grid-cols-3 gap-6">
//         {features.map((feature, index) => (
//           <div key={index} className={`rounded-2xl p-6 ${feature.bg} flex items-start gap-4 h-[180px]`}>
//             {feature.icon}
//             <p className="text-sm leading-tight">{feature.text}</p>
//           </div>
//         ))}
//       </div>

//       <div className="lg:hidden flex flex-col items-center text-center gap-4">
//         <div className="bg-gradient-to-r from-[rgba(63,211,255,1)] to-[rgba(168,235,255,1)] text-white font-bold text-sm px-6 py-2 rounded-full inline-block">
//           {t("mobileTitle")}
//         </div>
//         <ul className="flex flex-col gap-2 text-black text-sm">
//           <li>{t("mobileFeature1")}</li>
//           <li>{t("mobileFeature2")}</li>
//           <li>{t("mobileFeature3")}</li>
//           <li>{t("mobileFeature4")}</li>
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default SecureFeatures;