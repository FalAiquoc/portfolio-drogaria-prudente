import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Drogaria Prudente',
  tagline: 'Sua saúde em primeiro lugar com atendimento humanizado em Lagoa Nova',
  description: 'Há anos servindo a comunidade de Natal com medicamentos de qualidade, genéricos com preços baixos e uma linha completa de dermocosméticos e higiene.',
  aboutText: 'A Drogaria Prudente nasceu da vontade de oferecer um serviço de saúde próximo e confiável para os moradores de Lagoa Nova. Acreditamos que cuidar da saúde vai além de vender medicamentos; envolve atenção, orientação correta de farmacêuticos dedicados e economia real para o bolso do cliente, com os melhores programas de fidelidade e descontos.',
  aboutImage: 'https://images.unsplash.com/photo-1631549916768-4119b255f9a2?auto=format&fit=crop&q=80&w=1200',
  phone: '(84) 4141-4440',
  phoneFormatted: '8441414440',
  whatsappNumber: '558441414440',
  whatsappMessage: 'Olá! Gostaria de verificar a disponibilidade de um medicamento ou fazer um pedido para entrega.',
  address: 'Av. Prudente de Morais, 3922 - Lagoa Nova, Natal - RN, 59020-400',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.208151978252!2d-35.2154378!3d-5.8117768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301c4e7a83d47%3A0x6b77c5efc0f4f9f7!2sAv.%20Prudente%20de%20Morais%2C%203922%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059020-400!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/K6s3d47efc0f4f9f7',
  businessHours: {
    weekdays: 'Segunda a Sexta: 07:00 às 22:00',
    saturday: 'Sábado: 07:00 às 22:00',
    sunday: 'Domingo: 08:00 às 18:00',
  },
  colors: {
    primaryHex: '#10b981', // Verde Esmeralda
    accentHex: '#06b6d4',  // Ciano
  },
  typography: {
    displayFontFamily: 'Outfit',
    bodyFontFamily: 'Inter',
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap',
  },
  features: [
    {
      title: 'Entrega Rápida em Lagoa Nova',
      description: 'Receba seus produtos no conforto do seu lar com rapidez e taxa especial.',
      iconName: 'Activity',
    },
    {
      title: 'Orientação Farmacêutica',
      description: 'Profissionais de plantão para tirar suas dúvidas e conferir suas receitas.',
      iconName: 'HeartPulse',
    },
    {
      title: 'Preço Popular e Convênios',
      description: 'Medicamentos da Farmácia Popular com descontos em folha e convênios locais.',
      iconName: 'Tag',
    },
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Medicamentos e Genéricos',
      description: 'A maior variedade de genéricos com o selo de garantia da ANVISA e preços competitivos.',
      price: 'Genéricos a partir de R$ 2,90',
      iconName: 'Pill',
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-2',
      name: 'Dermocosméticos Premium',
      description: 'Linha completa de protetores solares, hidratantes corporais e faciais das melhores marcas.',
      price: 'Os melhores preços da região',
      iconName: 'Sparkles',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prod-3',
      name: 'Suplementos e Vitaminas',
      description: 'Vitaminas de A a Z, whey protein, colágenos e suplementação alimentar para seu dia a dia.',
      price: 'Diversas marcas com descontos',
      iconName: 'ShieldCheck',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    },
  ],
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
};
