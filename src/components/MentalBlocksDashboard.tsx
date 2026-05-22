import React, { useState, useMemo } from 'react';
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
  Printer
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
    cidade: '',
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

  const etapasAnamnese = [
    {
      titulo: "Fase o1 – Vida Pessoal",
      perguntas: [
        "É casado/a, solteiro/a ou divorciado/a?",
        "Se é divorciado/a, por qual motivo e como se sente?",
        "Número de filhos:",
        "Como é o seu relacionamento com seus filhos?",
        "Como você se sente em seu relacionamento com seu/sua parceiro/a?",
        "Como você se sente em sua casa, dentro do contexto familiar?",
        "Como você se sente no seu trabalho?",
        "Você se sente pertencendo ao Contexto Familiar? (Sim ou Não)",
        "Por quê? (Contexto Familiar)",
        "Você se sente pertencendo ao Contexto Social? (Sim ou Não)",
        "Por quê? (Contexto Social)",
        "Você se sente pertencendo ao Contexto Religioso? (Sim ou Não)",
        "Por quê? (Contexto Religioso)",
        "Você sente frustração em relação a Pais?",
        "Você sente frustração em relação a Irmãos?",
        "Você sente frustração em relação a Filhos?",
        "Você sente frustração em relação a Profissão?",
        "Você sente frustração em relação ao período escolar ou colégio?",
        "Você sente frustração em relação ao seu cônjuge ou parceiro?",
        "Você sente frustração em relação à sua identidade sexual?",
        "Você sente frustração em relação à sua vida sexual? Por quê?",
        "Iniciou sua sexualidade com que idade?",
        "Como foi sua primeira vez? (Traumática, Normal, Boa ou Satisfatória)",
        "Tem tido algum problema em relação ao sexo?",
        "Atualmente sempre se realiza nas relações sexuais? (Sim ou Não)",
        "O sexo para você é algo: (Importante, Sem importância ou Muito importante)",
        "Algum trauma? (Sim ou Não) Qual?",
        "Alguma fobia? (Sim ou Não) Qual?",
        "Tem medo de alguma coisa? (Sim ou Não) De quê?",
        "Usa drogas? (Sim ou Não) Quais?",
        "Dores de cabeça? (Sim ou Não) Com que frequência?",
        "Insônia? (Sim ou Não) Com que frequência?",
        "Tem ideias suicidas? (Sim ou Não) Quais?",
        "Usa bebidas alcoólicas? (Sim ou Não) Com que frequência?",
        "É fumante? (Sim ou Não)",
        "Está grávida? (Sim ou Não) Quantas semanas?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 01:"
      ]
    },
    {
      titulo: "Fase o2 – Mental",
      perguntas: [
        "Qual o seu nível de stress? (Alto, Médio ou Baixo)",
        "Atualmente está tomando alguma medicação? (Sim ou Não) Qual?",
        "Algum trauma? (Sim ou Não) Qual?",
        "Já consultou algum tipo de psiquiatra ou psicólogo? (Sim ou Não)",
        "Se sim, foi diagnosticado/a? (Sim ou Não)",
        "Qual a quantidade de amigos que você tem?",
        "Qual seu passatempo preferido?",
        "Qual a principal a crença que as pessoas possuem em relação a você que mais se repete?",
        "Você se considera feliz? (Sim ou Não) Por quê?",
        "Se você pudesse mudar alguma coisa em você, no seu modo de ser, ou agir, ou no seu comportamento atual, o que mudaria?",
        "Defina o que é a vida em apenas uma frase",
        "Quais são os tipos de pensamentos que você costuma alimentar em relação a si mesmo/a, de uma maneira geral? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua aparência física? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua competência profissional? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua vida emocional? (Positivos ou Negativos) Quais exatamente?",
        "Em relação a sua vida sexual? (Positivos ou Negativos) Quais exatamente?",
        "Em relação ao seu passado? (Positivos ou Negativos) Quais exatamente?",
        "Em relação ao seu futuro? (Positivos ou Negativos) Quais exatamente?",
        "Qual sua visão sobre você?",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 02:"
      ]
    },
    {
      titulo: "Fase o3 – Infância",
      perguntas: [
        "Você foi criado pelos pais? (Sim ou Não)",
        "Como é sua relação com seu Pai?",
        "Como é sua relação com sua Mãe?",
        "Seus pais foram agressivos com você? (Sim ou Não)",
        "Qual deles era o mais bravo? (O Pai ou A Mãe)",
        "Usavam bebidas ou drogas? (Sim ou Não)",
        "Como você descreveria o relacionamento entre seus pais? (Excelente, Muito Bom, Bom, Regular ou Péssimo) Por quê?",
        "Quais os aspectos deste relacionamento que se assemelham, ou se repetem em sua vida hoje?",
        "Quais as características deste relacionamento, que você se mantém determinado/a a não repetir? Por quê?",
        "Quanto ao relacionamento de seus pais responda: Qual a crença que você adquiriu em relação a relacionamentos?",
        "Na infância, era obrigado/a a fazer alguma coisa que lhe desagradava? (Sim ou Não)",
        "Lembra-se de alguma coisa que o magoou muito na Infância? (Sim ou Não)",
        "Teve perdas familiares ou de amigos na Infância? (Sim ou Não)",
        "O que te faz sentir tristeza ao relembrar do passado?",
        "Quando criança tinha medo of que?",
        "Dormia com a luz acesa ou apagada? (Acesa ou Apagada)",
        "Como foi sua adolescência? (Ruim, Boa ou Ótima)",
        "Teve fase de rebeldia na adolescência? (Sim ou Não)",
        "Com qual de seus pais você tinha mais dificuldade de relacionamento? (Pai, Mãe ou Ambos)",
        "Qual a Filosofia de sua família em relação ao sucesso profissional?",
        "Qual a Filosofia de sua família em relação ao dinheiro?",
        "Qual a Filosofia de sua família em relação ao amor?",
        "Qual a Filosofia de sua família em relação ao sexo?",
        "O que era para você, ser um/a bom/boa menino/a? Descreva.",
        "Como você deveria agir, ou ser para ser amado/a?",
        "Possui irmãos? (Não ou Sim – Quantos?)",
        "Como é sua relação com eles?",
        "Você foi uma criança introvertida ou extrovertida?",
        "Havia dificuldades de relacionamentos com os colegas do colégio? Se sim, cite-os.",
        "Quais eram seus maiores medos na infância?",
        "Relate algum fato marcante em sua infância",
        "Relate detalhes sobre traumas ou bloqueios desta Fase 03 (Infância):"
      ]
    },
    {
      titulo: "Fase o4 – Emocional",
      perguntas: [
        "Quais são seus maiores medos hoje?",
        "O que você pensa a seu respeito?",
        "Como foi o seu primeiro relacionamento amoroso?",
        "Se você avaliasse sua atuação na vida, qual papel que mais caberia a você hoje? (Vítima ou Responsável)",
        "Qual o ganho secundário?",
        "Em quais situações você desempenha o papel de vítima?",
        "Em quais situações você desempenha o papel de responsável?",
        "Se considera vitorioso/a ou derrotado/a?",
        "Nos relacionamentos e na vida, você prefere ser: (Dominante ou Submisso)",
        "Quem deve ser punido por problemas que ocorrem com você? OU Quem é o culpado por seus problemas pessoais?",
        "Sente raiva ou rancor de alguém? (Não ou Sim – Quem?)",
        "Sente-se de alguma forma pressionado/a na atualidade? (Sim ou Não) De que maneira?",
        "Você se acha uma pessoa controladora? (Sim ou Não)",
        "Sente-se de alguma forma inferior aos outros? (Sim ou Não) Por quê?",
        "Duvida de sua própria capacidade? (Sim ou Não)",
        "Você é audacioso/a, corre atrás de suas metas, ou é auto-protetor/a, preferindo se poupar dos eventuais riscos? (Audacioso/a ou Auto-protetor/a)",
        "Existe algo que o/a faz sentir-se culpado/a? (Sim ou Não) O que exatamente?",
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

  const enviarWhatsApp = () => {
    let mensagem = `🌸 *ANAMNESE TERAPÊUTICA - MISS. DAIANE* 🌸\n\n`;

    // =========================
    // DADOS PESSOAIS
    // =========================
    mensagem += `👤 *DADOS PESSOAIS*\n\n`;
    mensagem += `*Nome:* ${formData.nome || "Não informado"}\n`;
    mensagem += `*Nascimento:* ${formData.nascimento || "Não informado"}\n`;
    mensagem += `*Estado Civil:* ${formData.estadoCivil || "Não informado"}\n`;
    mensagem += `*Cidade:* ${formData.cidade || "Não informada"}\n`;
    mensagem += `*Profissão:* ${formData.profissao || "Não informada"}\n`;
    mensagem += `*Empresa:* ${formData.empresa || "Não informada"}\n`;
    mensagem += `*Atividade:* ${formData.atividade || "Não informada"}\n`;
    mensagem += `*Cargo:* ${formData.cargo || "Não informado"}\n`;
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

      if (respostaBase) {
        mensagem += `*${pergunta}*\n👉 ${respostaBase}`;
        if (detalhe) {
          mensagem += ` — ${detalhe}`;
        }
        mensagem += `\n\n`;
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
          className="py-16 flex flex-col items-center gap-4 text-center select-none"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-[#766255] text-[20px] sm:text-[30px] md:text-[38px] font-extrabold font-sans uppercase tracking-[0.16em] sm:tracking-[0.22em] leading-tight max-w-4xl">
              PROTOCOLO DE AVALIAÇÃO
            </h1>
            <div className="mt-3 inline-block bg-[#EFE5DF] px-5 py-1.5">
              <span className="text-[#766255] text-[18px] sm:text-[26px] md:text-[32px] font-extrabold font-sans uppercase tracking-[0.22em] block leading-none">
                TERAPÊUTICO
              </span>
            </div>
          </div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#A08C80] uppercase mt-2">
            Miss. Daiane • Terapeuta Emocional
          </p>
          <div className="w-16 h-[1.5px] bg-[#EAE1D5] mt-6" />
        </motion.div>

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

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="md:col-span-2">
                <label className="terapia-label">Cidade</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="terapia-label">Profissão</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.profissao}
                  onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Empresa</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="terapia-label">Atividade</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.atividade}
                  onChange={(e) => setFormData({ ...formData, atividade: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Cargo</label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="terapia-input"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
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

                  // Show detail input if there's a detail question, and an option has been chosen
                  // except we don't demand "Qual" details for a negative "Não" choice (unless the detail contains "por que" or "por quê")
                  const shouldShowDetailInput = finalDetailQuestion.length > 0 && selectedOption && (
                    selectedOption.toLowerCase() !== "não" || 
                    finalDetailQuestion.toLowerCase().includes("por que") || 
                    finalDetailQuestion.toLowerCase().includes("por quê")
                  );

                  // Determine if the question should be full width
                  const isFullWidth = !showOptions || label.length > 60 || finalDetailQuestion.length > 0;
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

                          {shouldShowDetailInput && (
                            <div className="mt-2">
                              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#766255] block mb-2 opacity-95">
                                {finalDetailQuestion}
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
                          )}
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
              
              <h2 className="text-[#766255] text-3xl md:text-4xl font-display font-light italic uppercase tracking-wide leading-tight">
                Espaço de Acolhimento
              </h2>

              <p className="text-[#766255]/85 text-lg md:text-xl leading-relaxed font-light italic font-serif">
                “Muitas vezes os traumas silenciosos deixam marcas profundas,
                mas nenhuma dor define quem você é. <br className="hidden md:block" />
                Existe cura para aquilo que por anos tentou sobreviver escondido dentro de você.”
              </p>

              <div className="space-y-4">
                <p className="text-[#B48C7A] font-sans font-medium text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                  “Porque sou eu que conheço os planos que tenho para vocês,
                  diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano,
                  planos de dar-lhes esperança e um futuro.”
                </p>
                
                <div className="text-[10px] text-[#B48C7A] font-sans font-bold uppercase tracking-wider opacity-60">
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

              <div className="w-full relative z-10 flex justify-center">
                
                {/* Botão Único: WhatsApp */}
                <motion.button
                  onClick={enviarWhatsApp}
                  className="w-full py-5 px-8 sm:px-12 rounded-full bg-[#B48C7A] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wide cursor-pointer flex items-center justify-center gap-3 select-none relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.04,
                    backgroundColor: "#A07865",
                    y: -2,
                    boxShadow: "0px 18px 36px rgba(160, 120, 101, 0.4)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    boxShadow: [
                      "0px 8px 20px rgba(180, 140, 122, 0.2)",
                      "0px 15px 35px rgba(180, 140, 122, 0.4)",
                      "0px 8px 20px rgba(180, 140, 122, 0.2)"
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
                  <span className="font-bold tracking-wider text-white">Enviar Resultados no WhatsApp</span>
                </motion.button>
              </div>

              <p className="text-[10px] text-[#A08C80] font-medium tracking-wide text-center opacity-80 mt-1 max-w-sm">
                💡 <b>Dica:</b> Ao clicar neste botão, você iniciará o envio das respostas preenchidas diretamente para o WhatsApp da Miss. Daiane.
              </p>
          </div>
        </div>

      </div>

          <footer className="max-w-6xl mx-auto mt-12 pb-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-[#B48C7A]/20" />
              <p className="text-[9px] md:text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-[#B48C7A]/70">
                Miss. Daiane • Terapeuta Emocional • Protocolo de Avaliação
              </p>
              <div className="w-12 h-px bg-[#B48C7A]/20" />
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
