export type UserRole = 'employer' | 'maid' | 'admin';

export type LanguageCode = 'en' | 'lg' | 'sw' | 'rn' | 'fr';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  neighborhood: string;
  district: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar: string;
  bio: string;
  location: LocationCoordinates;
  ninNumber: string;
  isNinVerified: boolean;
  isBiometricVerified: boolean;
  rating: number;
  totalReviews: number;
  monthlySalaryUgx: number;
  connectionFeePaid: boolean;
  connectionFeeTxRef?: string;
  connectionFeePaidAt?: string;
  skills?: string[];
  languages?: string[];
  experienceYears?: number;
  workType?: 'live_in' | 'day_worker' | 'both';
  availabilityStatus?: 'available' | 'interviewing' | 'contracted';
  budgetGoalUgx?: number;
}

export interface CandidateReview {
  id: string;
  authorName: string;
  authorRole: 'employer' | 'maid';
  rating: number;
  comment: string;
  date: string;
  verifiedHire: boolean;
}

export interface MaidProfile extends UserProfile {
  role: 'maid';
  specialties: string[];
  previousWorkPlaces: string[];
  hasFirstAidTraining: boolean;
  cookingSpecialties: string[];
  reviews: CandidateReview[];
  distanceKm?: number;
}

export interface EmployerProfile extends UserProfile {
  role: 'employer';
  householdSize: number;
  numberOfChildren: number;
  pets: boolean;
  requirements: string[];
  offeredSalaryUgx: number;
  reviews: CandidateReview[];
  distanceKm?: number;
}

export interface Contract {
  id: string;
  contractNumber: string;
  employerId: string;
  employerName: string;
  employerPhone: string;
  maidId: string;
  maidName: string;
  maidPhone: string;
  workLocation: string;
  agreedSalaryUgx: number;
  paymentCycle: 'monthly' | 'weekly' | 'biweekly';
  startDate: string;
  endDate?: string;
  workType: 'live_in' | 'day_worker';
  status: 'active' | 'pending_signature' | 'completed' | 'terminated';
  responsibilities: string[];
  offDays: string;
  probationMonths: number;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  employerSigned: boolean;
  maidSigned: boolean;
  signedAt?: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  txRef: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  type: 'connection_fee' | 'salary_disbursement' | 'transport_stipend' | 'service_fee';
  amountUgx: number;
  mobileNetwork: 'MTN Mobile Money' | 'Airtel Money';
  recipientPhone: string;
  recipientName: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  text: string;
  timestamp: string;
  isAudio?: boolean;
  audioDuration?: string;
  isLocation?: boolean;
  locationDetails?: string;
  read: boolean;
}

export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'ceo';
  text: string;
  timestamp: string;
}
