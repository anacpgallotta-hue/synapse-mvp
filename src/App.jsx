import { useState, useContext, createContext, useCallback, useRef, useEffect } from 'react'

// Lucide-style icon components (inline SVG to avoid CDN issues)
const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const Icon = ({ d, className = "", size = 20 }) => (
  <svg {...iconProps} width={size} height={size} className={className}><path d={d} /></svg>
);

const Bell = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const Clock = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const AlertTriangle = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const TrendingUp = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const Users = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const FolderOpen = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>;
const CheckCircle2 = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const ChevronLeft = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m15 18-6-6 6-6"/></svg>;
const ChevronDown = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m6 9 6 6 6-6"/></svg>;
const ChevronUp = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m18 15-6-6-6 6"/></svg>;
const Plus = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const MessageSquare = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const Send = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const ExternalLink = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>;
const Copy = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const Calendar = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const ArrowLeft = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Plane = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
const Sparkles = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
const X = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const Moon = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const Sun = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;

const DarkModeContext = createContext({ darkMode: false, setDarkMode: () => {} });

function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const Menu = ({ className = "", size = 20 }) => <svg {...iconProps} width={size} height={size} className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;

// ============================
// DATA INICIAL (mesmo do MVP)
// ============================
const initialTeam = [
  { id: "t1", name: "Melissa Zambon", role: "Executor", area: "eventos", activeTasks: 0 },
  { id: "t2", name: "Maria Eduarda Vittori", role: "Executor", area: "eventos", activeTasks: 0 },
  { id: "t3", name: "Carolina Guimarães", role: "Executor", area: "eventos", activeTasks: 0 },
  { id: "t4", name: "Samara Aboultaif", role: "Executor", area: "eventos", activeTasks: 0 },
];

const initialClients = [
  { id: "c1", name: "Ambev", contact: "João Mendes", whatsapp: "+5511999990001", responsible: "Ana Gallotta", nextMeeting: "2026-04-22T15:00", relationship: "estável" },
  { id: "c2", name: "Hotmart", contact: "Camila Torres", whatsapp: "+5511999990002", responsible: "Ana Gallotta", nextMeeting: "2026-04-25T10:00", relationship: "estável" },
  { id: "c3", name: "Red Bull", contact: "Lucas Braga", whatsapp: "+5511999990003", responsible: "Ana Gallotta", nextMeeting: "2026-04-28T14:00", relationship: "estável" },
  { id: "c4", name: "Seara", contact: "Fernanda Lopes", whatsapp: "+5511999990004", responsible: "Ana Gallotta", nextMeeting: "2026-05-02T11:00", relationship: "atenção" },
  { id: "c5", name: "XP", contact: "Ricardo Alves", whatsapp: "+5511999990005", responsible: "Ana Gallotta", nextMeeting: "2026-04-30T15:00", relationship: "estável" },
];

const initialProjects = [
  { id: "p1", name: "Gala de Premiação Anual", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-15", progress: 65, squad: ["t1", "t4"] },
  { id: "p2", name: "Festival de Esportes Radicais", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-28", progress: 30, squad: ["t2", "t3"] },
  { id: "p7", name: "Premiação Top Performers", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Ana Gallotta", deadline: "2026-07-10", progress: 10, squad: ["t1", "t2"] },
  { id: "p10", name: "Operações", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-30", progress: 0, squad: ["t3", "t4"] },
  { id: "p9", name: "Ativação de Marca - Evento Gastronômico", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Ana Gallotta", deadline: "2026-06-15", progress: 25, squad: ["t2", "t4"] },
];

// Projetos históricos — concluídos (clientes passados)
const historicProjects = [
  { id: "hp1", name: "Convenção Anual de Vendas", clientId: "c1", client: "Ambev", type: "Evento", status: "concluido", responsible: "Ana Gallotta", deadline: "2026-03-10" },
  { id: "hp2", name: "Summit Digital 2026", clientId: "c2", client: "Hotmart", type: "Evento", status: "concluido", responsible: "Ana Gallotta", deadline: "2026-02-20" },
  { id: "hp3", name: "Happy Hour Corporativo", clientId: "c1", client: "Ambev", type: "Evento", status: "concluido", responsible: "Ana Gallotta", deadline: "2026-03-01" },
  { id: "hp4", name: "Lançamento de Produto", clientId: "c4", client: "Seara", type: "Evento", status: "concluido", responsible: "Ana Gallotta", deadline: "2026-02-25" },
  { id: "hp5", name: "Workshop Inovação", clientId: "c2", client: "Hotmart", type: "Evento", status: "concluido", responsible: "Ana Gallotta", deadline: "2026-01-15" },
];

const initialTasks = [
  // p1 — Gala de Premiação Anual (XP) — squad: t1, t4
  { id: "tk5", title: "Organizar reunião de alinhamento pré-evento", projectId: "p1", project: "Gala de Premiação Anual", executor: "t1", executorName: "Melissa Zambon", priority: "Alta", status: "concluida", area: "eventos", deadline: "2026-04-20T12:00", description: "Agendar e organizar reunião de alinhamento com todos os stakeholders antes do evento", checklist: [{ text: "Definir pauta", done: true }, { text: "Enviar convites", done: true }, { text: "Preparar material", done: true }], attachments: [], submittedLink: "https://docs.google.com/document/reuniao-alinhamento", qaComment: "", feedbackOrigin: null },
  { id: "tk8", title: "Definir decoração e ambientação", projectId: "p1", project: "Gala de Premiação Anual", executor: "t4", executorName: "Samara Aboultaif", priority: "Alta", status: "em_execucao", area: "eventos", deadline: "2026-05-10T14:00", description: "Pesquisar e definir conceito visual, decoração e ambientação da Gala", checklist: [{ text: "Levantar referências visuais", done: true }, { text: "Orçar fornecedores de decoração", done: false }, { text: "Apresentar proposta ao líder", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk13", title: "Montar apresentação de proposta para XP", projectId: "p1", project: "Gala de Premiação Anual", executor: "t1", executorName: "Melissa Zambon", priority: "Alta", status: "a_fazer", area: "eventos", deadline: "2026-05-08T10:00", description: "Criar deck de apresentação da proposta criativa da Gala para aprovação do cliente XP", checklist: [{ text: "Estruturar narrativa", done: false }, { text: "Criar slides", done: false }, { text: "Revisar com líder", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  // p2 — Festival de Esportes Radicais (Red Bull) — squad: t2, t3
  { id: "tk11", title: "Mapear atividades radicais", projectId: "p2", project: "Festival de Esportes Radicais", executor: "t2", executorName: "Maria Eduarda Vittori", priority: "Alta", status: "concluida", area: "eventos", deadline: "2026-04-28T14:00", description: "Pesquisar e definir quais atividades radicais estarão disponíveis no festival", checklist: [{ text: "Listar modalidades", done: true }, { text: "Orçar fornecedores especializados", done: true }, { text: "Avaliar segurança", done: true }], attachments: [], submittedLink: "https://docs.google.com/spreadsheets/atividades-radicais", qaComment: "", feedbackOrigin: null },
  { id: "tk12", title: "Criar plano de comunicação visual", projectId: "p2", project: "Festival de Esportes Radicais", executor: "t3", executorName: "Carolina Guimarães", priority: "Média", status: "em_execucao", area: "eventos", deadline: "2026-05-18T16:00", description: "Desenvolver identidade visual e materiais de comunicação do festival", checklist: [{ text: "Criar mood board", done: true }, { text: "Definir paleta de cores", done: true }, { text: "Produzir peças gráficas", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  // p9 — Ativação Gastronômica (Red Bull) — squad: t2, t4
  { id: "tk6", title: "Montar checklist de fornecedores", projectId: "p9", project: "Ativação de Marca - Evento Gastronômico", executor: "t2", executorName: "Maria Eduarda Vittori", priority: "Alta", status: "concluida", area: "eventos", deadline: "2026-04-10T17:00", description: "Listar e confirmar todos os fornecedores para o evento gastronômico", checklist: [{ text: "Buffet", done: true }, { text: "Som e luz", done: true }, { text: "Decoração", done: true }], attachments: [], submittedLink: "https://docs.google.com/spreadsheets/fornecedores-gastro", qaComment: "", feedbackOrigin: null },
  { id: "tk9", title: "Planejar logística do espaço", projectId: "p9", project: "Ativação de Marca - Evento Gastronômico", executor: "t4", executorName: "Samara Aboultaif", priority: "Média", status: "a_fazer", area: "eventos", deadline: "2026-05-20T12:00", description: "Definir layout do espaço, mapa de áreas e fluxo de convidados", checklist: [{ text: "Visitar local", done: false }, { text: "Criar mapa de áreas", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  // p10 — Operações (XP) — squad: t3, t4
  { id: "tk7", title: "Criar cronograma do evento", projectId: "p10", project: "Operações", executor: "t4", executorName: "Samara Aboultaif", priority: "Média", status: "em_qa", area: "eventos", deadline: "2026-04-25T12:00", description: "Desenvolver cronograma detalhado hora a hora do evento", checklist: [{ text: "Definir programação", done: true }, { text: "Alocar espaços", done: true }], attachments: [], submittedLink: "https://docs.google.com/spreadsheets/cronograma", qaComment: "", feedbackOrigin: null },
  { id: "tk10", title: "Contratar equipe de apoio operacional", projectId: "p10", project: "Operações", executor: "t3", executorName: "Carolina Guimarães", priority: "Alta", status: "a_fazer", area: "eventos", deadline: "2026-05-15T10:00", description: "Selecionar e contratar equipe de apoio para o dia do evento", checklist: [{ text: "Definir perfis necessários", done: false }, { text: "Contatar agências", done: false }, { text: "Confirmar equipe", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
];

const initialLearnings = [
  { id: "l1", title: "Checklist de fornecedores incompleto", description: "Item reprovado em QA: fornecedor de som e iluminação não tinha contrato confirmado. Precisou ser refeito antes da entrega ao cliente.", client: "Ambev", clientId: "c1", date: "2025-12-18", type: "erro", origin: "QA", tags: ["fornecedores", "qa", "checklist"], area: "eventos" },
  { id: "l2", title: "Prazo de aprovação subestimado", description: "Cliente Hotmart levou 5 dias úteis para aprovar roteiro. Considerar buffer maior em cronogramas futuros.", client: "Hotmart", clientId: "c2", date: "2026-01-10", type: "aprendizado", origin: "Líder", tags: ["prazo", "aprovação", "cronograma"], area: "eventos" },
  { id: "l3", title: "Briefing incompleto causou retrabalho", description: "Red Bull pediu alterações no conceito visual após ver primeira entrega. Briefing não detalhava preferências visuais. Incluir referências visuais obrigatórias no briefing.", client: "Red Bull", clientId: "c3", date: "2026-03-05", type: "erro", origin: "QA", tags: ["briefing", "retrabalho", "visual"], area: "eventos" },
  { id: "l4", title: "Formato de apresentação ideal para XP", description: "XP prefere decks curtos (max 10 slides) com dados concretos e ROI projetado. Evitar slides muito conceituais.", client: "XP", clientId: "c5", date: "2026-02-20", type: "aprendizado", origin: "Líder", tags: ["apresentação", "formato", "xp"], area: "eventos" },
  { id: "l5", title: "Seara exige aprovação jurídica", description: "Todo material com marca Seara precisa de aprovação do jurídico deles. Adicionar 3 dias úteis ao prazo.", client: "Seara", clientId: "c4", date: "2025-11-15", type: "aprendizado", origin: "Líder", tags: ["jurídico", "aprovação", "prazo"], area: "eventos" },
];

const initialFeedbacks = [
  // Feedback sobre entregas CONCLUÍDAS — cliente só dá feedback no que já recebeu
  { id: "f2", projectId: "p2", clientId: "c3", clientName: "Red Bull", type: "Sugestão", text: "Incluir opção de atividade alternativa para participantes com menor preparo físico. O mapeamento ficou bom mas faltou pensar em acessibilidade.", date: "2026-05-01", status: "pendente", assignedTaskId: null, relatedTaskId: "tk11" },
  { id: "f5", projectId: "p1", clientId: "c5", clientName: "XP", type: "Ajuste", text: "A reunião de alinhamento pré-evento não cobriu o tema de logística de transporte. Refazer com esse ponto.", date: "2026-04-22", status: "pendente", assignedTaskId: null, relatedTaskId: "tk5" },
  { id: "f4", projectId: "p9", clientId: "c3", clientName: "Red Bull", type: "Ajuste", text: "Precisamos de mais opções de cardápio vegano para o evento gastronômico. Reavaliar fornecedores do checklist.", date: "2026-04-15", status: "pendente", assignedTaskId: null, relatedTaskId: "tk6" },
  // Feedback geral sobre projeto (sem relatedTaskId — elogio não precisa de entrega específica)
  { id: "f3", projectId: "p1", clientId: "c5", clientName: "XP", type: "Elogio", text: "Excelente organização do cronograma da Gala. Time muito ágil nas respostas.", date: "2026-04-25", status: "pendente", assignedTaskId: null, relatedTaskId: null },
];

// Notas internas por cliente — preferências, observações da equipe
const initialClientNotes = [
  { id: "cn1", clientId: "c5", author: "Ana Gallotta", date: "2026-03-15", tag: "comunicacao", text: "XP prefere comunicação via e-mail formal. Evitar WhatsApp para aprovações — sempre documentar por escrito." },
  { id: "cn2", clientId: "c5", author: "Ana Gallotta", date: "2026-04-01", tag: "processo", text: "Ricardo (contato principal) viaja muito. Agendar reuniões com 1 semana de antecedência mínima." },
  { id: "cn3", clientId: "c3", author: "Ana Gallotta", date: "2026-02-10", tag: "gostou", text: "Red Bull gosta de propostas ousadas e criativas. Não ter medo de sugerir ideias fora do convencional." },
  { id: "cn4", clientId: "c3", author: "Ana Gallotta", date: "2026-03-20", tag: "comunicacao", text: "Lucas (contato) é muito visual — sempre levar mockups e referências nas reuniões. Evitar só texto." },
  { id: "cn5", clientId: "c1", author: "Ana Gallotta", date: "2026-01-08", tag: "processo", text: "Ambev tem processo de aprovação interno demorado. Sempre enviar materiais com pelo menos 10 dias de antecedência." },
  { id: "cn6", clientId: "c2", author: "Ana Gallotta", date: "2026-01-20", tag: "comunicacao", text: "Hotmart prefere reuniões rápidas de 15min. Ir direto ao ponto, sem muita contextualização." },
  { id: "cn7", clientId: "c4", author: "Ana Gallotta", date: "2025-12-05", tag: "nao_gostou", text: "Seara exige que toda comunicação visual passe pelo jurídico. Incluir esse passo no cronograma sempre." },
];

// ============================
// CONTEXT
// ============================
const AppContext = createContext(null);

function AppProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [projects, setProjects] = useState(initialProjects);
  const [clients] = useState(initialClients);
  const [team] = useState(initialTeam);
  const [learnings, setLearnings] = useState(initialLearnings);
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [clientNotes, setClientNotes] = useState(initialClientNotes);

  const addClientNote = useCallback((clientId, text, tag = null, author = "Ana Gallotta") => {
    setClientNotes(prev => [{ id: "cn" + Date.now(), clientId, author, date: new Date().toISOString().split("T")[0], text, tag: tag || null }, ...prev]);
  }, []);

  const archiveElogio = useCallback((feedbackId, noteText, clientId, clientName) => {
    addClientNote(clientId, noteText, "elogio", clientName || "Cliente");
    setFeedbacks(prev => prev.filter(f => f.id !== feedbackId));
  }, [addClientNote]);

  const createProject = useCallback((projectData) => {
    const newProject = { ...projectData, id: "p" + Date.now(), status: "em_execucao", progress: 0, area: "eventos", type: "Evento" };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = useCallback((projectId, updates) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  }, []);

  // Notifications: target = "executor:t1", "qa", "lider", "client:c5"
  // priority = "info" | "warning" | "danger"
  const [notifications, setNotifications] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [qaAlerts, setQaAlerts] = useState([]);

  // Chat system: keyed by channelId
  // Channels: "qa-lider" (QA ↔ Líder direct), "lider-t1" (Líder ↔ Executor t1), etc.
  const today = new Date().toISOString().split("T")[0];
  const [chatMessages, setChatMessages] = useState({
    "qa-lider": [
      { id: 1, from: "qa", author: "QA", text: "Briefing do Festival de Esportes Radicais enviado. Prioridade alta — cliente espera retorno até sexta.", time: "09:30", date: today },
      { id: 2, from: "lider", author: "Ana Gallotta", text: "Recebi! Vou distribuir as tarefas hoje. Alguma restrição de orçamento?", time: "09:45", date: today },
      { id: 3, from: "qa", author: "QA", text: "Orçamento aprovado sem restrições. Foco na qualidade visual — Red Bull é exigente.", time: "10:02", date: today },
    ],
    "lider-t1": [
      { id: 4, from: "lider", author: "Ana Gallotta", text: "Mel, preciso que priorize o cronograma do evento. Prazo apertado.", time: "10:15", date: today },
    ],
    "lider-t2": [],
    "lider-t3": [],
    "lider-t4": [],
  });
  const [chatLastRead, setChatLastRead] = useState({
    "qa-lider": { qa: 3, lider: 2 },
    "lider-t1": { lider: 4, "t1": 0 },
    "lider-t2": { lider: 0, "t2": 0 },
    "lider-t3": { lider: 0, "t3": 0 },
    "lider-t4": { lider: 0, "t4": 0 },
  });

  const sendChatMsg = useCallback((channelId, from, author, text) => {
    const msg = { id: Date.now(), from, author, text, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), date: new Date().toISOString().split("T")[0] };
    setChatMessages(prev => ({ ...prev, [channelId]: [...(prev[channelId] || []), msg] }));
    setChatLastRead(prev => ({ ...prev, [channelId]: { ...(prev[channelId] || {}), [from]: msg.id } }));
    return msg;
  }, []);

  const markChatRead = useCallback((channelId, role) => {
    setChatMessages(prev => {
      const msgs = prev[channelId] || [];
      if (msgs.length === 0) return prev;
      setChatLastRead(p => ({ ...p, [channelId]: { ...(p[channelId] || {}), [role]: msgs[msgs.length - 1].id } }));
      return prev;
    });
  }, []);

  const getChatUnread = useCallback((channelId, role) => {
    const msgs = chatMessages[channelId] || [];
    const lastRead = (chatLastRead[channelId] || {})[role] || 0;
    return msgs.filter(m => m.from !== role && m.id > lastRead).length;
  }, [chatMessages, chatLastRead]);

  const addQaAlert = useCallback((taskId, executorId, text) => {
    setQaAlerts(prev => [...prev, { id: "qa-alert-" + Date.now(), taskId, executorId, text, date: new Date().toISOString().split("T")[0] }]);
  }, []);

  const notify = useCallback((text, target, priority = "info") => {
    setNotifications(prev => [{ id: "n" + Date.now() + Math.random(), text, date: new Date().toISOString().split("T")[0], read: false, target, priority }, ...prev]);
  }, []);

  // Smart alerts: computed from task state (overdue, at risk, devolvida)
  const getSmartAlerts = useCallback((executorId) => {
    const now = new Date();
    const alerts = [];
    const myTasks = tasks.filter(t => t.executor === executorId);
    myTasks.forEach(t => {
      if (t.status === "concluida") return;
      const deadline = new Date(t.deadline);
      const diffHours = (deadline - now) / (1000 * 60 * 60);
      if (t.feedbackOrigin && (t.status === "a_fazer" || t.status === "em_execucao")) {
        alerts.push({ id: "smart-fb-" + t.id, text: `Feedback do cliente: "${t.title}" — ${t.feedbackOrigin.text.substring(0, 80)}`, priority: "danger", date: t.deadline, taskId: t.id });
      }
      if (t.status === "devolvida") {
        alerts.push({ id: "smart-dev-" + t.id, text: `QA devolveu "${t.title}" — ${t.qaComment}`, priority: "danger", date: t.deadline, isDevolvida: true, taskId: t.id });
      }
      if (diffHours < 0 && t.status !== "devolvida") {
        alerts.push({ id: "smart-late-" + t.id, text: `Atrasada: "${t.title}" — prazo era ${deadline.toLocaleDateString("pt-BR")}`, priority: "danger", date: t.deadline, taskId: t.id });
      } else if (diffHours >= 0 && diffHours < 48 && t.status !== "devolvida") {
        alerts.push({ id: "smart-risk-" + t.id, text: `Em risco: "${t.title}" — prazo em ${Math.round(diffHours)}h`, priority: "warning", date: t.deadline, taskId: t.id });
      }
    });
    // Inject manual QA alerts for this executor
    qaAlerts.filter(qa => qa.executorId === executorId).forEach(qa => {
      alerts.push({ id: qa.id, text: qa.text, priority: "warning", date: qa.date, isQaAlert: true, taskId: qa.taskId });
    });
    return alerts.filter(a => !dismissedAlerts.has(a.id)).sort((a, b) => (a.priority === "danger" ? 0 : 1) - (b.priority === "danger" ? 0 : 1));
  }, [tasks, dismissedAlerts, qaAlerts]);

  const dismissSmartAlert = useCallback((alertId, alertText, target, priority) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    // Move to history as a read notification
    setNotifications(prev => [{ id: "hist-" + alertId, text: alertText, date: new Date().toISOString().split("T")[0], read: true, target, priority }, ...prev]);
  }, []);

  const addTask = useCallback((task) => {
    const newTask = { ...task, id: "tk" + Date.now(), status: "a_fazer", submittedLink: "", qaComment: "", feedbackOrigin: null };
    setTasks(prev => [...prev, newTask]);
    notify(`Nova tarefa atribuída: "${task.title}"`, "executor:" + task.executor, "info");
  }, [notify]);

  const updateTaskStatus = useCallback((taskId, newStatus, extra = {}) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, ...extra } : t));
  }, []);

  const submitToQA = useCallback((taskId, link, submittedFiles) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`"${task?.title}" enviada para revisão por ${task?.executorName}`, "qa", "info");
      return prev.map(t => t.id === taskId ? { ...t, status: "em_qa", submittedLink: link, submittedFiles: submittedFiles || [] } : t);
    });
  }, [notify]);

  const approveTask = useCallback((taskId, comment) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`Sua tarefa "${task?.title}" foi aprovada pelo QA!`, "executor:" + task?.executor, "info");
      notify(`"${task?.title}" aprovada com sucesso`, "qa", "info");
      return prev.map(t => t.id === taskId ? { ...t, status: "concluida", qaComment: comment || "Aprovado" } : t);
    });
  }, [notify]);

  const rejectTask = useCallback((taskId, comment) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`QA devolveu "${task?.title}": ${comment}`, "executor:" + task?.executor, "danger");
      return prev.map(t => t.id === taskId ? { ...t, status: "devolvida", qaComment: comment } : t);
    });
  }, [notify]);

  const toggleChecklist = useCallback((taskId, index) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const newChecklist = [...t.checklist];
      newChecklist[index] = { ...newChecklist[index], done: !newChecklist[index].done };
      return { ...t, checklist: newChecklist };
    }));
  }, []);

  const addFeedback = useCallback((fb) => {
    const newFb = { ...fb, id: "f" + Date.now(), status: "pendente", assignedTaskId: null };
    setFeedbacks(prev => [...prev, newFb]);
    notify(`Novo feedback de ${fb.clientName}: "${fb.text.substring(0, 60)}..."`, "lider", "warning");
  }, [notify]);

  const assignFeedbackAsTask = useCallback((feedbackId, taskData, reopenTaskId) => {
    setFeedbacks(prev => {
      const fb = prev.find(f => f.id === feedbackId);
      if (reopenTaskId) {
        // Reopen existing task with feedback — don't create a duplicate
        setTasks(t => t.map(tk => tk.id === reopenTaskId ? { ...tk, status: "devolvida", feedbackOrigin: { type: fb.type, text: fb.text }, qaComment: `Feedback do cliente (${fb.clientName}): ${fb.text}${taskData.instructions ? "\n\nInstruções do líder: " + taskData.instructions : ""}` } : tk));
        const task = tasks.find(t => t.id === reopenTaskId);
        notify(`Feedback do cliente reabriu tarefa: "${task?.title || taskData.title}"`, "executor:" + (task?.executor || taskData.executor), "warning");
      } else {
        // General feedback without related task — create new task
        const newTask = { ...taskData, id: "tk" + Date.now(), status: "a_fazer", submittedLink: "", qaComment: "", feedbackOrigin: { type: fb.type, text: fb.text } };
        setTasks(t => [...t, newTask]);
        notify(`Nova tarefa de feedback: "${taskData.title}"`, "executor:" + taskData.executor, "warning");
      }
      return prev.filter(f => f.id !== feedbackId);
    });
  }, [notify, tasks]);

  const addLearning = useCallback((learning) => {
    setLearnings(prev => [...prev, { ...learning, id: "l" + Date.now() }]);
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  const resubmitTask = useCallback((taskId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`"${task?.title}" retomada para execução por ${task?.executorName}`, "qa", "info");
      return prev.map(t => t.id === taskId ? { ...t, status: "em_execucao", qaComment: "" } : t);
    });
  }, [notify]);

  const revertFromQA = useCallback((taskId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`"${task?.title}" retirada do QA por ${task?.executorName}`, "qa", "info");
      return prev.map(t => t.id === taskId ? { ...t, status: "em_execucao", submittedLink: "", submittedFiles: [] } : t);
    });
  }, [notify]);

  const revertFromCompleted = useCallback((taskId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`Aprovação revertida: "${task?.title}" voltou para revisão`, "qa", "warning");
      notify(`"${task?.title}" teve aprovação revertida — aguarde nova revisão`, "executor:" + task?.executor, "warning");
      return prev.map(t => t.id === taskId ? { ...t, status: "em_qa", qaComment: "" } : t);
    });
  }, [notify]);

  const revertFromDevolvida = useCallback((taskId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`Devolução revertida: "${task?.title}" voltou para revisão QA`, "qa", "info");
      notify(`"${task?.title}" retornou para QA — devolução cancelada`, "executor:" + task?.executor, "info");
      return prev.map(t => t.id === taskId ? { ...t, status: "em_qa", qaComment: "" } : t);
    });
  }, [notify]);

  const clientApproveTask = useCallback((taskId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`Cliente aprovou a entrega: "${task?.title}"`, "lider", "info");
      notify(`Entrega "${task?.title}" aprovada pelo cliente!`, "executor:" + task?.executor, "info");
      return prev.map(t => t.id === taskId ? { ...t, clientApproved: true } : t);
    });
  }, [notify]);

  const clientRejectTask = useCallback((taskId, feedbackText, clientId, clientName, projectId) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      notify(`Cliente reprovou "${task?.title}" com feedback`, "lider", "danger");
      notify(`Entrega "${task?.title}" recebeu feedback do cliente — retornando para execução`, "executor:" + task?.executor, "warning");
      return prev.map(t => t.id === taskId ? { ...t, status: "a_fazer", clientApproved: false, qaComment: "", submittedLink: "", submittedFiles: [] } : t);
    });
    // Create feedback entry
    const newFb = { id: "f" + Date.now(), projectId, clientId, clientName, type: "Ajuste", text: feedbackText, relatedTaskId: taskId, date: new Date().toISOString().split("T")[0], status: "pendente", assignedTaskId: null };
    setFeedbacks(prev => [...prev, newFb]);
  }, [notify]);

  const dismissNotification = useCallback((notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  }, []);

  const getTeamWithLoad = useCallback((area) => {
    return team.filter(m => m.area === area).map(m => ({
      ...m,
      activeTasks: tasks.filter(t => t.executor === m.id && !["concluida"].includes(t.status)).length,
      loadStatus: (() => {
        const count = tasks.filter(t => t.executor === m.id && !["concluida"].includes(t.status)).length;
        if (count === 0) return "Disponível";
        if (count <= 3) return "Moderado";
        return "Sobrecarregado";
      })()
    }));
  }, [team, tasks]);

  return (
    <AppContext.Provider value={{ tasks, projects, clients, team, learnings, feedbacks, clientNotes, notifications, notify, addQaAlert, chatMessages, chatLastRead, sendChatMsg, markChatRead, getChatUnread, addTask, updateTaskStatus, submitToQA, approveTask, rejectTask, toggleChecklist, addFeedback, assignFeedbackAsTask, addLearning, addClientNote, archiveElogio, createProject, updateProject, deleteTask, resubmitTask, revertFromQA, revertFromCompleted, revertFromDevolvida, clientApproveTask, clientRejectTask, dismissNotification, dismissSmartAlert, getTeamWithLoad, getSmartAlerts, setNotifications }}>
      {children}
    </AppContext.Provider>
  );
}

// ============================
// COMPONENTES UI
// ============================
function DarkModeStyles() {
  return (
    <style>{`
      .dark { color-scheme: dark; }

      /* ── Page & surface backgrounds ── */
      .dark .bg-stone-50  { background-color: #0c0a09; }
      .dark .bg-white     { background-color: #1c1917; }
      .dark .bg-stone-100 { background-color: #292524; }
      .dark .bg-stone-200 { background-color: #44403c; }

      /* ── Text ── */
      .dark .text-stone-900 { color: #f5f5f4; }
      .dark .text-stone-800 { color: #e7e5e4; }
      .dark .text-stone-700 { color: #d6d3d0; }
      .dark .text-stone-600 { color: #a8a29e; }
      .dark .text-stone-500 { color: #a8a29e; }
      .dark .text-stone-400 { color: #78716c; }
      .dark .text-gray-500  { color: #a8a29e; }

      /* ── Borders ── */
      .dark .border-stone-200 { border-color: #292524; }
      .dark .border-stone-300 { border-color: #44403c; }
      .dark .border-b.border-stone-200, .dark .border-stone-200 { border-color: #292524; }

      /* ── Tabs with border-b-2 (QA, Líder) ── */
      .dark .border-stone-900 { border-color: #f5f5f4; }

      /* ── Hover states ── */
      .dark .hover\\:bg-stone-50:hover  { background-color: #292524; }
      .dark .hover\\:bg-stone-100:hover { background-color: #44403c; }
      .dark .hover\\:text-stone-900:hover { color: #f5f5f4; }
      .dark .hover\\:text-stone-700:hover { color: #d6d3d0; }
      .dark .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.6); }

      /* ── Shadows (deeper for dark bg) ── */
      .dark .shadow-sm  { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5); }
      .dark .shadow-md  { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.6); }
      .dark .shadow-lg  { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.7); }
      .dark .shadow-xl  { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.7); }
      .dark .shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.8); }

      /* ── Inputs & textareas ── */
      .dark input, .dark textarea, .dark select {
        background-color: #1c1917 !important;
        color: #f5f5f4 !important;
        border-color: #44403c !important;
      }
      .dark input::placeholder, .dark textarea::placeholder { color: #78716c !important; }
      .dark input:focus, .dark textarea:focus, .dark select:focus { border-color: #57534e !important; }

      /* ── Accent bg softening (pastel → translucent) ── */
      .dark .bg-emerald-100 { background-color: rgba(16,185,129,0.12); }
      .dark .bg-emerald-50  { background-color: rgba(16,185,129,0.08); }
      .dark .text-emerald-800, .dark .text-emerald-700 { color: #6ee7b7; }
      .dark .border-emerald-300 { border-color: rgba(16,185,129,0.25); }

      .dark .bg-pink-100 { background-color: rgba(236,72,153,0.12); }
      .dark .text-pink-800, .dark .text-pink-700 { color: #f9a8d4; }
      .dark .border-pink-300 { border-color: rgba(236,72,153,0.25); }

      .dark .bg-amber-100 { background-color: rgba(245,158,11,0.12); }
      .dark .text-amber-800, .dark .text-amber-700 { color: #fcd34d; }
      .dark .border-amber-300 { border-color: rgba(245,158,11,0.25); }

      .dark .bg-violet-100 { background-color: rgba(139,92,246,0.12); }
      .dark .text-violet-800, .dark .text-violet-700 { color: #c4b5fd; }
      .dark .border-violet-300 { border-color: rgba(139,92,246,0.25); }

      .dark .bg-sky-100 { background-color: rgba(14,165,233,0.12); }
      .dark .text-sky-800, .dark .text-sky-700 { color: #7dd3fc; }
      .dark .border-sky-300 { border-color: rgba(14,165,233,0.25); }

      .dark .bg-orange-100 { background-color: rgba(249,115,22,0.12); }
      .dark .bg-orange-50  { background-color: rgba(249,115,22,0.08); }
      .dark .text-orange-800, .dark .text-orange-700, .dark .text-orange-600 { color: #fdba74; }
      .dark .border-orange-300 { border-color: rgba(249,115,22,0.25); }

      .dark .bg-rose-100 { background-color: rgba(244,63,94,0.12); }
      .dark .text-rose-800, .dark .text-rose-700 { color: #fda4af; }
      .dark .border-rose-300 { border-color: rgba(244,63,94,0.25); }

      .dark .bg-red-100 { background-color: rgba(239,68,68,0.12); }
      .dark .bg-red-50  { background-color: rgba(239,68,68,0.08); }
      .dark .text-red-800, .dark .text-red-700, .dark .text-red-600 { color: #fca5a5; }
      .dark .border-red-300 { border-color: rgba(239,68,68,0.25); }

      .dark .bg-yellow-100 { background-color: rgba(234,179,8,0.12); }
      .dark .text-yellow-800, .dark .text-yellow-700 { color: #fde047; }
      .dark .border-yellow-300 { border-color: rgba(234,179,8,0.25); }

      .dark .bg-sky-50 { background-color: rgba(14,165,233,0.08); }

      /* ── Vibrant accent colors — keep as-is ── */
      .dark .bg-pink-500    { background-color: #ec4899; }
      .dark .bg-emerald-500 { background-color: #10b981; }
      .dark .bg-amber-500   { background-color: #f59e0b; }
      .dark .bg-violet-500  { background-color: #8b5cf6; }
      .dark .bg-sky-500     { background-color: #0ea5e9; }
      .dark .bg-red-500     { background-color: #ef4444; }
      .dark .bg-red-400     { background-color: #f87171; }
      .dark .bg-yellow-500  { background-color: #eab308; }
      .dark .bg-stone-400   { background-color: #78716c; }

      /* ── Hover vibrant ── */
      .dark .hover\\:bg-pink-600:hover    { background-color: #db2777; }
      .dark .hover\\:bg-sky-600:hover     { background-color: #0284c7; }
      .dark .hover\\:bg-emerald-600:hover { background-color: #059669; }
      .dark .hover\\:bg-yellow-600:hover  { background-color: #ca8a04; }

      /* ── Alert borders ── */
      .dark .border-l-red-500    { border-left-color: #ef4444; }
      .dark .border-l-orange-400 { border-left-color: #fb923c; }

      /* ── Dividers ── */
      .dark .divide-stone-200 > :not([hidden]) ~ :not([hidden]) { border-color: #292524; }

      /* ── Overlay / modal backdrop ── */
      .dark .bg-black.bg-opacity-40 { background-color: rgba(0,0,0,0.6); }

      /* ── Default border (Tailwind .border / .border-b without explicit color) ── */
      .dark .border, .dark .border-b, .dark .border-t { --tw-border-opacity: 1; border-color: rgb(41 37 36 / var(--tw-border-opacity)); }

      /* ── Inline filter pills (bg-stone-900 in dark → invert) ── */
      .dark .bg-stone-900.text-white { background-color: #e7e5e4; color: #1c1917; }
      .dark .border-stone-900 { border-color: #e7e5e4; }

      /* ── Scrollbar ── */
      .dark ::-webkit-scrollbar { width: 6px; }
      .dark ::-webkit-scrollbar-track { background: #0c0a09; }
      .dark ::-webkit-scrollbar-thumb { background: #44403c; border-radius: 3px; }

      /* ══════ RESPONSIVE / MOBILE ══════ */
      @media (max-width: 767px) {
        /* Tighten card padding on mobile */
        .p-5 { padding: 1rem; }
        .p-6 { padding: 1rem; }
        .p-8 { padding: 1.25rem; }
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-6 { margin-bottom: 1rem; }
        .gap-6 { gap: 1rem; }
        .gap-4 { gap: 0.75rem; }
        /* Text sizes */
        .text-xl { font-size: 1.125rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.25rem; line-height: 1.75rem; }
        /* Prevent horizontal overflow */
        body { overflow-x: hidden; }
        /* Kanban horizontal scroll hint */
        .snap-x::-webkit-scrollbar { display: none; }
        .snap-x { -ms-overflow-style: none; scrollbar-width: none; }
      }
    `}</style>
  );
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-stone-100 text-stone-700 border-stone-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-300",
    warning: "bg-orange-100 text-orange-800 border-orange-300",
    danger: "bg-rose-100 text-rose-800 border-rose-300",
    info: "bg-sky-100 text-sky-800 border-sky-300",
    accent: "bg-amber-100 text-amber-800 border-amber-300",
    purple: "bg-violet-100 text-violet-800 border-violet-300",
    pink: "bg-pink-100 text-pink-800 border-pink-300",
  };
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variants[variant] || variants.default} ${className}`}>{children}</span>;
}

function Button({ children, variant = "default", size = "default", className = "", ...props }) {
  const { darkMode } = useContext(DarkModeContext);
  const light = {
    default: "bg-stone-900 text-white hover:bg-stone-800",
    outline: "bg-white text-stone-900 border border-stone-300 hover:bg-stone-50",
    ghost: "bg-transparent text-stone-700 hover:bg-stone-100",
    nav: "bg-transparent text-stone-600 hover:bg-stone-100 text-sm",
    navActive: "bg-stone-900 text-white text-sm",
  };
  const dark = {
    default: "bg-white text-stone-900 hover:bg-stone-200",
    outline: "bg-stone-800 text-stone-200 border border-stone-600 hover:bg-stone-700",
    ghost: "bg-transparent text-stone-300 hover:bg-stone-800",
    nav: "bg-transparent text-stone-400 hover:bg-stone-800 text-sm",
    navActive: "bg-stone-200 text-stone-900 text-sm",
  };
  const variants = darkMode ? dark : light;
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    icon: "p-2",
  };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = "", onClick }) {
  const { darkMode } = useContext(DarkModeContext);
  const base = darkMode
    ? "bg-stone-900 rounded-xl border border-stone-800 shadow-sm"
    : "bg-white rounded-xl border border-stone-200 shadow-sm";
  return <div onClick={onClick} className={`${base} ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}>{children}</div>;
}

// ============================
// HEADER
// ============================
function Header({ currentView, setView, currentExecutor, setShowNotif, notifCount, onHelp, showBell = true, darkMode, setDarkMode }) {
  const mobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const allNavItems = [
    { label: "Executor", view: "executor" },
    { label: "QA", view: "qa_selector" },
    { label: "Líder", view: "lider_selector" },
    { label: "Histórico", view: "clientes" },
    { label: "Cliente", view: "client_selector" },
    { label: "Trocar", view: "trocar_executor" },
  ];

  const isQA = currentView.startsWith("qa");
  const isLider = currentView.startsWith("lider");
  const isProjectDetail = currentView === "project_detail";

  const isActive = (itemView) => {
    if (itemView === "executor" && (currentView === "executor" || isProjectDetail)) return true;
    if (itemView === "qa_selector" && isQA) return true;
    if (itemView === "lider_selector" && isLider) return true;
    if (itemView === "client_selector" && (currentView === "client_selector" || currentView === "experiencia_cliente")) return true;
    if (itemView === currentView) return true;
    return false;
  };

  const headerTitle = isQA
    ? "Portal QA"
    : isLider
    ? "Portal Líder"
    : isProjectDetail ? "Detalhe do Projeto"
    : "Synapse";

  const subtitle = isQA
    ? "Revise entregas, devolva com comentários claros e gere aprendizados para o time."
    : isLider
    ? "Gerencie projetos e distribua tarefas para o time."
    : currentView === "executor" ? `Olá, ${currentExecutor}`
    : null;

  const navItem = (item) => (
    <Button key={item.view} variant={isActive(item.view) ? "navActive" : "nav"} size="sm" onClick={() => { setView(item.view); setMenuOpen(false); }} className={mobile ? "w-full justify-start" : ""}>
      {item.label}
    </Button>
  );

  return (
    <header className={`border-b sticky top-0 z-20 ${darkMode ? "border-stone-800 bg-stone-950" : "border-stone-200 bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h1 className={`text-lg md:text-2xl font-bold truncate ${darkMode ? "text-white" : "text-stone-900"}`}>{headerTitle}</h1>
            {subtitle && !mobile && <p className={`text-sm ${darkMode ? "text-stone-400" : "text-stone-500"}`}>{subtitle}</p>}
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
            {/* Desktop nav */}
            {!mobile && allNavItems.map(navItem)}
            {!mobile && onHelp && (
              <Button variant="ghost" size="sm" onClick={onHelp} className="text-stone-400 hover:text-stone-700 gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span className="text-xs">Ajuda</span>
              </Button>
            )}
            <button onClick={() => setDarkMode(prev => !prev)} className={`p-2 rounded-md transition-all ${darkMode ? "text-amber-400 hover:bg-stone-800" : "text-stone-400 hover:bg-stone-100 hover:text-stone-700"}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {showBell && (
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setShowNotif(prev => !prev)}>
                  <Bell size={20} />
                  {notifCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{notifCount}</span>}
                </Button>
              </div>
            )}
            {/* Mobile hamburger */}
            {mobile && (
              <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-md ${darkMode ? "text-stone-300 hover:bg-stone-800" : "text-stone-600 hover:bg-stone-100"}`}>
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Mobile dropdown nav */}
      {mobile && menuOpen && (
        <div className={`border-t px-4 py-3 flex flex-col gap-1 ${darkMode ? "border-stone-800 bg-stone-950" : "border-stone-200 bg-white"}`}>
          {allNavItems.map(navItem)}
          {onHelp && <Button variant="ghost" size="sm" onClick={() => { onHelp(); setMenuOpen(false); }} className="w-full justify-start text-stone-400 gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Ajuda</Button>}
        </div>
      )}
    </header>
  );
}

// ============================
// EXECUTOR VIEW
// ============================
function ExecutorView({ executorId, onTaskClick }) {
  const { tasks, revertFromQA } = useContext(AppContext);
  const [timeFilter, setTimeFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [viewMode, setViewMode] = useState("lista");
  const [showHistory, setShowHistory] = useState(false);
  const myTasks = tasks.filter(t => t.executor === executorId).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // Split: active tasks vs history (em_qa + concluida)
  const activeTasks = myTasks.filter(t => t.status !== "concluida" && t.status !== "em_qa");
  const qaTasksList = myTasks.filter(t => t.status === "em_qa");
  const completedTasks = myTasks.filter(t => t.status === "concluida");

  const statusConfig = {
    a_fazer: { label: "A Fazer", bg: "bg-stone-100", text: "text-stone-700", border: "border-stone-300", dot: "bg-stone-400", badge: "default" },
    em_execucao: { label: "Em execução", bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", dot: "bg-amber-500", badge: "accent" },
    em_qa: { label: "Em QA", bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-300", dot: "bg-violet-500", badge: "purple" },
    devolvida: { label: "Devolvida", bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", dot: "bg-pink-500", badge: "pink" },
    concluida: { label: "Concluída", bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", dot: "bg-emerald-500", badge: "success" },
  };

  // For list view, filters apply only to active tasks
  let filtered = timeFilter === "hoje"
    ? activeTasks.filter(t => new Date(t.deadline).toDateString() === new Date().toDateString())
    : timeFilter === "2semanas"
    ? activeTasks.filter(t => { const d = new Date(t.deadline); const now = new Date(); const twoWeeks = new Date(now.getTime() + 14 * 86400000); return d >= now && d <= twoWeeks; })
    : activeTasks;

  if (statusFilter !== "todos") {
    filtered = filtered.filter(t => t.status === statusFilter);
  }

  const priorityColor = (p) => p === "Alta" ? "bg-red-500" : p === "Média" ? "bg-orange-500" : "bg-emerald-500";

  const formatDeadline = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays > 0 && diffDays < 7) return `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    if (date.toDateString() === now.toDateString()) return `Hoje – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    return `${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
  };

  // Status counts for active tasks only
  const activeStatuses = ["a_fazer", "em_execucao", "devolvida"];
  const statusCounts = {};
  const timeFiltered = timeFilter === "hoje"
    ? activeTasks.filter(t => new Date(t.deadline).toDateString() === new Date().toDateString())
    : timeFilter === "2semanas"
    ? activeTasks.filter(t => { const d = new Date(t.deadline); const now = new Date(); const twoWeeks = new Date(now.getTime() + 14 * 86400000); return d >= now && d <= twoWeeks; })
    : activeTasks;
  activeStatuses.forEach(k => { statusCounts[k] = timeFiltered.filter(t => t.status === k).length; });

  const months = [...new Set(filtered.map(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}`; }))];

  const kanbanColumns = ["a_fazer", "em_execucao", "em_qa", "devolvida", "concluida"];

  // Task card renderer (shared between main list and history)
  const TaskCard = ({ task, showRevert }) => {
    const cfg = statusConfig[task.status] || statusConfig.a_fazer;
    return (
      <Card key={task.id} onClick={() => onTaskClick(task.id)} className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className={`h-3 w-3 rounded-full ${priorityColor(task.priority)} flex-shrink-0 mt-1`} title={task.priority} />
              <div>
                <h4 className="font-medium leading-tight mb-1">{task.title}</h4>
                <p className="text-sm text-stone-500">{task.project}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
              {showRevert && task.status === "em_qa" && (
                <button onClick={e => { e.stopPropagation(); revertFromQA(task.id); }} className="p-1 rounded-md hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors" title="Cancelar envio ao QA">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-500"><Clock size={12} />{formatDeadline(task.deadline)}</div>
            {task.feedbackOrigin && <Badge variant="accent">Feedback do cliente</Badge>}
            {task.status === "devolvida" && task.qaComment && <span className="text-xs text-red-500 max-w-[200px] truncate">{task.qaComment}</span>}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-stone-900">Minhas tarefas</h1>
        <p className="text-sm md:text-base text-stone-500">Organize suas entregas e acompanhe o progresso</p>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {[["hoje", "Hoje"], ["2semanas", "2 semanas"], ["todos", "Todos"]].map(([key, label]) => (
              <Button key={key} variant={timeFilter === key ? "default" : "outline"} size="sm" onClick={() => setTimeFilter(key)}>{label}</Button>
            ))}
          </div>
          <div className="flex gap-1 bg-stone-100 rounded-lg p-1 self-start md:self-auto">
            <button onClick={() => setViewMode("lista")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === "lista" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>Lista</button>
            <button onClick={() => setViewMode("kanban")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === "kanban" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>Kanban</button>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          <button onClick={() => setStatusFilter("todos")} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${statusFilter === "todos" ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}>
            Todos ({timeFiltered.length})
          </button>
          {activeStatuses.map(key => {
            const cfg = statusConfig[key];
            const count = statusCounts[key] || 0;
            if (count === 0 && key !== "a_fazer" && key !== "em_execucao") return null;
            return (
              <button key={key} onClick={() => setStatusFilter(statusFilter === key ? "todos" : key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors flex items-center gap-1.5 ${statusFilter === key ? cfg.bg + " " + cfg.text + " " + cfg.border : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}>
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "lista" && (
        <div>
          {/* Active tasks by month */}
          <div className="space-y-8">
            {months.map(month => (
              <div key={month}>
                <h3 className="mb-4 text-lg font-semibold capitalize">{month}</h3>
                <div className="space-y-3">
                  {filtered.filter(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}` === month; }).map(task => (
                    <TaskCard key={task.id} task={task} showRevert={false} />
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-center text-stone-400 py-12">Nenhuma tarefa pendente.</p>}
          </div>

          {/* Aguardando QA section */}
          {qaTasksList.length > 0 && (
            <div className="mt-10 border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  <h3 className="text-lg font-semibold text-stone-900">Aguardando QA</h3>
                </div>
                <span className="text-xs font-medium bg-violet-100 text-violet-700 rounded-full px-2.5 py-0.5">{qaTasksList.length}</span>
              </div>
              <div className="space-y-3">
                {qaTasksList.map(task => (
                  <TaskCard key={task.id} task={task} showRevert={true} />
                ))}
              </div>
            </div>
          )}

          {/* Completed history — collapsible */}
          {completedTasks.length > 0 && (
            <div className="mt-10 border-t pt-6">
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-3 mb-4 group w-full text-left">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <h3 className="text-lg font-semibold text-stone-900">Concluídas</h3>
                </div>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5">{completedTasks.length}</span>
                <span className="ml-auto text-stone-400 group-hover:text-stone-600 transition-colors">
                  {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {showHistory && (
                <div className="space-y-3">
                  {completedTasks.map(task => (
                    <TaskCard key={task.id} task={task} showRevert={false} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:pb-0" style={{ minHeight: "350px" }}>
          {kanbanColumns.map(key => {
            const cfg = statusConfig[key];
            const colTasks = myTasks.filter(t => t.status === key).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            return (
              <div key={key} className="min-w-[260px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink bg-stone-50 rounded-xl p-3 border border-stone-100">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${cfg.bg}`}>
                  <div className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                  <span className={`text-sm font-semibold ${cfg.text}`}>{cfg.label}</span>
                  <span className="ml-auto text-xs font-bold bg-white bg-opacity-60 rounded-full px-2 py-0.5">{colTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {colTasks.map(task => (
                    <Card key={task.id} className="p-3 group relative" onClick={() => onTaskClick(task.id)}>
                      {task.status === "em_qa" && (
                        <button onClick={(e) => { e.stopPropagation(); if (confirm(`Cancelar entrega de "${task.title}"? A tarefa voltará para execução.`)) revertFromQA(task.id); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50" title="Cancelar entrega">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 hover:text-red-500"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                        </button>
                      )}
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${priorityColor(task.priority)}`} />
                        <p className="text-sm font-medium leading-tight">{task.title}</p>
                      </div>
                      <p className="text-xs text-stone-400 mb-1 truncate">{task.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400"><Clock size={10} className="inline" /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                      </div>
                      {task.feedbackOrigin && <Badge variant="accent" className="mt-2 text-[10px]">Feedback</Badge>}
                    </Card>
                  ))}
                  {colTasks.length === 0 && <p className="text-xs text-stone-300 text-center py-4">Nenhuma</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================
// TASK DETAIL VIEW
// ============================
function TaskDetailView({ taskId, onBack }) {
  const { tasks, toggleChecklist, submitToQA, resubmitTask, revertFromQA } = useContext(AppContext);
  const task = tasks.find(t => t.id === taskId);
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  if (!task) return null;

  const allChecked = task.checklist.every(c => c.done);
  const canSubmit = allChecked && (link.trim().length > 0 || files.length > 0);

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.map(function(f) {
      const sizeKB = f.size / 1024;
      const sizeStr = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + " MB" : Math.round(sizeKB) + " KB";
      const blobUrl = URL.createObjectURL(f);
      return { name: f.name, size: sizeStr, type: f.type || "arquivo", url: blobUrl };
    });
    setFiles(function(prev) { return prev.concat(newFiles); });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    setFiles(function(prev) { return prev.filter(function(_, i) { return i !== index; }); });
  };

  const handleSubmit = () => {
    if (canSubmit) {
      submitToQA(taskId, link, files);
      setLink("");
      setFiles([]);
      onBack();
    }
  };
  const handleResubmit = () => { resubmitTask(taskId); };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-6">← Voltar para minhas tarefas</button>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900">{task.title}</h1>
        <div className={`h-4 w-4 rounded-full mt-2 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-orange-500" : "bg-emerald-500"}`} />
      </div>
      <div className="flex items-center gap-3 text-sm text-stone-500 mb-4 flex-wrap">
        <span><strong>Projeto:</strong> {task.project}</span>
        <span><strong>Prazo:</strong> {new Date(task.deadline).toLocaleDateString("pt-BR")} – {new Date(task.deadline).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}</span>
        <Badge>{({ a_fazer: "A Fazer", em_execucao: "Em execução", em_qa: "Em QA", concluida: "Concluída", devolvida: "Devolvida" })[task.status]}</Badge>
        {task.feedbackOrigin && <Badge variant="accent">Feedback do cliente</Badge>}
      </div>

      {task.status === "devolvida" && task.qaComment && (
        <Card className="p-6 mb-6 border-l-4 border-l-red-500">
          <h3 className="font-bold text-red-700 mb-2">Devolvida pelo QA</h3>
          <p className="text-sm text-stone-700 mb-4">{task.qaComment}</p>
          <Button size="sm" onClick={handleResubmit}>Retomar execução</Button>
        </Card>
      )}

      {task.status === "em_qa" && (
        <Card className="p-6 mb-6 border-l-4 border-l-violet-500">
          <h3 className="font-bold text-violet-700 mb-2">Enviada para QA</h3>
          <p className="text-sm text-stone-700 mb-4">Esta tarefa está aguardando revisão do QA. Se você precisa fazer ajustes, pode retirar do QA.</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { revertFromQA(taskId); }}>← Retirar do QA e voltar a editar</Button>
            <button onClick={() => { if (confirm("Tem certeza que deseja cancelar esta entrega? A tarefa voltará para 'A fazer' e os arquivos serão removidos.")) { revertFromQA(taskId); } }} className="text-xs text-stone-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-red-300 transition-colors">Cancelar entrega</button>
          </div>
        </Card>
      )}

      {task.status === "concluida" && (
        <Card className="p-6 mb-6 border-l-4 border-l-emerald-500">
          <h3 className="font-bold text-emerald-700 mb-2">Tarefa concluída</h3>
          <p className="text-sm text-stone-700">{task.qaComment && `Comentário do QA: ${task.qaComment}`}</p>
        </Card>
      )}

      {task.feedbackOrigin && (
        <Card className="p-6 mb-6 border-l-4 border-l-green-600">
          <h3 className="font-bold mb-2">Feedback original do cliente</h3>
          <p className="text-sm text-stone-500 mb-1"><strong>Tipo</strong></p>
          <Badge className="mb-3">{task.feedbackOrigin.type}</Badge>
          <p className="text-sm text-stone-500 mb-1">Texto original</p>
          <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-700">{task.feedbackOrigin.text}</div>
        </Card>
      )}

      <Card className="p-6 mb-6">
        <h3 className="font-bold mb-2">Contexto do job</h3>
        {(() => {
          const desc = task.description || "";
          const hasLeaderInstructions = desc.includes("Instruções do líder:");
          const hasFeedbackPrefix = desc.match(/^Feedback do cliente [^:]+:\s*/i);
          if (hasLeaderInstructions || hasFeedbackPrefix) {
            const feedbackText = hasFeedbackPrefix ? desc.split(/\n?\n?Instruções do líder:/i)[0].replace(/^Feedback do cliente [^:]+:\s*/i, "").trim() : desc.split(/\n?\n?Instruções do líder:/i)[0].trim();
            const leaderText = hasLeaderInstructions ? desc.split(/Instruções do líder:\s*/i)[1]?.trim() : null;
            return (
              <div className="space-y-3">
                {leaderText && (
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Instruções do líder</p>
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm text-stone-700">{leaderText}</div>
                  </div>
                )}
                {!leaderText && feedbackText && (
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Descrição</p>
                    <p className="text-sm text-stone-700">{feedbackText}</p>
                  </div>
                )}
              </div>
            );
          }
          return <><p className="text-sm text-stone-500 mb-1">Descrição</p><p className="text-sm text-stone-700">{desc}</p></>;
        })()}
      </Card>

      {task.attachments.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-bold mb-4">Insumos e referências</h3>
          {task.attachments.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
              <div><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-stone-400">{a.type}{a.size ? ` • ${a.size}` : ""}</p></div>
              <Button variant="ghost" size="sm" onClick={() => { if (a.url) { window.open(a.url, "_blank"); } else { alert("Arquivo de exemplo: " + a.name + "\nEm produção, abriria o arquivo real."); } }}>Abrir</Button>
            </div>
          ))}
        </Card>
      )}

      <Card className="p-6 mb-6">
        <h3 className="font-bold mb-4">Checklist de execução</h3>
        {task.checklist.map((item, i) => (
          <label key={i} className="flex items-center gap-3 py-2 cursor-pointer">
            <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(taskId, i)} className="h-5 w-5 rounded border-stone-300 text-sky-600" />
            <span className={item.done ? "line-through text-stone-400" : "text-stone-700"}>{item.text}</span>
          </label>
        ))}
      </Card>

      {task.status !== "concluida" && task.status !== "em_qa" && (
        <Card className="p-6">
          <h3 className="font-bold mb-2">Enviar para QA</h3>
          <p className="text-sm text-stone-500 mb-4">Anexe os arquivos da entrega e adicione observações antes de enviar para revisão.</p>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Arquivos da entrega</label>
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg mb-2">
                <FolderOpen size={16} className="text-emerald-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-stone-400">{f.type} · {f.size}</p>
                </div>
                <button type="button" onClick={() => handleRemoveFile(i)} className="text-stone-400 hover:text-red-500"><X size={14} /></button>
              </div>
            ))}
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple style={{display: "none"}} />
            <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-stone-300 rounded-lg text-sm text-stone-500 hover:border-green-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
              <Plus size={18} /> Clique para selecionar arquivos
            </button>
            <p className="text-xs text-stone-400 mt-1">Você pode selecionar vários arquivos de uma vez.</p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Link da entrega ou observações</label>
            <textarea value={link} onChange={e => setLink(e.target.value)} placeholder="Cole o link do Drive, Figma, ou descreva observações importantes sobre a entrega..." className="w-full border border-stone-300 rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>

          <Button className={`w-full justify-center ${!canSubmit ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleSubmit}>
            <Send size={16} /> Enviar para revisão do QA
          </Button>
          {!allChecked && <p className="text-xs text-orange-500 mt-3 flex items-center gap-1"><AlertTriangle size={12} /> Complete todos os itens do checklist antes de enviar.</p>}
          {allChecked && !link.trim() && files.length === 0 && <p className="text-xs text-orange-500 mt-3 flex items-center gap-1"><AlertTriangle size={12} /> Anexe pelo menos um arquivo ou preencha o link da entrega.</p>}
        </Card>
      )}
    </div>
  );
}

// ============================
// QA VIEWS
// ============================
// QASquadSelector removed — only eventos squad exists now

function QAPortalView({ area, onBack, onViewErrors, onProjectClick }) {
  const { tasks, projects, clients, team, learnings, feedbacks, clientNotes, approveTask, rejectTask, revertFromCompleted, revertFromDevolvida, createProject, updateProject, addLearning, addClientNote, addQaAlert } = useContext(AppContext);
  const [comments, setComments] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [tab, setTab] = useState("visao_geral");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projForm, setProjForm] = useState({ name: "", clientId: "", responsible: "Ana Gallotta", priority: "Alta", deadline: "", briefing: "" });
  const [noteClient, setNoteClient] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteTag, setNoteTag] = useState("");
  const [kbF, setKbF] = useState("todos");
  const [reviewTab, setReviewTab] = useState("pendentes");
  const [alertTaskId, setAlertTaskId] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [sentAlerts, setSentAlerts] = useState(new Set());

  const sendRiskAlert = (task) => {
    const baseMsg = `QA está te alertando: "${task.title}" em risco de atraso (prazo: ${new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}).`;
    const fullMsg = alertMsg.trim() ? `${baseMsg} — "${alertMsg.trim()}"` : baseMsg;
    addQaAlert(task.id, task.executor, fullMsg);
    setSentAlerts(prev => new Set([...prev, task.id]));
    setAlertTaskId(null);
    setAlertMsg("");
  };

  const areaProjects = projects.filter(p => p.area === area);
  const areaTasks = tasks.filter(t => t.area === area);
  const pendingTasks = areaTasks.filter(t => t.status === "em_qa");
  const allCompleted = areaTasks.filter(t => t.status === "concluida");
  const allDevolvidas = areaTasks.filter(t => t.status === "devolvida");
  const allActive = areaTasks.filter(t => ["a_fazer", "em_execucao", "em_qa"].includes(t.status));
  const atRisk = areaTasks.filter(t => ["em_execucao", "a_fazer"].includes(t.status) && new Date(t.deadline) < new Date(Date.now() + 86400000));

  const retrabalhoCount = areaTasks.filter(t => t.status === "devolvida" || t.feedbackOrigin).length;
  const totalTasks = areaTasks.length;
  const retrabalhoRate = totalTasks > 0 ? Math.round((retrabalhoCount / totalTasks) * 100) : 0;

  const handleCreateProject = () => {
    if (!projForm.name.trim() || !projForm.clientId || !projForm.deadline) return;
    const client = clients.find(c => c.id === projForm.clientId);
    createProject({ name: projForm.name, clientId: projForm.clientId, client: client?.name || "", responsible: projForm.responsible, priority: projForm.priority, deadline: projForm.deadline, briefing: projForm.briefing });
    setProjForm({ name: "", clientId: "", responsible: "Ana Gallotta", priority: "Alta", deadline: "", briefing: "" });
    setShowCreateProject(false);
  };

  const tagConfig = {
    gostou: { label: "Gostou", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
    nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
    comunicacao: { label: "Comunicação", color: "bg-sky-100 text-sky-700 border-sky-300" },
    processo: { label: "Processo", color: "bg-violet-100 text-violet-700 border-violet-300" },
    elogio: { label: "Elogio", color: "bg-pink-100 text-pink-700 border-pink-300" },
    erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
    insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">QA Eventos</h1>
          <p className="text-stone-500 mt-1">Gestão operacional — projetos, qualidade e conhecimento da área.</p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}><ArrowLeft size={14} /> Voltar</Button>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <Card className="p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab("projetos")}>
          <p className="text-sm text-stone-500 mb-1">Projetos ativos</p>
          <p className="text-2xl md:text-3xl font-bold text-stone-900">{areaProjects.length}</p>
        </Card>
        <Card className={`p-5 cursor-pointer hover:shadow-md transition-shadow ${pendingTasks.length > 0 ? "border-l-4 border-l-violet-500" : ""}`} onClick={() => setTab("revisao")}>
          <p className="text-sm text-stone-500 mb-1">Aguardando revisão</p>
          <p className={`text-3xl font-bold ${pendingTasks.length > 0 ? "text-violet-600" : "text-stone-900"}`}>{pendingTasks.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-stone-500 mb-1">Taxa de retrabalho</p>
          <p className={`text-3xl font-bold ${retrabalhoRate > 30 ? "text-red-600" : retrabalhoRate > 15 ? "text-yellow-600" : "text-emerald-600"}`}>{retrabalhoRate}%</p>
        </Card>
        <Card className={`p-5 ${atRisk.length > 0 ? "border-l-4 border-l-red-500" : ""}`}>
          <p className="text-sm text-stone-500 mb-1">Em risco de atraso</p>
          <p className={`text-3xl font-bold ${atRisk.length > 0 ? "text-red-600" : "text-emerald-600"}`}>{atRisk.length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-stone-200">
        {[
          ["visao_geral", "Visão geral"],
          ["projetos", "Projetos"],
          ["revisao", `Revisão${pendingTasks.length > 0 ? " (" + pendingTasks.length + ")" : ""}`],
          ["conhecimento", "Base de conhecimento"],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === key ? "border-stone-900 text-stone-900" : "border-transparent text-stone-500 hover:text-stone-700"}`}>{label}</button>
        ))}
      </div>

      {/* ===== VISÃO GERAL ===== */}
      {tab === "visao_geral" && (
        <div>
          {/* Entregas pendentes — ação principal */}
          {pendingTasks.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>Entregas aguardando sua revisão</h2>
                {pendingTasks.length > 2 && <button onClick={() => setTab("revisao")} className="text-sm text-stone-500 hover:text-stone-900">Ver todas →</button>}
              </div>
              {pendingTasks.slice(0, 3).map(task => (
                <Card key={task.id} className="mb-3 overflow-hidden">
                  <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => { setTab("revisao"); setExpandedId(task.id); }}>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-yellow-500" : "bg-emerald-500"}`}>{task.priority[0]}</div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{task.project} · {task.executorName} · {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                      </div>
                    </div>
                    <Button size="sm">Revisar</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {pendingTasks.length === 0 && (
            <Card className="p-8 text-center mb-8 bg-emerald-50 border-emerald-200">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
              <p className="font-medium text-emerald-700">Nenhuma entrega pendente de revisão</p>
              <p className="text-sm text-emerald-600 mt-1">Todas as entregas foram revisadas.</p>
            </Card>
          )}

          {/* Tarefas em risco */}
          {atRisk.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>Tarefas em risco de atraso</h2>
              {atRisk.map(task => (
                <Card key={task.id} className="p-4 mb-2 border-l-4 border-l-red-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{task.project} · {task.executorName} · Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.status === "a_fazer" ? "default" : "info"}>{task.status === "a_fazer" ? "A fazer" : "Em execução"}</Badge>
                      <button onClick={() => { if (!sentAlerts.has(task.id)) setAlertTaskId(alertTaskId === task.id ? null : task.id); }} className={`p-2 rounded-lg border transition-all ${sentAlerts.has(task.id) ? "bg-yellow-100 border-yellow-400 text-yellow-600 cursor-default" : alertTaskId === task.id ? "bg-yellow-50 border-yellow-300 text-yellow-600" : "border-stone-200 text-stone-400 hover:text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50"}`} title={sentAlerts.has(task.id) ? "Alerta enviado" : "Alertar executor"}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={sentAlerts.has(task.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                      </button>
                    </div>
                  </div>
                  {alertTaskId === task.id && (
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <p className="text-xs text-stone-500 mb-2">Enviar alerta para <span className="font-medium text-stone-700">{task.executorName}</span></p>
                      <div className="flex gap-2">
                        <input value={alertMsg} onChange={e => setAlertMsg(e.target.value)} placeholder="Mensagem adicional (opcional)" className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" onKeyDown={e => { if (e.key === "Enter") sendRiskAlert(task); }} />
                        <button onClick={() => sendRiskAlert(task)} className="px-4 py-2 text-sm font-medium rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                          Alertar
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Projetos — visual cards */}
          <h2 className="text-lg font-semibold mb-4">Projetos da área</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {areaProjects.map(p => {
              const pTasks = areaTasks.filter(t => t.projectId === p.id);
              const done = pTasks.filter(t => t.status === "concluida").length;
              const inQa = pTasks.filter(t => t.status === "em_qa").length;
              const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0;
              return (
                <Card key={p.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => { if (onProjectClick) onProjectClick(p.id, "qa"); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-stone-900">{p.name}</h3>
                      <p className="text-xs text-stone-500 mt-0.5">{p.client} · Líder: {p.responsible}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.priority === "Alta" ? "bg-red-50 text-red-700 border-red-200" : p.priority === "Média" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>{p.priority}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1 bg-stone-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                    <span className="text-sm font-medium text-stone-700">{pct}%</span>
                  </div>
                  <div className="flex gap-3 text-xs text-stone-500">
                    <span>{pTasks.length} tarefas</span>
                    <span>{done} concluídas</span>
                    {inQa > 0 && <span className="text-violet-600 font-medium">{inQa} em QA</span>}
                  </div>
                  <p className="text-xs text-stone-400 mt-2">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}</p>
                </Card>
              );
            })}
            {/* Add project card */}
            <Card className="p-5 border-dashed border-2 border-stone-200 flex items-center justify-center cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-all" onClick={() => { setTab("projetos"); setShowCreateProject(true); }}>
              <div className="text-center">
                <Plus size={24} className="text-stone-400 mx-auto mb-2" />
                <p className="text-sm text-stone-500 font-medium">Novo projeto</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ===== PROJETOS ===== */}
      {tab === "projetos" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Projetos</h2>
            <Button size="sm" onClick={() => setShowCreateProject(!showCreateProject)}><Plus size={14} /> Novo projeto</Button>
          </div>

          {showCreateProject && (
            <Card className="p-5 mb-6">
              <p className="text-sm font-semibold text-stone-700 mb-4">Criar novo projeto</p>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-stone-600">Nome do projeto / campanha</label><input value={projForm.name} onChange={e => setProjForm(p => ({ ...p, name: e.target.value }))} placeholder="Ex: Festival de Música 2026" className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                  <div><label className="text-xs font-medium text-stone-600">Cliente</label><select value={projForm.clientId} onChange={e => setProjForm(p => ({ ...p, clientId: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="">Selecione</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div><label className="text-xs font-medium text-stone-600">Líder responsável</label><select value={projForm.responsible} onChange={e => setProjForm(p => ({ ...p, responsible: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="Ana Gallotta">Ana Gallotta</option></select></div>
                  <div><label className="text-xs font-medium text-stone-600">Prioridade</label><select value={projForm.priority} onChange={e => setProjForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="Alta">Alta</option><option value="Média">Média</option><option value="Baixa">Baixa</option></select></div>
                  <div><label className="text-xs font-medium text-stone-600">Prazo</label><input type="date" value={projForm.deadline} onChange={e => setProjForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                </div>
                <div><label className="text-xs font-medium text-stone-600">Briefing</label><textarea value={projForm.briefing} onChange={e => setProjForm(p => ({ ...p, briefing: e.target.value }))} placeholder="Descreva o escopo, objetivos, referências e expectativas do cliente..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCreateProject} disabled={!projForm.name.trim() || !projForm.clientId || !projForm.deadline}>Criar projeto</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCreateProject(false)}>Cancelar</Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {areaProjects.map(p => {
              const pTasks = areaTasks.filter(t => t.projectId === p.id);
              const done = pTasks.filter(t => t.status === "concluida").length;
              const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0;
              return (
                <Card key={p.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => { if (onProjectClick) onProjectClick(p.id, "qa"); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="font-semibold text-stone-900">{p.name}</h3><p className="text-xs text-stone-500 mt-0.5">{p.client} · Líder: {p.responsible}</p></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.priority === "Alta" ? "bg-red-50 text-red-700 border-red-200" : p.priority === "Média" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>{p.priority}</span>
                  </div>
                  {p.briefing && <p className="text-xs text-stone-500 mb-3 line-clamp-2">{p.briefing}</p>}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex-1 bg-stone-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${pct}%` }} /></div>
                    <span className="text-sm font-medium">{pct}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>{done}/{pTasks.length} tarefas</span>
                    <span>Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== REVISÃO ===== */}
      {tab === "revisao" && (
        <div>
          {/* Sub-tabs */}
          <div className="flex gap-2 mb-6">
            {[
              ["pendentes", `Pendentes (${pendingTasks.length})`, pendingTasks.length > 0 ? "bg-violet-50 text-violet-700 border-violet-200" : ""],
              ["devolvidas", `Devolvidas (${allDevolvidas.length})`, allDevolvidas.length > 0 ? "bg-pink-100 text-pink-800 border-pink-300" : ""],
              ["aprovadas", `Aprovadas (${allCompleted.length})`, "bg-emerald-50 text-emerald-700 border-emerald-200"],
            ].map(([key, label, activeColor]) => (
              <button key={key} onClick={() => setReviewTab(key)} className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${reviewTab === key ? (activeColor || "bg-stone-100 text-stone-700 border-stone-300") : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"}`}>{label}</button>
            ))}
          </div>

          {reviewTab === "pendentes" && (
            pendingTasks.length === 0 ? (
              <Card className="p-12 text-center"><p className="text-stone-400">Nenhuma entrega pendente.</p></Card>
            ) : pendingTasks.map(task => {
              const isExpanded = expandedId === task.id;
              return (
              <Card key={task.id} className="mb-4 overflow-hidden">
                <div className="p-5 cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-yellow-500" : "bg-emerald-500"}`}>{task.priority[0]}</div>
                      <div>
                        <h3 className="font-semibold text-stone-900">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-stone-500">
                          <span>{task.project}</span>
                          <span>{task.executorName}</span>
                          <span>{new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-stone-100 bg-stone-50">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Instruções da tarefa</p>
                            <Card className="p-4 space-y-3">
                              {(() => {
                                const desc = task.description || "";
                                const hasLeader = desc.includes("Instruções do líder:");
                                const hasFbPrefix = desc.match(/^Feedback do cliente [^:]+:\s*/i);
                                if (hasLeader) { const lt = desc.split(/Instruções do líder:\s*/i)[1]?.trim(); return lt ? (<div><p className="text-xs font-semibold text-sky-600 mb-1">Instruções do líder</p><div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm text-stone-700">{lt}</div></div>) : null; }
                                if (hasFbPrefix) { const cl = desc.replace(/^Feedback do cliente [^:]+:\s*/i, "").trim(); return cl ? <p className="text-sm text-stone-700">{cl}</p> : null; }
                                return <p className="text-sm text-stone-700">{desc}</p>;
                              })()}
                              {task.feedbackOrigin && (<div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg"><p className="text-xs font-semibold text-emerald-700 mb-1">Feedback do cliente</p><p className="text-sm text-stone-700">{task.feedbackOrigin.text}</p></div>)}
                            </Card>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Checklist</p>
                            <Card className="p-4">
                              <div className="space-y-2">{task.checklist.map((item, i) => (<div key={i} className="flex items-center gap-2.5"><div className={`h-4 w-4 rounded flex items-center justify-center text-xs flex-shrink-0 ${item.done ? "bg-emerald-500 text-white" : "border border-stone-300"}`}>{item.done ? "✓" : ""}</div><span className={`text-sm ${item.done ? "text-stone-400 line-through" : "text-stone-700"}`}>{item.text}</span></div>))}</div>
                              <div className="mt-3 pt-3 border-t border-stone-100"><div className="flex items-center justify-between"><span className="text-xs text-stone-500">{task.checklist.filter(c => c.done).length}/{task.checklist.length}</span><div className="w-20 bg-stone-200 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(task.checklist.filter(c => c.done).length / task.checklist.length) * 100}%` }} /></div></div></div>
                            </Card>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Entrega</p>
                            <Card className="p-4">
                              {(task.submittedFiles && task.submittedFiles.length > 0) ? (
                                <div className="space-y-2">
                                  {task.submittedFiles.map((f, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100"><div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-violet-600" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{f.name}</p><p className="text-xs text-stone-500">{f.type ? f.type + " · " : ""}{f.size}</p></div><a href={f.url} download={f.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 cursor-pointer flex-shrink-0" style={{textDecoration:"none"}}><ExternalLink size={12} /> Abrir</a></div>))}
                                  {task.submittedLink?.trim() && (<div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100"><ExternalLink size={16} className="text-stone-500 flex-shrink-0" /><p className="text-xs text-stone-500 truncate flex-1">{task.submittedLink}</p><Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>Abrir</Button></div>)}
                                </div>
                              ) : task.submittedLink?.trim() ? (
                                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100"><ExternalLink size={16} className="text-violet-600 flex-shrink-0" /><p className="text-xs text-stone-500 truncate flex-1">{task.submittedLink}</p><Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>Abrir</Button></div>
                              ) : (<p className="text-sm text-stone-400 italic">Nenhum arquivo anexado.</p>)}
                            </Card>
                          </div>
                          {task.attachments.length > 0 && (<div><p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Referências</p><Card className="p-4"><div className="space-y-2">{task.attachments.map((a, i) => (<div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-stone-50"><FolderOpen size={16} className="text-stone-400 flex-shrink-0" /><div className="flex-1 min-w-0"><p className="text-sm font-medium">{a.name}</p><p className="text-xs text-stone-400">{a.type}{a.size ? ` · ${a.size}` : ""}</p></div><Button variant="ghost" size="sm" onClick={() => a.url ? window.open(a.url, "_blank") : alert("Arquivo: " + a.name)}>Abrir</Button></div>))}</div></Card></div>)}
                        </div>
                      </div>
                      <Card className="p-5">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Revisão e devolutiva</p>
                        <textarea value={comments[task.id] || ""} onChange={e => setComments(prev => ({ ...prev, [task.id]: e.target.value }))} placeholder="Escreva o que precisa ser ajustado, elogie o que ficou bom, ou aprove diretamente..." className="w-full border border-stone-200 rounded-lg p-3 text-sm min-h-[80px] mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-stone-50" />
                        <div className="flex gap-3">
                          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors" onClick={() => { approveTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); setExpandedId(null); }}><CheckCircle2 size={16} /> Aprovar</button>
                          <button className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${comments[task.id]?.trim() ? "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100" : "border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed"}`} onClick={() => { if (!comments[task.id]?.trim()) return; rejectTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); setExpandedId(null); }}><ArrowLeft size={16} /> Devolver</button>
                        </div>
                        {!comments[task.id]?.trim() && <p className="text-xs text-stone-400 mt-3">Escreva um comentário para poder devolver.</p>}
                      </Card>
                    </div>
                  </div>
                )}
              </Card>
              );
            })
          )}

          {reviewTab === "devolvidas" && (
            allDevolvidas.length === 0 ? (
              <Card className="p-12 text-center"><p className="text-stone-400">Nenhuma tarefa devolvida.</p></Card>
            ) : allDevolvidas.map(task => (
              <Card key={task.id} className="p-4 mb-3 border-l-4 border-l-red-400">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-stone-500 mt-0.5">{task.project} · {task.executorName}</p></div>
                  <button onClick={() => revertFromDevolvida(task.id)} className="text-xs text-stone-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-red-300 transition-colors">Reverter devolução</button>
                </div>
                {task.qaComment && <div className="mt-2 p-2.5 bg-pink-50 rounded-lg border border-pink-200"><p className="text-xs text-pink-700">{task.qaComment}</p></div>}
              </Card>
            ))
          )}

          {reviewTab === "aprovadas" && (
            allCompleted.length === 0 ? (
              <Card className="p-12 text-center"><p className="text-stone-400">Nenhuma tarefa aprovada ainda.</p></Card>
            ) : allCompleted.map(task => (
              <Card key={task.id} className="p-4 mb-3 border-l-4 border-l-green-400">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-stone-500 mt-0.5">{task.project} · {task.executorName}</p></div>
                  <button onClick={() => revertFromCompleted(task.id)} className="text-xs text-stone-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-red-300 transition-colors">Reverter aprovação</button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* ===== BASE DE CONHECIMENTO ===== */}
      {tab === "conhecimento" && (
        <div>
          {/* Annotation form for QA */}
          <Card className="p-5 mb-6">
            <p className="text-sm font-medium text-stone-700 mb-3">Nova anotação</p>
            <div className="flex items-center gap-3 mb-3">
              <select value={noteClient} onChange={e => setNoteClient(e.target.value)} className="border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[180px]">
                <option value="">Selecione cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="O que aprendemos sobre este cliente?" className="flex-1 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 mr-1">Categoria:</span>
              {Object.entries(tagConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setNoteTag(noteTag === key ? "" : key)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${noteTag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"}`}>{cfg.label}</button>
              ))}
              <div className="ml-auto">
                <Button size="sm" onClick={() => { if (noteClient && noteText.trim() && noteTag) { addClientNote(noteClient, noteText.trim(), noteTag, "QA"); setNoteClient(""); setNoteText(""); setNoteTag(""); } }} disabled={!noteClient || !noteText.trim() || !noteTag}>Salvar</Button>
              </div>
            </div>
          </Card>

          {/* Show all notes across all clients */}
          {(() => {
            const allNotes = clientNotes.map(n => {
              const c = clients.find(cl => cl.id === n.clientId);
              const isElogio = n.tag === "elogio" || n.text.startsWith("[Elogio]");
              return { ...n, clientName: c?.name || "—", _tag: isElogio ? "elogio" : (n.tag || "gostou"), _text: isElogio ? n.text.replace(/^\[Elogio\]\s*/, "") : n.text };
            }).sort((a, b) => b.date.localeCompare(a.date));

            const allLearnings = learnings.filter(l => l.area === area).map(l => ({
              ...l, _tag: l.type === "erro" ? "erro" : "insight", _text: l.description, _title: l.title, clientName: l.client || "—", author: l.origin, _isLearning: true
            }));

            const combined = [...allNotes.map(n => ({ ...n, _sort: n.date })), ...allLearnings.map(l => ({ ...l, _sort: l.date }))].sort((a, b) => b._sort.localeCompare(a._sort));

            const getTagInfo = (t) => tagConfig[t] || { label: t || "Geral", color: "bg-stone-100 text-stone-600 border-stone-300" };

            const filterTags = ["todos", "gostou", "nao_gostou", "comunicacao", "processo", "elogio", "erro", "insight"];
            const filtered = kbF === "todos" ? combined : combined.filter(e => e._tag === kbF);
            const tagCounts = {};
            combined.forEach(e => { tagCounts[e._tag] = (tagCounts[e._tag] || 0) + 1; });

            return (
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {filterTags.map(t => {
                    const cfg = t === "todos" ? { label: "Todos", color: "bg-stone-100 text-stone-700 border-stone-300" } : getTagInfo(t);
                    const count = t === "todos" ? combined.length : (tagCounts[t] || 0);
                    return (<button key={t} onClick={() => setKbF(t)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${kbF === t ? (t === "todos" ? "bg-stone-900 text-white border-stone-900" : cfg.color + " border-current") : "bg-white text-stone-400 border-stone-200 hover:bg-stone-50"}`}>{cfg.label} ({count})</button>);
                  })}
                </div>
                {filtered.length === 0 ? (
                  <Card className="p-8 text-center"><p className="text-stone-400 text-sm">Nenhum registro encontrado.</p></Card>
                ) : (
                  <div className="space-y-2">
                    {filtered.map((entry, i) => {
                      const cfg = getTagInfo(entry._tag);
                      const borderColors = { gostou: "border-l-emerald-500", nao_gostou: "border-l-red-500", comunicacao: "border-l-sky-500", processo: "border-l-violet-500", elogio: "border-l-pink-500", erro: "border-l-red-500", insight: "border-l-yellow-500" };
                      const bgColors = { gostou: "bg-emerald-50", nao_gostou: "bg-red-50", comunicacao: "bg-sky-50", processo: "bg-violet-50", elogio: "bg-pink-50", erro: "bg-red-50", insight: "bg-yellow-50" };
                      return (
                        <div key={i} className={`p-4 rounded-lg border-l-4 ${borderColors[entry._tag] || "border-l-gray-300"} ${bgColors[entry._tag] || "bg-stone-50"}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>{cfg.label}</span>
                              <span className="text-xs text-stone-500">{entry.author || "—"}</span>
                              <span className="text-xs text-stone-400">· {entry.clientName}</span>
                            </div>
                            <span className="text-xs text-stone-400">{entry._sort}</span>
                          </div>
                          {entry._title && <p className="font-medium text-sm">{entry._title}</p>}
                          <p className="text-sm text-stone-700">{entry._text}</p>
                          {entry._isLearning && entry.tags && entry.tags.filter(Boolean).length > 0 && (
                            <div className="flex gap-1 mt-2">{entry.tags.filter(Boolean).map((tag, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">{tag}</span>)}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function QAErrorsView({ area, onBack }) {
  // Kept for routing compatibility but redirects to QA knowledge base
  return null;
}

// ============================
// LÍDER VIEWS
// ============================
// LiderSquadSelector removed — only eventos squad exists now

function LiderPortalView({ area, onBack, onProjectClick, onViewAsClient }) {
  const { projects, tasks, feedbacks, clients, clientNotes, addTask, assignFeedbackAsTask, addClientNote, archiveElogio, getTeamWithLoad, team: rawTeam } = useContext(AppContext);
  const [tab, setTab] = useState("geral");
  const [showCreate, setShowCreate] = useState(false);
  const [feedFilter, setFeedFilter] = useState("pendentes");
  const [form, setForm] = useState({ title: "", projectId: "", executor: "", deadline: "", priority: "Média", description: "" });
  const [createClientFilter, setCreateClientFilter] = useState("");
  const [createFiles, setCreateFiles] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [newCheckItem, setNewCheckItem] = useState("");
  const createFileRef = useRef(null);

  const areaProjects = projects.filter(p => p.area === area);
  const areaTeam = getTeamWithLoad(area);
  const areaFeedbacks = feedbacks.filter(f => areaProjects.some(p => p.id === f.projectId));
  const pendingFeedbacks = areaFeedbacks.filter(f => f.status === "pendente" && f.type !== "Elogio");
  const assignedFeedbacks = areaFeedbacks.filter(f => f.status === "atribuido");
  const elogios = areaFeedbacks.filter(f => f.type === "Elogio" && f.status === "pendente");

  const handleCreateFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.map(function(f) {
      const sizeKB = f.size / 1024;
      const sizeStr = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + " MB" : Math.round(sizeKB) + " KB";
      return { name: f.name, size: sizeStr, type: f.type || "arquivo", url: URL.createObjectURL(f) };
    });
    setCreateFiles(function(prev) { return prev.concat(newFiles); });
    if (createFileRef.current) createFileRef.current.value = "";
  };

  const handleAddCheckItem = () => {
    if (newCheckItem.trim()) {
      setCheckItems(prev => [...prev, newCheckItem.trim()]);
      setNewCheckItem("");
    }
  };

  const handleCreateTask = () => {
    const proj = projects.find(p => p.id === form.projectId);
    const exec = rawTeam.find(t => t.id === form.executor);
    const checklist = checkItems.length > 0
      ? checkItems.map(text => ({ text, done: false }))
      : [{ text: "Revisar briefing", done: false }, { text: "Executar entrega", done: false }];
    addTask({ ...form, project: proj?.name || "", executorName: exec?.name || "", area, checklist, attachments: createFiles });
    setForm({ title: "", projectId: "", executor: "", deadline: "", priority: "Média", description: "" });
    setCreateFiles([]);
    setCheckItems([]);
    setNewCheckItem("");
    setShowCreate(false);
  };

  const [assigningFb, setAssigningFb] = useState(null);
  const [assignForm, setAssignForm] = useState({ executor: "", priority: "Alta", deadline: "", title: "", instructions: "" });
  const [elogioNotes, setElogioNotes] = useState({});
  const [relNote, setRelNote] = useState({ clientId: "", text: "", tag: "" });
  const [showRelacionamento, setShowRelacionamento] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetailTab, setClientDetailTab] = useState("projetos");

  const openAssign = (fb) => {
    const relatedTask = fb.relatedTaskId ? tasks.find(t => t.id === fb.relatedTaskId) : null;
    const suggestedExecutor = relatedTask ? relatedTask.executor : "";
    const suggestedTitle = relatedTask
      ? relatedTask.title
      : `[Feedback] ${fb.text.substring(0, 60)}`;
    setAssigningFb(fb.id);
    setAssignForm({
      executor: suggestedExecutor,
      priority: "Alta",
      deadline: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 16),
      title: suggestedTitle,
      instructions: "",
    });
  };

  const handleAssignFeedback = () => {
    const fb = feedbacks.find(f => f.id === assigningFb);
    const proj = projects.find(p => p.id === fb?.projectId);
    const exec = rawTeam.find(t => t.id === assignForm.executor);
    if (!fb || !proj || !exec || !assignForm.title.trim()) return;
    // If feedback is about a specific delivered task, reopen it instead of creating a duplicate
    const reopenId = fb.relatedTaskId || null;
    assignFeedbackAsTask(fb.id, {
      title: assignForm.title,
      projectId: fb.projectId,
      project: proj.name,
      executor: exec.id,
      executorName: exec.name,
      priority: assignForm.priority,
      area,
      deadline: assignForm.deadline,
      instructions: assignForm.instructions.trim(),
      description: `Feedback do cliente ${fb.clientName}: ${fb.text}${assignForm.instructions.trim() ? `\n\nInstruções do líder: ${assignForm.instructions.trim()}` : ""}`,
      checklist: [{ text: "Analisar feedback do cliente", done: false }, { text: "Implementar ajuste solicitado", done: false }, { text: "Validar com líder antes de enviar ao QA", done: false }],
      attachments: [],
    }, reopenId);
    setAssigningFb(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"><ArrowLeft size={16} /> Voltar ao modo executor</button>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl md:text-3xl font-bold">Líder Eventos</h1>
      </div>
      <p className="text-sm md:text-base text-stone-500 mb-1">Gerencie projetos e distribua tarefas para o time.</p>
      <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">Você está vendo todos os projetos de eventos.</p>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === "geral" ? "outline" : "ghost"} size="sm" onClick={() => setTab("geral")} className={tab === "geral" ? "border-pink-500 text-pink-700" : ""}>Visão geral</Button>
        <Button variant={tab === "portal" ? "outline" : "ghost"} size="sm" onClick={() => setTab("portal")} className={tab === "portal" ? "border-violet-500 text-violet-700" : ""}>Portal do cliente</Button>
      </div>

      {tab === "geral" && (
        <>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500"></span>Projetos ativos</h2>
          <Card className="mb-8 overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead><tr className="border-b"><th className="text-left p-3 md:p-4 font-medium">Projeto</th><th className="text-left p-3 md:p-4 font-medium">Cliente</th><th className="text-left p-3 md:p-4 font-medium hidden md:table-cell">Tipo</th><th className="text-left p-3 md:p-4 font-medium hidden md:table-cell">Status</th><th className="text-left p-3 md:p-4 font-medium">Prioridade</th><th className="text-left p-3 md:p-4 font-medium hidden md:table-cell">Responsável</th><th className="text-left p-3 md:p-4 font-medium">Prazo</th></tr></thead>
              <tbody>
                {areaProjects.map(p => {
                  const projFeedbacks = feedbacks.filter(f => f.projectId === p.id && f.status === "pendente");
                  return (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-stone-50 cursor-pointer" onClick={() => onProjectClick && onProjectClick(p.id)}>
                      <td className="p-3 md:p-4 font-medium">{p.name} {projFeedbacks.length > 0 && <Badge variant="success" className="ml-2">{projFeedbacks.length} feedback</Badge>}</td>
                      <td className="p-3 md:p-4 text-stone-500">{p.client}</td>
                      <td className="p-3 md:p-4 hidden md:table-cell"><Badge variant="info">{p.type}</Badge></td>
                      <td className="p-3 md:p-4 hidden md:table-cell"><Badge variant="purple">Projeto</Badge></td>
                      <td className="p-3 md:p-4"><span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${p.priority === "Alta" ? "bg-red-500" : p.priority === "Média" ? "bg-orange-500" : "bg-emerald-500"}`} />{p.priority}</span></td>
                      <td className="p-3 md:p-4 text-stone-500 hidden md:table-cell">{p.responsible}</td>
                      <td className="p-3 md:p-4 text-stone-500"><Calendar className="inline" size={12} /> {new Date(p.deadline).toLocaleDateString("pt-BR")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-pink-500"></span>Feedbacks de clientes</h2>
          <div className="flex gap-2 mb-4">
            <Button variant={feedFilter === "pendentes" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("pendentes")}>Pendentes ({pendingFeedbacks.length})</Button>
            <Button variant={feedFilter === "atribuidos" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("atribuidos")}>Atribuídos ({assignedFeedbacks.length})</Button>
          </div>
          {feedFilter === "pendentes" && pendingFeedbacks.length === 0 && <Card className="p-8 text-center text-stone-400 mb-8">Nenhum feedback pendente de atribuição</Card>}
          {feedFilter === "pendentes" && pendingFeedbacks.map(fb => {
            const relatedTask = fb.relatedTaskId ? tasks.find(t => t.id === fb.relatedTaskId) : null;
            const proj = projects.find(p => p.id === fb.projectId);
            const isAssigning = assigningFb === fb.id;

            return (
              <Card key={fb.id} className="mb-3 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={fb.type === "Ajuste" ? "danger" : fb.type === "Sugestão" ? "warning" : "success"}>{fb.type}</Badge>
                        {relatedTask ? <Badge variant="purple">Sobre entrega específica</Badge> : <Badge variant="info">Sobre o projeto</Badge>}
                      </div>
                      <p className="text-sm text-stone-800 mb-2">{fb.text}</p>
                      <div className="flex items-center gap-4 text-xs text-stone-400">
                        <span>Cliente: <strong className="text-stone-600">{fb.clientName}</strong></span>
                        <span>Projeto: <strong className="text-stone-600">{proj?.name || "—"}</strong></span>
                        <span>{fb.date}</span>
                      </div>
                      {relatedTask && (
                        <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-100">
                          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Entrega relacionada</p>
                          <p className="text-sm font-medium">{relatedTask.title}</p>
                          <p className="text-xs text-stone-500 mt-0.5">Executor: <strong>{relatedTask.executorName}</strong> · Status: {relatedTask.status === "concluida" ? "Concluída" : relatedTask.status === "em_qa" ? "Em QA" : relatedTask.status === "em_execucao" ? "Em execução" : relatedTask.status === "devolvida" ? "Devolvida" : "A fazer"}</p>
                        </div>
                      )}
                    </div>
                    {!isAssigning && <Button size="sm" onClick={() => openAssign(fb)}>{relatedTask ? "Devolver ao executor" : "Atribuir como tarefa"}</Button>}
                  </div>
                </div>

                {isAssigning && (
                  <div className="border-t bg-stone-50 p-5 space-y-3">
                    <p className="text-sm font-bold text-stone-700">{relatedTask ? "Devolver tarefa com feedback" : "Atribuir como nova tarefa"}</p>
                    {relatedTask && <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">A tarefa original será reaberta como "Devolvida" com o feedback do cliente anexado.</p>}
                    <div>
                      <label className="text-xs font-medium text-stone-600">{relatedTask ? "Tarefa original" : "Título da tarefa"}</label>
                      <input value={assignForm.title} onChange={e => setAssignForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" readOnly={!!relatedTask} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-stone-600">Atribuir para</label>
                        <select value={assignForm.executor} onChange={e => setAssignForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                          <option value="">Selecione executor</option>
                          {(proj?.squad && proj.squad.length > 0 ? areaTeam.filter(m => proj.squad.includes(m.id)) : areaTeam).map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.activeTasks} tarefas){relatedTask && relatedTask.executor === m.id ? " ★ executor original" : ""}
                            </option>
                          ))}
                        </select>
                        {relatedTask && <p className="text-xs text-stone-400 mt-1">★ = executor que fez a entrega original</p>}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-600">Prioridade</label>
                        <select value={assignForm.priority} onChange={e => setAssignForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                          <option>Alta</option><option>Média</option><option>Baixa</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-600">Prazo</label>
                        <input type="datetime-local" value={assignForm.deadline} onChange={e => setAssignForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600">Instruções para o executor <span className="text-stone-400 font-normal">(opcional)</span></label>
                      <textarea value={assignForm.instructions} onChange={e => setAssignForm(p => ({ ...p, instructions: e.target.value }))} placeholder="Dê contexto, orientações ou detalhes sobre como resolver este feedback..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-stone-50" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" onClick={handleAssignFeedback} disabled={!assignForm.executor || !assignForm.title.trim()}>{relatedTask ? "Devolver tarefa" : "Confirmar atribuição"}</Button>
                      <Button variant="outline" size="sm" onClick={() => setAssigningFb(null)}>Cancelar</Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
          {feedFilter === "atribuidos" && assignedFeedbacks.length === 0 && <Card className="p-8 text-center text-stone-400 mb-8">Nenhum feedback atribuído ainda</Card>}
          {feedFilter === "atribuidos" && assignedFeedbacks.map(fb => {
            const proj = projects.find(p => p.id === fb.projectId);
            const assignedTask = fb.assignedTaskId ? tasks.find(t => t.id === fb.assignedTaskId) : null;
            return (
              <Card key={fb.id} className="p-5 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success">Atribuído</Badge>
                  <Badge variant={fb.type === "Ajuste" ? "danger" : fb.type === "Sugestão" ? "warning" : "success"}>{fb.type}</Badge>
                </div>
                <p className="text-sm text-stone-700 mb-1">{fb.text}</p>
                <p className="text-xs text-stone-400">Cliente: {fb.clientName} · Projeto: {proj?.name || "—"} · {fb.date}</p>
                {assignedTask && <p className="text-xs text-stone-500 mt-2">Tarefa criada: <strong>{assignedTask.title}</strong> → {assignedTask.executorName}</p>}
              </Card>
            );
          })}

          <button onClick={() => setShowRelacionamento(!showRelacionamento)} className="w-full flex items-center justify-between mt-8 mb-4 group">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Relacionamento com cliente</h2>
              {elogios.length > 0 && <Badge variant="success">{elogios.length} elogio{elogios.length > 1 ? "s" : ""}</Badge>}
            </div>
            {showRelacionamento ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
          </button>

          {showRelacionamento && <>
          <p className="text-sm text-stone-500 mb-4">Elogios recebidos e anotações sobre preferências dos clientes. Ao registrar, a informação vai para o Histórico de Clientes.</p>

          {elogios.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Elogios recebidos</p>
              {elogios.map(fb => {
                const proj = projects.find(p => p.id === fb.projectId);
                return (
                  <Card key={fb.id} className="mb-3 border-l-4 border-l-emerald-500">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="success">Elogio</Badge>
                        <span className="text-xs text-stone-400">{fb.clientName} · {fb.date}</span>
                      </div>
                      <p className="text-sm text-stone-800 mb-1">"{fb.text}"</p>
                      {proj && <p className="text-xs text-stone-400">Projeto: {proj.name}</p>}
                      <div className="mt-3">
                        <textarea
                          value={elogioNotes[fb.id] || ""}
                          onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))}
                          placeholder="Anote o que aprendemos com esse elogio... Ex: 'Cliente valoriza agilidade nas respostas — manter esse padrão'"
                          className="w-full border border-stone-200 rounded-lg p-2.5 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-stone-50"
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            const noteText = elogioNotes[fb.id]?.trim()
                              ? `[Elogio] ${fb.text} — Anotação: ${elogioNotes[fb.id].trim()}`
                              : `[Elogio] ${fb.text}`;
                            archiveElogio(fb.id, noteText, fb.clientId, fb.clientName);
                            setElogioNotes(prev => { const n = { ...prev }; delete n[fb.id]; return n; });
                          }}>
                            <CheckCircle2 size={14} /> Registrar no histórico
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {elogios.length === 0 && (
            <Card className="p-6 text-center text-stone-400 mb-4">Nenhum elogio pendente de registro</Card>
          )}

          <Card className="p-5 mb-8">
            <p className="text-sm font-medium text-stone-700 mb-3">Nova anotação sobre cliente</p>
            {(() => {
              const noteTagConfig = {
                gostou: { label: "Gostou", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
                nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
                comunicacao: { label: "Comunicação", color: "bg-sky-100 text-sky-700 border-sky-300" },
                processo: { label: "Processo", color: "bg-violet-100 text-violet-700 border-violet-300" },
                elogio: { label: "Elogio", color: "bg-pink-100 text-pink-700 border-pink-300" },
                erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
                insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
              };
              return (<>
                <div className="flex items-center gap-3 mb-3">
                  <select value={relNote.clientId} onChange={e => setRelNote(p => ({ ...p, clientId: e.target.value }))} className="border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[180px]">
                    <option value="">Selecione cliente</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input value={relNote.text} onChange={e => setRelNote(p => ({ ...p, text: e.target.value }))} onKeyDown={e => { if (e.key === "Enter" && relNote.clientId && relNote.text.trim() && relNote.tag) { addClientNote(relNote.clientId, relNote.text.trim(), relNote.tag); setRelNote({ clientId: "", text: "", tag: "" }); } }} placeholder="Ex: Cliente prefere reuniões curtas e objetivas..." className="flex-1 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-stone-500 mr-1">Categoria:</span>
                  {Object.entries(noteTagConfig).map(([key, cfg]) => (
                    <button key={key} onClick={() => setRelNote(p => ({ ...p, tag: p.tag === key ? "" : key }))} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${relNote.tag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"}`}>{cfg.label}</button>
                  ))}
                  <div className="ml-auto">
                    <Button size="sm" onClick={() => { if (relNote.clientId && relNote.text.trim() && relNote.tag) { addClientNote(relNote.clientId, relNote.text.trim(), relNote.tag); setRelNote({ clientId: "", text: "", tag: "" }); } }} disabled={!relNote.clientId || !relNote.text.trim() || !relNote.tag}>Salvar nota</Button>
                  </div>
                </div>
              </>);
            })()}
          </Card>
          </>}

          <h2 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-violet-500"></span>Carga do time</h2>
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {areaTeam.map(m => (
                <Card key={m.id} className="p-4 border">
                  <div className="flex justify-between items-start mb-1">
                    <div><p className="font-medium">{m.name}</p><p className="text-sm text-stone-500">{m.role}</p></div>
                    <Badge variant={m.loadStatus === "Disponível" ? "success" : m.loadStatus === "Moderado" ? "warning" : "danger"}>{m.loadStatus}</Badge>
                  </div>
                  <p className="text-sm text-stone-500 flex items-center gap-1 mt-2"><Users size={12} /> {m.activeTasks} tarefas ativas</p>
                </Card>
              ))}
            </div>
          </Card>

          <h2 className="text-xl font-bold mb-4">Planejamento de novas tarefas</h2>
          <Card className="mb-8">
            <button onClick={() => setShowCreate(!showCreate)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="flex items-center gap-2 font-medium"><Plus size={16} /> Criar nova tarefa para o time</span>
              {showCreate ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showCreate && (
              <div className="px-5 pb-5 space-y-4 border-t pt-4">
                <div><label className="text-sm font-medium text-stone-700">Nome da tarefa</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Criar roteiro detalhado..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-stone-700">Cliente</label>
                    <select value={createClientFilter} onChange={e => { setCreateClientFilter(e.target.value); setForm(p => ({ ...p, projectId: "" })); }} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Todos os clientes</option>
                      {[...new Set(areaProjects.map(p => p.client))].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className="text-sm font-medium text-stone-700">Projeto</label>
                    <select value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value, executor: "" }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Selecione um projeto</option>
                      {areaProjects.filter(p => !createClientFilter || p.client === createClientFilter).map(p => <option key={p.id} value={p.id}>{p.client} — {p.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-stone-700">Responsável</label>
                    <select value={form.executor} onChange={e => setForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Selecione</option>
                      {(() => { const selProj = areaProjects.find(p => p.id === form.projectId); return selProj?.squad && selProj.squad.length > 0 ? areaTeam.filter(m => selProj.squad.includes(m.id)) : areaTeam; })().map(m => <option key={m.id} value={m.id}>{m.name} ({m.role} · {m.activeTasks} tarefas)</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-stone-700">Prazo</label><input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                  <div><label className="text-sm font-medium text-stone-700">Prioridade</label>
                    <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option>Alta</option><option>Média</option><option>Baixa</option>
                    </select>
                  </div>
                </div>
                <div><label className="text-sm font-medium text-stone-700">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Descreva o que precisa ser feito..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>

                <div>
                  <label className="text-sm font-medium text-stone-700">Checklist de execução <span className="text-stone-400 font-normal">(opcional)</span></label>
                  <p className="text-xs text-stone-400 mt-0.5 mb-2">Defina os passos que o executor deve seguir. Se deixar vazio, será gerado um checklist padrão.</p>
                  {checkItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <div className="h-4 w-4 rounded border border-stone-300 flex-shrink-0" />
                      <span className="text-sm text-stone-700 flex-1">{item}</span>
                      <button type="button" onClick={() => setCheckItems(prev => prev.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-1">
                    <input value={newCheckItem} onChange={e => setNewCheckItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddCheckItem(); } }} placeholder="Adicionar item..." className="flex-1 border border-stone-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    <Button variant="outline" size="sm" onClick={handleAddCheckItem}>Adicionar</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700">Insumos e referências <span className="text-stone-400 font-normal">(opcional)</span></label>
                  <p className="text-xs text-stone-400 mt-0.5 mb-2">Anexe briefings, manuais, referências visuais ou qualquer arquivo útil para o executor.</p>
                  {createFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-stone-50 border border-stone-100 rounded-lg mb-1.5">
                      <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-amber-600" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 truncate">{f.name}</p>
                        <p className="text-xs text-stone-400">{f.type} · {f.size}</p>
                      </div>
                      <button type="button" onClick={() => setCreateFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <input type="file" ref={createFileRef} onChange={handleCreateFileSelect} multiple style={{display: "none"}} />
                  <button type="button" onClick={() => createFileRef.current && createFileRef.current.click()} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-stone-200 rounded-lg text-sm text-stone-400 hover:border-green-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
                    <Plus size={16} /> Selecionar arquivos
                  </button>
                </div>

                <div className="flex gap-2 pt-2"><Button onClick={handleCreateTask}>Criar tarefa</Button><Button variant="outline" onClick={() => { setShowCreate(false); setCreateFiles([]); setCheckItems([]); setNewCheckItem(""); }}>Cancelar</Button></div>
              </div>
            )}
          </Card>
        </>
      )}

      {tab === "portal" && (() => {
        const uniqueClientIds = [...new Set(areaProjects.map(p => p.clientId))];
        const areaClients = uniqueClientIds.map(cid => clients.find(c => c.id === cid)).filter(Boolean);

        // Detail view for selected client
        if (selectedClient) {
          const client = clients.find(c => c.id === selectedClient);
          if (!client) return null;
          const cProjects = areaProjects.filter(p => p.clientId === client.id);
          const cHistoric = historicProjects.filter(p => p.clientId === client.id);
          const cTasks = tasks.filter(t => cProjects.some(p => p.id === t.projectId));
          const cDone = cTasks.filter(t => t.status === "concluida");
          const cFeedbacks = feedbacks.filter(f => f.clientId === client.id);
          const cPendingFb = cFeedbacks.filter(f => f.status === "pendente");
          const cElogios = cFeedbacks.filter(f => f.type === "Elogio");
          const cNotes = clientNotes.filter(n => n.clientId === client.id);

          return (
            <>
              <button onClick={() => { setSelectedClient(null); setClientDetailTab("projetos"); }} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center text-lg font-bold">{client.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{client.name}</h2>
                    <p className="text-sm text-stone-500">Contato: {client.contact} · Responsável: {client.responsible}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><MessageSquare size={14} /> WhatsApp</Button>
                  <Button variant="outline" size="sm" onClick={() => onViewAsClient && onViewAsClient(client.id)}><ExternalLink size={14} /> Ver como cliente</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                <Card className="p-4 text-center"><p className="text-2xl font-bold">{cProjects.length}</p><p className="text-xs text-stone-500">Projetos ativos</p></Card>
                <Card className="p-4 text-center"><p className="text-2xl font-bold">{cDone.length}/{cTasks.length}</p><p className="text-xs text-stone-500">Tarefas concluídas</p></Card>
                <Card className="p-4 text-center"><p className={`text-2xl font-bold ${cPendingFb.length > 0 ? "text-orange-600" : "text-emerald-600"}`}>{cPendingFb.length}</p><p className="text-xs text-stone-500">Feedbacks pendentes</p></Card>
                <Card className="p-4 text-center"><p className="text-sm font-medium"><Calendar size={12} className="inline" /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")}</p><p className="text-xs text-stone-500 mt-1">Próxima reunião</p></Card>
              </div>

              <div className="flex border-b mb-6">
                {[
                  { key: "projetos", label: "Projetos" },
                  { key: "feedbacks", label: `Feedbacks (${cFeedbacks.length})` },
                  { key: "relacionamento", label: `Relacionamento${cElogios.length > 0 ? " (" + cElogios.length + " elogio" + (cElogios.length > 1 ? "s" : "") + ")" : ""}` },
                ].map(t => (
                  <button key={t.key} onClick={() => setClientDetailTab(t.key)} className={`px-5 py-3 text-sm font-medium transition-colors ${clientDetailTab === t.key ? "border-b-2 border-stone-900 text-stone-900" : "text-stone-500 hover:text-stone-700"}`}>{t.label}</button>
                ))}
              </div>

              {clientDetailTab === "projetos" && (
                <div className="space-y-3">
                  {cProjects.length > 0 && <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Ativos</p>}
                  {cProjects.map(p => {
                    const pTasks = tasks.filter(t => t.projectId === p.id);
                    const pDone = pTasks.filter(t => t.status === "concluida").length;
                    const progress = pTasks.length > 0 ? Math.round((pDone / pTasks.length) * 100) : p.progress;
                    return (
                      <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onProjectClick && onProjectClick(p.id)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-stone-500 mt-0.5">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")} · {pTasks.length} tarefas</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={p.priority === "Alta" ? "danger" : "warning"}>{p.priority}</Badge>
                            <div className="flex items-center gap-2 w-28"><div className="flex-1 bg-stone-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: progress + "%" }} /></div><span className="text-xs text-stone-400">{progress}%</span></div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  {cHistoric.length > 0 && <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mt-6">Concluídos</p>}
                  {cHistoric.map(p => (
                    <Card key={p.id} className="p-4 opacity-70">
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium text-stone-600">{p.name}</p><p className="text-xs text-stone-400 mt-0.5">Concluído em: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p></div>
                        <Badge variant="success">Concluído</Badge>
                      </div>
                    </Card>
                  ))}
                  {cProjects.length === 0 && cHistoric.length === 0 && <p className="text-sm text-stone-400">Nenhum projeto registrado.</p>}
                </div>
              )}

              {clientDetailTab === "feedbacks" && (
                <div className="space-y-3">
                  {cFeedbacks.length === 0 && <p className="text-sm text-stone-400">Nenhum feedback registrado.</p>}
                  {cFeedbacks.map(fb => {
                    const relTask = fb.relatedTaskId ? tasks.find(t => t.id === fb.relatedTaskId) : null;
                    const fbProj = projects.find(p => p.id === fb.projectId);
                    const isAssigning = assigningFb === fb.id;
                    const canAssign = fb.status === "pendente" && fb.type !== "Elogio";
                    const isElogio = fb.type === "Elogio";
                    const assignedTask = fb.assignedTaskId ? tasks.find(t => t.id === fb.assignedTaskId) : null;

                    return (
                      <Card key={fb.id} className={`overflow-hidden border-l-4 ${fb.type === "Elogio" ? "border-l-pink-500" : fb.type === "Ajuste" ? "border-l-orange-500" : "border-l-sky-500"}`}>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={fb.type === "Elogio" ? "success" : fb.type === "Ajuste" ? "danger" : "warning"}>{fb.type}</Badge>
                                <Badge variant={fb.status === "pendente" ? "warning" : "success"}>{fb.status === "pendente" ? "Pendente" : "Atribuído"}</Badge>
                                {relTask && <Badge variant="purple">Sobre entrega</Badge>}
                                <span className="text-xs text-stone-400">{fb.date}</span>
                              </div>
                              <p className="text-sm text-stone-800">{fb.text}</p>
                              {relTask && <p className="text-xs text-stone-500 mt-1">Entrega: {relTask.title} (por {relTask.executorName})</p>}
                              {assignedTask && <p className="text-xs text-emerald-600 mt-1">Tarefa criada: {assignedTask.title} → {assignedTask.executorName}</p>}
                            </div>
                            {canAssign && !isAssigning && <Button size="sm" onClick={() => openAssign(fb)}>Atribuir</Button>}
                          </div>
                          {isElogio && (
                            <div className="mt-3 pt-3 border-t border-stone-100">
                              <textarea value={elogioNotes[fb.id] || ""} onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))} placeholder="O que aprendemos com esse elogio?" className="w-full border border-stone-200 rounded-lg p-2.5 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-stone-50" />
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline" onClick={() => { const txt = elogioNotes[fb.id]?.trim() ? `[Elogio] ${fb.text} — ${elogioNotes[fb.id].trim()}` : `[Elogio] ${fb.text}`; archiveElogio(fb.id, txt, fb.clientId, fb.clientName); setElogioNotes(prev => { const n = { ...prev }; delete n[fb.id]; return n; }); }}><CheckCircle2 size={14} /> Registrar no histórico</Button>
                              </div>
                            </div>
                          )}
                        </div>
                        {isAssigning && (
                          <div className="border-t bg-stone-50 p-4 space-y-3">
                            <div><label className="text-xs font-medium text-stone-600">Título da tarefa</label><input value={assignForm.title} onChange={e => setAssignForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-medium text-stone-600">Executor</label>
                                <select value={assignForm.executor} onChange={e => setAssignForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                                  <option value="">Selecione</option>
                                  {(fbProj?.squad && fbProj.squad.length > 0 ? areaTeam.filter(m => fbProj.squad.includes(m.id)) : areaTeam).map(m => <option key={m.id} value={m.id}>{m.name} ({m.activeTasks} tarefas){relTask && relTask.executor === m.id ? " ★" : ""}</option>)}
                                </select>
                              </div>
                              <div><label className="text-xs font-medium text-stone-600">Prioridade</label><select value={assignForm.priority} onChange={e => setAssignForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option>Alta</option><option>Média</option><option>Baixa</option></select></div>
                              <div><label className="text-xs font-medium text-stone-600">Prazo</label><input type="datetime-local" value={assignForm.deadline} onChange={e => setAssignForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                            </div>
                            <div><label className="text-xs font-medium text-stone-600">Instruções para o executor <span className="text-stone-400 font-normal">(opcional)</span></label><textarea value={assignForm.instructions} onChange={e => setAssignForm(p => ({ ...p, instructions: e.target.value }))} placeholder="Contexto, orientações ou detalhes para o executor..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" /></div>
                            <div className="flex gap-2"><Button size="sm" onClick={handleAssignFeedback} disabled={!assignForm.executor || !assignForm.title.trim()}>Confirmar</Button><Button variant="outline" size="sm" onClick={() => setAssigningFb(null)}>Cancelar</Button></div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}

              {clientDetailTab === "relacionamento" && (
                <div>
                  {cElogios.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Elogios para registrar</p>
                      {cElogios.map(fb => {
                        const proj = projects.find(p => p.id === fb.projectId);
                        return (
                          <Card key={fb.id} className="mb-3 border-l-4 border-l-emerald-500">
                            <div className="p-4">
                              <p className="text-sm text-stone-800 mb-1">"{fb.text}"</p>
                              {proj && <p className="text-xs text-stone-400 mb-3">Projeto: {proj.name} · {fb.date}</p>}
                              <textarea value={elogioNotes[fb.id] || ""} onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))} placeholder="O que aprendemos? Ex: 'Cliente valoriza agilidade — manter padrão'" className="w-full border border-stone-200 rounded-lg p-2.5 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-stone-50" />
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline" onClick={() => { const txt = elogioNotes[fb.id]?.trim() ? `[Elogio] ${fb.text} — ${elogioNotes[fb.id].trim()}` : `[Elogio] ${fb.text}`; archiveElogio(fb.id, txt, fb.clientId, fb.clientName); setElogioNotes(prev => { const n = { ...prev }; delete n[fb.id]; return n; }); }}><CheckCircle2 size={14} /> Registrar no histórico</Button>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Notas internas</p>
                  {(() => {
                    const dTagCfg = {
                      gostou: { label: "Gostou", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
                      nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
                      comunicacao: { label: "Comunicação", color: "bg-sky-100 text-sky-700 border-sky-300" },
                      processo: { label: "Processo", color: "bg-violet-100 text-violet-700 border-violet-300" },
                      elogio: { label: "Elogio", color: "bg-pink-100 text-pink-700 border-pink-300" },
                      erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
                      insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
                    };
                    const activeTag = relNote.clientId === client.id ? relNote.tag : "";
                    return (<div className="mb-4">
                      <div className="flex gap-2 mb-2">
                        <input value={relNote.clientId === client.id ? relNote.text : ""} onChange={e => setRelNote({ clientId: client.id, text: e.target.value, tag: relNote.clientId === client.id ? relNote.tag : "" })} onKeyDown={e => { if (e.key === "Enter" && relNote.text.trim() && activeTag) { addClientNote(client.id, relNote.text.trim(), activeTag); setRelNote({ clientId: "", text: "", tag: "" }); } }} placeholder="Adicionar anotação sobre este cliente..." className="flex-1 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-stone-500">Categoria:</span>
                        {Object.entries(dTagCfg).map(([key, cfg]) => (
                          <button key={key} onClick={() => setRelNote(p => ({ ...p, clientId: client.id, tag: p.tag === key ? "" : key }))} className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all ${activeTag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100"}`}>{cfg.label}</button>
                        ))}
                        <Button size="sm" className="ml-auto" onClick={() => { if (relNote.text.trim() && activeTag) { addClientNote(client.id, relNote.text.trim(), activeTag); setRelNote({ clientId: "", text: "", tag: "" }); } }} disabled={!relNote.text.trim() || !activeTag}>Salvar</Button>
                      </div>
                    </div>);
                  })()}
                  <div className="space-y-2">
                    {cNotes.length === 0 && <p className="text-sm text-stone-400">Nenhuma nota ainda.</p>}
                    {cNotes.map(n => (
                      <div key={n.id} className="p-3 bg-stone-50 rounded-lg">
                        <div className="flex justify-between"><span className="text-xs font-medium text-stone-500">{n.author}</span><span className="text-xs text-stone-400">{n.date}</span></div>
                        <p className="text-sm mt-1">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        }

        // Client list
        return (
        <>
          {areaClients.map(client => {
            const cProjects = areaProjects.filter(p => p.clientId === client.id);
            const cFb = feedbacks.filter(f => f.clientId === client.id && f.status === "pendente");
            const health = cFb.filter(f => f.type === "Ajuste").length >= 2 ? "danger" : cFb.length > 0 ? "warning" : "good";

            return (
              <Card key={client.id} className="mb-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedClient(client.id); setClientDetailTab("projetos"); }}>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${health === "good" ? "bg-emerald-100 text-emerald-700" : health === "warning" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                      {client.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{client.name}</h3>
                      <p className="text-xs text-stone-500">{cProjects.length} projetos ativos · Reunião: {new Date(client.nextMeeting).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {cFb.length > 0 && <Badge variant="warning">{cFb.length} pendência{cFb.length > 1 ? "s" : ""}</Badge>}
                    {cFb.length === 0 && <Badge variant="success">Sem pendências</Badge>}
                    <ChevronDown size={16} className="text-stone-400 -rotate-90" />
                  </div>
                </div>
              </Card>
            );
          })}
        </>
        );
      })()}
    </div>
  );
}

// ============================
// CLIENTES VIEWS
// ============================
function ClientSelectorView({ onSelect, onBack }) {
  const brandColors = ["bg-pink-500", "bg-amber-500", "bg-violet-500", "bg-emerald-500", "bg-sky-500"];
  const hoverBorders = ["hover:border-pink-400", "hover:border-amber-400", "hover:border-violet-400", "hover:border-emerald-400", "hover:border-sky-400"];
  const activeClients = [
    { id: "c5", name: "XP", logo: "XP" },
    { id: "c3", name: "Red Bull", logo: "RB" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-6"><ArrowLeft size={16} /> Voltar</button>
      <p className="text-sm text-stone-400 mb-1">Synapse · Portal do Cliente</p>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Acessar como cliente</h1>
      <p className="text-sm md:text-base text-stone-500 mb-6 md:mb-8">Selecione o cliente para visualizar o portal com seus projetos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {activeClients.map(c => (
          <button key={c.id} onClick={() => onSelect(c.id)} className={`group border-2 border-stone-200 rounded-2xl p-8 ${hoverBorders[activeClients.indexOf(c) % 5]} hover:shadow-lg transition-all text-left`}>
            <div className={`w-14 h-14 rounded-xl ${brandColors[activeClients.indexOf(c) % 5]} text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform`}>{c.logo}</div>
            <h2 className="text-xl font-bold mb-1">{c.name}</h2>
            <p className="text-sm text-stone-500">Entrar no portal do cliente {c.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ClientHubView({ onBack }) {
  const { clients, projects, feedbacks, learnings, clientNotes, addClientNote } = useContext(AppContext);
  const [expandedClient, setExpandedClient] = useState(null);
  const [clientTab, setClientTab] = useState("projetos");
  const [newNote, setNewNote] = useState("");
  const [noteTag, setNoteTag] = useState("gostou");
  const [kbFilter, setKbFilter] = useState("todos");

  const totalActive = projects.filter(p => p.status === "em_execucao").length;
  const totalDone = historicProjects.length;
  const activeClientIds = new Set(projects.filter(p => p.status === "em_execucao").map(p => p.clientId));

  const getClientData = (clientId) => {
    const activeP = projects.filter(p => p.clientId === clientId && p.status === "em_execucao");
    const doneP = historicProjects.filter(p => p.clientId === clientId);
    const allP = [...activeP, ...doneP];
    const clientFeedbacks = feedbacks.filter(f => f.clientId === clientId);
    const clientLearnings = learnings.filter(l => l.clientId === clientId);
    const notes = clientNotes.filter(n => n.clientId === clientId);
    return { activeP, doneP, allP, clientFeedbacks, clientLearnings, notes };
  };

  const handleExpand = (cid) => {
    if (expandedClient === cid) { setExpandedClient(null); } else { setExpandedClient(cid); setClientTab("projetos"); }
  };

  const handleAddNote = (clientId) => {
    if (!newNote.trim()) return;
    addClientNote(clientId, newNote.trim(), noteTag);
    setNewNote("");
  };

  const relationBadge = (r) => r === "estável" ? { label: "Relacionamento estável", variant: "success" } : r === "atenção" ? { label: "Requer atenção", variant: "danger" } : { label: "Parceria excelente", variant: "success" };

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">Histórico de Clientes</h1>
      </div>
      <p className="text-stone-500 mb-8">Base de conhecimento da agência — projetos, feedbacks, aprendizados e anotações internas de cada cliente.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: "Total de clientes", value: clients.length, icon: <Users size={20} className="text-pink-500" /> },
          { label: "Clientes ativos", value: activeClientIds.size, icon: <CheckCircle2 size={20} className="text-emerald-500" /> },
          { label: "Projetos ativos", value: totalActive, icon: <FolderOpen size={20} className="text-amber-500" /> },
          { label: "Projetos concluídos", value: totalDone, icon: <CheckCircle2 size={20} className="text-violet-500" /> },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-stone-500">{s.label}</p>{s.icon}</div>
            <p className="text-2xl md:text-3xl font-bold mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {clients.map(c => {
          const data = getClientData(c.id);
          const isActive = activeClientIds.has(c.id);
          const isExpanded = expandedClient === c.id;
          const rel = relationBadge(c.relationship);

          return (
            <Card key={c.id} className="overflow-hidden">
              <button onClick={() => handleExpand(c.id)} className="w-full p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${isActive ? ["bg-pink-500 text-white", "bg-amber-500 text-white", "bg-violet-500 text-white", "bg-emerald-500 text-white", "bg-sky-500 text-white"][clients.indexOf(c) % 5] : "bg-stone-200 text-stone-500"}`}>
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{c.name}</h3>
                      <Badge variant={isActive ? "success" : "default"}>{isActive ? "Ativo" : "Inativo"}</Badge>
                      <Badge variant={rel.variant}>{rel.label}</Badge>
                    </div>
                    <p className="text-sm text-stone-500">Contato: {c.contact} · Responsável: {c.responsible} · {data.allP.length} projetos · {data.clientLearnings.length + data.notes.length} registros</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {data.activeP.length > 0 && <Badge variant="info">{data.activeP.length} ativos</Badge>}
                  {data.doneP.length > 0 && <span className="text-sm text-stone-400">{data.doneP.length} concluídos</span>}
                  {isExpanded ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t">
                  <div className="flex border-b">
                    {[
                      { key: "projetos", label: "Projetos (" + data.allP.length + ")" },
                      { key: "conhecimento", label: "Base de conhecimento (" + (data.clientLearnings.length + data.notes.length) + ")" },
                    ].map(t => (
                      <button key={t.key} onClick={() => setClientTab(t.key)} className={`px-5 py-3 text-sm font-medium transition-colors ${clientTab === t.key ? "border-b-2 border-stone-900 text-stone-900" : "text-stone-500 hover:text-stone-700"}`}>{t.label}</button>
                    ))}
                  </div>

                  <div className="p-5">
                    {clientTab === "projetos" && (
                      <div className="space-y-3">
                        {data.allP.length === 0 && <p className="text-sm text-stone-400">Nenhum projeto registrado.</p>}
                        {data.activeP.length > 0 && (
                          <>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Projetos ativos</p>
                            {data.activeP.map(p => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{p.name}</p>
                                  <p className="text-sm text-stone-500">Responsável: {p.responsible} · Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={p.priority === "Alta" ? "danger" : p.priority === "Média" ? "warning" : "success"}>{p.priority}</Badge>
                                  <div className="w-24 bg-stone-200 rounded-full h-2"><div className="bg-stone-900 h-2 rounded-full" style={{ width: p.progress + "%" }} /></div>
                                  <span className="text-xs text-stone-500 w-8">{p.progress}%</span>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {data.doneP.length > 0 && (
                          <>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 mt-4">Projetos concluídos</p>
                            {data.doneP.map(p => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-stone-600">{p.name}</p>
                                  <p className="text-sm text-stone-400">Responsável: {p.responsible} · Concluído em: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>
                                </div>
                                <Badge variant="success">Concluído</Badge>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}

                    {clientTab === "conhecimento" && (() => {
                      const tagConfig = {
                        gostou: { label: "Gostou", color: "bg-emerald-100 text-emerald-700 border-emerald-300", border: "border-l-emerald-500", bg: "bg-emerald-50" },
                        nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300", border: "border-l-red-500", bg: "bg-red-50" },
                        comunicacao: { label: "Comunicação", color: "bg-sky-100 text-sky-700 border-sky-300", border: "border-l-sky-500", bg: "bg-sky-50" },
                        processo: { label: "Processo", color: "bg-violet-100 text-violet-700 border-violet-300", border: "border-l-violet-500", bg: "bg-violet-50" },
                        elogio: { label: "Elogio", color: "bg-pink-100 text-pink-700 border-pink-300", border: "border-l-pink-500", bg: "bg-pink-50" },
                        erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300", border: "border-l-red-500", bg: "bg-red-50" },
                        insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300", border: "border-l-yellow-500", bg: "bg-yellow-50" },
                      };
                      const getTag = (t) => tagConfig[t] || { label: t || "Geral", color: "bg-stone-100 text-stone-600 border-stone-300", border: "border-l-gray-300", bg: "bg-stone-50" };

                      const entries = [
                        ...data.notes.map(n => {
                          const isElogio = n.tag === "elogio" || n.text.startsWith("[Elogio]");
                          return { ...n, _type: "nota", _tag: isElogio ? "elogio" : (n.tag || "gostou"), _text: isElogio ? n.text.replace(/^\[Elogio\]\s*/, "") : n.text, _sort: n.date, _author: n.author };
                        }),
                        ...data.clientLearnings.map(l => ({
                          ...l, _type: "aprendizado", _tag: l.type === "erro" ? "erro" : "insight", _text: l.description, _title: l.title, _sort: l.date, _author: l.origin, _tags: l.tags,
                        })),
                      ].sort((a, b) => b._sort.localeCompare(a._sort));

                      const filterTags = ["todos", "gostou", "nao_gostou", "comunicacao", "processo", "elogio", "erro", "insight"];
                      const filtered = kbFilter === "todos" ? entries : entries.filter(e => e._tag === kbFilter);

                      // Count per tag
                      const tagCounts = {};
                      entries.forEach(e => { tagCounts[e._tag] = (tagCounts[e._tag] || 0) + 1; });

                      return (
                        <div>
                          {/* Filter */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {filterTags.map(t => {
                              const cfg = t === "todos" ? { label: "Todos", color: "bg-stone-100 text-stone-700 border-stone-300" } : getTag(t);
                              const count = t === "todos" ? entries.length : (tagCounts[t] || 0);
                              return (
                                <button key={t} onClick={() => setKbFilter(t)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${kbFilter === t ? (t === "todos" ? "bg-stone-900 text-white border-stone-900" : cfg.color + " border-current") : "bg-white text-stone-400 border-stone-200 hover:bg-stone-50"}`}>
                                  {cfg.label} ({count})
                                </button>
                              );
                            })}
                          </div>

                          {/* Timeline */}
                          {filtered.length === 0 ? (
                            <p className="text-sm text-stone-400 text-center py-6">Nenhum registro {kbFilter !== "todos" ? `com tag "${getTag(kbFilter).label}"` : ""} ainda.</p>
                          ) : (
                            <div className="space-y-2">
                              {filtered.map((entry, i) => {
                                const cfg = getTag(entry._tag);
                                return (
                                  <div key={entry._type + "-" + entry.id} className={`p-4 rounded-lg border-l-4 ${cfg.border} ${cfg.bg}`}>
                                    <div className="flex items-center justify-between mb-1.5">
                                      <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>{cfg.label}</span>
                                        <span className="text-xs text-stone-500">{entry._author}</span>
                                      </div>
                                      <span className="text-xs text-stone-400">{entry._sort}</span>
                                    </div>
                                    {entry._title && <p className="font-medium text-sm">{entry._title}</p>}
                                    <p className="text-sm text-stone-700">{entry._text}</p>
                                    {entry._tags && entry._tags.length > 0 && <div className="flex gap-1 mt-2">{entry._tags.map((tag, ti) => <span key={ti} className="text-xs bg-white/60 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">{tag}</span>)}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ClientPortalView({ clientId, onBack, onProjectClick }) {
  const { clients, projects, tasks, feedbacks, addFeedback, clientApproveTask, clientRejectTask } = useContext(AppContext);
  const client = clients.find(c => c.id === clientId) || clients[0];
  const clientProjects = projects.filter(p => p.clientId === client.id);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTab, setProjectTab] = useState("entregas");
  const [fbForm, setFbForm] = useState({ type: "Sugestão", text: "" });
  const [feedbackTaskId, setFeedbackTaskId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Clean internal info for client view
  const clientTitle = (title) => title.replace(/^\[Feedback\]\s*/i, "");
  const clientDescription = (desc) => {
    if (!desc) return null;
    // Remove "Feedback do cliente X: ..." and "Instruções do líder: ..."
    let clean = desc.replace(/Feedback do cliente [^:]+:\s*/i, "").replace(/\n?\n?Instruções do líder:[\s\S]*/i, "").trim();
    return clean || null;
  };

  const getPendingApproval = (projectId) => tasks.filter(t => t.projectId === projectId && t.status === "concluida" && !t.clientApproved);
  const getClientApproved = (projectId) => tasks.filter(t => t.projectId === projectId && t.status === "concluida" && t.clientApproved);
  const getInProgressCount = (projectId) => tasks.filter(t => t.projectId === projectId && t.status !== "concluida").length;
  const totalPending = clientProjects.reduce((sum, p) => sum + getPendingApproval(p.id).length, 0);

  // Project detail view
  if (selectedProject) {
    const p = selectedProject;
    const pendingApproval = getPendingApproval(p.id);
    const approved = getClientApproved(p.id);
    const inProgress = getInProgressCount(p.id);
    const allTasks = tasks.filter(t => t.projectId === p.id);
    const progress = allTasks.length > 0 ? Math.round((approved.length / allTasks.length) * 100) : p.progress;
    const projectFeedbacks = feedbacks.filter(f => f.projectId === p.id);

    return (
      <div className="max-w-5xl mx-auto">
        <button onClick={() => { setSelectedProject(null); setProjectTab("entregas"); setFeedbackTaskId(null); setFeedbackText(""); }} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-4"><ArrowLeft size={16} /> Voltar aos projetos</button>
        <p className="text-sm text-stone-400 mb-1">Synapse · Portal do Cliente · {client.name}</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{p.name}</h1>
        <p className="text-xs md:text-sm text-stone-500 mb-4 md:mb-6">Responsável: {p.responsible} · Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>

        {/* Progress bar */}
        <Card className="p-4 md:p-5 mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-stone-700">Progresso geral</p>
            <p className="text-lg font-bold">{progress}%</p>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5"><div className="bg-emerald-500 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="flex flex-wrap gap-3 md:gap-6 mt-3 text-sm">
            {pendingApproval.length > 0 && <span className="text-stone-700 font-medium">{pendingApproval.length} para revisar</span>}
            <span className="text-emerald-600 font-medium">{approved.length} aprovada{approved.length !== 1 ? "s" : ""}</span>
            {inProgress > 0 && <span className="text-stone-400">{inProgress} em andamento</span>}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b">
          {[{ key: "entregas", label: "Entregas", count: pendingApproval.length }, { key: "aprovadas", label: "Aprovadas", count: approved.length }, { key: "feedback", label: "Feedback", count: projectFeedbacks.length }].map(tab => (
            <button key={tab.key} onClick={() => setProjectTab(tab.key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${projectTab === tab.key ? "border-stone-900 text-stone-900" : "border-transparent text-stone-400 hover:text-stone-600"}`}>
              {tab.label} {tab.count > 0 && <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${projectTab === tab.key ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Tab: Entregas (pending approval) */}
        {projectTab === "entregas" && (
          <div>
            {pendingApproval.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle2 size={32} className="text-green-400 mx-auto mb-3" />
                <p className="text-stone-500">Todas as entregas foram revisadas.</p>
                <p className="text-sm text-stone-400 mt-1">{inProgress > 0 ? `${inProgress} entrega${inProgress > 1 ? "s" : ""} ainda em andamento.` : "Nenhuma pendência no momento."}</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingApproval.map(task => (
                  <Card key={task.id} className="overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{clientTitle(task.title)}</p>
                          <p className="text-sm text-stone-500 mt-0.5">Entregue em {new Date(task.deadline).toLocaleDateString("pt-BR")}</p>
                        </div>
                        {task.submittedLink && task.submittedLink.trim() && (
                          <Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>
                            <ExternalLink size={12} /> Ver entrega
                          </Button>
                        )}
                      </div>
                      {clientDescription(task.description) && <p className="text-sm text-stone-600 mb-3">{clientDescription(task.description)}</p>}
                      {task.submittedFiles && task.submittedFiles.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-stone-500 font-medium mb-1.5">Arquivos da entrega</p>
                          {task.submittedFiles.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 bg-stone-50 rounded-lg p-2.5 mb-1">
                              <Copy size={14} className="text-stone-400" />
                              <span className="text-sm flex-1 truncate">{f.name}</span>
                              {f.url && <a href={f.url} download={f.name} className="text-xs text-sky-600 hover:underline">Baixar</a>}
                            </div>
                          ))}
                        </div>
                      )}

                      {feedbackTaskId === task.id ? (
                        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mt-3">
                          <p className="text-sm font-medium text-stone-700 mb-2">Seu feedback sobre esta entrega</p>
                          <textarea
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                            placeholder="Descreva o que gostaria de ajustar ou melhorar..."
                            className="w-full border border-stone-200 rounded-lg p-2.5 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                            autoFocus
                          />
                          <div className="flex gap-2 mt-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => { setFeedbackTaskId(null); setFeedbackText(""); }}>Cancelar</Button>
                            <button type="button" disabled={!feedbackText.trim()} onClick={() => { clientRejectTask(task.id, feedbackText.trim(), client.id, client.name, p.id); setFeedbackTaskId(null); setFeedbackText(""); }} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${feedbackText.trim() ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-stone-200 text-stone-400 cursor-not-allowed"}`}>
                              <Send size={12} /> Enviar feedback
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-stone-100">
                          <button type="button" onClick={() => clientApproveTask(task.id)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium text-sm">
                            <CheckCircle2 size={16} /> Aprovar
                          </button>
                          <button type="button" onClick={() => setFeedbackTaskId(task.id)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 rounded-lg font-medium text-sm">
                            <MessageSquare size={16} /> Enviar feedback
                          </button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Aprovadas */}
        {projectTab === "aprovadas" && (
          <div>
            {approved.length === 0 ? (
              <Card className="p-8 text-center text-stone-400">Nenhuma entrega aprovada ainda.</Card>
            ) : (
              <div className="space-y-2">
                {approved.map(task => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <div>
                          <p className="font-medium text-sm">{clientTitle(task.title)}</p>
                          <p className="text-xs text-stone-400">{new Date(task.deadline).toLocaleDateString("pt-BR")}</p>
                        </div>
                      </div>
                      {task.submittedLink && task.submittedLink.trim() && (
                        <Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>
                          <ExternalLink size={12} /> Ver
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Feedback */}
        {projectTab === "feedback" && (
          <div>
            <Card className="p-5 mb-4">
              <p className="text-sm font-medium text-stone-700 mb-3">Enviar feedback geral sobre o projeto</p>
              <div className="flex gap-3 mb-3">
                <select value={fbForm.type} onChange={e => setFbForm(prev => ({ ...prev, type: e.target.value }))} className="border border-stone-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <option>Sugestão</option><option>Ajuste</option><option>Elogio</option><option>Problema</option>
                </select>
                <input value={fbForm.text} onChange={e => setFbForm(prev => ({ ...prev, text: e.target.value }))} placeholder="Escreva seu feedback..." className="flex-1 border border-stone-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
                <button type="button" disabled={!fbForm.text.trim()} onClick={() => { addFeedback({ projectId: p.id, clientId: client.id, clientName: client.name, date: new Date().toISOString().split("T")[0], type: fbForm.type, text: fbForm.text }); setFbForm({ type: "Sugestão", text: "" }); }} className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium ${fbForm.text.trim() ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-stone-200 text-stone-400 cursor-not-allowed"}`}>
                  <Send size={14} /> Enviar
                </button>
              </div>
            </Card>

            {projectFeedbacks.length === 0 ? (
              <Card className="p-6 text-center text-stone-400">Nenhum feedback enviado para este projeto.</Card>
            ) : (
              <div className="space-y-2">
                {projectFeedbacks.map(fb => (
                  <Card key={fb.id} className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={fb.type === "Elogio" ? "success" : fb.type === "Problema" ? "danger" : "warning"}>{fb.type}</Badge>
                      <Badge variant={fb.status === "pendente" ? "default" : "success"}>{fb.status === "pendente" ? "Enviado" : "Em tratamento"}</Badge>
                      <span className="text-xs text-stone-400">{fb.date}</span>
                    </div>
                    <p className="text-sm text-stone-700">{fb.text}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Main project list
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900"><ArrowLeft size={16} /> Voltar</button>
        <Button variant="outline" size="sm" onClick={onBack}>Sair do portal</Button>
      </div>
      <p className="text-sm text-stone-400 mb-1">Synapse · Portal do Cliente</p>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Bem-vindo, {client.name}</h1>

      {/* Account Info */}
      <Card className="p-4 md:p-6 mb-4 md:mb-6 border-l-4 border-l-green-600">
        <h3 className="font-bold mb-3">Sua conta na Synapse</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <p className="text-sm text-stone-500 mb-1">Seu gerente de conta</p>
            <p className="font-medium text-lg">{client.responsible}</p>
            <Button variant="outline" size="sm" className="mt-2"><MessageSquare size={14} /> WhatsApp direto</Button>
          </div>
          <div>
            <p className="text-sm text-stone-500 mb-1">Próxima reunião</p>
            <p className="font-medium flex items-center gap-1"><Calendar size={16} /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")} às {new Date(client.nextMeeting).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setShowSchedule(!showSchedule)}>Reagendar</Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-stone-500 mb-1">Projetos ativos</p>
            <p className="text-2xl font-bold text-emerald-600">{clientProjects.length}</p>
          </div>
        </div>
        {showSchedule && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">Sugerir novo horário</p>
            <div className="flex gap-2">
              <input type="datetime-local" className="border rounded-lg p-2 text-sm flex-1" />
              <Button size="sm" onClick={() => { alert("Sugestão de reagendamento enviada para a Synapse!\n\nEm produção, notificaria o gerente de conta."); setShowSchedule(false); }}>Enviar sugestão</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Pending approvals banner */}
      {totalPending > 0 && (
        <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800 font-medium">{totalPending} entrega{totalPending !== 1 ? "s" : ""} aguardando sua revisão. Clique no projeto para revisar.</p>
        </Card>
      )}

      {/* Projects */}
      <h2 className="text-xl font-bold mb-4">Seus projetos</h2>
      <div className="space-y-3 mb-8">
        {clientProjects.map(p => {
          const pending = getPendingApproval(p.id).length;
          const approvedCount = getClientApproved(p.id).length;
          const inProgress = getInProgressCount(p.id);
          const allTasks = tasks.filter(t => t.projectId === p.id);
          const progress = allTasks.length > 0 ? Math.round((approvedCount / allTasks.length) * 100) : p.progress;

          return (
            <Card key={p.id} className="cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => { setSelectedProject(p); setProjectTab(pending > 0 ? "entregas" : "aprovadas"); }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    {pending > 0 && <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{pending} para revisar</span>}
                  </div>
                  <ChevronLeft size={20} className="text-stone-300 rotate-180" />
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2 mb-2"><div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
                <div className="flex gap-4 text-xs text-stone-500">
                  <span>{progress}% concluído</span>
                  <span>{approvedCount} aprovada{approvedCount !== 1 ? "s" : ""}</span>
                  {inProgress > 0 && <span>{inProgress} em andamento</span>}
                  <span className="ml-auto text-stone-400">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============================
// PROJECT KANBAN VIEW (detalhe do projeto com tarefas por status)
// ============================
function KanbanCreateTask({ projectId, project, team, addTask }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", executor: "", deadline: "", priority: "Média", description: "" });
  const [kbFiles, setKbFiles] = useState([]);
  const [kbCheckItems, setKbCheckItems] = useState([]);
  const [kbNewCheck, setKbNewCheck] = useState("");
  const kbFileRef = useRef(null);
  const areaTeam = project.squad && project.squad.length > 0 ? team.filter(m => project.squad.includes(m.id)) : team.filter(m => m.area === project.area);

  const handleKbFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.map(function(f) {
      const sizeKB = f.size / 1024;
      const sizeStr = sizeKB > 1024 ? (sizeKB / 1024).toFixed(1) + " MB" : Math.round(sizeKB) + " KB";
      return { name: f.name, size: sizeStr, type: f.type || "arquivo", url: URL.createObjectURL(f) };
    });
    setKbFiles(function(prev) { return prev.concat(newFiles); });
    if (kbFileRef.current) kbFileRef.current.value = "";
  };

  const handleKbAddCheck = () => {
    if (kbNewCheck.trim()) { setKbCheckItems(prev => [...prev, kbNewCheck.trim()]); setKbNewCheck(""); }
  };

  const resetForm = () => {
    setForm({ title: "", executor: "", deadline: "", priority: "Média", description: "" });
    setKbFiles([]); setKbCheckItems([]); setKbNewCheck("");
  };

  const handleCreate = () => {
    if (!form.title.trim() || !form.executor) return;
    const exec = team.find(t => t.id === form.executor);
    const checklist = kbCheckItems.length > 0
      ? kbCheckItems.map(text => ({ text, done: false }))
      : [{ text: "Revisar briefing", done: false }, { text: "Executar entrega", done: false }];
    addTask({
      ...form,
      projectId,
      project: project.name,
      executorName: exec?.name || "",
      area: project.area,
      checklist,
      attachments: kbFiles,
    });
    resetForm();
    setOpen(false);
  };

  return (
    <div className="mt-8">
      <Card>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors rounded-xl">
          <span className="flex items-center gap-2 font-semibold text-stone-900"><Plus size={18} /> Criar nova tarefa neste projeto</span>
          {open ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
        </button>
        {open && (
          <div className="px-5 pb-5 space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2"><label className="text-sm font-medium text-stone-700">Nome da tarefa</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Criar roteiro detalhado..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
              <div><label className="text-sm font-medium text-stone-700">Responsável</label>
                <select value={form.executor} onChange={e => setForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="">Selecione</option>
                  {areaTeam.map(m => <option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium text-stone-700">Prazo</label><input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
              <div><label className="text-sm font-medium text-stone-700">Prioridade</label>
                <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option>Alta</option><option>Média</option><option>Baixa</option>
                </select>
              </div>
              <div className="col-span-2"><label className="text-sm font-medium text-stone-700">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Descreva o que precisa ser feito..." className="w-full border border-stone-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700">Checklist de execução <span className="text-stone-400 font-normal">(opcional)</span></label>
              <p className="text-xs text-stone-400 mt-0.5 mb-2">Defina os passos que o executor deve seguir. Se deixar vazio, será gerado um checklist padrão.</p>
              {kbCheckItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <div className="h-4 w-4 rounded border border-stone-300 flex-shrink-0" />
                  <span className="text-sm text-stone-700 flex-1">{item}</span>
                  <button type="button" onClick={() => setKbCheckItems(prev => prev.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <input value={kbNewCheck} onChange={e => setKbNewCheck(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleKbAddCheck(); } }} placeholder="Adicionar item..." className="flex-1 border border-stone-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <Button variant="outline" size="sm" onClick={handleKbAddCheck}>Adicionar</Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700">Insumos e referências <span className="text-stone-400 font-normal">(opcional)</span></label>
              <p className="text-xs text-stone-400 mt-0.5 mb-2">Anexe briefings, manuais ou referências úteis para o executor.</p>
              {kbFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-stone-50 border border-stone-100 rounded-lg mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-amber-600" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{f.name}</p>
                    <p className="text-xs text-stone-400">{f.type} · {f.size}</p>
                  </div>
                  <button type="button" onClick={() => setKbFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
              <input type="file" ref={kbFileRef} onChange={handleKbFileSelect} multiple style={{display: "none"}} />
              <button type="button" onClick={() => kbFileRef.current && kbFileRef.current.click()} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-stone-200 rounded-lg text-sm text-stone-400 hover:border-green-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
                <Plus size={16} /> Selecionar arquivos
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <Button onClick={handleCreate} className={!form.title.trim() || !form.executor ? "opacity-50 cursor-not-allowed" : ""}>Criar tarefa</Button>
              <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancelar</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================
// CHAT PANEL (slide-out, role-based)
// ============================
function ChatPanel({ isOpen, onClose, role, activeChannel: initialChannel }) {
  // role: "qa" | "lider" | executorId (e.g. "t1")
  const { chatMessages, chatLastRead, sendChatMsg, markChatRead, getChatUnread, team, projects, clients } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [showChannelList, setShowChannelList] = useState(!initialChannel);
  const chatEndRef = useRef(null);

  const isQA = role === "qa";
  const isLider = role === "lider";
  const isExecutor = !isQA && !isLider;
  const myRole = isQA ? "qa" : isLider ? "lider" : role;
  const myAuthor = isQA ? "QA" : isLider ? "Ana Gallotta" : (team.find(t => t.id === role)?.name || "Executor");

  const activeProjects = projects.filter(p => p.status === "em_execucao");

  // Build channel structure by role
  let directChannels = [];
  let projectChannels = [];

  if (isQA) {
    directChannels = [{ id: "qa-lider", label: "Ana Gallotta", subtitle: "Líder Eventos", avatar: "AG", color: "bg-pink-100 text-pink-700" }];
  } else if (isLider) {
    directChannels = [
      { id: "qa-lider", label: "QA", subtitle: "Gestão de qualidade", avatar: "QA", color: "bg-violet-100 text-violet-700" },
      ...team.map((t, i) => ({ id: "lider-" + t.id, label: t.name.split(" ").slice(0, 2).join(" "), subtitle: t.role, avatar: t.name.split(" ").map(n => n[0]).join("").substring(0, 2), color: ["bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-sky-100 text-sky-700", "bg-pink-100 text-pink-700"][i % 4] })),
    ];
    projectChannels = activeProjects.filter(p => p.squad && p.squad.length > 0).map(p => {
      const client = clients.find(c => c.id === p.clientId);
      const squadMembers = team.filter(t => p.squad.includes(t.id));
      return { id: "proj-" + p.id, label: p.name, subtitle: client ? client.name : "", avatar: p.name.substring(0, 2).toUpperCase(), color: "bg-amber-100 text-amber-700", members: squadMembers, projectId: p.id };
    });
  } else {
    // Executor: direct channel with líder + project channels they're part of
    directChannels = [{ id: "lider-" + role, label: "Ana Gallotta", subtitle: "Líder Eventos", avatar: "AG", color: "bg-pink-100 text-pink-700" }];
    projectChannels = activeProjects.filter(p => p.squad && p.squad.includes(role)).map(p => {
      const client = clients.find(c => c.id === p.clientId);
      const squadMembers = team.filter(t => p.squad.includes(t.id));
      return { id: "proj-" + p.id, label: p.name, subtitle: client ? client.name : "", avatar: p.name.substring(0, 2).toUpperCase(), color: "bg-amber-100 text-amber-700", members: squadMembers, projectId: p.id };
    });
  }

  const allChannels = [...directChannels, ...projectChannels];
  const [activeChannel, setActiveChannel] = useState(initialChannel || allChannels[0]?.id || "qa-lider");
  const activeInfo = allChannels.find(c => c.id === activeChannel) || allChannels[0];

  // Mark as read when panel opens or channel changes
  useEffect(() => {
    if (isOpen && activeChannel && !showChannelList) setTimeout(() => markChatRead(activeChannel, myRole), 100);
  }, [isOpen, activeChannel, showChannelList]);

  const selectChannel = (chId) => {
    setActiveChannel(chId);
    setShowChannelList(false);
    setTimeout(() => markChatRead(chId, myRole), 50);
  };

  const send = () => {
    if (!input.trim()) return;
    sendChatMsg(activeChannel, myRole, myAuthor, input.trim());
    setInput("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const msgs = chatMessages[activeChannel] || [];
  const grouped = [];
  let lastDate = "";
  msgs.forEach(m => {
    if (m.date !== lastDate) { grouped.push({ type: "date", date: m.date }); lastDate = m.date; }
    grouped.push({ type: "msg", ...m });
  });

  const totalUnread = allChannels.reduce((sum, c) => sum + getChatUnread(c.id, myRole), 0);

  // Channel list item renderer
  const ChannelRow = ({ ch, isProject }) => {
    const unread = getChatUnread(ch.id, myRole);
    const lastMsg = (chatMessages[ch.id] || []).slice(-1)[0];
    return (
      <button onClick={() => selectChannel(ch.id)} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors text-left ${activeChannel === ch.id && !showChannelList ? "bg-stone-50" : ""}`}>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${ch.color}`}>{ch.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-900 truncate">{ch.label}</span>
            {lastMsg && <span className="text-[10px] text-stone-400 flex-shrink-0 ml-2">{lastMsg.time}</span>}
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-stone-400 truncate">{lastMsg ? `${lastMsg.author}: ${lastMsg.text}` : ch.subtitle}</span>
            {unread > 0 && <span className="flex-shrink-0 ml-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5">{unread}</span>}
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[440px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Channel list view */}
        {showChannelList ? (
          <>
            <div className="border-b border-stone-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold text-stone-900">Mensagens</h3>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X size={18} className="text-stone-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Direct messages section */}
              <div className="px-4 pt-4 pb-1"><p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Direto</p></div>
              <div className="divide-y divide-gray-100">
                {directChannels.map(ch => <ChannelRow key={ch.id} ch={ch} />)}
              </div>

              {/* Project channels section */}
              {projectChannels.length > 0 && (
                <>
                  <div className="px-4 pt-5 pb-1"><p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Projetos</p></div>
                  <div className="divide-y divide-gray-100">
                    {projectChannels.map(ch => <ChannelRow key={ch.id} ch={ch} isProject />)}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Conversation header */}
            <div className="border-b border-stone-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              {allChannels.length > 1 && (
                <button onClick={() => setShowChannelList(true)} className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors -ml-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
              )}
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${activeInfo?.color || "bg-stone-100 text-stone-700"}`}>
                {activeInfo?.avatar || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-900 text-sm truncate">{activeInfo?.label || "Chat"}</h3>
                <p className="text-xs text-stone-400 truncate">{activeInfo?.members ? activeInfo.members.map(m => m.name.split(" ")[0]).join(", ") : activeInfo?.subtitle || ""}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X size={18} className="text-stone-400" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {msgs.length === 0 && (
                <div className="text-center py-12">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 ${activeInfo?.color || "bg-stone-100"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <p className="text-sm text-stone-500 font-medium">Conversa com {activeInfo?.label}</p>
                  <p className="text-xs text-stone-400 mt-1">Envie a primeira mensagem.</p>
                </div>
              )}
              {grouped.map((item, i) => {
                if (item.type === "date") {
                  return <div key={"d" + i} className="flex items-center gap-3 py-3"><div className="flex-1 h-px bg-stone-200" /><span className="text-[10px] text-stone-400 font-medium uppercase">{item.date === new Date().toISOString().split("T")[0] ? "Hoje" : item.date}</span><div className="flex-1 h-px bg-stone-200" /></div>;
                }
                const isMe = item.from === myRole;
                return (
                  <div key={item.id} className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}>
                    <div className={`max-w-[80%] ${isMe ? "" : "flex gap-2"}`}>
                      {!isMe && (
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-1 ${activeInfo?.color || "bg-stone-100 text-stone-600"}`}>
                          {item.author.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${isMe ? "bg-pink-500 text-white rounded-br-md" : "bg-stone-100 text-stone-800 rounded-bl-md"}`}>
                          <p>{item.text}</p>
                        </div>
                        <p className={`text-[10px] mt-0.5 px-1 ${isMe ? "text-right text-stone-400" : "text-stone-400"}`}>{item.author} · {item.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-stone-200 p-4 flex-shrink-0">
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder={`Mensagem para ${activeInfo?.label || ""}...`} className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
                <button onClick={send} disabled={!input.trim()} className={`p-2.5 rounded-xl transition-colors ${input.trim() ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-stone-100 text-stone-400 cursor-not-allowed"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ProjectKanbanView({ projectId, onBack, onTaskClick, isClientView = false, isQAView = false, onOpenChat }) {
  const { projects, tasks, clients, team, addTask, deleteTask, addQaAlert, updateProject, chatMessages, chatLastRead, getChatUnread } = useContext(AppContext);
  const project = projects.find(p => p.id === projectId);
  if (!project) return <div className="text-center py-12 text-stone-400">Projeto não encontrado.</div>;

  const client = clients.find(c => c.id === project.clientId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);
  const doneCount = projectTasks.filter(t => t.status === "concluida").length;
  const progress = projectTasks.length > 0 ? Math.round((doneCount / projectTasks.length) * 100) : project.progress;

  // QA bell alert state
  const [qaBellTask, setQaBellTask] = useState(null);
  const [qaBellMsg, setQaBellMsg] = useState("");
  const [qaBellSent, setQaBellSent] = useState(new Set());

  const sendQaBell = (task) => {
    const baseMsg = `QA está te alertando: "${task.title}" (${project.name}).`;
    const fullMsg = qaBellMsg.trim() ? `${baseMsg} — "${qaBellMsg.trim()}"` : baseMsg;
    addQaAlert(task.id, task.executor, fullMsg);
    setQaBellSent(prev => new Set([...prev, task.id]));
    setQaBellTask(null);
    setQaBellMsg("");
  };

  const columns = [
    { key: "a_fazer", label: "A Fazer", headerColor: "bg-stone-100 text-stone-700", dotColor: "bg-stone-400" },
    { key: "em_execucao", label: "Em Execução", headerColor: "bg-amber-100 text-amber-800", dotColor: "bg-amber-500" },
    { key: "em_qa", label: "Em QA", headerColor: "bg-violet-100 text-violet-800", dotColor: "bg-violet-500" },
    { key: "devolvida", label: "Devolvida", headerColor: "bg-pink-100 text-pink-800", dotColor: "bg-pink-500" },
    { key: "concluida", label: "Concluída", headerColor: "bg-emerald-100 text-emerald-800", dotColor: "bg-emerald-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-6"><ArrowLeft size={16} /> Voltar</button>

      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
            <h1 className="text-xl md:text-3xl font-bold text-stone-900">{project.name}</h1>
            <Badge variant="purple">Evento</Badge>
            {isQAView && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-medium">Visão QA</span>}
          </div>
          <p className="text-sm md:text-base text-stone-500">Cliente: <strong>{project.client}</strong> · Prazo: <strong>{new Date(project.deadline).toLocaleDateString("pt-BR")}</strong></p>
        </div>
        <div className="flex items-center gap-2">
          {(isQAView || !isClientView) && onOpenChat && (() => {
            const r = isQAView ? "qa" : "lider";
            const unread = getChatUnread("qa-lider", r);
            return (
              <button onClick={onOpenChat} className="px-3 py-2 text-sm font-medium rounded-lg border border-stone-200 text-stone-600 hover:border-amber-300 hover:bg-sky-50 transition-all flex items-center gap-2 relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {isQAView ? "Chat com Líder" : "Mensagens"}
                {unread > 0 && <span className="bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold animate-pulse">{unread}</span>}
              </button>
            );
          })()}
          <Badge variant={project.priority === "Alta" ? "danger" : project.priority === "Média" ? "warning" : "success"}>{project.priority}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-stone-500">Total de tarefas</p>
          <p className="text-2xl font-bold">{projectTasks.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-stone-500">Concluídas</p>
          <p className="text-2xl font-bold text-emerald-600">{doneCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-stone-500">Progresso</p>
          <p className="text-2xl font-bold">{progress}%</p>
          <div className="w-full bg-stone-200 rounded-full h-2 mt-2"><div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-stone-500">Em risco</p>
          <p className="text-2xl font-bold text-red-600">{projectTasks.filter(t => !["concluida"].includes(t.status) && new Date(t.deadline) < new Date(Date.now() + 86400000)).length}</p>
        </Card>
      </div>

      {!isClientView && !isQAView && <h2 className="text-xl font-bold mb-4">Quadro de tarefas</h2>}
      {isClientView && <h2 className="text-xl font-bold mb-4">Acompanhamento das entregas</h2>}
      {isQAView && <h2 className="text-xl font-bold mb-4">Acompanhamento do projeto</h2>}

      <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:pb-0" style={{ minHeight: "400px" }}>
        {columns.map(col => {
          const colTasks = projectTasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="min-w-[260px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink bg-stone-50 rounded-xl p-3 border border-stone-100">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${col.headerColor}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                <span className="text-sm font-semibold">{col.label}</span>
                <span className="ml-auto text-xs font-bold bg-white bg-opacity-60 rounded-full px-2 py-0.5">{colTasks.length}</span>
              </div>
              <div className="space-y-2">
                {colTasks.map(task => (
                  <Card key={task.id} className="p-3 group relative" onClick={!isClientView && onTaskClick ? () => onTaskClick(task.id) : undefined}>
                    {/* Líder: trash icon */}
                    {!isClientView && !isQAView && (
                      <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir tarefa "${task.title}"?`)) deleteTask(task.id); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50" title="Excluir tarefa">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 hover:text-red-500"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    )}
                    {/* QA: bell icon */}
                    {isQAView && task.status !== "concluida" && (
                      <button onClick={(e) => { e.stopPropagation(); if (qaBellSent.has(task.id)) return; setQaBellTask(qaBellTask === task.id ? null : task.id); }} className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all p-1 rounded ${qaBellSent.has(task.id) ? "opacity-100 text-yellow-500" : "hover:bg-yellow-50 text-stone-300 hover:text-yellow-500"}`} title={qaBellSent.has(task.id) ? "Alerta enviado" : "Alertar executor"}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={qaBellSent.has(task.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                      </button>
                    )}
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-orange-500" : "bg-emerald-500"}`} />
                      <p className="text-sm font-medium leading-tight">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 flex items-center gap-1"><Users size={10} /> {task.executorName}</span>
                      <span className="text-xs text-stone-400"><Clock size={10} className="inline" /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                    </div>
                    {task.feedbackOrigin && <Badge variant="accent" className="mt-2 text-[10px]">Feedback</Badge>}
                    {/* QA bell inline input */}
                    {isQAView && qaBellTask === task.id && (
                      <div className="mt-2 pt-2 border-t border-stone-100" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-1.5">
                          <input value={qaBellMsg} onChange={e => setQaBellMsg(e.target.value)} placeholder="Msg (opcional)" className="flex-1 border border-stone-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400" onKeyDown={e => { if (e.key === "Enter") sendQaBell(task); }} />
                          <button onClick={() => sendQaBell(task)} className="px-2 py-1 text-xs font-medium rounded bg-yellow-500 text-white hover:bg-yellow-600">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
                {colTasks.length === 0 && <p className="text-xs text-stone-300 text-center py-4">Nenhuma</p>}
              </div>
            </div>
          );
        })}
      </div>

      {!isClientView && !isQAView && (
        <KanbanCreateTask projectId={projectId} project={project} team={team} addTask={addTask} />
      )}

      {!isClientView && !isQAView && (() => {
        const squad = project.squad || [];
        const squadMembers = team.filter(t => squad.includes(t.id));
        const availableMembers = team.filter(t => !squad.includes(t.id));

        const toggleSquadMember = (memberId) => {
          const newSquad = squad.includes(memberId) ? squad.filter(id => id !== memberId) : [...squad, memberId];
          updateProject(projectId, { squad: newSquad });
        };

        return (
          <>
            <div className="flex items-center justify-between mt-8 mb-4">
              <h2 className="text-xl font-bold">Squad do projeto</h2>
              <span className="text-sm text-stone-500">{squadMembers.length} de {team.length} executores</span>
            </div>

            {/* Squad members */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {squadMembers.map(member => {
                const memberTasks = projectTasks.filter(t => t.executor === member.id);
                const done = memberTasks.filter(t => t.status === "concluida").length;
                return (
                  <Card key={member.id} className="p-4 relative group border-2 border-emerald-200 bg-emerald-50/30">
                    <button onClick={() => { if (confirm(`Remover ${member.name} do squad?`)) toggleSquadMember(member.id); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50" title="Remover do squad">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 hover:text-red-500"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                    </button>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">{member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-[10px] text-stone-500">{member.role}</p>
                      </div>
                    </div>
                    {memberTasks.length > 0 ? (
                      <>
                        <p className="text-xs text-stone-500">{memberTasks.length} tarefa{memberTasks.length !== 1 ? "s" : ""} · {done} concluída{done !== 1 ? "s" : ""}</p>
                        <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${memberTasks.length > 0 ? Math.round((done / memberTasks.length) * 100) : 0}%` }} /></div>
                      </>
                    ) : (
                      <p className="text-xs text-stone-400 italic">Sem tarefas ainda</p>
                    )}
                  </Card>
                );
              })}

              {/* Add member button */}
              {availableMembers.length > 0 && (
                <div className="relative">
                  <Card className="p-4 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-all min-h-[120px]" onClick={() => {
                    const el = document.getElementById("squad-dropdown-" + projectId);
                    if (el) el.classList.toggle("hidden");
                  }}>
                    <Plus size={20} className="text-stone-400 mb-1" />
                    <p className="text-xs text-stone-500 font-medium">Adicionar</p>
                  </Card>
                  <div id={"squad-dropdown-" + projectId} className="hidden absolute top-full left-0 mt-1 w-56 bg-white border border-stone-200 rounded-xl shadow-lg z-20 py-1">
                    <p className="px-3 py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wide">Executores disponíveis</p>
                    {availableMembers.map(m => (
                      <button key={m.id} onClick={() => { toggleSquadMember(m.id); const el = document.getElementById("squad-dropdown-" + projectId); if (el) el.classList.add("hidden"); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-stone-50 transition-colors text-left">
                        <div className="h-7 w-7 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-600">{m.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</div>
                        <div>
                          <p className="text-sm font-medium">{m.name}</p>
                          <p className="text-[10px] text-stone-400">{m.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {squadMembers.length === 0 && (
              <Card className="p-6 text-center border-dashed border-2 border-stone-200 mb-4">
                <Users size={24} className="text-stone-300 mx-auto mb-2" />
                <p className="text-sm text-stone-500 font-medium">Nenhum executor no squad</p>
                <p className="text-xs text-stone-400 mt-1">Adicione membros do time para começar a atribuir tarefas.</p>
              </Card>
            )}
          </>
        );
      })()}
    </div>
  );
}

// ============================
// TROCAR EXECUTOR
// ============================
function TrocarExecutorView({ currentId, onSelect, onBack }) {
  const { team, tasks } = useContext(AppContext);
  const executors = team.filter(m => m.role === "Executor");
  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
      <h1 className="text-3xl font-bold mb-2">Trocar executor</h1>
      <p className="text-stone-500 mb-6">Selecione qual executor você quer simular para ver suas tarefas.</p>
      <div className="space-y-3">
        {executors.map(e => {
          const taskCount = tasks.filter(t => t.executor === e.id && t.status !== "concluida").length;
          return (
            <Card key={e.id} className={`p-5 cursor-pointer ${e.id === currentId ? "ring-2 ring-gray-900" : ""}`} onClick={() => onSelect(e.id, e.name)}>
              <div className="flex justify-between items-center">
                <div><p className="font-bold">{e.name}</p><p className="text-sm text-stone-500">{e.role} · Eventos</p></div>
                <div className="text-right"><p className="text-sm font-medium">{taskCount} tarefas ativas</p><Badge variant={taskCount === 0 ? "success" : taskCount <= 3 ? "warning" : "danger"}>{taskCount === 0 ? "Disponível" : taskCount <= 3 ? "Moderado" : "Sobrecarregado"}</Badge></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============================
// ONBOARDING MODAL
// ============================
const onboardingData = {
  executor: {
    title: "Portal do Executor",
    slides: [
      { icon: "clipboard", title: "Suas tarefas", desc: "Aqui você encontra todas as tarefas atribuídas a você pelo líder. Elas são organizadas por mês e mostram prioridade (bolinha colorida), projeto e prazo." },
      { icon: "filter", title: "Filtros inteligentes", desc: "Use os filtros de tempo (Hoje, 2 semanas, Todos) e de status (A Fazer, Em execução, Devolvida) para focar no que importa agora. O Kanban é outra forma visual de ver seu progresso." },
      { icon: "check", title: "Checklist e entrega", desc: "Ao abrir uma tarefa, complete cada item do checklist. Quando tudo estiver marcado, anexe o link da entrega ou arquivos e clique em 'Enviar ao QA' para revisão." },
      { icon: "refresh", title: "Tarefa devolvida", desc: "Se o QA encontrar algo para ajustar, a tarefa volta como 'Devolvida' com o comentário do que precisa ser corrigido. Corrija e reenvie." },
      { icon: "clock", title: "Aguardando QA", desc: "Tarefas enviadas ao QA ficam na seção 'Aguardando QA' — separadas das suas tarefas ativas. Você pode cancelar o envio se precisar fazer ajustes." },
      { icon: "bell", title: "Alertas e notificações", desc: "O sininho no topo mostra alertas importantes: tarefas em risco de atraso, cobranças do QA e feedbacks de clientes. Clique em qualquer alerta para ir direto à tarefa." },
      { icon: "chat", title: "Chat", desc: "Use o botão de chat (canto inferior direito) para falar diretamente com a líder ou nos canais dos projetos em que você faz parte do squad." },
      { icon: "archive", title: "Histórico", desc: "Tarefas concluídas e validadas pelo QA vão para o 'Histórico' no final da página — colapsável para manter tudo limpo." },
    ],
  },
  qa: {
    title: "Portal QA",
    slides: [
      { icon: "shield", title: "Seu papel no fluxo", desc: "O Portal QA é o centro de controle de qualidade da agência. Você é o filtro final antes do cliente ver qualquer entrega. Aqui você revisa, aprova, devolve e acompanha tudo que está sendo produzido." },
      { icon: "inbox", title: "Entregas para revisar", desc: "Na aba 'Entregas', veja todas as tarefas enviadas pelos executores aguardando sua revisão. Abra cada entrega, confira o link/arquivo anexado e decida: aprovar (tarefa concluída) ou devolver com comentário explicando o ajuste." },
      { icon: "check", title: "Aprovar ou devolver", desc: "Ao aprovar, a tarefa muda para 'Concluída' e o executor é notificado. Ao devolver, escreva um comentário claro do que precisa ser ajustado — a tarefa volta como 'Devolvida' no portal do executor com seu feedback." },
      { icon: "folder", title: "Projetos e Kanban", desc: "Na aba 'Projetos', veja todos os projetos ativos. Clique em qualquer um para abrir o Kanban completo com as tarefas organizadas por coluna (A Fazer, Em Execução, Em QA, Concluída). Acompanhe o progresso de perto." },
      { icon: "bell", title: "Alertas ao executor", desc: "No Kanban do projeto, cada tarefa tem um ícone de sininho. Clique para enviar um alerta direto ao executor responsável — útil para cobrar prazos, sinalizar urgências ou pedir atualizações sobre tarefas em risco." },
      { icon: "plus", title: "Criar projetos", desc: "Você também pode criar novos projetos direto do portal QA. Defina nome, cliente, squad de executores e comece a organizar as entregas antes mesmo do líder atribuir tarefas." },
      { icon: "book", title: "Base de conhecimento", desc: "Registre aprendizados, padrões de erro e boas práticas encontrados durante as revisões. Essa base fica salva, pesquisável e ajuda o time a não repetir os mesmos erros — quanto mais usa, mais inteligente o time fica." },
      { icon: "chat", title: "Chat com o Líder", desc: "Use o botão de chat (canto inferior direito) para falar diretamente com o líder. Alinhe prioridades, tire dúvidas sobre briefings e passe orientações de forma rápida e organizada." },
    ],
  },
  lider: {
    title: "Portal Líder",
    slides: [
      { icon: "layout", title: "Seu painel de controle", desc: "O Portal Líder é o centro de comando da operação. Daqui você gerencia projetos, cria tarefas, acompanha entregas, recebe feedbacks de clientes e monitora a carga do time — tudo em uma única tela." },
      { icon: "folder", title: "Projetos ativos", desc: "Na seção de projetos, veja todos os projetos da agência com cliente, status e squad. Clique em qualquer projeto para abrir o Kanban completo com todas as tarefas organizadas por status." },
      { icon: "users", title: "Squad do projeto", desc: "Cada projeto tem um squad definido. Ao editar um projeto, monte o time de executores. Só membros do squad podem receber tarefas daquele projeto — isso evita atribuições erradas e mantém a operação organizada." },
      { icon: "plus", title: "Criar tarefas", desc: "Crie tarefas preenchendo projeto, executor (filtrado pelo squad), prazo, prioridade, descrição detalhada e checklist. Quanto mais completo o briefing, menos retrabalho. O executor só vê as opções do squad do projeto selecionado." },
      { icon: "message", title: "Feedbacks de clientes", desc: "Quando o cliente dá feedback sobre uma entrega, o card aparece no seu painel. Ao atribuir, a tarefa original é reaberta como 'Devolvida' com o feedback do cliente + suas instruções — sem criar duplicatas." },
      { icon: "bar", title: "Carga do time", desc: "O indicador de carga mostra quantas tarefas cada executor tem: verde (Disponível), amarelo (Moderado) ou vermelho (Sobrecarregado). Use isso para distribuir trabalho de forma equilibrada." },
      { icon: "bell", title: "Alertas inteligentes", desc: "O sininho mostra alertas sobre tarefas em risco de atraso, feedbacks pendentes e notificações do QA. Cada alerta é clicável e leva direto ao item que precisa de atenção." },
      { icon: "chat", title: "Chat organizado", desc: "Seu chat tem duas seções: 'Direto' para falar com QA e cada executor individualmente, e 'Projetos' para canais de grupo com todo o squad. Quando um executor entra no squad, já aparece no chat." },
    ],
  },
  clienthub: {
    title: "Histórico de Clientes",
    slides: [
      { icon: "book", title: "A memória da agência", desc: "O Histórico de Clientes é a base de conhecimento da agência. Aqui ficam registrados todos os projetos, feedbacks, aprendizados e anotações de cada cliente — tudo organizado para que nenhuma informação se perca." },
      { icon: "users", title: "Visão por cliente", desc: "Cada cliente tem um card com status (Ativo/Inativo), badge de relacionamento e um resumo: quantos projetos, quantos registros. Clique no card para expandir e ver tudo sobre aquele cliente." },
      { icon: "folder", title: "Aba Projetos", desc: "Dentro de cada cliente, a aba 'Projetos' mostra todos os projetos ativos e concluídos. Veja nome, status, squad responsável e acompanhe o histórico completo de entregas ao longo do tempo." },
      { icon: "message", title: "Aba Feedbacks", desc: "A aba 'Feedbacks' reúne todos os feedbacks que o cliente deu sobre entregas — aprovações, revisões e elogios. É o termômetro de satisfação: aqui você entende o que o cliente valoriza e o que precisa de atenção." },
      { icon: "book", title: "Aba Aprendizados", desc: "Aprendizados registrados pelo QA durante as revisões ficam aqui, filtráveis por tag. Erros comuns, boas práticas e padrões de qualidade — tudo pesquisável para o time consultar antes de novas entregas." },
      { icon: "clipboard", title: "Aba Anotações", desc: "Registre observações internas sobre o cliente: o que ele gostou, o que não gostou, preferências de comunicação e restrições. Use tags como 'Gostou', 'Não gostou' e 'Preferência' para organizar." },
      { icon: "bar", title: "Métricas no topo", desc: "Os 4 cards no topo mostram: total de clientes, clientes ativos, projetos ativos e projetos concluídos. Uma visão rápida do tamanho e saúde da operação da agência." },
      { icon: "star", title: "Construindo inteligência", desc: "Quanto mais o time registra aqui, mais inteligente a agência fica. Antes de começar um novo projeto com um cliente, consulte o histórico — evite repetir erros e replique o que funcionou." },
    ],
  },
  cliente: {
    title: "Portal do Cliente",
    slides: [
      { icon: "eye", title: "Seu espaço de acompanhamento", desc: "O Portal do Cliente é onde você acompanha todas as entregas dos seus projetos em tempo real. Aqui você vê o que está sendo produzido, o que já foi entregue e pode dar feedback direto — sem precisar de e-mail ou WhatsApp." },
      { icon: "folder", title: "Seus projetos", desc: "Na tela inicial, você vê todos os projetos da sua empresa. Clique em qualquer projeto para abrir o painel de entregas com tudo que está em andamento e o que já foi concluído." },
      { icon: "inbox", title: "Entregas concluídas", desc: "As entregas que passaram por controle de qualidade aparecem na lista do projeto. Cada entrega mostra o nome da tarefa, a descrição do que foi feito e o link/arquivo para você visualizar o resultado." },
      { icon: "check", title: "Aprovar entregas", desc: "Quando estiver satisfeito com uma entrega, clique em 'Aprovar'. A entrega é marcada como aprovada pelo cliente e a equipe é notificada de que aquele item está finalizado." },
      { icon: "message", title: "Dar feedback", desc: "Se algo precisa de ajuste, use o botão de feedback para descrever o que precisa mudar. Seu comentário vai direto para o líder do projeto, que reabre a tarefa com suas instruções — sem perder o histórico." },
      { icon: "star", title: "Elogiar o trabalho", desc: "Gostou muito de uma entrega? Use o feedback do tipo 'Elogio' para reconhecer o trabalho da equipe. Elogios são visíveis para o time e ajudam a manter a motivação alta." },
      { icon: "shield", title: "Transparência total", desc: "Você não precisa cobrar atualizações. O portal mostra o status real de cada projeto — quantas tarefas estão em produção, em revisão e concluídas. Tudo atualizado automaticamente." },
      { icon: "bell", title: "Notificações", desc: "Quando uma nova entrega fica pronta para sua revisão, você recebe uma notificação. O sininho no topo mostra quantos itens precisam da sua atenção." },
    ],
  },
};

function OnboardingModal({ portal, onClose }) {
  const [step, setStep] = useState(0);
  const data = onboardingData[portal];
  if (!data) return null;
  const slide = data.slides[step];
  const total = data.slides.length;

  const iconMap = {
    clipboard: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
    filter: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    check: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    refresh: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    clock: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    bell: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    chat: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    archive: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    shield: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    inbox: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    folder: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
    book: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
    layout: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    users: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    plus: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    message: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    bar: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    eye: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    star: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
          {/* Progress bar */}
          <div className="h-1 bg-stone-100">
            <div className="h-1 bg-emerald-500 transition-all duration-300 rounded-r" style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">{data.title} · Passo {step + 1} de {total}</p>
            <button onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg transition-colors"><X size={16} className="text-stone-400" /></button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 text-center">
            <div className="h-16 w-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-5 text-stone-700">
              {iconMap[slide.icon] || iconMap.clipboard}
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">{slide.title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">{slide.desc}</p>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${step === 0 ? "text-stone-300 cursor-not-allowed" : "text-stone-600 hover:bg-stone-100"}`}>
              Anterior
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {data.slides.map((_, i) => (
                <button key={i} onClick={() => setStep(i)} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-stone-900" : "w-2 bg-stone-200 hover:bg-stone-400"}`} />
              ))}
            </div>

            {step < total - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="px-4 py-2 text-sm font-medium rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors">
                Próximo
              </button>
            ) : (
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors">
                Entendi!
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================
// NOTIFICAÇÕES
// ============================
function NotificationPanel({ onClose, context, executorId, onTaskClick }) {
  const { notifications, setNotifications, dismissNotification, dismissSmartAlert, getSmartAlerts } = useContext(AppContext);
  const [showHistory, setShowHistory] = useState(false);

  const targetFilter = context === "executor" ? "executor:" + executorId
    : context === "qa" ? "qa"
    : context === "lider" ? "lider"
    : context === "client" ? "client"
    : null;

  const historyNotifications = targetFilter
    ? notifications.filter(n => n.target === targetFilter)
    : [...notifications];

  const smartAlerts = context === "executor" ? getSmartAlerts(executorId) : [];

  const markAllRead = () => {
    // Dismiss all smart alerts
    smartAlerts.forEach(a => dismissSmartAlert(a.id, a.text, targetFilter, a.priority));
  };

  const priorityStyle = (p) => p === "danger" ? "bg-red-50 border-l-4 border-l-red-500"
    : p === "warning" ? "bg-orange-50 border-l-4 border-l-orange-400"
    : "bg-sky-50";
  const accentColor = (p) => p === "danger" ? "text-red-600" : p === "warning" ? "text-orange-600" : "text-sky-600";

  const hasContent = smartAlerts.length > 0 || historyNotifications.length > 0;

  return (
    <div className="fixed top-14 md:top-16 right-0 md:right-6 w-full md:w-[420px] bg-white rounded-none md:rounded-xl shadow-xl border z-50 max-h-[85vh] md:max-h-[480px] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-bold">Notificações</h3>
        <div className="flex gap-2">
          {smartAlerts.length > 0 && <button onClick={markAllRead} className="text-xs text-stone-500 hover:text-stone-700">Resolver todas</button>}
          <button onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      {smartAlerts.length > 0 && (
        <div className="border-b">
          <p className="px-4 pt-3 pb-1 text-xs font-semibold text-stone-500 uppercase tracking-wide">Alertas</p>
          {smartAlerts.map(a => (
            <div key={a.id} className={`px-4 py-3 text-sm ${priorityStyle(a.priority)} ${a.taskId && onTaskClick ? "cursor-pointer hover:brightness-95 transition-all" : ""}`} onClick={() => { if (a.taskId && onTaskClick) { onTaskClick(a.taskId); onClose(); } }}>
              <div className="flex items-start gap-2">
                {a.priority === "danger" && <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                {a.priority === "warning" && <Clock size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />}
                <p className={`flex-1 text-stone-900 ${a.taskId && onTaskClick ? "cursor-pointer" : ""}`}>
                  {(() => {
                    const match = a.text.match(/^([^:]+):\s*(.+?)(\s*[—–-]\s*.+)?$/);
                    if (match) {
                      return <><span className={`font-semibold ${accentColor(a.priority)}`}>{match[1]}:</span> {match[2]}{match[3] && <span className={`${accentColor(a.priority)} font-medium`}>{match[3]}</span>}</>;
                    }
                    return a.text;
                  })()}
                </p>
                <button onClick={(e) => { e.stopPropagation(); dismissSmartAlert(a.id, a.text, targetFilter, a.priority); }} className="text-stone-400 hover:text-emerald-600 flex-shrink-0 mt-0.5" title="Resolver alerta"><CheckCircle2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {historyNotifications.length > 0 && (
        <div>
          <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between px-4 py-3 text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            <span className="font-medium">Histórico ({historyNotifications.length})</span>
            {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showHistory && historyNotifications.map(n => (
            <div key={n.id} className="px-4 py-2.5 border-t text-sm flex items-start gap-3 text-stone-400">
              <div className="flex-1">
                <p>{n.text}</p>
                <p className="text-xs text-stone-300 mt-0.5">{n.date}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} className="text-stone-300 hover:text-red-400 flex-shrink-0 mt-0.5" title="Remover"><X size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {!hasContent && <p className="p-6 text-sm text-stone-400 text-center">Nenhuma notificação no momento.</p>}
    </div>
  );
}

// ============================
// APP PRINCIPAL
// ============================
function App() {
  const [view, setView] = useState("executor");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectOrigin, setProjectOrigin] = useState(null); // "qa" | "lider" | null
  const [executorId, setExecutorId] = useState("t1");
  const [executorName, setExecutorName] = useState("Melissa Zambon");
  const [qaArea, setQaArea] = useState(null);
  const [liderArea, setLiderArea] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [clientPortalId, setClientPortalId] = useState("c5");
  const [viewHistory, setViewHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const pushHistory = () => {
    setViewHistory(prev => [...prev.slice(-19), { view, selectedTask, selectedProject, qaArea, liderArea, clientPortalId }]);
  };

  const handleSetView = (v) => {
    pushHistory();
    setView(v);
    setSelectedTask(null);
    setSelectedProject(null);
    setShowNotif(false);
  };

  const goBack = () => {
    setShowNotif(false);
    setViewHistory(prev => {
      if (prev.length === 0) {
        setView("executor");
        setSelectedTask(null);
        setSelectedProject(null);
        return [];
      }
      const newHistory = [...prev];
      const last = newHistory.pop();
      setView(last.view);
      setSelectedTask(last.selectedTask || null);
      setSelectedProject(last.selectedProject || null);
      if (last.qaArea !== undefined) setQaArea(last.qaArea);
      if (last.liderArea !== undefined) setLiderArea(last.liderArea);
      if (last.clientPortalId !== undefined) setClientPortalId(last.clientPortalId);
      return newHistory;
    });
  };

  const handleProjectClick = (projectId, origin) => {
    pushHistory();
    setSelectedProject(projectId);
    setProjectOrigin(origin || null);
    setView("project_detail");
  };

  return (
    <AppProvider>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <DarkModeStyles />
        <div className={`min-h-screen ${darkMode ? "dark bg-stone-950 text-stone-100" : "bg-stone-50 text-stone-900"}`}>
          <div className="h-1 bg-red-400 w-full" />
          <AppInner
            view={view} setView={handleSetView} goBack={goBack}
            selectedTask={selectedTask} setSelectedTask={setSelectedTask}
            selectedProject={selectedProject} setSelectedProject={setSelectedProject}
            projectOrigin={projectOrigin}
            executorId={executorId} executorName={executorName}
            setExecutorId={setExecutorId} setExecutorName={setExecutorName}
            qaArea={qaArea} setQaArea={setQaArea}
            liderArea={liderArea} setLiderArea={setLiderArea}
            showNotif={showNotif} setShowNotif={setShowNotif}
            clientPortalId={clientPortalId} setClientPortalId={setClientPortalId}
            onProjectClick={handleProjectClick}
            pushHistory={pushHistory}
          />
        </div>
      </DarkModeContext.Provider>
    </AppProvider>
  );
}

function AppInner({ view, setView, goBack, selectedTask, setSelectedTask, selectedProject, setSelectedProject, projectOrigin, executorId, executorName, setExecutorId, setExecutorName, qaArea, setQaArea, liderArea, setLiderArea, showNotif, setShowNotif, clientPortalId, setClientPortalId, onProjectClick, pushHistory }) {
  const { notifications, getSmartAlerts, getChatUnread, projects, team } = useContext(AppContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [showChat, setShowChat] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null); // "executor" | "qa" | "lider" | null

  const isClientPortal = view === "experiencia_cliente";
  const isClientSelector = view === "client_selector";
  const isClientHub = view === "clientes";
  const isProjectDetail = view === "project_detail";
  const isQA = view.startsWith("qa") || projectOrigin === "qa";
  const isLider = view.startsWith("lider") || (projectOrigin === "lider");
  const isExecutorView = view === "executor" || view === "trocar_executor";
  const chatRole = isQA ? "qa" : isLider ? "lider" : executorId;
  // Count unread per role
  const activeProjs = projects.filter(p => p.status === "em_execucao" && p.squad && p.squad.length > 0);
  const chatUnread = isQA ? getChatUnread("qa-lider", "qa") : isLider ? (getChatUnread("qa-lider", "lider") + team.reduce((s, t) => s + getChatUnread("lider-" + t.id, "lider"), 0) + activeProjs.reduce((s, p) => s + getChatUnread("proj-" + p.id, "lider"), 0)) : executorId ? (getChatUnread("lider-" + executorId, executorId) + activeProjs.filter(p => p.squad.includes(executorId)).reduce((s, p) => s + getChatUnread("proj-" + p.id, executorId), 0)) : 0;

  // Determine current notification context
  const notifContext = view.startsWith("qa") ? "qa" : view.startsWith("lider") ? "lider" : isClientPortal ? "client" : "executor";
  const notifTarget = notifContext === "executor" ? "executor:" + executorId : notifContext;

  // Count: targeted notifications + smart alerts for executor

  const smartAlerts = notifContext === "executor" ? getSmartAlerts(executorId) : [];
  const unreadCount = smartAlerts.length;

  // Task click with history
  const handleTaskClick = (taskId) => {
    pushHistory();
    setSelectedTask(taskId);
  };

  const notifPanel = showNotif && <NotificationPanel onClose={() => setShowNotif(false)} context={notifContext} executorId={executorId} onTaskClick={handleTaskClick} />;
  const chatPanel = <ChatPanel isOpen={showChat} onClose={() => setShowChat(false)} role={chatRole} />;
  const currentPortal = isQA ? "qa" : isLider ? "lider" : isExecutorView ? "executor" : isClientHub ? "clienthub" : (isClientPortal || isClientSelector) ? "cliente" : null;
  const helpButton = currentPortal ? () => setShowOnboarding(currentPortal) : undefined;
  const onboardingModal = showOnboarding && <OnboardingModal portal={showOnboarding} onClose={() => setShowOnboarding(null)} />;

  if (isProjectDetail && selectedProject) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} onHelp={helpButton} darkMode={darkMode} setDarkMode={setDarkMode} />
        {notifPanel}
        {onboardingModal}
        {chatPanel}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <ProjectKanbanView projectId={selectedProject} onBack={goBack} onTaskClick={handleTaskClick} isQAView={projectOrigin === "qa"} onOpenChat={() => setShowChat(true)} />
        </div>
      </>
    );
  }

  if (isClientSelector) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} onHelp={helpButton} showBell={false} darkMode={darkMode} setDarkMode={setDarkMode} />
        {onboardingModal}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <ClientSelectorView onSelect={(cid) => { pushHistory(); setClientPortalId(cid); setView("experiencia_cliente"); }} onBack={goBack} />
        </div>
      </>
    );
  }

  if (isClientPortal) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} onHelp={helpButton} showBell={false} darkMode={darkMode} setDarkMode={setDarkMode} />
        {onboardingModal}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <ClientPortalView clientId={clientPortalId} onBack={goBack} />
        </div>
      </>
    );
  }

  if (isClientHub) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} onHelp={helpButton} showBell={false} darkMode={darkMode} setDarkMode={setDarkMode} />
        {notifPanel}
        {onboardingModal}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <ClientHubView onBack={goBack} />
        </div>
      </>
    );
  }

  const showChatFab = view.startsWith("qa") || view.startsWith("lider") || isExecutorView;

  return (
    <>
      <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} onHelp={helpButton} darkMode={darkMode} setDarkMode={setDarkMode} />
      {notifPanel}
      {onboardingModal}
      {chatPanel}
      {/* Floating chat button for QA and Líder */}
      {showChatFab && !showChat && (
        <button onClick={() => setShowChat(true)} className="fixed bottom-6 right-6 z-30 bg-sky-500 text-white rounded-full p-4 shadow-lg hover:bg-sky-600 transition-all hover:scale-105 flex items-center gap-2" title={isQA ? "Chat com Líder" : isLider ? "Mensagens" : "Chat"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {chatUnread > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">{chatUnread}</span>}
        </button>
      )}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {selectedTask && (
          <TaskDetailView taskId={selectedTask} onBack={goBack} />
        )}
        {!selectedTask && view === "executor" && (
          <ExecutorView executorId={executorId} onTaskClick={handleTaskClick} />
        )}
        {!selectedTask && view === "trocar_executor" && (
          <TrocarExecutorView currentId={executorId} onSelect={(id, name) => { setExecutorId(id); setExecutorName(name); setView("executor"); }} onBack={goBack} />
        )}
        {!selectedTask && (view === "qa_selector" || view === "qa_eventos") && !view.includes("errors") && (
          <QAPortalView area="eventos" onBack={goBack} onViewErrors={() => setView("qa_eventos_errors")} onProjectClick={onProjectClick} />
        )}
        {!selectedTask && view.includes("qa_") && view.includes("_errors") && (
          <QAErrorsView area="eventos" onBack={goBack} />
        )}
        {!selectedTask && (view === "lider_selector" || view === "lider_eventos") && (
          <LiderPortalView
            area="eventos"
            onBack={goBack}
            onProjectClick={onProjectClick}
            onViewAsClient={(cid) => { pushHistory(); setClientPortalId(cid); setView("experiencia_cliente"); }}
          />
        )}
      </main>
    </>
  );
}

export default App
