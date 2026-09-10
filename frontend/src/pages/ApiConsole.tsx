import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '../lib/api'
import { PageHeader, Badge } from '../components/Ui'

const presets = [
  { method: 'GET', path: '/', body: '' },
  { method: 'GET', path: '/projects', body: '' },
  { method: 'GET', path: '/users', body: '' },
  { method: 'POST', path: '/projects', body: '{\n  "name": "Novo Projeto",\n  "description": "Criado pelo REST Console"\n}' },
  { method: 'POST', path: '/auth/login', body: '{\n  "email": "",\n  "password": ""\n}' },
]

export default function ApiConsole() {
  const [method, setMethod] = useState('GET')
  const [path, setPath] = useState('/projects')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState('Pronto para executar uma requisição.')
  const [status, setStatus] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const token = useMemo(() => Boolean(localStorage.getItem('projecthub_token')), [])

  function loadPreset(index: number) {
    const item = presets[index]
    setMethod(item.method); setPath(item.path); setBody(item.body); setStatus(null)
  }

  async function execute(e: FormEvent) {
    e.preventDefault(); setBusy(true); setStatus(null)
    try {
      let data: unknown = undefined
      if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) data = JSON.parse(body)
      const result = await api.request({ method, url: path, data })
      setStatus(result.status); setResponse(JSON.stringify(result.data, null, 2))
    } catch (error: any) {
      const responseData = error.response?.data ?? { error: error.message || 'Erro de execução' }
      setStatus(error.response?.status ?? null)
      setResponse(JSON.stringify(responseData, null, 2))
    } finally { setBusy(false) }
  }

  return <><PageHeader eyebrow="DEVELOPER TOOLING" title="REST Console" description="Execute operações diretamente contra a API usando a sessão atual. Ideal para validar contratos e demonstrar domínio do backend." action={<Badge tone={token ? 'success' : 'amber'}>{token ? 'JWT ATTACHED' : 'SEM JWT'}</Badge>} />
    <section className="console-layout"><div className="panel console-editor"><div className="panel-head"><div><span className="eyebrow">REQUEST</span><h3>Request builder</h3></div></div><div className="preset-row">{presets.map((p, i) => <button key={i} className="soft-btn" onClick={() => loadPreset(i)}>{p.method} {p.path}</button>)}</div><form onSubmit={execute}><div className="method-path"><select value={method} onChange={e=>setMethod(e.target.value)}><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select><input value={path} onChange={e=>setPath(e.target.value)} placeholder="/projects" /></div><label>JSON body<textarea value={body} onChange={e=>setBody(e.target.value)} rows={15} placeholder="{ }" /></label><div className="console-foot"><span>Authorization: Bearer {token ? '••••••••' : 'not available'}</span><button className="primary-btn" disabled={busy}>{busy ? 'Executando...' : 'Enviar requisição →'}</button></div></form></div><div className="panel response-panel"><div className="panel-head"><div><span className="eyebrow">RESPONSE</span><h3>Server output</h3></div>{status && <Badge tone={status < 300 ? 'success' : 'amber'}>{status}</Badge>}</div><pre>{response}</pre></div></section></>
}
