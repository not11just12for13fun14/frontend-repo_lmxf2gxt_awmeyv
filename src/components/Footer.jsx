export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm text-blue-100/80">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/flame-icon.svg" className="w-6 h-6" />
            <span className="text-white font-semibold">CreditCare</span>
          </div>
          <p>Portal pengaduan layanan kartu kredit dengan proses yang transparan, akuntabel, dan cepat.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Menu</h4>
          <ul className="space-y-2">
            <li><a href="/complaints" className="hover:text-white">Pengaduan</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/news" className="hover:text-white">Info</a></li>
            <li><a href="/contact" className="hover:text-white">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2">
            <li>Email: support@creditcare.id</li>
            <li>Telepon: 0800-123-456</li>
            <li>Jam layanan: 08.00 - 17.00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-blue-300/60 py-4 border-t border-white/10">© {new Date().getFullYear()} CreditCare. All rights reserved.</div>
    </footer>
  )
}
