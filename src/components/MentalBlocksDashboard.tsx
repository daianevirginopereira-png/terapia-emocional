import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Activity, 
  Clipboard,
  BarChart3,
  Save,
  BookOpen,
  Brain,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Target,
  Map,
  MessageCircle,
  Printer,
  Heart,
  Sparkles,
  Wind
} from 'lucide-react';

interface Emotion {
  nome: string;
  valor: number;
}


export default function MentalBlocksDashboard() {
  // --- State for Emotional Map ---
  const emocoes = [
    "RAIVA",
    "MEDO DE ALGO CONCRETO",
    "MEDOS VAGOS",
    "CULPA",
    "REVOLTA",
    "MEDO DE PERDER O CONTROLE",
    "TRISTEZA",
    "MÁGOA",
    "ORGULHO",
    "ÓDIO",
    "EGOÍSMO",
    "ANSIEDADE",
    "INTOLERÂNCIA",
    "SUBMISSÃO",
    "INDECISÃO",
    "DESESPERO",
    "DESÂNIMO",
    "COVARDIA",
    "EGOCENTRISMO",
    "CIÚME",
    "FRUSTRAÇÃO",
    "NOSTALGIA",
    "CANSAÇO",
    "IMPACIÊNCIA",
    "ANGÚSTIA",
    "TIMIDEZ",
    "APATIA",
    "RESSENTIMENTO",
    "SOLIDÃO",
    "AUTORITARISMO"
  ];

  const [emocional, setEmocional] = useState<Record<string, number>>(
    emocoes.reduce((acc, emocao) => ({ ...acc, [emocao]: 0 }), {})
  );


  // --- State for Client Data ---
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    estadoCivil: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    profissao: '',
    empresa: '',
    atividade: '',
    cargo: '',
    religiao: '',
    escolaridade: '',
    queixaPrincipal: ''
  });

  // --- State for Anamnese Answers ---
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  // --- State for Breathing Exercise ---
  const [isBreathingState, setIsBreathingState] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingSeconds, setBreathingSeconds] = useState(4);

  useEffect(() => {
    let interval: any = null;
    if (isBreathingState) {
      interval = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 4;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 4;
            } else {
              setBreathingPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingSeconds(4);
      setBreathingPhase('inhale');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingState, breathingPhase]);

  const etapasAnamnese = [
    {
      titulo: "Fase o1 – Vida Pessoal",
      perguntas: [
        // Relacionamento Conjugal / Estado Civil / Família Direta
        "É casado/a, solteiro/a ou divorciado/a?",
        "Se é divorciado/a, por qual motivo e como se sente?",
        "Como se sente e se tem alguma frustração em relação ao seu parceiro ou cônjuge?",
        "Como você se sente em sua casa, dentro do contexto familiar?",
        "Você se sente pertencendo ao Contexto Familiar? (Sim ou Não) Por quê?",
        
        // Filhos
        "Possui filhos? Se sim, quantos e como se sente/se tem frustrações em relação a eles?",

        // Trabalho / Profissão
        "Como você se sente no trabalho e se sente alguma frustração com sua profissão?",

        // Contextos Social e Religioso
        "Você se sente pertencendo ao Contexto Social? (Sim ou Não) Por quê?",
        "Você se sente pertencendo ao Contexto Religioso? (Sim ou Não) Por quê?",

        // Frustrações de Origem / Passado-Presente
        "Você sente frustração em relação a seus Pais ou Irmãos?",
        "Você sente frustração em relação ao período escolar ou colégio?",

        // Sexualidade e Saúde Íntima (ALL VERBATIM & INTACT)
        "Você sente frustração em relação à sua identidade sexual?",
        "Você sente frustração em relação à sua vida sexual? Por quê?",
        "Iniciou sua sexualidade com que idade?",
        "Como foi sua primeira vez? (Traumática, Normal, Boa ou Satisfatória)",
        "Tem tido algum problema em relação ao sexo?",
        "Atualmente sempre se realiza nas relações sexuais? (Sim ou Não)",
        "O sexo para você é algo: (Importante, Sem importância ou Muito importante)",

        // Saúde Física, Emocional e Hábitos / Vícios / Fobias
        "Possui algum trauma, fobia significativa ou medo de algo? (Sim ou Não) Qual?",
        "Usa drogas, bebidas alcoólicas ou é fumante? (Sim ou Não) Quais e com que frequência?",
        "Sofre de dores de cabeça ou insônia? (Sim ou Não) Com que frequência?",
        "Tem ideias suicidas? (Sim ou Não) Quais?",
        "Está grávida? (Sim ou Não) Quantas semanas?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 01:"
      ]
    },
    {
      titulo: "Fase o2 – Mental",
      perguntas: [
        // Saúde Mental, Acompanhamento e Tratamento
        "Qual o seu nível de stress? (Alto, Médio ou Baixo)",
        "Atualmente está tomando alguma medicação? (Sim ou Não) Qual?",
        "Já consultou algum tipo de psiquiatra ou psicólogo? (Sim ou Não) Se sim, foi diagnosticado/a?",

        // Relações Sociais e Lazer
        "Qual seu passatempo preferido e quantidade de amigos que possui?",

        // Autoimagem e Identidade frente ao Outro
        "Qual a principal a crença que as pessoas possuem em relação a você que mais se repete?",
        "Qual sua visão sobre você e o que mudaria em seu comportamento atual se pudesse?",
        "Você se considera feliz? (Sim ou Não) Por quê?",
        "Defina o que é a vida em apenas uma frase",

        // Alimentação de Pensamentos (Tipos de Pensamentos de si mesmo)
        "Quais tipos de pensamentos alimenta sobre si mesmo de forma geral e em relação à sua aparência física? (Positivos ou Negativos) Quais?",
        "Em relação a sua competência profissional? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua vida emocional? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua vida sexual? (Positivos ou Negativos) Quais exatamente?",
        "Quais pensamentos você costuma alimentar em relação ao seu passado e ao seu futuro? (Positivos ou Negativos) Quais?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 02:"
      ]
    },
    {
      titulo: "Fase o3 – Infância",
      perguntas: [
        // Relação com os Pais / Criação
        "Você foi criado pelos pais? (Sim ou Não)",
        "Como é sua relação com seu Pai e com sua Mãe?",
        "Com qual de seus pais tinha mais dificuldade de relacionamento e qual era o mais bravo? (Pai, Mãe ou Ambos)",
        "Seus pais foram agressivos com você ou usavam bebidas/drogas? (Sim ou Não)",

        // Dinâmica Conjugal dos Pais e Repetição de Padrões
        "Como você descreveria o relacionamento entre seus pais? (Excelente, Muito Bom, Bom, Regular ou Péssimo) Por quê?",
        "Que crenças você adquiriu com o relacionamento dos seus pais, e o que se repete ou você busca não repetir hoje?",

        // Família Ampliada e Socialização na Escola
        "Possui irmãos? (Não ou Sim – Quantos?) Como é sua relação com eles?",
        "Você foi uma criança introvertida ou extrovertida?",
        "Havia dificuldades de relacionamentos com os colegas do colégio? Se sim, cite-os.",

        // Medos, Perda e Tristeza na Infância
        "Era obrigado/a a fazer algo desagradável ou lembra-se de algo que o magoou muito/perdas na Infância? (Sim ou Não)",
        "O que te faz sentir tristeza ao relembrar do passado?",
        "Quando criança tinha medo de quê e quais eram seus maiores medos?",
        "Dormia com a luz acesa ou apagada? (Acesa ou Apagada)",
        "Relate algum fato marcante em sua infância",

        // Adolescência
        "Como foi sua adolescência e se teve fase de rebeldia? (Ruim, Boa ou Ótima)",

        // Filosofia e Tabus no Lar de Origem
        "Qual a filosofia da sua família em relação ao sucesso profissional e ao dinheiro?",
        "Qual a filosofia da sua família em relação ao amor e ao sexo?",

        // Modelos de Aprovação / Programas de Merecimento
        "O que era ser um bom menino/a e como deveria agir para ser amado/a e aceito/a?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 03 (Infância):"
      ]
    },
    {
      titulo: "Fase o4 – Emocional",
      perguntas: [
        // Autopercepção, Valor e Capacidade
        "O que você pensa a seu respeito e se considera vitorioso/a ou derrotado/a?",
        "Duvida de sua própria capacidade ou se sente de alguma forma inferior aos outros? (Sim ou Não) Por quê?",
        "Você é audacioso/a, corre atrás de suas metas, ou é auto-protetor/a? (Audacioso/a ou Auto-protetor/a)",

        // Vítima vs Responsável e Autossabotagem
        "Se você avaliasse sua atuação na vida, qual papel que mais caberia a você hoje? (Vítima ou Responsável)",
        "Qual o ganho secundário e em quais situações se coloca como vítima ou responsável?",

        // Defesas, Medos e Pressões Existenciais
        "Quais são seus maiores medos hoje?",
        "Sente-se de alguma forma pressionado/a na atualidade? (Sim ou Não) De que maneira?",
        "Existe algo que o/a faz sentir-se culpado/a? (Sim ou Não) O que exatamente?",

        // Dinâmicas de Relacionamento, Controle e Ressentimento
        "Como foi o seu primeiro relacionamento amoroso?",
        "Nos relacionamentos e na vida, você prefere ser: (Dominante ou Submisso) ou se acha uma pessoa controladora?",
        "Sente raiva ou rancor de alguém? (Não ou Sim – Quem?)",
        "Quem deve ser punido ou é o real culpado por problemas que ocorrem com você?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 04:"
      ]
    }
  ];

  const topEmocoes = useMemo(() => {
    return Object.entries(emocional)
      .map(([nome, valor]: [string, number]) => ({ nome, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);
  }, [emocional]);



  const imprimirProtocolo = () => {
    window.print();
  };

  const enviarWhatsApp = () => {
    let mensagem = `🌸 *ANAMNESE TERAPÊUTICA - MISS. DAIANE* 🌸\n\n`;

    // =========================
    // DADOS PESSOAIS
    // =========================
    mensagem += `👤 *DADOS PESSOAIS*\n\n`;
    mensagem += `*Nome:* ${formData.nome || "Não informado"}\n`;
    mensagem += `*Nascimento:* ${formData.nascimento || "Não informado"}\n`;
    mensagem += `*Estado Civil:* ${formData.estadoCivil || "Não informado"}\n`;
    mensagem += `*Endereço, Bairro, CEP, Cidade e Estado:* ${formData.endereco || "Não informado"}\n`;
    mensagem += `*Cargo / Profissão / Empresa / Atividade:* ${formData.profissao || "Não informado"}\n`;
    mensagem += `*Religião:* ${formData.religiao || "Não informada"}\n`;
    mensagem += `*Escolaridade:* ${formData.escolaridade || "Não informada"}\n\n`;
    mensagem += `*Queixa Principal:* ${formData.queixaPrincipal || "Não informada"}\n\n`;

    // =========================
    // RESPOSTAS DAS PERGUNTAS
    // =========================

    Object.keys(respostas).forEach((pergunta) => {
      if (pergunta.endsWith("_detalhe")) return;

      const respostaBase = respostas[pergunta];
      const detalhe = respostas[pergunta + "_detalhe"];

      if (respostaBase || detalhe) {
        if (respostaBase && detalhe) {
          mensagem += `*${pergunta}*\n👉 ${respostaBase} — ${detalhe}\n\n`;
        } else if (respostaBase) {
          mensagem += `*${pergunta}*\n👉 ${respostaBase}\n\n`;
        } else if (detalhe) {
          mensagem += `*${pergunta}*\n👉 ${detalhe}\n\n`;
        }
      }
    });

    // =========================
    // MAPA EMOCIONAL
    // =========================

    mensagem += `\n🧠 *MAPA EMOCIONAL*\n\n`;

    Object.keys(emocional).forEach((emocao) => {
      mensagem += `${emocao}: ${emocional[emocao]}/10\n`;
    });

    // =========================
    // WHATSAPP
    // =========================

    const numero = "556492726558";

    const url =
      `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // abre whatsapp
    window.open(url, "_blank");

    // alerta visual
    alert("Suas respostas foram enviadas com sucesso 💜");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F2] p-6 md:p-12 font-sans selection:bg-[#B48C7A]/15 relative overflow-hidden">
      {/* Premium paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header content card - BRANDING */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-12 pb-8 flex flex-col items-center gap-5 text-center select-none"
        >
          {/* Logo brand typography - Removed as requested */}

          {/* Protocol title */}
          <div className="flex flex-col items-center mt-3">
            <h1 className="text-[#766255] text-[20px] sm:text-[28px] md:text-[34px] font-extrabold font-sans uppercase tracking-[0.16em] sm:tracking-[0.22em] leading-tight max-w-4xl">
              PROTOCOLO DE AVALIAÇÃO
            </h1>
            <div className="mt-2.5 inline-block bg-[#EFE5DF] px-5 py-1.5">
              <span className="text-[#766255] text-[16px] sm:text-[22px] md:text-[26px] font-extrabold font-sans uppercase tracking-[0.22em] block leading-none">
                TERAPÊUTICO
              </span>
            </div>
          </div>
        </motion.div>



        {/* Therapy Importance Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#EAE1D5] shadow-[0_15px_45px_-15px_rgba(118,98,85,0.04)] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF0E6] rounded-full filter blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none" />
          <div className="p-4 bg-[#B48C7A]/10 rounded-full text-[#B48C7A] shrink-0">
            <Brain className="w-8 h-8" />
          </div>
          <div className="space-y-6 text-center md:text-left w-full font-sans">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#B48C7A]/10 text-[#B48C7A] font-sans font-bold text-[9px] uppercase tracking-[0.15em] mb-3 inline-block">
                Mapeamento e Cuidado Emocional
              </span>
              <h3 className="text-[#766255] text-lg sm:text-2xl font-bold uppercase tracking-[0.08em] leading-snug">
                A Importância da Psicoterapia
              </h3>
            </div>
            
            <p className="text-[#8C7667] text-sm leading-relaxed max-w-3xl">
              A <strong>terapia</strong> é importante porque ajuda a pessoa a compreender, reorganizar e aliviar emoções ligadas a traumas, medos, ansiedade, estresse e experiências difíceis da vida.
            </p>
            <p className="text-[#8C7667] text-sm leading-relaxed max-w-3xl">
              Muitas pessoas carregam dores emocionais por anos sem perceber o quanto isso afeta seus pensamentos, relacionamentos, autoestima e até a saúde física. A terapia auxilia no reprocessamento dessas emoções, permitindo que a mente deixe de reagir com tanto sofrimento diante de situações que antes causavam bloqueios, inseguranças ou crises emocionais.
            </p>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#EAE1D5]/60 my-6" />

            {/* Therapeutic Process Results Grid */}
            <div className="space-y-6 pt-2">
              <h4 className="text-[#766255] text-sm font-bold uppercase tracking-[0.12em] text-center md:text-left flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B48C7A]" />
                Entre os principais benefícios e resultados, destacam-se:
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Redução da ansiedade e do estresse emocional;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Melhora da autoestima e da autoconfiança;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Alívio de medos, traumas e lembranças dolorosas;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Mais equilíbrio emocional no dia a dia;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Melhora nos relacionamentos pessoais e familiares;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Sensação de leveza emocional e clareza mental;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Auxílio no controle de pensamentos negativos;
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-[#B48C7A]/15 rounded-lg text-[#B48C7A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#8C7667] text-[13.5px] leading-relaxed font-sans">
                    Mais disposição para viver, trabalhar e tomar decisões.
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#EAE1D5]/60 my-2" />

            <div className="space-y-3 pt-1 text-left font-sans">
              <p className="text-[#8C7667] text-[13.5px] leading-relaxed max-w-3xl">
                A terapia não apaga o passado, mas ajuda a pessoa a olhar para suas experiências de uma forma mais saudável e menos dolorosa. Muitas pessoas relatam que, após o processo terapêutico, conseguem dormir melhor, sentir mais paz interior e reagir às dificuldades com mais tranquilidade.
              </p>
              <p className="text-[#766255] text-[13.5px] font-semibold leading-relaxed max-w-3xl">
                Cuidar da saúde emocional é tão importante quanto cuidar da saúde física. Quando a mente encontra equilíbrio, a vida se torna mais leve, saudável e produtiva.
              </p>
            </div>
          </div>
        </motion.div>



        {/* Dynamic Peak Blockages Analysis Feed */}
        {Object.entries(emocional).filter(([_, val]) => val >= 5).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 border border-[#EAE1D5] shadow-[0_15px_40px_-15px_rgba(118,98,85,0.03)] no-print"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-[#EAE1D5]/60 mb-6">
              <div className="p-2.5 bg-[#B48C7A]/10 rounded-xl text-[#B48C7A]">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-[#766255] text-base font-bold uppercase tracking-[0.08em]">
                  Mapeador Ativo de Bloqueios de Tensão
                </h3>
                <p className="text-[10px] font-sans text-[#8C7667] uppercase tracking-wider font-semibold">
                  Sinalizadores de atenção com base nos níveis de intensidade que você indicou
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(emocional)
                .filter(([_, val]) => val >= 5)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([nome, valor]) => {
                  let reflexao = "Indica uma força ou bloqueio em processamento emocional. Útil trazer para a sessão e investigar as origens conjugais ou de criação familiar.";
                  const uNome = nome.toUpperCase();
                  if (uNome.includes("RAIVA") || uNome.includes("REVOLTA") || uNome.includes("ÓDIO")) {
                    reflexao = "Reflete proteção emocional ativa ou inconformidade com limites invadidos no passado. Direcionadora para compreender mágoas da infância.";
                  } else if (uNome.includes("MEDO") || uNome.includes("ANSIEDADE") || uNome.includes("COVARDIA") || uNome.includes("ANGÚSTIA")) {
                    reflexao = "Aponta para um estado de alerta crônico do sistema de defesa. Comum em históricos escolares desfavoráveis ou lares com filosofias de cobrança extremas.";
                  } else if (uNome.includes("CULPA") || uNome.includes("AUTORITARISMO") || uNome.includes("ORGULHO")) {
                    reflexao = "Indica excessivo senso de responsabilidade ou autocrítica. Relaciona-se com a necessidade precoce de obter aprovação dos pais.";
                  } else if (uNome.includes("TRISTEZA") || uNome.includes("MÁGOA") || uNome.includes("RESSENTIMENTO") || uNome.includes("SOLIDÃO") || uNome.includes("APATIA")) {
                    reflexao = "Demonstra sentimentos dolorosos retidos que requerem acolhimento. Excelente ponto de partida para liberar o merecimento e curar cicatrizes do passado.";
                  } else if (uNome.includes("SUBMISSÃO") || uNome.includes("INDECISÃO")) {
                    reflexao = "Sinaliza repressão do eu autêntico para agradar e pertencer à família ou parceiros. Trabalhar limites saudáveis no autocuidado.";
                  } else if (uNome.includes("FRUSTRAÇÃO") || uNome.includes("CANSAÇO")) {
                    reflexao = "Evidencia sobrecarga física e exaustão emocional acumulada por carregar papéis de vítima ou salvador de ciclos alheios.";
                  }

                  return (
                    <div key={nome} className="p-5 rounded-2xl bg-[#FAF6F2]/70 border border-[#EAE1D5]/50 hover:border-[#B48C7A]/20 transition-all text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans font-bold text-[11px] text-[#766255] uppercase tracking-wider">
                          {nome}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#B48C7A] text-white font-mono font-bold text-xs">
                          {valor}/10
                        </span>
                      </div>
                      <p className="text-[#8C7667] text-xs leading-relaxed font-sans mt-1">
                        {reflexao}
                      </p>
                    </div>
                  );
                })}
            </div>
            
            <p className="text-[10px] text-center text-[#8C7667]/80 italic font-sans mt-5">
              * Nota clínica: Este mapeamento indica inclinações atuais e serve de bússola para apoiar a Miss Daiane no direcionamento preciso do seu tratamento.
            </p>
          </motion.div>
        )}

        {/* Main Content Sections */}
        <div className="space-y-12">
          
          {/* =========================
            IDENTIFICAÇÃO INICIAL
          ========================= */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_15px_45px_-15px_rgba(118,98,85,0.04)] border border-[#EAE1D5] mb-12 relative overflow-hidden">
            <div className="flex justify-between items-baseline mb-8 pb-6 border-b border-[#EAE1D5]/60">
              <h2 className="text-[#766255] text-xl sm:text-2xl font-bold font-sans uppercase tracking-[0.08em]">
                Dados Pessoais
              </h2>
            </div>

            <style>{`
              .terapia-input {
                width: 100%;
                padding: 16px 24px;
                border-radius: 20px;
                border: 1px solid #E5D3C5;
                background: #FFFFFF;
                font-size: 15px;
                outline: none;
                color: #766255;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: inherit;
              }
              .terapia-input::placeholder {
                color: #C7B4A6;
                opacity: 0.65;
              }
              .terapia-input:focus {
                border-color: #B48C7A;
                background: #FFFFFF;
                box-shadow: 0 10px 25px -10px rgba(180, 140, 122, 0.25);
              }
              .terapia-label {
                display: block;
                margin-bottom: 9px;
                color: #766255;
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                font-family: inherit;
              }
              .terapia-btn-binary {
                padding: 14px 36px;
                border-radius: 50px;
                border: 1px solid #EAE1D5;
                background: #FFFFFF;
                color: #B48C7A;
                font-weight: 700;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
              }
              .terapia-btn-binary:hover {
                border-color: #B48C7A;
                background: rgba(180, 140, 122, 0.05);
              }
              .terapia-btn-binary.active {
                background: #B48C7A;
                border-color: #B48C7A;
                color: white;
                box-shadow: 0 10px 30px -8px rgba(180, 140, 122, 0.4);
              }

              @media print {
                body {
                  background: #FFFFFF !important;
                  background-image: none !important;
                  color: #33221A !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                .no-print {
                  display: none !important;
                }
                .print-avoid-break {
                  page-break-inside: avoid !important;
                  break-inside: avoid !important;
                }
                .terapia-input {
                  border: none !important;
                  border-bottom: 1px dashed #B48C7A !important;
                  border-radius: 0 !important;
                  padding: 4px 0 !important;
                  background: transparent !important;
                  color: #33221A !important;
                  box-shadow: none !important;
                  font-size: 14px !important;
                  height: auto !important;
                  min-height: unset !important;
                  resize: none !important;
                }
                .terapia-btn-binary {
                  border: 1px solid #766255 !important;
                  border-radius: 6px !important;
                  padding: 4px 12px !important;
                  font-size: 11px !important;
                  background: #FFFFFF !important;
                  color: #766255 !important;
                  box-shadow: none !important;
                }
                .terapia-btn-binary.active {
                  background: #B48C7A !important;
                  color: #FFFFFF !important;
                  border-color: #B48C7A !important;
                  font-weight: bold !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                .bg-white {
                  background: #FFFFFF !important;
                  border: 1px solid #EAE1D5 !important;
                  box-shadow: none !important;
                  border-radius: 12px !important;
                  padding: 1.5rem !important;
                  margin-bottom: 1.5rem !important;
                }
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            `}</style>

            {/* DADOS PESSOAIS 1 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="md:col-span-2">
                <label className="terapia-label">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="terapia-label">Data de Nascimento</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Estado Civil</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.estadoCivil}
                  onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="terapia-label">Endereço, Bairro, CEP, Cidade e Estado</label>
                <input
                  type="text"
                  placeholder="Seu endereço completo, bairro, CEP, cidade e estado..."
                  className="terapia-input"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="terapia-label">Profissão, Empresa, Atividade e Cargo</label>
                <input
                  type="text"
                  placeholder="Sua profissão, empresa onde trabalha, ramo de atividade e cargo/função..."
                  className="terapia-input"
                  value={formData.profissao}
                  onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="terapia-label">Religião</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.religiao}
                  onChange={(e) => setFormData({ ...formData, religiao: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Escolaridade</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.escolaridade}
                  onChange={(e) => setFormData({ ...formData, escolaridade: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8 mb-8">
              <div>
                <label className="terapia-label">Queixa Principal – O que te trouxe até aqui?</label>
                <textarea
                  rows={4}
                  placeholder="Sua resposta detalhada..."
                  className="terapia-input"
                  style={{ borderRadius: "20px", resize: "none" }}
                  value={formData.queixaPrincipal}
                  onChange={(e) => setFormData({ ...formData, queixaPrincipal: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* =========================
            RENDERIZAÇÃO DAS ETAPAS
          ========================= */}
          {etapasAnamnese.map((etapa, etapaIndex) => {
            const isEtapaRespondida = etapa.perguntas.some(p => {
              const ans = respostas[p];
              const det = respostas[p + "_detalhe"];
              return (ans && ans.trim() !== "") || (det && det.trim() !== "");
            });

            return (
              <motion.div
                key={etapaIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_15px_45px_-15px_rgba(118,98,85,0.04)] border border-[#EAE1D5] mb-12 relative overflow-hidden ${!isEtapaRespondida ? 'print:hidden' : ''}`}
              >
                <div className="flex justify-between items-baseline mb-8 pb-6 border-b border-[#EAE1D5]/60">
                  <h2 className="text-[#766255] text-xl sm:text-2xl font-bold font-sans uppercase tracking-[0.08em]">
                    {etapa.titulo}
                  </h2>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
                {etapa.perguntas.map((perguntaOriginal, perguntaIndex) => {
                  const optionsMatch = perguntaOriginal.match(/\(([^)]+)\)/);
                  const showOptions = optionsMatch && (
                    perguntaOriginal.includes("Sim ou Não") || 
                    perguntaOriginal.includes("Traumática") || 
                    perguntaOriginal.includes("Importante") || 
                    perguntaOriginal.includes("Alto, Médio") ||
                    perguntaOriginal.includes("Positivos ou Negativos") ||
                    perguntaOriginal.includes("Não ou Sim") ||
                    perguntaOriginal.includes("Acesa ou Apagada") ||
                    perguntaOriginal.includes("Ruim, Boa") ||
                    perguntaOriginal.includes("Pai, Mãe") ||
                    perguntaOriginal.includes("Vítima ou Responsável") ||
                    perguntaOriginal.includes("Dominante ou Submisso") ||
                    perguntaOriginal.includes("Excelente") ||
                    perguntaOriginal.includes("Audaciosa(o)") ||
                    perguntaOriginal.includes("Audacioso/a")
                  );

                  const label = perguntaOriginal.split(' (')[0];

                  // Extract detail question if any (e.g., text after closing parenthesis)
                  const lastCloseParenIndex = perguntaOriginal.lastIndexOf(')');
                  let detailQuestion = "";
                  if (lastCloseParenIndex !== -1) {
                    detailQuestion = perguntaOriginal.substring(lastCloseParenIndex + 1).trim();
                  }

                  // Also check for embedded details inside option string like (Não ou Sim – Quantos?)
                  const rawOptionString = optionsMatch ? optionsMatch[1] : "";
                  let extractedDetailSuffix = "";
                  if (rawOptionString.includes("–") || rawOptionString.includes("-")) {
                    const parts = rawOptionString.split(/[–-]/);
                    if (parts.length > 1) {
                      extractedDetailSuffix = parts[1].trim();
                    }
                  }

                  const finalDetailQuestion = detailQuestion || extractedDetailSuffix;

                  // Clean options array
                  const options = showOptions 
                    ? rawOptionString.split(/ ou |, /).map(o => {
                        const parts = o.split(/[–-]/);
                        return parts[0].trim();
                      }) 
                    : [];

                  const selectedOption = respostas[perguntaOriginal] || "";

                  // Show detail input always for all option questions
                  const shouldShowDetailInput = true;
                  const detailInputLabel = finalDetailQuestion || "Por quê?";

                  // Determine if the question should be full width
                  const isFullWidth = !showOptions || label.length > 60 || shouldShowDetailInput;
                  const hasResponse = (respostas[perguntaOriginal] && respostas[perguntaOriginal].trim() !== "") || 
                                     (respostas[perguntaOriginal + "_detalhe"] && respostas[perguntaOriginal + "_detalhe"].trim() !== "");

                  return (
                    <div 
                      key={perguntaIndex} 
                      className={`${isFullWidth ? "col-span-full" : ""} ${!hasResponse ? "print:hidden" : "print-avoid-break"}`}
                    >
                      <label className="text-[#766255] font-bold text-xs sm:text-[13px] tracking-[0.08em] uppercase block mb-4 leading-relaxed">
                        {label}
                      </label>

                      {showOptions ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-wrap gap-4">
                            {options.map((option) => {
                              const cleanOption = option.trim();
                              const isSelected = selectedOption === cleanOption;
                              return (
                                <button
                                  key={cleanOption}
                                  onClick={() => setRespostas({ ...respostas, [perguntaOriginal]: cleanOption })}
                                  className={`terapia-btn-binary ${isSelected ? 'active' : ''}`}
                                >
                                  {cleanOption}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#766255] block mb-2 opacity-95">
                              {detailInputLabel}
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Sua resposta detalhada..."
                              value={respostas[perguntaOriginal + "_detalhe"] || ""}
                              onChange={(e) =>
                                setRespostas({
                                  ...respostas,
                                  [perguntaOriginal + "_detalhe"]: e.target.value
                                })
                              }
                              className="terapia-input"
                              style={{ borderRadius: "20px", resize: "none" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <textarea
                          rows={label.length > 50 ? 3 : 2}
                          placeholder="Sua resposta detalhada..."
                          value={respostas[perguntaOriginal] || ""}
                          onChange={(e) =>
                            setRespostas({
                              ...respostas,
                              [perguntaOriginal]: e.target.value
                            })
                          }
                          className="terapia-input"
                          style={{ borderRadius: "20px", resize: "none" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

            </motion.div>
          );
        })}

          {/* =========================
            MAPA EMOCIONAL COMPLETO
          ========================= */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_15px_45px_-15px_rgba(118,98,85,0.04)] border border-[#EAE1D5] mb-12 relative overflow-hidden">
            <div className="flex justify-between items-baseline mb-8 pb-6 border-b border-[#EAE1D5]/60">
              <h2 className="text-[#766255] text-xl sm:text-2xl font-bold font-sans uppercase tracking-[0.08em]">
                Mapa Emocional
              </h2>
              <span className="text-[#B48C7A] font-semibold text-[10px] tracking-[0.15em] uppercase">
                {emocoes.length} Emoções
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {emocoes.map((emocao) => (
                  <div
                    key={emocao}
                    className="group bg-[#FAF6F2]/50 border border-[#EAE1D5]/40 rounded-2xl p-5 transition-all hover:bg-white hover:shadow-[0_15px_35px_-10px_rgba(180,140,122,0.1)] hover:border-[#B48C7A]/30"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#766255] font-sans font-bold text-[11px] uppercase tracking-[0.14em] opacity-90 group-hover:opacity-100 transition-opacity">
                        {emocao}
                      </span>

                      <span className="bg-[#B48C7A]/5 text-[#B48C7A] px-3 py-1 rounded-lg font-mono font-semibold text-xs transition-colors group-hover:bg-[#B48C7A]/10">
                        {emocional?.[emocao] || 0}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={emocional?.[emocao] || 0}
                      onChange={(e) =>
                        setEmocional({
                          ...emocional,
                          [emocao]: Number(e.target.value)
                        })
                      }
                      className="w-full h-1.5 bg-[#EAE1D5] rounded-full appearance-none cursor-pointer accent-[#B48C7A] print:hidden"
                    />

                    {/* Barra de progresso para impressão */}
                    <div className="hidden print:block w-full bg-[#EAE1D5] h-2 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-[#B48C7A] h-2 rounded-full" 
                        style={{ width: `${(emocional?.[emocao] || 0) * 10}%` }}
                      />
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* =========================
            FINALIZAÇÃO / ACOLHIMENTO
          ========================= */}
          <div className="bg-[#F5ECE3]/60 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden text-[#766255] border border-[#EAE1D5] shadow-[0_15px_45px_-15px_rgba(118,98,85,0.03)]">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            <motion.div 
              animate={{ 
                x: [-12, 12, -12],
                y: [-8, 12, -8],
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-24 -left-24 w-64 h-64 bg-[#B48C7A]/5 rounded-full blur-3xl" 
            />
            <motion.div 
              animate={{ 
                x: [12, -12, 12],
                y: [8, -12, 8],
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#B48C7A]/5 rounded-full blur-3xl" 
            />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="w-16 h-px bg-[#B48C7A]/25 mx-auto" />

              <div className="space-y-4">
                <p className="text-[#654e41] font-sans font-medium text-base md:text-lg leading-relaxed max-w-xl mx-auto italic">
                  “Porque sou eu que conheço os planos que tenho para vocês,
                  diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano,
                  planos de dar-lhes esperança e um futuro.”
                </p>
                
                <div className="text-xs text-[#766255] font-sans font-bold uppercase tracking-wider opacity-90">
                  Jeremias 29:11
                </div>
              </div>

              <div className="w-16 h-px bg-[#B48C7A]/25 mx-auto" />
            </div>
          </div>

          {/* =========================
            BOTÕES FINAIS (Salvar como PDF/Imprimir & Enviar no WhatsApp)
          ========================= */}
          <div className="pb-24 max-w-2xl mx-auto relative flex flex-col items-center gap-6 no-print">
              {/* Harmonic Breathing Aura Rings behind the button panel */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                <motion.div
                  className="absolute w-80 h-32 rounded-full bg-[#B48C7A]/10 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="w-full relative z-10 max-w-md">
                
                {/* Botão: WhatsApp */}
                <motion.button
                  onClick={enviarWhatsApp}
                  className="w-full py-5 px-6 sm:px-8 rounded-full bg-[#B48C7A] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wide cursor-pointer flex items-center justify-center gap-3 select-none relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    backgroundColor: "#A07865",
                    y: -2,
                    boxShadow: "0px 15px 30px rgba(160, 120, 101, 0.35)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    boxShadow: [
                      "0px 6px 15px rgba(180, 140, 122, 0.15)",
                      "0px 12px 28px rgba(180, 140, 122, 0.3)",
                      "0px 6px 15px rgba(180, 140, 122, 0.15)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Glowing shimmer sweep animation */}
                  <motion.div 
                    className="absolute top-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{
                      left: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                    style={{ width: "30%" }}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: [1, 1.15, 1, 1.15, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                    className="shrink-0"
                  >
                    <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  </motion.div>
                  <span className="font-bold tracking-wider text-white">Enviar no WhatsApp</span>
                </motion.button>
              </div>

              <p className="text-xs text-[#766255] font-semibold tracking-wide text-center mt-2 max-w-lg">
                💡 <b>Dica:</b> Você pode enviar suas respostas diretamente para o WhatsApp da Miss. Daiane clicando no botão acima.
              </p>
          </div>
        </div>

      </div>

          <footer className="max-w-6xl mx-auto mt-12 pb-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-[#B48C7A]/40" />
              <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#766255]">
                Miss. Daiane • Terapeuta Emocional • Protocolo de Avaliação
              </p>
              <div className="w-12 h-px bg-[#B48C7A]/40" />
            </div>
          </footer>

          <style>{`
            input[type='range'] {
              -webkit-appearance: none;
              background: transparent;
            }
            input[type='range']::-webkit-slider-runnable-track {
              width: 100%;
              height: 6px;
              cursor: pointer;
              background: #EAE1D5;
              border-radius: 10px;
            }
            input[type='range']:focus::-webkit-slider-runnable-track {
              background: #DCD0C4;
            }
            input[type='range']::-webkit-slider-thumb {
              height: 22px;
              width: 22px;
              border-radius: 50%;
              background: #B48C7A;
              cursor: pointer;
              -webkit-appearance: none;
              margin-top: -8px;
              box-shadow: 0 4px 10px rgba(180, 140, 122, 0.3);
              border: 2px solid white;
            }
          `}</style>
    </div>
  );
}
