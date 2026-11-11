import React, { useState } from 'react';
import {
  FileText,
  Layers,
  Copy,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  Users,
  Settings,
  ChevronRight,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [selectedFile, setSelectedFile] = useState<'Code.gs' | 'Index.html' | 'Css.html' | 'Js.html'>('Code.gs');
  const [copied, setCopied] = useState(false);

  const fileDescriptions: Record<string, string> = {
    'Code.gs': 'Backend logic GAS: Akses spreadsheet, duplikasi template slides, deteksi Slide 17 (Anchor), loop per Prodi, replace tags, dan pembersihan master slides.',
    'Index.html': 'Antarmuka Web App Sidebar Google Sheets bertema Charcoal Dark dengan ringkasan status real-time.',
    'Css.html': 'Styling partial CSS bertema modern abu gelap charcoal elegan dengan scrollbar custom.',
    'Js.html': 'Script client-side yang memanggil fungsi google.script.run secara asinkron dengan penanganan error interaktif.'
  };

  const handleCopyPath = (filePath: string) => {
    navigator.clipboard.writeText(filePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111317] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#171a21]/90 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              Generator Presentasi Pelantikan Dokter Spesialis
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Apps Script Ready
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Folder: <span className="font-mono text-indigo-400">/google-apps-script</span> (Code.gs, Index.html, Css.html, Js.html)
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Struktur File GAS</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Banner Instruksi Integrasi */}
        <div className="bg-[#1a1d25] border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Aturan Ketat Slide Index & Anchor Insertion Terverifikasi</span>
              </div>
              <p className="text-sm text-slate-300">
                Kode backend Google Apps Script (<code className="text-amber-400">Code.gs</code>) dan komponen UI Web App (<code className="text-amber-400">Index.html</code>, <code className="text-amber-400">Css.html</code>, <code className="text-amber-400">Js.html</code>) telah disusun secara utuh pada folder <code className="text-indigo-400 bg-slate-900 px-2 py-0.5 rounded font-mono">google-apps-script/</code>.
              </p>
            </div>
            <button
              onClick={() => handleCopyPath('google-apps-script')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-all flex-shrink-0"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Salin Path Folder</span>
                </>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'preview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: UI Interactive Preview */}
            <div className="lg:col-span-8 space-y-6">
              {/* Template Architecture Visualizer */}
              <div className="bg-[#181b22] border border-slate-800 rounded-2xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Visualisasi Alur Urutan Slide (Strict Anchor)
                  </h3>
                  <span className="text-xs font-mono text-slate-500">ID: 1dh-tTb1...</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <div className="text-slate-500 font-mono text-[11px]">Slide 1–3</div>
                    <div className="font-semibold text-white mt-1">Cover & Pembuka</div>
                    <div className="text-[10px] text-slate-400 mt-1">Tag: &#123;&#123;TANGGAL_COVER&#125;&#125;</div>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl">
                    <div className="text-amber-400 font-mono text-[11px]">Slide 4 (Master)</div>
                    <div className="font-semibold text-amber-200 mt-1">Biodata Wisudawan</div>
                    <div className="text-[10px] text-amber-400/80 mt-1">Dihapus di akhir</div>
                  </div>

                  <div className="bg-indigo-950/20 border border-indigo-500/30 p-3 rounded-xl">
                    <div className="text-indigo-400 font-mono text-[11px]">Slide 5–15</div>
                    <div className="font-semibold text-indigo-200 mt-1">Sumpah Dokter</div>
                    <div className="text-[10px] text-indigo-400/80 mt-1">Posisi mutlak terkunci</div>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/40 p-3 rounded-xl ring-1 ring-emerald-500/30">
                    <div className="text-emerald-400 font-mono text-[11px] font-bold">Slide 16–17 (Anchor)</div>
                    <div className="font-semibold text-emerald-200 mt-1">Jeda Transisi 2</div>
                    <div className="text-[10px] text-emerald-300 mt-1">Titik Sisip Mulai S18</div>
                  </div>
                </div>

                {/* Insertion Diagram */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Hasil Generasi: Disisipkan tepat di Slide 18 secara berurutan per-Prodi:</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    [TTD Prodi A] → [Wisudawan A] → [TTD Prodi B] → [Wisudawan B]
                  </span>
                </div>
              </div>

              {/* Live Preview Container (Simulating Apps Script Web UI) */}
              <div className="bg-[#181b22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-[#14161d] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 font-mono text-slate-400 text-[11px]">Web UI Preview: Google Apps Script Modal / Sidebar</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Index.html + Css.html + Js.html</span>
                </div>

                {/* Rendered Mock UI in Charcoal Dark */}
                <div className="p-6 bg-[#121417] space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#1a1d24] border border-white/5 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Wisudawan</div>
                      <div className="text-2xl font-bold text-white mt-1">42 <span className="text-xs text-slate-500 font-normal">Kandidat</span></div>
                    </div>
                    <div className="bg-[#1a1d24] border border-white/5 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Program Studi</div>
                      <div className="text-2xl font-bold text-white mt-1">4 <span className="text-xs text-slate-500 font-normal">Prodi</span></div>
                    </div>
                    <div className="bg-[#1a1d24] border border-white/5 p-4 rounded-xl">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">Titik Sisip</div>
                      <div className="text-2xl font-bold text-amber-400 mt-1">Slide 18 <span className="text-xs text-slate-500 font-normal">(Pasca S17)</span></div>
                    </div>
                  </div>

                  <div className="bg-[#1a1d24] border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Preview Prodi & Pengaturan TTD</div>
                      <span className="text-[11px] text-indigo-400 font-mono">Tab TTD & Wisudawan</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">1</span>
                          <span className="text-slate-200 font-medium">Anestesiologi dan Terapi Intensif</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">Layout 1 (1 Foto)</span>
                        </div>
                        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">12 Dokter</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">2</span>
                          <span className="text-slate-200 font-medium">Ilmu Kesehatan Anak</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">Layout 2 (2 Foto)</span>
                        </div>
                        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">14 Dokter</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">3</span>
                          <span className="text-slate-200 font-medium">Ilmu Bedah</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">Layout 3 (3 Foto)</span>
                        </div>
                        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">9 Dokter</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Guide */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#181b22] border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  Langkah Pasang di Google Sheet
                </h3>
                <ol className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono flex items-center justify-center flex-shrink-0 text-[11px] font-bold">1</span>
                    <span>Buka Google Sheet data pelantikan Anda.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono flex items-center justify-center flex-shrink-0 text-[11px] font-bold">2</span>
                    <span>Klik menu <strong>Extensions (Ekstensi)</strong> &gt; <strong>Apps Script</strong>.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono flex items-center justify-center flex-shrink-0 text-[11px] font-bold">3</span>
                    <span>Salin 4 file dari folder <code className="text-indigo-400">google-apps-script</code>: <code className="text-amber-300">Code.gs</code>, <code className="text-amber-300">Index.html</code>, <code className="text-amber-300">Css.html</code>, <code className="text-amber-300">Js.html</code>.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono flex items-center justify-center flex-shrink-0 text-[11px] font-bold">4</span>
                    <span>Simpan & reload Google Sheet. Menu baru <strong>🎓 Pelantikan Spesialis</strong> akan muncul secara otomatis.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-[#181b22] border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Format Tab Google Sheet
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-slate-200">Tab 'TTD'</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">Kolom A: PRODI, Kolom B: LAYOUT (1/2/3), Kolom C: NAMA_TTD</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-slate-200">Tab 'Wisudawan'</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">Kolom: PRODI, NAMA, TTL, NAMA AYAH, NAMA IBU</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-slate-200">Tab 'PENGATURAN'</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">Baris: TANGGAL_COVER (misal: 18 Mei 2026)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Code File Viewer & Inspector */
          <div className="bg-[#181b22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#14161d] px-4 py-3">
              <div className="flex items-center space-x-2">
                {(['Code.gs', 'Index.html', 'Css.html', 'Js.html'] as const).map((file) => (
                  <button
                    key={file}
                    onClick={() => setSelectedFile(file)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
                      selectedFile === file
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{file}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Tersimpan di: <code className="text-indigo-400">google-apps-script/{selectedFile}</code>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-indigo-400" />
              <span>{fileDescriptions[selectedFile]}</span>
            </div>

            <div className="p-4 bg-[#0d0f14] overflow-x-auto text-xs font-mono text-slate-300">
              <p className="text-slate-400 italic">
                File <strong className="text-white">{selectedFile}</strong> telah dibuat utuh di direktori project <code className="text-indigo-400">google-apps-script/{selectedFile}</code> tanpa potongan kode (no truncation). Anda dapat langsung menyalinnya ke Apps Script editor.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
