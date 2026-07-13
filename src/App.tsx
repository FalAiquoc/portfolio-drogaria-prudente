import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Injeção dinâmica de fontes e cores baseadas no data.ts
  useEffect(() => {
    // 1. Configurar fontes
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    // 2. Setar CSS variables para fontes e cores no root
    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Gerar paleta baseada no hex da cor primária
    // Converter hex para RGB para variações no tailwind v4 se necessário, ou usar as cores puras.
    root.style.setProperty('--p-50', `${storeData.colors.primaryHex}06`); // Opacidade 2%
    root.style.setProperty('--p-100', `${storeData.colors.primaryHex}0f`); // Opacidade 6%
    root.style.setProperty('--p-200', `${storeData.colors.primaryHex}22`); // Opacidade 13%
    root.style.setProperty('--p-300', `${storeData.colors.primaryHex}44`); // Opacidade 26%
    root.style.setProperty('--p-400', `${storeData.colors.primaryHex}77`); // Opacidade 46%
    root.style.setProperty('--p-500', storeData.colors.primaryHex);
    root.style.setProperty('--p-600', storeData.colors.primaryHex);
    root.style.setProperty('--p-700', storeData.colors.primaryHex);
    root.style.setProperty('--p-800', storeData.colors.primaryHex);
    root.style.setProperty('--p-900', storeData.colors.primaryHex);

    // Gerar paleta baseada na cor de destaque (accent)
    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-200', `${storeData.colors.accentHex}40`);
    root.style.setProperty('--a-300', `${storeData.colors.accentHex}70`);
    root.style.setProperty('--a-400', storeData.colors.accentHex);
    root.style.setProperty('--a-500', storeData.colors.accentHex);
    root.style.setProperty('--a-600', storeData.colors.accentHex);
    root.style.setProperty('--a-700', storeData.colors.accentHex);
    root.style.setProperty('--a-800', storeData.colors.accentHex);
    root.style.setProperty('--a-900', storeData.colors.accentHex);

    // Modificar dinamicamente o título do site no head
    document.title = `${storeData.name} — ${storeData.tagline}`;
    
    // Atualizar a meta tag description se houver
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', storeData.description);
  }, []);

  // Monitor de scroll para mudar aparência do Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Criação do link do WhatsApp personalizado
  const getWhatsAppLink = (messageText?: string) => {
    const defaultMsg = messageText || storeData.whatsappMessage;
    const encoded = encodeURIComponent(defaultMsg);
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encoded}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-accent-500 selection:text-white antialiased">
      
      {/* 1. HEADER (Navegação) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-slate-100 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center space-x-2">
              <span 
                className="text-2xl font-black tracking-tight transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--p-500)' }}
              >
                {storeData.name}
              </span>
            </a>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#produtos" className="text-sm font-medium hover:text-accent-500 transition-colors">Produtos & Serviços</a>
              <a href="#sobre" className="text-sm font-medium hover:text-accent-500 transition-colors">Quem Somos</a>
              <a href="#localizacao" className="text-sm font-medium hover:text-accent-500 transition-colors">Endereço</a>
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: 'var(--a-500)' }}
              >
                <Icon name="Phone" className="mr-2" size={16} />
                WhatsApp
              </a>
            </nav>

            {/* Hamburguer Button Mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-inner">
            <a 
              href="#produtos" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-50 transition-colors"
            >
              Produtos & Serviços
            </a>
            <a 
              href="#sobre" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-50 transition-colors"
            >
              Quem Somos
            </a>
            <a 
              href="#localizacao" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-50 transition-colors"
            >
              Endereço
            </a>
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white rounded-full"
              style={{ backgroundColor: 'var(--a-500)' }}
            >
              <Icon name="Phone" className="mr-2" size={18} />
              Chamar no WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
        {/* Elemento Decorativo SVG no Fundo */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <svg className="absolute right-0 top-0 w-1/2 h-full text-slate-100" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 100,100 0,100" />
          </svg>
          {/* Círculo abstrato colorido no fundo */}
          <div 
            className="absolute top-1/4 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
            style={{ backgroundColor: 'var(--p-500)' }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-48 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"
            style={{ backgroundColor: 'var(--a-500)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: 'var(--p-100)', color: 'var(--p-500)' }}
              >
                📍 Lagoa Nova - Natal/RN
              </div>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--p-500)' }}
              >
                {storeData.name}
              </h1>
              <p className="text-xl sm:text-2xl font-light text-slate-600 max-w-2xl mx-auto lg:mx-0">
                {storeData.tagline}
              </p>
              <p className="text-base text-slate-500 max-w-xl mx-auto lg:mx-0">
                {storeData.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: 'var(--a-500)' }}
                >
                  <Icon name="Phone" className="mr-2" size={20} />
                  Fazer Pedido / Orçamento
                </a>
                <a 
                  href="#produtos" 
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-all hover:scale-105"
                >
                  Conhecer Produtos
                </a>
              </div>
            </div>

            {/* Imagem/Elemento visual do Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                {/* Armação decorativa de fundo */}
                <div 
                  className="absolute inset-0 rounded-2xl transform rotate-3 scale-102 opacity-20 filter blur-sm"
                  style={{ backgroundColor: 'var(--p-500)' }}
                ></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                  <img 
                    src={storeData.products[0]?.imageUrl || storeData.aboutImage} 
                    alt={storeData.name}
                    className="w-full h-80 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-6 right-6 bg-green-550 text-white bg-emerald-500 font-bold px-3 py-1 rounded-full text-sm shadow-md animate-bounce">
                    Aberto agora!
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DIFERENCIAIS (FEATURES) */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-start p-6 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 group"
              >
                <div 
                  className="p-3 rounded-xl mr-4 text-white transition-all group-hover:scale-110"
                  style={{ backgroundColor: 'var(--p-500)' }}
                >
                  <Icon name={feature.iconName} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUTOS / SERVIÇOS */}
      <section id="produtos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--p-500)' }}
            >
              Nossa Vitrine Especial
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--a-500)' }}></div>
            <p className="text-lg text-slate-500">
              Explore uma seleção especial de nossos produtos e serviços. Peça o seu direto pelo WhatsApp de forma rápida e segura!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col group"
              >
                {/* Imagem do Produto */}
                {product.imageUrl && (
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-semibold">Orçamento instantâneo</span>
                    </div>
                  </div>
                )}

                {/* Corpo do Cartão */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span 
                        className="p-1.5 rounded-lg text-white"
                        style={{ backgroundColor: 'var(--p-400)' }}
                      >
                        <Icon name={product.iconName} size={16} />
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {product.price && (
                      <span className="text-base font-bold text-slate-700">{product.price}</span>
                    )}
                    <a 
                      href={getWhatsAppLink(`Olá, gostaria de saber mais sobre o produto: ${product.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--a-500)' }}
                    >
                      Solicitar
                      <Icon name="ChevronRight" className="ml-1" size={14} />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOBRE A LOJA */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Foto sobre */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src={storeData.aboutImage} 
                  alt="Quem somos"
                  className="w-full h-96 object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: 'var(--p-500)' }}
                ></div>
              </div>
            </div>

            {/* Conteúdo sobre */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Nossa História</span>
                <h2 
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--p-500)' }}
                >
                  Compromisso com você em Natal
                </h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {storeData.aboutText}
              </p>
              
              {/* Box de Credenciais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Icon name="Award" className="text-emerald-500" size={32} />
                  <div>
                    <h4 className="font-bold text-slate-800">100% Original</h4>
                    <p className="text-xs text-slate-500">Produtos com procedência e garantia.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Icon name="Users" className="text-blue-500" size={32} />
                  <div>
                    <h4 className="font-bold text-slate-800">Atendimento Humanizado</h4>
                    <p className="text-xs text-slate-500">Consultores prontos para te ajudar.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--p-500)' }}
            >
              Fale Conosco e Visite-nos
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--a-500)' }}></div>
            <p className="text-lg text-slate-500">
              Estamos localizados no coração de Lagoa Nova. Venha conhecer nossa loja física ou faça sua consulta online!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Informações de contato e Horários */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-md border border-slate-100 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Endereço</h4>
                      <p className="text-sm text-slate-500">{storeData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Telefone</h4>
                      <p className="text-sm text-slate-500">{storeData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-600">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Horário de Funcionamento</h4>
                      <div className="text-sm text-slate-500 space-y-1 mt-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3.5 text-base font-bold text-white rounded-full transition-all hover:scale-105 shadow-md"
                  style={{ backgroundColor: 'var(--a-500)' }}
                >
                  <Icon name="Phone" className="mr-2" size={18} />
                  Enviar Mensagem no WhatsApp
                </a>
                {storeData.googleMapsDirectionsUrl && (
                  <a 
                    href={storeData.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all hover:scale-105"
                  >
                    <Icon name="MapPin" className="mr-2 text-slate-500" size={18} />
                    Como Chegar (Google Maps)
                  </a>
                )}
              </div>

            </div>

            {/* Mapa Incorporado */}
            <div className="lg:col-span-7 h-96 lg:h-auto rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white p-2">
              {storeData.googleMapsEmbedUrl ? (
                <iframe 
                  src={storeData.googleMapsEmbedUrl}
                  className="w-full h-full rounded-xl border-0"
                  allowFullScreen={false}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da loja"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <span>Mapa indisponível</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Lado Esquerdo */}
            <div className="text-center md:text-left space-y-3">
              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {storeData.name}
              </span>
              <p className="text-sm max-w-sm mx-auto md:mx-0">
                {storeData.tagline}
              </p>
            </div>

            {/* Lado Direito / Social e Crédito */}
            <div className="text-center md:text-right space-y-4">
              <div className="flex items-center justify-center md:justify-end space-x-4">
                {storeData.instagramUrl && (
                  <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors hover:bg-slate-700">
                    <Icon name="Instagram" size={18} />
                  </a>
                )}
                {storeData.facebookUrl && (
                  <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors hover:bg-slate-700">
                    <Icon name="Facebook" size={18} />
                  </a>
                )}
              </div>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} {storeData.name}. Todos os direitos reservados.
              </p>
              <p className="text-xs text-slate-500">
                Desenvolvido com ❤️ por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
