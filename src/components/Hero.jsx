import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[520px] sm:h-[600px]">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 pb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Portal Pengaduan Kartu Kredit</h1>
            <p className="text-blue-100/90 text-lg mb-6">Sampaikan keluhan Anda terkait layanan kartu kredit. Tim kami siap membantu secara transparan dan profesional.</p>
            <div className="flex gap-3">
              <a href="/complaints" className="px-5 py-3 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500">Buat Pengaduan</a>
              <a href="/faq" className="px-5 py-3 rounded-md text-sm font-semibold text-blue-100 bg-white/10 hover:bg-white/20">Lihat FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
