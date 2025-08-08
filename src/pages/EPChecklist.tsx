
import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { generateSchedule, ReleaseRow } from '../utils/schedule'

type TaskRow = ReleaseRow & { id: string; splits: boolean; buma: boolean; done: boolean }

const KEY = 'releaseStates'
const LAST = 'lastCompleted'

function loadStates(): Record<string, Partial<TaskRow>> {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
function saveStates(s: Record<string, Partial<TaskRow>>) {
  localStorage.setItem(KEY, JSON.stringify(s))
}
function setLastCompleted(id: string){ localStorage.setItem(LAST, id || '') }
function getLastCompleted(){ return localStorage.getItem(LAST) || '' }

function toId(r: ReleaseRow){ return `${r.date}_${r.artist}` }

export default function EPChecklist(){
  const start = new Date()
  const end = new Date(); end.setDate(end.getDate()+44)
  const base = useMemo(()=>generateSchedule(start,end),[])
  const [rows, setRows] = useState<TaskRow[]>([])

  useEffect(()=>{
    const st = loadStates()
    const mapped = base.map(r=>{
      const id = toId(r)
      const s = st[id] || {}
      return { ...r, id, splits: !!s.splits, buma: !!s.buma, done: !!s.done }
    })
    setRows(mapped)
  }, [base.length])

  const user = (localStorage.getItem('epplanner:user') || '') as any

  const pending = rows.filter(r=>r.who===user && !r.done)
  const next = pending[0]

  function persist(t: TaskRow, justCompleted: boolean){
    const st = loadStates()
    st[t.id] = { splits: t.splits, buma: t.buma, done: t.done }
    saveStates(st)
    if (justCompleted) setLastCompleted(t.id)
  }

  function toggle(key: 'splits'|'buma'|'done'){
    if (!next) return
    const updated = { ...next, [key]: !(next as any)[key] } as TaskRow
    if (key !== 'done' && (!updated.splits || !updated.buma)) updated.done = false
    persist(updated, key==='done' && updated.done)
    setRows(rs=>rs.map(r=> r.id===updated.id ? updated : r))
  }

  const lastId = getLastCompleted()
  const last = rows.find(r=>r.id===lastId)

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        <h1 className="text-2xl font-semibold">EP Checklist</h1>

        <div className="card p-6">
          <div className="text-sm text-nn_muted mb-3">Volgende taak voor <b>{user}</b></div>
          {!next ? (
            <div className="text-nn_muted">Geen openstaande taken 🎉</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center">
              <div className="sm:col-span-2">{next.date} — <b>{next.artist}</b></div>
              <div>{next.who}</div>
              <div>{next.distribution}</div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={next.splits} onChange={()=>toggle('splits')} /> Splits</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={next.buma} onChange={()=>toggle('buma')} /> Buma</label>
              <label className="flex items-center gap-2 opacity-100">
                <input type="checkbox" checked={next.done} disabled={!(next.splits && next.buma)} onChange={()=>toggle('done')} /> Done
              </label>
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="font-semibold mb-2">Laatst afgerond</div>
          {!last ? <div className="text-nn_muted">Nog niks afgerond.</div> :
            <div>{last.date} — <b>{last.artist}</b> ({last.distribution})</div>
          }
        </div>
      </div>
    </div>
  )
}
