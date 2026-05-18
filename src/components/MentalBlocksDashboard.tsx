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
    "REJEIÇÃO",
    "ABANDONO",
    "HUMILHAÇÃO",
    "TRAIÇÃO",
    "INJUSTIÇA",

    "CULPA",
    "VERGONHA",
    "TRISTEZA",
    "REVOLTA",
    "MEDO DE PERDER O CONTROLE",

    "MÁGOA",
    "ÓDIO",
    "ORGULHO",
    "ANSIEDADE",
    "EGOÍSMO",

    "SUBMISSÃO",
    "INDECISÃO",
    "DESÂNIMO",
    "COVARDIA",
    "CIÚMES",

    "FRUSTRAÇÃO",
    "NOSTALGIA",
    "CANSAÇO",
    "IMPACIÊNCIA",
    "ANGÚSTIA",

    "TIMIDEZ",
    "SOLIDÃO",
    "AUTORITARISMO",

    // manter anteriores
    "MEDO",
    "BAIXA AUTOESTIMA",
    "RAIVA",
    "SOBRECARGA EMOCIONAL",
    "TRAUMA EMOCIONAL",
    "DEPENDÊNCIA EMOCIONAL",
    "INSEGURANÇA"
  ];

  const [emocional, setEmocional] = useState<Record<string, number>>(
    emocoes.reduce((acc, emocao) => ({ ...acc, [emocao]: 0 }), {})
  );


  // --- State for Client Data ---
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    nascimento: '',
    telefone: '',
    estadoCivil: '',
    filhos: '',
    quantidadeFilhos: '',
    profissao: '',
    escolaridade: '',
    religiao: '',
    cidade: ''
  });

  // --- State for Anamnese Answers ---
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const etapasAnamnese = [
    {
      titulo: "QUEIXA PRINCIPAL",
      perguntas: [
        "O que te trouxe para a terapia?",
        "Há quanto tempo você se sente assim?",
        "O que mais tem machucado emocionalmente você?",
        "Existe algo que você sente que não consegue superar?",
        "O que você espera alcançar com a terapia?"
      ]
    },
    {
      titulo: "INFÂNCIA",
      perguntas: [
        "Como foi sua infância?",
        "Você se sentia amada quando criança?",
        "Quais lembranças mais marcaram sua infância?",
        "Houve abandono emocional?",
        "Sofreu críticas constantes?",
        "Apanhava na infância?",
        "Sentia medo dentro de casa?",
        "Como era sua relação com sua mãe?",
        "Como era sua relação com seu pai?",
        "Com qual dos dois tinha mais dificuldade?",
        "Quantos irmãos você tem?",
        "Como era sua relação com seus irmãos?",
        "Você se sentia ouvida?",
        "Você se sentia protegida?",
        "Precisou amadurecer cedo?",
        "Sofreu bullying?",
        "Era introvertida ou extrovertida?",
        "Quais eram seus maiores medos?",
        "Existe alguma dor da infância que ainda dói?",
        "Existe algum trauma da infância que ainda te machuca?",
        "Você já se sentiu rejeitada quando criança?",
        "Já presenciou brigas ou violência dentro de casa?",
        "Você se sentia acolhida emocionalmente?",
        "Te comparavam com outras pessoas?",
        "Você sentia necessidade de agradar para receber amor?"
      ]
    },
    {
      titulo: "ADOLESCÊNCIA E DESENVOLVIMENTO AFETIVO",
      perguntas: [
        "Como foi sua adolescência?",
        "Sofreu rejeição?",
        "Já teve depressão na adolescência?",
        "Já pensou em desistir da vida?",
        "Sofreu decepção amorosa?",
        "Como era sua autoestima?",
        "Se sentia bonita?",
        "Tinha amigos verdadeiros?",
        "Já sofreu humilhação?",
        "Já se sentiu excluída?",
        "Houve rebeldia?",
        "Quais eram seus maiores sonhos?",
        "O que mais marcou sua adolescência?",
        "Existe algum trauma da adolescência?",
        "Você escondia suas emoções?",
        "Sentia necessidade de aceitação?",
        "Como foram seus primeiros relacionamentos?",
        "Você se sentia emocionalmente compreendida?",
        "Teve alguma experiência amorosa traumática?",
        "Você tinha medo de rejeição amorosa?",
        "Como você descobriu sua sexualidade?",
        "Você recebeu orientação saudável sobre sexualidade?",
        "Como foi sua primeira experiência sexual?",
        "Sua primeira vez foi: (Ótima / Boa / Regular / Ruim / Traumática)",
        "Você se sentiu segura emocionalmente?",
        "Sentiu pressão ou obrigação em algum relacionamento?",
        "Você associa sexo com amor?",
        "Qual a importância do sexo para você hoje?",
        "Você consegue falar sobre sexualidade sem culpa?",
        "Existe alguma dor emocional ligada à sexualidade?",
        "Você sente vergonha do próprio corpo?",
        "Existe alguma insegurança íntima que te machuca?",
        "Você se sente respeitada emocionalmente nas relações?"
      ]
    },
    {
      titulo: "RELAÇÃO FAMILIAR",
      perguntas: [
        "Como é sua relação com sua mãe hoje?",
        "Como é sua relação com seu pai hoje?",
        "Existe mágoa familiar?",
        "Existe alguém que você não conseguiu perdoar?",
        "Como é sua relação com irmãos?",
        "Você se sente pertencente à família?",
        "Você sente que precisa agradar todos?",
        "Você sente que carrega responsabilidades demais?",
        "Você se sente emocionalmente compreendida pela família?",
        "Existe afastamento familiar?",
        "Você costuma guardar sentimentos?"
      ]
    },
    {
      titulo: "RELACIONAMENTOS",
      perguntas: [
        "Está em um relacionamento atualmente?",
        "Como é sua relação com o esposo/parceiro?",
        "Você se sente valorizada?",
        "Existe diálogo saudável?",
        "Já sofreu traição?",
        "Já viveu relacionamento abusivo?",
        "Tem medo de abandono?",
        "Tem dificuldade de confiar?",
        "Como está sua vida emocional hoje?",
        "Como é sua vida sexual emocionalmente?",
        "Você sente dependência emocional?",
        "Você sente medo de ficar sozinha?",
        "Existe algo no relacionamento que te machuca?"
      ]
    },
    {
      titulo: "FILHOS E MATERNIDADE",
      perguntas: [
        "Como é sua relação com seus filhos?",
        "Você sente culpa na maternidade?",
        "Sente sobrecarga emocional?",
        "Tem medo de falhar como mãe?",
        "Consegue demonstrar afeto facilmente?",
        "Você sente que perdeu parte de si mesma?",
        "Consegue cuidar de você emocionalmente?"
      ]
    },
    {
      titulo: "VIDA ESPIRITUAL",
      perguntas: [
        "Você acredita em Deus?",
        "Como está sua vida espiritual?",
        "Você frequenta igreja?",
        "A fé ajuda emocionalmente?",
        "Existe alguma ferida espiritual?",
        "Já se decepcionou na igreja?",
        "Você sente paz quando ora?",
        "Você sente que está distante emocionalmente de Deus?"
      ]
    },
    {
      titulo: "VIDA PROFISSIONAL",
      perguntas: [
        "Você gosta do que faz?",
        "Sente-se reconhecida?",
        "O trabalho te sobrecarrega?",
        "Você se sente incapaz às vezes?",
        "Tem medo do futuro profissional?",
        "Quais são seus sonhos profissionais?",
        "Você sente ansiedade relacionada ao trabalho?",
        "Seu trabalho afeta sua saúde emocional?"
      ]
    },
    {
      titulo: "VIDA ADULTA E TRAUMAS",
      perguntas: [
        "Existe algum trauma marcante da vida adulta?",
        "O que mais te machuca hoje?",
        "Qual emoção você mais sente?",
        "Você costuma chorar escondido?",
        "Tem ansiedade?",
        "Tem crises emocionais?",
        "Sofre com pensamentos negativos?",
        "Se sente insuficiente?",
        "Tem medo de rejeição?",
        "Qual sua maior insegurança?",
        "Qual sua maior dor atualmente?",
        "Você sente solidão emocional?",
        "Tem medo do futuro?",
        "Você sente esgotamento emocional?",
        "Já viveu perdas traumáticas?",
        "Existe algo que ainda não conseguiu superar?"
      ]
    },
    {
      titulo: "SONHOS E FUTURO",
      perguntas: [
        "Quais são seus maiores sonhos?",
        "Onde deseja estar daqui 5 anos?",
        "O que deseja curar em você?",
        "O que faria você se sentir completa?",
        "O que ainda deseja viver?",
        "Qual é sua maior esperança hoje?"
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

    const numero = "5564992726558";

    const url =
      `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // abre whatsapp
    window.open(url, "_blank");

    // alerta visual
    alert("Suas respostas foram enviadas com sucesso 💜");
  };

  return (
    <div className="min-h-screen bg-therapist-bg p-4 md:p-8 font-sans selection:bg-therapist-accent/20 relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* LOGO ORIGINAL */}
        <div className="flex justify-center items-center mt-10 mb-[30px]">
          <img
            src="/logo.png"
            alt="Miss Daiane"
            className="w-[420px] max-w-[90%] object-contain"
          />
        </div>
        
        {/* Header content card - BRANDING */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-therapist-card rounded-[2.5rem] shadow-xl shadow-therapist-primary/5 p-12 flex flex-col items-center gap-8 border border-therapist-border overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-therapist-primary/5 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-therapist-secondary/5 rounded-tr-full" />

          <div className="flex flex-col items-center text-center space-y-6 relative">
            <h1 className="text-therapist-title text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[0.4em] leading-tight max-w-5xl">
              Protocolo de Avaliação Terapêutica
            </h1>
            <div className="flex items-center gap-6 py-2">
              <div className="h-px w-16 bg-therapist-accent/20" />
              <p className="text-therapist-accent text-sm font-black uppercase tracking-[0.5em]">Miss. Daiane</p>
              <div className="h-px w-16 bg-therapist-accent/20" />
            </div>
          </div>
          
          <div className="w-full flex flex-wrap items-center gap-8 justify-center border-t border-therapist-border pt-8 px-4">
            <div className="flex items-center gap-4 bg-white/40 p-4 rounded-3xl border border-therapist-input-border backdrop-blur-sm">
              <div className="w-10 h-10 bg-therapist-primary/10 rounded-full flex items-center justify-center text-therapist-primary">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-therapist-accent opacity-70">Documento</p>
                <p className="text-xs font-bold text-therapist-title">Avaliação Individualizada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/40 p-4 rounded-3xl border border-therapist-input-border backdrop-blur-sm">
              <div className="w-10 h-10 bg-therapist-secondary/10 rounded-full flex items-center justify-center text-therapist-secondary">
                <User size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-therapist-accent opacity-70">Responsável</p>
                <p className="text-xs font-bold text-therapist-title">Terapeuta Miss. Daiane</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-10">
          
          {/* =========================
            IDENTIFICAÇÃO INICIAL
          ========================= */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[30px] p-8 shadow-lg border border-[#E8D8CF] mb-10">
            <h2
              style={{
                color: "#9B7B6B",
                fontSize: "32px",
                fontWeight: "700",
                letterSpacing: "2px",
                marginBottom: "10px",
                textTransform: "uppercase"
              }}
            >
              Dados Iniciais
            </h2>

            <p
              style={{
                color: "#B79D8F",
                marginBottom: "35px",
                fontSize: "15px"
              }}
            >
              Preencha suas informações para iniciar sua avaliação emocional.
            </p>

            {/* NOME */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Cidade</label>
                <input
                  type="text"
                  placeholder="Sua cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Nascimento</label>
                <input
                  type="date"
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Idade</label>
                <input
                  type="number"
                  placeholder="Sua idade"
                  value={formData.idade}
                  onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">WhatsApp</label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Estado Civil</label>
                <input
                  type="text"
                  placeholder="Ex: Solteira, Casada..."
                  value={formData.estadoCivil}
                  onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Religião</label>
                <input
                  type="text"
                  placeholder="Sua religião"
                  value={formData.religiao}
                  onChange={(e) => setFormData({ ...formData, religiao: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Possui Filhos?</label>
                <input
                  type="text"
                  placeholder="Sim / Não"
                  value={formData.filhos}
                  onChange={(e) => setFormData({ ...formData, filhos: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Quantos Filhos?</label>
                <input
                  type="text"
                  placeholder="Quantidade"
                  value={formData.quantidadeFilhos}
                  onChange={(e) => setFormData({ ...formData, quantidadeFilhos: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Profissão</label>
                <input
                  type="text"
                  placeholder="Sua profissão"
                  value={formData.profissao}
                  onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
                />
              </div>

              <div>
                <label className="block mb-2 text-[#8D6E63] font-semibold">Escolaridade</label>
                <input
                  type="text"
                  placeholder="Grau de instrução"
                  value={formData.escolaridade}
                  onChange={(e) => setFormData({ ...formData, escolaridade: e.target.value })}
                  style={{ width: "100%", padding: "18px", borderRadius: "16px", border: "1px solid #E6D6CC", background: "#FFFDFB", fontSize: "16px", outline: "none" }}
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
              style={{
                background: "#FFFDFB",
                padding: "35px",
                borderRadius: "30px",
                marginBottom: "35px",
                border: "1px solid #E9D8CF",
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
              }}
            >
              <h2
                style={{
                  color: "#9B7B6B",
                  fontSize: "30px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  letterSpacing: "2px"
                }}
              >
                {etapa.titulo}
              </h2>

              <div
                style={{
                  width: "80px",
                  height: "4px",
                  background: "#D6B7A7",
                  borderRadius: "10px",
                  marginBottom: "30px"
                }}
              />

              {etapa.perguntas.map((pergunta, perguntaIndex) => (
                <div
                  key={perguntaIndex}
                  style={{
                    marginBottom: "25px"
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      color: "#7F6658",
                      fontWeight: "600",
                      fontSize: "16px"
                    }}
                  >
                    {pergunta}
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Digite sua resposta..."
                    value={respostas[pergunta] || ""}
                    onChange={(e) =>
                      setRespostas({
                        ...respostas,
                        [pergunta]: e.target.value
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "18px",
                      borderRadius: "18px",
                      border: "1px solid #E8D8CF",
                      background: "#FFFCFA",
                      resize: "vertical",
                      fontSize: "15px",
                      color: "#5F4B42",
                      outline: "none",
                      lineHeight: "1.6",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.03)"
                    }}
                  />
                </div>
              ))}
            </motion.div>
          ))}

          {/* =========================
            MAPA EMOCIONAL COMPLETO
          ========================= */}
          <div
            style={{
              marginTop: "50px"
            }}
          >
            <h2
              style={{
                color: "#9A7B68",
                fontSize: "34px",
                fontWeight: "800",
                marginBottom: "15px",
                letterSpacing: "2px"
              }}
            >
              MAPA EMOCIONAL
            </h2>

            <p
              style={{
                color: "#B08A78",
                marginBottom: "35px",
                fontSize: "16px"
              }}
            >
              Avalie a intensidade emocional de cada área de 0 a 10
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
                    background: "#FFFDFB",
                    border: "1px solid #EAD8CF",
                    borderRadius: "22px",
                    padding: "20px",
                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.04)"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px"
                    }}
                  >
                    <span
                      style={{
                        color: "#8A6B5D",
                        fontWeight: "700",
                        fontSize: "14px",
                        letterSpacing: "1px"
                      }}
                    >
                      {emocao}
                    </span>

                    <span
                      style={{
                        background: "#F5E8DF",
                        color: "#9B7B68",
                        padding: "4px 10px",
                        borderRadius: "10px",
                        fontWeight: "700",
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
            FINALIZAÇÃO
          ========================= */}
          <div
            style={{
              marginTop: "60px",
              padding: "45px",
              borderRadius: "30px",
              background: "#F8F3EF",
              textAlign: "center",
              border: "1px solid #E7D8CF"
            }}
          >
            <h2
              style={{
                color: "#9A7B68",
                marginBottom: "25px",
                fontSize: "32px",
                fontWeight: "600"
              }}
            >
              Mensagem de Acolhimento
            </h2>

            <p
              style={{
                color: "#7B6255",
                fontSize: "22px",
                lineHeight: "1.9",
                maxWidth: "900px",
                margin: "0 auto"
              }}
            >
              “Muitas vezes os traumas silenciosos deixam marcas profundas,
              mas nenhuma dor define quem você é.
              Existe cura para aquilo que por anos tentou sobreviver escondido dentro de você.”
            </p>

            <div
              style={{
                marginTop: "40px",
                color: "#B08A78",
                fontStyle: "italic",
                fontSize: "22px",
                lineHeight: "1.8"
              }}
            >
              “Porque sou eu que conheço os planos que tenho para vocês,
              diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano,
              planos de dar-lhes esperança e um futuro.”
              
              <br /><br />

              <strong>Jeremias 29:11</strong>
            </div>
          </div>

          {/* =========================
            BOTÃO FINAL
          ========================= */}
          <div className="pb-20">
            <button
              onClick={enviarWhatsApp}
              style={{
                width: "100%",
                marginTop: "50px",
                padding: "24px",
                border: "none",
                borderRadius: "22px",
                background:
                  "linear-gradient(135deg,#B08A78,#8D6E63)",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.12)",
                transition: "0.3s"
              }}
            >
              SALVAR E ENVIAR AVALIAÇÃO 💜
            </button>
          </div>
        </div>

      </div>

      <footer className="max-w-6xl mx-auto mt-12 pb-12 text-center text-[12px] font-black uppercase tracking-[0.4em] text-therapist-accent">
        Miss. Daiane • Terapeuta Emocional • Protocolo de Avaliação
      </footer>

      <style>{`
        input[type='range'] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type='range']::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #eadfd7;
          border-radius: 10px;
        }
        input[type='range']:focus::-webkit-slider-runnable-track {
          background: #e2d3ca;
        }
        input[type='range']::-webkit-slider-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #b89d8b;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8px;
          box-shadow: 0 4px 12px rgba(184, 157, 139, 0.4);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
