
import { useState } from 'react'
import { login, USERS } from '../utils/auth'

export default function Login() {
  const [user, setUser] = useState<typeof USERS[number]>("Nuno")
  const [pwd, setPwd] = useState("")
  const [err, setErr] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login(user, pwd)) {
      setErr("Onjuist wachtwoord.")
      return
    }
    location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-8">
        <div className="text-center font-extrabold text-2xl mb-6">Night Notes</div>
        <form onSubmit={submit} className="space-y-3">
          <select className="input" value={user} onChange={e => setUser(e.target.value as any)}>
            {USERS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <input className="input" type="password" placeholder="Wachtwoord" value={pwd} onChange={e => setPwd(e.target.value)} />
          {err && <div className="text-red-400 text-sm">{err}</div>}
          <button className="btn-primary w-full">Log in</button>
        </form>
      </div>
    </div>
  )
}
