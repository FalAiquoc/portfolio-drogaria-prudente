import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo para Farmácia (Logo oficial ou Cruz Médica estilizada como fallback)
function Logo({ className = "h-10", dark = false }: { className?: string; dark?: boolean }) {
  const primaryColor = '#10b981'; // Verde Esmeralda
  const accentColor = '#06b6d4'; // Ciano
  const textColor = dark ? "#0F172A" : "#FFFFFF";

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {storeData.logoUrl ? (
        <img src={storeData.logoUrl} alt={storeData.name} className="h-8 w-auto object-contain rounded-full border border-emerald-500/10" />
      ) : (
        <svg className="h-full aspect-square" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g strokeLinecap="round" strokeLinejoin="round">
            <circle cx="100" cy="100" r="85" stroke={accentColor} strokeWidth="10" strokeDasharray="15 8" />
            <path d="M 100 40 L 100 160" stroke={primaryColor} strokeWidth="24" />
            <path d="M 40 100 L 160 100" stroke={primaryColor} strokeWidth="24" />
            <path d="M 75 75 Q 100 65 125 75" stroke={accentColor} strokeWidth="8" />
          </g>
        </svg>
      )}
      <div className="flex flex-col leading-[0.95] text-left font-display">
        <span className="text-lg font-black tracking-tight uppercase" style={{ color: textColor }}>DROGARIA</span>
        <span className="text-[13px] font-black tracking-[0.15em]" style={{ color: primaryColor }}>PRUDENTE</span>
        <span className="text-[7px] font-bold tracking-[0.1em] text-slate-400">SAÚDE E BEM-ESTAR</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Estados para a calculadora de descontos
  const [inputValue, setInputValue] = useState<string>('');
  const [membershipType, setMembershipType] = useState<string>('Comum');
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [savedAmount, setSavedAmount] = useState<number | null>(null);

  // Estados para o simulador de receita (upload)
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [recipeFile, setRecipeFile] = useState<File | null>(null);
  const [recipeSent, setRecipeSent] = useState<boolean>(false);

  // Filtro de Categorias de Medicamento
  const [activeCategory, setActiveCategory] = useState<string>('todos');

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

  // Drag and drop do simulador de receita
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setRecipeFile(e.dataTransfer.files[0]);
      setRecipeSent(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRecipeFile(e.target.files[0]);
      setRecipeSent(true);
    }
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
    root.style.setProperty('--p-50', '#f0fdf4');
    root.style.setProperty('--p-100', '#dcfce7');
    root.style.setProperty('--p-500', storeData.colors.primaryHex);
    root.style.setProperty('--p-600', '#059669');
    root.style.setProperty('--p-700', '#047857');
    root.style.setProperty('--p-800', '#064e3b');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex);

    document.title = `${storeData.name} — Saúde, Cuidado e Economia Real`;
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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* LETREIRO MARQUEE DESLIZANTE DE PROMOÇÃO E ALERTA DE ENTREGA */}
      <div className="bg-[#10b981] text-white text-[10px] font-black uppercase tracking-widest py-2.5 overflow-hidden relative z-50 border-b border-white/10">
        <div className="whitespace-nowrap flex space-x-12 animate-marquee">
          <span>⚡ ENTREGA RÁPIDA DE MEDICAMENTOS EM LAGOA NOVA EM ATÉ 30 MINUTOS!</span>
          <span>💊 GENÉRICOS COM ATÉ 90% DE DESCONTO COM RECEITA DO SUS OU CONVÊNIO!</span>
          <span>🩺 FARMACÊUTICO RESPONSÁVEL DE PLANTÃO DAS 07H ÀS 22H TODOS OS DIAS!</span>
          <span>⚡ ENTREGA RÁPIDA DE MEDICAMENTOS EM LAGOA NOVA EM ATÉ 30 MINUTOS!</span>
        </div>
      </div>

      {/* TOPBAR */}
      <div className="bg-slate-900 text-slate-400 text-xs py-2 border-b border-slate-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#10b981]" /> (84) 4141-4440</span>
            <span className="flex items-center gap-1.5"><Icon name="Activity" size={13} className="text-[#06b6d4]" /> Responsável Técnico: CRF/RN 3982</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#10b981]" /> Nossa Loja</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#calculadora" className="hover:text-white transition-colors font-bold text-slate-300">Simular Desconto</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-lg py-2 border-b border-slate-100' : 'top-0 sm:top-18 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" dark={scrolled || true} />
            </a>
            
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-slate-700">
              <a href="#receita" className="hover:text-[#10b981] transition-colors">Enviar Receita</a>
              <a href="#calculadora" className="hover:text-[#10b981] transition-colors">Calcular Desconto</a>
              <a href="#servicos" className="hover:text-[#10b981] transition-colors">Serviços Farma</a>
              <a href="#produtos" className="hover:text-[#10b981] transition-colors">Ofertas</a>
              <a href="#localizacao" className="hover:text-[#10b981] transition-colors">Nossa Loja</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#10b981] hover:bg-[#059669] transition-all shadow-md shadow-emerald-500/20">
                <Icon name="Phone" className="mr-2" size={14} /> WhatsApp Delivery
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:text-[#10b981] transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-300 text-sm font-semibold">
            <a href="#receita" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#10b981]">📋 Enviar Receita</a>
            <a href="#calculadora" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#10b981]">📊 Simular Desconto</a>
            <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#10b981]">🩺 Serviços Farma</a>
            <a href="#produtos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#10b981]">💊 Medicamentos em Oferta</a>
            <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-slate-800 hover:text-[#10b981]">📍 Onde Estamos</a>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#10b981] hover:bg-[#059669]">
              <Icon name="Phone" className="mr-2" size={16} /> WhatsApp Atendimento
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - Premium Bold Layout */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-56 md:pb-36 bg-gradient-to-br from-emerald-50/70 via-white to-cyan-50/30 overflow-hidden border-b-4 border-[#10b981]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[400px] h-[400px] rounded-full bg-[#10b981] filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] rounded-full bg-[#06b6d4] filter blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black tracking-widest uppercase border border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981]">
                💊 DROGARIA CONFIÁVEL EM LAGOA NOVA
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-[0.98] text-slate-900 uppercase">
                Sua saúde cuidada com <br />
                <span className="text-[#10b981] italic font-medium">economia de verdade.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {storeData.description} Envie a foto da sua receita no botão abaixo e faremos o orçamento no WhatsApp com entrega rápida em até 30 minutos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#receita" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-[#10b981] hover:bg-[#059669] transition-all shadow-lg hover:shadow-emerald-500/30">
                  <Icon name="Plus" className="mr-2" size={16} /> Enviar Receita Médica
                </a>
                <a href="#calculadora" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-700 border border-slate-300 hover:border-slate-800 hover:bg-slate-50 transition-all">
                  <Icon name="Activity" className="mr-2" size={16} /> Simulador de Descontos
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#10b981]/40 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-white p-3 border border-slate-200 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Atendimento Farmácia Moderna" 
                    className="w-full h-[400px] object-cover filter brightness-[0.95]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-slate-900/95 backdrop-blur-sm border-l-4 border-[#10b981] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#10b981] font-black">Entrega Expressa</p>
                    <p className="text-xs text-slate-300 font-light mt-0.5">Lagoa Nova e Parnamirim</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS PARCEIRAS / LABS */}
      <section className="py-10 bg-slate-900 border-y border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-500 font-bold mb-6">Laboratórios e Cosméticos Parceiros</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {storeData.brands?.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-wider text-slate-300 font-semibold italic border-b border-emerald-500/20 pb-1 group-hover:text-[#10b981] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS / CONFIANÇA EM SAÚDE */}
      <section className="py-8 bg-slate-950 border-b border-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none border border-emerald-500/20">
                <Icon name="Activity" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Acreditação ANVISA</h4>
              <p className="text-[10px] text-slate-400">Todos os alvarás regulatórios rigorosamente atualizados.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none border border-emerald-500/20">
                <Icon name="Heart" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Atenção Farmacêutica</h4>
              <p className="text-[10px] text-slate-400">Orientação presencial e no WhatsApp para o seu bem-estar.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none border border-emerald-500/20">
                <Icon name="Tag" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Desconto em Folha</h4>
              <p className="text-[10px] text-slate-400">Convênios corporativos com empresas públicas e privadas de Natal.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none border border-emerald-500/20">
                <Icon name="Truck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Delivery Farmácia</h4>
              <p className="text-[10px] text-slate-400">Motociclistas dedicados para entrega ágil de medicamentos.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none border border-emerald-500/20">
                <Icon name="ShieldCheck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Genéricos Certificados</h4>
              <p className="text-[10px] text-slate-400">Medicamentos intercambiáveis de laboratórios certificados.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULADOR DE ENVIO DE RECEITA (Diferencial interativo de Delivery) */}
      <section id="receita" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Atendimento ágil</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Orçamento de Receita <span className="text-[#10b981] italic font-medium">por WhatsApp</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Economize tempo. Tire uma foto nítida da receita médica do seu médico, anexe aqui e nós prepararemos o orçamento no seu WhatsApp em minutos.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-slate-200 rounded-none p-8 lg:p-12 shadow-sm max-w-3xl mx-auto">
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-none p-12 text-center transition-all ${
                dragActive ? "border-[#10b981] bg-emerald-500/5" : "border-slate-300 bg-white"
              }`}
            >
              <input
                type="file"
                id="recipe-upload"
                multiple={false}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,application/pdf"
              />
              
              <div className="space-y-4 flex flex-col items-center">
                <span className="p-4 bg-emerald-500/10 text-[#10b981] rounded-full">
                  <Icon name="Plus" size={32} />
                </span>
                
                {recipeSent && recipeFile ? (
                  <div className="space-y-2">
                    <p className="text-slate-800 font-bold text-sm">Receita selecionada: <span className="text-[#10b981]">{recipeFile.name}</span></p>
                    <p className="text-xs text-slate-500">Pronto para enviar no WhatsApp e cotar.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-slate-850 font-black text-sm uppercase tracking-wide">Arraste a foto da receita médica aqui</p>
                    <p className="text-xs text-slate-400 font-light">ou clique para selecionar do seu celular/computador (PDF ou Imagem)</p>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <label 
                    htmlFor="recipe-upload"
                    className="px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 text-center"
                  >
                    Selecionar Arquivo
                  </label>
                  
                  <a
                    href={getWhatsAppLink(`Olá! Gostaria de cotar a receita que acabo de separar no meu dispositivo. Nome da receita: ${recipeFile?.name || 'ReceitaMédica.jpg'}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-3 text-xs font-black uppercase tracking-wider text-white bg-[#10b981] hover:bg-[#059669] transition-all text-center ${
                      !recipeSent ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Chamar Farmacêutico e Cotar
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA DE DESCONTOS */}
      <section id="calculadora" className="py-24 bg-[#FAF9F6] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Simulador Farma</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Simulador de <span className="text-[#10b981] italic font-medium">Economia Real</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Veja a estimativa de desconto que você ganha nas compras de medicamentos ao fazer parte do nosso clube.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <form onSubmit={handleCalculateDiscount} className="space-y-6">
                <h3 className="text-base font-display font-black text-slate-900 uppercase border-b border-slate-200 pb-3 tracking-wider">Cálculo de Compra</h3>
                
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase">Preço Original do Medicamento (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 85.90"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-none border border-slate-300 bg-white focus:outline-none focus:border-[#10b981] text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase">Categoria de Desconto:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Comum', 'Fidelidade', 'Aposentado'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMembershipType(type)}
                        className={`py-3 text-xs font-bold transition-all border ${
                          membershipType === type
                            ? 'bg-[#10b981] text-white border-[#10b981]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#10b981]'
                        }`}
                      >
                        {type === 'Comum' ? 'Geral (10%)' : type === 'Fidelidade' ? 'Clube (18%)' : 'Aposentado (25%)'}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 text-xs font-black uppercase tracking-wider text-white bg-[#10b981] hover:bg-[#059669] transition-all">
                  Simular Preço de Atacado
                </button>
              </form>

              <div className="bg-[#FAF9F6] p-8 rounded-none border border-slate-200 shadow-inner flex flex-col justify-center space-y-6 min-h-[300px]">
                {discountedPrice !== null && savedAmount !== null ? (
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-emerald-500/10 rounded-none inline-block text-[#10b981] border border-emerald-500/25">
                      <Icon name="ShieldCheck" size={28} />
                    </div>
                    <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Resultado da Simulação</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">Preço Estimado com Desconto:</p>
                      <p className="text-4xl font-extrabold text-[#10b981]">R$ {discountedPrice.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 rounded-none border border-slate-200 inline-block text-xs">
                      Você economiza: <strong className="text-emerald-700">R$ {savedAmount.toFixed(2)}</strong> ({membershipType === 'Comum' ? '10%' : membershipType === 'Fidelidade' ? '18%' : '25%'} off)
                    </div>
                    <div className="pt-2">
                      <a href={getWhatsAppLink(`Olá, gostaria de reservar o medicamento que simulei com desconto. Preço final simulado: R$ ${discountedPrice.toFixed(2)}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#10b981] hover:text-[#059669]">
                        Reservar pelo WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 text-slate-400">
                    <Icon name="Activity" className="mx-auto text-slate-350" size={36} />
                    <p className="text-xs font-bold uppercase tracking-wide">Simulador Farma Ativo</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">Insira o valor do seu medicamento ao lado e escolha o desconto para calcular a economia.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS / CATEGORIAS */}
      <section id="produtos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Medicamentos e Conveniência</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Destaques e <span className="text-[#10b981] italic font-medium">Categorias</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Filtre pelos botões abaixo para navegar nas categorias disponíveis para entrega.
            </p>
          </div>

          {/* Abas de Categorias */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-12 border-b border-slate-200 pb-px">
            {[
              { id: 'todos', label: 'Ver Todos', icon: 'Sparkles' },
              { id: 'medicamento', label: 'Medicamentos / Genéricos', icon: 'Pill' },
              { id: 'dermocosmetico', label: 'Dermocosméticos', icon: 'Sparkles' },
              { id: 'vitamina', label: 'Suplementos & Vitaminas', icon: 'ShieldCheck' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 pb-4 px-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 relative border-b-2 ${
                  activeCategory === cat.id
                    ? 'text-[#10b981] border-[#10b981]'
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <Icon name={cat.icon} size={16} className={activeCategory === cat.id ? 'text-[#10b981]' : 'text-slate-400'} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products
              .filter(p => activeCategory === 'todos' || (p.category === activeCategory))
              .map((product) => (
                <div key={product.id} className="bg-[#FAF9F6] border border-slate-200 rounded-none overflow-hidden flex flex-col group hover:shadow-2xl hover:border-[#10b981]/50 transition-all duration-300 relative">
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#10b981] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                      {product.tag}
                    </span>
                  )}
                  
                  <div className="relative h-60 overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-[#10b981]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 border border-white">Orçar pelo WhatsApp</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-display font-extrabold text-slate-900 uppercase tracking-wide line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{product.description}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-black text-[#10b981] bg-emerald-500/5 border border-emerald-500/20 px-3 py-1">{product.price}</span>
                      <a href={getWhatsAppLink(`Olá, gostaria de fazer o pedido do item: ${product.name} (${product.price})`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#10b981] hover:bg-[#059669] transition-all border border-[#10b981]">
                        Pedir <Icon name="ChevronRight" className="ml-1" size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: SERVIÇOS FARMACÊUTICOS (WOW Factor) */}
      <section id="servicos" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#10b981] filter blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Assistência Farmacêutica</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase">
              Serviços de saúde <span className="text-[#10b981] italic font-medium">na loja</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Contamos com uma sala de atendimento dedicada (Consultório Farmacêutico) para serviços rápidos do dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#10b981] transition-all">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none inline-block border border-emerald-500/25">
                <Icon name="Activity" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Aferição de Pressão</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Acompanhamento e monitoramento periódico da pressão arterial realizado por profissionais habilitados.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#10b981] transition-all">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none inline-block border border-emerald-500/25">
                <Icon name="HeartPulse" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Bioimpedância & IMC</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Cálculo de gordura corporal, peso ideal e orientação para suplementação vitamínica com balança de última geração.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#10b981] transition-all">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none inline-block border border-emerald-500/25">
                <Icon name="Sparkles" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Aplicação de Injetáveis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Administração segura de injetáveis (medicamentos e vacinas) respeitando rigorosamente a prescrição do seu médico.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 space-y-4 hover:border-[#10b981] transition-all">
              <span className="p-3 bg-emerald-500/10 text-[#10b981] rounded-none inline-block border border-emerald-500/25">
                <Icon name="Pill" size={24} />
              </span>
              <h4 className="font-display font-black text-sm uppercase tracking-wide">Glicemia Capilar</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Teste rápido de nível de açúcar no sangue (glicose) com fitas estéreis e resultado imediato na hora.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS DE CLIENTES (WOW Factor) */}
      <section className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Quem compra, aprova</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              O que dizem nossos <span className="text-[#10b981] italic font-medium">clientes</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Veja a opinião de quem confia a saúde e os cuidados diários em nossa farmácia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#10b981] mb-4">
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Farmácia excelente. Sou aposentado e compro meus genéricos sempre aqui. O desconto de 25% deles me ajuda muito no orçamento. Atendimento dos rapazes é ótimo."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Seu Antônio" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Antônio Firmino</h4>
                  <span className="text-[10px] text-slate-400">Aposentado - Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#10b981] mb-4">
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Uso muito a entrega pelo WhatsApp. Só envio a foto da receita e eles trazem em menos de 20 minutos aqui em casa. Super prestativos, recomendo muito o delivery!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Juliana Costa" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Juliana Costa</h4>
                  <span className="text-[10px] text-slate-400">Arquiteta - Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-[#10b981] mb-4">
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
                <Icon name="Star" size={16} className="fill-[#10b981] text-[#10b981]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Faço bioimpedância na sala de saúde deles. Além disso, compro meus suplementos e colágenos importados sempre na Prudente, pois o preço é mais baixo que a concorrência."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Gabriela Melo" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Gabriela Melo</h4>
                  <span className="text-[10px] text-slate-400">Personal Trainer - Natal</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: FAQ INTERATIVO */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Perguntas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Perguntas <span className="text-[#10b981] italic font-medium">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Esclareça dúvidas rápidas sobre receitas controladas, entregas e programas de descontos.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Vocês fazem entrega de medicamentos controlados?",
                a: "Sim. De acordo com a regulamentação, para medicamentos de controle especial (receita azul, branca ou amarela), o motoboy retira a receita física em sua residência primeiro, valida no sistema e entrega o medicamento lacrado logo em seguida."
              },
              {
                q: "Qual a taxa de entrega e tempo para Lagoa Nova?",
                a: "A entrega para o bairro de Lagoa Nova é realizada em até 30 minutos, com taxa fixa reduzida (e frete cortesia nas compras de medicamentos de uso contínuo acima de R$ 80)."
              },
              {
                q: "Como participar do Clube de Desconto Fidelidade?",
                a: "A adesão é 100% gratuita. Basta informar seu CPF e telefone ao farmacêutico no WhatsApp ou no balcão da loja física para ter acesso imediato à tabela de até 18% em medicamentos normais e até 90% em genéricos parceiros."
              },
              {
                q: "Posso utilizar receitas do SUS ou convênios na farmácia?",
                a: "Sim, aceitamos receitas emitidas pelo SUS, postos de saúde de Natal, convênios parceiros, sindicatos e corporações. Temos parcerias que dão descontos adicionais em folha."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className="text-[#10b981]"
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Venha nos Visitar</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">Onde Estamos localizados</h2>
            <div className="w-16 h-1 bg-[#10b981] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Estamos situados no coração da Avenida Prudente de Morais com estacionamento privativo grátis e rampa de acessibilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-white p-8 rounded-none border border-slate-200 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-slate-900 uppercase tracking-wide">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-none text-slate-500">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Endereço da Farmácia</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-none text-slate-500">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Telefone Principal</h4>
                      <p className="text-xs text-slate-500 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-slate-50 rounded-none text-slate-500">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Horário de Funcionamento</h4>
                      <div className="text-xs text-slate-500 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#10b981] hover:bg-[#059669] transition-all">
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 bg-[#FAF9F6] border border-slate-200 hover:bg-slate-100 transition-all">
                  <Icon name="MapPin" className="mr-2 text-slate-500" size={16} /> Como Chegar (Google Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-none overflow-hidden border border-slate-200 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0" allowFullScreen={false} loading="lazy" title="Localização da Farmácia"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-450 py-16 border-t border-[#10b981]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Sobre a Drogaria</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossa Loja</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de falar sobre trabalhar na drogaria.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Atendimento</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#receita" className="hover:text-white transition-colors">Enviar receita médica</a></li>
                <li><a href="#calculadora" className="hover:text-white transition-colors">Simulador de desconto</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de tirar dúvidas sobre a farmácia popular.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Farmácia Popular</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#10b981]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#10b981]" /> Facebook</a></li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Pagamento</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">💳 Cartões</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">📄 Boleto</span>
                <span className="bg-slate-900 px-2.5 py-1.5 border border-slate-800 text-center text-slate-300">✍️ Crediário</span>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" />
              <p className="text-[10px] text-slate-500 font-light mt-2">
                © {new Date().getFullYear()} Drogaria Prudente – Lagoa Nova. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-slate-500 text-[9px] uppercase font-bold tracking-wider">
              <p>Farmacêutico Responsável: Dr. Roberto Sales - CRF/RN 3982</p>
              <p>Alvará Sanitário ANVISA: 2.25.109-8 | CRF Registo Nº 9122</p>
              <p>
                Desenvolvido por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors text-slate-400">
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
