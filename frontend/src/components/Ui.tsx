import type { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>
}
export function Stat({ label, value, meta, tone = '' }: { label: string; value: string | number; meta: string; tone?: string }) {
  return <div className={`stat-card ${tone}`}><div className="stat-top"><span>{label}</span><span className="stat-pulse" /></div><strong>{value}</strong><small>{meta}</small></div>
}
export function Empty({ title, description }: { title: string; description: string }) { return <div className="empty"><div className="empty-icon">◌</div><h3>{title}</h3><p>{description}</p></div> }
export function Badge({ children, tone = '' }: { children: ReactNode; tone?: string }) { return <span className={`badge ${tone}`}>{children}</span> }
