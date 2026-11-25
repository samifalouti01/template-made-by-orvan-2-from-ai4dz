import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'

type FormData = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>

const initialState: FormData = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {}
    if (!data.name.trim()) errs.name = 'Name is required'
    if (!data.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Invalid email address'
    if (!data.message.trim()) errs.message = 'Message is required'
    else if (data.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm(initialState)
  }

  return (
    <section id="contact" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-magenta-500/30 bg-magenta-500/10 text-magenta-400 text-xs font-mono font-medium tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
            Request early{' '}
            <span className="text-gradient">access</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            Join the waitlist and be among the first to experience the future of infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@websity.dev' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000' },
              { icon: MapPin, label: 'HQ', value: 'San Francisco, CA' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card rounded-xl p-5 flex items-center gap-4 neon-border glass-card-hover">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-white font-medium">{value}</div>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-white/60 text-sm">Response time: &lt; 2 hours</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Our team reviews every submission personally. Enterprise inquiries receive priority handling with a dedicated solutions architect.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Sent!</h3>
                  <p className="text-white/50 max-w-xs">
                    Thanks for reaching out. We&apos;ll get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'} rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'} rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'} rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
