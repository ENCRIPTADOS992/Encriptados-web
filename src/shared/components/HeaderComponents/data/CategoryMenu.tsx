import { useTranslations } from "next-intl";

// Hook para obtener categorías de productos traducidas
export function useTranslatedProductsCategories(): any {
  const t = useTranslations("productsCategories");
  

  return [
    {
      title: t("sims.title", { defaultValue: "SIMS" }),
      description: t("sims.description", {
        defaultValue: "Conoce nuestras eSIM/SIM",
      }),
      link: "/sim-encriptada",
      image: "/images/mega-menu/virtual-sim.jpeg",
      items: [
        {
          title: t("sims.items.encryptedSim.title", {
            defaultValue: "SIM Encriptada",
          }),
          link: "/sim-encriptada",
          image: "/images/mega-menu/virtual-sim.jpeg",
          description: t("sims.items.encryptedSim.description", {
            defaultValue: "Conoce cómo funciona la SIM Encriptada",
          }),
        },
        // {
        //   title: t("sims.items.iraSim.title", { defaultValue: "SIM IRA" }),
        //   link: "/ira-sim",
        //   image:
        //     "/images/mega-menu/sims/ira_sim_encriptados_preview_menu_web.jpg",
        //   description: t("sims.items.iraSim.description", {
        //     defaultValue: "Conoce cómo funciona la SIM IRA",
        //   }),
        // },
        {
          title: t("sims.items.timSim.title", { defaultValue: "SIM TIM" }),
          link: "/tim-sim",
          image:
            "/images/mega-menu/sims/tim_sim_encriptados_preview_menu_web.jpg",
          description: t("sims.items.timSim.description", {
            defaultValue: "Conoce cómo funciona la SIM TIM",
          }),
        }   
      ],
    },
    {
      title: t("apps.title", { defaultValue: "Aplicaciones" }),
      description: t("apps.description", {
        defaultValue:
          "Productos increíbles, aplicaciones y sistemas con encriptación de inicio a fin",
      }),
      link:"",
      image: "/images/mega-menu/aplicaciones.jpeg",
      items: [
        {
          title: t("apps.items.silentPhone.title", { defaultValue: "Silent phone" }),
          image: "/images/mega-menu/apps/Silent-Circle_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/silent-circle",
          description: t("apps.items.silentPhone.description", {
            defaultValue: "Silent phone es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.vaultChat.title", { defaultValue: "VaultChat" }),
          image: "/images/mega-menu/apps/VaultChat_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/vault-chat",
          description: t("apps.items.vaultChat.description", {
            defaultValue: "VaultChat es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.armadillo.title", { defaultValue: "Armadillo" }),
          image: "/images/mega-menu/apps/Armadillo_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/armadillo",
          description: t("apps.items.armadillo.description", {
            defaultValue: "Armadillo es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.threema.title", { defaultValue: "Threema" }),
          image: "/images/mega-menu/apps/Threema_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/threema",
          description: t("apps.items.threema.description", {
            defaultValue: "Threema es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.threemaWork.title", {
            defaultValue: "Threema Work",
          }),
          image: "/images/mega-menu/apps/Threema-Work_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/threema-work",
          description: t("apps.items.threemaWork.description", {
            defaultValue: "Threema Work es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.vnclagoon.title", { defaultValue: "VncLagoon" }),
          image: "/images/mega-menu/apps/VNC-lagoon_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/vnc-lagoon",
          description: t("apps.items.vnclagoon.description", {
            defaultValue: "VncLagoon es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.salt.title", { defaultValue: "Salt" }),
          image: "/images/mega-menu/apps/Salt_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/salt",
          description: t("apps.items.salt.description", {
            defaultValue: "Salt es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("apps.items.nordVpn.title", { defaultValue: "NordVPN" }),
          image: "/images/mega-menu/apps/NordVPN_Apps_Encriptados_preview_menu_web.jpg",
          link: "/apps/nord-vpn",
          description: t("apps.items.nordVpn.description", {
            defaultValue: "NordVPN es una aplicación de mensajería segura.",
          }),
        },
      ],
    },
    {
      title: t("systems.title", { defaultValue: "Sistemas" }),
      description: t("systems.description", {
        defaultValue: "Sistemas de encriptación de datos",
      }),
      link: "",
      image: "/images/mega-menu/sistemas.png",
      items: [
        {
          title: t("systems.items.secureMdmIphone.title", {
            defaultValue: "Secure MDM iPhone",
          }),
          image:
            "/images/mega-menu/sistemas/SecureMDM-IOS_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/secure-mdm-iphone",
          description: t("systems.items.secureMdmIphone.description", {
            defaultValue:
              "Secure MDM iPhone es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.secureMdmAndroid.title", {
            defaultValue: "Secure MDM Android",
          }),
          image:
            "/images/mega-menu/sistemas/SecureMDM-android_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/secure-mdm-android",
          description: t("systems.items.secureMdmAndroid.description", {
            defaultValue:
              "Secure MDM Android es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.cryptcom.title", {
            defaultValue: "Cryptcom",
          }),
          image:
            "/images/mega-menu/sistemas/Cryptcom_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/cryptcom",
          description: t("systems.items.cryptcom.description", {
            defaultValue: "Cryptcom es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.renati.title", { defaultValue: "Renati" }),
          image:
            "/images/mega-menu/sistemas/Renati_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/renati",
          description: t("systems.items.renati.description", {
            defaultValue: "Renati es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.chatMail.title", {
            defaultValue: "ChatMail",
          }),
          image:
            "/images/mega-menu/sistemas/ChatMail_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/chat-mail",
          description: t("systems.items.chatMail.description", {
            defaultValue: "ChatMail es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.armadillo.title", {
            defaultValue: "Armadillo",
          }),
          image:
            "/images/mega-menu/sistemas/armadillo_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/armadillo-v2",
          description: t("systems.items.armadillo.description", {
            defaultValue: "Armadillo es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.vaultChat.title", {
            defaultValue: "VaultChat",
          }),
          image:
            "/images/mega-menu/sistemas/VaultChat_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/vault-chat-v2",
          description: t("systems.items.vaultChat.description", {
            defaultValue: "VaultChat es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.ultraX.title", { defaultValue: "Ultra X" }),
          image:
            "/images/mega-menu/sistemas/UltraX_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/ultrax",
          description: t("systems.items.ultraX.description", {
            defaultValue: "Ultra X es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.intactPhone.title", {
            defaultValue: "Intact Phone",
          }),
          image:
            "/images/mega-menu/sistemas/IntacPhone_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/intact-phone",
          description: t("systems.items.intactPhone.description", {
            defaultValue:
              "Intact Phone es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.decSecure.title", {
            defaultValue: "DEC Secure",
          }),
          image:
            "/images/mega-menu/sistemas/DEC-Secure_Sistemas_Encriptados_preview_menu_web.jpg",
          link: "/apps/dec-secure",
          description: t("systems.items.decSecure.description", {
            defaultValue: "DEC Secure es una aplicación de mensajería segura.",
          }),
        },
        {
          title: t("systems.items.secureCrypt.title", {
            defaultValue: "SecureCrypt",
          }),
          image:
            "/images/mega-menu/sistemas/SecureCrypt.jpg",
          link: "/apps/secureCrypt",
          description: t("systems.items.secureCrypt.description", {
            defaultValue: "SecureCrypt es una aplicación de mensajería segura.",
          }),
        },
        // {
        //   title: t("systems.items.totalSec.title", {
        //     defaultValue: "Total Sec",
        //   }),
        //   image:
        //     "/images/mega-menu/sistemas/TotalSec_Sistemas_Encriptados_preview_menu_web.jpg",
        //   link: "/system8",
        //   description: t("systems.items.totalSec.description", {
        //     defaultValue: "Total Sec es una aplicación de mensajería segura.",
        //   }),
        // },
        // {
        //   title: t("systems.items.t2Communicator.title", {
        //     defaultValue: "T2 Communicator",
        //   }),
        //   image:
        //     "/images/mega-menu/sistemas/T2Comunnicator_Sistemas_Encriptados_preview_menu_web.jpg",
        //   link: "/apps/t2-communicator",
        //   description: t("systems.items.t2Communicator.description", {
        //     defaultValue:
        //       "T2 Communicator es una aplicación de mensajería segura.",
        //   }),
        // },
      ],
    },
    {
      title: t("router.title", { defaultValue: "Router" }),
      description: t("router.description", {
        defaultValue: "Router de encriptación",
      }),
      link: "",
      image: "/images/mega-menu/camaleon_reuter.png",
      items: [
        {
          title: t("router.items.routerCamaleon.title", {
            defaultValue: "Router Camaleon",
          }),
          image:
            "",
          link: "/router",
          description: t("router.items.routerCamaleon.description", {
            defaultValue:
              "",
          }),
        },
      ]
    },
  ];
}

// Hook para obtener otras categorías traducidas
export function useTranslatedOthersCategories(): any[] {
  const t2 = useTranslations("othersCategories");

  return [
    {
      title: t2("distributors.title", { defaultValue: "Distribuidores" }),
      description: t2("distributors.description", {
        defaultValue: "Conviértete en distribuidor de nuestros productos",
      }),
      image: "/images/mega-menu/distribuidores.jpeg",
      link: "/distributors",
      items: [],
    },
    {
      title: t2("blog.title", { defaultValue: "Blog" }),
      description: t2("blog.description", {
        defaultValue: "Últimas noticias y actualizaciones",
      }),
      link: "/blog",
      image: "/images/mega-menu/blog.jpeg",
      items: [],
    },
    {
      title: t2("securityTest.title", { defaultValue: "Test de seguridad" }),
      description: t2("securityTest.description", {
        defaultValue: "¿Qué tan seguro son tus dispositivos?",
      }),
      link: "/encrypted-test",
      image: "/images/mega-menu/seguridad.jpeg",
      items: [],
    },
    {
      title: t2("offers.title", { defaultValue: "Ofertas" }),
      description: t2("offers.description", {
        defaultValue: "Descubre nuestras ofertas",
      }),
      link: "/offers",
      image: "/images/mega-menu/ofertas.jpeg",
      items: [],
    },
  ];
}

export function useTranslatedUsCategories(): any[] {
  const t2 = useTranslations("usCategories");

  return [
    {
      title: t2("aboutUs.title", { defaultValue: "Nosotros" }),
      description: t2("aboutUs.description", {
        defaultValue: "Conoce más sobre nuestra misión y valores.",
      }),
      image: "/images/mega-menu/nosotros.png",
      link: "/nosotros",
      items: [],
    },
    {
      title: t2("ambassadors.title", { defaultValue: "Embajadores" }),
      description: t2("ambassadors.description", {
        defaultValue: "Únete a nuestro programa de embajadores.",
      }),
      image: "/images/mega-menu/embajador.png",
      link: "/ambassadors",
      items: [],
    },    
    {
      title: t2("locations.title", { defaultValue: "Donde Estamos" }),
      description: t2("locations.description", {
        defaultValue: "Descubre nuestras ubicaciones en todo el mundo.",
      }),
      image: "/images/mega-menu/dondeEstamos.png",
      link: "/where-to-find-us",
      items: [],
    },
  ];
}
