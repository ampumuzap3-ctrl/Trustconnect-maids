import { MaidProfile, EmployerProfile, Contract, PaymentTransaction } from '../types';

export const OFFICIAL_CEO_INFO = {
  name: "Mugisha El-shaddai",
  title: "Founder & Chief Executive Officer (CEO)",
  mobileMoneyNumber: "0785490344",
  customerCareHotline: "07518446077",
  company: "TrustConnect Uganda Ltd.",
  domain: "trustconnect.ug",
  websiteUrl: "https://trustconnect.ug",
  registrationNo: "URSB-TC-2024-884910",
  headquarters: "TrustConnect Tower, Plot 14 Lumumba Avenue, Nakasero, Kampala, Uganda",
  securityGuarantee: "100% Biometric & National Identification Authority (NIRA) Compliant",
  maidConnectionFeeUgx: 5000,
  employerConnectionFeeUgx: 15000,
};

export const INITIAL_MAIDS: MaidProfile[] = [
  {
    id: 'maid-1',
    name: 'Acan Florence',
    phone: '+256 772 419 802',
    email: 'florence.acan@trustconnect.ug',
    role: 'maid',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Experienced housekeeper and gentle nanny with 6 years of trusted service in Kampala. Skilled in Ugandan traditional meals (Matooke, groundnut stew, Luwombo) and laundry.',
    location: {
      lat: 0.3541,
      lng: 32.6105,
      neighborhood: 'Ntinda (Ministers Village)',
      district: 'Kampala'
    },
    ninNumber: 'CF92014108849L',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.9,
    totalReviews: 28,
    monthlySalaryUgx: 280000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-8841294',
    connectionFeePaidAt: '2026-09-12T10:30:00Z',
    workType: 'live_in',
    availabilityStatus: 'available',
    skills: ['Infant & Toddler Care', 'Ugandan & Continental Cooking', 'Deep Housekeeping', 'School Drop & Pickup'],
    languages: ['Luganda', 'English', 'Ateso'],
    experienceYears: 6,
    hasFirstAidTraining: true,
    specialties: ['Matooke & Groundnut sauce', 'Gentle Infant Sleep Routine', 'First Aid Certified by Red Cross Uganda'],
    previousWorkPlaces: ['Kololo Family (3 years)', 'Bugolobi Diplomatic residence (2 years)'],
    cookingSpecialties: ['Luwombo', 'Matooke', 'Chapati & Beans', 'Stir Fry Vegetables'],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Dr. Sarah Nabatanzi',
        authorRole: 'employer',
        rating: 5,
        comment: 'Florence cared for our 8-month-old daughter like her own. Very punctual, respectful, and her Luwombo cooking is unmatched!',
        date: '14 Aug 2026',
        verifiedHire: true
      },
      {
        id: 'rev-2',
        authorName: 'Patrick Ochieng',
        authorRole: 'employer',
        rating: 4.8,
        comment: 'Very trustworthy, always clean and meticulous. Never had any issues during her 2-year tenure.',
        date: '02 May 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'maid-2',
    name: 'Nalubega Winnie',
    phone: '+256 701 559 214',
    email: 'winnie.nalubega@trustconnect.ug',
    role: 'maid',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Professional house manager and dedicated cook with certificate in culinary arts. Specialized in managing large homesteads and senior citizen companionship.',
    location: {
      lat: 0.3275,
      lng: 32.5852,
      neighborhood: 'Kololo IV',
      district: 'Kampala'
    },
    ninNumber: 'CF96048102319K',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.8,
    totalReviews: 19,
    monthlySalaryUgx: 320000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-9102481',
    connectionFeePaidAt: '2026-09-14T14:15:00Z',
    workType: 'both',
    availabilityStatus: 'available',
    skills: ['Elderly Care', 'Continental Culinary', 'Wardrobe & Ironing', 'Pet Care'],
    languages: ['Luganda', 'English', 'Swahili'],
    experienceYears: 5,
    hasFirstAidTraining: true,
    specialties: ['Senior Patient Monitoring', 'Pastry & Baking', 'Disinfectant Sanitation'],
    previousWorkPlaces: ['Muyenga Hill Residence (3 years)', 'Naguru Family (2 years)'],
    cookingSpecialties: ['Grilled Tilapia', 'Spiced Pilau', 'Brown Rice & Peas', 'Vegetable Soups'],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Eng. Moses Byamukama',
        authorRole: 'employer',
        rating: 5,
        comment: 'Winnie was an absolute blessing for our elderly mother in Kololo. Very patient, clean, and honest.',
        date: '28 Jul 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'maid-3',
    name: 'Atuhaire Brenda',
    phone: '+256 788 190 342',
    email: 'brenda.atuhaire@trustconnect.ug',
    role: 'maid',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bio: 'Trustworthy and energetic maid based in Kira. Great with energetic kids, homework supervision, and keeping a sparkling clean home.',
    location: {
      lat: 0.3951,
      lng: 32.6410,
      neighborhood: 'Kira Town Council',
      district: 'Wakiso'
    },
    ninNumber: 'CF98129031045M',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.95,
    totalReviews: 34,
    monthlySalaryUgx: 270000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-7729103',
    connectionFeePaidAt: '2026-09-08T09:40:00Z',
    workType: 'live_in',
    availabilityStatus: 'available',
    skills: ['Child Supervision', 'Household Organization', 'Laundry & Pressing', 'Grocery Budgeting'],
    languages: ['Runyankole', 'Luganda', 'English'],
    experienceYears: 4,
    hasFirstAidTraining: false,
    specialties: ['Kid-friendly meal planning', 'Deep Kitchen Cleaning', 'Cost-effective local market shopping'],
    previousWorkPlaces: ['Naalya Housing Estate (2 years)', 'Kyanja Residence (2 years)'],
    cookingSpecialties: ['Karo (Millet Bread)', 'Eshabwe & Matooke', 'Fresh Katogo', 'Pancakes'],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Grace Katushabe',
        authorRole: 'employer',
        rating: 5,
        comment: 'Brenda is exceptionally disciplined. My children adore her and she maintained strict cleanliness every day.',
        date: '10 Aug 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'maid-4',
    name: 'Kiconco Scovia',
    phone: '+256 754 883 109',
    email: 'scovia.k@trustconnect.ug',
    role: 'maid',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Day-worker maid specialized in thorough weekly or daily cleaning, washing, and compound maintenance for busy professionals.',
    location: {
      lat: 0.3150,
      lng: 32.6200,
      neighborhood: 'Bugolobi Village Mall Area',
      district: 'Kampala'
    },
    ninNumber: 'CF94029188410P',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.75,
    totalReviews: 15,
    monthlySalaryUgx: 240000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-6629140',
    connectionFeePaidAt: '2026-09-17T11:20:00Z',
    workType: 'day_worker',
    availabilityStatus: 'available',
    skills: ['Deep Carpet Cleaning', 'Tile Scrubbing', 'Compound Sweeping', 'Window Washing'],
    languages: ['Luganda', 'English'],
    experienceYears: 3,
    hasFirstAidTraining: false,
    specialties: ['Same-day Turnaround Cleaning', 'Delicate Fabric Washing'],
    previousWorkPlaces: ['Bugolobi Flats (3 years)'],
    cookingSpecialties: ['Simple Katogo', 'Spaghetti Bolognese', 'Fried Fish & Chips'],
    reviews: [
      {
        id: 'rev-5',
        authorName: 'Brian Musoke',
        authorRole: 'employer',
        rating: 4.7,
        comment: 'Very reliable for day-work. Comes at 7:30 AM sharp and leaves my apartment sparkling clean.',
        date: '05 Sep 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'maid-5',
    name: 'Namutebi Resty',
    phone: '+256 702 994 331',
    email: 'resty.namutebi@trustconnect.ug',
    role: 'maid',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    bio: 'Warm-hearted and experienced domestic specialist with background in twin infant care and home security awareness. Verified with NIRA NIN & Biometrics.',
    location: {
      lat: 0.2831,
      lng: 32.5950,
      neighborhood: 'Kansanga / Ggaba Road',
      district: 'Kampala'
    },
    ninNumber: 'CF93051920831T',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.88,
    totalReviews: 22,
    monthlySalaryUgx: 300000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-5510294',
    connectionFeePaidAt: '2026-09-01T08:15:00Z',
    workType: 'live_in',
    availabilityStatus: 'available',
    skills: ['Newborn Twin Care', 'Sanitation', 'Nutritious Weaning Foods', 'First Aid'],
    languages: ['Luganda', 'English', 'Swahili'],
    experienceYears: 7,
    hasFirstAidTraining: true,
    specialties: ['Infant Colic Relief', 'Balanced Meal Prep', 'Hygienic Sterilization'],
    previousWorkPlaces: ['Muyenga Diplomatic Family (4 years)', 'Entebbe Airport Staff Home (3 years)'],
    cookingSpecialties: ['Fish Soup', 'Luwombo', 'Steamed Matooke', 'Millet Porridge'],
    reviews: [
      {
        id: 'rev-6',
        authorName: 'Mercy Kyomugisha',
        authorRole: 'employer',
        rating: 5,
        comment: 'Resty is a gem. She took care of our twins when I resumed work. Utmost peace of mind!',
        date: '19 Aug 2026',
        verifiedHire: true
      }
    ]
  }
];

export const INITIAL_EMPLOYERS: EmployerProfile[] = [
  {
    id: 'emp-1',
    name: 'Dr. Mukasa David & Julian',
    phone: '+256 774 201 993',
    email: 'david.mukasa@kampalahealth.org',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Medical consultant and university lecturer family with 2 school-going children (ages 4 and 7). Safe gated home with private maid room and respectful environment.',
    location: {
      lat: 0.3470,
      lng: 32.5990,
      neighborhood: 'Naguru Hill',
      district: 'Kampala'
    },
    ninNumber: 'CM84021980031R',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.95,
    totalReviews: 8,
    monthlySalaryUgx: 350000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-1029481',
    connectionFeePaidAt: '2026-09-10T15:00:00Z',
    householdSize: 4,
    numberOfChildren: 2,
    pets: false,
    offeredSalaryUgx: 350000,
    budgetGoalUgx: 420000,
    requirements: ['Live-in required', 'Non-smoker', 'Fond of kids', 'Prepares healthy Ugandan supper', 'Sundays free'],
    reviews: [
      {
        id: 'rev-e1',
        authorName: 'Auma Brenda',
        authorRole: 'maid',
        rating: 5,
        comment: 'The Mukasa family treats workers with immense dignity. Salary is paid on the 28th of every month without fail!',
        date: '01 Jul 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'emp-2',
    name: 'Brenda & Robert Tumusiime',
    phone: '+256 706 881 229',
    email: 'brenda.tumusiime@ugandaexport.co.ug',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed28a0e5?auto=format&fit=crop&w=400&q=80',
    bio: 'Finance executive living in Naalya Estate. Seeking an organized day-worker or live-in to keep house tidy and prepare dinner.',
    location: {
      lat: 0.3705,
      lng: 32.6350,
      neighborhood: 'Naalya Housing Estate',
      district: 'Wakiso'
    },
    ninNumber: 'CF89051839210W',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.85,
    totalReviews: 6,
    monthlySalaryUgx: 300000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-3391048',
    connectionFeePaidAt: '2026-09-15T12:30:00Z',
    householdSize: 3,
    numberOfChildren: 1,
    pets: true,
    offeredSalaryUgx: 300000,
    budgetGoalUgx: 380000,
    requirements: ['Experience with toddler', 'Comfortable with small friendly dog', 'Sunday off', 'Prompt communication'],
    reviews: [
      {
        id: 'rev-e2',
        authorName: 'Nakato Stella',
        authorRole: 'maid',
        rating: 5,
        comment: 'Madame Brenda gave me transport allowances and paid on time every month. Very peaceful home.',
        date: '20 Jun 2026',
        verifiedHire: true
      }
    ]
  },
  {
    id: 'emp-3',
    name: 'Hon. Katusiime Emmanuel',
    phone: '+256 782 109 455',
    email: 'katusiime.e@lawpartners.ug',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Senior legal counsel with residence in Muyenga. Looking for an experienced live-in cook and housekeeper.',
    location: {
      lat: 0.2980,
      lng: 32.6050,
      neighborhood: 'Muyenga Tank Hill',
      district: 'Kampala'
    },
    ninNumber: 'CM79011988102Q',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.9,
    totalReviews: 11,
    monthlySalaryUgx: 400000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-4491028',
    connectionFeePaidAt: '2026-09-05T16:45:00Z',
    householdSize: 3,
    numberOfChildren: 0,
    pets: false,
    offeredSalaryUgx: 400000,
    budgetGoalUgx: 500000,
    requirements: ['High culinary competence', 'Strict confidentiality', 'Self-starter', 'Private en-suite staff quarters provided'],
    reviews: [
      {
        id: 'rev-e3',
        authorName: 'Nassuna Mary',
        authorRole: 'maid',
        rating: 4.8,
        comment: 'Very professional employer. Excellent living quarters with electricity and water.',
        date: '15 May 2026',
        verifiedHire: true
      }
    ]
  }
];

export const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'ctr-001',
    contractNumber: 'TC-UG-CTR-2026-041',
    employerId: 'emp-1',
    employerName: 'Dr. Mukasa David & Julian',
    employerPhone: '+256 774 201 993',
    maidId: 'maid-1',
    maidName: 'Acan Florence',
    maidPhone: '+256 772 419 802',
    workLocation: 'Naguru Hill, Plot 22, Kampala',
    agreedSalaryUgx: 280000,
    paymentCycle: 'monthly',
    startDate: '2026-08-01',
    endDate: '2027-07-31',
    workType: 'live_in',
    status: 'active',
    responsibilities: [
      'Daily preparation of breakfast and healthy evening Ugandan dinner',
      'Daily laundry and school uniform pressing for 2 children',
      'General cleanliness and dusting of bedrooms and living quarters',
      'Supervision of afternoon play and homework readiness'
    ],
    offDays: 'Every Sunday 8:00 AM to 7:00 PM',
    probationMonths: 1,
    emergencyContact: {
      name: 'Otim John (Brother)',
      relationship: 'Next of Kin',
      phone: '+256 779 110 342'
    },
    employerSigned: true,
    maidSigned: true,
    signedAt: '2026-07-28T14:30:00Z',
    createdAt: '2026-07-25T10:00:00Z'
  },
  {
    id: 'ctr-002',
    contractNumber: 'TC-UG-CTR-2026-059',
    employerId: 'emp-2',
    employerName: 'Brenda & Robert Tumusiime',
    employerPhone: '+256 706 881 229',
    maidId: 'maid-3',
    maidName: 'Atuhaire Brenda',
    maidPhone: '+256 788 190 342',
    workLocation: 'Naalya Estate, Block 8, Wakiso',
    agreedSalaryUgx: 270000,
    paymentCycle: 'monthly',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    workType: 'live_in',
    status: 'active',
    responsibilities: [
      'Toddler care and playtime facilitation',
      'Cooking balanced family meals and grocery handling',
      'Maintaining spotless kitchen and dining areas'
    ],
    offDays: 'Every alternate Saturday & all Sundays',
    probationMonths: 1,
    emergencyContact: {
      name: 'Mbabazi Charity (Sister)',
      relationship: 'Sister',
      phone: '+256 752 449 101'
    },
    employerSigned: true,
    maidSigned: true,
    signedAt: '2026-08-29T11:00:00Z',
    createdAt: '2026-08-26T09:00:00Z'
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-001',
    txRef: 'TC-MM-8841294',
    userId: 'maid-1',
    userName: 'Acan Florence',
    userRole: 'maid',
    type: 'connection_fee',
    amountUgx: 5000,
    mobileNetwork: 'MTN Mobile Money',
    recipientPhone: '0785490344',
    recipientName: 'Mugisha El-shaddai',
    status: 'completed',
    date: '2026-09-12 10:30',
    notes: 'Maid Connection Fee (TrustConnect verified platform access)'
  },
  {
    id: 'tx-002',
    txRef: 'TC-MM-1029481',
    userId: 'emp-1',
    userName: 'Dr. Mukasa David',
    userRole: 'employer',
    type: 'connection_fee',
    amountUgx: 15000,
    mobileNetwork: 'MTN Mobile Money',
    recipientPhone: '0785490344',
    recipientName: 'Mugisha El-shaddai',
    status: 'completed',
    date: '2026-09-10 15:00',
    notes: 'Employer Platform Connection Fee (Unlocked candidate contacts)'
  },
  {
    id: 'tx-003',
    txRef: 'TC-MM-3391048',
    userId: 'emp-2',
    userName: 'Brenda Tumusiime',
    userRole: 'employer',
    type: 'connection_fee',
    amountUgx: 15000,
    mobileNetwork: 'Airtel Money',
    recipientPhone: '0785490344',
    recipientName: 'Mugisha El-shaddai',
    status: 'completed',
    date: '2026-09-15 12:30',
    notes: 'Employer Connection Fee to CEO Account'
  },
  {
    id: 'tx-004',
    txRef: 'TC-SAL-2026-08',
    userId: 'emp-1',
    userName: 'Dr. Mukasa David',
    userRole: 'employer',
    type: 'salary_disbursement',
    amountUgx: 280000,
    mobileNetwork: 'MTN Mobile Money',
    recipientPhone: '+256 772 419 802',
    recipientName: 'Acan Florence',
    status: 'completed',
    date: '2026-08-28 17:15',
    notes: 'August 2026 Domestic Salary Remittance'
  },
  {
    id: 'tx-005',
    txRef: 'TC-TRP-2026-09',
    userId: 'emp-1',
    userName: 'Dr. Mukasa David',
    userRole: 'employer',
    type: 'transport_stipend',
    amountUgx: 25000,
    mobileNetwork: 'MTN Mobile Money',
    recipientPhone: '+256 772 419 802',
    recipientName: 'Acan Florence',
    status: 'completed',
    date: '2026-09-04 09:00',
    notes: 'Off-day transport allowance for family visit'
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    senderId: 'emp-1',
    senderName: 'Dr. Mukasa David',
    senderRole: 'employer' as const,
    recipientId: 'maid-1',
    text: 'Hello Florence! We reviewed your TrustConnect profile and verified NIN. We have two kids in Naguru and would love to interview you.',
    timestamp: 'Yesterday at 10:14 AM',
    read: true
  },
  {
    id: 'msg-2',
    senderId: 'maid-1',
    senderName: 'Acan Florence',
    senderRole: 'maid' as const,
    recipientId: 'emp-1',
    text: 'Agandi Dr. Mukasa! Thank you so much for reaching out. Yes, I am available and my papers are all verified by TrustConnect. When can we have a call?',
    timestamp: 'Yesterday at 10:20 AM',
    read: true
  },
  {
    id: 'msg-3',
    senderId: 'emp-1',
    senderName: 'Dr. Mukasa David',
    senderRole: 'employer' as const,
    recipientId: 'maid-1',
    text: 'Can we do 4:00 PM today? We also already drafted the contract through the TrustConnect dashboard.',
    timestamp: 'Yesterday at 10:25 AM',
    read: true
  }
];
