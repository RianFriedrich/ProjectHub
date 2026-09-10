import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, api } from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await auth.login(email, password)
      localStorage.setItem('projecthub_token', res.data.token)
      try { const me = await api.get('/protected'); localStorage.setItem('projecthub_user', JSON.stringify({ id: me.data.userId, name: email.split('@')[0], email })) } catch {}
      navigate('/')
    } catch (err: any) { setError(err.response?.data?.error || 'Não foi possível entrar.') }
    finally { setLoading(false) }
  }
  return <div className="login-page"><div className="login-bg" /><div className="login-card"><div className="login-logo"><div className="brand-mark">P</div><div><strong>ProjectHub</strong><span>ENTERPRISE CONTROL CENTER</span></div></div><div className="login-copy"><div className="eyebrow">SECURE WORKSPACE</div><h1>Entre no seu<br/><em>workspace.</em></h1><p>Gerencie projetos, tarefas, usuários e toda a operação do backend em um único centro.</p></div><form onSubmit={submit}><label>E-mail<input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="voce@empresa.com" required /></label><label>Senha<input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" required /></label>{error && <div className="form-error">{error}</div>}<button className="primary-btn full" disabled={loading}>{loading ? 'Autenticando...' : 'Entrar no ProjectHub →'}</button></form><div className="divider"><span>ou</span></div><a className="microsoft-btn" href={auth.microsoftUrl()}>Continuar com Microsoft <span>↗</span></a><small className="login-foot">JWT authentication · Microsoft Entra ID · API REST</small></div></div>
}
