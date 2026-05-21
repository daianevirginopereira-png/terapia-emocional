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
  Map
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
    uf: '',
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
      titulo: "Fase 01 – Vida Pessoal",
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
        "Colégio?",
        "Cônjuge?",
        "Identidade Sexual?",
        "Vida Sexual? Por quê?",
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
      titulo: "Fase 02 – Mental",
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
      titulo: "Fase 03 – Infância",
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
        "Ao dinheiro?",
        "Ao amor?",
        "Ao sexo?",
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
      titulo: "Fase 04 – Emocional",
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
    mensagem += `*Cidade/UF:* ${formData.cidade || "Não informada"} / ${formData.uf || "Não informada"}\n`;
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
    <div className="min-h-screen bg-[#FCF8F5] p-6 md:p-12 font-sans selection:bg-[#B08A78]/20 relative overflow-hidden">
      {/* Premium paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
      
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Header content card - BRANDING */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[3rem] shadow-sm p-12 flex flex-col items-center gap-10 border border-[#F1E4DC] overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FCF8F5] rounded-bl-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FCF8F5] rounded-tr-full opacity-50" />

          
          <div className="flex flex-col items-center text-center space-y-8 relative w-full pt-4">
            <h1 className="text-[#8B6D5C] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] leading-[1.3] max-w-3xl font-sans">
              Protocolo de Avaliação Terapêutica
            </h1>
            
            <div className="w-full max-w-3xl h-[1px] bg-[#F1E4DC]/70 my-4" />
          </div>
          
          <div className="w-full flex flex-col sm:flex-row items-center gap-6 justify-center px-4 z-10">
            <div className="flex items-center gap-5 bg-white p-5 px-8 rounded-[1.75rem] border border-[#F1E4DC]/80 shadow-[0_4px_15px_-3px_rgba(139,112,98,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-5px_rgba(139,112,98,0.06)] min-w-[260px] md:min-w-[280px]">
              <div className="w-12 h-12 bg-[#B08A78]/5 rounded-full flex items-center justify-center text-[#B08A78] shrink-0">
                <Activity size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#B08A78]/80">Documento</p>
                <p className="text-[14px] font-semibold text-[#8B6D5C]">Avaliação Individualizada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 bg-white p-5 px-8 rounded-[1.75rem] border border-[#F1E4DC]/80 shadow-[0_4px_15px_-3px_rgba(139,112,98,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-5px_rgba(139,112,98,0.06)] min-w-[260px] md:min-w-[280px]">
              <div className="w-12 h-12 bg-[#B08A78]/5 rounded-full flex items-center justify-center text-[#B08A78] shrink-0">
                <User size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#B08A78]/80">Responsável</p>
                <p className="text-[14px] font-semibold text-[#8B6D5C]">Terapeuta Miss. Daiane</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          
          {/* =========================
            IDENTIFICAÇÃO INICIAL
          ========================= */}
          <div className="bg-white rounded-[45px] p-12 md:p-16 shadow-[0_10px_50px_-12px_rgba(139,109,92,0.08)] border border-[#F1E4DC]/40 relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B08A78]/20 to-transparent" />
            
            <h2 className="text-[#8B6D5C] text-3xl font-display font-light italic tracking-wide mb-3">
              Identificação
            </h2>

            <p className="text-[#B08A78] font-sans font-light uppercase tracking-[0.4em] text-[10px] mb-12 opacity-80">
              Seus dados fundamentais para o acompanhamento
            </p>

            <style>{`
              .terapia-input {
                width: 100%;
                padding: 20px 28px;
                border-radius: 35px;
                border: 1px solid #F1E4DC;
                background: rgba(252, 248, 245, 0.3);
                font-size: 15px;
                outline: none;
                color: #8B6D5C;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: inherit;
              }
              .terapia-input:focus {
                border-color: #B08A78;
                background: #FFF;
                box-shadow: 0 15px 35px -12px rgba(176, 138, 120, 0.15);
              }
              .terapia-label {
                display: block;
                margin-bottom: 14px;
                color: #8B6D5C;
                font-weight: 500;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.3em;
                font-family: inherit;
                opacity: 0.8;
              }
              .terapia-btn-binary {
                padding: 14px 36px;
                border-radius: 50px;
                border: 1px solid #F1E4DC;
                background: transparent;
                color: #B08A78;
                font-weight: 500;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
              }
              .terapia-btn-binary:hover {
                border-color: #B08A78;
                background: rgba(176, 138, 120, 0.05);
              }
              .terapia-btn-binary.active {
                background: #B08A78;
                border-color: #B08A78;
                color: white;
                box-shadow: 0 10px 30px -8px rgba(176, 138, 120, 0.5);
              }
            `}</style>

            {/* DADOS PESSOAIS 1 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="md:col-span-2">
                <label className="terapia-label">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
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
                  placeholder="DD/MM/AAAA"
                  className="terapia-input"
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Estado Civil</label>
                <input
                  type="text"
                  placeholder="Seu estado civil"
                  className="terapia-input"
                  value={formData.estadoCivil}
                  onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <label className="terapia-label">Cidade</label>
                <input
                  type="text"
                  placeholder="Sua cidade"
                  className="terapia-input"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">UF</label>
                <input
                  type="text"
                  placeholder="Estado"
                  className="terapia-input"
                  value={formData.uf}
                  onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="terapia-label">Profissão</label>
                <input
                  type="text"
                  placeholder="Sua profissão"
                  className="terapia-input"
                  value={formData.profissao}
                  onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Empresa</label>
                <input
                  type="text"
                  placeholder="Onde trabalha"
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
                  placeholder="O que faz"
                  className="terapia-input"
                  value={formData.atividade}
                  onChange={(e) => setFormData({ ...formData, atividade: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Cargo</label>
                <input
                  type="text"
                  placeholder="Seu cargo"
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
                  placeholder="Sua religião"
                  className="terapia-input"
                  value={formData.religiao}
                  onChange={(e) => setFormData({ ...formData, religiao: e.target.value })}
                />
              </div>
              <div>
                <label className="terapia-label">Escolaridade</label>
                <input
                  type="text"
                  placeholder="Grau de instrução"
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
                  placeholder="Descreva brevemente..."
                  className="terapia-input"
                  style={{ borderRadius: "25px", resize: "none" }}
                  value={formData.queixaPrincipal}
                  onChange={(e) => setFormData({ ...formData, queixaPrincipal: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* =========================
            RENDERIZAÇÃO DAS ETAPAS
          ========================= */}
          {etapasAnamnese.map((etapa, etapaIndex) => (
            <motion.div
              key={etapaIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-10 md:p-14 mb-16 shadow-sm border border-[#F1E4DC]"
            >
              <h2
                className="text-[#8B6D5C] text-2xl md:text-3xl font-display font-semibold uppercase tracking-widest mb-10 text-center"
              >
                {etapa.titulo}
              </h2>

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

                  return (
                    <div key={perguntaIndex} className={isFullWidth ? "col-span-full" : ""}>
                      <label className="terapia-label mb-4 text-base leading-relaxed block">
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
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2"
                            >
                              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B08A78]/80 block mb-2">
                                {finalDetailQuestion}
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Digite o detalhe aqui..."
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
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <textarea
                          rows={label.includes("?") && !label.startsWith("Qual") ? 2 : 1}
                          placeholder="Digite aqui..."
                          value={respostas[perguntaOriginal] || ""}
                          onChange={(e) =>
                            setRespostas({
                              ...respostas,
                              [perguntaOriginal]: e.target.value
                            })
                          }
                          className="terapia-input"
                          style={{ borderRadius: "25px", resize: "none" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

            </motion.div>
          ))}

          {/* =========================
            MAPA EMOCIONAL COMPLETO
          ========================= */}
          <div className="bg-white rounded-[45px] p-12 md:p-16 shadow-[0_10px_50px_-12px_rgba(139,109,92,0.06)] border border-[#F1E4DC]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FCF8F5] rounded-bl-full opacity-50" />
            
            <h2 className="text-[#8B6D5C] text-3xl font-display font-light italic tracking-wide mb-3 relative z-10">
              Mapa Emocional
            </h2>

            <p className="text-[#B08A78] font-sans font-light uppercase tracking-[0.4em] text-[10px] mb-14 opacity-80 relative z-10">
              Autoavaliação da intensidade afetiva
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {emocoes.map((emocao) => (
                  <div
                    key={emocao}
                    className="group bg-[#FCF8F5]/30 border border-[#F1E4DC]/60 rounded-3xl p-6 transition-all hover:bg-white hover:shadow-[0_15px_35px_-10px_rgba(176,138,120,0.1)] hover:border-[#B08A78]/30"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-[#8B6D5C] font-sans font-medium text-[11px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                        {emocao}
                      </span>

                      <span className="bg-[#B08A78]/5 text-[#B08A78] px-3 py-1 rounded-lg font-display italic text-sm">
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
                      className="w-full h-1.5 bg-[#F1E4DC] rounded-full appearance-none cursor-pointer accent-[#B08A78]"
                    />
                  </div>
              ))}
            </div>
          </div>

          {/* =========================
            FINALIZAÇÃO / ACOLHIMENTO
          ========================= */}
          <div className="bg-[#FCF8F5] rounded-[50px] p-16 md:p-24 text-center relative overflow-hidden text-[#8B6D5C] border border-[#F1E4DC] shadow-[0_15px_50px_-15px_rgba(139,112,98,0.08)]">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#B08A78]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#B08A78]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <div className="w-16 h-px bg-[#B08A78]/25 mx-auto" />
              
              <h2 className="text-[#8B6D5C] text-4xl md:text-5xl font-display font-light italic tracking-tight leading-tight">
                Espaço de Acolhimento
              </h2>

              <p className="text-[#8B6D5C]/90 text-xl md:text-2xl leading-relaxed font-light italic font-serif">
                “Muitas vezes os traumas silenciosos deixam marcas profundas,
                mas nenhuma dor define quem você é. <br className="hidden md:block" />
                Existe cura para aquilo que por anos tentou sobreviver escondido dentro de você.”
              </p>

              <div className="space-y-4">
                <p className="text-[#B08A78] font-sans font-medium text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                  “Porque sou eu que conheço os planos que tenho para vocês,
                  diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano,
                  planos de dar-lhes esperança e um futuro.”
                </p>
                
                <div className="text-[10px] text-[#B08A78] font-sans font-bold uppercase tracking-[0.5em] opacity-60">
                  Jeremias 29:11
                </div>
              </div>

              <div className="w-16 h-px bg-[#B08A78]/25 mx-auto" />
            </div>
          </div>

          {/* =========================
            BOTÃO FINAL
          ========================= */}
          <div className="pb-24">
              <button
                onClick={enviarWhatsApp}
                className="w-full mt-12 p-8 rounded-[40px] bg-[#B08A78] text-white text-base md:text-lg font-sans font-medium uppercase tracking-[0.3em] cursor-pointer shadow-[0_15px_45px_rgba(176,138,120,0.25)] hover:bg-[#A37B67] transition-all hover:-translate-y-1 active:scale-[0.98] group flex items-center justify-center gap-4"
              >
                <div className="w-8 h-px bg-white/30 group-hover:w-12 transition-all" />
                Finalizar e Enviar Avaliação
                <div className="w-8 h-px bg-white/30 group-hover:w-12 transition-all" />
              </button>
          </div>
        </div>

      </div>

          <footer className="max-w-6xl mx-auto mt-12 pb-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-[#B08A78]/20" />
              <p className="text-[9px] md:text-[10px] font-sans font-light uppercase tracking-[0.8em] text-[#B08A78]/60">
                Miss. Daiane • Terapeuta Emocional • Protocolo de Avaliação
              </p>
              <div className="w-12 h-px bg-[#B08A78]/20" />
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
              background: #F1E4DC;
              border-radius: 10px;
            }
            input[type='range']:focus::-webkit-slider-runnable-track {
              background: #EAD8CF;
            }
            input[type='range']::-webkit-slider-thumb {
              height: 22px;
              width: 22px;
              border-radius: 50%;
              background: #B08A78;
              cursor: pointer;
              -webkit-appearance: none;
              margin-top: -8px;
              box-shadow: 0 4px 10px rgba(176, 138, 120, 0.3);
              border: 2px solid white;
            }
          `}</style>
    </div>
  );
}
