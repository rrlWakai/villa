export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  special_requests?: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  category?: string;
  created_at?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  features: string[];
  image: string;
  size?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  specialRequests: string;
}

export interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  totalInquiries: number;
}
