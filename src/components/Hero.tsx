import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Play, Activity } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .fromTo(cardRef.current, { y: 40, opacity: 0, rotateX: 10 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-magenta-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
            <span className="text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">v3.0 — Now Available</span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-white"
          >
            Build at the
            <br />
            speed of{' '}
            <span className="text-gradient animate-gradient bg-[length:200%_200%]">light</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg text-white/50 max-w-md leading-relaxed"
          >
            The next generation infrastructure platform. Deploy globally in seconds with
            edge-native compute, real-time analytics, and zero-config scaling.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full font-semibold text-void overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,212,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                Start Building
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 text-white/80 font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { label: 'Uptime', value: '99.99%' },
              { label: 'Regions', value: '42+' },
              { label: 'Deploy', value: '<2s' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white font-mono">{value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={cardRef} className="hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-magenta-500/20 rounded-3xl blur-2xl" />
            <div className="relative glass-card rounded-2xl p-6 space-y-4 animate-float">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/80 text-sm font-medium">Live Telemetry</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                  ONLINE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Requests/sec', value: '1.2M', change: '+12%', color: 'text-cyan-400' },
                  { label: 'Latency (p99)', value: '14ms', change: '-8%', color: 'text-emerald-400' },
                  { label: 'Active Nodes', value: '847', change: '+3', color: 'text-violet-400' },
                  { label: 'Error Rate', value: '0.01%', change: '-0.02%', color: 'text-magenta-400' },
                ].map(({ label, value, change, color }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3">
                    <div className="text-xs text-white/40 mb-1">{label}</div>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold text-white font-mono">{value}</span>
                      <span className={`text-xs ${color}`}>{change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-xs text-white/40 mb-3">Throughput Over Time</div>
                <div className="flex items-end gap-1 h-16">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/60 to-violet-500/40"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
