import { useState } from 'react'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'
import { Activity, Database, Server, TrendingUp } from 'lucide-react'

const metricsData = [
  { label: 'Global Deployments', value: 12847, suffix: '', icon: Database, color: 'text-cyan-400' },
  { label: 'Avg Response Time', value: 14, suffix: 'ms', icon: Activity, color: 'text-violet-400' },
  { label: 'Active Regions', value: 42, suffix: '', icon: Server, color: 'text-magenta-400' },
  { label: 'Uptime SLA', value: 99, suffix: '.99%', icon: TrendingUp, color: 'text-emerald-400' },
]

const tabs = [
  { id: 'performance', label: 'Performance', content: 'Our edge network processes over 2.4 billion requests daily across 42 regions, maintaining p99 latency under 20ms for all global endpoints.' },
  { id: 'scalability', label: 'Scalability', content: 'From 0 to 10 million concurrent connections — auto-scaling adapts in real-time without manual intervention or configuration overhead.' },
  { id: 'security', label: 'Security', content: 'Military-grade encryption at rest and in transit. DDoS protection, WAF, and zero-trust authentication out of the box on every deployment.' },
]

function CounterCard({ metric }: { metric: typeof metricsData[number] & { decimalSuffix?: string } }) {
  const decimalSuffix = metric.label === 'Uptime SLA' ? '.99%' : metric.suffix
  const displayValue = metric.label === 'Uptime SLA' ? 99 : metric.value
  const { count } = useAnimatedCounter(displayValue)

  return (
    <div className="bg-white/5 rounded-xl p-4 space-y-2">
      <metric.icon className={`w-5 h-5 ${metric.color}`} />
      <div className="text-3xl font-black text-white font-mono">
        {count.toLocaleString()}
        <span className={`text-lg ${metric.color}`}>{decimalSuffix}</span>
      </div>
      <div className="text-xs text-white/40 font-medium">{metric.label}</div>
    </div>
  )
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState('performance')

  return (
    <section id="architecture" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-medium tracking-wider uppercase">
            Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
            Built for{' '}
            <span className="text-gradient-cyan">extreme scale</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {metricsData.map((metric) => (
                <CounterCard key={metric.label} metric={metric} />
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="space-y-4 min-h-[80px]">
              {tabs.filter(t => t.id === activeTab).map((tab) => (
                <p key={tab.id} className="text-white/60 text-sm leading-relaxed">{tab.content}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {['Compute Nodes', 'CDN Cache', 'Auth Layer'].map((label) => (
                <div key={label} className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-2 pulse-dot" />
                  <div className="text-xs text-white/50">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Real-Time System Monitor</h3>
              <p className="text-white/40 text-sm">Live metrics from our global infrastructure</p>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
              {['CPU: 23%', 'MEM: 4.2GB', 'NET: 1.2Gb/s'].map((m) => (
                <span key={m} className="text-white/50">{m}</span>
              ))}
            </div>
          </div>
          <VisualizationBar />
        </div>
      </div>
    </section>
  )
}

function VisualizationBar() {
  const [bars] = useState(() =>
    Array.from({ length: 60 }).map(() => ({
      h: 20 + Math.sin(Math.random() * Math.PI * 2) * 30 + Math.random() * 40,
      o: 0.4 + Math.random() * 0.6,
    }))
  )

  return (
    <div className="mt-6 flex gap-1 h-24 items-end">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/60 to-violet-500/30 transition-all duration-300"
          style={{ height: `${bar.h}%`, opacity: bar.o }}
        />
      ))}
    </div>
  )
}
