export interface ProductOrService {
  id: string;
  name: string;
  description: string;
  price?: string;
  iconName: string; // Ex: 'Activity', 'ShoppingBag', etc.
  imageUrl?: string;
}

export interface StoreData {
  name: string;
  tagline: string;
  description: string;
  aboutText: string;
  aboutImage?: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  googleMapsEmbedUrl?: string;
  googleMapsDirectionsUrl?: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  colors: {
    primaryHex: string;
    accentHex: string;
    // Variações hexadecimais adicionais se necessário
    bgHex?: string;
  };
  typography: {
    displayFontFamily: string;
    bodyFontFamily: string;
    importUrl: string; // Ex: Google Fonts @import url
  };
  features: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  products: Array<ProductOrService>;
  instagramUrl?: string;
  facebookUrl?: string;
}
