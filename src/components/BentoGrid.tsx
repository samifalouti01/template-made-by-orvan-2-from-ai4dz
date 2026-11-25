import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Shield, Globe, Code, Cpu, Clock, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Edge-native compute with sub-millisecond cold starts. Your code runs closer to your users than ever before.',
    span: 'md:col-span-2',
    gradient: 'from-cyan-500/20 to-transparent',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'Zero-trust architecture with end-to-end encryption and SOC2 compliance built in.',
    span: 'md:col-span-1',
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    icon: Globe,
    title: 'Global Edge Network',
    desc: '42+ regions worldwide with automatic failover and intelligent routing.',
    span: 'md:col-span-1',
    gradient: 'from-magenta-500/20 to-transparent',
    highlight: true,
  },
  {
    icon: Code,
    title: 'Framework Agnostic',
    desc: 'Works with React, Next.js, Vue, Svelte — any stack, zero lock-in.',
    span: 'md:col-span-1',
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    icon: Cpu,
    title: 'Auto-Scaling Compute',
    desc: 'Intelligent resource allocation that scales from zero to millions of requests.',
    span: 'md:col-span-2',
    gradient: 'from-cyan-500/20 to-transparent',
  },
  {
    icon: Clock,
    title: 'Real-Time Analytics',
    desc: 'Sub-second data pipeline with live dashboards and custom alerts.',
    span: 'md:col-span-1',
    gradient: 'from-magenta-500/20 to-transparent',
  },
]

export default function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-card]') || []
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono font-medium tracking-wider uppercase">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
            Everything you need to{' '}
            <span className="text-gradient">ship faster</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Purpose-built for teams who demand performance without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, span, gradient, highlight }, i) => (
            <div
              key={i}
              data-card
              className={`${span} glass-card glass-card-hover neon-border rounded-2xl p-8 min-h-[220px] flex flex-col justify-between relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${highlight ? 'bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30' : 'bg-white/5 border border-white/10'}`}>
                  <Icon className={`w-5 h-5 ${highlight ? 'text-cyan-400' : 'text-white/70'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
              <div className="relative z-10 mt-6">
                <div className="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-cyan-400/70 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
