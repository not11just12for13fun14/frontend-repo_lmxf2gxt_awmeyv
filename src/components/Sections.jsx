import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export function HomeSections() {
  const [news, setNews] = useState([])
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    fetch(`${API}/api/news`).then(r=>r.json()).then(setNews).catch(()=>{})
    fetch(`${API}/api/faqs`).then(r=>r.json()).then(setFaqs).catch(()=>{})
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section>
        <h2 className="text-white text-2xl font-semibold mb-4">Informasi Terbaru</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n) => (
            <article key={n.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold">{n.title}</h3>
              <p className="text-blue-100/80 text-sm line-clamp-3">{n.content}</p>
            </article>
          ))}
          {news.length === 0 && <div className="text-blue-100/80">Belum ada informasi.</div>}
        </div>
      </section>

      <section>
        <h2 className="text-white text-2xl font-semibold mb-4">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <summary className="text-white font-medium cursor-pointer">{f.question}</summary>
              <p className="text-blue-100/80 mt-2">{f.answer}</p>
            </details>
          ))}
          {faqs.length === 0 && <div className="text-blue-100/80">Belum ada FAQ.</div>}
        </div>
      </section>
    </div>
  )
}

export function ComplaintsPage() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ title: '', description: '', category: 'lainnya', priority: 'sedang' })
  const [submitting, setSubmitting] = useState(false)

  const user = JSON.parse(localStorage.getItem('ccportal_user') || 'null')

  const load = () => {
    fetch(`${API}/api/complaints`).then(r=>r.json()).then(setList).catch(()=>{})
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!user) { alert('Silakan login terlebih dahulu'); return }
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/complaints`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user_id: user.id })
      })
      if (!res.ok) throw new Error('Gagal')
      setForm({ title: '', description: '', category: 'lainnya', priority: 'sedang' })
      load()
    } catch (e) { alert('Gagal mengirim pengaduan') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {list.map((c) => (
          <div key={c.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">{c.title}</h3>
              <span className="text-xs text-blue-200/80 px-2 py-1 rounded bg-white/10">{c.status}</span>
            </div>
            <p className="text-blue-100/80 mt-2">{c.description}</p>
            <div className="text-xs text-blue-200/70 mt-3">Kategori: {c.category} • Prioritas: {c.priority}</div>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3 p-5 rounded-xl bg-white/5 border border-white/10">
        <h4 className="text-white font-semibold">Buat Pengaduan</h4>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60 focus:outline-none" placeholder="Judul" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
        <select className="w-full px-3 py-2 rounded bg-white/10 text-white" value={form.category} onChange={e=>setForm(f=>({...f, category:e.target.value}))}>
          <option value="limit">Limit</option>
          <option value="tagihan">Tagihan</option>
          <option value="kartu_hilang">Kartu Hilang</option>
          <option value="penipuan">Penipuan</option>
          <option value="biaya">Biaya</option>
          <option value="lainnya">Lainnya</option>
        </select>
        <select className="w-full px-3 py-2 rounded bg-white/10 text-white" value={form.priority} onChange={e=>setForm(f=>({...f, priority:e.target.value}))}>
          <option value="rendah">Rendah</option>
          <option value="sedang">Sedang</option>
          <option value="tinggi">Tinggi</option>
        </select>
        <textarea className="w-full px-3 py-2 rounded bg-white/10 text-white placeholder-blue-200/60 focus:outline-none" placeholder="Deskripsi" rows={4} value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))}/>
        <button disabled={submitting} className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">{submitting ? 'Mengirim...' : 'Kirim Pengaduan'}</button>
      </form>
    </div>
  )
}

export function AuthPages() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({name:'', email:'', password:''})

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const r = await fetch(`${API}/api/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: form.email, password: form.password }) })
        if (!r.ok) throw new Error('Login gagal')
        const data = await r.json()
        localStorage.setItem('ccportal_user', JSON.stringify(data.user))
        window.location.href = '/'
      } else {
        const r = await fetch(`${API}/api/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
        if (!r.ok) throw new Error('Registrasi gagal')
        const user = await r.json()
        localStorage.setItem('ccportal_user', JSON.stringify(user))
        window.location.href = '/'
      }
    } catch (e) { alert(e.message) }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex gap-1 mb-6">
          <button className={`flex-1 px-4 py-2 rounded-md ${isLogin?'bg-blue-600 text-white':'bg-white/10 text-blue-100'}`} onClick={()=>setIsLogin(true)}>Masuk</button>
          <button className={`flex-1 px-4 py-2 rounded-md ${!isLogin?'bg-blue-600 text-white':'bg-white/10 text-blue-100'}`} onClick={()=>setIsLogin(false)}>Daftar</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {!isLogin && <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Nama Lengkap" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>}        
          <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
          <input className="w-full px-3 py-2 rounded bg-white/10 text-white" type="password" placeholder="Kata Sandi" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))}/>
          <button className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">{isLogin? 'Masuk' : 'Daftar'}</button>
        </form>
      </div>
    </div>
  )
}

export function FAQPage() {
  const [faqs, setFaqs] = useState([])
  const [form, setForm] = useState({question:'', answer:'', is_active:true})

  const load = ()=> fetch(`${API}/api/faqs`).then(r=>r.json()).then(setFaqs)
  useEffect(()=>{load()},[])

  const submit = async (e) => {
    e.preventDefault()
    const r = await fetch(`${API}/api/faqs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    if (r.ok) { setForm({question:'', answer:'', is_active:true}); load() }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-3">
        {faqs.map((f,i)=> (
          <details key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <summary className="text-white font-medium cursor-pointer">{f.question}</summary>
            <p className="text-blue-100/80 mt-2">{f.answer}</p>
          </details>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3 p-5 rounded-xl bg-white/5 border border-white/10">
        <h4 className="text-white font-semibold">Tambah FAQ</h4>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Pertanyaan" value={form.question} onChange={e=>setForm(f=>({...f, question:e.target.value}))}/>
        <textarea className="w-full px-3 py-2 rounded bg-white/10 text-white" rows={4} placeholder="Jawaban" value={form.answer} onChange={e=>setForm(f=>({...f, answer:e.target.value}))}/>
        <label className="flex items-center gap-2 text-blue-100/80"><input type="checkbox" checked={form.is_active} onChange={e=>setForm(f=>({...f, is_active:e.target.checked}))}/> Aktif</label>
        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white">Simpan</button>
      </form>
    </div>
  )
}

export function NewsPage() {
  const [news, setNews] = useState([])
  const [form, setForm] = useState({title:'', content:'', is_published:true})

  const load = ()=> fetch(`${API}/api/news`).then(r=>r.json()).then(setNews)
  useEffect(()=>{load()},[])

  const submit = async (e) => {
    e.preventDefault()
    const r = await fetch(`${API}/api/news`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    if (r.ok) { setForm({title:'', content:'', is_published:true}); load() }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-3">
        {news.map((n)=> (
          <article key={n.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold">{n.title}</h3>
            <p className="text-blue-100/80 mt-2">{n.content}</p>
          </article>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3 p-5 rounded-xl bg-white/5 border border-white/10">
        <h4 className="text-white font-semibold">Tambah Info</h4>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Judul" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))}/>
        <textarea className="w-full px-3 py-2 rounded bg-white/10 text-white" rows={4} placeholder="Konten" value={form.content} onChange={e=>setForm(f=>({...f, content:e.target.value}))}/>
        <label className="flex items-center gap-2 text-blue-100/80"><input type="checkbox" checked={form.is_published} onChange={e=>setForm(f=>({...f, is_published:e.target.checked}))}/> Publikasikan</label>
        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white">Simpan</button>
      </form>
    </div>
  )
}

export function ContactPage() {
  const [form, setForm] = useState({name:'', email:'', subject:'', message:''})
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const r = await fetch(`${API}/api/contact`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    if (r.ok) setSent(true)
  }

  if (sent) return <div className="max-w-xl mx-auto px-6 py-16 text-center text-white">Pesan terkirim. Kami akan merespons melalui email.</div>

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <form onSubmit={submit} className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="text-white font-semibold">Hubungi Kami</h4>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Nama" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}/>
        <input className="w-full px-3 py-2 rounded bg-white/10 text-white" placeholder="Subjek" value={form.subject} onChange={e=>setForm(f=>({...f, subject:e.target.value}))}/>
        <textarea className="w-full px-3 py-2 rounded bg-white/10 text-white" rows={5} placeholder="Pesan" value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))}/>
        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white">Kirim</button>
      </form>
    </div>
  )
}

export function DashboardPage() {
  const [summary, setSummary] = useState(null)
  useEffect(()=>{ fetch(`${API}/api/dashboard/summary`).then(r=>r.json()).then(setSummary) },[])
  if (!summary) return <div className="max-w-7xl mx-auto px-6 py-16 text-white">Memuat...</div>
  const Stat = ({label, value}) => (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-blue-100/80">{label}</div>
    </div>
  )
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-4">
      <Stat label="Pengguna" value={summary.users}/>
      <Stat label="Pengaduan" value={summary.complaints}/>
      <Stat label="Proses/Terbuka" value={summary.complaints_open}/>
      <Stat label="Selesai" value={summary.complaints_closed}/>
      <Stat label="FAQ Aktif" value={summary.faqs}/>
      <Stat label="Info Terbit" value={summary.news}/>
    </div>
  )
}

export function ProfilePage() {
  const [user, setUser] = useState(null)
  useEffect(()=>{ const u = localStorage.getItem('ccportal_user'); if (u) setUser(JSON.parse(u)) },[])
  if (!user) return <div className="max-w-xl mx-auto px-6 py-16 text-white">Silakan masuk terlebih dahulu.</div>
  return (
    <div className="max-w-xl mx-auto px-6 py-16 space-y-3 text-white">
      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <div className="font-semibold">{user.name}</div>
        <div className="text-blue-200/80 text-sm">{user.email}</div>
        <div className="text-xs mt-2 px-2 py-1 rounded bg-white/10 w-fit">Peran: {user.role}</div>
      </div>
    </div>
  )
}
