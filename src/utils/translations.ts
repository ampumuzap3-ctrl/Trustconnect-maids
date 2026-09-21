import { LanguageCode } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  ceoBadge: string;
  maidRole: string;
  employerRole: string;
  findMaids: string;
  findEmployers: string;
  activeContracts: string;
  gpsRadar: string;
  connectionFee: string;
  payConnectionFee: string;
  biometricVerification: string;
  verifiedBadge: string;
  ninVerified: string;
  monthlySalary: string;
  rating: string;
  chat: string;
  call: string;
  contracts: string;
  financialHabits: string;
  customerSupport247: string;
  supportNumber: string;
  offlineMode: string;
  lowBandwidth: string;
  darkMode: string;
  highContrast: string;
  installApp: string;
  youtubeAds: string;
  shareTrustConnect: string;
  paymentDetails: string;
  accountRecipient: string;
  downloadReport: string;
  exportCompliance: string;
  liveIn: string;
  dayWorker: string;
  statusAvailable: string;
  statusHired: string;
  budgetGoal: string;
  saveBudget: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "TrustConnect.ug",
    tagline: "Uganda's Verified Domestic Worker & Employer Platform",
    ceoBadge: "Official Platform • Founded & Led by Mugisha El-shaddai",
    maidRole: "House Maid / Domestic Worker",
    employerRole: "Household Employer",
    findMaids: "Find Vetted Maids",
    findEmployers: "Browse Verified Employers",
    activeContracts: "Active Contracts",
    gpsRadar: "GPS Live Radar",
    connectionFee: "Connection Fee",
    payConnectionFee: "Pay Connection Fee",
    biometricVerification: "Biometric & NIN Verification",
    verifiedBadge: "Identity Verified",
    ninVerified: "NIN Card Confirmed",
    monthlySalary: "Monthly Salary (UGX)",
    rating: "Trust Score",
    chat: "Live Chat",
    call: "Call",
    contracts: "Contract Tracker",
    financialHabits: "Spending Habits & Budget",
    customerSupport247: "24/7 Live Care Desk",
    supportNumber: "Hotline: 07518446077",
    offlineMode: "Offline Mode Active",
    lowBandwidth: "Low Data Mode",
    darkMode: "Dark Mode",
    highContrast: "High Contrast (Visual Aid)",
    installApp: "Get TrustConnect App",
    youtubeAds: "Marketing & Video Promo",
    shareTrustConnect: "Share with Friends",
    paymentDetails: "Mobile Money Transfer",
    accountRecipient: "Recipient: Mugisha El-shaddai (0785490344)",
    downloadReport: "Download PDF Report",
    exportCompliance: "Export Compliance Data",
    liveIn: "Live-in Maid",
    dayWorker: "Day Worker",
    statusAvailable: "Available Now",
    statusHired: "Under Contract",
    budgetGoal: "Monthly Domestic Budget",
    saveBudget: "Set Budget Goal",
  },
  lg: {
    appName: "TrustConnect.ug",
    tagline: "Omukutu Omutongole ogw'Abakozi b'ewaka n'Abakozesa mu Uganda",
    ceoBadge: "Omukutu Omutongole • Gitandikiddwa Mugisha El-shaddai",
    maidRole: "Omukozi w'Ewaka",
    employerRole: "Mukama w'Amaka (Mukozesa)",
    findMaids: "Noonya Abakozi Abakakasiddwa",
    findEmployers: "Noonya Amaka Agakakasiddwa",
    activeContracts: "Endagaano Eziriwo",
    gpsRadar: "GPS Ey'okumpi",
    connectionFee: "Ez'Okutugatta (Connection Fee)",
    payConnectionFee: "Sasula Ez'okutugatta",
    biometricVerification: "Okukakasa Obutonde ne NIN",
    verifiedBadge: "Akakasiddwa Bulungi",
    ninVerified: "NIN Enkakasifu",
    monthlySalary: "Omusaala gwa Buli Mwezi (UGX)",
    rating: "Obwesigwa (Trust Score)",
    chat: "Wuliziganya",
    call: "Kuba Essimu",
    contracts: "Endagaano Z'abakozi",
    financialHabits: "Enkizo y'Ensaasaanya n'Enteekateeka",
    customerSupport247: "Obuyambi Obw'ekiro n'Omusana (24/7)",
    supportNumber: "Essimu: 07518446077",
    offlineMode: "Omukutu Guzzeeko Waggulu",
    lowBandwidth: "Kozesa Data Ntono",
    darkMode: "Ekizikiza",
    highContrast: "Ebiri Ebyangu Okulaba",
    installApp: "Funa Pulogulaamu",
    youtubeAds: "Ebifaananyi n'Omulanga",
    shareTrustConnect: "Gabanako n'Abalala",
    paymentDetails: "Okusasula ku Mobile Money",
    accountRecipient: "Afunayo: Mugisha El-shaddai (0785490344)",
    downloadReport: "Funa Ekiwandiiko kya PDF",
    exportCompliance: "Kuuma Ebiwandiiko",
    liveIn: "Abeera mu Nju",
    dayWorker: "Ajja n'Addayo",
    statusAvailable: "Ali Wano",
    statusHired: "Alina Omulimu",
    budgetGoal: "Enteekateeka y'Amaka",
    saveBudget: "Tereka Enteekateeka",
  },
  sw: {
    appName: "TrustConnect.ug",
    tagline: "Jukwaa la Wafanyakazi wa Nyumbani na Waajiri Nchini Uganda",
    ceoBadge: "Jukwaa Rasmi • Inaongozwa na Mugisha El-shaddai",
    maidRole: "Mfanyakazi wa Nyumbani",
    employerRole: "Mwajiri wa Nyumbani",
    findMaids: "Tafuta Wafanyakazi Walioidhinishwa",
    findEmployers: "Tazama Waajiri Walioidhinishwa",
    activeContracts: "Mikataba Inayoendelea",
    gpsRadar: "GPS ya Eneo Lako",
    connectionFee: "Ada ya Muunganisho",
    payConnectionFee: "Lipa Ada ya Muunganisho",
    biometricVerification: "Uthibitisho wa Alama za Vidole na NIN",
    verifiedBadge: "Imethibitishwa Kikamilifu",
    ninVerified: "Kadi ya NIN Imethibitishwa",
    monthlySalary: "Mshahara wa Kila Mwezi (UGX)",
    rating: "Kiwango cha Uaminifu",
    chat: "Ujumbe wa Moja kwa Moja",
    call: "Piga Simu",
    contracts: "Usimamizi wa Mikataba",
    financialHabits: "Takwimu za Gharama na Bajeti",
    customerSupport247: "Huduma kwa Wateja 24/7",
    supportNumber: "Simu: 07518446077",
    offlineMode: "Hali ya Nje ya Mtandao",
    lowBandwidth: "Okoa Data",
    darkMode: "Mandhari Meusi",
    highContrast: "Muonekano Rahisi wa Macho",
    installApp: "Pakua App ya TrustConnect",
    youtubeAds: "Matangazo na Video",
    shareTrustConnect: "Shiriki na Wengine",
    paymentDetails: "Malipo ya Mobile Money",
    accountRecipient: "Mpokeaji: Mugisha El-shaddai (0785490344)",
    downloadReport: "Pakua Ripoti ya PDF",
    exportCompliance: "Hifadhi Data Salama",
    liveIn: "Wa Kuishi Ndani",
    dayWorker: "Wa Kutwa",
    statusAvailable: "Yupo Tayari",
    statusHired: "Yuko Kazini",
    budgetGoal: "Bajeti ya Mwezi ya Nyumba",
    saveBudget: "Weka Lengo la Bajeti",
  },
  rn: {
    appName: "TrustConnect.ug",
    tagline: "Omukutu gw'Abakozi b'Omuka n'Abakozesa omu Uganda",
    ceoBadge: "Omukutu gw'Amazima • Egambibwaho Mugisha El-shaddai",
    maidRole: "Omukozi w'Omuka",
    employerRole: "Omukozesa w'Omuka",
    findMaids: "Sherura Abakozi Abahikire",
    findEmployers: "Sherura Amaka Agahikire",
    activeContracts: "Endagaano Zirikukora",
    gpsRadar: "GPS Ey'Haihi",
    connectionFee: "Esente z'Okubateera Hamwe",
    payConnectionFee: "Shashura Esente z'Okubateera Hamwe",
    biometricVerification: "Okukyebera Ebirikukwataho n'Ekikopo",
    verifiedBadge: "Akazibweho Eby'amazima",
    ninVerified: "NIN Ekakizibwe",
    monthlySalary: "Omushaara gwa Buri Kwezi (UGX)",
    rating: "Obwesigwa Bwe",
    chat: "Gamba Naye",
    call: "Tera Esimu",
    contracts: "Endagaano Z'omulimo",
    financialHabits: "Ebikwatiraine n'Esaasaanya",
    customerSupport247: "Obuyambi Bwa Buri Mwanya (24/7)",
    supportNumber: "Esimu: 07518446077",
    offlineMode: "Hatariho Internet",
    lowBandwidth: "Kozesa Data Nkyye",
    darkMode: "Omwirima",
    highContrast: "Ebyangu Kureeba",
    installApp: "Tunga App",
    youtubeAds: "Okuranga omu Vidiyo",
    shareTrustConnect: "Gambira Abataahi",
    paymentDetails: "Okushashura na Mobile Money",
    accountRecipient: "Orikushashurwa: Mugisha El-shaddai (0785490344)",
    downloadReport: "Tunga Ripoota ya PDF",
    exportCompliance: "Bika Eby'enshashura",
    liveIn: "Orikutuura Omuka",
    dayWorker: "Orikutaha Buri Izoba",
    statusAvailable: "Ahari Hati",
    statusHired: "Aine Omurimo",
    budgetGoal: "Entebeekanisa y'Omwezi",
    saveBudget: "Bika Entebeekanisa",
  },
  fr: {
    appName: "TrustConnect.ug",
    tagline: "Plateforme de Confiance pour Travailleurs Domestiques en Ouganda",
    ceoBadge: "Plateforme Officielle • Fondée par Mugisha El-shaddai",
    maidRole: "Aide Ménagère / Travailleur Domestique",
    employerRole: "Employeur Familial",
    findMaids: "Trouver des Aides Vérifiées",
    findEmployers: "Parcourir les Employeurs",
    activeContracts: "Contrats Actifs",
    gpsRadar: "Radar GPS en Direct",
    connectionFee: "Frais de Connexion",
    payConnectionFee: "Payer les Frais de Connexion",
    biometricVerification: "Vérification Biométrique et NIN",
    verifiedBadge: "Identité Vérifiée",
    ninVerified: "Carte NIN Confirmée",
    monthlySalary: "Salaire Mensuel (UGX)",
    rating: "Indice de Confiance",
    chat: "Discussion Directe",
    call: "Appeler",
    contracts: "Gestionnaire de Contrats",
    financialHabits: "Habitudes de Dépenses et Budget",
    customerSupport247: "Assistance en Direct 24/7",
    supportNumber: "Ligne directe: 07518446077",
    offlineMode: "Mode Hors Ligne Activé",
    lowBandwidth: "Mode Faible Débit",
    darkMode: "Mode Sombre",
    highContrast: "Contraste Élevé (Accessibilité)",
    installApp: "Installer l'Application",
    youtubeAds: "Promotion et Publicités Vidéo",
    shareTrustConnect: "Partager l'Application",
    paymentDetails: "Paiement par Mobile Money",
    accountRecipient: "Bénéficiaire: Mugisha El-shaddai (0785490344)",
    downloadReport: "Télécharger le Rapport PDF",
    exportCompliance: "Exporter les Données Sécurisées",
    liveIn: "Logée sur Place",
    dayWorker: "Travailleur de Jour",
    statusAvailable: "Disponible Immédiatement",
    statusHired: "Sous Contrat",
    budgetGoal: "Budget Domestique Mensuel",
    saveBudget: "Définir l'Objectif",
  }
};
