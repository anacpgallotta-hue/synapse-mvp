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
  { id: "c1", name: "Ambev", contact: "João Mendes", whatsapp: "+5511999990001", responsible: "Ana Silva", nextMeeting: "2026-04-22T15:00", relationship: "estável" },
  { id: "c2", name: "Hotmart", contact: "Camila Torres", whatsapp: "+5511999990002", responsible: "Ana Silva", nextMeeting: "2026-04-25T10:00", relationship: "estável" },
  { id: "c3", name: "Red Bull", contact: "Lucas Braga", whatsapp: "+5511999990003", responsible: "Ana Silva", nextMeeting: "2026-04-28T14:00", relationship: "estável" },
  { id: "c4", name: "Seara", contact: "Fernanda Lopes", whatsapp: "+5511999990004", responsible: "Ana Silva", nextMeeting: "2026-05-02T11:00", relationship: "atenção" },
  { id: "c5", name: "XP", contact: "Ricardo Alves", whatsapp: "+5511999990005", responsible: "Ana Silva", nextMeeting: "2026-04-30T15:00", relationship: "estável" },
];

const initialProjects = [
  { id: "p1", name: "Gala de Premiação Anual", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Melissa Zambon", deadline: "2026-05-15", progress: 65 },
  { id: "p2", name: "Festival de Esportes Radicais", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Maria Eduarda Vittori", deadline: "2026-05-28", progress: 30 },
  { id: "p3", name: "Convenção Anual de Vendas", clientId: "c1", client: "Ambev", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Carolina Guimarães", deadline: "2026-06-10", progress: 40 },
  { id: "p4", name: "Summit Digital 2026", clientId: "c2", client: "Hotmart", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Samara Aboultaif", deadline: "2026-06-20", progress: 20 },
  { id: "p5", name: "Happy Hour Corporativo", clientId: "c1", client: "Ambev", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Melissa Zambon", deadline: "2026-06-01", progress: 15 },
  { id: "p6", name: "Lançamento de Produto", clientId: "c4", client: "Seara", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Carolina Guimarães", deadline: "2026-05-25", progress: 50 },
  { id: "p7", name: "Premiação Top Performers", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Maria Eduarda Vittori", deadline: "2026-07-10", progress: 10 },
  { id: "p10", name: "Operações", clientId: "c5", client: "XP", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Samara Aboultaif", deadline: "2026-05-30", progress: 0 },
  { id: "p8", name: "Workshop Inovação", clientId: "c2", client: "Hotmart", type: "Evento", area: "eventos", status: "em_execucao", priority: "Baixa", responsible: "Samara Aboultaif", deadline: "2026-07-15", progress: 5 },
  { id: "p9", name: "Ativação de Marca - Evento Gastronômico", clientId: "c3", client: "Red Bull", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Melissa Zambon", deadline: "2026-06-15", progress: 25 },
];

const initialTasks = [
  { id: "tk5", title: "Organizar reunião de alinhamento pré-evento", projectId: "p1", project: "Gala de Premiação Anual", executor: "t2", executorName: "Maria Eduarda Vittori", priority: "Alta", status: "a_fazer", area: "eventos", deadline: "2026-04-30T12:00", description: "Agendar e organizar reunião de alinhamento com todos os stakeholders antes do evento", checklist: [{ text: "Definir pauta", done: false }, { text: "Enviar convites", done: false }, { text: "Preparar material", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk6", title: "Montar checklist de fornecedores", projectId: "p3", project: "Convenção Anual de Vendas", executor: "t3", executorName: "Carolina Guimarães", priority: "Alta", status: "em_execucao", area: "eventos", deadline: "2026-04-18T17:00", description: "Listar e confirmar todos os fornecedores para o evento", checklist: [{ text: "Buffet", done: true }, { text: "Som e luz", done: false }, { text: "Decoração", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk7", title: "Criar cronograma do evento", projectId: "p3", project: "Convenção Anual de Vendas", executor: "t4", executorName: "Samara Aboultaif", priority: "Média", status: "a_fazer", area: "eventos", deadline: "2026-04-25T12:00", description: "Desenvolver cronograma detalhado hora a hora do evento", checklist: [{ text: "Definir programação", done: false }, { text: "Alocar espaços", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
];

const initialLearnings = [
  { id: "l1", title: "Checklist de fornecedores incompleto", description: "Item reprovado em QA: fornecedor de som e iluminação não tinha contrato confirmado. Precisou ser refeito antes da entrega ao cliente.", client: "Ambev", date: "2025-12-18", type: "erro", origin: "QA", tags: ["fornecedores", "qa", "checklist"], area: "eventos" },
];

const initialFeedbacks = [
  { id: "f2", projectId: "p2", clientId: "c3", clientName: "Red Bull", type: "Sugestão", text: "Incluir opção de atividade alternativa para participantes com menor preparo físico.", date: "2026-04-14", status: "pendente", assignedTaskId: null },
];

// ============================
// CONTEXT
// ============================
const AppContext = createContext(null);

function AppProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [projects] = useState(initialProjects);
  const [clients] = useState(initialClients);
  const [team] = useState(initialTeam);
  const [learnings, setLearnings] = useState(initialLearnings);
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  // Notifications: target = "executor:t1", "qa", "lider", "client:c5"
  // priority = "info" | "warning" | "danger"
  const [notifications, setNotifications] = useState([]);

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
      if (t.status === "devolvida") {
        alerts.push({ id: "smart-dev-" + t.id, text: `QA devolveu "${t.title}" — ${t.qaComment}`, priority: "danger", date: t.deadline, isDevolvida: true, taskId: t.id });
      }
      if (diffHours < 0 && t.status !== "devolvida") {
        alerts.push({ id: "smart-late-" + t.id, text: `Atrasada: "${t.title}" — prazo era ${deadline.toLocaleDateString("pt-BR")}`, priority: "danger", date: t.deadline });
      } else if (diffHours >= 0 && diffHours < 48 && t.status !== "devolvida") {
        alerts.push({ id: "smart-risk-" + t.id, text: `Em risco: "${t.title}" — prazo em ${Math.round(diffHours)}h`, priority: "warning", date: t.deadline });
      }
    });
    return alerts.sort((a, b) => (a.priority === "danger" ? 0 : 1) - (b.priority === "danger" ? 0 : 1));
  }, [tasks]);

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
      return prev.map(f => f.id === feedbackId ? { ...f, status: "atribuido", assignedTaskId: newTask.id } : f);
    });
  }, [notify]);

  const addLearning = useCallback((learning) => {
    setLearnings(prev => [...prev, { ...learning, id: "l" + Date.now() }]);
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
    <AppContext.Provider value={{ tasks, projects, clients, team, learnings, feedbacks, notifications, addTask, updateTaskStatus, submitToQA, approveTask, rejectTask, toggleChecklist, addFeedback, assignFeedbackAsTask, addLearning, resubmitTask, revertFromQA, revertFromCompleted, dismissNotification, getTeamWithLoad, getSmartAlerts, setNotifications }}>
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
    { label: "Clientes", view: "clientes" },
    { label: "Portal do Cliente", view: "experiencia_cliente" },
    { label: "Trocar executor", view: "trocar_executor" },
  ];

  const isQA = currentView.startsWith("qa");
  const isLider = currentView.startsWith("lider");
  const isProjectDetail = currentView === "project_detail";

  const isActive = (itemView) => {
    if (itemView === "executor" && (currentView === "executor" || isProjectDetail)) return true;
    if (itemView === "qa_selector" && isQA) return true;
    if (itemView === "lider_selector" && isLider) return true;
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
  const { tasks } = useContext(AppContext);
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
                    <Card key={task.id} className="p-3" onClick={() => onTaskClick(task.id)}>
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
          <Button variant="outline" size="sm" onClick={() => { revertFromQA(taskId); }}>← Retirar do QA e voltar a editar</Button>
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
        <p className="text-sm text-gray-500 mb-1">Descrição</p>
        <p className="text-sm text-gray-700">{task.description}</p>
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

function QAPortalView({ area, onBack, onViewErrors }) {
  const { tasks, approveTask, rejectTask, revertFromCompleted } = useContext(AppContext);
  const [comments, setComments] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [tab, setTab] = useState("pendentes");
  const pendingTasks = tasks.filter(t => t.area === area && t.status === "em_qa");
  const historyTasks = tasks.filter(t => t.area === area && t.status === "concluida").slice(0, 5);
  const rejectedTasks = tasks.filter(t => t.area === area && t.status === "devolvida").slice(0, 5);
  const atRisk = tasks.filter(t => t.area === area && ["em_execucao", "a_fazer"].includes(t.status) && new Date(t.deadline) < new Date(Date.now() + 86400000));

  const statusConfig = {
    em_qa: { label: "Em QA", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
    devolvida: { label: "Devolvida", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
    concluida: { label: "Aprovada", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Calendar size={28} className="text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">QA Eventos</h1>
          </div>
          <p className="text-gray-500">Revise entregas, devolva com comentários claros e gere aprendizados para o time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewErrors}><Sparkles size={14} /> Erros & aprendizados</Button>
          <Button variant="outline" size="sm" onClick={onBack}><ArrowLeft size={14} /> Voltar</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-lg bg-purple-50 flex items-center justify-center"><Clock size={18} className="text-purple-600" /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingTasks.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Pendentes de revisão</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center"><AlertTriangle size={18} className="text-red-500" /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{atRisk.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Em risco de atraso</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle2 size={18} className="text-green-600" /></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{historyTasks.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Aprovados recentes</p>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          ["pendentes", `Pendentes (${pendingTasks.length})`, "purple"],
          ["devolvidos", `Devolvidos (${rejectedTasks.length})`, "red"],
          ["aprovados", `Aprovados (${historyTasks.length})`, "green"],
        ].map(([key, label, color]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${tab === key
              ? (color === "purple" ? "bg-purple-50 text-purple-700 border-purple-200" : color === "red" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200")
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "pendentes" && (
        <div>
          {pendingTasks.length === 0 ? (
            <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma tarefa pendente de QA nesta área.</p></Card>
          ) : pendingTasks.map(task => {
            const isExpanded = expandedId === task.id;
            return (
            <Card key={task.id} className="mb-4 overflow-hidden">
              <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`h-3 w-3 rounded-full mt-1.5 flex-shrink-0 ${task.priority === "Alta" ? "bg-red-500" : task.priority === "Média" ? "bg-orange-500" : "bg-green-500"}`} />
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-tight">{task.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                        <span>{task.project}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {task.executorName}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${task.priority === "Alta" ? "bg-red-50 text-red-700 border-red-200" : task.priority === "Média" ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                      {task.priority}
                    </span>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Instruções da tarefa</p>
                          <Card className="p-4">
                            <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
                            {task.feedbackOrigin && (
                              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-xs font-semibold text-green-700 mb-1">Originado de feedback do cliente</p>
                                <p className="text-sm text-gray-700">{task.feedbackOrigin.text}</p>
                              </div>
                            )}
                          </Card>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Checklist de execução</p>
                          <Card className="p-4">
                            <div className="space-y-2">
                              {task.checklist.map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                  <div className={`h-4 w-4 rounded flex items-center justify-center text-xs flex-shrink-0 ${item.done ? "bg-green-600 text-white" : "border border-gray-300"}`}>{item.done ? "✓" : ""}</div>
                                  <span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{task.checklist.filter(c => c.done).length} de {task.checklist.length} concluídos</span>
                                <div className="w-20 bg-gray-200 rounded-full h-1.5"><div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(task.checklist.filter(c => c.done).length / task.checklist.length) * 100}%` }} /></div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Entrega do executor</p>
                          <Card className="p-4">
                            {(task.submittedFiles && task.submittedFiles.length > 0) ? (
                              <div className="space-y-2">
                                {task.submittedFiles.map((f, i) => (
                                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-purple-600" /></div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">{f.name}</p>
                                      <p className="text-xs text-gray-500">{f.type ? f.type + " · " : ""}{f.size}</p>
                                    </div>
                                    <a href={f.url} download={f.name} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer flex-shrink-0" style={{textDecoration:"none"}}>
                                      <ExternalLink size={12} /> Abrir
                                    </a>
                                  </div>
                                ))}
                                {task.submittedLink && task.submittedLink.trim() && (
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"><ExternalLink size={16} className="text-gray-500" /></div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900">Link de entrega</p>
                                      <p className="text-xs text-gray-500 truncate">{task.submittedLink}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => { window.open(task.submittedLink, "_blank"); }}>Abrir</Button>
                                  </div>
                                )}
                              </div>
                            ) : task.submittedLink && task.submittedLink.trim() ? (
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0"><ExternalLink size={16} className="text-purple-600" /></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">Link de entrega</p>
                                  <p className="text-xs text-gray-500 truncate">{task.submittedLink}</p>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => { window.open(task.submittedLink, "_blank"); }}>Abrir</Button>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400 italic">Nenhum arquivo foi anexado pelo executor.</p>
                            )}
                          </Card>
                        </div>

                        {task.attachments.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Insumos e referências</p>
                            <Card className="p-4">
                              <div className="space-y-2">
                                {task.attachments.map((a, i) => (
                                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"><FolderOpen size={16} className="text-gray-500" /></div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900">{a.name}</p>
                                      <p className="text-xs text-gray-400">{a.type}{a.size ? ` · ${a.size}` : ""}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => { if (a.url) { window.open(a.url, "_blank"); } else { alert("Arquivo de exemplo: " + a.name + "\nEm produção, abriria o arquivo real."); } }}>Abrir</Button>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          </div>
                        )}
                      </div>
                    </div>

                    <Card className="p-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Revisão e devolutiva</p>
                      <textarea value={comments[task.id] || ""} onChange={e => setComments(prev => ({ ...prev, [task.id]: e.target.value }))} placeholder="Escreva o que precisa ser ajustado, elogie o que ficou bom, ou aprove diretamente..." className="w-full border border-gray-200 rounded-lg p-3 text-sm min-h-[80px] mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50" />
                      <div className="flex gap-3">
                        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors"
                          onClick={() => { approveTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); setExpandedId(null); }}>
                          <CheckCircle2 size={16} /> Aprovar e concluir
                        </button>
                        <button
                          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${comments[task.id]?.trim() ? "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100" : "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                          onClick={() => {
                            if (!comments[task.id]?.trim()) {
                              alert("Escreva um comentário antes de devolver a tarefa.");
                              return;
                            }
                            rejectTask(task.id, comments[task.id]);
                            setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; });
                            setExpandedId(null);
                          }}>
                          <ArrowLeft size={16} /> Devolver para execução
                        </button>
                      </div>
                      {!comments[task.id]?.trim() && <p className="text-xs text-orange-500 mt-3 flex items-center gap-1"><AlertTriangle size={12} /> Escreva um comentário para poder devolver a tarefa ao executor.</p>}
                    </Card>
                  </div>
                </div>
              )}
            </Card>
            );
          })}
        </div>
      )}

      {tab === "devolvidos" && (
        <div>
          {rejectedTasks.length === 0 ? (
            <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma tarefa devolvida recentemente.</p></Card>
          ) : rejectedTasks.map(task => (
            <Card key={task.id} className="p-5 mb-3">
              <div className="flex items-start gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border border-red-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Devolvida
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{task.project} · {task.executorName}</p>
                  {task.qaComment && <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-100"><p className="text-sm text-red-700">{task.qaComment}</p></div>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "aprovados" && (
        <div>
          {historyTasks.length === 0 ? (
            <Card className="p-12 text-center"><p className="text-gray-400">Nenhuma tarefa aprovada ainda.</p></Card>
          ) : historyTasks.map(task => (
            <Card key={task.id} className="p-5 mb-3">
              <div className="flex items-start gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <button onClick={() => revertFromCompleted(task.id)} className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded border border-gray-200 hover:border-red-300 transition-colors">Reverter aprovação</button>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Aprovada
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{task.project} · {task.executorName} · {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function QAErrorsView({ area, onBack }) {
  const { learnings, addLearning } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", client: "", type: "erro", origin: "QA", tags: "" });
  const areaLearnings = learnings.filter(l => l.area === area);

  const handleAdd = () => {
    addLearning({ ...form, tags: form.tags.split(",").map(t => t.trim()), date: new Date().toISOString().split("T")[0], area });
    setForm({ title: "", description: "", client: "", type: "erro", origin: "QA", tags: "" });
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"><ArrowLeft size={16} /> Voltar ao QA</button>
      <div className="flex items-center gap-3 mb-1">
        <Sparkles size={28} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">Erros & Aprendizados</h1>
      </div>
      <p className="text-gray-500 mb-6">Base viva de aprendizados do squad de Eventos. Consulte antes de planejar, revisar ou entregar.</p>

      <Card className="mb-6">
        <button onClick={() => setShowForm(!showForm)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors rounded-xl">
          <span className="flex items-center gap-2 font-semibold text-gray-900"><Plus size={18} /> Registrar novo aprendizado</span>
          {showForm ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </button>
        {showForm && (
          <div className="px-5 pb-5 space-y-4 border-t pt-4">
            <div><label className="text-sm font-medium text-gray-700">Título</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Ex: Roteiro sem informações de transfer..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
            <div><label className="text-sm font-medium text-gray-700">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Descreva o erro ou aprendizado em detalhes..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700">Cliente</label><input value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))} placeholder="Nome do cliente" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
              <div><label className="text-sm font-medium text-gray-700">Tags (separar por vírgula)</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="roteiro, logística, prazo" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900" /></div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={handleAdd}>Salvar aprendizado</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </div>
        )}
      </Card>

      <p className="text-sm text-gray-500 mb-4">{areaLearnings.length} registro{areaLearnings.length !== 1 ? "s" : ""}</p>
      {areaLearnings.map(l => (
        <Card key={l.id} className="p-5 mb-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5"><AlertTriangle size={18} className="text-orange-500" /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{l.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{l.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {l.client && <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-200">{l.client}</span>}
                {l.date && <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-500 border border-gray-200">{l.date}</span>}
                {l.tags.filter(Boolean).map((tag, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-orange-50 text-orange-600 border border-orange-200">{tag}</span>)}
              </div>
            </div>
          </div>
        </Card>
      ))}
      {areaLearnings.length === 0 && <Card className="p-12 text-center"><p className="text-gray-400">Nenhum aprendizado registrado ainda.</p></Card>}
    </div>
  );
}

// ============================
// LÍDER VIEWS
// ============================
// LiderSquadSelector removed — only eventos squad exists now

function LiderPortalView({ area, onBack, onViewClients, onSimulateClient, onProjectClick, onViewAsClient }) {
  const { projects, tasks, feedbacks, clients, addTask, assignFeedbackAsTask, getTeamWithLoad, team: rawTeam } = useContext(AppContext);
  const [tab, setTab] = useState("geral");
  const [showCreate, setShowCreate] = useState(false);
  const [feedFilter, setFeedFilter] = useState("pendentes");
  const [form, setForm] = useState({ title: "", projectId: "", executor: "", deadline: "", priority: "Média", description: "" });
  const [createFiles, setCreateFiles] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [newCheckItem, setNewCheckItem] = useState("");
  const createFileRef = useRef(null);

  const areaProjects = projects.filter(p => p.area === area);
  const areaTeam = getTeamWithLoad(area);
  const areaFeedbacks = feedbacks.filter(f => areaProjects.some(p => p.id === f.projectId));
  const pendingFeedbacks = areaFeedbacks.filter(f => f.status === "pendente");
  const assignedFeedbacks = areaFeedbacks.filter(f => f.status === "atribuido");

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

  const handleAssignFeedback = (fbId) => {
    const fb = feedbacks.find(f => f.id === fbId);
    const proj = projects.find(p => p.id === fb?.projectId);
    if (!fb || !proj) return;
    const executor = areaTeam.find(m => m.role === "Executor" && m.activeTasks <= 3) || areaTeam.find(m => m.role === "Executor");
    if (!executor) return;
    assignFeedbackAsTask(fbId, {
      title: `[Feedback] ${fb.text.substring(0, 50)}...`,
      projectId: fb.projectId,
      project: proj.name,
      executor: executor.id,
      executorName: executor.name,
      priority: "Alta",
      area,
      deadline: new Date(Date.now() + 3 * 86400000).toISOString(),
      description: `Feedback do cliente: ${fb.text}`,
      checklist: [{ text: "Analisar feedback", done: false }, { text: "Implementar ajuste", done: false }],
      attachments: [],
    });
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
        <Calendar size={28} className="text-orange-600" />
        <h1 className="text-3xl font-bold">Portal Eventos</h1>
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

          <h2 className="text-xl font-bold mb-4">Aguardando atribuição</h2>
          <div className="flex gap-2 mb-4">
            <Button variant={feedFilter === "pendentes" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("pendentes")}>Pendentes</Button>
            <Button variant={feedFilter === "atribuidos" ? "default" : "outline"} size="sm" onClick={() => setFeedFilter("atribuidos")}>Atribuídos</Button>
          </div>
          {feedFilter === "pendentes" && pendingFeedbacks.length === 0 && <Card className="p-8 text-center text-gray-400 mb-8">Nenhum feedback pendente de atribuição com esses filtros</Card>}
          {feedFilter === "pendentes" && pendingFeedbacks.map(fb => (
            <Card key={fb.id} className="p-5 mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="warning" className="mb-2">{fb.type}</Badge>
                  <p className="text-sm text-gray-700 mb-1">{fb.text}</p>
                  <p className="text-xs text-gray-400">Cliente: {fb.clientName} · {fb.date}</p>
                </div>
                <Button size="sm" onClick={() => handleAssignFeedback(fb.id)}>Atribuir como tarefa</Button>
              </div>
            </Card>
          ))}
          {feedFilter === "atribuidos" && assignedFeedbacks.map(fb => (
            <Card key={fb.id} className="p-5 mb-3">
              <Badge variant="success" className="mb-2">Atribuído</Badge>
              <p className="text-sm text-gray-700 mb-1">{fb.text}</p>
              <p className="text-xs text-gray-400">Cliente: {fb.clientName} · {fb.date}</p>
            </Card>
          ))}

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
                  <div><label className="text-sm font-medium text-gray-700">Projeto</label>
                    <select value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value }))} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option value="">Selecione um projeto</option>
                      {areaProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
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
        return (
        <>
          <h2 className="text-xl font-bold mb-2">Gestão de relacionamento com clientes</h2>
          <p className="text-gray-500 text-sm mb-6">Acompanhe o status de cada cliente, feedbacks recentes e gerencie o relacionamento.</p>

          {areaClients.map(client => {
            const clientProjects = areaProjects.filter(p => p.clientId === client.id);
            const clientFeedbacks = feedbacks.filter(f => clientProjects.some(p => p.id === f.projectId));
            const pendingFb = clientFeedbacks.filter(f => f.status === "pendente");
            const approvedTasks = tasks.filter(t => clientProjects.some(p => p.id === t.projectId) && t.status === "concluida");
            const totalTasks = tasks.filter(t => clientProjects.some(p => p.id === t.projectId));
            const satisfaction = pendingFb.length === 0 && approvedTasks.length > 0 ? "positivo" : pendingFb.length >= 2 ? "atenção" : "neutro";

            return (
              <Card key={client.id} className="mb-6 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{client.name}</h3>
                        <Badge variant={client.relationship === "estável" ? "success" : client.relationship === "atenção" ? "danger" : "success"}>
                          {client.relationship === "estável" ? "Relacionamento estável" : client.relationship === "atenção" ? "Requer atenção" : "Excelente"}
                        </Badge>
                        <Badge variant={satisfaction === "positivo" ? "success" : satisfaction === "atenção" ? "danger" : "default"}>
                          Satisfação: {satisfaction}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Contato: {client.contact} · Responsável: {client.responsible}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><MessageSquare size={14} /> WhatsApp</Button>
                      <Button variant="outline" size="sm" onClick={() => onViewAsClient && onViewAsClient(client.id)}><ExternalLink size={14} /> Ver como cliente</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
                  <div className="p-4 border-r border-gray-100 text-center">
                    <p className="text-2xl font-bold">{clientProjects.length}</p>
                    <p className="text-xs text-gray-500">Projetos ativos</p>
                  </div>
                  <div className="p-4 border-r border-gray-100 text-center">
                    <p className="text-2xl font-bold">{approvedTasks.length}/{totalTasks.length}</p>
                    <p className="text-xs text-gray-500">Tarefas concluídas</p>
                  </div>
                  <div className="p-4 border-r border-gray-100 text-center">
                    <p className="text-2xl font-bold text-orange-600">{pendingFb.length}</p>
                    <p className="text-xs text-gray-500">Feedbacks pendentes</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-sm font-medium"><Calendar size={12} className="inline" /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")}</p>
                    <p className="text-xs text-gray-500">Próxima reunião</p>
                  </div>
                </div>

                {clientFeedbacks.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold mb-3">Feedbacks recentes</p>
                    {clientFeedbacks.slice(0, 3).map(fb => (
                      <div key={fb.id} className="flex items-start gap-3 py-2">
                        <Badge variant={fb.status === "pendente" ? "warning" : "success"} className="mt-0.5">{fb.status === "pendente" ? "Pendente" : "Atribuído"}</Badge>
                        <div>
                          <p className="text-sm text-gray-700">{fb.text}</p>
                          <p className="text-xs text-gray-400">{fb.type} · {fb.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4">
                  <p className="text-sm font-semibold mb-2">Projetos</p>
                  <div className="flex flex-wrap gap-2">
                    {clientProjects.map(p => (
                      <span key={p.id} className="text-sm px-3 py-1 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200" onClick={() => onProjectClick && onProjectClick(p.id)}>
                        {p.name} <Badge variant="info" className="ml-1">{p.type}</Badge>
                      </span>
                    ))}
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
function ClientHubView({ onBack }) {
  const { clients, projects } = useContext(AppContext);
  const totalActive = projects.filter(p => p.status === "em_execucao").length;
  const totalDone = projects.filter(p => p.status === "concluido").length;

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft size={16} /> Voltar</button>
      <div className="flex items-center gap-3 mb-2">
        <Users size={32} className="text-green-600" />
        <h1 className="text-3xl font-bold">Hub de Clientes</h1>
      </div>
      <p className="text-gray-500 mb-8">Acompanhe todos os clientes, projetos ativos e histórico de trabalhos.</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de clientes", value: clients.length, icon: <Users size={20} className="text-gray-400" /> },
          { label: "Projetos ativos", value: totalActive, icon: <FolderOpen size={20} className="text-gray-400" /> },
          { label: "Projetos concluídos", value: totalDone, icon: <CheckCircle2 size={20} className="text-green-400" /> },
          { label: "Parcerias excelentes", value: clients.filter(c => c.relationship === "excelente").length, icon: <CheckCircle2 size={20} className="text-green-400" /> },
        ].map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between"><p className="text-sm text-gray-500">{s.label}</p>{s.icon}</div>
            <p className="text-3xl font-bold mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      <div className="grid grid-cols-3 gap-4">
        {clients.map(c => {
          const activeProjects = projects.filter(p => p.clientId === c.id && p.status === "em_execucao");
          const doneProjects = projects.filter(p => p.clientId === c.id && p.status === "concluido");
          return (
            <Card key={c.id} className="p-5">
              <h3 className="font-bold text-lg mb-1">{c.name}</h3>
              <p className="text-sm text-gray-500 mb-3">Contato: {c.contact}</p>
              <div className="flex justify-between text-sm mb-1"><span>Projetos ativos:</span><Badge variant="info">{activeProjects.length} em andamento</Badge></div>
              <div className="flex justify-between text-sm mb-4"><span>Concluídos:</span><span className="text-gray-500">{doneProjects.length} projetos</span></div>
              <hr className="mb-3" />
              <Badge variant={c.relationship === "estável" ? "success" : c.relationship === "atenção" ? "danger" : "success"}>
                {c.relationship === "estável" ? "Relacionamento estável" : c.relationship === "atenção" ? "Requer atenção" : "Parceria excelente"}
              </Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ClientPortalView({ clientId, onBack, onProjectClick }) {
  const { clients, projects, tasks, feedbacks, addFeedback } = useContext(AppContext);
  const client = clients.find(c => c.id === clientId) || clients[0];
  const clientProjects = projects.filter(p => p.clientId === client.id);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fbForm, setFbForm] = useState({ projectId: "", type: "Ajuste", text: "" });
  const [expandedProject, setExpandedProject] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [inlineFbProject, setInlineFbProject] = useState(null);

  const filtered = clientProjects;

  const handleSendFeedback = () => {
    if (!fbForm.projectId || !fbForm.text.trim()) return;
    addFeedback({ ...fbForm, clientId: client.id, clientName: client.name, date: new Date().toISOString().split("T")[0] });
    setFbForm({ projectId: "", type: "Ajuste", text: "" });
    setShowFeedback(false);
  };

  // Client only sees approved deliverables
  const getApprovedDeliverables = (projectId) => tasks.filter(t => t.projectId === projectId && t.status === "concluida");
  const getInProgressCount = (projectId) => tasks.filter(t => t.projectId === projectId && t.status !== "concluida").length;
  const myFeedbacks = feedbacks.filter(f => clientProjects.some(p => p.id === f.projectId));

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

      {/* Projects */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Seus projetos</h2>
        <p className="text-sm text-gray-500">{clientProjects.length} projeto{clientProjects.length !== 1 ? "s" : ""} ativo{clientProjects.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="space-y-4 mb-8">
        {filtered.map(p => {
          const approved = getApprovedDeliverables(p.id);
          const inProgress = getInProgressCount(p.id);
          const allTasks = tasks.filter(t => t.projectId === p.id);
          const progress = allTasks.length > 0 ? Math.round((approved.length / allTasks.length) * 100) : p.progress;
          const isExpanded = expandedProject === p.id;

          return (
            <Card key={p.id} className="overflow-hidden">
              <div className="p-5 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedProject(isExpanded ? null : p.id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <Badge variant="purple">Evento</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Responsável: {p.responsible} · Prazo: {new Date(p.deadline).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold">{progress}%</p>
                      <p className="text-xs text-gray-400">concluído</p>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="text-green-600 font-medium">{approved.length} entrega{approved.length !== 1 ? "s" : ""} aprovada{approved.length !== 1 ? "s" : ""}</span>
                  {inProgress > 0 && <span className="text-gray-500">{inProgress} em andamento</span>}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 p-5 bg-gray-50">
                  <h4 className="font-semibold mb-3">Entregas aprovadas</h4>
                  {approved.length === 0 ? (
                    <p className="text-sm text-gray-400 italic mb-4">Nenhuma entrega aprovada ainda. Seu time está trabalhando nisso!</p>
                  ) : (
                    <div className="space-y-2 mb-4">
                      {approved.map(task => (
                        <div key={task.id} className="bg-white rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 size={18} className="text-green-500" />
                              <div>
                                <p className="font-medium text-sm">{task.title}</p>
                                <p className="text-xs text-gray-400">Concluído em {new Date(task.deadline).toLocaleDateString("pt-BR")}</p>
                              </div>
                            </div>
                            {task.submittedLink && task.submittedLink.trim() && (
                              <Button variant="outline" size="sm" onClick={() => { window.open(task.submittedLink, "_blank"); }}>
                                <ExternalLink size={12} /> Ver entrega
                              </Button>
                            )}
                          </div>
                          {task.description && (
                            <div className="ml-8 mt-3 pt-3 border-t">
                              <p className="text-xs text-gray-500 font-medium mb-1">Descrição da tarefa</p>
                              <p className="text-sm text-gray-700">{task.description}</p>
                            </div>
                          )}
                          {task.submittedFiles && task.submittedFiles.length > 0 && (
                            <div className="ml-8 mt-2">
                              <p className="text-xs text-gray-500 font-medium mb-1">Arquivos da entrega</p>
                              {task.submittedFiles.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded p-2 mb-1">
                                  <Copy size={14} className="text-gray-400" />
                                  <span className="text-sm flex-1 truncate">{f.name}</span>
                                  {f.url && <a href={f.url} download={f.name} className="text-xs text-blue-600 hover:underline">Baixar</a>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {inProgress > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-700"><Clock size={14} className="inline mr-1" /> <strong>{inProgress} entrega{inProgress !== 1 ? "s" : ""}</strong> em andamento. Você será notificado quando estiverem prontas.</p>
                    </div>
                  )}

                  {inlineFbProject !== p.id ? (
                    <button type="button" onClick={() => setInlineFbProject(p.id)} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-md font-medium text-sm">
                      <Send size={14} /> Enviar feedback sobre este projeto
                    </button>
                  ) : (
                    <div className="bg-white rounded-lg border p-4 mt-2">
                      <p className="font-semibold text-sm mb-3">Feedback sobre {p.name}</p>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Tipo</label>
                          <select value={fbForm.type} onChange={e => setFbForm(prev => ({ ...prev, type: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                            <option>Ajuste</option><option>Sugestão</option><option>Problema</option><option>Elogio</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Mensagem</label>
                          <textarea value={fbForm.text} onChange={e => setFbForm(prev => ({ ...prev, text: e.target.value }))} placeholder="Descreva seu feedback..." className="w-full border rounded-lg p-2 text-sm mt-1 min-h-[80px]" />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => { if (fbForm.text.trim()) { addFeedback({ projectId: p.id, clientId: client.id, clientName: client.name, date: new Date().toISOString().split("T")[0], type: fbForm.type, text: fbForm.text }); setFbForm({ projectId: "", type: "Ajuste", text: "" }); setInlineFbProject(null); } }} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-md font-medium text-sm">
                            <Send size={14} /> Enviar
                          </button>
                          <button type="button" onClick={() => setInlineFbProject(null)} className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 rounded-md font-medium text-sm">Cancelar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Feedback Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Feedback</h2>
        <Button size="sm" onClick={() => setShowFeedback(!showFeedback)}><Send size={16} /> Novo feedback</Button>
      </div>

      {showFeedback && (
        <Card className="p-6 mb-4">
          <h3 className="font-semibold mb-3">Enviar feedback</h3>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Projeto</label>
              <select value={fbForm.projectId} onChange={e => setFbForm(p => ({ ...p, projectId: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                <option value="">Selecione o projeto</option>
                {clientProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div><label className="text-sm font-medium">Tipo</label>
              <select value={fbForm.type} onChange={e => setFbForm(p => ({ ...p, type: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                <option>Ajuste</option><option>Sugestão</option><option>Problema</option><option>Elogio</option>
              </select>
            </div>
            <div><label className="text-sm font-medium">Mensagem</label><textarea value={fbForm.text} onChange={e => setFbForm(p => ({ ...p, text: e.target.value }))} placeholder="Descreva seu feedback ou solicitação..." className="w-full border rounded-lg p-2 text-sm mt-1 min-h-[100px]" /></div>
            <div className="flex gap-2"><Button onClick={handleSendFeedback}><Send size={16} /> Enviar</Button><Button variant="outline" onClick={() => setShowFeedback(false)}>Cancelar</Button></div>
          </div>
        </Card>
      )}

      {myFeedbacks.length > 0 && (
        <div className="space-y-3 mb-8">
          {myFeedbacks.map(fb => {
            const proj = projects.find(p => p.id === fb.projectId);
            return (
              <Card key={fb.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={fb.type === "Elogio" ? "success" : fb.type === "Problema" ? "danger" : "warning"}>{fb.type}</Badge>
                      <Badge variant={fb.status === "pendente" ? "default" : "success"}>{fb.status === "pendente" ? "Aguardando resposta" : "Sendo tratado"}</Badge>
                    </div>
                    <p className="text-sm text-gray-700">{fb.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{proj?.name} · {fb.date}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      {myFeedbacks.length === 0 && !showFeedback && (
        <Card className="p-6 text-center text-gray-400 mb-8">Nenhum feedback enviado ainda.</Card>
      )}
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
  const { projects, tasks, clients, team, addTask } = useContext(AppContext);
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
                  <Card key={task.id} className="p-3" onClick={!isClientView && onTaskClick ? () => onTaskClick(task.id) : undefined}>
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
  const { notifications, setNotifications, dismissNotification, getSmartAlerts } = useContext(AppContext);
  const [showHistory, setShowHistory] = useState(false);

  const targetFilter = context === "executor" ? "executor:" + executorId
    : context === "qa" ? "qa"
    : context === "lider" ? "lider"
    : context === "client" ? "client"
    : null;

  const activeNotifications = targetFilter
    ? notifications.filter(n => n.target === targetFilter && !n.read)
    : notifications.filter(n => !n.read);

  const historyNotifications = targetFilter
    ? notifications.filter(n => n.target === targetFilter && n.read)
    : notifications.filter(n => n.read);

  const smartAlerts = context === "executor" ? getSmartAlerts(executorId) : [];

  const markAsRead = (notifId) => setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => n.target === targetFilter ? { ...n, read: true } : n));

  const priorityStyle = (p) => p === "danger" ? "bg-red-50 border-l-4 border-l-red-500 text-red-800"
    : p === "warning" ? "bg-orange-50 border-l-4 border-l-orange-400 text-orange-800"
    : "bg-blue-50 text-gray-700";

  const hasContent = smartAlerts.length > 0 || activeNotifications.length > 0 || historyNotifications.length > 0;

  return (
    <div className="fixed top-16 right-6 w-[420px] bg-white rounded-xl shadow-xl border z-50 max-h-[480px] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-bold">Notificações</h3>
        <div className="flex gap-2">
          {activeNotifications.length > 0 && <button onClick={markAllRead} className="text-xs text-gray-500 hover:text-gray-700">Resolver todas</button>}
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
              </div>
            </div>
          ))}
        </div>
      )}

      {activeNotifications.length > 0 && (
        <div className="border-b">
          {smartAlerts.length > 0 && <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">Novas</p>}
          {activeNotifications.map(n => (
            <div key={n.id} className={`px-4 py-3 border-b text-sm flex items-start gap-3 ${priorityStyle(n.priority)}`}>
              <div className="flex-1">
                <p>{n.text}</p>
                <p className="text-xs text-gray-400 mt-1">{n.date}</p>
              </div>
              <button onClick={() => markAsRead(n.id)} className="text-gray-400 hover:text-green-600 flex-shrink-0 mt-0.5" title="Marcar como resolvida"><CheckCircle2 size={16} /></button>
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
  const isClientHub = view === "clientes";
  const isProjectDetail = view === "project_detail";
  const isQA = view.startsWith("qa");
  const isLider = view.startsWith("lider");

  // Determine current notification context
  const notifContext = isQA ? "qa" : isLider ? "lider" : isClientPortal ? "client" : "executor";
  const notifTarget = notifContext === "executor" ? "executor:" + executorId : notifContext;

  // Count: targeted notifications + smart alerts for executor
  const targetedNotifs = notifications.filter(n => n.target === notifTarget && !n.read);
  const smartAlerts = notifContext === "executor" ? getSmartAlerts(executorId) : [];
  const unreadCount = targetedNotifs.length + smartAlerts.length;

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
          <QAPortalView area="eventos" onBack={goBack} onViewErrors={() => setView("qa_eventos_errors")} />
        )}
        {!selectedTask && view.includes("qa_") && view.includes("_errors") && (
          <QAErrorsView area="eventos" onBack={goBack} />
        )}
        {!selectedTask && (view === "lider_selector" || view === "lider_eventos") && (
          <LiderPortalView
            area="eventos"
            onBack={goBack}
            onViewClients={() => setView("clientes")}
            onSimulateClient={() => { setClientPortalId("c5"); setView("experiencia_cliente"); }}
            onProjectClick={onProjectClick}
            onViewAsClient={(cid) => { pushHistory(); setClientPortalId(cid); setView("experiencia_cliente"); }}
          />
        )}
      </main>
    </>
  );
}

export default App
