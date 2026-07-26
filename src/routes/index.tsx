import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: QuizApp,
});

// ─── PALETA MENTORATECH (dark premium, alto contraste) ────────────────────────
const M = {
  bg:           "#07080c",
  s1:           "rgba(255,255,255,0.035)",
  s2:           "rgba(255,255,255,0.07)",
  border:       "rgba(255,255,255,0.12)",
  borderStrong: "rgba(255,255,255,0.22)",
  teal:         "#2ec4b6",
  tealDim:      "#4f9b93",
  red:          "#ef4444",
  yellow:       "#facc15",
  white:        "#ffffff",
  text:         "#f1f2f7",
  sub:          "#aab2c8",
  muted:        "#5a6178",
};

const glass = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
} as const;

const levelColor: Record<string, string> = {
  L1: M.red,
  L2: M.yellow,
  L3: M.yellow,
  L4: M.teal,
};

function scoreColor(s: number): string {
  if (s <= 1) return M.red;
  if (s <= 3) return M.yellow;
  return M.teal;
}

const mono = "'SF Mono','JetBrains Mono','Fira Code',monospace";

function Grid() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
        maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 95%)",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(46,196,182,0.35), transparent)",
      }} />
    </div>
  );
}

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      border: `1px solid ${M.teal}`, color: M.teal,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconClock() {
  return <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>;
}
function IconTarget() {
  return <svg {...iconProps}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></svg>;
}
function IconShield() {
  return <svg {...iconProps}><path d="M12 3.5l6.5 2.7v5.3c0 4.2-2.8 7.4-6.5 8.5-3.7-1.1-6.5-4.3-6.5-8.5V6.2L12 3.5z" /></svg>;
}
function IconCheck() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 24, height: 24, borderRadius: 6, background: M.teal,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: mono, fontSize: 12, fontWeight: 800, color: M.bg,
        flexShrink: 0,
      }}>
        {"{}"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
          <span style={{ color: M.white }}>Stack</span><span style={{ color: M.teal }}>Calc</span>
        </span>
        <span style={{ fontSize: 9, color: M.sub, letterSpacing: 0.3, marginTop: 3 }}>
          um produto MentoraTech
        </span>
      </div>
    </div>
  );
}

type Option      = { id: string; text: string; score: number };
type Question    = { id: string; dim: string; text: string; context?: string; options: Option[] };
type Deliverable = { id: string; label: string; tag: string; title: string; description: string };
type Profile     = { id: string; level: "L1"|"L2"|"L3"|"L4"; name: string; tagline: string; description: string };

const questions: Question[] = [
  { id: "q01", dim: "Resposta em Reunião",
    text: "Quando alguém pede uma estimativa durante uma reunião, você normalmente:",
    options: [
      { id: "a", score: 1, text: "Dou um número para não travar a conversa" },
      { id: "b", score: 2, text: "Dou uma estimativa aproximada" },
      { id: "c", score: 3, text: "Registro dúvidas antes de responder" },
      { id: "d", score: 4, text: "Registro premissas, riscos e restrições junto da estimativa" },
    ],
  },
  { id: "q02", dim: "Prazo Definido Antes do Escopo",
    text: "Quando uma data já chega definida antes da análise técnica:",
    options: [
      { id: "a", score: 1, text: "Tento encaixar a entrega no prazo" },
      { id: "b", score: 2, text: "Aviso verbalmente que existem riscos" },
      { id: "c", score: 3, text: "Documento os riscos" },
      { id: "d", score: 4, text: "Documento os riscos e quem assumiu cada decisão" },
    ],
  },
  { id: "q03", dim: "Fechamento da Estimativa",
    text: "Quando surgem dúvidas durante a estimativa:",
    options: [
      { id: "a", score: 1, text: "Continuo mesmo assim" },
      { id: "b", score: 2, text: "Faço algumas perguntas" },
      { id: "c", score: 3, text: "Formalizo pendências" },
      { id: "d", score: 4, text: "Só fecho a estimativa quando as premissas estiverem registradas" },
    ],
  },
  { id: "q04", dim: "Defesa Após Semanas",
    text: "Quando alguém questiona uma estimativa semanas depois, você normalmente possui:",
    options: [
      { id: "a", score: 1, text: "Apenas o número informado" },
      { id: "b", score: 2, text: "Algumas anotações" },
      { id: "c", score: 3, text: "Premissas registradas" },
      { id: "d", score: 4, text: "Documento completo de defesa técnica" },
    ],
  },
  { id: "q05", dim: "Mudança de Escopo",
    text: "Quando o escopo muda após a estimativa:",
    options: [
      { id: "a", score: 1, text: "O prazo costuma permanecer igual" },
      { id: "b", score: 2, text: "Existe discussão sobre impacto" },
      { id: "c", score: 3, text: "Existem registros parciais" },
      { id: "d", score: 4, text: "Existe rastreabilidade clara da mudança" },
    ],
  },
  { id: "q06", dim: "Explicação do Atraso",
    text: "Quando ocorre atraso:",
    options: [
      { id: "a", score: 1, text: "É difícil explicar exatamente o que aconteceu" },
      { id: "b", score: 2, text: "Parte das causas está documentada" },
      { id: "c", score: 3, text: "Os riscos já haviam sido registrados" },
      { id: "d", score: 4, text: "Existe histórico completo das decisões tomadas" },
    ],
  },
  { id: "q07", dim: "Prova na Análise de Causa Raiz",
    text: "Em uma análise de causa raiz, você consegue provar:",
    options: [
      { id: "a", score: 1, text: "Quase nada" },
      { id: "b", score: 2, text: "Algumas decisões" },
      { id: "c", score: 3, text: "O escopo original" },
      { id: "d", score: 4, text: "Escopo, premissas, riscos e mudanças" },
    ],
  },
  { id: "q08", dim: "Percepção de Risco",
    text: "Qual frase descreve melhor sua realidade?",
    options: [
      { id: "a", score: 1, text: "Frequentemente assumo riscos sem perceber" },
      { id: "b", score: 2, text: "Consigo identificar riscos mas nem sempre registro" },
      { id: "c", score: 3, text: "Registro riscos importantes" },
      { id: "d", score: 4, text: "Transformo riscos em decisões documentadas" },
    ],
  },
  { id: "q09", dim: "Pressão por Prazo Rápido",
    text: "Quando existe pressão para definir prazo rapidamente:",
    options: [
      { id: "a", score: 1, text: "Acabo cedendo" },
      { id: "b", score: 2, text: "Tento negociar" },
      { id: "c", score: 3, text: "Apresento alternativas" },
      { id: "d", score: 4, text: "Transformo a conversa em análise de risco" },
    ],
  },
];

const deliverables: Deliverable[] = [
  { id: "app-calc",    label: "APP", tag: "App",
    title: "3 Calculadoras de Esforço",
    description: "Backend, Salesforce e IA/Agentes. Complexidade automática, buffer calibrado e faixas mínimo/esperado/máximo. Número defensável em qualquer reunião." },
  { id: "app-escopo",  label: "APP", tag: "App",
    title: "Levantamento de Escopo",
    description: "21 perguntas de prontidão com score de confiança. Saiba antes de estimar se o pedido tem base para receber um número." },
  { id: "squad",       label: "SQ",  tag: "Squad",
    title: "Squad de 9 Especialistas",
    description: "9 perfis de análise e tomada de decisão: estimativa, escopo, defesa de prazo, risco, documentação e comunicação executiva. Você convoca o certo para cada situação." },
  { id: "skills",      label: "/sc", tag: "Skills",
    title: "14 Skills para o terminal",
    description: "Prefere trabalhar no terminal? /sc-estimar · /sc-escopo · /sc-risco · /sc-rfc · /sc-arquitetura · /sc-poc · /sc-email · /sc-defender e mais 6 commands prontos para usar. Ou crie sua própria calculadora para o seu stack." },
  { id: "artefatos",   label: "DOC", tag: "Artefatos",
    title: "Artefatos prontos",
    description: "Templates de e-mail, Teams e Slack. One-Pager para C-level. ADR e RFC para o repositório." },
  { id: "custom-calc", label: "BNS", tag: "Bônus",
    title: "Crie sua própria calculadora",
    description: "O framework vem com 3 calculadoras prontas para Backend, Salesforce e IA. Se o seu stack não estiver no kit, o método documenta como montar uma nova: premissas, multiplicadores de complexidade e dois cenários automatizados. Funciona para mobile, dados, cloud, infra ou qualquer disciplina." },
  { id: "calc-prio",   label: "BNS", tag: "Bônus",
    title: "Calculadora de Priorização",
    description: "Ferramenta para priorizar demandas com critério técnico e de negócio antes de qualquer comprometimento de prazo." },
  { id: "sessao-vivo", label: "BNS", tag: "Bônus",
    title: "Sessão ao vivo gravada",
    description: "Simulação ao vivo de uma estimativa técnica com o método StackCalc aplicado em casos reais." },
  { id: "grupo",       label: "BNS", tag: "Bônus",
    title: "Grupo fechado de alunos",
    description: "Acesso ao grupo exclusivo para tirar dúvidas, trocar experiências e acompanhar atualizações do produto." },
];

const byLevel: Record<string, string[]> = {
  L1: ["app-calc", "squad", "skills"],
  L2: ["app-calc", "app-escopo", "squad", "artefatos"],
  L3: ["app-escopo", "squad", "skills", "artefatos"],
  L4: ["squad", "skills", "custom-calc", "artefatos"],
};

const dimDiag: Record<string, Record<number, string>> = {
  "Resposta em Reunião": {
    1: "Você dá o número para não travar a conversa. Esse número vira compromisso antes de qualquer análise ter acontecido.",
    2: "Você dá uma estimativa aproximada. Aproximado sem registro se transforma em prazo fechado na cabeça de quem ouviu.",
    3: "Você registra dúvidas antes de responder. Falta reunir essas dúvidas em premissas formais para sustentar o número depois.",
    4: "Você registra premissas, riscos e restrições junto da estimativa. Isso é o que torna o número defensável desde o primeiro momento.",
  },
  "Prazo Definido Antes do Escopo": {
    1: "Você tenta encaixar a entrega no prazo que já chegou fechado. Isso transfere o risco da decisão para você, não para quem definiu a data.",
    2: "Você avisa verbalmente que existem riscos. Aviso verbal não é registro, e não existe quando o prazo atrasa.",
    3: "Você documenta os riscos. Falta também documentar quem assumiu cada decisão para a defesa ficar completa.",
    4: "Você documenta os riscos e quem assumiu cada decisão. Essa dupla rastreabilidade é o que protege sua posição técnica.",
  },
  "Fechamento da Estimativa": {
    1: "Você continua mesmo com dúvidas presentes. Toda dúvida não resolvida vira imprevisto assumido em silêncio.",
    2: "Você faz algumas perguntas antes de responder. Perguntar não é o mesmo que formalizar o que ficou pendente.",
    3: "Você formaliza pendências. Falta condicionar o fechamento da estimativa a essas pendências estarem resolvidas.",
    4: "Você só fecha a estimativa quando as premissas estão registradas. Essa disciplina evita que a estimativa vire palpite documentado tarde demais.",
  },
  "Defesa Após Semanas": {
    1: "Você possui apenas o número informado. Sem premissas, riscos ou escopo registrados, não existe argumento para se defender.",
    2: "Você possui algumas anotações. Anotação solta não substitui um documento de defesa técnica.",
    3: "Você possui premissas registradas. Falta reunir isso em um documento único e acessível no momento do questionamento.",
    4: "Você possui documento completo de defesa técnica. Isso muda a natureza da conversa: de opinião para evidência.",
  },
  "Mudança de Escopo": {
    1: "O prazo costuma permanecer igual mesmo com o escopo mudando. Essa é a origem mais comum de atraso sem explicação aceitável.",
    2: "Existe discussão sobre o impacto da mudança. Discussão sem registro se perde assim que a reunião termina.",
    3: "Existem registros parciais da mudança. Parcial ainda deixa brechas para reinterpretação depois.",
    4: "Existe rastreabilidade clara da mudança. Isso transforma escopo alterado em decisão documentada, não em discussão recorrente.",
  },
  "Explicação do Atraso": {
    1: "É difícil explicar exatamente o que aconteceu. Sem registro, a narrativa do atraso é escrita por quem grita mais alto depois.",
    2: "Parte das causas está documentada. A parte que falta é justamente a que mais vai ser questionada.",
    3: "Os riscos já haviam sido registrados antes do atraso acontecer. Isso já reduz boa parte do desgaste na conversa.",
    4: "Existe histórico completo das decisões tomadas. Você entra na conversa de atraso com prova, não com memória.",
  },
  "Prova na Análise de Causa Raiz": {
    1: "Você consegue provar quase nada. Sem escopo, premissas ou riscos registrados, a análise de causa raiz vira debate de memória.",
    2: "Você consegue provar algumas decisões. Faltam ainda o escopo original e as mudanças que aconteceram no meio do caminho.",
    3: "Você consegue provar o escopo original. Falta conectar esse escopo às mudanças e riscos que vieram depois.",
    4: "Você consegue provar escopo, premissas, riscos e mudanças. Esse é o nível de defesa que encerra qualquer discussão de responsabilidade.",
  },
  "Percepção de Risco": {
    1: "Você frequentemente assume riscos sem perceber. O risco que você não vê agora aparece como atraso mais tarde, e a conta chega no seu nome.",
    2: "Você consegue identificar riscos, mas nem sempre registra. Risco identificado e não registrado protege tanto quanto risco ignorado.",
    3: "Você registra os riscos importantes. O próximo nível é transformar esse registro em argumento antes de qualquer questionamento aparecer.",
    4: "Você transforma riscos em decisões documentadas. Essa é a diferença entre reagir ao problema e já ter a resposta pronta.",
  },
  "Pressão por Prazo Rápido": {
    1: "Você acaba cedendo à pressão. Cada vez que cede sem registro, o próximo prazo pressionado fica ainda mais difícil de sustentar.",
    2: "Você tenta negociar o prazo. Negociação sem dado técnico depende de quem tem mais poder na sala, não de quem tem mais razão.",
    3: "Você apresenta alternativas de prazo ou escopo. Falta transformar isso em análise de risco formal para fechar o argumento.",
    4: "Você transforma a conversa em análise de risco. Isso tira a decisão do campo da opinião e coloca no campo técnico.",
  },
};

const profiles: Profile[] = [
  { id: "bombeiro",     level: "L1", name: "O Bombeiro de Prazo",
    tagline: "Avaliado pela velocidade da resposta, não pela qualidade da decisão.",
    description: "Você está sendo avaliado pela capacidade de responder rápido, mas deveria ser avaliado pela capacidade de tomar boas decisões. Hoje o maior risco não é errar a estimativa: é assumir responsabilidades sem documentação." },
  { id: "defensor",     level: "L2", name: "O Defensor Sem Provas",
    tagline: "Você já vê os riscos. Falta ter como provar.",
    description: "Você já percebe os riscos, já questiona o escopo e já enxerga problemas antes da maioria. Mas quando alguém pede evidências, sua defesa ainda depende demais da memória." },
  { id: "estrategista", level: "L3", name: "O Estrategista Operacional",
    tagline: "Você trabalha acima da média. Falta transformar isso em sistema.",
    description: "Você já trabalha melhor que a média, consegue identificar riscos e consegue desafiar prazos irreais. O próximo nível é transformar esse conhecimento em um sistema repetível." },
  { id: "arquiteto",    level: "L4", name: "O Arquiteto de Decisões",
    tagline: "Você entrega decisões, não apenas números.",
    description: "Você não entrega apenas números. Você entrega contexto, premissas, riscos e rastreabilidade. Sua estimativa ajuda a organização a tomar decisões melhores." },
];

const levelMeta: Record<string, { range: string; label: string; sub: string }> = {
  L1: { label: "Nível 1", range: "9–15 pts",  sub: "Estimativas intuitivas, sem estrutura de defesa" },
  L2: { label: "Nível 2", range: "16–22 pts", sub: "Base em formação, consistência ainda inconstante" },
  L3: { label: "Nível 3", range: "23–29 pts", sub: "Método consolidado, comunicação estratégica" },
  L4: { label: "Nível 4", range: "30–36 pts", sub: "Estimativas defensáveis, referência no time" },
};

function getLevel(n: number): "L1"|"L2"|"L3"|"L4" {
  if (n <= 15) return "L1";
  if (n <= 22) return "L2";
  if (n <= 29) return "L3";
  return "L4";
}

function getProfile(lv: string): Profile {
  return profiles.find(p => p.level === lv)!;
}

function getWeakest(ans: Record<string,number>): string {
  let min=5, dim="Resposta em Reunião";
  questions.forEach(q=>{ const s=ans[q.id]||1; if(s<min){min=s;dim=q.dim;} });
  return dim;
}

function QuizApp() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string,number>>({});
  const [picked, setPicked]   = useState<string|null>(null);
  const [phase, setPhase]     = useState<"intro"|"quiz"|"result">("intro");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const q       = questions[step];
  const total   = Object.values(answers).reduce((a,b)=>a+b,0);
  const level   = getLevel(total);
  const lc      = levelMeta[level];
  const accent  = levelColor[level];
  const profile = getProfile(level);
  const primaryIds = byLevel[level];
  const weakDim = getWeakest(answers);
  const px = isMobile ? 20 : 32;

  function choose(optId: string, score: number) {
    if (picked) return;
    setPicked(optId);
    setTimeout(()=>{
      const next = {...answers, [q.id]: score};
      setAnswers(next);
      setPicked(null);
      if (step < questions.length-1) setStep(s=>s+1);
      else setPhase("result");
    }, 220);
  }

  function restart() { setStep(0); setAnswers({}); setPicked(null); setPhase("quiz"); }

  const progressPct = Math.round(((step + 1) / questions.length) * 100);

  if (phase === "intro") return (
    <div style={{
      minHeight: "100vh",
      background: M.bg,
      color: M.text,
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
      width: "100%",
      position: "relative",
    }}>
      <Grid />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
      <div style={{
        padding: `20px ${px}px`,
        borderBottom: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...glass,
      }}>
        <Logo />
        <span style={{ fontSize: 12, color: M.sub, letterSpacing: 1, textTransform: "uppercase" }}>
          Diagnóstico de Maturidade
        </span>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 680,
        margin: "0 auto",
        padding: isMobile ? "40px 20px" : "64px 32px",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
          color: M.teal, marginBottom: 28,
          border: `1px solid ${M.teal}`, borderRadius: 999, padding: "10px 22px",
          textTransform: "uppercase",
        }}>
          Diagnóstico rápido · 2 minutos
        </div>
        <h1 style={{
          fontSize: isMobile ? 30 : 42, fontWeight: 800, color: M.white,
          letterSpacing: -0.6, margin: "0 0 28px", lineHeight: 1.2,
        }}>
          Transforme pedidos soltos em <span style={{ color: M.teal }}>estimativas técnicas defensáveis</span>
        </h1>

        <div style={{
          display: "flex", alignItems: "flex-start", gap: 16, textAlign: "left",
          border: `1px solid ${M.border}`, borderRadius: 14,
          padding: isMobile ? "20px 20px" : "22px 28px",
          marginBottom: 28, maxWidth: 600,
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%", background: M.teal, color: M.bg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
          }}>
            <IconCheck />
          </div>
          <p style={{ fontSize: 15.5, color: M.text, lineHeight: 1.7, margin: 0 }}>
            Responda 9 perguntas rápidas e descubra onde você está hoje na prática de estimativas técnicas, e{" "}
            <strong style={{ color: M.white }}>o que isso pode estar te custando em prazo e credibilidade.</strong>
          </p>
        </div>

        <div style={{
          display: "flex", justifyContent: "center", gap: isMobile ? 20 : 40,
          marginBottom: 36, flexWrap: "wrap",
        }}>
          {[
            { icon: <IconClock />, label: "Leva menos", sub: "de 2 minutos" },
            { icon: <IconTarget />, label: "Diagnóstico claro", sub: "e direto" },
            { icon: <IconShield />, label: "100% confidencial", sub: "sem cadastro" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
              <IconCircle>{t.icon}</IconCircle>
              <div>
                <div style={{ fontSize: 13.5, color: M.text, fontWeight: 600, lineHeight: 1.3 }}>{t.label}</div>
                <div style={{ fontSize: 13.5, color: M.sub, lineHeight: 1.3 }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase("quiz")}
          style={{
            all: "unset",
            background: M.teal,
            color: M.bg,
            fontWeight: 800,
            fontSize: 16,
            padding: "18px 56px",
            borderRadius: 10,
            cursor: "pointer",
            letterSpacing: 0.3,
            boxShadow: "0 8px 32px rgba(46,196,182,0.3)",
          }}
        >
          Começar Diagnóstico
        </button>
      </div>
      </div>
    </div>
  );

  if (phase === "quiz") return (
    <div style={{
      minHeight: "100vh",
      background: M.bg,
      color: M.text,
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
      width: "100%",
      position: "relative",
    }}>
      <Grid />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
      <div style={{
        padding: `20px ${px}px`,
        borderBottom: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...glass,
      }}>
        <Logo />
        <span style={{ fontSize: 13, color: M.sub, fontFamily: mono }}>
          <span style={{ color: M.white }}>{String(step + 1).padStart(2, "0")}</span>
          <span style={{ opacity: 0.5 }}> / {String(questions.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div style={{ padding: `14px ${px}px 0`, boxSizing: "border-box" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? M.teal : M.s2,
              transition: "background 0.25s ease",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: M.sub, fontFamily: mono }}>{progressPct}%</span>
        </div>
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 620,
        margin: "0 auto",
        padding: isMobile ? "36px 20px" : "52px 32px",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
          <div style={{ width: 3, height: 14, background: M.teal, borderRadius: 2 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: M.teal, textTransform: "uppercase" }}>
            {q.dim}
          </span>
        </div>

        <h2 style={{
          fontSize: 24, fontWeight: 700, lineHeight: 1.45, color: M.white,
          margin: 0, marginBottom: q.context ? 20 : 40, letterSpacing: -0.3,
        }}>
          {q.text}
        </h2>

        {q.context && (
          <div style={{
            borderLeft: `2px solid ${M.teal}`,
            paddingLeft: 16, marginBottom: 36,
            fontSize: 13, color: M.sub, lineHeight: 1.65,
          }}>
            {q.context}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSel  = picked === opt.id;
            const isDim  = picked && picked !== opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => choose(opt.id, opt.score)}
                disabled={!!picked}
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "18px 20px",
                  background: isSel ? M.s2 : M.s1,
                  border: `1px solid ${isSel ? M.teal : M.border}`,
                  borderLeft: `3px solid ${isSel ? M.teal : "transparent"}`,
                  borderRadius: 10,
                  cursor: picked ? "default" : "pointer",
                  opacity: isDim ? 0.35 : 1,
                  transition: "all 0.14s",
                  boxSizing: "border-box",
                  width: "100%",
                  boxShadow: isSel ? "0 8px 24px rgba(46,196,182,0.15)" : "none",
                }}
                onMouseEnter={e => {
                  if (!picked) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = M.s2;
                    el.style.borderLeftColor = M.sub;
                  }
                }}
                onMouseLeave={e => {
                  if (!picked) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = M.s1;
                    el.style.borderLeftColor = "transparent";
                  }
                }}
              >
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: isSel ? M.teal : M.sub,
                  minWidth: 16, paddingTop: 3, flexShrink: 0,
                  fontFamily: "'SF Mono','Fira Code',monospace",
                  letterSpacing: 0.5,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{
                  fontSize: 16, lineHeight: 1.6,
                  color: isSel ? M.white : M.text,
                  fontWeight: isSel ? 500 : 400,
                }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {step === 0 && (
          <p style={{ fontSize: 12, color: M.sub, textAlign: "center", marginTop: 36 }}>
            Escolha a opção que melhor descreve seu comportamento real, não o ideal.
          </p>
        )}
      </div>

      <div style={{ padding: `8px ${px}px 20px` }} />
      </div>
    </div>
  );

  const primary = primaryIds.map(id => deliverables.find(d => d.id===id)!).filter(Boolean);

  return (
    <div style={{
      minHeight: "100vh",
      background: M.bg,
      color: M.text,
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      overflowX: "hidden",
      width: "100%",
      position: "relative",
    }}>
      <Grid />
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
      <div style={{
        padding: `20px ${px}px`,
        borderBottom: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...glass,
      }}>
        <Logo />
        <span style={{ fontSize: 12, color: M.sub, letterSpacing: 1, textTransform: "uppercase" }}>
          Seu Resultado
        </span>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: isMobile ? "36px 20px 80px" : "56px 32px 100px", boxSizing: "border-box" }}>
        <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 24, marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: accent, textTransform: "uppercase",
              border: `1px solid ${accent}`,
              borderRadius: 4, padding: "3px 10px",
            }}>
              {lc.label}
            </span>
            <span style={{ fontSize: 12, color: M.sub }}>{lc.range}</span>
          </div>
          <h1 style={{
            fontSize: 34, fontWeight: 800, color: M.white,
            letterSpacing: -0.5, margin: "0 0 12px", lineHeight: 1.15,
          }}>
            {profile.name}
          </h1>
          <p style={{
            fontSize: 18, color: accent, fontWeight: 600,
            margin: "0 0 14px", lineHeight: 1.4,
          }}>
            {profile.tagline}
          </p>
          <p style={{
            fontSize: 15, color: M.sub, lineHeight: 1.75,
            margin: 0, maxWidth: 560,
          }}>
            {profile.description}
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ position: "relative", height: 6, borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex" }}>
              {[M.red, M.yellow, M.yellow, M.teal].map((c, i) => (
                <div key={i} style={{ flex: 1, background: `${c}26`, borderRight: i < 3 ? `1px solid ${M.bg}` : "none" }} />
              ))}
            </div>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: `${(total / 36) * 100}%`, background: accent, borderRadius: 3,
              transition: "width 0.6s ease",
            }} />
            <div style={{
              position: "absolute", top: "50%", left: `${(total / 36) * 100}%`,
              transform: "translate(-50%, -50%)", width: 14, height: 14, borderRadius: "50%",
              background: M.bg, border: `2px solid ${accent}`,
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Nível 1", "Nível 2", "Nível 3", "Nível 4"].map((l, i) => (
              <span key={i} style={{
                fontSize: 10, fontFamily: mono,
                color: level === `L${i + 1}` ? M.white : M.sub,
                fontWeight: level === `L${i + 1}` ? 700 : 400,
              }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
          gap: 10, marginBottom: 48,
        }}>
          {[
            { label: "Score Total",      value: `${total}`, sub: "de 36 pts" },
            { label: "Maturidade",       value: lc.label,   sub: isMobile ? lc.label : lc.sub },
            { label: "Ponto de Atenção", value: weakDim,    sub: "dimensão mais baixa", highlight: true },
          ].map((k, i) => (
            <div key={i} style={{
              background: M.s1,
              border: `1px solid ${k.highlight ? M.red : M.border}`,
              borderTop: `3px solid ${k.highlight ? M.red : accent}`,
              borderRadius: 12,
              padding: isMobile ? "16px 14px" : "22px 20px",
              gridColumn: isMobile && i === 2 ? "1 / -1" : undefined,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 1.2,
                color: M.sub, textTransform: "uppercase", marginBottom: 10,
              }}>
                {k.label}
              </div>
              <div style={{
                fontSize: isMobile ? 18 : 22, fontWeight: 700,
                color: k.highlight ? M.red : M.white,
                lineHeight: 1.1, marginBottom: 5,
              }}>
                {k.value}
              </div>
              <div style={{ fontSize: 11, color: M.sub, lineHeight: 1.4 }}>
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: M.s1,
          border: `1px solid ${M.border}`,
          borderLeft: `4px solid ${M.red}`,
          borderRadius: 14,
          padding: isMobile ? "24px 22px" : "28px 32px",
          marginBottom: 52,
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            color: M.red, textTransform: "uppercase", marginBottom: 14,
          }}>
            Seu principal gargalo
          </div>
          <p style={{ fontSize: 15, color: M.text, lineHeight: 1.8, margin: "0 0 14px" }}>
            Seu problema provavelmente não está em chegar a um número. Está em defender esse número quando surgem questionamentos.
          </p>
          <p style={{ fontSize: 15, color: M.sub, lineHeight: 1.8, margin: "0 0 14px" }}>
            A maioria dos profissionais consegue estimar. Poucos conseguem responder o que estava no escopo, o que estava fora, quais riscos existiam, quem assumiu esses riscos e o que mudou depois.
          </p>
          <p style={{ fontSize: 15, color: M.text, lineHeight: 1.8, margin: 0, fontWeight: 600 }}>
            Sem essas respostas registradas, qualquer estimativa se torna vulnerável.
          </p>
        </div>

        <Label text="Virada de entendimento" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12, marginBottom: 16,
        }}>
          <div style={{ background: M.s1, border: `1px solid ${M.border}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: M.sub, textTransform: "uppercase", marginBottom: 10 }}>
              Crença antiga
            </div>
            <p style={{ fontSize: 14, color: M.sub, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              "Se eu souber estimar bem, meu número já me protege."
            </p>
          </div>
          <div style={{ background: M.s1, border: `1px solid ${M.teal}`, borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: M.teal, textTransform: "uppercase", marginBottom: 10 }}>
              Crença nova
            </div>
            <p style={{ fontSize: 14, color: M.text, lineHeight: 1.7, margin: 0 }}>
              "O número nunca foi o que te protege. O que te protege é conseguir mostrar, depois, quais premissas, riscos e decisões sustentaram aquele número."
            </p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: M.sub, lineHeight: 1.75, marginBottom: 52, maxWidth: 560 }}>
          Não é falta de conhecimento técnico. É falta de registro.
        </p>

        <Label text="Análise por dimensão" />
        <div style={{
          background: M.s1,
          border: `1px solid ${M.border}`,
          borderRadius: 14,
          padding: "8px 0",
          marginBottom: 52,
        }}>
          {questions.map((qq, i) => {
            const s = answers[qq.id] || 1;
            const isWeak = qq.dim === weakDim;
            const barColor = scoreColor(s);
            const diagColor = scoreColor(s);
            const diag = dimDiag[qq.dim]?.[s];
            return (
              <div key={qq.id} style={{
                display: "flex", flexDirection: "column", gap: 8,
                padding: "14px 24px",
                borderBottom: i < questions.length - 1 ? `1px solid ${M.border}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{
                    fontSize: 14,
                    color: isWeak ? M.white : M.text,
                    fontWeight: isWeak ? 600 : 400,
                    minWidth: isMobile ? 120 : 180,
                    flexShrink: 0,
                  }}>
                    {isWeak ? "→ " : ""}{qq.dim}
                  </span>
                  <div style={{ flex: 1, height: 4, background: M.s2, borderRadius: 2 }}>
                    <div style={{
                      height: "100%",
                      width: `${(s / 4) * 100}%`,
                      background: barColor,
                      borderRadius: 2,
                      transition: "width 0.5s ease-out",
                    }} />
                  </div>
                  <span style={{
                    fontSize: 13,
                    color: barColor,
                    fontWeight: 700,
                    minWidth: 28,
                    textAlign: "right",
                    fontFamily: mono,
                  }}>
                    {s}/4
                  </span>
                </div>
                {diag && (
                  <p style={{
                    margin: 0, fontSize: 12.5, lineHeight: 1.6,
                    color: M.sub,
                    paddingLeft: isMobile ? 0 : 2,
                  }}>
                    {diag}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Label text="App StackCalc: ferramentas para este perfil" color={M.teal} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 12, marginBottom: 48 }}>
          {["app-calc", "app-escopo"].map(id => {
            const d = deliverables.find(x => x.id===id)!;
            const isPrimary = primaryIds.includes(id);
            return (
              <div key={id} style={{
                background: M.s1,
                border: `1px solid ${isPrimary ? M.teal : M.border}`,
                borderRadius: 12,
                padding: "22px 22px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    color: isPrimary ? M.teal : M.sub,
                    border: `1px solid ${isPrimary ? M.teal : M.border}`,
                    borderRadius: 4, padding: "2px 8px",
                    fontFamily: "'SF Mono','Fira Code',monospace",
                  }}>
                    {d.label}
                  </span>
                  {isPrimary && (
                    <span style={{ fontSize: 10, color: M.teal }}>prioritário</span>
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: M.white, marginBottom: 8 }}>
                  {d.title}
                </div>
                <div style={{ fontSize: 13, color: M.sub, lineHeight: 1.65 }}>
                  {d.description}
                </div>
              </div>
            );
          })}
        </div>

        <Label text="Entregáveis prioritários para este perfil" color={accent} />
        <div style={{
          border: `1px solid ${M.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 52,
        }}>
          {primary.map((d, i) => (
            <div key={d.id} style={{
              display: "flex", alignItems: "flex-start", gap: 18,
              padding: "18px 24px",
              background: i % 2 === 0 ? M.s1 : M.bg,
              borderBottom: i < primary.length - 1 ? `1px solid ${M.border}` : "none",
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                color: accent,
                border: `1px solid ${accent}`,
                borderRadius: 4, padding: "3px 7px",
                minWidth: 32, textAlign: "center",
                flexShrink: 0, marginTop: 3,
                fontFamily: "'SF Mono','Fira Code',monospace",
              }}>
                {d.label}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: M.white }}>{d.title}</span>
                  <span style={{ fontSize: 10, color: M.sub, letterSpacing: 1 }}>{d.tag}</span>
                </div>
                <div style={{ fontSize: 13, color: M.sub, lineHeight: 1.6 }}>{d.description}</div>
              </div>
            </div>
          ))}
        </div>

        <Label text="Kit completo: todos os entregáveis" />
        <div style={{
          border: `1px solid ${M.border}`,
          borderRadius: 8,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
          marginBottom: 52,
        }}>
          {deliverables.map((d, i) => {
            const isPrimary = primaryIds.includes(d.id);
            return (
              <div key={d.id} style={{
                padding: "14px 18px",
                background: isPrimary ? M.s2 : M.s1,
                borderBottom: i < deliverables.length - (isMobile ? 1 : 2) ? `1px solid ${M.border}` : "none",
                borderRight: !isMobile && i % 2 === 0 ? `1px solid ${M.border}` : "none",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <span style={{
                  fontSize: 8, fontWeight: 700,
                  color: isPrimary ? accent : M.sub,
                  border: `1px solid ${isPrimary ? accent : M.border}`,
                  borderRadius: 3, padding: "2px 6px",
                  minWidth: 26, textAlign: "center",
                  flexShrink: 0, marginTop: 2,
                  letterSpacing: 0.3,
                  fontFamily: "'SF Mono','Fira Code',monospace",
                }}>
                  {d.label}
                </span>
                <div>
                  <div style={{
                    fontSize: 13,
                    color: isPrimary ? M.white : M.text,
                    fontWeight: isPrimary ? 600 : 400,
                    lineHeight: 1.3,
                  }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: 10, color: M.sub, marginTop: 2 }}>{d.tag}</div>
                </div>
              </div>
            );
          })}
        </div>

        <Label text="O que isso está custando hoje" color={M.red} />
        <div style={{
          border: `1px solid ${M.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20,
        }}>
          {[
            "Você assume riscos que deveriam estar documentados",
            "Escopo muda sem rastreabilidade",
            "Decisões desaparecem depois da reunião",
            "Análises de causa raiz viram debates de memória",
            "Sua capacidade técnica fica invisível",
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "16px 22px",
              background: M.s1,
              borderBottom: i < arr.length - 1 ? `1px solid ${M.border}` : "none",
            }}>
              <span style={{ color: M.red, fontWeight: 700, fontSize: 14, marginTop: 1 }}>×</span>
              <span style={{ fontSize: 14, color: M.text, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: M.sub, lineHeight: 1.75, marginBottom: 52, maxWidth: 560 }}>
          O problema raramente é falta de conhecimento. O problema é falta de evidência.
        </p>

        <Label text="Imagine sua próxima reunião" color={M.teal} />
        <p style={{ fontSize: 15, color: M.text, lineHeight: 1.75, marginBottom: 18, maxWidth: 560 }}>
          Imagine receber uma demanda agora. Antes da reunião terminar, você sai com:
        </p>
        <div style={{
          border: `1px solid ${M.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20,
        }}>
          {[
            "Estimativa pronta",
            "Premissas registradas",
            "Riscos documentados",
            "Escopo validado",
            "Histórico das decisões",
            "Evidência de quem assumiu cada risco",
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "16px 22px",
              background: i % 2 === 0 ? M.s1 : M.bg,
              borderBottom: i < arr.length - 1 ? `1px solid ${M.border}` : "none",
            }}>
              <span style={{ color: M.teal, fontWeight: 700, fontSize: 14, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 14, color: M.text, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: M.sub, lineHeight: 1.75, marginBottom: 52, maxWidth: 560 }}>
          A conversa deixa de ser sobre opinião. Passa a ser sobre decisão.
        </p>

        <Label text="Pra quem é isso" />
        <div style={{
          border: `1px solid ${M.border}`,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 52,
        }}>
          {[
            "Pra quem estima prazo em reunião e sente que está sozinho segurando o risco",
            "Pra quem já foi cobrado por um atraso que não foi decisão sua",
            "Pra quem entrega trabalho técnico sólido mas não sabe defender isso depois",
            "Pra quem está cansado de escrever a mesma estimativa do zero toda vez",
            "Pra quem lidera decisões técnicas e precisa que isso fique registrado, não na memória",
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "16px 22px",
              background: i % 2 === 0 ? M.s1 : M.bg,
              borderBottom: i < arr.length - 1 ? `1px solid ${M.border}` : "none",
            }}>
              <span style={{ color: M.teal, fontWeight: 700, fontSize: 13, marginTop: 2, fontFamily: mono }}>▸</span>
              <span style={{ fontSize: 14, color: M.text, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center",
          padding: "52px 24px",
          background: M.s1,
          border: `1px solid ${M.borderStrong}`,
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(46,196,182,0.06)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            color: M.teal, textTransform: "uppercase", marginBottom: 16,
          }}>
            Próximo passo
          </div>
          <h3 style={{
            fontSize: 26, fontWeight: 800, color: M.white,
            letterSpacing: -0.4, margin: "0 0 14px", lineHeight: 1.3,
          }}>
            Agora que você sabe exatamente onde está vulnerável, existe uma forma de transformar qualquer pedido em uma estimativa defensável.
          </h3>
          <p style={{
            fontSize: 15, color: M.sub, lineHeight: 1.75,
            maxWidth: 460, margin: "0 auto 28px",
          }}>
            StackCalc combina calculadoras de esforço, Squad de 9 agentes especializados,
            Levantamento de Escopo e kit de defesa técnica. Pronto para usar em 15 minutos.
          </p>

          <div style={{ marginBottom: 28 }}>
            <span style={{
              fontSize: 36, fontWeight: 800, color: M.white, letterSpacing: -0.5,
            }}>
              R$ 147
            </span>
            <span style={{ fontSize: 14, color: M.sub, marginLeft: 8 }}>
              acesso enquanto sua assinatura estiver ativa
            </span>
          </div>

          <a
            href="https://pay.hotmart.com/O103917102A?checkoutMode=10&bid=1771023220862&_hi=eyJjaWQiOiIxNzYxMjYyNDg5MDQ1NDUzOTQwOTI0MzY2NjI3MDAiLCJiaWQiOiIxNzYxMjYyNDg5MDQ1NDUzOTQwOTI0MzY2NjI3MDAiLCJzaWQiOiJkNDcxYzk5MTNiNjE0OWM1YTllYTAyZGJjZDQzYzA1MiJ9.1778636702957&utm_source=quiz&utm_medium=resultado&utm_campaign=stackcalc-quiz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: M.teal,
              color: M.bg,
              fontWeight: 800,
              fontSize: 16,
              padding: "16px 48px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: 0.3,
              boxShadow: "0 8px 28px rgba(46,196,182,0.25)",
            }}
          >
            Quero estimativas defensáveis
          </a>

          <div style={{ marginTop: 28 }}>
            <button
              onClick={restart}
              style={{
                all: "unset",
                fontSize: 13,
                color: M.sub,
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              Refazer o diagnóstico
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function Label({ text, color = M.sub }: { text: string; color?: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
    }}>
      <div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 2,
        color: M.sub, textTransform: "uppercase",
      }}>
        {text}
      </span>
    </div>
  );
}
