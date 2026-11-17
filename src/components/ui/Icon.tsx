import {
  ArrowRight, BadgeCheck, Building, Building2, BriefcaseBusiness, Camera, Check, ChevronDown,
  ChevronRight, ClipboardCheck, Clock, Download, Factory, FileText, GraduationCap, HandCoins,
  Handshake, Hospital, House, Landmark, Mail, MapPin, Menu, MessageCircle, Phone, PhoneCall,
  Quote, ScanSearch, School, ShieldCheck, Shirt, TriangleAlert, UserCheck, Users, X,
  type LucideIcon,
} from "lucide-react";

const icons = {
  "arrow-right": ArrowRight,
  "badge-check": BadgeCheck,
  building: Building,
  "building-2": Building2,
  "briefcase-business": BriefcaseBusiness,
  camera: Camera,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  download: Download,
  factory: Factory,
  "file-text": FileText,
  "graduation-cap": GraduationCap,
  "hand-coins": HandCoins,
  handshake: Handshake,
  hospital: Hospital,
  house: House,
  landmark: Landmark,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  "message-circle": MessageCircle,
  phone: Phone,
  "phone-call": PhoneCall,
  quote: Quote,
  "scan-search": ScanSearch,
  school: School,
  "shield-check": ShieldCheck,
  shirt: Shirt,
  "triangle-alert": TriangleAlert,
  "user-check": UserCheck,
  users: Users,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
