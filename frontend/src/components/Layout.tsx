import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const items = [
  ['/', '⌂', 'Overview'],
  ['/projects', '▦', 'Projetos'],
  ['/tasks', '✓', 'Tarefas'],
  ['/users', '◉', 'Usuários'],
  ['/infrastructure', '◈', 'Infraestrutura'],
  ['/docs', '⌘', 'API Docs'],
  ['/console', '>', 'REST Console'],
] as const

export default function Layout() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('projecthub_user') || 'null')

  function logout() {
    localStorage.clear()
    navigate('/login')
  }

  return <div className="app-shell">
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark">P</div><div><strong>ProjectHub</strong><span>CONTROL CENTER</span></div></div>
      <div className="sidebar-label">Workspace</div>
      <nav>{items.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{icon}</span>{label}</NavLink>)}</nav>
      <div className="sidebar-footer"><div className="status-dot"><i /> API online</div><div className="mini-card"><span>Environment</span><b>LOCAL · DEV</b></div></div>
    </aside>
    <div className="main-wrap">
      <header className="topbar"><button className="mobile-menu" onClick={() => setOpen(!open)}>☰</button><div className="top-search">⌕ <input placeholder="Pesquisar no workspace..." /></div><div className="top-actions"><a href="/docs" target="_blank">Swagger ↗</a><div className="avatar">{(user?.name || 'P').slice(0,1).toUpperCase()}</div><div className="user-meta"><strong>{user?.name || 'Developer'}</strong><span>{user?.email || 'local session'}</span></div><button className="ghost-btn" onClick={logout}>Sair</button></div></header>
      <main className="content"><Outlet /></main>
    </div>
  </div>
}
