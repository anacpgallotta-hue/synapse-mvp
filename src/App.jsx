import { useState, useContext, createContext, useCallback, useRef } from 'react'

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
  { id: "p1", name: "Gala de Premiação Anual", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-15", progress: 65 },
  { id: "p2", name: "Festival de Esportes Radicais", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-28", progress: 30 },
  { id: "p7", name: "Premiação Top Performers", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Ana Gallotta", deadline: "2026-07-10", progress: 10 },
  { id: "p10", name: "Operações", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Ana Gallotta", deadline: "2026-05-30", progress: 0 },
  { id: "p9", name: "Ativação de Marca - Evento Gastronômico", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Ana Gallotta", deadline: "2026-06-15", progress: 25 },
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
  { id: "tk5", title: "Organizar reunião de alinhamento pré-evento", projectId: "p1", project: "Gala de Premiação Anual", executor: "t2", executorName: "Maria Eduarda Vittori", priority: "Alta", status: "a_fazer", area: "eventos", deadline: "2026-04-30T12:00", description: "Agendar e organizar reunião de alinhamento com todos os stakeholders antes do evento", checklist: [{ text: "Definir pauta", done: false }, { text: "Enviar convites", done: false }, { text: "Preparar material", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk6", title: "Montar checklist de fornecedores", projectId: "p9", project: "Ativação de Marca - Evento Gastronômico", executor: "t3", executorName: "Carolina Guimarães", priority: "Alta", status: "em_execucao", area: "eventos", deadline: "2026-04-18T17:00", description: "Listar e confirmar todos os fornecedores para o evento", checklist: [{ text: "Buffet", done: true }, { text: "Som e luz", done: false }, { text: "Decoração", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk7", title: "Criar cronograma do evento", projectId: "p10", project: "Operações", executor: "t4", executorName: "Samara Aboultaif", priority: "Média", status: "a_fazer", area: "eventos", deadline: "2026-04-25T12:00", description: "Desenvolver cronograma detalhado hora a hora do evento", checklist: [{ text: "Definir programação", done: false }, { text: "Alocar espaços", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
];

const initialLearnings = [
  { id: "l1", title: "Checklist de fornecedores incompleto", description: "Item reprovado em QA: fornecedor de som e iluminação não tinha contrato confirmado. Precisou ser refeito antes da entrega ao cliente.", client: "Ambev", clientId: "c1", date: "2025-12-18", type: "erro", origin: "QA", tags: ["fornecedores", "qa", "checklist"], area: "eventos" },
  { id: "l2", title: "Prazo de aprovação subestimado", description: "Cliente Hotmart levou 5 dias úteis para aprovar roteiro. Considerar buffer maior em cronogramas futuros.", client: "Hotmart", clientId: "c2", date: "2026-01-10", type: "aprendizado", origin: "Líder", tags: ["prazo", "aprovação", "cronograma"], area: "eventos" },
  { id: "l3", title: "Briefing incompleto causou retrabalho", description: "Red Bull pediu alterações no conceito visual após ver primeira entrega. Briefing não detalhava preferências visuais. Incluir referências visuais obrigatórias no briefing.", client: "Red Bull", clientId: "c3", date: "2026-03-05", type: "erro", origin: "QA", tags: ["briefing", "retrabalho", "visual"], area: "eventos" },
  { id: "l4", title: "Formato de apresentação ideal para XP", description: "XP prefere decks curtos (max 10 slides) com dados concretos e ROI projetado. Evitar slides muito conceituais.", client: "XP", clientId: "c5", date: "2026-02-20", type: "aprendizado", origin: "Líder", tags: ["apresentação", "formato", "xp"], area: "eventos" },
  { id: "l5", title: "Seara exige aprovação jurídica", description: "Todo material com marca Seara precisa de aprovação do jurídico deles. Adicionar 3 dias úteis ao prazo.", client: "Seara", clientId: "c4", date: "2025-11-15", type: "aprendizado", origin: "Líder", tags: ["jurídico", "aprovação", "prazo"], area: "eventos" },
];

const initialFeedbacks = [
  // Feedback sobre entrega específica (tem relatedTaskId)
  { id: "f2", projectId: "p2", clientId: "c3", clientName: "Red Bull", type: "Sugestão", text: "Incluir opção de atividade alternativa para participantes com menor preparo físico.", date: "2026-04-14", status: "pendente", assignedTaskId: null, relatedTaskId: null },
  { id: "f5", projectId: "p1", clientId: "c5", clientName: "XP", type: "Ajuste", text: "A reunião de alinhamento pré-evento não cobriu o tema de logística de transporte. Refazer com esse ponto.", date: "2026-05-02", status: "pendente", assignedTaskId: null, relatedTaskId: "tk5" },
  // Feedback geral sobre projeto (sem relatedTaskId)
  { id: "f3", projectId: "p1", clientId: "c5", clientName: "XP", type: "Elogio", text: "Excelente organização do cronograma da Gala. Time muito ágil nas respostas.", date: "2026-04-20", status: "pendente", assignedTaskId: null, relatedTaskId: null },
  { id: "f4", projectId: "p9", clientId: "c3", clientName: "Red Bull", type: "Ajuste", text: "Precisamos de mais opções de cardápio vegano para o evento gastronômico. Reavaliar fornecedores.", date: "2026-05-01", status: "pendente", assignedTaskId: null, relatedTaskId: "tk6" },
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
        alerts.push({ id: "smart-late-" + t.id, text: `Atrasada: "${t.title}" — prazo era ${deadline.toLocaleDateString("pt-BR")}`, priority: "danger", date: t.deadline });
      } else if (diffHours >= 0 && diffHours < 48 && t.status !== "devolvida") {
        alerts.push({ id: "smart-risk-" + t.id, text: `Em risco: "${t.title}" — prazo em ${Math.round(diffHours)}h`, priority: "warning", date: t.deadline });
      }
    });
    return alerts.filter(a => !dismissedAlerts.has(a.id)).sort((a, b) => (a.priority === "danger" ? 0 : 1) - (b.priority === "danger" ? 0 : 1));
  }, [tasks, dismissedAlerts]);

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

  const assignFeedbackAsTask = useCallback((feedbackId, taskData) => {
    setFeedbacks(prev => {
      const fb = prev.find(f => f.id === feedbackId);
      const newTask = { ...taskData, id: "tk" + Date.now(), status: "a_fazer", submittedLink: "", qaComment: "", feedbackOrigin: { type: fb.type, text: fb.text } };
      setTasks(t => [...t, newTask]);
      notify(`Nova tarefa de feedback: "${taskData.title}"`, "executor:" + taskData.executor, "warning");
      return prev.filter(f => f.id !== feedbackId);
    });
  }, [notify, addClientNote]);

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
    <AppContext.Provider value={{ tasks, projects, clients, team, learnings, feedbacks, clientNotes, notifications, addTask, updateTaskStatus, submitToQA, approveTask, rejectTask, toggleChecklist, addFeedback, assignFeedbackAsTask, addLearning, addClientNote, archiveElogio, createProject, updateProject, deleteTask, resubmitTask, revertFromQA, revertFromCompleted, revertFromDevolvida, clientApproveTask, clientRejectTask, dismissNotification, dismissSmartAlert, getTeamWithLoad, getSmartAlerts, setNotifications }}>
      {children}
    </AppContext.Provider>
  );
}

// ============================
// COMPONENTES UI
// ============================
function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-orange-50 text-orange-600 border-orange-200",
    danger: "bg-red-50 text-red-600 border-red-200",
    info: "bg-blue-50 text-blue-600 border-blue-200",
    accent: "bg-white text-green-700 border-green-300",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variants[variant] || variants.default} ${className}`}>{children}</span>;
}

function Button({ children, variant = "default", size = "default", className = "", ...props }) {
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    nav: "bg-transparent text-gray-600 hover:bg-gray-100 text-sm",
    navActive: "bg-green-700 text-white text-sm",
  };
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    icon: "p-2",
  };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = "", onClick }) {
  return <div onClick={onClick} className={`bg-white rounded-xl border border-gray-200 shadow-sm ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}>{children}</div>;
}

// ============================
// HEADER
// ============================
function Header({ currentView, setView, currentExecutor, setShowNotif, notifCount }) {
  const allNavItems = [
    { label: "Executor", view: "executor" },
    { label: "QA", view: "qa_selector" },
    { label: "Líder", view: "lider_selector" },
    { label: "Histórico Clientes", view: "clientes" },
    { label: "Portal do Cliente", view: "client_selector" },
    { label: "Trocar executor", view: "trocar_executor" },
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

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{headerTitle}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {allNavItems.map(item => (
              <Button key={item.view} variant={isActive(item.view) ? "navActive" : "nav"} size="sm" onClick={() => setView(item.view)}>
                {item.label}
              </Button>
            ))}
            <div className="relative ml-1">
              <Button variant="ghost" size="icon" onClick={() => setShowNotif(prev => !prev)}>
                <Bell size={20} />
                {notifCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{notifCount}</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>
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
  const myTasks = tasks.filter(t => t.executor === executorId).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const statusConfig = {
    a_fazer: { label: "A Fazer", bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-400", badge: "default" },
    em_execucao: { label: "Em execução", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500", badge: "info" },
    em_qa: { label: "Em QA", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500", badge: "purple" },
    devolvida: { label: "Devolvida", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", badge: "danger" },
    concluida: { label: "Concluída", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500", badge: "success" },
  };

  let filtered = timeFilter === "hoje"
    ? myTasks.filter(t => new Date(t.deadline).toDateString() === new Date().toDateString())
    : timeFilter === "2semanas"
    ? myTasks.filter(t => { const d = new Date(t.deadline); const now = new Date(); const twoWeeks = new Date(now.getTime() + 14 * 86400000); return d >= now && d <= twoWeeks; })
    : myTasks;

  if (statusFilter !== "todos") {
    filtered = filtered.filter(t => t.status === statusFilter);
  }

  const priorityColor = (p) => p === "Alta" ? "bg-red-500" : p === "Média" ? "bg-orange-500" : "bg-green-500";

  const formatDeadline = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays > 0 && diffDays < 7) return `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    if (date.toDateString() === now.toDateString()) return `Hoje – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    return `${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
  };

  const statusCounts = {};
  const timeFiltered = timeFilter === "hoje"
    ? myTasks.filter(t => new Date(t.deadline).toDateString() === new Date().toDateString())
    : timeFilter === "2semanas"
    ? myTasks.filter(t => { const d = new Date(t.deadline); const now = new Date(); const twoWeeks = new Date(now.getTime() + 14 * 86400000); return d >= now && d <= twoWeeks; })
    : myTasks;
  Object.keys(statusConfig).forEach(k => { statusCounts[k] = timeFiltered.filter(t => t.status === k).length; });

  const months = [...new Set(filtered.map(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}`; }))];

  const kanbanColumns = ["a_fazer", "em_execucao", "em_qa", "devolvida", "concluida"];

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Minhas tarefas</h1>
        <p className="text-gray-500">Organize suas entregas e acompanhe o progresso</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {[["hoje", "Hoje"], ["2semanas", "Próximas 2 semanas"], ["todos", "Todos"]].map(([key, label]) => (
              <Button key={key} variant={timeFilter === key ? "default" : "outline"} size="sm" onClick={() => setTimeFilter(key)}>{label}</Button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode("lista")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === "lista" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Lista</button>
            <button onClick={() => setViewMode("kanban")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Kanban</button>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          <button onClick={() => setStatusFilter("todos")} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${statusFilter === "todos" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
            Todos ({timeFiltered.length})
          </button>
          {kanbanColumns.map(key => {
            const cfg = statusConfig[key];
            const count = statusCounts[key] || 0;
            if (count === 0 && key !== "a_fazer" && key !== "em_execucao") return null;
            return (
              <button key={key} onClick={() => setStatusFilter(statusFilter === key ? "todos" : key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors flex items-center gap-1.5 ${statusFilter === key ? cfg.bg + " " + cfg.text + " " + cfg.border : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "lista" && (
        <div className="space-y-8">
          {months.map(month => (
            <div key={month}>
              <h3 className="mb-4 text-lg font-semibold capitalize">{month}</h3>
              <div className="space-y-3">
                {filtered.filter(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}` === month; }).map(task => {
                  const cfg = statusConfig[task.status] || statusConfig.a_fazer;
                  return (
                    <Card key={task.id} onClick={() => onTaskClick(task.id)} className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3">
                            <div className={`h-3 w-3 rounded-full ${priorityColor(task.priority)} flex-shrink-0 mt-1`} title={task.priority} />
                            <div>
                              <h4 className="font-medium leading-tight mb-1">{task.title}</h4>
                              <p className="text-sm text-gray-500">{task.project}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} />{formatDeadline(task.deadline)}</div>
                          {task.feedbackOrigin && <Badge variant="accent">Feedback do cliente</Badge>}
                          {task.status === "devolvida" && task.qaComment && <span className="text-xs text-red-500 max-w-[200px] truncate">{task.qaComment}</span>}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">Nenhuma tarefa encontrada com esse filtro.</p>}
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="grid grid-cols-5 gap-3" style={{ minHeight: "350px" }}>
          {kanbanColumns.map(key => {
            const cfg = statusConfig[key];
            const colTasks = timeFiltered.filter(t => t.status === key).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            return (
              <div key={key} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
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
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 hover:text-red-500"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                        </button>
                      )}
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${priorityColor(task.priority)}`} />
                        <p className="text-sm font-medium leading-tight">{task.title}</p>
                      </div>
                      <p className="text-xs text-gray-400 mb-1 truncate">{task.project}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400"><Clock size={10} className="inline" /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                      </div>
                      {task.feedbackOrigin && <Badge variant="accent" className="mt-2 text-[10px]">Feedback</Badge>}
                    </Card>
                  ))}
                  {colTasks.length === 0 && <p className="text-xs text-gray-300 text-center py-4">Nenhuma</p>}
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">← Voltar para minhas tarefas</button>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
        <div className={`h-4 w-4 rounded-full mt-2 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-orange-500" : "bg-green-500"}`} />
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 flex-wrap">
        <span><strong>Projeto:</strong> {task.project}</span>
        <span><strong>Prazo:</strong> {new Date(task.deadline).toLocaleDateString("pt-BR")} – {new Date(task.deadline).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}</span>
        <Badge>{({ a_fazer: "A Fazer", em_execucao: "Em execução", em_qa: "Em QA", concluida: "Concluída", devolvida: "Devolvida" })[task.status]}</Badge>
        {task.feedbackOrigin && <Badge variant="accent">Feedback do cliente</Badge>}
      </div>

      {task.status === "devolvida" && task.qaComment && (
        <Card className="p-6 mb-6 border-l-4 border-l-red-500">
          <h3 className="font-bold text-red-700 mb-2">Devolvida pelo QA</h3>
          <p className="text-sm text-gray-700 mb-4">{task.qaComment}</p>
          <Button size="sm" onClick={handleResubmit}>Retomar execução</Button>
        </Card>
      )}

      {task.status === "em_qa" && (
        <Card className="p-6 mb-6 border-l-4 border-l-purple-500">
          <h3 className="font-bold text-purple-700 mb-2">Enviada para QA</h3>
          <p className="text-sm text-gray-700 mb-4">Esta tarefa está aguardando revisão do QA. Se você precisa fazer ajustes, pode retirar do QA.</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { revertFromQA(taskId); }}>← Retirar do QA e voltar a editar</Button>
            <button onClick={() => { if (confirm("Tem certeza que deseja cancelar esta entrega? A tarefa voltará para 'A fazer' e os arquivos serão removidos.")) { revertFromQA(taskId); } }} className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">Cancelar entrega</button>
          </div>
        </Card>
      )}

      {task.status === "concluida" && (
        <Card className="p-6 mb-6 border-l-4 border-l-green-500">
          <h3 className="font-bold text-green-700 mb-2">Tarefa concluída</h3>
          <p className="text-sm text-gray-700">{task.qaComment && `Comentário do QA: ${task.qaComment}`}</p>
        </Card>
      )}

      {task.feedbackOrigin && (
        <Card className="p-6 mb-6 border-l-4 border-l-green-600">
          <h3 className="font-bold mb-2">Feedback original do cliente</h3>
          <p className="text-sm text-gray-500 mb-1"><strong>Tipo</strong></p>
          <Badge className="mb-3">{task.feedbackOrigin.type}</Badge>
          <p className="text-sm text-gray-500 mb-1">Texto original</p>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">{task.feedbackOrigin.text}</div>
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
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Instruções do líder</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700">{leaderText}</div>
                  </div>
                )}
                {!leaderText && feedbackText && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Descrição</p>
                    <p className="text-sm text-gray-700">{feedbackText}</p>
                  </div>
                )}
              </div>
            );
          }
          return <><p className="text-sm text-gray-500 mb-1">Descrição</p><p className="text-sm text-gray-700">{desc}</p></>;
        })()}
      </Card>

      {task.attachments.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-bold mb-4">Insumos e referências</h3>
          {task.attachments.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div><p className="font-medium text-sm">{a.name}</p><p className="text-xs text-gray-400">{a.type}{a.size ? ` • ${a.size}` : ""}</p></div>
              <Button variant="ghost" size="sm" onClick={() => { if (a.url) { window.open(a.url, "_blank"); } else { alert("Arquivo de exemplo: " + a.name + "\nEm produção, abriria o arquivo real."); } }}>Abrir</Button>
            </div>
          ))}
        </Card>
      )}

      <Card className="p-6 mb-6">
        <h3 className="font-bold mb-4">Checklist de execução</h3>
        {task.checklist.map((item, i) => (
          <label key={i} className="flex items-center gap-3 py-2 cursor-pointer">
            <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(taskId, i)} className="h-5 w-5 rounded border-gray-300 text-blue-600" />
            <span className={item.done ? "line-through text-gray-400" : "text-gray-700"}>{item.text}</span>
          </label>
        ))}
      </Card>

      {task.status !== "concluida" && task.status !== "em_qa" && (
        <Card className="p-6">
          <h3 className="font-bold mb-2">Enviar para QA</h3>
          <p className="text-sm text-gray-500 mb-4">Anexe os arquivos da entrega e adicione observações antes de enviar para revisão.</p>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Arquivos da entrega</label>
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-2">
                <FolderOpen size={16} className="text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-gray-400">{f.type} · {f.size}</p>
                </div>
                <button type="button" onClick={() => handleRemoveFile(i)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
              </div>
            ))}
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple style={{display: "none"}} />
            <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer">
              <Plus size={18} /> Clique para selecionar arquivos
            </button>
            <p className="text-xs text-gray-400 mt-1">Você pode selecionar vários arquivos de uma vez.</p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Link da entrega ou observações</label>
            <textarea value={link} onChange={e => setLink(e.target.value)} placeholder="Cole o link do Drive, Figma, ou descreva observações importantes sobre a entrega..." className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" />
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
  const { tasks, projects, clients, team, learnings, feedbacks, clientNotes, approveTask, rejectTask, revertFromCompleted, revertFromDevolvida, createProject, updateProject, addLearning, addClientNote } = useContext(AppContext);
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
    gostou: { label: "Gostou", color: "bg-green-100 text-green-700 border-green-300" },
    nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
    comunicacao: { label: "Comunicação", color: "bg-blue-100 text-blue-700 border-blue-300" },
    processo: { label: "Processo", color: "bg-purple-100 text-purple-700 border-purple-300" },
    elogio: { label: "Elogio", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
    erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
    insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QA Eventos</h1>
          <p className="text-gray-500 mt-1">Gestão operacional — projetos, qualidade e conhecimento da área.</p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}><ArrowLeft size={14} /> Voltar</Button>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab("projetos")}>
          <p className="text-sm text-gray-500 mb-1">Projetos ativos</p>
          <p className="text-3xl font-bold text-gray-900">{areaProjects.length}</p>
        </Card>
        <Card className={`p-5 cursor-pointer hover:shadow-md transition-shadow ${pendingTasks.length > 0 ? "border-l-4 border-l-purple-500" : ""}`} onClick={() => setTab("revisao")}>
          <p className="text-sm text-gray-500 mb-1">Aguardando revisão</p>
          <p className={`text-3xl font-bold ${pendingTasks.length > 0 ? "text-purple-600" : "text-gray-900"}`}>{pendingTasks.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Taxa de retrabalho</p>
          <p className={`text-3xl font-bold ${retrabalhoRate > 30 ? "text-red-600" : retrabalhoRate > 15 ? "text-yellow-600" : "text-green-600"}`}>{retrabalhoRate}%</p>
        </Card>
        <Card className={`p-5 ${atRisk.length > 0 ? "border-l-4 border-l-red-500" : ""}`}>
          <p className="text-sm text-gray-500 mb-1">Em risco de atraso</p>
          <p className={`text-3xl font-bold ${atRisk.length > 0 ? "text-red-600" : "text-green-600"}`}>{atRisk.length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {[
          ["visao_geral", "Visão geral"],
          ["projetos", "Projetos"],
          ["revisao", `Revisão${pendingTasks.length > 0 ? " (" + pendingTasks.length + ")" : ""}`],
          ["conhecimento", "Base de conhecimento"],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === key ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}>{label}</button>
        ))}
      </div>

      {/* ===== VISÃO GERAL ===== */}
      {tab === "visao_geral" && (
        <div>
          {/* Entregas pendentes — ação principal */}
          {pendingTasks.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Entregas aguardando sua revisão</h2>
                {pendingTasks.length > 2 && <button onClick={() => setTab("revisao")} className="text-sm text-gray-500 hover:text-gray-900">Ver todas →</button>}
              </div>
              {pendingTasks.slice(0, 3).map(task => (
                <Card key={task.id} className="mb-3 overflow-hidden">
                  <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setTab("revisao"); setExpandedId(task.id); }}>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-yellow-500" : "bg-green-500"}`}>{task.priority[0]}</div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{task.project} · {task.executorName} · {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                      </div>
                    </div>
                    <Button size="sm">Revisar</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {pendingTasks.length === 0 && (
            <Card className="p-8 text-center mb-8 bg-green-50 border-green-200">
              <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2" />
              <p className="font-medium text-green-700">Nenhuma entrega pendente de revisão</p>
              <p className="text-sm text-green-600 mt-1">Todas as entregas foram revisadas.</p>
            </Card>
          )}

          {/* Tarefas em risco */}
          {atRisk.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Tarefas em risco de atraso</h2>
              {atRisk.map(task => (
                <Card key={task.id} className="p-4 mb-2 border-l-4 border-l-red-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.project} · {task.executorName} · Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                    </div>
                    <Badge variant={task.status === "a_fazer" ? "default" : "info"}>{task.status === "a_fazer" ? "A fazer" : "Em execução"}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Projetos — visual cards */}
          <h2 className="text-lg font-semibold mb-4">Projetos da área</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {areaProjects.map(p => {
              const pTasks = areaTasks.filter(t => t.projectId === p.id);
              const done = pTasks.filter(t => t.status === "concluida").length;
              const inQa = pTasks.filter(t => t.status === "em_qa").length;
              const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0;
              return (
                <Card key={p.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => { if (onProjectClick) onProjectClick(p.id); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{p.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{p.client} · Líder: {p.responsible}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.priority === "Alta" ? "bg-red-50 text-red-700 border-red-200" : p.priority === "Média" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}`}>{p.priority}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                    <span className="text-sm font-medium text-gray-700">{pct}%</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{pTasks.length} tarefas</span>
                    <span>{done} concluídas</span>
                    {inQa > 0 && <span className="text-purple-600 font-medium">{inQa} em QA</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}</p>
                </Card>
              );
            })}
            {/* Add project card */}
            <Card className="p-5 border-dashed border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all" onClick={() => { setTab("projetos"); setShowCreateProject(true); }}>
              <div className="text-center">
                <Plus size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Novo projeto</p>
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
              <p className="text-sm font-semibold text-gray-700 mb-4">Criar novo projeto</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-gray-600">Nome do projeto / campanha</label><input value={projForm.name} onChange={e => setProjForm(p => ({ ...p, name: e.target.value }))} placeholder="Ex: Festival de Música 2026" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                  <div><label className="text-xs font-medium text-gray-600">Cliente</label><select value={projForm.clientId} onChange={e => setProjForm(p => ({ ...p, clientId: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="">Selecione</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="text-xs font-medium text-gray-600">Líder responsável</label><select value={projForm.responsible} onChange={e => setProjForm(p => ({ ...p, responsible: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="Ana Gallotta">Ana Gallotta</option></select></div>
                  <div><label className="text-xs font-medium text-gray-600">Prioridade</label><select value={projForm.priority} onChange={e => setProjForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option value="Alta">Alta</option><option value="Média">Média</option><option value="Baixa">Baixa</option></select></div>
                  <div><label className="text-xs font-medium text-gray-600">Prazo</label><input type="date" value={projForm.deadline} onChange={e => setProjForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                </div>
                <div><label className="text-xs font-medium text-gray-600">Briefing</label><textarea value={projForm.briefing} onChange={e => setProjForm(p => ({ ...p, briefing: e.target.value }))} placeholder="Descreva o escopo, objetivos, referências e expectativas do cliente..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCreateProject} disabled={!projForm.name.trim() || !projForm.clientId || !projForm.deadline}>Criar projeto</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCreateProject(false)}>Cancelar</Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            {areaProjects.map(p => {
              const pTasks = areaTasks.filter(t => t.projectId === p.id);
              const done = pTasks.filter(t => t.status === "concluida").length;
              const pct = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0;
              return (
                <Card key={p.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => { if (onProjectClick) onProjectClick(p.id); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="font-semibold text-gray-900">{p.name}</h3><p className="text-xs text-gray-500 mt-0.5">{p.client} · Líder: {p.responsible}</p></div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.priority === "Alta" ? "bg-red-50 text-red-700 border-red-200" : p.priority === "Média" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}`}>{p.priority}</span>
                  </div>
                  {p.briefing && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.briefing}</p>}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{ width: `${pct}%` }} /></div>
                    <span className="text-sm font-medium">{pct}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
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
              ["pendentes", `Pendentes (${pendingTasks.length})`, pendingTasks.length > 0 ? "bg-purple-50 text-purple-700 border-purple-200" : ""],
              ["devolvidas", `Devolvidas (${allDevolvidas.length})`, allDevolvidas.length > 0 ? "bg-red-50 text-red-700 border-red-200" : ""],
              ["aprovadas", `Aprovadas (${allCompleted.length})`, "bg-green-50 text-green-700 border-green-200"],
            ].map(([key, label, activeColor]) => (
              <button key={key} onClick={() => setReviewTab(key)} className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${reviewTab === key ? (activeColor || "bg-gray-100 text-gray-700 border-gray-300") : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>{label}</button>
            ))}
          </div>

          {reviewTab === "pendentes" && (
            pendingTasks.length === 0 ? (
              <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma entrega pendente.</p></Card>
            ) : pendingTasks.map(task => {
              const isExpanded = expandedId === task.id;
              return (
              <Card key={task.id} className="mb-4 overflow-hidden">
                <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-yellow-500" : "bg-green-500"}`}>{task.priority[0]}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{task.project}</span>
                          <span>{task.executorName}</span>
                          <span>{new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Instruções da tarefa</p>
                            <Card className="p-4 space-y-3">
                              {(() => {
                                const desc = task.description || "";
                                const hasLeader = desc.includes("Instruções do líder:");
                                const hasFbPrefix = desc.match(/^Feedback do cliente [^:]+:\s*/i);
                                if (hasLeader) { const lt = desc.split(/Instruções do líder:\s*/i)[1]?.trim(); return lt ? (<div><p className="text-xs font-semibold text-blue-600 mb-1">Instruções do líder</p><div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700">{lt}</div></div>) : null; }
                                if (hasFbPrefix) { const cl = desc.replace(/^Feedback do cliente [^:]+:\s*/i, "").trim(); return cl ? <p className="text-sm text-gray-700">{cl}</p> : null; }
                                return <p className="text-sm text-gray-700">{desc}</p>;
                              })()}
                              {task.feedbackOrigin && (<div className="p-3 bg-green-50 border border-green-200 rounded-lg"><p className="text-xs font-semibold text-green-700 mb-1">Feedback do cliente</p><p className="text-sm text-gray-700">{task.feedbackOrigin.text}</p></div>)}
                            </Card>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Checklist</p>
                            <Card className="p-4">
                              <div className="space-y-2">{task.checklist.map((item, i) => (<div key={i} className="flex items-center gap-2.5"><div className={`h-4 w-4 rounded flex items-center justify-center text-xs flex-shrink-0 ${item.done ? "bg-green-600 text-white" : "border border-gray-300"}`}>{item.done ? "✓" : ""}</div><span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span></div>))}</div>
                              <div className="mt-3 pt-3 border-t border-gray-100"><div className="flex items-center justify-between"><span className="text-xs text-gray-500">{task.checklist.filter(c => c.done).length}/{task.checklist.length}</span><div className="w-20 bg-gray-200 rounded-full h-1.5"><div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(task.checklist.filter(c => c.done).length / task.checklist.length) * 100}%` }} /></div></div></div>
                            </Card>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Entrega</p>
                            <Card className="p-4">
                              {(task.submittedFiles && task.submittedFiles.length > 0) ? (
                                <div className="space-y-2">
                                  {task.submittedFiles.map((f, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"><div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-purple-600" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{f.name}</p><p className="text-xs text-gray-500">{f.type ? f.type + " · " : ""}{f.size}</p></div><a href={f.url} download={f.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer flex-shrink-0" style={{textDecoration:"none"}}><ExternalLink size={12} /> Abrir</a></div>))}
                                  {task.submittedLink?.trim() && (<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"><ExternalLink size={16} className="text-gray-500 flex-shrink-0" /><p className="text-xs text-gray-500 truncate flex-1">{task.submittedLink}</p><Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>Abrir</Button></div>)}
                                </div>
                              ) : task.submittedLink?.trim() ? (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"><ExternalLink size={16} className="text-purple-600 flex-shrink-0" /><p className="text-xs text-gray-500 truncate flex-1">{task.submittedLink}</p><Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>Abrir</Button></div>
                              ) : (<p className="text-sm text-gray-400 italic">Nenhum arquivo anexado.</p>)}
                            </Card>
                          </div>
                          {task.attachments.length > 0 && (<div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Referências</p><Card className="p-4"><div className="space-y-2">{task.attachments.map((a, i) => (<div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50"><FolderOpen size={16} className="text-gray-400 flex-shrink-0" /><div className="flex-1 min-w-0"><p className="text-sm font-medium">{a.name}</p><p className="text-xs text-gray-400">{a.type}{a.size ? ` · ${a.size}` : ""}</p></div><Button variant="ghost" size="sm" onClick={() => a.url ? window.open(a.url, "_blank") : alert("Arquivo: " + a.name)}>Abrir</Button></div>))}</div></Card></div>)}
                        </div>
                      </div>
                      <Card className="p-5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Revisão e devolutiva</p>
                        <textarea value={comments[task.id] || ""} onChange={e => setComments(prev => ({ ...prev, [task.id]: e.target.value }))} placeholder="Escreva o que precisa ser ajustado, elogie o que ficou bom, ou aprove diretamente..." className="w-full border border-gray-200 rounded-lg p-3 text-sm min-h-[80px] mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50" />
                        <div className="flex gap-3">
                          <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors" onClick={() => { approveTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); setExpandedId(null); }}><CheckCircle2 size={16} /> Aprovar</button>
                          <button className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${comments[task.id]?.trim() ? "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100" : "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"}`} onClick={() => { if (!comments[task.id]?.trim()) return; rejectTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); setExpandedId(null); }}><ArrowLeft size={16} /> Devolver</button>
                        </div>
                        {!comments[task.id]?.trim() && <p className="text-xs text-gray-400 mt-3">Escreva um comentário para poder devolver.</p>}
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
              <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma tarefa devolvida.</p></Card>
            ) : allDevolvidas.map(task => (
              <Card key={task.id} className="p-4 mb-3 border-l-4 border-l-red-400">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-gray-500 mt-0.5">{task.project} · {task.executorName}</p></div>
                  <button onClick={() => revertFromDevolvida(task.id)} className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">Reverter devolução</button>
                </div>
                {task.qaComment && <div className="mt-2 p-2.5 bg-red-50 rounded-lg border border-red-100"><p className="text-xs text-red-700">{task.qaComment}</p></div>}
              </Card>
            ))
          )}

          {reviewTab === "aprovadas" && (
            allCompleted.length === 0 ? (
              <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma tarefa aprovada ainda.</p></Card>
            ) : allCompleted.map(task => (
              <Card key={task.id} className="p-4 mb-3 border-l-4 border-l-green-400">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-gray-500 mt-0.5">{task.project} · {task.executorName}</p></div>
                  <button onClick={() => revertFromCompleted(task.id)} className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">Reverter aprovação</button>
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
            <p className="text-sm font-medium text-gray-700 mb-3">Nova anotação</p>
            <div className="flex items-center gap-3 mb-3">
              <select value={noteClient} onChange={e => setNoteClient(e.target.value)} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[180px]">
                <option value="">Selecione cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="O que aprendemos sobre este cliente?" className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 mr-1">Categoria:</span>
              {Object.entries(tagConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setNoteTag(noteTag === key ? "" : key)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${noteTag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>{cfg.label}</button>
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

            const getTagInfo = (t) => tagConfig[t] || { label: t || "Geral", color: "bg-gray-100 text-gray-600 border-gray-300" };

            const filterTags = ["todos", "gostou", "nao_gostou", "comunicacao", "processo", "elogio", "erro", "insight"];
            const filtered = kbF === "todos" ? combined : combined.filter(e => e._tag === kbF);
            const tagCounts = {};
            combined.forEach(e => { tagCounts[e._tag] = (tagCounts[e._tag] || 0) + 1; });

            return (
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {filterTags.map(t => {
                    const cfg = t === "todos" ? { label: "Todos", color: "bg-gray-100 text-gray-700 border-gray-300" } : getTagInfo(t);
                    const count = t === "todos" ? combined.length : (tagCounts[t] || 0);
                    return (<button key={t} onClick={() => setKbF(t)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${kbF === t ? (t === "todos" ? "bg-gray-900 text-white border-gray-900" : cfg.color + " border-current") : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"}`}>{cfg.label} ({count})</button>);
                  })}
                </div>
                {filtered.length === 0 ? (
                  <Card className="p-8 text-center"><p className="text-gray-400 text-sm">Nenhum registro encontrado.</p></Card>
                ) : (
                  <div className="space-y-2">
                    {filtered.map((entry, i) => {
                      const cfg = getTagInfo(entry._tag);
                      const borderColors = { gostou: "border-l-green-500", nao_gostou: "border-l-red-500", comunicacao: "border-l-blue-500", processo: "border-l-purple-500", elogio: "border-l-emerald-500", erro: "border-l-red-500", insight: "border-l-yellow-500" };
                      const bgColors = { gostou: "bg-green-50", nao_gostou: "bg-red-50", comunicacao: "bg-blue-50", processo: "bg-purple-50", elogio: "bg-emerald-50", erro: "bg-red-50", insight: "bg-yellow-50" };
                      return (
                        <div key={i} className={`p-4 rounded-lg border-l-4 ${borderColors[entry._tag] || "border-l-gray-300"} ${bgColors[entry._tag] || "bg-gray-50"}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>{cfg.label}</span>
                              <span className="text-xs text-gray-500">{entry.author || "—"}</span>
                              <span className="text-xs text-gray-400">· {entry.clientName}</span>
                            </div>
                            <span className="text-xs text-gray-400">{entry._sort}</span>
                          </div>
                          {entry._title && <p className="font-medium text-sm">{entry._title}</p>}
                          <p className="text-sm text-gray-700">{entry._text}</p>
                          {entry._isLearning && entry.tags && entry.tags.filter(Boolean).length > 0 && (
                            <div className="flex gap-1 mt-2">{entry.tags.filter(Boolean).map((tag, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>)}</div>
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

function LiderPortalView({ area, onBack, onViewClients, onSimulateClient, onProjectClick, onViewAsClient }) {
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
      ? `[Feedback] Ajuste em: ${relatedTask.title}`
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
    assignFeedbackAsTask(fb.id, {
      title: assignForm.title,
      projectId: fb.projectId,
      project: proj.name,
      executor: exec.id,
      executorName: exec.name,
      priority: assignForm.priority,
      area,
      deadline: assignForm.deadline,
      description: `Feedback do cliente ${fb.clientName}: ${fb.text}${assignForm.instructions.trim() ? `\n\nInstruções do líder: ${assignForm.instructions.trim()}` : ""}`,
      checklist: [{ text: "Analisar feedback do cliente", done: false }, { text: "Implementar ajuste solicitado", done: false }, { text: "Validar com líder antes de enviar ao QA", done: false }],
      attachments: [],
    });
    setAssigningFb(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Voltar ao modo executor</button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewClients}><Users size={16} /> Clientes</Button>
          <Button variant="outline" size="sm" onClick={onSimulateClient}><Sparkles size={16} /> Simular visão do cliente</Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-3xl font-bold">Líder Eventos</h1>
      </div>
      <p className="text-gray-500 mb-1">Gerencie projetos e distribua tarefas para o time.</p>
      <p className="text-sm text-gray-400 mb-6">Você está vendo todos os projetos de eventos.</p>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === "geral" ? "outline" : "ghost"} size="sm" onClick={() => setTab("geral")} className={tab === "geral" ? "border-green-600 text-green-700" : ""}>Visão geral</Button>
        <Button variant={tab === "portal" ? "outline" : "ghost"} size="sm" onClick={() => setTab("portal")} className={tab === "portal" ? "border-green-600 text-green-700" : ""}>Portal do cliente</Button>
      </div>

      {tab === "geral" && (
        <>
          <h2 className="text-xl font-bold mb-4">Projetos ativos</h2>
          <Card className="mb-8 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left p-4 font-medium">Projeto</th><th className="text-left p-4 font-medium">Cliente</th><th className="text-left p-4 font-medium">Tipo</th><th className="text-left p-4 font-medium">Status</th><th className="text-left p-4 font-medium">Prioridade</th><th className="text-left p-4 font-medium">Responsável</th><th className="text-left p-4 font-medium">Prazo</th></tr></thead>
              <tbody>
                {areaProjects.map(p => {
                  const projFeedbacks = feedbacks.filter(f => f.projectId === p.id && f.status === "pendente");
                  return (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => onProjectClick && onProjectClick(p.id)}>
                      <td className="p-4 font-medium">{p.name} {projFeedbacks.length > 0 && <Badge variant="success" className="ml-2">{projFeedbacks.length} feedback</Badge>}</td>
                      <td className="p-4 text-gray-500">{p.client}</td>
                      <td className="p-4"><Badge variant="info">{p.type}</Badge></td>
                      <td className="p-4"><Badge variant="purple">Projeto</Badge></td>
                      <td className="p-4"><span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${p.priority === "Alta" ? "bg-red-500" : p.priority === "Média" ? "bg-orange-500" : "bg-green-500"}`} />{p.priority}</span></td>
                      <td className="p-4 text-gray-500">{p.responsible}</td>
                      <td className="p-4 text-gray-500"><Calendar className="inline" size={12} /> {new Date(p.deadline).toLocaleDateString("pt-BR")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <h2 className="text-xl font-bold mb-4">Feedbacks de clientes</h2>
          <div className="flex gap-2 mb-4">
            <Button variant={feedFilter === "pendentes" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("pendentes")}>Pendentes ({pendingFeedbacks.length})</Button>
            <Button variant={feedFilter === "atribuidos" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("atribuidos")}>Atribuídos ({assignedFeedbacks.length})</Button>
          </div>
          {feedFilter === "pendentes" && pendingFeedbacks.length === 0 && <Card className="p-8 text-center text-gray-400 mb-8">Nenhum feedback pendente de atribuição</Card>}
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
                      <p className="text-sm text-gray-800 mb-2">{fb.text}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Cliente: <strong className="text-gray-600">{fb.clientName}</strong></span>
                        <span>Projeto: <strong className="text-gray-600">{proj?.name || "—"}</strong></span>
                        <span>{fb.date}</span>
                      </div>
                      {relatedTask && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Entrega relacionada</p>
                          <p className="text-sm font-medium">{relatedTask.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Executor: <strong>{relatedTask.executorName}</strong> · Status: {relatedTask.status === "concluida" ? "Concluída" : relatedTask.status === "em_qa" ? "Em QA" : relatedTask.status === "em_execucao" ? "Em execução" : relatedTask.status === "devolvida" ? "Devolvida" : "A fazer"}</p>
                        </div>
                      )}
                    </div>
                    {!isAssigning && <Button size="sm" onClick={() => openAssign(fb)}>Atribuir como tarefa</Button>}
                  </div>
                </div>

                {isAssigning && (
                  <div className="border-t bg-gray-50 p-5 space-y-3">
                    <p className="text-sm font-bold text-gray-700">Atribuir como tarefa</p>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Título da tarefa</label>
                      <input value={assignForm.title} onChange={e => setAssignForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600">Atribuir para</label>
                        <select value={assignForm.executor} onChange={e => setAssignForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                          <option value="">Selecione executor</option>
                          {areaTeam.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.activeTasks} tarefas){relatedTask && relatedTask.executor === m.id ? " ★ executor original" : ""}
                            </option>
                          ))}
                        </select>
                        {relatedTask && <p className="text-xs text-gray-400 mt-1">★ = executor que fez a entrega original</p>}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Prioridade</label>
                        <select value={assignForm.priority} onChange={e => setAssignForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                          <option>Alta</option><option>Média</option><option>Baixa</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">Prazo</label>
                        <input type="datetime-local" value={assignForm.deadline} onChange={e => setAssignForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Instruções para o executor <span className="text-gray-400 font-normal">(opcional)</span></label>
                      <textarea value={assignForm.instructions} onChange={e => setAssignForm(p => ({ ...p, instructions: e.target.value }))} placeholder="Dê contexto, orientações ou detalhes sobre como resolver este feedback..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" onClick={handleAssignFeedback} disabled={!assignForm.executor || !assignForm.title.trim()}>Confirmar atribuição</Button>
                      <Button variant="outline" size="sm" onClick={() => setAssigningFb(null)}>Cancelar</Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
          {feedFilter === "atribuidos" && assignedFeedbacks.length === 0 && <Card className="p-8 text-center text-gray-400 mb-8">Nenhum feedback atribuído ainda</Card>}
          {feedFilter === "atribuidos" && assignedFeedbacks.map(fb => {
            const proj = projects.find(p => p.id === fb.projectId);
            const assignedTask = fb.assignedTaskId ? tasks.find(t => t.id === fb.assignedTaskId) : null;
            return (
              <Card key={fb.id} className="p-5 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success">Atribuído</Badge>
                  <Badge variant={fb.type === "Ajuste" ? "danger" : fb.type === "Sugestão" ? "warning" : "success"}>{fb.type}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-1">{fb.text}</p>
                <p className="text-xs text-gray-400">Cliente: {fb.clientName} · Projeto: {proj?.name || "—"} · {fb.date}</p>
                {assignedTask && <p className="text-xs text-gray-500 mt-2">Tarefa criada: <strong>{assignedTask.title}</strong> → {assignedTask.executorName}</p>}
              </Card>
            );
          })}

          <button onClick={() => setShowRelacionamento(!showRelacionamento)} className="w-full flex items-center justify-between mt-8 mb-4 group">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Relacionamento com cliente</h2>
              {elogios.length > 0 && <Badge variant="success">{elogios.length} elogio{elogios.length > 1 ? "s" : ""}</Badge>}
            </div>
            {showRelacionamento ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>

          {showRelacionamento && <>
          <p className="text-sm text-gray-500 mb-4">Elogios recebidos e anotações sobre preferências dos clientes. Ao registrar, a informação vai para o Histórico de Clientes.</p>

          {elogios.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Elogios recebidos</p>
              {elogios.map(fb => {
                const proj = projects.find(p => p.id === fb.projectId);
                return (
                  <Card key={fb.id} className="mb-3 border-l-4 border-l-green-500">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="success">Elogio</Badge>
                        <span className="text-xs text-gray-400">{fb.clientName} · {fb.date}</span>
                      </div>
                      <p className="text-sm text-gray-800 mb-1">"{fb.text}"</p>
                      {proj && <p className="text-xs text-gray-400">Projeto: {proj.name}</p>}
                      <div className="mt-3">
                        <textarea
                          value={elogioNotes[fb.id] || ""}
                          onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))}
                          placeholder="Anote o que aprendemos com esse elogio... Ex: 'Cliente valoriza agilidade nas respostas — manter esse padrão'"
                          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50"
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
            <Card className="p-6 text-center text-gray-400 mb-4">Nenhum elogio pendente de registro</Card>
          )}

          <Card className="p-5 mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Nova anotação sobre cliente</p>
            {(() => {
              const noteTagConfig = {
                gostou: { label: "Gostou", color: "bg-green-100 text-green-700 border-green-300" },
                nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
                comunicacao: { label: "Comunicação", color: "bg-blue-100 text-blue-700 border-blue-300" },
                processo: { label: "Processo", color: "bg-purple-100 text-purple-700 border-purple-300" },
                elogio: { label: "Elogio", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
                erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
                insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
              };
              return (<>
                <div className="flex items-center gap-3 mb-3">
                  <select value={relNote.clientId} onChange={e => setRelNote(p => ({ ...p, clientId: e.target.value }))} className="border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[180px]">
                    <option value="">Selecione cliente</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input value={relNote.text} onChange={e => setRelNote(p => ({ ...p, text: e.target.value }))} onKeyDown={e => { if (e.key === "Enter" && relNote.clientId && relNote.text.trim() && relNote.tag) { addClientNote(relNote.clientId, relNote.text.trim(), relNote.tag); setRelNote({ clientId: "", text: "", tag: "" }); } }} placeholder="Ex: Cliente prefere reuniões curtas e objetivas..." className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-500 mr-1">Categoria:</span>
                  {Object.entries(noteTagConfig).map(([key, cfg]) => (
                    <button key={key} onClick={() => setRelNote(p => ({ ...p, tag: p.tag === key ? "" : key }))} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${relNote.tag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>{cfg.label}</button>
                  ))}
                  <div className="ml-auto">
                    <Button size="sm" onClick={() => { if (relNote.clientId && relNote.text.trim() && relNote.tag) { addClientNote(relNote.clientId, relNote.text.trim(), relNote.tag); setRelNote({ clientId: "", text: "", tag: "" }); } }} disabled={!relNote.clientId || !relNote.text.trim() || !relNote.tag}>Salvar nota</Button>
                  </div>
                </div>
              </>);
            })()}
          </Card>
          </>}

          <h2 className="text-xl font-bold mt-8 mb-4">Carga do time</h2>
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-3 gap-4">
              {areaTeam.map(m => (
                <Card key={m.id} className="p-4 border">
                  <div className="flex justify-between items-start mb-1">
                    <div><p className="font-medium">{m.name}</p><p className="text-sm text-gray-500">{m.role}</p></div>
                    <Badge variant={m.loadStatus === "Disponível" ? "success" : m.loadStatus === "Moderado" ? "warning" : "danger"}>{m.loadStatus}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-2"><Users size={12} /> {m.activeTasks} tarefas ativas</p>
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
                <div><label className="text-sm font-medium text-gray-700">Nome da tarefa</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Criar roteiro detalhado..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700">Cliente</label>
                    <select value={createClientFilter} onChange={e => { setCreateClientFilter(e.target.value); setForm(p => ({ ...p, projectId: "" })); }} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Todos os clientes</option>
                      {[...new Set(areaProjects.map(p => p.client))].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className="text-sm font-medium text-gray-700">Projeto</label>
                    <select value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Selecione um projeto</option>
                      {areaProjects.filter(p => !createClientFilter || p.client === createClientFilter).map(p => <option key={p.id} value={p.id}>{p.client} — {p.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700">Responsável</label>
                    <select value={form.executor} onChange={e => setForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Selecione</option>
                      {areaTeam.map(m => <option key={m.id} value={m.id}>{m.name} ({m.role} · {m.activeTasks} tarefas)</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700">Prazo</label><input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                  <div><label className="text-sm font-medium text-gray-700">Prioridade</label>
                    <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option>Alta</option><option>Média</option><option>Baixa</option>
                    </select>
                  </div>
                </div>
                <div><label className="text-sm font-medium text-gray-700">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Descreva o que precisa ser feito..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Checklist de execução <span className="text-gray-400 font-normal">(opcional)</span></label>
                  <p className="text-xs text-gray-400 mt-0.5 mb-2">Defina os passos que o executor deve seguir. Se deixar vazio, será gerado um checklist padrão.</p>
                  {checkItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <div className="h-4 w-4 rounded border border-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1">{item}</span>
                      <button type="button" onClick={() => setCheckItems(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-1">
                    <input value={newCheckItem} onChange={e => setNewCheckItem(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddCheckItem(); } }} placeholder="Adicionar item..." className="flex-1 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                    <Button variant="outline" size="sm" onClick={handleAddCheckItem}>Adicionar</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Insumos e referências <span className="text-gray-400 font-normal">(opcional)</span></label>
                  <p className="text-xs text-gray-400 mt-0.5 mb-2">Anexe briefings, manuais, referências visuais ou qualquer arquivo útil para o executor.</p>
                  {createFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 border border-gray-100 rounded-lg mb-1.5">
                      <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-green-700" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{f.name}</p>
                        <p className="text-xs text-gray-400">{f.type} · {f.size}</p>
                      </div>
                      <button type="button" onClick={() => setCreateFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <input type="file" ref={createFileRef} onChange={handleCreateFileSelect} multiple style={{display: "none"}} />
                  <button type="button" onClick={() => createFileRef.current && createFileRef.current.click()} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer">
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
              <button onClick={() => { setSelectedClient(null); setClientDetailTab("projetos"); }} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center text-lg font-bold">{client.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{client.name}</h2>
                    <p className="text-sm text-gray-500">Contato: {client.contact} · Responsável: {client.responsible}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><MessageSquare size={14} /> WhatsApp</Button>
                  <Button variant="outline" size="sm" onClick={() => onViewAsClient && onViewAsClient(client.id)}><ExternalLink size={14} /> Ver como cliente</Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4 text-center"><p className="text-2xl font-bold">{cProjects.length}</p><p className="text-xs text-gray-500">Projetos ativos</p></Card>
                <Card className="p-4 text-center"><p className="text-2xl font-bold">{cDone.length}/{cTasks.length}</p><p className="text-xs text-gray-500">Tarefas concluídas</p></Card>
                <Card className="p-4 text-center"><p className={`text-2xl font-bold ${cPendingFb.length > 0 ? "text-orange-600" : "text-green-600"}`}>{cPendingFb.length}</p><p className="text-xs text-gray-500">Feedbacks pendentes</p></Card>
                <Card className="p-4 text-center"><p className="text-sm font-medium"><Calendar size={12} className="inline" /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")}</p><p className="text-xs text-gray-500 mt-1">Próxima reunião</p></Card>
              </div>

              <div className="flex border-b mb-6">
                {[
                  { key: "projetos", label: "Projetos" },
                  { key: "feedbacks", label: `Feedbacks (${cFeedbacks.length})` },
                  { key: "relacionamento", label: `Relacionamento${cElogios.length > 0 ? " (" + cElogios.length + " elogio" + (cElogios.length > 1 ? "s" : "") + ")" : ""}` },
                ].map(t => (
                  <button key={t.key} onClick={() => setClientDetailTab(t.key)} className={`px-5 py-3 text-sm font-medium transition-colors ${clientDetailTab === t.key ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>{t.label}</button>
                ))}
              </div>

              {clientDetailTab === "projetos" && (
                <div className="space-y-3">
                  {cProjects.length > 0 && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ativos</p>}
                  {cProjects.map(p => {
                    const pTasks = tasks.filter(t => t.projectId === p.id);
                    const pDone = pTasks.filter(t => t.status === "concluida").length;
                    const progress = pTasks.length > 0 ? Math.round((pDone / pTasks.length) * 100) : p.progress;
                    return (
                      <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onProjectClick && onProjectClick(p.id)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")} · {pTasks.length} tarefas</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={p.priority === "Alta" ? "danger" : "warning"}>{p.priority}</Badge>
                            <div className="flex items-center gap-2 w-28"><div className="flex-1 bg-gray-100 rounded-full h-1.5"><div className="bg-gray-900 h-1.5 rounded-full" style={{ width: progress + "%" }} /></div><span className="text-xs text-gray-400">{progress}%</span></div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  {cHistoric.length > 0 && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-6">Concluídos</p>}
                  {cHistoric.map(p => (
                    <Card key={p.id} className="p-4 opacity-70">
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium text-gray-600">{p.name}</p><p className="text-xs text-gray-400 mt-0.5">Concluído em: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p></div>
                        <Badge variant="success">Concluído</Badge>
                      </div>
                    </Card>
                  ))}
                  {cProjects.length === 0 && cHistoric.length === 0 && <p className="text-sm text-gray-400">Nenhum projeto registrado.</p>}
                </div>
              )}

              {clientDetailTab === "feedbacks" && (
                <div className="space-y-3">
                  {cFeedbacks.length === 0 && <p className="text-sm text-gray-400">Nenhum feedback registrado.</p>}
                  {cFeedbacks.map(fb => {
                    const relTask = fb.relatedTaskId ? tasks.find(t => t.id === fb.relatedTaskId) : null;
                    const isAssigning = assigningFb === fb.id;
                    const canAssign = fb.status === "pendente" && fb.type !== "Elogio";
                    const isElogio = fb.type === "Elogio";
                    const assignedTask = fb.assignedTaskId ? tasks.find(t => t.id === fb.assignedTaskId) : null;

                    return (
                      <Card key={fb.id} className={`overflow-hidden border-l-4 ${fb.type === "Elogio" ? "border-l-green-500" : fb.type === "Ajuste" ? "border-l-orange-500" : "border-l-blue-500"}`}>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={fb.type === "Elogio" ? "success" : fb.type === "Ajuste" ? "danger" : "warning"}>{fb.type}</Badge>
                                <Badge variant={fb.status === "pendente" ? "warning" : "success"}>{fb.status === "pendente" ? "Pendente" : "Atribuído"}</Badge>
                                {relTask && <Badge variant="purple">Sobre entrega</Badge>}
                                <span className="text-xs text-gray-400">{fb.date}</span>
                              </div>
                              <p className="text-sm text-gray-800">{fb.text}</p>
                              {relTask && <p className="text-xs text-gray-500 mt-1">Entrega: {relTask.title} (por {relTask.executorName})</p>}
                              {assignedTask && <p className="text-xs text-green-600 mt-1">Tarefa criada: {assignedTask.title} → {assignedTask.executorName}</p>}
                            </div>
                            {canAssign && !isAssigning && <Button size="sm" onClick={() => openAssign(fb)}>Atribuir</Button>}
                          </div>
                          {isElogio && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <textarea value={elogioNotes[fb.id] || ""} onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))} placeholder="O que aprendemos com esse elogio?" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50" />
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline" onClick={() => { const txt = elogioNotes[fb.id]?.trim() ? `[Elogio] ${fb.text} — ${elogioNotes[fb.id].trim()}` : `[Elogio] ${fb.text}`; archiveElogio(fb.id, txt, fb.clientId, fb.clientName); setElogioNotes(prev => { const n = { ...prev }; delete n[fb.id]; return n; }); }}><CheckCircle2 size={14} /> Registrar no histórico</Button>
                              </div>
                            </div>
                          )}
                        </div>
                        {isAssigning && (
                          <div className="border-t bg-gray-50 p-4 space-y-3">
                            <div><label className="text-xs font-medium text-gray-600">Título da tarefa</label><input value={assignForm.title} onChange={e => setAssignForm(p => ({ ...p, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-medium text-gray-600">Executor</label>
                                <select value={assignForm.executor} onChange={e => setAssignForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                                  <option value="">Selecione</option>
                                  {areaTeam.map(m => <option key={m.id} value={m.id}>{m.name} ({m.activeTasks} tarefas){relTask && relTask.executor === m.id ? " ★" : ""}</option>)}
                                </select>
                              </div>
                              <div><label className="text-xs font-medium text-gray-600">Prioridade</label><select value={assignForm.priority} onChange={e => setAssignForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900"><option>Alta</option><option>Média</option><option>Baixa</option></select></div>
                              <div><label className="text-xs font-medium text-gray-600">Prazo</label><input type="datetime-local" value={assignForm.deadline} onChange={e => setAssignForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
                            </div>
                            <div><label className="text-xs font-medium text-gray-600">Instruções para o executor <span className="text-gray-400 font-normal">(opcional)</span></label><textarea value={assignForm.instructions} onChange={e => setAssignForm(p => ({ ...p, instructions: e.target.value }))} placeholder="Contexto, orientações ou detalhes para o executor..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" /></div>
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
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Elogios para registrar</p>
                      {cElogios.map(fb => {
                        const proj = projects.find(p => p.id === fb.projectId);
                        return (
                          <Card key={fb.id} className="mb-3 border-l-4 border-l-green-500">
                            <div className="p-4">
                              <p className="text-sm text-gray-800 mb-1">"{fb.text}"</p>
                              {proj && <p className="text-xs text-gray-400 mb-3">Projeto: {proj.name} · {fb.date}</p>}
                              <textarea value={elogioNotes[fb.id] || ""} onChange={e => setElogioNotes(prev => ({ ...prev, [fb.id]: e.target.value }))} placeholder="O que aprendemos? Ex: 'Cliente valoriza agilidade — manter padrão'" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm min-h-[50px] focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50" />
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline" onClick={() => { const txt = elogioNotes[fb.id]?.trim() ? `[Elogio] ${fb.text} — ${elogioNotes[fb.id].trim()}` : `[Elogio] ${fb.text}`; archiveElogio(fb.id, txt, fb.clientId, fb.clientName); setElogioNotes(prev => { const n = { ...prev }; delete n[fb.id]; return n; }); }}><CheckCircle2 size={14} /> Registrar no histórico</Button>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Notas internas</p>
                  {(() => {
                    const dTagCfg = {
                      gostou: { label: "Gostou", color: "bg-green-100 text-green-700 border-green-300" },
                      nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300" },
                      comunicacao: { label: "Comunicação", color: "bg-blue-100 text-blue-700 border-blue-300" },
                      processo: { label: "Processo", color: "bg-purple-100 text-purple-700 border-purple-300" },
                      elogio: { label: "Elogio", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
                      erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300" },
                      insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
                    };
                    const activeTag = relNote.clientId === client.id ? relNote.tag : "";
                    return (<div className="mb-4">
                      <div className="flex gap-2 mb-2">
                        <input value={relNote.clientId === client.id ? relNote.text : ""} onChange={e => setRelNote({ clientId: client.id, text: e.target.value, tag: relNote.clientId === client.id ? relNote.tag : "" })} onKeyDown={e => { if (e.key === "Enter" && relNote.text.trim() && activeTag) { addClientNote(client.id, relNote.text.trim(), activeTag); setRelNote({ clientId: "", text: "", tag: "" }); } }} placeholder="Adicionar anotação sobre este cliente..." className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500">Categoria:</span>
                        {Object.entries(dTagCfg).map(([key, cfg]) => (
                          <button key={key} onClick={() => setRelNote(p => ({ ...p, clientId: client.id, tag: p.tag === key ? "" : key }))} className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all ${activeTag === key ? cfg.color + " ring-2 ring-offset-1 ring-gray-400" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"}`}>{cfg.label}</button>
                        ))}
                        <Button size="sm" className="ml-auto" onClick={() => { if (relNote.text.trim() && activeTag) { addClientNote(client.id, relNote.text.trim(), activeTag); setRelNote({ clientId: "", text: "", tag: "" }); } }} disabled={!relNote.text.trim() || !activeTag}>Salvar</Button>
                      </div>
                    </div>);
                  })()}
                  <div className="space-y-2">
                    {cNotes.length === 0 && <p className="text-sm text-gray-400">Nenhuma nota ainda.</p>}
                    {cNotes.map(n => (
                      <div key={n.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between"><span className="text-xs font-medium text-gray-500">{n.author}</span><span className="text-xs text-gray-400">{n.date}</span></div>
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${health === "good" ? "bg-green-100 text-green-700" : health === "warning" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                      {client.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{client.name}</h3>
                      <p className="text-xs text-gray-500">{cProjects.length} projetos ativos · Reunião: {new Date(client.nextMeeting).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {cFb.length > 0 && <Badge variant="warning">{cFb.length} pendência{cFb.length > 1 ? "s" : ""}</Badge>}
                    {cFb.length === 0 && <Badge variant="success">Sem pendências</Badge>}
                    <ChevronDown size={16} className="text-gray-400 -rotate-90" />
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
  const activeClients = [
    { id: "c5", name: "XP", logo: "XP" },
    { id: "c3", name: "Red Bull", logo: "RB" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"><ArrowLeft size={16} /> Voltar</button>
      <p className="text-sm text-gray-400 mb-1">Synapse · Portal do Cliente</p>
      <h1 className="text-3xl font-bold mb-2">Acessar como cliente</h1>
      <p className="text-gray-500 mb-8">Selecione o cliente para visualizar o portal com seus projetos.</p>
      <div className="grid grid-cols-2 gap-6">
        {activeClients.map(c => (
          <button key={c.id} onClick={() => onSelect(c.id)} className="group border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-900 hover:shadow-lg transition-all text-left">
            <div className="w-14 h-14 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform">{c.logo}</div>
            <h2 className="text-xl font-bold mb-1">{c.name}</h2>
            <p className="text-sm text-gray-500">Entrar no portal do cliente {c.name}</p>
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Histórico de Clientes</h1>
      </div>
      <p className="text-gray-500 mb-8">Base de conhecimento da agência — projetos, feedbacks, aprendizados e anotações internas de cada cliente.</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de clientes", value: clients.length, icon: <Users size={20} className="text-gray-400" /> },
          { label: "Clientes ativos", value: activeClientIds.size, icon: <CheckCircle2 size={20} className="text-green-400" /> },
          { label: "Projetos ativos", value: totalActive, icon: <FolderOpen size={20} className="text-blue-400" /> },
          { label: "Projetos concluídos", value: totalDone, icon: <CheckCircle2 size={20} className="text-gray-400" /> },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-gray-500">{s.label}</p>{s.icon}</div>
            <p className="text-3xl font-bold mt-1">{s.value}</p>
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
              <button onClick={() => handleExpand(c.id)} className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${isActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{c.name}</h3>
                      <Badge variant={isActive ? "success" : "default"}>{isActive ? "Ativo" : "Inativo"}</Badge>
                      <Badge variant={rel.variant}>{rel.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Contato: {c.contact} · Responsável: {c.responsible} · {data.allP.length} projetos · {data.clientLearnings.length + data.notes.length} registros</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {data.activeP.length > 0 && <Badge variant="info">{data.activeP.length} ativos</Badge>}
                  {data.doneP.length > 0 && <span className="text-sm text-gray-400">{data.doneP.length} concluídos</span>}
                  {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t">
                  <div className="flex border-b">
                    {[
                      { key: "projetos", label: "Projetos (" + data.allP.length + ")" },
                      { key: "conhecimento", label: "Base de conhecimento (" + (data.clientLearnings.length + data.notes.length) + ")" },
                    ].map(t => (
                      <button key={t.key} onClick={() => setClientTab(t.key)} className={`px-5 py-3 text-sm font-medium transition-colors ${clientTab === t.key ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>{t.label}</button>
                    ))}
                  </div>

                  <div className="p-5">
                    {clientTab === "projetos" && (
                      <div className="space-y-3">
                        {data.allP.length === 0 && <p className="text-sm text-gray-400">Nenhum projeto registrado.</p>}
                        {data.activeP.length > 0 && (
                          <>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Projetos ativos</p>
                            {data.activeP.map(p => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{p.name}</p>
                                  <p className="text-sm text-gray-500">Responsável: {p.responsible} · Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={p.priority === "Alta" ? "danger" : p.priority === "Média" ? "warning" : "success"}>{p.priority}</Badge>
                                  <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: p.progress + "%" }} /></div>
                                  <span className="text-xs text-gray-500 w-8">{p.progress}%</span>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {data.doneP.length > 0 && (
                          <>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-4">Projetos concluídos</p>
                            {data.doneP.map(p => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-600">{p.name}</p>
                                  <p className="text-sm text-gray-400">Responsável: {p.responsible} · Concluído em: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>
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
                        gostou: { label: "Gostou", color: "bg-green-100 text-green-700 border-green-300", border: "border-l-green-500", bg: "bg-green-50" },
                        nao_gostou: { label: "Não gostou", color: "bg-red-100 text-red-700 border-red-300", border: "border-l-red-500", bg: "bg-red-50" },
                        comunicacao: { label: "Comunicação", color: "bg-blue-100 text-blue-700 border-blue-300", border: "border-l-blue-500", bg: "bg-blue-50" },
                        processo: { label: "Processo", color: "bg-purple-100 text-purple-700 border-purple-300", border: "border-l-purple-500", bg: "bg-purple-50" },
                        elogio: { label: "Elogio", color: "bg-emerald-100 text-emerald-700 border-emerald-300", border: "border-l-emerald-500", bg: "bg-emerald-50" },
                        erro: { label: "Erro", color: "bg-red-100 text-red-700 border-red-300", border: "border-l-red-500", bg: "bg-red-50" },
                        insight: { label: "Insight", color: "bg-yellow-100 text-yellow-700 border-yellow-300", border: "border-l-yellow-500", bg: "bg-yellow-50" },
                      };
                      const getTag = (t) => tagConfig[t] || { label: t || "Geral", color: "bg-gray-100 text-gray-600 border-gray-300", border: "border-l-gray-300", bg: "bg-gray-50" };

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
                              const cfg = t === "todos" ? { label: "Todos", color: "bg-gray-100 text-gray-700 border-gray-300" } : getTag(t);
                              const count = t === "todos" ? entries.length : (tagCounts[t] || 0);
                              return (
                                <button key={t} onClick={() => setKbFilter(t)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${kbFilter === t ? (t === "todos" ? "bg-gray-900 text-white border-gray-900" : cfg.color + " border-current") : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"}`}>
                                  {cfg.label} ({count})
                                </button>
                              );
                            })}
                          </div>

                          {/* Timeline */}
                          {filtered.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">Nenhum registro {kbFilter !== "todos" ? `com tag "${getTag(kbFilter).label}"` : ""} ainda.</p>
                          ) : (
                            <div className="space-y-2">
                              {filtered.map((entry, i) => {
                                const cfg = getTag(entry._tag);
                                return (
                                  <div key={entry._type + "-" + entry.id} className={`p-4 rounded-lg border-l-4 ${cfg.border} ${cfg.bg}`}>
                                    <div className="flex items-center justify-between mb-1.5">
                                      <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>{cfg.label}</span>
                                        <span className="text-xs text-gray-500">{entry._author}</span>
                                      </div>
                                      <span className="text-xs text-gray-400">{entry._sort}</span>
                                    </div>
                                    {entry._title && <p className="font-medium text-sm">{entry._title}</p>}
                                    <p className="text-sm text-gray-700">{entry._text}</p>
                                    {entry._tags && entry._tags.length > 0 && <div className="flex gap-1 mt-2">{entry._tags.map((tag, ti) => <span key={ti} className="text-xs bg-white/60 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">{tag}</span>)}</div>}
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
        <button onClick={() => { setSelectedProject(null); setProjectTab("entregas"); setFeedbackTaskId(null); setFeedbackText(""); }} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft size={16} /> Voltar aos projetos</button>
        <p className="text-sm text-gray-400 mb-1">Synapse · Portal do Cliente · {client.name}</p>
        <h1 className="text-3xl font-bold mb-2">{p.name}</h1>
        <p className="text-sm text-gray-500 mb-6">Responsável: {p.responsible} · Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>

        {/* Progress bar */}
        <Card className="p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Progresso geral</p>
            <p className="text-lg font-bold">{progress}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          <div className="flex gap-6 mt-3 text-sm">
            {pendingApproval.length > 0 && <span className="text-gray-700 font-medium">{pendingApproval.length} para revisar</span>}
            <span className="text-green-600 font-medium">{approved.length} aprovada{approved.length !== 1 ? "s" : ""}</span>
            {inProgress > 0 && <span className="text-gray-400">{inProgress} em andamento</span>}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b">
          {[{ key: "entregas", label: "Entregas", count: pendingApproval.length }, { key: "aprovadas", label: "Aprovadas", count: approved.length }, { key: "feedback", label: "Feedback", count: projectFeedbacks.length }].map(tab => (
            <button key={tab.key} onClick={() => setProjectTab(tab.key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${projectTab === tab.key ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {tab.label} {tab.count > 0 && <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${projectTab === tab.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Tab: Entregas (pending approval) */}
        {projectTab === "entregas" && (
          <div>
            {pendingApproval.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle2 size={32} className="text-green-400 mx-auto mb-3" />
                <p className="text-gray-500">Todas as entregas foram revisadas.</p>
                <p className="text-sm text-gray-400 mt-1">{inProgress > 0 ? `${inProgress} entrega${inProgress > 1 ? "s" : ""} ainda em andamento.` : "Nenhuma pendência no momento."}</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingApproval.map(task => (
                  <Card key={task.id} className="overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg">{clientTitle(task.title)}</p>
                          <p className="text-sm text-gray-500 mt-0.5">Entregue em {new Date(task.deadline).toLocaleDateString("pt-BR")}</p>
                        </div>
                        {task.submittedLink && task.submittedLink.trim() && (
                          <Button variant="outline" size="sm" onClick={() => window.open(task.submittedLink, "_blank")}>
                            <ExternalLink size={12} /> Ver entrega
                          </Button>
                        )}
                      </div>
                      {clientDescription(task.description) && <p className="text-sm text-gray-600 mb-3">{clientDescription(task.description)}</p>}
                      {task.submittedFiles && task.submittedFiles.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 font-medium mb-1.5">Arquivos da entrega</p>
                          {task.submittedFiles.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 mb-1">
                              <Copy size={14} className="text-gray-400" />
                              <span className="text-sm flex-1 truncate">{f.name}</span>
                              {f.url && <a href={f.url} download={f.name} className="text-xs text-blue-600 hover:underline">Baixar</a>}
                            </div>
                          ))}
                        </div>
                      )}

                      {feedbackTaskId === task.id ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Seu feedback sobre esta entrega</p>
                          <textarea
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                            placeholder="Descreva o que gostaria de ajustar ou melhorar..."
                            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm min-h-[70px] focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                            autoFocus
                          />
                          <div className="flex gap-2 mt-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => { setFeedbackTaskId(null); setFeedbackText(""); }}>Cancelar</Button>
                            <button type="button" disabled={!feedbackText.trim()} onClick={() => { clientRejectTask(task.id, feedbackText.trim(), client.id, client.name, p.id); setFeedbackTaskId(null); setFeedbackText(""); }} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${feedbackText.trim() ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                              <Send size={12} /> Enviar feedback
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                          <button type="button" onClick={() => clientApproveTask(task.id)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium text-sm">
                            <CheckCircle2 size={16} /> Aprovar
                          </button>
                          <button type="button" onClick={() => setFeedbackTaskId(task.id)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-sm">
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
              <Card className="p-8 text-center text-gray-400">Nenhuma entrega aprovada ainda.</Card>
            ) : (
              <div className="space-y-2">
                {approved.map(task => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-green-500" />
                        <div>
                          <p className="font-medium text-sm">{clientTitle(task.title)}</p>
                          <p className="text-xs text-gray-400">{new Date(task.deadline).toLocaleDateString("pt-BR")}</p>
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
              <p className="text-sm font-medium text-gray-700 mb-3">Enviar feedback geral sobre o projeto</p>
              <div className="flex gap-3 mb-3">
                <select value={fbForm.type} onChange={e => setFbForm(prev => ({ ...prev, type: e.target.value }))} className="border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <option>Sugestão</option><option>Ajuste</option><option>Elogio</option><option>Problema</option>
                </select>
                <input value={fbForm.text} onChange={e => setFbForm(prev => ({ ...prev, text: e.target.value }))} placeholder="Escreva seu feedback..." className="flex-1 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
                <button type="button" disabled={!fbForm.text.trim()} onClick={() => { addFeedback({ projectId: p.id, clientId: client.id, clientName: client.name, date: new Date().toISOString().split("T")[0], type: fbForm.type, text: fbForm.text }); setFbForm({ type: "Sugestão", text: "" }); }} className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium ${fbForm.text.trim() ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                  <Send size={14} /> Enviar
                </button>
              </div>
            </Card>

            {projectFeedbacks.length === 0 ? (
              <Card className="p-6 text-center text-gray-400">Nenhum feedback enviado para este projeto.</Card>
            ) : (
              <div className="space-y-2">
                {projectFeedbacks.map(fb => (
                  <Card key={fb.id} className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={fb.type === "Elogio" ? "success" : fb.type === "Problema" ? "danger" : "warning"}>{fb.type}</Badge>
                      <Badge variant={fb.status === "pendente" ? "default" : "success"}>{fb.status === "pendente" ? "Enviado" : "Em tratamento"}</Badge>
                      <span className="text-xs text-gray-400">{fb.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{fb.text}</p>
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
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Voltar</button>
        <Button variant="outline" size="sm" onClick={onBack}>Sair do portal</Button>
      </div>
      <p className="text-sm text-gray-400 mb-1">Synapse · Portal do Cliente</p>
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {client.name}</h1>

      {/* Account Info */}
      <Card className="p-6 mb-6 border-l-4 border-l-green-600">
        <h3 className="font-bold mb-3">Sua conta na Synapse</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Seu gerente de conta</p>
            <p className="font-medium text-lg">{client.responsible}</p>
            <Button variant="outline" size="sm" className="mt-2"><MessageSquare size={14} /> WhatsApp direto</Button>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Próxima reunião</p>
            <p className="font-medium flex items-center gap-1"><Calendar size={16} /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")} às {new Date(client.nextMeeting).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setShowSchedule(!showSchedule)}>Reagendar</Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Projetos ativos</p>
            <p className="text-2xl font-bold text-green-600">{clientProjects.length}</p>
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
            <Card key={p.id} className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => { setSelectedProject(p); setProjectTab(pending > 0 ? "entregas" : "aprovadas"); }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    {pending > 0 && <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{pending} para revisar</span>}
                  </div>
                  <ChevronLeft size={20} className="text-gray-300 rotate-180" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{progress}% concluído</span>
                  <span>{approvedCount} aprovada{approvedCount !== 1 ? "s" : ""}</span>
                  {inProgress > 0 && <span>{inProgress} em andamento</span>}
                  <span className="ml-auto text-gray-400">Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</span>
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
  const areaTeam = team.filter(m => m.area === project.area);

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
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors rounded-xl">
          <span className="flex items-center gap-2 font-semibold text-gray-900"><Plus size={18} /> Criar nova tarefa neste projeto</span>
          {open ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>
        {open && (
          <div className="px-5 pb-5 space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Nome da tarefa</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Criar roteiro detalhado..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
              <div><label className="text-sm font-medium text-gray-700">Responsável</label>
                <select value={form.executor} onChange={e => setForm(p => ({ ...p, executor: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="">Selecione</option>
                  {areaTeam.map(m => <option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium text-gray-700">Prazo</label><input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
              <div><label className="text-sm font-medium text-gray-700">Prioridade</label>
                <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option>Alta</option><option>Média</option><option>Baixa</option>
                </select>
              </div>
              <div className="col-span-2"><label className="text-sm font-medium text-gray-700">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Descreva o que precisa ser feito..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Checklist de execução <span className="text-gray-400 font-normal">(opcional)</span></label>
              <p className="text-xs text-gray-400 mt-0.5 mb-2">Defina os passos que o executor deve seguir. Se deixar vazio, será gerado um checklist padrão.</p>
              {kbCheckItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <div className="h-4 w-4 rounded border border-gray-300 flex-shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">{item}</span>
                  <button type="button" onClick={() => setKbCheckItems(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <input value={kbNewCheck} onChange={e => setKbNewCheck(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleKbAddCheck(); } }} placeholder="Adicionar item..." className="flex-1 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <Button variant="outline" size="sm" onClick={handleKbAddCheck}>Adicionar</Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Insumos e referências <span className="text-gray-400 font-normal">(opcional)</span></label>
              <p className="text-xs text-gray-400 mt-0.5 mb-2">Anexe briefings, manuais ou referências úteis para o executor.</p>
              {kbFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 border border-gray-100 rounded-lg mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-green-700" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400">{f.type} · {f.size}</p>
                  </div>
                  <button type="button" onClick={() => setKbFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
              <input type="file" ref={kbFileRef} onChange={handleKbFileSelect} multiple style={{display: "none"}} />
              <button type="button" onClick={() => kbFileRef.current && kbFileRef.current.click()} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer">
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

function ProjectKanbanView({ projectId, onBack, onTaskClick, isClientView = false }) {
  const { projects, tasks, clients, team, addTask, deleteTask } = useContext(AppContext);
  const project = projects.find(p => p.id === projectId);
  if (!project) return <div className="text-center py-12 text-gray-400">Projeto não encontrado.</div>;

  const client = clients.find(c => c.id === project.clientId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);
  const doneCount = projectTasks.filter(t => t.status === "concluida").length;
  const progress = projectTasks.length > 0 ? Math.round((doneCount / projectTasks.length) * 100) : project.progress;

  const columns = [
    { key: "a_fazer", label: "A Fazer", headerColor: "bg-gray-100 text-gray-700", dotColor: "bg-gray-400" },
    { key: "em_execucao", label: "Em Execução", headerColor: "bg-blue-50 text-blue-700", dotColor: "bg-blue-500" },
    { key: "em_qa", label: "Em QA", headerColor: "bg-purple-50 text-purple-700", dotColor: "bg-purple-500" },
    { key: "devolvida", label: "Devolvida", headerColor: "bg-red-50 text-red-700", dotColor: "bg-red-500" },
    { key: "concluida", label: "Concluída", headerColor: "bg-green-50 text-green-700", dotColor: "bg-green-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"><ArrowLeft size={16} /> Voltar</button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <Badge variant="purple">Evento</Badge>
          </div>
          <p className="text-gray-500">Cliente: <strong>{project.client}</strong> · Responsável: <strong>{project.responsible}</strong> · Prazo: <strong>{new Date(project.deadline).toLocaleDateString("pt-BR")}</strong></p>
        </div>
        <Badge variant={project.priority === "Alta" ? "danger" : project.priority === "Média" ? "warning" : "success"}>{project.priority}</Badge>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total de tarefas</p>
          <p className="text-2xl font-bold">{projectTasks.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Concluídas</p>
          <p className="text-2xl font-bold text-green-600">{doneCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Progresso</p>
          <p className="text-2xl font-bold">{progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Em risco</p>
          <p className="text-2xl font-bold text-red-600">{projectTasks.filter(t => !["concluida"].includes(t.status) && new Date(t.deadline) < new Date(Date.now() + 86400000)).length}</p>
        </Card>
      </div>

      {!isClientView && <h2 className="text-xl font-bold mb-4">Quadro de tarefas</h2>}
      {isClientView && <h2 className="text-xl font-bold mb-4">Acompanhamento das entregas</h2>}

      <div className="grid grid-cols-5 gap-3" style={{ minHeight: "400px" }}>
        {columns.map(col => {
          const colTasks = projectTasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${col.headerColor}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                <span className="text-sm font-semibold">{col.label}</span>
                <span className="ml-auto text-xs font-bold bg-white bg-opacity-60 rounded-full px-2 py-0.5">{colTasks.length}</span>
              </div>
              <div className="space-y-2">
                {colTasks.map(task => (
                  <Card key={task.id} className="p-3 group relative" onClick={!isClientView && onTaskClick ? () => onTaskClick(task.id) : undefined}>
                    {!isClientView && (
                      <button onClick={(e) => { e.stopPropagation(); if (confirm(`Excluir tarefa "${task.title}"?`)) deleteTask(task.id); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50" title="Excluir tarefa">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 hover:text-red-500"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    )}
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-orange-500" : "bg-green-500"}`} />
                      <p className="text-sm font-medium leading-tight">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={10} /> {task.executorName}</span>
                      <span className="text-xs text-gray-400"><Clock size={10} className="inline" /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                    </div>
                    {task.feedbackOrigin && <Badge variant="accent" className="mt-2 text-[10px]">Feedback</Badge>}
                  </Card>
                ))}
                {colTasks.length === 0 && <p className="text-xs text-gray-300 text-center py-4">Nenhuma</p>}
              </div>
            </div>
          );
        })}
      </div>

      {!isClientView && (
        <KanbanCreateTask projectId={projectId} project={project} team={team} addTask={addTask} />
      )}

      {!isClientView && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Membros do projeto</h2>
          <div className="grid grid-cols-4 gap-3">
            {[...new Set(projectTasks.map(t => t.executor))].map(execId => {
              const execTasks = projectTasks.filter(t => t.executor === execId);
              const name = execTasks[0]?.executorName || "—";
              const done = execTasks.filter(t => t.status === "concluida").length;
              return (
                <Card key={execId} className="p-4">
                  <p className="font-medium mb-1">{name}</p>
                  <p className="text-sm text-gray-500">{execTasks.length} tarefa{execTasks.length !== 1 ? "s" : ""} · {done} concluída{done !== 1 ? "s" : ""}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${execTasks.length > 0 ? Math.round((done / execTasks.length) * 100) : 0}%` }} /></div>
                </Card>
              );
            })}
          </div>
        </>
      )}
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
      <h1 className="text-3xl font-bold mb-2">Trocar executor</h1>
      <p className="text-gray-500 mb-6">Selecione qual executor você quer simular para ver suas tarefas.</p>
      <div className="space-y-3">
        {executors.map(e => {
          const taskCount = tasks.filter(t => t.executor === e.id && t.status !== "concluida").length;
          return (
            <Card key={e.id} className={`p-5 cursor-pointer ${e.id === currentId ? "ring-2 ring-gray-900" : ""}`} onClick={() => onSelect(e.id, e.name)}>
              <div className="flex justify-between items-center">
                <div><p className="font-bold">{e.name}</p><p className="text-sm text-gray-500">{e.role} · Eventos</p></div>
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
// NOTIFICAÇÕES
// ============================
function NotificationPanel({ onClose, context, executorId }) {
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

  const priorityStyle = (p) => p === "danger" ? "bg-red-50 border-l-4 border-l-red-500 text-red-800"
    : p === "warning" ? "bg-orange-50 border-l-4 border-l-orange-400 text-orange-800"
    : "bg-blue-50 text-gray-700";

  const hasContent = smartAlerts.length > 0 || historyNotifications.length > 0;

  return (
    <div className="fixed top-16 right-6 w-[420px] bg-white rounded-xl shadow-xl border z-50 max-h-[480px] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-bold">Notificações</h3>
        <div className="flex gap-2">
          {smartAlerts.length > 0 && <button onClick={markAllRead} className="text-xs text-gray-500 hover:text-gray-700">Resolver todas</button>}
          <button onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      {smartAlerts.length > 0 && (
        <div className="border-b">
          <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Alertas</p>
          {smartAlerts.map(a => (
            <div key={a.id} className={`px-4 py-3 text-sm ${priorityStyle(a.priority)}`}>
              <div className="flex items-start gap-2">
                {a.priority === "danger" && <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />}
                {a.priority === "warning" && <Clock size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />}
                <p className="flex-1 font-medium">{a.text}</p>
                <button onClick={() => dismissSmartAlert(a.id, a.text, targetFilter, a.priority)} className="text-gray-400 hover:text-green-600 flex-shrink-0 mt-0.5" title="Resolver alerta"><CheckCircle2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {historyNotifications.length > 0 && (
        <div>
          <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            <span className="font-medium">Histórico ({historyNotifications.length})</span>
            {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showHistory && historyNotifications.map(n => (
            <div key={n.id} className="px-4 py-2.5 border-t text-sm flex items-start gap-3 text-gray-400">
              <div className="flex-1">
                <p>{n.text}</p>
                <p className="text-xs text-gray-300 mt-0.5">{n.date}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} className="text-gray-300 hover:text-red-400 flex-shrink-0 mt-0.5" title="Remover"><X size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {!hasContent && <p className="p-6 text-sm text-gray-400 text-center">Nenhuma notificação no momento.</p>}
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
  const [executorId, setExecutorId] = useState("t1");
  const [executorName, setExecutorName] = useState("Melissa Zambon");
  const [qaArea, setQaArea] = useState(null);
  const [liderArea, setLiderArea] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [clientPortalId, setClientPortalId] = useState("c5");
  const [viewHistory, setViewHistory] = useState([]);

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

  const handleProjectClick = (projectId) => {
    pushHistory();
    setSelectedProject(projectId);
    setView("project_detail");
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="h-1 bg-red-400 w-full" />
        <AppInner
          view={view} setView={handleSetView} goBack={goBack}
          selectedTask={selectedTask} setSelectedTask={setSelectedTask}
          selectedProject={selectedProject} setSelectedProject={setSelectedProject}
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
    </AppProvider>
  );
}

function AppInner({ view, setView, goBack, selectedTask, setSelectedTask, selectedProject, setSelectedProject, executorId, executorName, setExecutorId, setExecutorName, qaArea, setQaArea, liderArea, setLiderArea, showNotif, setShowNotif, clientPortalId, setClientPortalId, onProjectClick, pushHistory }) {
  const { notifications, getSmartAlerts } = useContext(AppContext);

  const isClientPortal = view === "experiencia_cliente";
  const isClientSelector = view === "client_selector";
  const isClientHub = view === "clientes";
  const isProjectDetail = view === "project_detail";
  const isQA = view.startsWith("qa");
  const isLider = view.startsWith("lider");

  // Determine current notification context
  const notifContext = isQA ? "qa" : isLider ? "lider" : isClientPortal ? "client" : "executor";
  const notifTarget = notifContext === "executor" ? "executor:" + executorId : notifContext;

  // Count: targeted notifications + smart alerts for executor

  const smartAlerts = notifContext === "executor" ? getSmartAlerts(executorId) : [];
  const unreadCount = smartAlerts.length;

  // Task click with history
  const handleTaskClick = (taskId) => {
    pushHistory();
    setSelectedTask(taskId);
  };

  const notifPanel = showNotif && <NotificationPanel onClose={() => setShowNotif(false)} context={notifContext} executorId={executorId} />;

  if (isProjectDetail && selectedProject) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
        {notifPanel}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ProjectKanbanView projectId={selectedProject} onBack={goBack} onTaskClick={handleTaskClick} />
        </div>
      </>
    );
  }

  if (isClientSelector) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
        {notifPanel}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ClientSelectorView onSelect={(cid) => { pushHistory(); setClientPortalId(cid); setView("experiencia_cliente"); }} onBack={goBack} />
        </div>
      </>
    );
  }

  if (isClientPortal) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
        {notifPanel}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ClientPortalView clientId={clientPortalId} onBack={goBack} />
        </div>
      </>
    );
  }

  if (isClientHub) {
    return (
      <>
        <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
        {notifPanel}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ClientHubView onBack={goBack} />
        </div>
      </>
    );
  }

  return (
    <>
      <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
      {notifPanel}
      <main className="max-w-7xl mx-auto px-6 py-8">
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
          <QAPortalView area="eventos" onBack={goBack} onViewErrors={() => setView("qa_eventos_errors")} onProjectClick={(projectId) => { setView("project_kanban_" + projectId); }} />
        )}
        {!selectedTask && view.includes("qa_") && view.includes("_errors") && (
          <QAErrorsView area="eventos" onBack={goBack} />
        )}
        {!selectedTask && (view === "lider_selector" || view === "lider_eventos") && (
          <LiderPortalView
            area="eventos"
            onBack={goBack}
            onViewClients={() => setView("clientes")}
            onSimulateClient={() => { pushHistory(); setView("client_selector"); }}
            onProjectClick={onProjectClick}
            onViewAsClient={(cid) => { pushHistory(); setClientPortalId(cid); setView("experiencia_cliente"); }}
          />
        )}
      </main>
    </>
  );
}

export default App
