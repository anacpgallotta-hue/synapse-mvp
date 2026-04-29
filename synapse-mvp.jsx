import { useState, useContext, createContext, useCallback } from "react";
import { Bell, Clock, AlertTriangle, TrendingUp, Users, FolderOpen, CheckCircle2, ChevronLeft, ChevronDown, ChevronUp, Plus, MessageSquare, Send, ExternalLink, Copy, Calendar, ArrowLeft, Plane, Sparkles, X } from "lucide-react";

// ============================
// DATA INICIAL (mesmo do MVP)
// ============================
const initialTeam = [
  { id: "t1", name: "Alê", role: "Executor", area: "viagens", activeTasks: 0 },
  { id: "t2", name: "Julia Costa", role: "Executor", area: "viagens", activeTasks: 0 },
  { id: "t3", name: "Pedro Santos", role: "Executor", area: "viagens", activeTasks: 0 },
  { id: "t4", name: "Antônio", role: "Senior", area: "viagens", activeTasks: 0 },
  { id: "t5", name: "Mari Ribeiro", role: "Senior", area: "viagens", activeTasks: 0 },
  { id: "t6", name: "Amanda Gomes", role: "Senior", area: "viagens", activeTasks: 0 },
  { id: "t7", name: "Carlos Lima", role: "Executor", area: "eventos", activeTasks: 0 },
  { id: "t8", name: "Bianca Reis", role: "Executor", area: "eventos", activeTasks: 0 },
  { id: "t9", name: "Rafael Souza", role: "Senior", area: "eventos", activeTasks: 0 },
];

const initialClients = [
  { id: "c1", name: "Ambev", contact: "João Mendes", whatsapp: "+5511999990001", responsible: "Ana Silva", nextMeeting: "2026-04-22T15:00", relationship: "estável" },
  { id: "c2", name: "Hotmart", contact: "Camila Torres", whatsapp: "+5511999990002", responsible: "Ana Silva", nextMeeting: "2026-04-25T10:00", relationship: "estável" },
  { id: "c3", name: "Red Bull", contact: "Lucas Braga", whatsapp: "+5511999990003", responsible: "Ana Silva", nextMeeting: "2026-04-28T14:00", relationship: "estável" },
  { id: "c4", name: "Seara", contact: "Fernanda Lopes", whatsapp: "+5511999990004", responsible: "Ana Silva", nextMeeting: "2026-05-02T11:00", relationship: "atenção" },
  { id: "c5", name: "XP", contact: "Ricardo Alves", whatsapp: "+5511999990005", responsible: "Ana Silva", nextMeeting: "2026-04-30T15:00", relationship: "estável" },
];

const initialProjects = [
  { id: "p1", name: "Viagem Patagônia Premium", clientId: "c5", client: "XP", type: "Viagem", area: "viagens", status: "em_execucao", priority: "Alta", responsible: "Antônio", deadline: "2026-05-15", progress: 65 },
  { id: "p2", name: "Expedição Torres del Paine", clientId: "c3", client: "Red Bull", type: "Viagem", area: "viagens", status: "em_execucao", priority: "Alta", responsible: "Mari Ribeiro", deadline: "2026-05-28", progress: 30 },
  { id: "p3", name: "Convenção Anual de Vendas", clientId: "c1", client: "Ambev", type: "Evento", area: "eventos", status: "em_execucao", priority: "Alta", responsible: "Rafael Souza", deadline: "2026-06-10", progress: 40 },
  { id: "p4", name: "Summit Digital 2026", clientId: "c2", client: "Hotmart", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Rafael Souza", deadline: "2026-06-20", progress: 20 },
  { id: "p5", name: "Retreat Executivo Patagônia", clientId: "c1", client: "Ambev", type: "Viagem", area: "viagens", status: "em_execucao", priority: "Média", responsible: "Antônio", deadline: "2026-06-01", progress: 15 },
  { id: "p6", name: "Lançamento Produto - Evento", clientId: "c4", client: "Seara", type: "Evento", area: "eventos", status: "em_execucao", priority: "Média", responsible: "Rafael Souza", deadline: "2026-05-25", progress: 50 },
  { id: "p7", name: "Incentivo Equipe Comercial", clientId: "c5", client: "XP", type: "Viagem", area: "viagens", status: "em_execucao", priority: "Média", responsible: "Mari Ribeiro", deadline: "2026-07-10", progress: 10 },
  { id: "p8", name: "Workshop Inovação", clientId: "c2", client: "Hotmart", type: "Evento", area: "eventos", status: "em_execucao", priority: "Baixa", responsible: "Rafael Souza", deadline: "2026-07-15", progress: 5 },
  { id: "p9", name: "Experiência Gourmet Torres", clientId: "c3", client: "Red Bull", type: "Viagem", area: "viagens", status: "em_execucao", priority: "Média", responsible: "Antônio", deadline: "2026-06-15", progress: 25 },
];

const initialTasks = [
  { id: "tk1", title: "Finalizar apresentação do pacote", projectId: "p1", project: "Viagem Patagônia Premium", executor: "t1", executorName: "Alê", priority: "Alta", status: "concluida", area: "viagens", deadline: "2026-04-14T09:42", description: "Montar apresentação final do pacote de viagem para aprovação do cliente", checklist: [{ text: "Incluir roteiro", done: true }, { text: "Incluir orçamento", done: true }, { text: "Incluir fotos", done: true }], attachments: [{ name: "Briefing completo", type: "PDF", size: "2.4 MB" }], submittedLink: "https://drive.google.com/apresentacao-final", qaComment: "", feedbackOrigin: null },
  { id: "tk2", title: "Criar roteiro detalhado dia 1-3", projectId: "p1", project: "Viagem Patagônia Premium", executor: "t1", executorName: "Alê", priority: "Alta", status: "em_execucao", area: "viagens", deadline: "2026-04-16T17:00", description: "Desenvolver roteiro completo dos primeiros 3 dias da viagem incluindo horários, atividades e transfers", checklist: [{ text: "Incluir horários", done: true }, { text: "Incluir atividades", done: true }, { text: "Incluir transfers", done: false }], attachments: [{ name: "Briefing completo", type: "PDF", size: "2.4 MB" }, { name: "Manual da marca", type: "PDF", size: "5.1 MB" }, { name: "Referências visuais", type: "Pasta Drive", size: "" }], submittedLink: "", qaComment: "", feedbackOrigin: { type: "Ajuste", text: "O roteiro precisa incluir mais tempo livre entre as atividades. Os clientes solicitaram pausas maiores para descanso." } },
  { id: "tk3", title: "Confirmar guias locais", projectId: "p1", project: "Viagem Patagônia Premium", executor: "t1", executorName: "Alê", priority: "Média", status: "em_qa", area: "viagens", deadline: "2026-04-16T18:00", description: "Entrar em contato com os guias e confirmar disponibilidade para as datas", checklist: [{ text: "Contatar guia 1", done: true }, { text: "Contatar guia 2", done: true }, { text: "Confirmar datas", done: true }], attachments: [], submittedLink: "https://drive.google.com/confirmacao-guias", qaComment: "", feedbackOrigin: null },
  { id: "tk4", title: "Coordenar transfer aeroporto-hotel", projectId: "p2", project: "Expedição Torres del Paine", executor: "t1", executorName: "Alê", priority: "Média", status: "a_fazer", area: "viagens", deadline: "2026-04-20T12:00", description: "Organizar logística de transfer do aeroporto ao hotel para grupo de 20 pessoas", checklist: [{ text: "Cotar vans", done: false }, { text: "Reservar motoristas", done: false }, { text: "Confirmar horários de voo", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk5", title: "Organizar reunião de alinhamento pré-viagem", projectId: "p1", project: "Viagem Patagônia Premium", executor: "t2", executorName: "Julia Costa", priority: "Alta", status: "a_fazer", area: "viagens", deadline: "2026-04-30T12:00", description: "Agendar e organizar reunião de alinhamento com todos os stakeholders antes da viagem", checklist: [{ text: "Definir pauta", done: false }, { text: "Enviar convites", done: false }, { text: "Preparar material", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk6", title: "Montar checklist de fornecedores", projectId: "p3", project: "Convenção Anual de Vendas", executor: "t7", executorName: "Carlos Lima", priority: "Alta", status: "em_execucao", area: "eventos", deadline: "2026-04-18T17:00", description: "Listar e confirmar todos os fornecedores para o evento", checklist: [{ text: "Buffet", done: true }, { text: "Som e luz", done: false }, { text: "Decoração", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
  { id: "tk7", title: "Criar cronograma do evento", projectId: "p3", project: "Convenção Anual de Vendas", executor: "t8", executorName: "Bianca Reis", priority: "Média", status: "a_fazer", area: "eventos", deadline: "2026-04-25T12:00", description: "Desenvolver cronograma detalhado hora a hora do evento", checklist: [{ text: "Definir programação", done: false }, { text: "Alocar espaços", done: false }], attachments: [], submittedLink: "", qaComment: "", feedbackOrigin: null },
];

const initialLearnings = [
  { id: "l1", title: "Validação incompleta do seguro viagem", description: "Item reprovado em QA: cobertura do seguro não incluía explicitamente escalada em altitude. Precisou ser refeito antes da entrega ao cliente.", client: "Red Bull", date: "2025-12-18", type: "erro", origin: "QA", tags: ["seguro", "qa", "especificações"], area: "viagens" },
];

const initialFeedbacks = [
  { id: "f1", projectId: "p1", clientId: "c5", clientName: "XP", type: "Ajuste", text: "O roteiro precisa incluir mais tempo livre entre as atividades. Os clientes solicitaram pausas maiores para descanso.", date: "2026-04-15", status: "atribuido", assignedTaskId: "tk2" },
  { id: "f2", projectId: "p2", clientId: "c3", clientName: "Red Bull", type: "Sugestão", text: "Incluir opção de trilha alternativa para participantes com menor preparo físico.", date: "2026-04-14", status: "pendente", assignedTaskId: null },
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
  const [notifications, setNotifications] = useState([
    { id: "n1", text: "Tarefa 'Confirmar guias locais' enviada para QA", date: "2026-04-16", read: false },
    { id: "n2", text: "Feedback recebido do cliente XP sobre Viagem Patagônia Premium", date: "2026-04-15", read: false },
    { id: "n3", text: "Prazo se aproximando: Criar roteiro detalhado dia 1-3", date: "2026-04-16", read: false },
  ]);

  const addTask = useCallback((task) => {
    const newTask = { ...task, id: "tk" + Date.now(), status: "a_fazer", submittedLink: "", qaComment: "", feedbackOrigin: null };
    setTasks(prev => [...prev, newTask]);
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Nova tarefa atribuída: ${task.title}`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, []);

  const updateTaskStatus = useCallback((taskId, newStatus, extra = {}) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, ...extra } : t));
  }, []);

  const submitToQA = useCallback((taskId, link) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "em_qa", submittedLink: link } : t));
    const task = tasks.find(t => t.id === taskId);
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Tarefa '${task?.title}' enviada para revisão do QA`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, [tasks]);

  const approveTask = useCallback((taskId, comment) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "concluida", qaComment: comment || "Aprovado" } : t));
    const task = tasks.find(t => t.id === taskId);
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Tarefa '${task?.title}' aprovada pelo QA`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, [tasks]);

  const rejectTask = useCallback((taskId, comment) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "devolvida", qaComment: comment } : t));
    const task = tasks.find(t => t.id === taskId);
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Tarefa '${task?.title}' devolvida pelo QA: ${comment}`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, [tasks]);

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
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Novo feedback do cliente ${fb.clientName} sobre ${projects.find(p => p.id === fb.projectId)?.name}`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, [projects]);

  const assignFeedbackAsTask = useCallback((feedbackId, taskData) => {
    const fb = feedbacks.find(f => f.id === feedbackId);
    const newTask = { ...taskData, id: "tk" + Date.now(), status: "a_fazer", submittedLink: "", qaComment: "", feedbackOrigin: { type: fb.type, text: fb.text } };
    setTasks(prev => [...prev, newTask]);
    setFeedbacks(prev => prev.map(f => f.id === feedbackId ? { ...f, status: "atribuido", assignedTaskId: newTask.id } : f));
    setNotifications(prev => [{ id: "n" + Date.now(), text: `Feedback convertido em tarefa: ${taskData.title}`, date: new Date().toISOString().split("T")[0], read: false }, ...prev]);
  }, [feedbacks]);

  const addLearning = useCallback((learning) => {
    setLearnings(prev => [...prev, { ...learning, id: "l" + Date.now() }]);
  }, []);

  const resubmitTask = useCallback((taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "em_execucao", qaComment: "" } : t));
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
    <AppContext.Provider value={{ tasks, projects, clients, team, learnings, feedbacks, notifications, addTask, updateTaskStatus, submitToQA, approveTask, rejectTask, toggleChecklist, addFeedback, assignFeedbackAsTask, addLearning, resubmitTask, getTeamWithLoad, setNotifications }}>
      {children}
    </AppContext.Provider>
  );
}

// ============================
// COMPONENTES UI (identidade visual)
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
  const navItems = {
    executor: [
      { label: "QA", view: "qa_selector" },
      { label: "Clientes", view: "clientes" },
      { label: "Experiência do Cliente", view: "experiencia_cliente" },
      { label: "Líder", view: "lider_selector" },
      { label: "Trocar executor", view: "trocar_executor" },
    ],
    qa: [
      { label: "Minhas tarefas", view: "executor" },
      { label: "Experiência do Cliente", view: "experiencia_cliente" },
      { label: "Clientes", view: "clientes" },
      { label: "Líder", view: "lider_selector" },
    ],
    lider: [
      { label: "Minhas tarefas", view: "executor" },
      { label: "QA", view: "qa_selector" },
      { label: "Clientes", view: "clientes" },
      { label: "Experiência do Cliente", view: "experiencia_cliente" },
    ],
  };

  const isQA = currentView.startsWith("qa");
  const isLider = currentView.startsWith("lider");
  const headerType = isQA ? "qa" : isLider ? "lider" : "executor";
  const items = navItems[headerType] || navItems.executor;

  const headerTitle = isQA
    ? (currentView === "qa_selector" ? "Portal QA" : `Portal QA – ${currentView.includes("viagens") ? "Viagens" : "Eventos"}`)
    : isLider
    ? (currentView === "lider_selector" ? "Portal Líder" : `Portal ${currentView.includes("viagens") ? "Viagens" : "Eventos"}`)
    : "Jazz Side";

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{headerTitle}</h1>
            {headerType === "executor" && <p className="text-sm text-gray-500">Olá, {currentExecutor}</p>}
            {isQA && currentView !== "qa_selector" && <p className="text-sm text-gray-500">Revise entregas, devolva com comentários claros e gere aprendizados para o time.</p>}
            {isLider && currentView !== "lider_selector" && <p className="text-sm text-gray-500">Gerencie projetos e distribua tarefas para o time.</p>}
          </div>
          <div className="flex items-center gap-3">
            {items.map(item => (
              <Button key={item.view} variant={currentView === item.view ? "navActive" : "nav"} size="sm" onClick={() => setView(item.view)}>
                {item.label}
              </Button>
            ))}
            {(isQA && currentView !== "qa_selector") && (
              <Button variant="outline" size="sm" onClick={() => setView("qa_selector")}>Trocar squad de QA</Button>
            )}
            {(isLider && currentView !== "lider_selector") && (
              <Button variant="outline" size="sm" onClick={() => setView("lider_selector")}>Trocar squad</Button>
            )}
            {headerType === "executor" && (
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setShowNotif(prev => !prev)}>
                  <Bell className="h-5 w-5" />
                  {notifCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{notifCount}</span>}
                </Button>
              </div>
            )}
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
  const [filter, setFilter] = useState("todos");
  const myTasks = tasks.filter(t => t.executor === executorId).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const filtered = filter === "hoje"
    ? myTasks.filter(t => new Date(t.deadline).toDateString() === new Date().toDateString())
    : filter === "2semanas"
    ? myTasks.filter(t => { const d = new Date(t.deadline); const now = new Date(); const twoWeeks = new Date(now.getTime() + 14 * 86400000); return d >= now && d <= twoWeeks; })
    : myTasks;

  const priorityColor = (p) => p === "Alta" ? "bg-red-500" : p === "Média" ? "bg-orange-500" : "bg-green-500";
  const statusLabel = (s) => ({ a_fazer: "A Fazer", em_execucao: "Em execução", em_qa: "Em QA", concluida: "Concluída", devolvida: "Devolvida" }[s] || s);
  const statusVariant = (s) => ({ devolvida: "danger", em_qa: "info", concluida: "default" }[s] || "default");

  const formatDeadline = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays > 0 && diffDays < 7) return `${diffDays} dias atrás – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    if (date.toDateString() === now.toDateString()) return `Hoje – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
    return `${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} – ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
  };

  const months = [...new Set(filtered.map(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}`; }))];

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Minhas tarefas</h1>
        <p className="text-gray-500">Organize suas entregas e acompanhe o progresso</p>
        <div className="mt-4 flex gap-2">
          {[["hoje", "Hoje"], ["2semanas", "Próximas 2 semanas"], ["todos", "Todos"]].map(([key, label]) => (
            <Button key={key} variant={filter === key ? "default" : "outline"} size="sm" onClick={() => setFilter(key)}>{label}</Button>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        {months.map(month => (
          <div key={month}>
            <h3 className="mb-4 text-lg font-semibold capitalize">{month}</h3>
            <div className="space-y-3">
              {filtered.filter(t => { const d = new Date(t.deadline); return `${d.toLocaleString("pt-BR", { month: "long" })} de ${d.getFullYear()}` === month; }).map(task => (
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
                      <Badge variant={statusVariant(task.status)}>{statusLabel(task.status)}</Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3 w-3" />{formatDeadline(task.deadline)}</div>
                      {task.feedbackOrigin && <Badge variant="accent">Feedback do cliente</Badge>}
                      {task.status === "devolvida" && <Badge variant="danger">Devolvida pelo QA</Badge>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-400 py-12">Nenhuma tarefa encontrada com esse filtro.</p>}
      </div>
    </div>
  );
}

// ============================
// TASK DETAIL VIEW
// ============================
function TaskDetailView({ taskId, onBack }) {
  const { tasks, toggleChecklist, submitToQA, resubmitTask } = useContext(AppContext);
  const task = tasks.find(t => t.id === taskId);
  const [link, setLink] = useState("");
  if (!task) return null;

  const allChecked = task.checklist.every(c => c.done);
  const canSubmit = allChecked && link.trim().length > 0;

  const handleSubmit = () => { if (canSubmit) { submitToQA(taskId, link); setLink(""); onBack(); } };
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
      {task.status !== "concluida" && task.status !== "em_qa" && (
        <Button variant="outline" size="sm" className="mb-6" onClick={() => { /* marcar como concluída direto */ }}>Marcar como concluída</Button>
      )}

      {task.status === "devolvida" && task.qaComment && (
        <Card className="p-6 mb-6 border-l-4 border-l-red-500">
          <h3 className="font-bold text-red-700 mb-2">Devolvida pelo QA</h3>
          <p className="text-sm text-gray-700 mb-4">{task.qaComment}</p>
          <Button size="sm" onClick={handleResubmit}>Retomar execução</Button>
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
              <Button variant="ghost" size="sm">Abrir</Button>
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
          <p className="text-sm text-gray-500 mb-3">Link do arquivo ou anotações</p>
          <textarea value={link} onChange={e => setLink(e.target.value)} placeholder="Cole o link do Drive ou faça anotações importantes sobre a entrega..." className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[100px] mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900" />
          <Button className={!canSubmit ? "opacity-50 cursor-not-allowed" : ""} onClick={handleSubmit}>Enviar para revisão</Button>
          {!allChecked && <p className="text-xs text-gray-400 mt-2">Marque todos os itens do checklist e preencha o link/anotações para enviar para QA.</p>}
        </Card>
      )}
    </div>
  );
}

// ============================
// QA VIEWS
// ============================
function QASquadSelector({ onSelect }) {
  const squads = [
    { key: "viagens", title: "QA Viagens", desc: "Projetos de viagens corporativas, roteiros e logística." },
    { key: "eventos", title: "QA Eventos", desc: "Projetos de eventos presenciais, convenções e lançamentos." },
  ];
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Escolha o squad de QA</h1>
      <p className="text-gray-500 mb-8">Selecione qual área você quer revisar agora. Cada portal mostra apenas projetos e tarefas daquela categoria.</p>
      <div className="grid grid-cols-2 gap-6">
        {squads.map(s => (
          <Card key={s.key} className="p-6">
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
            <Button onClick={() => onSelect(s.key)}>Entrar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QAPortalView({ area, onBack, onViewErrors }) {
  const { tasks, approveTask, rejectTask } = useContext(AppContext);
  const [comments, setComments] = useState({});
  const pendingTasks = tasks.filter(t => t.area === area && t.status === "em_qa");
  const historyTasks = tasks.filter(t => t.area === area && t.status === "concluida").slice(0, 5);
  const atRisk = tasks.filter(t => t.area === area && ["em_execucao", "a_fazer"].includes(t.status) && new Date(t.deadline) < new Date(Date.now() + 86400000));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Portal QA – {area === "viagens" ? "Viagens" : "Eventos"}</h1>
          <p className="text-gray-500">Revise entregas, devolva com comentários claros e gere aprendizados para o time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewErrors}>Ver erros & aprendizados</Button>
          <Button variant="outline" size="sm" onClick={onBack}>Voltar</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center"><Clock className="h-5 w-5 text-blue-500" /></div>
          <div><p className="text-2xl font-bold">{pendingTasks.length}</p><p className="text-sm text-gray-500">Pendentes de QA</p></div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-500" /></div>
          <div><p className="text-2xl font-bold">{atRisk.length}</p><p className="text-sm text-gray-500">Em risco/atrasando</p></div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-green-500" /></div>
          <div><p className="text-2xl font-bold">0</p><p className="text-sm text-gray-500">Aprendizados (7 dias)</p></div>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-2">Pendentes de QA</h2>
      <p className="text-gray-500 text-sm mb-6">Tarefas que estão na etapa de QA e precisam da sua revisão.</p>

      {pendingTasks.length === 0 ? (
        <Card className="p-8 text-center text-gray-400 mb-8">Nenhuma tarefa pendente de QA nesta área.</Card>
      ) : pendingTasks.map(task => (
        <Card key={task.id} className="p-6 mb-4">
          <div className="flex items-start gap-2 mb-1">
            <div className={`h-3 w-3 rounded-full mt-1 ${task.priority === "Alta" ? "bg-red-500" : "bg-orange-500"}`} />
            <h3 className="font-bold text-green-700">{task.title}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-1">{task.project} &nbsp; <Users className="inline h-3 w-3" /> {task.executorName} &nbsp; <Clock className="inline h-3 w-3" /> {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
          {task.submittedLink && <Badge className="mb-2">1 arquivo anexado</Badge>}
          <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          <p className="font-semibold text-sm mb-2">Comentário de devolutiva</p>
          <textarea value={comments[task.id] || ""} onChange={e => setComments(prev => ({ ...prev, [task.id]: e.target.value }))} placeholder="Explique o que precisa ser ajustado para ajudar o executor e virar aprendizado..." className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[80px] mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900" />
          <div className="flex gap-3">
            <Button className="flex-1 justify-center" onClick={() => { approveTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); }}>
              <CheckCircle2 className="h-4 w-4" /> Aprovar e concluir
            </Button>
            <Button variant="outline" className="flex-1 justify-center" onClick={() => { if (comments[task.id]?.trim()) { rejectTask(task.id, comments[task.id]); setComments(prev => { const n = { ...prev }; delete n[task.id]; return n; }); } }}>
              <Clock className="h-4 w-4" /> Devolver para execução
            </Button>
          </div>
        </Card>
      ))}

      <h2 className="text-xl font-bold mt-8 mb-2">Histórico recente de QA</h2>
      <p className="text-gray-500 text-sm mb-4">Últimas 5 tarefas revisadas pelo QA.</p>
      {historyTasks.map(task => (
        <Card key={task.id} className="p-5 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-medium">{task.title}</span>
            <Badge variant="success">Aprovado</Badge>
          </div>
          <p className="text-sm text-gray-500">{task.project} · {task.executorName} · {new Date(task.deadline).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</p>
        </Card>
      ))}
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ChevronLeft className="h-4 w-4" /> Voltar</button>
      <h1 className="text-3xl font-bold mb-2">Erros & Aprendizados – {area === "viagens" ? "Viagens" : "Eventos"}</h1>
      <p className="text-gray-500 mb-6">Base viva de aprendizados para o squad. Consulte antes de planejar, revisar ou entregar algo importante.</p>

      <Button className="mb-6" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4" /> Registrar novo erro/aprendizado</Button>

      {showForm && (
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Título</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1" /></div>
            <div><label className="text-sm font-medium">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1 min-h-[80px]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Cliente</label><input value={form.client} onChange={e => setForm(p => ({ ...p, client: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1" /></div>
              <div><label className="text-sm font-medium">Tags (separar por vírgula)</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1" /></div>
            </div>
            <Button onClick={handleAdd}>Salvar</Button>
          </div>
        </Card>
      )}

      <p className="text-sm text-gray-500 mb-4">{areaLearnings.length} resultado{areaLearnings.length !== 1 ? "s" : ""}</p>
      {areaLearnings.map(l => (
        <Card key={l.id} className="p-6 mb-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1"><AlertTriangle className="h-4 w-4 text-orange-500" /></div>
            <div>
              <h3 className="font-bold mb-1">{l.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{l.description}</p>
              <div className="flex flex-wrap gap-2">{[l.client, l.date, ...l.tags].filter(Boolean).map((tag, i) => <Badge key={i}>{tag}</Badge>)}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ============================
// LÍDER VIEWS
// ============================
function LiderSquadSelector({ onSelect }) {
  const squads = [
    { key: "viagens", title: "Líder Viagens", desc: "Gestão de projetos e demandas do time de viagens." },
    { key: "eventos", title: "Líder Eventos", desc: "Gestão de eventos, convenções e ativações." },
  ];
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Escolha o portal de liderança</h1>
      <p className="text-gray-500 mb-8">Selecione qual squad você quer gerenciar agora. Cada portal mostra apenas os projetos daquela área.</p>
      <div className="grid grid-cols-2 gap-6">
        {squads.map(s => (
          <Card key={s.key} className="p-6">
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
            <Button onClick={() => onSelect(s.key)}>Entrar</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LiderPortalView({ area, onBack, onViewClients, onSimulateClient }) {
  const { projects, tasks, feedbacks, addTask, assignFeedbackAsTask, getTeamWithLoad, team: rawTeam } = useContext(AppContext);
  const [tab, setTab] = useState("geral");
  const [showCreate, setShowCreate] = useState(false);
  const [feedFilter, setFeedFilter] = useState("pendentes");
  const [form, setForm] = useState({ title: "", projectId: "", executor: "", deadline: "", priority: "Média", description: "" });

  const areaProjects = projects.filter(p => p.area === area);
  const areaTeam = getTeamWithLoad(area);
  const areaFeedbacks = feedbacks.filter(f => areaProjects.some(p => p.id === f.projectId));
  const pendingFeedbacks = areaFeedbacks.filter(f => f.status === "pendente");
  const assignedFeedbacks = areaFeedbacks.filter(f => f.status === "atribuido");

  const handleCreateTask = () => {
    const proj = projects.find(p => p.id === form.projectId);
    const exec = rawTeam.find(t => t.id === form.executor);
    addTask({ ...form, project: proj?.name || "", executorName: exec?.name || "", area, checklist: [{ text: "Revisar briefing", done: false }, { text: "Executar entrega", done: false }], attachments: [] });
    setForm({ title: "", projectId: "", executor: "", deadline: "", priority: "Média", description: "" });
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
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft className="h-4 w-4" /> Voltar ao modo executor</button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewClients}><Users className="h-4 w-4" /> Clientes</Button>
          <Button variant="outline" size="sm" onClick={onSimulateClient}><Sparkles className="h-4 w-4" /> Simular visão do cliente</Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-1">
        {area === "viagens" ? <Plane className="h-7 w-7 text-green-600" /> : <Calendar className="h-7 w-7 text-orange-600" />}
        <h1 className="text-3xl font-bold">Portal {area === "viagens" ? "Viagens" : "Eventos"}</h1>
      </div>
      <p className="text-gray-500 mb-1">Gerencie projetos e distribua tarefas para o time.</p>
      <p className="text-sm text-gray-400 mb-6">Você está vendo projetos da área de {area === "viagens" ? "Viagens" : "Eventos"}.</p>

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
                    <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{p.name} {projFeedbacks.length > 0 && <Badge variant="success" className="ml-2">{projFeedbacks.length} feedback</Badge>}</td>
                      <td className="p-4 text-gray-500">{p.client}</td>
                      <td className="p-4"><Badge variant="info">{p.type}</Badge></td>
                      <td className="p-4"><Badge variant="purple">Projeto</Badge></td>
                      <td className="p-4"><span className={`inline-flex items-center gap-1`}><span className={`h-2 w-2 rounded-full ${p.priority === "Alta" ? "bg-red-500" : p.priority === "Média" ? "bg-orange-500" : "bg-green-500"}`} />{p.priority}</span></td>
                      <td className="p-4 text-gray-500">{p.responsible}</td>
                      <td className="p-4 text-gray-500"><Calendar className="inline h-3 w-3 mr-1" />{new Date(p.deadline).toLocaleDateString("pt-BR")}</td>
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
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-2"><Users className="h-3 w-3" /> {m.activeTasks} tarefas ativas</p>
                </Card>
              ))}
            </div>
          </Card>

          <h2 className="text-xl font-bold mb-4">Planejamento de novas tarefas</h2>
          <Card className="mb-8">
            <button onClick={() => setShowCreate(!showCreate)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="flex items-center gap-2 font-medium"><Plus className="h-4 w-4" /> Criar nova tarefa para o time</span>
              {showCreate ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {showCreate && (
              <div className="px-5 pb-5 space-y-4 border-t pt-4">
                <div><label className="text-sm font-medium">Nome da tarefa</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1" /></div>
                <div><label className="text-sm font-medium">Projeto</label>
                  <select value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                    <option value="">Selecione um projeto</option>
                    {areaProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium">Responsável</label>
                  <select value={form.executor} onChange={e => setForm(p => ({ ...p, executor: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                    <option value="">Selecione um responsável</option>
                    {areaTeam.map(m => <option key={m.id} value={m.id}>{m.name} ({m.role} · {m.activeTasks} tarefas)</option>)}
                  </select>
                </div>
                <div><label className="text-sm font-medium">Prazo</label><input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1" /></div>
                <div><label className="text-sm font-medium">Prioridade</label>
                  <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                    <option>Alta</option><option>Média</option><option>Baixa</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium">Descrição</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1 min-h-[80px]" /></div>
                <div className="flex gap-2"><Button onClick={handleCreateTask}>Criar tarefa</Button><Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button></div>
              </div>
            )}
          </Card>
        </>
      )}

      {tab === "portal" && (
        <>
          <h2 className="text-xl font-bold mb-2">Lista de projetos com portal</h2>
          <p className="text-gray-500 text-sm mb-6">Visualize e acesse os portais dos projetos para seus clientes.</p>
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left p-4 font-medium">Projeto</th><th className="text-left p-4 font-medium">Cliente</th><th className="text-left p-4 font-medium">Status</th><th className="text-right p-4 font-medium">Ações</th></tr></thead>
              <tbody>
                {areaProjects.map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-gray-500">{p.client}</td>
                    <td className="p-4"><Badge variant="purple">Projeto</Badge></td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm" onClick={onSimulateClient}><ExternalLink className="h-3 w-3" /> Ver portal deste projeto</Button>
                      <Button variant="ghost" size="sm" className="ml-2"><Copy className="h-3 w-3" /> Copiar link</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft className="h-4 w-4" /> Voltar</button>
      <div className="flex items-center gap-3 mb-2">
        <Users className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Hub de Clientes</h1>
      </div>
      <p className="text-gray-500 mb-8">Acompanhe todos os clientes, projetos ativos e histórico de trabalhos.</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de clientes", value: clients.length, icon: <Users className="h-5 w-5 text-gray-400" /> },
          { label: "Projetos ativos", value: totalActive, icon: <FolderOpen className="h-5 w-5 text-gray-400" /> },
          { label: "Projetos concluídos", value: totalDone, icon: <CheckCircle2 className="h-5 w-5 text-green-400" /> },
          { label: "Parcerias excelentes", value: clients.filter(c => c.relationship === "excelente").length, icon: <CheckCircle2 className="h-5 w-5 text-green-400" /> },
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

function ClientPortalView({ clientId, onBack }) {
  const { clients, projects, tasks, addFeedback } = useContext(AppContext);
  const client = clients.find(c => c.id === clientId) || clients[0];
  const clientProjects = projects.filter(p => p.clientId === client.id);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fbForm, setFbForm] = useState({ projectId: "", type: "Ajuste", text: "" });
  const [areaFilter, setAreaFilter] = useState("todos");

  const filtered = areaFilter === "todos" ? clientProjects : clientProjects.filter(p => p.type.toLowerCase() === areaFilter);

  const handleSendFeedback = () => {
    if (!fbForm.projectId || !fbForm.text.trim()) return;
    addFeedback({ ...fbForm, clientId: client.id, clientName: client.name, date: new Date().toISOString().split("T")[0] });
    setFbForm({ projectId: "", type: "Ajuste", text: "" });
    setShowFeedback(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft className="h-4 w-4" /> Voltar</button>
        <Button variant="outline" size="sm" onClick={onBack}>Sair</Button>
      </div>
      <p className="text-sm text-gray-400">Jazz Side</p>
      <h1 className="text-3xl font-bold mb-6">Portal da {client.name}</h1>

      <Card className="p-6 mb-8 border-l-4 border-l-green-600">
        <h3 className="font-bold mb-3">Informações da Conta</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><p className="text-sm text-gray-500">Responsável na Jazz Side</p><p className="font-medium">{client.responsible}</p></div>
          <div><p className="text-sm text-gray-500">WhatsApp do responsável</p><Button variant="outline" size="sm"><MessageSquare className="h-4 w-4" /> Abrir no WhatsApp</Button></div>
          <div><p className="text-sm text-gray-500">Próxima reunião</p><p className="font-medium flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(client.nextMeeting).toLocaleDateString("pt-BR")} às {new Date(client.nextMeeting).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}</p><button className="text-sm text-gray-500 hover:text-gray-700">Reagendar</button></div>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Projetos ativos</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Filtrar:</span>
          {["todos", "viagem", "evento"].map(f => (
            <Button key={f} variant={areaFilter === f ? "default" : "outline"} size="sm" onClick={() => setAreaFilter(f)}>{f === "todos" ? "Todos" : f === "viagem" ? "Viagens" : "Eventos"}</Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {filtered.map(p => {
          const projTasks = tasks.filter(t => t.projectId === p.id);
          const done = projTasks.filter(t => t.status === "concluida").length;
          const total = projTasks.length;
          const progress = total > 0 ? Math.round((done / total) * 100) : p.progress;
          return (
            <Card key={p.id} className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold">{p.name}</h3>
                <Badge variant={p.type === "Viagem" ? "info" : "purple"}>{p.type}</Badge>
              </div>
              <Badge variant="success" className="mb-3">Em execução</Badge>
              <div className="flex justify-between text-sm mb-1"><span>Prazo:</span><span className="font-medium">{new Date(p.deadline).toLocaleDateString("pt-BR")}</span></div>
              <div className="flex justify-between text-sm mb-3"><span>Progresso:</span><span className="font-medium">{progress}%</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
              <Button className="w-full justify-center" size="sm">Acessar projeto</Button>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Enviar feedback</h2>
        <Button size="sm" onClick={() => setShowFeedback(!showFeedback)}><Send className="h-4 w-4" /> Novo feedback</Button>
      </div>
      {showFeedback && (
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Projeto</label>
              <select value={fbForm.projectId} onChange={e => setFbForm(p => ({ ...p, projectId: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                <option value="">Selecione</option>
                {clientProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div><label className="text-sm font-medium">Tipo</label>
              <select value={fbForm.type} onChange={e => setFbForm(p => ({ ...p, type: e.target.value }))} className="w-full border rounded-lg p-2 text-sm mt-1">
                <option>Ajuste</option><option>Sugestão</option><option>Problema</option><option>Elogio</option>
              </select>
            </div>
            <div><label className="text-sm font-medium">Mensagem</label><textarea value={fbForm.text} onChange={e => setFbForm(p => ({ ...p, text: e.target.value }))} placeholder="Descreva seu feedback..." className="w-full border rounded-lg p-2 text-sm mt-1 min-h-[100px]" /></div>
            <div className="flex gap-2"><Button onClick={handleSendFeedback}><Send className="h-4 w-4" /> Enviar feedback</Button><Button variant="outline" onClick={() => setShowFeedback(false)}>Cancelar</Button></div>
          </div>
        </Card>
      )}

      <h2 className="text-xl font-bold mb-4">Projetos concluídos & histórico</h2>
      <Card className="p-8 text-center text-gray-400">Nenhum projeto concluído ainda.</Card>
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
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"><ArrowLeft className="h-4 w-4" /> Voltar</button>
      <h1 className="text-3xl font-bold mb-2">Trocar executor</h1>
      <p className="text-gray-500 mb-6">Selecione qual executor você quer simular para ver suas tarefas.</p>
      <div className="space-y-3">
        {executors.map(e => {
          const taskCount = tasks.filter(t => t.executor === e.id && t.status !== "concluida").length;
          return (
            <Card key={e.id} className={`p-5 cursor-pointer ${e.id === currentId ? "ring-2 ring-gray-900" : ""}`} onClick={() => onSelect(e.id, e.name)}>
              <div className="flex justify-between items-center">
                <div><p className="font-bold">{e.name}</p><p className="text-sm text-gray-500">{e.role} · {e.area === "viagens" ? "Viagens" : "Eventos"}</p></div>
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
function NotificationPanel({ onClose }) {
  const { notifications, setNotifications } = useContext(AppContext);
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  return (
    <div className="fixed top-16 right-6 w-96 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-bold">Notificações</h3>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="text-xs text-gray-500 hover:text-gray-700">Marcar todas como lidas</button>
          <button onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
      </div>
      {notifications.length === 0 ? <p className="p-4 text-sm text-gray-400">Sem notificações.</p> : notifications.map(n => (
        <div key={n.id} className={`p-4 border-b text-sm ${n.read ? "text-gray-400" : "text-gray-700 bg-blue-50"}`}>
          <p>{n.text}</p>
          <p className="text-xs text-gray-400 mt-1">{n.date}</p>
        </div>
      ))}
    </div>
  );
}

// ============================
// APP PRINCIPAL
// ============================
export default function App() {
  const [view, setView] = useState("executor");
  const [selectedTask, setSelectedTask] = useState(null);
  const [executorId, setExecutorId] = useState("t1");
  const [executorName, setExecutorName] = useState("Alê");
  const [qaArea, setQaArea] = useState(null);
  const [liderArea, setLiderArea] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [clientPortalId, setClientPortalId] = useState("c5");

  const handleSetView = (v) => {
    setView(v);
    setSelectedTask(null);
    setShowNotif(false);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="h-1 bg-red-400 w-full" />
        <AppInner
          view={view} setView={handleSetView}
          selectedTask={selectedTask} setSelectedTask={setSelectedTask}
          executorId={executorId} executorName={executorName}
          setExecutorId={setExecutorId} setExecutorName={setExecutorName}
          qaArea={qaArea} setQaArea={setQaArea}
          liderArea={liderArea} setLiderArea={setLiderArea}
          showNotif={showNotif} setShowNotif={setShowNotif}
          clientPortalId={clientPortalId} setClientPortalId={setClientPortalId}
        />
      </div>
    </AppProvider>
  );
}

function AppInner({ view, setView, selectedTask, setSelectedTask, executorId, executorName, setExecutorId, setExecutorName, qaArea, setQaArea, liderArea, setLiderArea, showNotif, setShowNotif, clientPortalId, setClientPortalId }) {
  const { notifications } = useContext(AppContext);
  const unreadCount = notifications.filter(n => !n.read).length;

  const isClientPortal = view === "experiencia_cliente";
  const isClientHub = view === "clientes";

  if (isClientPortal) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ClientPortalView clientId={clientPortalId} onBack={() => setView("executor")} />
      </div>
    );
  }

  if (isClientHub) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ClientHubView onBack={() => setView("executor")} />
      </div>
    );
  }

  return (
    <>
      <Header currentView={view} setView={setView} currentExecutor={executorName} setShowNotif={setShowNotif} notifCount={unreadCount} />
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === "executor" && !selectedTask && (
          <ExecutorView executorId={executorId} onTaskClick={setSelectedTask} />
        )}
        {view === "executor" && selectedTask && (
          <TaskDetailView taskId={selectedTask} onBack={() => setSelectedTask(null)} />
        )}
        {view === "trocar_executor" && (
          <TrocarExecutorView currentId={executorId} onSelect={(id, name) => { setExecutorId(id); setExecutorName(name); setView("executor"); }} onBack={() => setView("executor")} />
        )}
        {view === "qa_selector" && (
          <QASquadSelector onSelect={(area) => { setQaArea(area); setView("qa_" + area); }} />
        )}
        {(view === "qa_viagens" || view === "qa_eventos") && !view.includes("errors") && (
          <QAPortalView area={qaArea} onBack={() => setView("qa_selector")} onViewErrors={() => setView(view + "_errors")} />
        )}
        {view.includes("qa_") && view.includes("_errors") && (
          <QAErrorsView area={qaArea} onBack={() => setView("qa_" + qaArea)} />
        )}
        {view === "lider_selector" && (
          <LiderSquadSelector onSelect={(area) => { setLiderArea(area); setView("lider_" + area); }} />
        )}
        {(view === "lider_viagens" || view === "lider_eventos") && (
          <LiderPortalView
            area={liderArea}
            onBack={() => setView("executor")}
            onViewClients={() => setView("clientes")}
            onSimulateClient={() => { setClientPortalId("c5"); setView("experiencia_cliente"); }}
          />
        )}
      </main>
    </>
  );
}
