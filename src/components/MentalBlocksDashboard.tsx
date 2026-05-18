import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Activity, 
  Clipboard,
  BarChart3,
  Save
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
        "É casada (o), solteira (o) ou divorciada (o)?",
        "Se é divorciada (o), por qual motivo e como se sente?",
        "Número de filhos:",
        "Como é o seu relacionamento com seus filhos?",
        "Como você se sente em seu relacionamento com sua parceira (o)?",
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
        "Se sim, foi diagnosticada (o)? (Sim ou Não)",
        "Qual a quantidade de amigos que você tem?",
        "Qual seu passatempo preferido?",
        "Qual a principal a crença que as pessoas possuem em relação a você que mais se repete?",
        "Você se considera feliz? (Sim ou Não) Por quê?",
        "Se você pudesse mudar alguma coisa em você, no seu modo de ser, ou agir, ou no seu comportamento atual, o que mudaria?",
        "Defina o que é a vida em apenas uma frase",
        "Quais são os tipos de pensamentos que você costuma alimentar em relação a si mesma (o), de uma maneira geral? (Positivos ou Negativos) Quais exatamente?",
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
        "Quais as características deste relacionamento, que você se mantém determinada (o) a não repetir? Por quê?",
        "Quanto ao relacionamento de seus pais responda: Qual a crença que você adquiriu em relação a relacionamentos?",
        "Na infância, era obrigada (o) a fazer alguma coisa que lhe desagradava? (Sim ou Não)",
        "Lembra-se de alguma coisa que o magoou muito na Infância? (Sim ou Não)",
        "Teve perdas familiares ou de amigos na Infância? (Sim ou Não)",
        "O que te faz sentir tristeza ao relembrar do passado?",
        "Quando criança tinha medo de que?",
        "Dormia com a luz acesa ou apagada? (Acesa ou Apagada)",
        "Como foi sua adolescência? (Ruim, Boa ou Ótima)",
        "Teve fase de rebeldia na adolescência? (Sim ou Não)",
        "Com qual de seus pais você tinha mais dificuldade de relacionamento? (Pai, Mãe ou Ambos)",
        "Qual a Filosofia de sua família em relação ao sucesso profissional?",
        "Ao dinheiro?",
        "Ao amor?",
        "Ao sexo?",
        "O que era para você, ser uma boa (bom) menina (o)? Descreva.",
        "Como você deveria agir, ou ser para ser amada (o)?",
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
        "Se considera vitoriosa(o) ou derrotada(o)?",
        "Nos relacionamentos e na vida, você prefere ser: (Dominante ou Submisso)",
        "Quem deve ser punido por problemas que ocorrem com você? OU Quem é o culpado por seus problemas pessoais?",
        "Sente raiva ou rancor de alguém? (Não ou Sim – Quem?)",
        "Sente-se de alguma forma pressionada (o) na atualidade? (Sim ou Não) De que maneira?",
        "Você se acha uma pessoa controladora? (Sim ou Não)",
        "Sente-se de alguma forma inferior aos outros? (Sim ou Não) Por quê?",
        "Duvida de sua própria capacidade? (Sim ou Não)",
        "Você é audaciosa (o), corre atrás de suas metas, ou é auto protetor(a), preferindo se poupar dos eventuais riscos? (Audaciosa(o) ou Auto protetor(a))",
        "Existe algo que a(o) faz sentir-se culpada(o)? (Sim ou Não) O que exatamente?",
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
      mensagem += `*${pergunta}*\n${respostas[pergunta] || "Não respondeu"}\n\n`;
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
    <div className="min-h-screen bg-[#FDF8F6] p-4 md:p-8 font-sans selection:bg-[#B08A78]/20 relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* LOGO ORIGINAL */}
        <div className="flex justify-center items-center mt-10 mb-[30px]">
          <img
            src="https://raw.githubusercontent.com/virginiostudiodesign/TERAPIA-EMOCIONAL/main/logo.png"
            alt="Miss Daiane"
            className="w-[420px] max-w-[90%] object-contain"
          />
        </div>
        
        {/* Header content card - BRANDING */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[3rem] shadow-sm p-12 flex flex-col items-center gap-8 border border-[#F1E4DC] overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8F1ED] rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F8F1ED] rounded-tr-full" />

          <div className="flex flex-col items-center text-center space-y-6 relative">
            <h1 className="text-[#8B6D5C] text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider leading-tight max-w-5xl">
              Protocolo de Avaliação Terapêutica
            </h1>
            <div className="flex items-center gap-6 py-2">
              <div className="h-px w-12 bg-[#B08A78]/30" />
              <p className="text-[#A67C65] text-sm font-black uppercase tracking-[0.3em]">Miss. Daiane</p>
              <div className="h-px w-12 bg-[#B08A78]/30" />
            </div>
          </div>
          
          <div className="w-full flex flex-wrap items-center gap-8 justify-center border-t border-[#F1E4DC] pt-8 px-4">
            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-3xl border border-[#F1E4DC] backdrop-blur-sm">
              <div className="w-10 h-10 bg-[#9A7B68]/5 rounded-full flex items-center justify-center text-[#9A7B68]">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#B08A78] opacity-70">Documento</p>
                <p className="text-xs font-bold text-[#9A7B68]">Avaliação Individualizada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-3xl border border-[#F1E4DC] backdrop-blur-sm">
              <div className="w-10 h-10 bg-[#B08A78]/5 rounded-full flex items-center justify-center text-[#B08A78]">
                <User size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#B08A78] opacity-70">Responsável</p>
                <p className="text-xs font-bold text-[#9A7B68]">Terapeuta Miss. Daiane</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-10">
          
          {/* =========================
            IDENTIFICAÇÃO INICIAL
          ========================= */}
          <div className="bg-white rounded-[35px] p-10 shadow-sm border border-[#F1E4DC] mb-10">
            <h2
              className="text-[#8B6D5C] text-2xl font-black uppercase tracking-widest mb-4"
            >
              Identificação
            </h2>

            <p
              className="text-[#A67C65] font-bold uppercase tracking-wide text-xs mb-10 opacity-80"
            >
              Preencha seus dados pessoais abaixo
            </p>

            <style>{`
              .terapia-input {
                width: 100%;
                padding: 18px 24px;
                border-radius: 30px;
                border: 1px solid #F1E4DC;
                background: #FFF;
                font-size: 16px;
                outline: none;
                color: #333;
                transition: all 0.3s ease;
              }
              .terapia-input:focus {
                border-color: #B08A78;
                box-shadow: 0 0 0 4px rgba(176, 138, 120, 0.1);
              }
              .terapia-label {
                display: block;
                margin-bottom: 12px;
                color: #8B6D5C;
                font-weight: 800;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .terapia-btn-binary {
                padding: 10px 30px;
                min-width: 100px;
                border-radius: 50px;
                border: 1px solid #EAD8CF;
                background: #FFF;
                color: #B08A78;
                font-weight: 800;
                font-size: 13px;
                text-transform: uppercase;
                transition: all 0.2s ease;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .terapia-btn-binary.active {
                background: #F8F1ED;
                border-color: #B08A78;
                color: #B08A78;
                box-shadow: 0 4px 15px rgba(176, 138, 120, 0.15);
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
                  type="date"
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
                className="text-[#8B6D5C] text-2xl md:text-3xl font-black uppercase tracking-widest mb-10 text-center"
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
                    perguntaOriginal.includes("Audaciosa(o)")
                  );

                  const label = perguntaOriginal.split(' (')[0];
                  const options = showOptions ? optionsMatch[1].split(/ ou |, /) : [];

                  // Determine if the question should be full width
                  const isFullWidth = !showOptions || label.length > 60;

                  return (
                    <div key={perguntaIndex} className={isFullWidth ? "col-span-full" : ""}>
                      <label className="terapia-label mb-6 text-base leading-relaxed">
                        {label}
                      </label>

                      {showOptions ? (
                        <div className="flex flex-wrap gap-4">
                          {options.map((option) => {
                            const cleanOption = option.trim();
                            const isSelected = respostas[perguntaOriginal] === cleanOption;
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
          <div
            style={{
              marginTop: "50px",
              background: "white",
              padding: "50px",
              borderRadius: "40px",
              border: "1px solid #F1E4DC"
            }}
          >
            <h2
              className="text-[#8B6D5C] text-3xl font-black uppercase tracking-widest mb-4"
            >
              Mapa Emocional
            </h2>

            <p
              className="text-[#A67C65] font-bold uppercase tracking-wide text-sm mb-12 opacity-80"
            >
              Avalie a intensidade de cada emoção de 0 a 10
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(300px,1fr))",
                gap: "22px"
              }}
            >
              {emocoes.map((emocao) => (
                  <div
                    key={emocao}
                    style={{
                      background: "#FFF",
                      border: "1px solid #F1E4DC",
                      borderRadius: "25px",
                      padding: "22px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px"
                      }}
                    >
                      <span
                        style={{
                          color: "#9A7B68",
                          fontWeight: "900",
                          fontSize: "14px",
                          letterSpacing: "1px"
                        }}
                      >
                        {emocao}
                      </span>

                      <span
                        style={{
                          background: "#F8F1ED",
                          color: "#B08A78",
                          padding: "4px 12px",
                          borderRadius: "10px",
                          fontWeight: "800",
                          fontSize: "13px"
                        }}
                      >
                        {emocional?.[emocao] || 0}/10
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
                      style={{
                        width: "100%",
                        accentColor: "#B08A78",
                        cursor: "pointer"
                      }}
                    />
                  </div>
              ))}
            </div>
          </div>
          {/* =========================
            FINALIZAÇÃO / ACOLHIMENTO
          ========================= */}
          <div
            style={{
              marginTop: "60px",
              padding: "50px",
              borderRadius: "40px",
              background: "white",
              textAlign: "center",
              border: "1px solid #F1E4DC"
            }}
          >
            <h2
              className="text-[#8B6D5C] text-2xl md:text-3xl font-black uppercase tracking-widest mb-8"
            >
              Mensagem de Acolhimento
            </h2>

            <p
              className="text-[#A67C65] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium italic"
            >
              “Muitas vezes os traumas silenciosos deixam marcas profundas,
              mas nenhuma dor define quem você é.
              Existe cura para aquilo que por anos tentou sobreviver escondido dentro de você.”
            </p>

            <div
              className="mt-10 text-[#8B6D5C] font-semibold text-lg md:text-xl leading-relaxed opacity-90"
            >
              “Porque sou eu que conheço os planos que tenho para vocês,
              diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano,
              planos de dar-lhes esperança e um futuro.”
              
              <div className="mt-6 font-black uppercase tracking-widest text-sm">
                Jeremias 29:11
              </div>
            </div>
          </div>

          {/* =========================
            BOTÃO FINAL
          ========================= */}
          <div className="pb-20">
              <button
                onClick={enviarWhatsApp}
                className="w-full mt-12 p-6 rounded-[35px] bg-[#8B6D5C] text-white text-lg font-black uppercase tracking-widest cursor-pointer shadow-xl shadow-[#8B6D5C]/20 hover:bg-[#725a4c] transition-all hover:-translate-y-1 active:scale-[0.98]"
              >
                Finalizar e Enviar Avaliação 💜
              </button>
          </div>
        </div>

      </div>

          <footer className="max-w-6xl mx-auto mt-12 pb-12 text-center text-[12px] font-black uppercase tracking-[0.4em] text-[#B08A78]">
            Miss. Daiane • Terapeuta Emocional • Protocolo de Avaliação
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
