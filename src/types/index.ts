
export interface News {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  category?: string | null;
  author?: string | null;
  date: string | Date;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  category?: string | null;
  author?: string | null;
  date: string | Date;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  location?: string | null;
  date: string | Date;
  isLive: boolean;
  streamUrl?: string | null;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  region?: string | null;
  country?: string | null;
  category: string;
  date?: string | Date | null;
  isActive: boolean;
  ctaType?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  target?: number | null;
  raised?: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  image?: string | null;
  role?: string | null;
  date?: string | Date | null;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface GalleryItem {
  id: string;
  title?: string | null;
  imageUrl: string;
  category?: string | null;
  type: string;
  videoUrl?: string | null;
  isActive: boolean;
  createdAt: string | Date;
}

export interface HeroSlide {
  id: string;
  title: string;
  subTitle?: string | null;
  description?: string | null;
  image: string;
  link?: string | null;
  btnText?: string | null;
  order: number;
  isActive: boolean;
  createdAt: string | Date;
}

export interface DailyConfession {
  id: string;
  date: string | Date;
  title: string;
  text: string;
  audioUrl?: string | null;
  link?: string | null;
  isActive: boolean;
  createdAt: string | Date;
}

export interface MarqueeItem {
  id: string;
  content: string;
  link?: string | null;
  color?: string | null;
  isActive: boolean;
  createdAt: string | Date;
}
