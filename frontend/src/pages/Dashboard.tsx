import { useEffect, useState } from 'react'
import { api, projectsApi, type Project } from '../lib/api'
import { PageHeader, Stat, Badge, Empty } from '../components/Ui'

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [counts, setCounts] = useState({ projects: 0, users: 0, tasks: 0 })
  const [apiOk, setApiOk] = useState(false)
  useEffect(() => { (async () => {
    try { const [p, u] = await Promise.all([projectsApi.list({ limit: 5 }), api.get('/users')]); setProjects(p.data.data); setCounts({ projects: p.data.total, users: u.data.length, tasks: p.data.data.reduce((n, x) => n + (x._count?.tasks || 0), 0) }); setApiOk(true) } catch { setApiOk(false) }
  })() }, [])
  return <><PageHeader eyebrow="CONTROL CENTER" title="Bom dia, Developer." description="Uma visão executiva do seu workspace ProjectHub." action={<a href="/projects" className="primary-btn">+ Novo projeto</a>} />
    <div className="hero-banner"><div><Badge tone="success">● Sistema operacional</Badge><h2>Seu backend está pronto para virar produto.</h2><p>API Node.js + TypeScript, PostgreSQL, Prisma, JWT, Docker, Kubernetes, CI/CD e Azure em uma experiência única.</p></div><div className="hero-metric"><span>API</span><strong>{apiOk ? '200' : '—'}</strong><small>health check</small></div></div>
    <div className="stats-grid"><Stat label="Projetos" value={counts.projects} meta="owner-scoped"/><Stat label="Usuários" value={counts.users} meta="identidades cadastradas" tone="violet"/><Stat label="Tarefas" value={counts.tasks} meta="visão agregada" tone="amber"/><Stat label="Segurança" value="JWT" meta="Bearer · 1h" tone="green"/></div>
    <div className="dashboard-grid"><section className="panel wide"><div className="panel-head"><div><span className="eyebrow">RECENTES</span><h3>Projetos em destaque</h3></div><a href="/projects">Ver todos →</a></div>{projects.length ? <div className="project-list">{projects.map(p => <div className="project-row" key={p.id}><div className="project-icon">{p.name.slice(0,1).toUpperCase()}</div><div className="project-info"><strong>{p.name}</strong><span>{p.description || 'Sem descrição'}</span></div><Badge tone="success">ATIVO</Badge></div>)}</div> : <Empty title="Nenhum projeto ainda" description="Crie o primeiro projeto para iniciar seu workspace."/>}</section><section className="panel"><div className="panel-head"><div><span className="eyebrow">STACK</span><h3>Engineering snapshot</h3></div></div><div className="stack-list"><div><b>Runtime</b><span>Node.js 22 · TypeScript</span></div><div><b>Data</b><span>Neon PostgreSQL · Prisma</span></div><div><b>Security</b><span>JWT · bcrypt · Zod</span></div><div><b>Delivery</b><span>Docker · Kubernetes · GitHub Actions</span></div><div><b>Cloud</b><span>Microsoft Azure · Entra ID</span></div></div></section></div>
  </>
}
