'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Heart, 
  PlayCircle, 
  CheckCircle, 
  ChevronDown,
  Share2,
  MessageCircle,
  Globe,
  Battery,
  Monitor,
  GraduationCap,
  Users,
  Briefcase,
  Leaf,
  ArrowRight
} from 'lucide-react'
import { 
  NavItem, 
  StatItem, 
  SolutionStep, 
  Testimonial, 
  ImpactMetric, 
  DonationForm,
  LeadershipInfo 
} from '@/types'

const navItems: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#solution', label: 'Our Solution' },
  { href: '#impact', label: 'Impact' },
  { href: '#stories', label: 'Stories' },
  { href: '#support', label: 'Support Us' },
]

const heroStats: StatItem[] = [
  { id: 'stat-trained', value: 36214, label: 'Youth Trained' },
  { id: 'stat-raised', value: 2712400, label: 'Raised This Year', prefix: 'KSh ' },
  { id: 'stat-labs', value: 14, label: 'Solar Labs Deployed' },
]

const solutionSteps: SolutionStep[] = [
  {
    id: 1,
    emoji: 'Sun',
    title: 'Solar Panels Harvest Energy',
    description: 'Clean, renewable power even in the most remote villages. No grid required.',
  },
  {
    id: 2,
    emoji: 'Battery',
    title: 'Power Storage & Distribution',
    description: 'Batteries store energy for 40 laptops + projector. Runs all day.',
    badge: '40 laptops · 8 hours · 100% solar'
  },
  {
    id: 3,
    emoji: 'Monitor',
    title: 'Mobile Computer Lab',
    description: 'Cambridge-certified curriculum. Coding, digital literacy, job-ready skills.',
  },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Achieng Omondi',
    role: 'Student',
    location: 'Busia County',
    content: 'I learned coding and now I fix phones in my village. DSAID changed my life.',
    imageId: '1005',
    avatarColor: 'bg-amber-300'
  },
  {
    id: 2,
    name: 'Teacher Mary Wanjiku',
    role: 'Educator',
    location: 'Budalangi',
    content: 'My school never had computers. Now every Friday we have digital class. Thank you DSAID!',
    imageId: '1016',
    avatarColor: 'bg-emerald-300'
  },
  {
    id: 3,
    name: 'Chief Ochieng',
    role: 'Community Leader',
    location: 'Siaya County',
    content: 'The solar lab is the brightest thing in our village literally and figuratively.',
    imageId: '133',
    avatarColor: 'bg-sky-300'
  },
]

const impactMetrics: ImpactMetric[] = [
  { id: 'schools', emoji: 'GraduationCap', value: 187, label: 'Schools transformed' },
  { id: 'girls', emoji: 'Users', value: 58, label: '% Girls in our labs' },
  { id: 'jobs', emoji: 'Briefcase', value: 1240, label: 'Youth now employed' },
  { id: 'co2', emoji: 'Leaf', value: 84, label: 'Tonnes CO² saved' },
]

const leadershipInfo: LeadershipInfo = {
  name: 'Mr. Patrick Owidh',
  title: 'Acting Executive Director',
  image: '64',
  quote: 'Our Solar Mobile Labs are more than technology they are mobile universities that change entire communities.',
  motivation: 'the need to enhance socio-economic well-being by bridging the digital divide in rural communities',
  experience: 'extensive experience in educational technology and community development'
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState(2000)
  const [impactStudents, setImpactStudents] = useState(0)
  const [showImpact, setShowImpact] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<Set<string>>(new Set())

  const statsRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (!animatedStats.has(id)) {
              animateValue(id, 0, getStatValue(id), 2000, getStatPrefix(id))
              setAnimatedStats(prev => new Set([...prev, id]))
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const statElements = document.querySelectorAll('[id^="stat-"], [id^="schools"], [id^="girls"], [id^="jobs"], [id^="co2"]')
    statElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [animatedStats])

  const getStatValue = (id: string) => {
    const stat = heroStats.find(s => s.id === id) || impactMetrics.find(m => m.id === id)
    return stat?.value || 0
  }

  const getStatPrefix = (id: string) => {
    const stat = heroStats.find(s => s.id === id)
    return stat?.prefix || ''
  }

  const animateValue = (id: string, start: number, end: number, duration: number, prefix = '') => {
    const element = document.getElementById(id)
    if (!element) return
    
    const range = end - start
    const startTime = Date.now()
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(progress * range + start)
      element.textContent = prefix + value.toLocaleString()
      
      if (progress >= 1) {
        clearInterval(timer)
        element.textContent = prefix + end.toLocaleString()
      }
    }, 16)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const calculateImpact = (amount: number) => {
    const students = Math.floor(amount / 85)
    setDonationAmount(amount)
    setImpactStudents(students)
    setShowImpact(true)
  }

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    setShowThankYou(true)
    setTimeout(() => setShowThankYou(false), 4200)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-neutral-950 text-white overflow-x-hidden`}>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
              D
            </div>
            <div>
              <span className="font-semibold text-2xl tracking-tighter section-header">DSAID</span>
              <span className="text-blue-400 text-xs tracking-[2px] block -mt-1">KENYA</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 glass rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Donate Button */}
            <Button
              onClick={() => scrollToSection('#support')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-3xl flex items-center gap-x-2 shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              <Heart className="h-4 w-4" />
              DONATE NOW
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 glass rounded-2xl flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass mx-4 mt-2 rounded-3xl p-6 flex flex-col gap-y-6 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="py-2 text-left"
              >
                {item.label === 'About' ? 'About DSAID' : 
                 item.label === 'Our Solution' ? 'Our Solar Labs' :
                 item.label === 'Impact' ? 'Real Impact' :
                 item.label === 'Stories' ? 'Stories & Gallery' :
                 item.label === 'Support Us' ? 'Support the Mission' : item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex gap-4">
              <a href="https://www.facebook.com/dsaidke/" target="_blank" rel="noopener noreferrer" 
                 className="flex-1 text-center py-4 glass rounded-3xl">Facebook</a>
              <a href="#support" 
                 onClick={(e) => { e.preventDefault(); scrollToSection('#support'); }}
                 className="flex-1 text-center py-4 bg-emerald-500 rounded-3xl">Contact Us</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header id="hero" className="min-h-screen flex items-center pt-20 relative bg-hero-gradient" 
             style={{ backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(59, 130, 246, 0.65)), url(https://picsum.photos/id/1015/2000/1200)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            {/* Glassmorphic Hero Card */}
            <div className="glass rounded-3xl p-10 md:p-14 max-w-2xl">
              <div className="inline-flex items-center gap-x-2 bg-white/10 text-white text-sm font-medium px-6 py-2 rounded-3xl mb-6 backdrop-blur-md">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                EST. 2007 · 16 YEARS OF IMPACT
              </div>
              
              <h1 className="text-6xl md:text-7xl font-semibold leading-none tracking-tighter section-header">
                Empowering Kenya's<br/>Future Through<br/><span className="text-blue-400">Digital Education</span>
              </h1>
              
              <p className="mt-6 text-xl text-white/90 max-w-md">
                Digital Mobile Computer Labs · World-class ICT training · 
                Bridging the digital divide in rural Kenya.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Button
                  onClick={() => scrollToSection('#support')}
                  className="px-10 py-6 bg-white text-neutral-950 font-semibold rounded-3xl text-lg flex items-center gap-x-3 hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
                >
                  <Heart className="h-5 w-5" />
                  DONATE TODAY
                </Button>
                
                <Button
                  onClick={() => setShowVideoModal(true)}
                  variant="outline"
                  className="px-10 py-6 border border-white/40 hover:border-white/80 font-medium rounded-3xl flex items-center gap-x-3 backdrop-blur-md transition-all"
                >
                  <PlayCircle className="h-8 w-8" />
                  WATCH 90-SECOND STORY
                </Button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
                {heroStats.map((stat) => (
                  <div key={stat.id}>
                    <div id={stat.id} className="count-up text-5xl font-semibold text-emerald-400">0</div>
                    <div className="text-sm tracking-widest uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side visual */}
          <div className="md:col-span-5 hidden lg:flex justify-end">
            <div className="relative">
              <div className="absolute -top-8 -left-8 bg-white/10 glass w-72 h-72 rounded-3xl rotate-12 flex items-center justify-center text-8xl shadow-2xl z-10">
                <span className="text-blue-400">DSAID</span>
              </div>
              <div className="glass rounded-3xl p-6 text-center relative z-20">
                <div className="text-blue-400 text-sm font-medium mb-2 flex items-center justify-center gap-2">
                  <Monitor className="h-4 w-4" />
                  LIVE FROM BUSIA COUNTY
                </div>
                <img src="https://picsum.photos/id/1005/600/700" alt="Kenyan students in computer lab" 
                     className="rounded-3xl shadow-2xl w-full max-w-xs mx-auto" />
                <div className="mt-4 text-xs uppercase tracking-[1px] flex justify-between items-center">
                  <span>36,214 students reached</span>
                  <span className="text-blue-400">· TODAY ·</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 flex flex-col items-center text-white/60 text-xs tracking-widest">
          <div className="animate-bounce">ChevronDown</div>
          SCROLL FOR IMPACT
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/3 right-12 text-6xl opacity-20 solar-orbit">
          <Monitor className="h-16 w-16 text-blue-400" />
        </div>
        <div className="absolute bottom-1/3 left-12 text-5xl opacity-20" style={{ animation: 'orbit 35s linear infinite reverse' }}>
          <Users className="h-12 w-12 text-blue-400" />
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-screen-2xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <div className="sticky top-8">
              <span className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-3xl">OUR STORY</span>
              <h2 className="text-5xl section-header font-semibold tracking-tighter mt-3">Digital literacy for every Kenyan child.</h2>
              <p className="mt-6 text-lg text-neutral-400">Since 2007, DSAID has been on a mission to close the digital divide in rural Kenya. We don't just bring computers we bring hope, opportunity, and the future.</p>
              
              <div className="glass rounded-3xl p-8 mt-12">
                <div className="flex items-center gap-4">
                  <img src="https://picsum.photos/id/64/80/80" alt="Patrick Owidh" className="w-12 h-12 rounded-2xl" />
                  <div>
                    <p className="font-medium">{leadershipInfo.name}</p>
                    <p className="text-sm text-emerald-400">{leadershipInfo.title}</p>
                  </div>
                </div>
                <p className="mt-6 text-neutral-300">"{leadershipInfo.quote}"</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="glass rounded-3xl p-8 hover:scale-[1.02] transition-transform">
              <Sun className="h-10 w-10 mb-6 text-amber-400" />
              <h4 className="text-2xl font-medium">Vision</h4>
              <ul className="mt-6 space-y-4 text-neutral-300">
                <li className="flex gap-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                  Digital literacy for every student
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                  Sustainable tech for rural schools
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                  Empowered communities through education
                </li>
              </ul>
            </Card>
            
            <Card className="glass rounded-3xl p-8 hover:scale-[1.02] transition-transform">
              <div className="text-6xl mb-6">Globe</div>
              <h4 className="text-2xl font-medium">16 Years of Impact</h4>
              <div className="mt-8 space-y-6">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Students trained</span>
                  <span className="font-mono text-3xl">36,214</span>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Schools reached</span>
                  <span className="font-mono text-3xl">187</span>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Solar labs deployed</span>
                  <span className="font-mono text-3xl">14</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="bg-neutral-900 py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center max-w-md mx-auto mb-16">
            <h2 className="text-5xl section-header font-semibold tracking-tighter">How a solar lab changes everything</h2>
            <p className="mt-4 text-neutral-400">One truck. One solar system. Unlimited futures.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutionSteps.map((step, index) => {
              const IconComponent = step.emoji === 'Sun' ? Sun : step.emoji === 'Battery' ? Battery : Monitor
              return (
                <Card key={step.id} className={`glass rounded-3xl p-8 group ${index === 1 ? '-mt-6 md:mt-0' : ''}`}>
                  <div className="text-7xl mb-8 transition-transform group-hover:rotate-12">
                    <IconComponent className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-medium">{step.title}</h3>
                  <p className="mt-3 text-neutral-400">{step.description}</p>
                  {step.badge && (
                    <div className="mt-8 bg-white/10 rounded-2xl p-4 text-xs font-mono text-center">
                      {step.badge}
                    </div>
                  )}
                  {step.id === 3 && (
                    <Button 
                      variant="outline"
                      className="mt-10 w-full py-6 rounded-3xl border border-white/30 hover:bg-white/10 text-sm font-medium flex items-center justify-center gap-x-2"
                    >
                      SEE THE LAB IN ACTION <ArrowRight className="h-5 w-5" />
                    </Button>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="max-w-screen-2xl mx-auto px-8 py-24">
        <h2 className="text-center text-5xl section-header font-semibold tracking-tighter mb-16">Real impact. Real lives changed.</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactMetrics.map((metric) => {
            const IconComponent = metric.emoji === 'GraduationCap' ? GraduationCap : 
                                metric.emoji === 'Users' ? Users :
                                metric.emoji === 'Briefcase' ? Briefcase : Leaf
            return (
              <Card key={metric.id} className="glass rounded-3xl p-10 text-center">
                <IconComponent className="h-16 w-16 mx-auto mb-4" />
                <div id={metric.id} className="count-up text-6xl font-semibold text-emerald-400">0</div>
                <p className="uppercase text-sm tracking-widest mt-2">{metric.label}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* GALLERY + TESTIMONIALS */}
      <section id="stories" className="bg-neutral-900 py-20">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-5xl section-header font-semibold tracking-tighter text-center mb-12">Stories from the field</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glass rounded-3xl overflow-hidden">
                <div className="relative">
                  <img src={`https://picsum.photos/id/${testimonial.imageId}/800/600`} 
                       className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                </div>
                <CardContent className="p-8">
                  <p className="italic text-white/90">"{testimonial.content}"</p>
                  <div className="flex items-center gap-x-3 mt-8">
                    <div className={`w-8 h-8 ${testimonial.avatarColor} rounded-2xl flex items-center justify-center text-white font-bold text-sm`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">{testimonial.name}</p>
                      <p className="text-xs text-blue-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="https://www.facebook.com/dsaidke/" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-3xl hover:scale-105 transition-all text-sm font-medium text-white">
              SEE FULL GALLERY ON FACEBOOK <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* DONATE / SUPPORT SECTION */}
      <section id="support" className="max-w-screen-2xl mx-auto px-8 py-24 bg-gradient-to-b from-transparent via-emerald-950/30 to-transparent">
        <Card className="glass rounded-3xl max-w-4xl mx-auto p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-semibold">Your donation powers the future</h2>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-6xl font-semibold text-emerald-400">KSh 2,712,400</span>
                <span className="text-neutral-400">raised of KSh 4,500,000 goal</span>
              </div>
              <div className="h-3 bg-white/10 rounded-3xl mt-4 overflow-hidden">
                <div className="h-3 w-[60%] bg-emerald-400 rounded-3xl"></div>
              </div>
              
              {/* Impact Calculator */}
              <div className="mt-10">
                <label className="text-sm font-medium">How much would you like to give?</label>
                <div className="flex gap-x-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => calculateImpact(500)}
                    className="flex-1 py-4 glass rounded-3xl text-sm font-medium"
                  >
                    KSh 500
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateImpact(2000)}
                    className="flex-1 py-4 glass rounded-3xl text-sm font-medium"
                  >
                    KSh 2,000
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateImpact(5000)}
                    className="flex-1 py-4 glass rounded-3xl text-sm font-medium"
                  >
                    KSh 5,000
                  </Button>
                </div>
                {showImpact && (
                  <div className="mt-6 p-6 glass rounded-3xl text-center text-sm">
                    Your KSh <span className="font-semibold">{donationAmount}</span> will train{' '}
                    <span className="font-semibold text-emerald-400">{impactStudents}</span> students in digital skills.
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <form className="space-y-6" onSubmit={handleDonate}>
                <input 
                  type="text" 
                  placeholder="Full name" 
                  className="w-full glass border-0 rounded-3xl px-6 py-5 text-white placeholder:text-white/40 focus:outline-none"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full glass border-0 rounded-3xl px-6 py-5 text-white placeholder:text-white/40 focus:outline-none"
                  required
                />
                <div className="flex gap-4">
                  <select className="flex-1 glass border-0 rounded-3xl px-6 py-5 text-white focus:outline-none">
                    <option>M-Pesa (Kenya)</option>
                    <option>Visa / Mastercard</option>
                    <option>PayPal</option>
                  </select>
                  <input 
                    type="tel" 
                    placeholder="Amount (KSh)" 
                    defaultValue="2000"
                    className="flex-1 glass border-0 rounded-3xl px-6 py-5 text-white focus:outline-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full py-7 bg-emerald-500 hover:bg-emerald-600 rounded-3xl font-semibold text-lg flex items-center justify-center gap-x-3"
                >
                  <Heart className="h-5 w-5" />
                  SECURELY DONATE NOW
                </Button>
                <p className="text-center text-xs text-white/40">SSL secured · 100% goes to the labs · Tax deductible</p>
              </form>
            </div>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20">
        <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-12 gap-y-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-x-3">
              <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white">D</div>
              <span className="text-3xl tracking-tighter font-semibold">DSAID</span>
            </div>
            <p className="mt-6 max-w-xs text-neutral-400">Digital Solutions for Africa's Integrated Development. Nairobi, Kenya.</p>
            <p className="text-xs mt-8 text-neutral-500">© 2026 DSAID Kenya. Built with love on Vercel.</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="uppercase text-xs mb-4">Quick links</p>
            <div className="space-y-3 text-sm">
              <a href="#" className="block hover:text-emerald-400">Our Labs</a>
              <a href="#" className="block hover:text-emerald-400">Get Involved</a>
              <a href="#" className="block hover:text-emerald-400">Annual Report 2025</a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <p className="uppercase text-xs mb-4">Contact</p>
            <p className="text-sm">info@dsaid.org</p>
            <p className="text-sm">+254 700 000 000</p>
            <p className="text-sm">Muhoho Avenue, Nairobi</p>
          </div>
          
          <div className="md:col-span-4">
            <p className="text-sm">This website was re-imagined by the Vercel & shadcn teams to be the most beautiful, performant, and impactful nonprofit page ever shipped.</p>
            <div className="flex gap-x-6 mt-6 text-2xl">
              <MessageCircle className="h-6 w-6 cursor-pointer hover:text-emerald-400" />
              <Share2 className="h-6 w-6 cursor-pointer hover:text-emerald-400" />
              <Globe className="h-6 w-6 cursor-pointer hover:text-emerald-400" />
            </div>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000]" onClick={() => setShowVideoModal(false)}>
          <div className="max-w-3xl w-full mx-4 bg-neutral-900 rounded-3xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-black rounded-2xl flex items-center justify-center text-white text-3xl font-medium">
              <div className="text-center">
                <PlayCircle className="h-20 w-20 mx-auto mb-6 text-emerald-400" />
                90-second story of DSAID Solar Labs
                <div className="text-sm mt-8 text-neutral-400">Imagine this video playing here beautiful drone shots, happy kids, solar panels, Patrick Owidh speaking</div>
              </div>
            </div>
            <Button 
              onClick={() => setShowVideoModal(false)}
              variant="ghost"
              className="mt-8 mx-auto block text-white/60 hover:text-white"
            >
              CLOSE
            </Button>
          </div>
        </div>
      )}

      {/* THANK YOU MESSAGE */}
      {showThankYou && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-x-3 z-[9999]">
          <span>Thank you! Your donation is powering the next Solar Mobile Lab!</span>
          <CheckCircle className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}
