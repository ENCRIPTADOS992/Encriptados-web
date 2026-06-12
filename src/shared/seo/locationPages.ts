import type { SeoLocale } from "./constants";

export type LocationProductType = "app" | "sim" | "phone" | "generic";

export type LocationPageModel = {
  locale: SeoLocale;
  slugSegments: string[];
  legacyPath: string;
  legacySlug: string;
  locationSlug: string;
  locationName: string;
  productType: LocationProductType;
  productName: string;
  productDescription: string;
  productPath: string;
  productImage: string;
  canonicalPath: string;
  indexable: boolean;
};

type LocationPattern = {
  legacyPrefix: string;
  productType: LocationProductType;
  productName: string;
  productDescription: string;
  productSlug?: string;
  productPathByLocale?: Partial<Record<SeoLocale, string>>;
  productImage: string;
};

const LOCALES = new Set<SeoLocale>(["es", "en", "fr", "it", "pt"]);
const HOME_PATHS: Record<SeoLocale, string> = {
  es: "/",
  en: "/en",
  fr: "/fr",
  it: "/it",
  pt: "/pt",
};

const APP_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "securecrypt-app",
    productType: "app",
    productName: "SecureCrypt",
    productDescription: "secure communication software for teams and private users",
    productSlug: "securecrypt",
    productImage: "/images/apps/secureCrypt/banner.png",
  },
  {
    legacyPrefix: "silent-circle-app",
    productType: "app",
    productName: "Silent Phone",
    productDescription: "private encrypted calls and secure messaging",
    productSlug: "silent-phone",
    productImage: "/images/apps/silent-circle/banner.png",
  },
  {
    legacyPrefix: "armadillo-chat-app",
    productType: "app",
    productName: "Armadillo Chat",
    productDescription: "encrypted messaging for private conversations",
    productSlug: "armadillo-chat",
    productImage: "/images/apps/armadillo/banner.png",
  },
  {
    legacyPrefix: "vaultchat-app",
    productType: "app",
    productName: "VaultChat",
    productDescription: "protected chat for confidential communication",
    productSlug: "vaultchat",
    productImage: "/images/apps/vault-chat/banner.png",
  },
  {
    legacyPrefix: "salt-app",
    productType: "app",
    productName: "Salt App",
    productDescription: "encrypted communication for organizations",
    productSlug: "salt-app",
    productImage: "/images/apps/salt/banner.png",
  },
  {
    legacyPrefix: "vnclagoon-app",
    productType: "app",
    productName: "VNC Lagoon",
    productDescription: "secure collaboration and encrypted messaging",
    productSlug: "vnc-lagoon",
    productImage: "/images/apps/vnc-lagoon/banner.png",
  },
  {
    legacyPrefix: "threema-work-app",
    productType: "app",
    productName: "Threema Work",
    productDescription: "secure business messaging for organizations",
    productSlug: "threema-work",
    productImage: "/images/apps/threema-work/banner.png",
  },
  {
    legacyPrefix: "threema-app",
    productType: "app",
    productName: "Threema",
    productDescription: "private messaging with end-to-end encryption",
    productSlug: "threema",
    productImage: "/images/apps/threema/banner.png",
  },
  {
    legacyPrefix: "nordvpn-app",
    productType: "app",
    productName: "NordVPN",
    productDescription: "VPN privacy protection for browsing and travel",
    productSlug: "nord-vpn",
    productImage: "/images/apps/nord-vpn/banner.png",
  },
];

const SIM_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "encrypted-sim-card",
    productType: "sim",
    productName: "Encrypted SIM Card",
    productDescription: "anonymous SIM and eSIM options for private mobile connectivity",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "encrypted-sim",
    productType: "sim",
    productName: "Encrypted SIM",
    productDescription: "anonymous SIM and eSIM options for private mobile connectivity",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "encrypted-esim",
    productType: "sim",
    productName: "Encrypted eSIM",
    productDescription: "digital eSIM service for private mobile connectivity",
    productSlug: "esim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card_eSIM.webp",
  },
  {
    legacyPrefix: "international-prepaid-card",
    productType: "sim",
    productName: "International Prepaid Card",
    productDescription: "international prepaid mobile connectivity for travel and private communications",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "international-chip",
    productType: "sim",
    productName: "International Chip",
    productDescription: "international SIM options for private mobile connectivity",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-encriptada",
    productType: "sim",
    productName: "SIM Encriptada",
    productDescription: "SIM y eSIM anonimas para comunicacion movil privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-cifrada",
    productType: "sim",
    productName: "SIM Cifrada",
    productDescription: "SIM cifrada para comunicacion movil privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-internacional-encriptada",
    productType: "sim",
    productName: "SIM Internacional Encriptada",
    productDescription: "SIM internacional para viajes y comunicacion segura",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "chip-internacional-encriptado",
    productType: "sim",
    productName: "Chip Internacional Encriptado",
    productDescription: "chip internacional para conectividad privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "tarjeta-prepago-movil-encriptada",
    productType: "sim",
    productName: "Tarjeta Prepago Movil Encriptada",
    productDescription: "tarjeta prepago movil para conectividad privada",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "tarjeta-prepago-movil",
    productType: "sim",
    productName: "Tarjeta Prepago Movil",
    productDescription: "tarjeta prepago movil para uso internacional",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-sim-internationale",
    productType: "sim",
    productName: "Carte SIM Internationale",
    productDescription: "carte SIM internationale pour connectivite mobile privee",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-sim-cryptee",
    productType: "sim",
    productName: "Carte SIM Cryptee",
    productDescription: "carte SIM cryptee pour communications mobiles privees",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-prepayee-mobile",
    productType: "sim",
    productName: "Carte Prepayee Mobile",
    productDescription: "carte prepayee mobile pour connectivite internationale",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "carte-prepayee-internationale",
    productType: "sim",
    productName: "Carte Prepayee Internationale",
    productDescription: "carte prepayee internationale pour connectivite mobile",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
  {
    legacyPrefix: "sim-internationale",
    productType: "sim",
    productName: "SIM Internationale",
    productDescription: "SIM internationale pour connectivite mobile privee",
    productSlug: "sim-encriptada",
    productImage: "/images/encrypted-sim/Encrypted_sim_card.webp",
  },
];

const PHONE_PATTERNS: LocationPattern[] = [
  {
    legacyPrefix: "cryptcom",
    productType: "phone",
    productName: "Cryptcom",
    productDescription: "encrypted phone and secure communication solution",
    productSlug: "cryptcom",
    productImage: "/images/apps/cryptcom/banner.png",
  },
  {
    legacyPrefix: "securecrypt",
    productType: "phone",
    productName: "SecureCrypt",
    productDescription: "secure communication software and encrypted phone solution",
    productSlug: "securecrypt",
    productImage: "/images/apps/secureCrypt/banner.png",
  },
  {
    legacyPrefix: "chatmail",
    productType: "phone",
    productName: "ChatMail",
    productDescription: "secure messaging and encrypted communication solution",
    productSlug: "chatmail",
    productImage: "/images/apps/chat-mail/banner.png",
  },
  {
    legacyPrefix: "vaultchat",
    productType: "phone",
    productName: "VaultChat",
    productDescription: "protected chat for confidential communication",
    productSlug: "vaultchat",
    productImage: "/images/apps/vault-chat/banner.png",
  },
  {
    legacyPrefix: "armadillo-phone",
    productType: "phone",
    productName: "Armadillo Phone",
    productDescription: "encrypted phone solution for private mobile communication",
    productSlug: "armadillo",
    productImage: "/images/apps/armadillo/banner.png",
  },
  {
    legacyPrefix: "intact-phone",
    productType: "phone",
    productName: "Intact Phone",
    productDescription: "secure phone solution for private communication",
    productSlug: "intact-phone",
    productImage: "/images/apps/intact-phone/banner.png",
  },
  {
    legacyPrefix: "dec-secure",
    productType: "phone",
    productName: "DEC Secure",
    productDescription: "secure phone and encrypted communication solution",
    productSlug: "dec-secure",
    productImage: "/images/apps/dec-secure/banner.png",
  },
  {
    legacyPrefix: "t2-communicator",
    productType: "phone",
    productName: "T2 Communicator",
    productDescription: "secure communicator for encrypted mobile workflows",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "totalsec",
    productType: "phone",
    productName: "TotalSec",
    productDescription: "encrypted phone solution for secure mobile communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "ultrax",
    productType: "phone",
    productName: "Ultra X",
    productDescription: "secure mobile communication product",
    productSlug: "ultra-x",
    productImage: "/images/apps/ultrax/banner.png",
  },
  {
    legacyPrefix: "ghost-chat",
    productType: "phone",
    productName: "Ghost Chat",
    productDescription: "secure messaging product for private communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "tribu-phone",
    productType: "phone",
    productName: "Tribu Phone",
    productDescription: "encrypted phone product for private mobile communication",
    productPathByLocale: HOME_PATHS,
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "encrypted-phone",
    productType: "phone",
    productName: "Encrypted Phones",
    productDescription: "secure mobile devices prepared for private communication",
    productPathByLocale: {
      es: "/es/encrypted-phones-distributors",
      en: "/en/encrypted-phones-distributors",
      fr: "/fr/encrypted-phones-distributors",
      it: "/it/encrypted-phones-distributors",
      pt: "/pt/encrypted-phones-distributors",
    },
    productImage: "/images/our-products/two-cellphones.png",
  },
  {
    legacyPrefix: "encrypted-cell-phone",
    productType: "phone",
    productName: "Encrypted Phones",
    productDescription: "secure mobile devices prepared for private communication",
    productPathByLocale: {
      es: "/es/encrypted-phones-distributors",
      en: "/en/encrypted-phones-distributors",
      fr: "/fr/encrypted-phones-distributors",
      it: "/it/encrypted-phones-distributors",
      pt: "/pt/encrypted-phones-distributors",
    },
    productImage: "/images/our-products/two-cellphones.png",
  },
];

export { APP_PATTERNS, SIM_PATTERNS, PHONE_PATTERNS };

const LOCATION_PATTERNS = [...APP_PATTERNS, ...SIM_PATTERNS, ...PHONE_PATTERNS].sort(
  (first, second) => second.legacyPrefix.length - first.legacyPrefix.length,
);

// Default cities for location sitemap generation.
// Edit this list to add/remove cities. Each city generates URLs like:
// /location/{prefix}-{city} and /location/{locale}/{prefix}-{city}
// Extracted from legacy WordPress sitemaps (apps, sim, phone × en, es, fr).
export const LOCATION_CITIES = [
  "aalborg", "aarhus", "abbeville", "abbotsford", "aberdeen", "abidjan", "abilene",
  "acheres", "adelaide", "afghanistan", "agde", "agen", "aguachica", "aguascalientes",
  "ahmedabad", "airdrie", "aix-en-provence", "aix-les-bains", "ajaccio", "akron",
  "alabama", "alajuela", "alamor", "alaska", "alausi", "albacete", "alberta", "albi",
  "albuquerque", "alcala-de-henares", "alcobendas", "alcorcon", "alencon", "ales",
  "alexandria", "alfortville", "alfredo-baquerizo-moreno", "algeciras", "alicante",
  "allauch", "allen", "allentown", "almaty", "almeria", "amaluza", "amarillo",
  "amazonas", "ambato", "amiens", "amsterdam", "anaheim", "anchorage", "angers",
  "anglet", "angol", "angouleme", "anguilla", "ankara", "ann-arbor", "annecy",
  "annemasse", "antananarivo", "antibes", "antigua-and-barbuda", "antigua-y-barbuda",
  "antioch", "antioquia", "antofagasta", "antony", "anvers", "apartado", "arajuno",
  "arauca", "archidona", "arcueil", "arenillas", "arequipa", "argenteuil", "argentina",
  "arica", "arizona", "arjona", "arkansas", "arles", "arlington", "armenia",
  "armentieres", "arraijan", "arras", "arroyo-negro", "aruba", "arvada", "ashdod",
  "ashkelon", "asnieres-sur-seine", "astana", "asuncion", "atacames", "athens",
  "athis-mons", "atlanta", "atlantico", "atuntaqui", "aubagne", "aubervilliers", "auch",
  "auckland", "augusta", "aulnay-sous-bois", "aurillac", "aurora", "austin", "australia",
  "auxerre", "avignon", "ayacucho", "azerbaijan", "azogues", "azua-de-compostela",
  "azuay",
  "baba", "babahoyo", "badajoz", "badalona", "baeza", "baghdad", "bagneux", "bagnolet",
  "bahamas", "bahia-blanca", "bahia-de-caraquez", "baie-mahault", "bakersfield", "baku",
  "balao", "bale", "balsas", "baltimore", "balzar", "bamako", "bandung", "banfield",
  "bangkok", "bangladesh", "bangor", "bani", "banos-de-agua-santa", "baracaldo",
  "barbados", "barcelona", "bari", "barquisimeto", "barrancabermeja", "barranquilla",
  "barrie", "basel", "bastia", "baton-rouge", "bat-yam", "bayamon", "bayonne",
  "beaumont", "beaune", "beaupreau-en-mauges", "beauvais", "beersheba", "begles",
  "beijing", "belen", "belfast", "belfort", "belgique", "belice", "belize", "belleville",
  "bellevue", "bello", "beloeil", "belo-horizonte", "bend", "bengaluru", "berazategui",
  "bergen", "bergerac", "berkeley", "berlin", "bermuda", "bern", "berne", "besancon",
  "bethune", "beziers", "bezons", "biarritz", "biblian", "bilbao", "billings",
  "birmingham", "blagnac", "blois", "bnei-brak", "bobigny", "boca-chica", "bogota",
  "bois-colombes", "boise", "bolivar", "bolivia", "bologna", "bolton", "bonao", "bondy",
  "bordeaux", "boston", "boulder", "boulogne-billancourt", "boulogne-sur-mer",
  "bourg-en-bresse", "bourges", "bourg-la-reine", "bourgoin-jallieu", "bowmanville",
  "boyaca", "bradford", "bradford-leeds", "brandon", "brantford", "brasil", "brasilia",
  "brazil", "brazzaville", "bremen", "brest", "bretigny-sur-orge", "bridgeport",
  "brighton", "brisbane", "bristol", "british-columbia", "british-virgin-islands",
  "brive-la-gaillarde", "brockton", "broken-arrow", "bron", "brownsville",
  "bruay-la-buissiere", "bruges", "brunoy", "brussels", "bruxelles", "bucaramanga",
  "buckeye", "budapest", "buena-fe", "buenaventura", "buenos-aires", "buffalo", "buga",
  "buin", "burbank", "burgos", "burkina-faso", "busan", "bussy-saint-georges",
  "caacupe", "caaguazu", "cachan", "cadiz", "caen", "cagnes-sur-mer", "caguas",
  "cajamarca", "calais", "calama", "calceta", "caldas", "calgary", "cali", "california",
  "callao", "caloocan", "caluire-et-cuire", "caluma", "camaguey", "cambodia", "cambrai",
  "cambridge", "cameroon", "camilo-ponce-enriquez", "campbell-river", "campinas",
  "canada", "canar", "canberra", "cancun", "cannes", "canton-guano", "cape-breton",
  "cape-coral", "capiata", "caqueta", "caracas", "carapegua", "carcassonne", "cardiff",
  "cariamanga", "carlos-julio-arosemena-tola", "carlsbad", "carmel", "carpentras",
  "carquefou", "carrollton", "cartagena", "cartagena-de-indias", "cartago", "cary",
  "casanare", "castellon-de-la-plana", "castelnau-le-lez", "castres", "catacamas",
  "catacocha", "catamayo", "catania", "catarama", "cauca", "caucasia", "cauquenes",
  "cavaillon", "cayambe", "cayenne", "cayman-islands", "cedar-rapids", "celica", "cenon",
  "centennial", "central-coast", "cergy", "cesar", "cevallos", "chaguarpamba",
  "challans", "chalons-en-champagne", "chalon-sur-saone", "chambery", "chambo",
  "champigny-sur-marne", "champs-sur-marne", "chandler", "changsha",
  "charenton-le-pont", "charleston", "charleville-mezieres", "charlotte",
  "charlottetown", "chartres", "chateauguay", "chateauroux", "chatellerault",
  "chatenay-malabry", "chatham", "chatillon", "chatou", "chattanooga", "chaumont",
  "chaville", "chelles", "chelyabinsk", "chemille-en-anjou", "chengdu", "chennai",
  "cherbourg-en-cotentin", "chesapeake", "chicago", "chiclayo", "chico",
  "chicoutimi-jonquiere", "chihuahua", "chile", "chilla", "chillanes", "chilliwack",
  "chimbo", "chimborazo", "chimbote", "china", "chinandega", "chincha-alta",
  "chittagong", "choco", "choisy-le-roi", "cholet", "choloma", "choluteca", "chone",
  "chongqing", "chordeleg", "christchurch", "chula-vista", "chunchi", "chur", "cienaga",
  "cincinnati", "ciudad-de-guatemala", "ciudad-del-este", "ciudad-de-la-costa",
  "ciudad-de-mexico", "ciudad-de-panama", "ciudad-guayana", "ciudad-juarez",
  "ciudad-sandino", "clamart", "clarksville", "clearwater", "clermont-ferrand",
  "cleveland", "clichy", "clichy-sous-bois", "clovis", "cnel-marcelino-mariduena",
  "coban", "cochabamba", "cochrane", "colimes", "colina", "college-station", "colmar",
  "cologne", "colombes", "colombia", "colomiers", "colon", "colorado",
  "colorado-springs", "columbia", "columbus", "comayagua", "combs-la-ville",
  "comodoro-rivadavia", "compiegne", "concepcion", "concord",
  "conflans-sainte-honorine", "connecticut", "constanza", "constitucion", "copenhagen",
  "copiapo", "coral-springs", "corbeil-essonnes", "cordoba", "cormeilles-en-parisis",
  "cornwall", "corona", "corpus-christi", "corrientes", "costa-mesa", "costa-rica",
  "cotacachi", "cote-divoire", "cotopaxi", "cotui", "coudekerque-branche", "coueron",
  "courbevoie", "cournon-dauvergne", "courtenay", "coventry", "coyhaique", "creil",
  "creteil", "croix", "cuba", "cucuta", "cuenca", "cuernavaca", "cuiaba", "culiacan",
  "cumanda", "cundinamarca", "curico", "curitiba", "curuguaty", "cuzco",
  "daegu", "dakar", "dallas", "daly-city", "dammarie-les-lys", "danli", "darwin",
  "daule", "davao-city", "davenport", "davie", "dax", "dayton", "dearborn",
  "decines-charpieu", "deleg", "delhi", "democratic-republic-of-congo", "denton",
  "denver", "des-moines", "detroit", "deuil-la-barre", "dhaka", "dieppe", "dijon",
  "district-of-columbia", "dole", "dominica", "dominican-republic", "dongguan",
  "dortmund", "dos-hermanas", "douai", "douala", "downey", "draguignan", "drancy",
  "draveil", "dresden", "dreux", "drummondville", "dubai", "dublin", "duisburg",
  "duitama", "dundee", "dunedin", "dunkirk", "duran", "durham", "dusseldorf",
  "eaubonne", "ecatepec", "echeandia", "echirolles", "ecuador", "edinburg", "edinburgh",
  "edison", "edmonton", "el-alto", "elancourt", "el-angel", "el-cajon", "el-carmen",
  "el-carmen-de-bolivar", "el-chaco", "elche", "el-corazon",
  "el-dorado-de-cascales", "el-espinal", "elgin", "el-guabo", "elizabeth", "elk-grove",
  "el-monte", "el-oro", "el-pan", "el-pangui", "el-paso", "el-progreso", "el-salvador",
  "el-tambo", "el-triunfo", "encarnacion", "england", "envigado", "epernay", "epinal",
  "epinay-sur-seine", "ermont", "escondido", "esmeraldas", "espana", "esperanza",
  "espoo", "essen", "esteli", "etampes", "eugene", "evansville", "everett", "evreux",
  "evry-courcouronnes", "eysines",
  "facatativa", "fairfield", "faisalabad", "fargo", "fayetteville", "fishers",
  "flavio-alfaro", "fleury-les-aubrais", "florence", "florencia", "florianopolis",
  "florida", "floridablanca", "fontaine", "fontana", "fontenay-aux-roses",
  "fontenay-sous-bois", "forbach", "formosa", "fortaleza", "fort-collins",
  "fort-de-france", "fort-lauderdale", "fort-mcmurray", "fort-saskatchewan", "fort-wayne",
  "fort-worth", "foshan", "fougeres", "france", "franconville", "frankfurt-am-main",
  "fredericton", "frejus", "fremont", "french-guiana", "fresnes", "fresno", "fribourg",
  "frisco", "frontignan", "fuenlabrada", "fukuoka", "fullerton", "fusagasuga",
  "gagny", "gainesville", "gand", "gap", "gardanne", "garden-grove",
  "garges-les-gonesse", "garland", "geelong", "general-villamil", "geneva", "geneve",
  "gennevilliers", "genoa", "georgetown", "georgia", "germany", "gerona", "getafe",
  "gif-sur-yvette", "gijon", "gilbert", "girardot", "giron", "givors", "glasgow",
  "glendale", "godoy-cruz", "goiania", "gold-coast", "gonesse", "gonzalez-catan",
  "gonzanama", "goodyear", "gothenburg", "goussainville", "gradignan",
  "gral-antonio-elizalde", "gral-leonidas-plaza-gutierrez", "granada", "granby",
  "gran-chillan", "gran-concepcion", "grande-prairie", "grande-synthe", "grand-prairie",
  "grand-rapids", "gran-iquique", "gran-la-serena", "gran-puerto-montt",
  "gran-quillota", "gran-rancagua", "gran-san-antonio", "gran-santiago", "gran-temuco",
  "gran-valparaiso", "grasse", "greeley", "green-bay", "greensboro",
  "gregorio-de-laferrere", "grenada", "grenoble", "gresham", "grigny", "guachapala",
  "guadalajara", "guadeloupe", "guainia", "gualaceo", "gualaquiza", "guamote",
  "guangzhou", "guantanamo", "guaranda", "guatemala", "guatemala-city", "guaviare",
  "guayaquil", "guaymallen", "guayzimi", "gudalajara", "guelph", "gujan-mestras",
  "guyana", "guyancourt",
  "haguenau", "haifa", "haina", "haiti", "halifax", "halluin", "hamburg", "hamilton",
  "hampton", "hangzhou", "hanoi", "hanover", "hartford", "hato-mayor-del-rey", "hawaii",
  "hayward", "hazebrouck", "hefei", "helsingborg", "helsinki", "henderson",
  "henin-beaumont", "herblay-sur-seine", "heredia", "hermosillo",
  "herouville-saint-clair", "hesperia", "hialeah", "high-point", "higuey", "hillsboro",
  "hobart", "ho-chi-minh-city", "hod-hasharon", "holguin", "hollywood", "holon",
  "honduras", "hong-kong", "honolulu", "hospitalet-de-llobregat", "houilles", "houston",
  "huaca", "huacho", "huamboya", "huancayo", "huanuco", "huaquillas", "huaraz", "huelva",
  "huila", "hull", "huntington-beach", "huntsville", "hyderabad", "hyeres",
  "ibague", "ibarra", "ica", "idaho", "illinois", "illkirch-graffenstaden", "incheon",
  "independence", "india", "indiana", "indianapolis", "indonesia", "inglewood", "inirida",
  "innisfil", "iowa", "ipiales", "iqaluit", "iquitos", "iran", "iraq", "irvine",
  "irving", "isidro-ayora", "isidro-casanova", "israel", "issy-les-moulineaux",
  "istanbul", "istres", "italy", "ivry-sur-seine", "izmir",
  "jackson", "jacksonville", "jaen", "jaipur", "jakarta", "jama", "jamaica", "japan",
  "jarabacoa", "jaramijo", "jeddah", "jerez-de-la-frontera", "jersey-city", "jerusalem",
  "jipijapa", "johannesburg", "joinville", "joliet", "joliette", "jonkoping",
  "jose-c-paz", "joue-les-tours", "juan-persona", "juliaca", "junin", "jurupa-valley",
  "juticalpa",
  "kabul", "kamloops", "kansas", "kansas-city", "kaohsiung", "karachi", "kawasaki",
  "kazakhstan", "kelowna", "kent", "kentucky", "keswick", "khulna", "kigali", "killeen",
  "kingston", "kinshasa", "kitchener", "knoxville", "kobe", "kochi", "kolkata",
  "koungou", "kourou", "krasnoyarsk", "kuala-lumpur", "kyoto",
  "la-bonita", "la-ceiba", "la-celle-saint-cloud", "la-chaux-de-fonds", "la-chorrera",
  "la-ciotat", "la-concordia", "la-coruna", "la-courneuve", "lafayette", "la-florida",
  "la-garde", "la-garenne-colombes", "lagny-sur-marne", "la-guajira", "la-guardia",
  "la-habana", "lahore", "la-joya-de-los-sachas", "lakeland", "lakewood",
  "la-libertad", "la-madeleine", "la-mana", "lambersart", "lampa", "lancaster",
  "lanester", "lannion", "lansing", "lanus", "laon", "la-paz", "la-plata",
  "la-possession", "laredo", "la-rioja", "la-rochelle", "la-roche-sur-yon", "la-romana",
  "las-cruces", "la-seyne-sur-mer", "las-heras", "las-naves",
  "las-palmas-de-gran-canaria", "las-vegas", "latacunga", "la-teste-de-buch",
  "la-troncal", "lausanne", "laval", "la-valette-du-var", "la-vega", "la-victoria",
  "league-city", "leamington", "le-blanc-mesnil", "le-bouscat", "le-cannet",
  "le-chesnay-rocquencourt", "le-creusot", "leduc", "leeds", "lees-summit", "leganes",
  "le-gosier", "le-grand-quevilly", "le-havre", "leipzig", "le-kremlin-bicetre",
  "le-lamentin", "le-mans", "le-mee-sur-seine", "le-moule", "lens", "leon",
  "le-perreux-sur-marne", "le-petit-quevilly", "le-plessis-robinson", "le-port",
  "lerida", "le-robert", "les-abymes", "les-lilas", "les-mureaux",
  "les-pavillons-sous-bois", "les-pennes-mirabeau", "les-sables-dolonne", "les-ulis",
  "le-tampon", "lethbridge", "leticia", "levallois-perret", "lewisville", "lexington",
  "lhay-les-roses", "libourne", "lievin", "lille", "lima", "limache",
  "limeil-brevannes", "limoges", "linares", "lincoln", "linkoping", "lisbon", "lisieux",
  "lisle-sur-la-sorgue", "little-rock", "liverpool", "livry-gargan", "lloydminster",
  "logrono", "loja", "lomas-de-sargentillo", "lome", "london", "londonderry", "londrina",
  "long-beach", "longjumeau", "longmont", "loos", "loreto", "lorica", "lorient",
  "lormont", "los-alcarrizos", "los-andes-calle-larga", "los-angeles", "louisiana",
  "louisville", "louvain", "lowell", "lower-hutt", "lubbock", "lubumbashi", "lucerne",
  "lucknow", "lugano", "lumbaqui", "lunel", "luque", "lynn", "lyon",
  "macara", "macas", "maceio", "machachi", "machala", "macon", "madagascar", "madison",
  "madrid", "magangue", "magdalena", "maicao", "maipu", "maisons-alfort",
  "maisons-laffitte", "malaga", "malakoff", "malaysia", "mali", "malmo", "mamoudzou",
  "managua", "manaos", "manchester", "mandelieu-la-napoule", "manila", "manitoba",
  "manizales", "manosque", "manta", "mantes-la-jolie", "mantes-la-ville", "mao",
  "maracaibo", "maracay", "marbella", "marcabeli", "marcq-en-baoeul", "mar-del-plata",
  "marignane", "mariscal-jose-felix-estigarribia", "marseille", "marseilles",
  "martigues", "martinique", "maryland", "masaya", "massachusetts", "massy", "matagalpa",
  "mataro", "matoury", "maturin", "maubeuge", "mayaguez", "mbuji-mayi", "mcallen",
  "mckinney", "meaux", "medan", "medellin", "medicine-hat", "melbourne", "melipilla",
  "melun", "memphis", "mendoza", "menifee", "menton", "mera", "merida", "meridian",
  "merignac", "merlo", "mesa", "mesquite", "meta", "metz", "meudon", "mexicali",
  "mexico", "mexico-city", "meyzieu", "miami", "miami-gardens", "michigan", "midland",
  "milagro", "milan", "millau", "milton", "milwaukee", "minneapolis", "minnesota",
  "mira", "miramar", "miramas", "mission", "mississippi", "missouri", "mitry-mory",
  "mitu", "mixco", "mobile", "moca", "mocache", "mocha", "mocoa", "modesto", "molina",
  "monaco", "moncton", "mons-en-baroeul", "montaigu-vendee", "montalvo", "montana",
  "montauban", "montbeliard", "mont-de-marsan", "montecristi", "montelibano",
  "montelimar", "monte-plata", "montereau-fault-yonne", "monteria", "montero",
  "monterrey", "montevideo", "montfermeil", "montgeron", "montgomery",
  "montigny-le-bretonneux", "montigny-les-cormeilles", "montigny-les-metz", "montlucon",
  "montmorency", "montpellier", "montreal", "montreuil", "montreux", "montrouge",
  "montserrat", "moose-jaw", "moreno", "moreno-valley", "morona-santiago",
  "morsang-sur-orge", "moscow", "mostoles", "muisne", "mulhouse", "mumbai", "munich",
  "muret", "murfreesboro", "murrieta", "myanmar",
  "nabon", "nagoya", "nagpur", "nagua", "nairobi", "nampa", "nanaimo", "nancy",
  "nanjing", "nanterre", "nantes", "naperville", "napier-and-hastings", "naples", "napo",
  "naranjal", "naranjito", "narbonne", "narino", "nashville", "natal", "nebraska",
  "neiva", "netanya", "netherland-antilles", "netherlands", "neuilly-plaisance",
  "neuilly-sur-marne", "neuilly-sur-seine", "neuquen", "nevada", "nevers", "newark",
  "new-bedford", "new-brunswick", "newcastle", "newfoundland-and-labrador",
  "new-hampshire", "new-haven", "new-jersey", "new-mexico", "new-orleans",
  "newport-news", "new-taipei-city", "new-york", "new-zeeland", "niamey", "nicaragua",
  "nice", "niger", "nimes", "niort", "niza", "nobol", "nogent-sur-marne",
  "nogent-sur-oise", "noisy-le-grand", "noisy-le-sec", "norfolk", "norman",
  "norrkoping", "norte-de-santander", "north-bay", "north-carolina",
  "north-charleston", "north-dakota", "north-korea", "north-las-vegas",
  "northwest-territories", "norwalk", "norwich", "nova-scotia", "novosibirsk",
  "nuestra-senora-de-la-paz", "nueva-loja", "nunavut", "nuremberg",
  "oakland", "ocana", "oceanside", "odense", "odessa", "ohio", "oklahoma",
  "oklahoma-city", "okotoks", "olanchito", "olathe", "olivet", "olmedo", "omaha", "omsk",
  "ona", "ontario", "orange", "orangeville", "orebro", "oregon", "orense", "orillia",
  "orlando", "orleans", "orly", "oruro", "orvault", "osaka", "oshawa", "oslo", "osorno",
  "otavalo", "ottawa", "ouagadougou", "oullins", "oulu", "ovalle", "overland-park",
  "oviedo", "oxford", "oxnard", "oyonnax", "ozoir-la-ferriere",
  "pablo-sexto", "paccha", "paine", "pajan", "pakistan", "palaiseau", "palanda",
  "palenque", "palermo", "palestina", "pallatanga", "palma", "palm-bay", "palmdale",
  "palmerston-north", "palmira", "palora", "pamplona", "panama", "panama-city", "pantin",
  "paquisha", "paraguay", "parana", "paris", "parksville", "parla", "pasadena", "pasaje",
  "pastaza", "pasto", "patate", "paterson", "pau", "paute", "paysandu", "pearland",
  "pedernales", "pedro-brand", "pedro-carbo", "pedro-juan-caballero",
  "pedro-vicente-maldonado", "pelileo", "pembroke-pines", "penaflor", "penipe",
  "pennsylvania", "penticton", "peoria", "pereira", "perigueux", "perpignan", "perth",
  "pertuis", "peru", "peshawar", "pessac", "petah-tikva", "peterborough", "petit-bourg",
  "philadelphia", "philippines", "phnom-penh", "phoenix", "pichincha",
  "pierrefitte-sur-seine", "pilar", "pillaro", "pimampiro", "pinas", "pindal",
  "piracicaba", "pitalito", "pittsburgh", "piura", "plaisir", "plano", "plymouth",
  "poissy", "poitiers", "pomona", "pompano-beach", "ponce", "pontault-combault",
  "pontoise", "popayan", "port-au-prince", "portland", "portoalegre", "portovelo",
  "portoviejo", "portsmouth", "port-st-lucie", "posadas", "potos",
  "prague", "prince-albert", "prince-edward-island", "prince-george", "providence",
  "provo", "pucallpa", "pucara", "puebla", "pueblo", "puebloviejo", "puente-alto",
  "puerto-alegre", "puerto-asis", "puerto-ayora", "puerto-baquerizo-moreno",
  "puerto-carreno", "puerto-casado", "puerto-cortes",
  "puerto-el-carmen-de-putumayo", "puerto-francisco-de-orellana", "puerto-lopez",
  "puerto-maldonado", "puerto-plata", "puerto-principe", "puerto-quito", "puerto-rico",
  "puerto-villamil", "pujili", "punal", "pune", "puno", "punta-arenas", "puntarenas",
  "puteaux", "putumayo", "puyo", "pyongyang",
  "quanzhou", "quebec", "quebec-city", "queretaro", "quero", "quetzaltenango",
  "quevedo", "quezon-city", "quibdo", "quilanga", "quillacollo", "quilmes", "quimper",
  "quincy", "quindio", "quinsaloma", "quito",
  "raleigh", "ramat-gan", "rambouillet", "ranchi", "rancho-cucamonga", "rawalpindi",
  "reading", "recife", "red-deer", "regina", "rehovot", "reims", "remire-montjoly",
  "rengo", "rennes", "reno", "renton", "republica-dominicana", "resistencia", "reus",
  "reze", "rhode-island", "rialto", "richardson", "richmond", "rillieux-la-pape",
  "rimouski", "riobamba", "rio-cuarto", "rio-de-enero", "rio-de-janeiro", "riohacha",
  "rionegro", "rio-rancho", "rioverde", "risaralda", "rishon-lezion", "ris-orangis",
  "rivera", "riverside", "riyadh", "roanne", "rocafuerte", "rochefort", "rochester",
  "rockford", "rodez", "roissy-en-brie", "romainville", "romans-sur-isere", "rome",
  "roquetas-de-mar", "rosario", "rosa-zarate", "roseville", "rosny-sous-bois",
  "roubaix", "rouen", "round-rock", "rueil-malmaison", "russia", "rwanda",
  "sabadell", "sabanalarga", "sacaba", "sacramento", "saint-andre", "saint-benoit",
  "saint-brieuc", "saint-chamond", "saint-cloud", "saint-denis", "sainte-anne",
  "sainte-foy-les-lyon", "sainte-genevieve-des-bois", "sainte-marie", "saintes",
  "sainte-suzanne", "saint-etienne", "saint-etienne-du-rouvray", "saint-genis-laval",
  "saint-georges", "saint-germain-en-laye", "saint-gratien", "saint-herblain",
  "saint-hyacinthe", "saint-jean-de-braye", "saint-jean-sur-richelieu", "saint-jerome",
  "saint-john", "saint-joseph", "saint-kitts-and-nevis", "saint-laurent-du-maroni",
  "saint-laurent-du-var", "saint-leu", "saint-louis", "saint-lucia", "saint-malo",
  "saint-mande", "saint-martin-dheres", "saint-maur-des-fosses",
  "saint-medard-en-jalles", "saint-michel-sur-orge", "saint-nazaire",
  "saint-ouen-laumone", "saint-ouen-sur-seine", "saint-paul", "saint-pierre",
  "saint-priest", "saint-quentin", "saint-raphael", "saint-sebastien-sur-loire",
  "saint-vincent-and-the-grenadines", "salaberry-de-valleyfield", "salamanca", "salem",
  "salinas", "salitre", "salon-de-provence", "salta", "saltillo", "salt-lake-city",
  "salto", "salvador-de-bahia", "samborondon", "san-andres-isla",
  "san-andres-y-providencia", "san-antonio", "san-antonio-de-guerra", "san-bernardino",
  "san-carlos", "san-cristobal", "san-cristobal-de-la-laguna",
  "san-cristobal-y-nieves", "san-diego", "sandy-springs", "san-estanislao",
  "san-felipe", "san-felipe-de-puerto-plata", "san-fernando",
  "san-fernando-del-valle-de-catamarca", "san-francisco", "san-francisco-de-macoris",
  "san-gabriel", "san-gil", "sangolqui", "san-ignacio-de-sabaneta",
  "san-ignacio-guazu", "san-jose", "san-jose-de-las-matas", "san-jose-del-guaviare",
  "san-jose-de-los-campos", "san-juan", "san-juan-bosco", "san-juan-de-la-maguana",
  "san-juan-nepomuceno", "san-lorenzo", "san-luis", "san-luis-de-potosi", "san-mateo",
  "san-miguel", "san-miguel-de-los-bancos", "san-miguel-de-salcedo",
  "san-miguel-de-tucuman", "san-miguelito", "san-nicolas-de-los-garza", "sannois",
  "san-pablo", "san-pedro-carcha", "san-pedro-de-macoris", "san-pedro-sula",
  "san-salvador", "san-salvador-de-jujuy", "san-sebastian", "santa-ana", "santa-clara",
  "santa-clarita", "santa-coloma-de-gramanet", "santa-cruz", "santa-cruz-de-barahona",
  "santa-cruz-de-la-sierra", "santa-cruz-del-seibo", "santa-cruz-de-tenerife",
  "santa-elena", "santa-fe", "santa-isabel", "santa-lucia", "santa-maria",
  "santa-marta", "santander", "santander-de-quilichao", "santa-rosa", "santiago",
  "santiago-de-chile", "santiago-de-cuba", "santiago-del-estero",
  "santiago-de-los-caballeros", "santiago-de-mendez", "santiago-de-queretaro",
  "santo-domingo", "santo-domingo-este", "santo-domingo-norte", "santo-domingo-oeste",
  "santos", "san-vicente", "san-vicente-y-las-granadinas", "sao-paulo", "sapporo",
  "saquisili", "saraguro", "sarcelles", "sarnia", "sarreguemines", "sartrouville",
  "saskatchewan", "saskatoon", "saudi-arabia", "sault-ste-marie", "saumur", "savannah",
  "savigny-le-temple", "savigny-sur-orge", "sceaux", "schiltigheim", "scotland",
  "scottsdale", "seattle", "senegal", "sens", "seoul", "sete", "sevilla",
  "sevilla-de-oro", "sevran", "sevremoine", "sevres", "shanghai", "shantou",
  "shawinigan", "sheffield", "shenyang", "shenzhen", "sherbrooke", "shreveport",
  "shushufindi", "shymkent", "sigchos", "sigsig", "siguatepeque", "simi-valley",
  "simon-bolivar", "sincelejo", "singapore", "sioux-falls", "six-fours-les-plages",
  "soacha", "sogamoso", "soissons", "sorel", "sorocaba", "sosua",
  "sotteville-les-rouen", "southampton", "south-bend", "south-carolina", "south-dakota",
  "south-fulton", "south-korea", "sozoranga", "spain", "sparks", "spokane",
  "spokane-valley", "springfield", "spruce-grove", "stains", "stamford",
  "st-catharines", "sterling-heights", "st-johns", "st-louis", "stockholm", "stockton",
  "stoke-on-trent", "stouffville", "st-petersburg", "strasbourg", "stratford",
  "st-thomas", "stuttgart", "sucre", "sucua", "sucumbios", "sucy-en-brie", "sudbury",
  "sugar-land", "suisse", "sullana", "sunnyvale", "sunshine-coast", "surabaya", "surat",
  "suresnes", "surinam", "suriname", "surprise", "suscal", "suzhou", "swansea",
  "sweden", "sweeden", "switzerland", "sydney", "syracuse",
  "tabacundo", "tacna", "tacoma", "tahiti", "taichung", "tainan", "taipei", "taisha",
  "taiwan", "talagante", "talara", "talca", "talence", "tallahassee", "tamboril",
  "tampa", "tampere", "taoyuan", "tarapoa", "tarapoto", "tarbes", "tarija", "tarragona",
  "tarrasa", "tassin-la-demi-lune", "tauranga", "taverny", "tbilisi", "tegucigalpa",
  "tehran", "tela", "tel-aviv", "telde", "temecula", "tempe", "tena", "tennessee",
  "teresina", "texas", "thailand", "the-east-midlands", "thiais", "thionville",
  "thonon-les-bains", "thornton", "thousand-oaks", "thunder-bay", "tianjin", "tijuana",
  "timmins", "tipitapa", "tiputini", "tisaleo", "tocoa", "togo", "tokyo", "toledo",
  "tolima", "toluca", "topeka", "torcy", "toronto", "torrance",
  "torrejon-de-ardoz", "torreon", "tosagua", "toulon", "toulouse", "tourcoing",
  "tournefeuille", "tours", "townsville", "trappes", "tremblay-en-france", "trinidad",
  "trinidad-and-tobago", "trinidad-y-tobago", "trois-rivieres", "trondheim", "troyes",
  "trujillo", "tucson", "tulcan", "tulsa", "tulua", "tumaco", "tumbes", "tungurahua",
  "tunja", "turbo", "turin", "turkey", "turks-and-caicos", "turku", "tuscaloosa",
  "tyler",
  "united-arab-emirates", "united-kingdom", "united-states", "uppsala", "upssala",
  "urcuqui", "uruguay", "utah",
  "vacaville", "vadodara", "valdez", "valdivia", "valence", "valencia", "valenciennes",
  "valladolid", "vallauris", "valle-del-cauca", "valledupar", "vallejo", "vallenar",
  "valparaiso", "vancouver", "vandoeuvre-les-nancy", "vannes", "vantaa", "vanves",
  "vasteras", "vaulx-en-velin", "vaupes", "velasco-ibarra", "velizy-villacoublay",
  "venezuela", "venissieux", "ventanas", "ventura", "vernon", "versailles", "vertou",
  "vichada", "vichy", "victoria", "victoriaville", "victorville", "vienna", "vienne",
  "vierzon", "vietnam", "vigneux-sur-seine", "vigo", "villa-altagracia", "villa-hayes",
  "villa-hermosa", "villa-la-union", "villanueva", "villarrica", "villavicencio",
  "villefranche-sur-saone", "villejuif", "villemomble", "villenave-dornon",
  "villeneuve-dascq", "villeneuve-la-garenne", "villeneuve-le-roi",
  "villeneuve-saint-georges", "villeneuve-sur-lot", "villeparisis", "villepinte",
  "villeurbanne", "villiers-le-bel", "villiers-sur-marne", "vina-del-mar", "vincennes",
  "vinces", "virginia", "virginia-beach", "virrey-del-pino", "viry-chatillon",
  "visalia", "vitoria", "vitrolles", "vitry-sur-seine", "voiron",
  "waco", "wales", "warnes", "warren", "warsaw", "washington", "wasquehal", "waterbury",
  "wattrelos", "welland", "wellington", "wenzhou", "west-covina", "west-jordan",
  "westminster", "west-palm-beach", "west-valley-city", "white-rock", "wichita",
  "wichita-falls", "wilmington", "windsor", "winnipeg", "winston-salem", "winterthur",
  "wisconsin", "wollongong", "wolverhampton", "woodbridge", "woodstock", "worcester",
  "wuhan",
  "xiamen", "xian",
  "yacuambi", "yacuiba", "yaguachi", "yamasa", "yangon", "yantzaza", "yaounde",
  "yekaterinburg", "yellowknife", "yerevan", "yerres", "yokohama", "yonkers", "yopal",
  "york", "yukon",
  "zamora", "zamora-chinchipe", "zapopan", "zapotillo", "zaragoza", "zaruma",
  "zhengzhou", "zhongshan", "zipaquira", "zumba", "zumbi", "zunyi", "zurich",
];

export const INDEXABLE_LOCATION_PATHS = new Set<string>([
  // Add Search Console validated URLs here when a location page deserves indexing.
]);

export function getIndexableLocationPaths(): string[] {
  return Array.from(INDEXABLE_LOCATION_PATHS);
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeSegments(segments: string[]): string[] {
  return segments.map((segment) => decodeURIComponent(segment).trim().toLowerCase()).filter(Boolean);
}

function getLocaleAndSlug(segments: string[]): { locale: SeoLocale; legacySlug: string } | null {
  const cleanSegments = normalizeSegments(segments);
  if (!cleanSegments.length) return null;

  const firstSegment = cleanSegments[0];
  if (LOCALES.has(firstSegment as SeoLocale)) {
    const legacySlug = cleanSegments.slice(1).join("/");
    return legacySlug ? { locale: firstSegment as SeoLocale, legacySlug } : null;
  }

  return { locale: "en", legacySlug: cleanSegments.join("/") };
}

function resolveProductPath(pattern: LocationPattern, locale: SeoLocale): string {
  if (pattern.productPathByLocale?.[locale]) return pattern.productPathByLocale[locale] as string;
  if (pattern.productType === "sim") return `/${locale}/sim/${pattern.productSlug}`;
  if (pattern.productSlug) return `/${locale}/apps/${pattern.productSlug}`;
  return locale === "es" ? "/" : `/${locale}`;
}

function buildHomePath(locale: SeoLocale): string {
  return HOME_PATHS[locale];
}

export function parseLocationPage(segments: string[]): LocationPageModel | null {
  const parsed = getLocaleAndSlug(segments);
  if (!parsed) return null;

  const match = LOCATION_PATTERNS.find((pattern) =>
    parsed.legacySlug === pattern.legacyPrefix || parsed.legacySlug.startsWith(`${pattern.legacyPrefix}-`),
  );

  const fallbackSlugSegments = parsed.locale === "en" ? [parsed.legacySlug] : [parsed.locale, parsed.legacySlug];
  const fallbackLegacyPath = `/location/${fallbackSlugSegments.join("/")}`;

  if (!match) {
    const fallbackPath = buildHomePath(parsed.locale);

    return {
      locale: parsed.locale,
      slugSegments: fallbackSlugSegments,
      legacyPath: fallbackLegacyPath,
      legacySlug: parsed.legacySlug,
      locationSlug: parsed.legacySlug,
      locationName: titleCaseFromSlug(parsed.legacySlug),
      productType: "generic",
      productName: "Secure Communication Products",
      productDescription: "encrypted apps, SIMs and secure mobile solutions from Encriptados",
      productPath: fallbackPath,
      productImage: "/images/our-products/two-cellphones.png",
      canonicalPath: fallbackPath,
      indexable: false,
    };
  }

  const locationSlug = parsed.legacySlug === match.legacyPrefix
    ? "global"
    : parsed.legacySlug.slice(match.legacyPrefix.length + 1);
  const slugSegments = parsed.locale === "en" ? [parsed.legacySlug] : [parsed.locale, parsed.legacySlug];
  const legacyPath = `/location/${slugSegments.join("/")}`;
  const indexable = true;
  const productPath = resolveProductPath(match, parsed.locale);

  return {
    locale: parsed.locale,
    slugSegments,
    legacyPath,
    legacySlug: parsed.legacySlug,
    locationSlug,
    locationName: titleCaseFromSlug(locationSlug),
    productType: match.productType,
    productName: match.productName,
    productDescription: match.productDescription,
    productPath,
    productImage: match.productImage,
    canonicalPath: indexable ? legacyPath : productPath,
    indexable,
  };
}

export function buildLocationTitle(model: LocationPageModel): string {
  const titleByLocale: Record<SeoLocale, string> = {
    en: model.productType === "generic"
      ? `Secure communication products for ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} in ${model.locationName}`,
    es: model.productType === "generic"
      ? `Productos de comunicacion segura para ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} en ${model.locationName}`,
    fr: model.productType === "generic"
      ? `Produits de communication securisee pour ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} a ${model.locationName}`,
    it: model.productType === "generic"
      ? `Prodotti di comunicazione sicura per ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} a ${model.locationName}`,
    pt: model.productType === "generic"
      ? `Produtos de comunicacao segura para ${model.locationName}`
      : `${model.productName}${model.productType === "app" ? " App" : ""} em ${model.locationName}`,
  };

  return titleByLocale[model.locale] ?? titleByLocale.en;
}

export function buildLocationDescription(model: LocationPageModel): string {
  const descriptionByLocale: Record<SeoLocale, string> = {
    en: `Explore ${model.productName} for ${model.locationName}: ${model.productDescription}. Find secure communication products from Encriptados.`,
    es: `Explora ${model.productName} para ${model.locationName}. Encuentra productos de comunicacion segura, privacidad movil y soporte especializado de Encriptados.`,
    fr: `Explorez ${model.productName} pour ${model.locationName}. Retrouvez des produits de communication securisee, de confidentialite mobile et le support specialise d'Encriptados.`,
    it: `Esplora ${model.productName} per ${model.locationName}. Trova prodotti di comunicazione sicura, privacy mobile e supporto specializzato di Encriptados.`,
    pt: `Explore ${model.productName} para ${model.locationName}. Encontre produtos de comunicacao segura, privacidade movel e suporte especializado da Encriptados.`,
  };

  return descriptionByLocale[model.locale] ?? descriptionByLocale.en;
}

export function buildLocationProductDescription(model: LocationPageModel): string {
  const descriptionByLocale: Record<SeoLocale, string> = {
    en: model.productDescription,
    es: model.productType === "generic"
      ? "catalogo de aplicaciones encriptadas, SIMs y soluciones moviles seguras de Encriptados"
      : "solucion de comunicacion segura para privacidad, movilidad y soporte especializado",
    fr: model.productType === "generic"
      ? "catalogue d'applications chiffrees, de SIM et de solutions mobiles securisees d'Encriptados"
      : "solution de communication securisee pour confidentialite, mobilite et support specialise",
    it: model.productType === "generic"
      ? "catalogo di app crittografate, SIM e soluzioni mobili sicure di Encriptados"
      : "soluzione di comunicazione sicura per privacy, mobilita e supporto specializzato",
    pt: model.productType === "generic"
      ? "catalogo de aplicativos criptografados, SIMs e solucoes moveis seguras da Encriptados"
      : "solucao de comunicacao segura para privacidade, mobilidade e suporte especializado",
  };

  return descriptionByLocale[model.locale] ?? descriptionByLocale.en;
}