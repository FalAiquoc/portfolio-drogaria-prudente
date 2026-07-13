import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Estados para a calculadora de descontos
  const [inputValue, setInputValue] = useState<string>('');
  const [membershipType, setMembershipType] = useState<string>('Comum');
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [savedAmount, setSavedAmount] = useState<number | null>(null);

  // Lógica da calculadora de descontos
  const handleCalculateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const originalPrice = parseFloat(inputValue);
    if (isNaN(originalPrice) || originalPrice <= 0) return;

    let discountPercentage = 0.10; // 10% padrão
    if (membershipType === 'Aposentado') discountPercentage = 0.25; // 25% para aposentados
    if (membershipType === 'Fidelidade') discountPercentage = 0.18; // 18% para clube fidelidade

    const saved = originalPrice * discountPercentage;
    const finalPrice = originalPrice - saved;

    setSavedAmount(saved);
    setDiscountedPrice(finalPrice);
  };

  // Injeção de fontes e cores
  useEffect(() => {
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

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Cores da Farmácia
    root.style.setProperty('--p-50', '#f0fdf4'); // Verde Menta Suave
    root.style.setProperty('--p-100', '#dcfce7');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Verde Principal
    root.style.setProperty('--p-600', '#059669');
    root.style.setProperty('--p-700', '#047857');
    root.style.setProperty('--p-800', '#064e3b');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Ciano/Azul

    document.title = `${storeData.name} — Saúde e Desconto em Natal`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-250 selection:text-emerald-900">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="p-2 bg-emerald-500 text-white rounded-xl">
                <Icon name="HeartPulse" size={22} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                Drogaria<span className="text-emerald-600 font-extrabold">Prudente</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#calculadora" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Simulador de Desconto</a>
              <a href="#servicos" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Serviços</a>
              <a href="#produtos" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Medicamentos</a>
              <a href="#localizacao" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Contato</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all hover:scale-105 shadow-md shadow-emerald-500/10">
                <Icon name="Phone" className="mr-2" size={16} /> Enviar Receita
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-gradient-to-br from-emerald-50/70 via-white to-cyan-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-250">
                💚 Cuidado Integral & Preço Popular
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.08]" style={{ fontFamily: 'var(--font-display)' }}>
                Sua saúde em primeiro lugar, com <span className="text-emerald-500 block">economia garantida!</span>
              </h1>
              <p className="text-lg text-slate-600 font-light max-w-xl mx-auto lg:mx-0">
                {storeData.description} Envie sua receita via WhatsApp e receba no conforto de sua casa com taxa de entrega reduzida em Lagoa Nova.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                  <Icon name="Phone" className="mr-2" size={20} /> Pedir pelo WhatsApp
                </a>
                <a href="#calculadora" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all">
                  <Icon name="Activity" className="mr-2" size={20} /> Calcular Desconto
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 transform rotate-3 scale-102 filter blur-sm"></div>
                <div className="relative bg-white p-4 rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                  <img src={storeData.aboutImage} alt="Farmácia Moderna" className="w-full h-80 object-cover rounded-2xl" />
                  <div className="absolute top-8 right-8 bg-emerald-500 text-white font-bold px-4 py-1 rounded-full text-xs shadow-md uppercase">
                    Plantão Ativo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA DE DESCONTOS */}
      <section id="calculadora" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Simulador de <span className="text-emerald-500">Descontos Especiais</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">
              Veja o valor estimado de economia que você terá nas compras de medicamentos e genéricos ao participar dos nossos convênios e planos de fidelidade.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Form de Simulação */}
              <form onSubmit={handleCalculateDiscount} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800">Insira os dados da sua compra:</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600">Preço Original do Medicamento (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 120.00"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600">Categoria de Benefício:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Comum', 'Fidelidade', 'Aposentado'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMembershipType(type)}
                        className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
                          membershipType === type
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-500'
                        }`}
                      >
                        {type === 'Comum' ? 'Geral (10%)' : type === 'Fidelidade' ? 'Clube (18%)' : 'Aposentado (25%)'}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 font-bold shadow-md shadow-emerald-500/10 transition-all hover:scale-102">
                  Simular Desconto
                </button>
              </form>

              {/* Resultado da Simulação */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-inner flex flex-col justify-center space-y-6 min-h-[300px]">
                {discountedPrice !== null && savedAmount !== null ? (
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-emerald-500/10 rounded-full inline-block text-emerald-600 mb-2">
                      <Icon name="ShieldCheck" size={32} />
                    </div>
                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Economia Simulada com Sucesso</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">Preço Final com Desconto:</p>
                      <p className="text-4xl font-extrabold text-emerald-600">R$ {discountedPrice.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl inline-block border border-slate-100">
                      <p className="text-xs text-slate-500">
                        Você economiza: <strong className="text-emerald-700">R$ {savedAmount.toFixed(2)}</strong> ({membershipType === 'Comum' ? '10%' : membershipType === 'Fidelidade' ? '18%' : '25%'} de desconto)
                      </p>
                    </div>
                    <div className="pt-2">
                      <a href={getWhatsAppLink(`Olá, gostaria de reservar o medicamento que simulei com desconto. Preço final simulado: R$ ${discountedPrice.toFixed(2)}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-500 hover:underline">
                        Garantir este preço no WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 text-slate-400">
                    <Icon name="Activity" className="mx-auto text-slate-300" size={48} />
                    <p className="text-sm font-medium">Insira o valor da compra ao lado para calcular o seu desconto instantaneamente.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS / SERVIÇOS */}
      <section id="servicos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Serviços Farma <span className="text-emerald-500">Especializados</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">Mais que uma farmácia, somos um posto avançado de cuidado para a sua saúde diária.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl inline-block mb-4 transition-transform group-hover:scale-110">
                  <Icon name={feature.iconName} size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section id="produtos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Destaques e <span className="text-emerald-500">Categorias</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">Confira alguns de nossos principais produtos. Medicamentos e cosméticos com preços excelentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 bg-emerald-500/10 text-emerald-800 px-3 py-1 rounded-full">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de fazer o pedido do item: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all">
                      Pedir
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Fale Conosco</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Localização</h4>
                      <p className="text-sm text-slate-500">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Telefone e Delivery</h4>
                      <p className="text-sm text-slate-500">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-lg text-slate-500">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">Horário de Atendimento</h4>
                      <div className="text-sm text-slate-500 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all shadow-md shadow-emerald-500/10">
                  <Icon name="Phone" className="mr-2" size={18} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all">
                  <Icon name="MapPin" className="mr-2 text-slate-500" size={18} /> Como Chegar
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full rounded-2xl border-0" allowFullScreen={false} loading="lazy" title="Localização da Farmácia"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Drogaria<span className="text-emerald-500">Prudente</span>
              </span>
              <p className="text-xs text-slate-500 max-w-sm mx-auto md:mx-0">
                {storeData.tagline}
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} Drogaria Prudente. Todos os direitos reservados.
              </p>
              <p className="text-xs text-slate-500">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
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
