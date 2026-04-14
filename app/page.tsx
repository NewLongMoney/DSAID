'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, Zap, Monitor, BookOpen, Users, Target, Award, ChevronRight, Star, Check, ArrowRight, Globe, Users2, BarChart3, Lightbulb, Cpu, Battery, GraduationCap, TrendingUp } from 'lucide-react'

interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

interface TestimonialItem {
  quote: string
  author: string
  role: string
  location: string
  initials: string
}

interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
  isVideo?: boolean
}

const services: ServiceItem[] = [
  {
    id: 'solar',
    number: '01 / 06',
    title: 'Solar Mobile Laboratories',
    description: 'Fully self-contained, off-grid computer labs. Solar arrays and battery banks power 20-30 workstations - independent of Kenya Power, deployable anywhere.',
    icon: <Battery className="w-6 h-6" />
  },
  {
    id: 'refurbish',
    number: '02 / 06',
    title: 'Device Refurbishment',
    description: 'We receive, test, refurbish, and certify decommissioned corporate hardware for redeployment into schools. Full lifecycle management and certified e-waste recycling.',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    id: 'education',
    number: '03 / 06',
    title: 'Digital Education Programs',
    description: 'Cambridge-aligned coding, digital literacy, and 21st-century skills curricula by certified instructors - for primary, secondary, and youth vocational levels.',
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 'infrastructure',
    number: '04 / 06',
    title: 'ICT Infrastructure Setup',
    description: 'Complete school ICT room design and installation - network cabling, server rooms, device procurement, LAN/WAN configuration, and ongoing technical support.',
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 'csr',
    number: '05 / 06',
    title: 'CSR & Partnership Programs',
    description: 'Corporate social responsibility programs structured around technology donation - with verified impact reports, brand visibility, and KRA-compliant tax documentation.',
    icon: <Users2 className="w-6 h-6" />
  },
  {
    id: 'monitoring',
    number: '06 / 06',
    title: 'Impact Monitoring & Reporting',
    description: 'Quarterly verified impact reports for donor partners - tracking enrolment, assessment scores, device utilisation, and employment outcomes. Board-ready data.',
    icon: <BarChart3 className="w-6 h-6" />
  }
]

const testimonials: TestimonialItem[] = [
  {
    quote: "DSAID's solar laboratory opened the world to me. Today I am studying computer science at university - something I never imagined possible growing up in our village.",
    author: 'Achieng Omondi',
    role: 'Busia County · Class of 2024',
    location: 'Busia',
    initials: 'AO'
  },
  {
    quote: 'Our students now have access to the same tools as those in Nairobi. The difference in their confidence is profound. DSAID delivered and supported us every step of the way.',
    author: 'Mary Wanjiku',
    role: 'Budalangi Secondary School',
    location: 'Budalangi',
    initials: 'MW'
  },
  {
    quote: 'This initiative proves sustainable technology can bridge the widest gaps in opportunity. The impact reports DSAID provides give our county assembly the evidence we need to keep investing.',
    author: 'Chief Ochieng',
    role: 'Siaya County',
    location: 'Siaya',
    initials: 'CO'
  }
]

const galleryItems: GalleryItem[] = [
  {
    id: 'budalangi1',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.31 (1).jpeg',
    alt: 'Patrick meeting with Hon. Wanjala, MP Budalangi',
    caption: 'Meeting with Hon. Wanjala, MP Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi2',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.32 (1).jpeg',
    alt: 'School visit in Budalangi constituency',
    caption: 'School assessment - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi3',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.32.jpeg',
    alt: 'School infrastructure assessment',
    caption: 'Infrastructure assessment - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi4',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.32 (2).jpeg',
    alt: 'Computer installation site preparation',
    caption: 'Installation site preparation - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi5',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.33 (1).jpeg',
    alt: 'Community engagement during school visit',
    caption: 'Community engagement - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi6',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.33.jpeg',
    alt: 'Students at computer installation site',
    caption: 'Students ready for digital learning - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi7',
    src: '/gallery/WhatsApp Image 2026-04-07 at 12.03.30 (1).jpeg',
    alt: 'School building in Budalangi constituency',
    caption: 'School facility - Budalangi',
    isVideo: false
  },
  {
    id: 'budalangi8',
    src: '/gallery/WhatsApp Video 2026-04-07 at 12.03.33 (1).mp4',
    alt: 'Video of Budalangi school visit',
    caption: 'Field visit documentation - Budalangi',
    isVideo: true
  }
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('1000')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [counters, setCounters] = useState<{ [key: string]: string }>({})
  const [animatedCounters, setAnimatedCounters] = useState<Set<string>>(new Set())
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)
  const storiesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const animateCounter = (id: string, target: number, suffix: string = '') => {
      const duration = 1800
      const start = performance.now()
      const update = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = Math.round(eased * target)
        setCounters(prev => ({ ...prev, [id]: value.toLocaleString() + suffix }))
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
    }

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedCounters.has(entry.target.id)) {
            const target = parseInt(entry.target.getAttribute('data-target') || '0')
            const suffix = entry.target.getAttribute('data-suffix') || ''
            setAnimatedCounters(prev => new Set(prev).add(entry.target.id))
            animateCounter(entry.target.id, target, suffix)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('.counter').forEach((el) => {
      if (el instanceof HTMLElement) {
        counterObserver.observe(el)
      }
    })

    return () => counterObserver.disconnect()
  }, [counters])

  // Slideshow data
  const slides = [
    { text: "Solar Mobile Laboratories", highlight: "Powering Education" },
    { text: "Device Refurbishment & Recycling", highlight: "Sustainable Tech" },
    { text: "Cambridge-Aligned Curriculum", highlight: "Global Standards" },
    { text: "Off-Grid ICT Infrastructure", highlight: "Rural Access" },
    { text: "Corporate CSR Technology Programs", highlight: "Partnership Impact" },
    { text: "Measurable Learning Outcomes", highlight: "Real Results" },
    { text: "Rural Community Deployment", highlight: "Kenya-Wide Reach" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleDonationAmount = (amount: string) => {
    setSelectedAmount(amount)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* NAVIGATION */}
      <nav 
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-18 bg-white/96 backdrop-blur-md border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg">
            <img 
              src="/dsa-logo.png" 
              alt="DSAID Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => { 
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = '<span class="text-white font-bold text-xs">DSA</span>'
              }}
            />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-yellow-400 block leading-tight">DSAID</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Solutions · Africa</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '#about', label: 'About' },
            { href: '#services', label: 'Services' },
            { href: '#solution', label: 'Solutions' },
            { href: '#impact', label: 'Impact' },
            { href: '#stories', label: 'Gallery' }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href.slice(1)) }}
              className="text-gray-600 font-medium text-sm hover:text-yellow-400 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={(e) => { e.preventDefault(); scrollToSection('support') }}
            className="bg-yellow-400 text-white px-5.5 py-2.5 rounded-md text-sm font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Partner With Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-gray-100 rounded-lg"
          aria-label="Menu"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-18 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-lg">
          <div className="flex flex-col py-4">
            {[
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#solution', label: 'Solutions' },
              { href: '#impact', label: 'Impact' },
              { href: '#stories', label: 'Gallery' },
              { href: '#support', label: 'Partner With Us' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href.slice(1)) }}
                className="px-6 py-3 text-gray-600 font-medium hover:text-yellow-400 hover:bg-gray-50 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-18 relative overflow-hidden">
        <div className="flex flex-col justify-center px-20 py-20 lg:px-20 lg:py-20 relative z-2">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-7">
            Est. 2007 · Nairobi, Kenya
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Powering Schools.<br />
            <span className="italic text-yellow-400">Driving Digital</span><br />
            Africa.
          </h1>
          <p className="text-gray-600 text-lg max-w-md mb-10 leading-relaxed">
            Solar-powered mobile computer laboratories, refurbished ICT infrastructure, and Cambridge-aligned digital education - delivered to underserved schools across Kenya.
          </p>
          <div className="flex items-center gap-4 flex-wrap mb-14">
            <a
              href="#solution"
              onClick={(e) => { e.preventDefault(); scrollToSection('solution') }}
              className="bg-yellow-400 text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Explore Solutions
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#support"
              onClick={(e) => { e.preventDefault(); scrollToSection('support') }}
              className="text-yellow-400 px-7 py-3.5 rounded-md text-sm font-semibold border-2 border-yellow-400 hover:bg-yellow-50 transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Request a Proposal
            </a>
          </div>
          <div className="flex gap-10 pt-10 border-t border-gray-200">
            <div>
              <div id="counter-schools" className="counter font-serif text-3xl font-bold text-yellow-400" data-target="340" data-suffix="+">
                {counters['counter-schools'] || '0'}
              </div>
              <div className="text-xs font-medium text-gray-500 mt-1">Schools Reached</div>
            </div>
            <div>
              <div id="counter-labs" className="counter font-serif text-3xl font-bold text-yellow-400" data-target="180" data-suffix="+">
                {counters['counter-labs'] || '0'}
              </div>
              <div className="text-xs font-medium text-gray-500 mt-1">Labs Deployed</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-yellow-400 pt-1">18yr</div>
              <div className="text-xs font-medium text-gray-500 mt-1">Track Record</div>
            </div>
          </div>
        </div>
        <div className="relative bg-yellow-400">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80" 
              alt="Kenyan students working on computers in DSAID solar laboratory"
              className="w-full h-full object-cover opacity-55 mix-blend-luminosity"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/70 to-yellow-500/40"></div>
          <div className="absolute top-10 right-10 bg-white/12 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-semibold tracking-wide">
            Est. 2007
          </div>
          <div className="absolute bottom-12 left-10 right-10 bg-white/12 backdrop-blur-md border border-white/20 rounded-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <div className="font-semibold text-sm">Solar · Certified · Impact-Verified</div>
              <div className="text-xs opacity-80">100% off-grid capable · Cambridge curriculum · E-waste compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDESHOW */}
      <div className="bg-gray-900 text-white py-4 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative h-8 flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform -translate-y-2'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-white mb-1">{slide.text}</div>
                  <div className="text-xs text-green-400 font-semibold">{slide.highlight}</div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-green-400 w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-25 px-20 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
            alt="DSAID solar mobile laboratory in operation"
            className="w-full rounded-2xl aspect-4/5 object-cover"
            onError={(e) => { 
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="400" height="500" fill="%23FBBF24" rx="16"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="central">DSAID Field Operations</text></svg>'
            }}
          />
          <div className="absolute bottom-6 right-6 bg-yellow-400 text-white rounded-xl p-5 text-center">
            <div className="font-serif text-4xl font-bold">18+</div>
            <div className="text-xs font-medium opacity-85">Years of<br />Impact</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
            <div className="w-6 h-0.5 bg-yellow-400"></div>
            Who We Are
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5 max-w-lg">
            Technology Infrastructure Built for Schools. <span className="italic text-yellow-400">Scaled for Kenya.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-md mb-14 leading-relaxed">
            For nearly two decades, DSAID has been Kenya's most trusted partner for school technology infrastructure - from solar energy systems and refurbished hardware to certified digital curricula.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'Lightbulb', title: 'Solar Energy', desc: 'Off-grid power for every lab, every time.' },
              { icon: 'Monitor', title: 'Refurbished Tech', desc: 'Professional-grade devices, responsibly sourced.' },
              { icon: 'BookOpen', title: 'Digital Curriculum', desc: 'Cambridge-aligned coding and literacy programs.' },
              { icon: 'BarChart3', title: 'Impact Reporting', desc: 'Quarterly verified outcomes for all partners.' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-200">
                <div className="text-2xl mb-2.5">
                {item.icon === 'Lightbulb' ? <Lightbulb className="w-6 h-6" /> : 
                 item.icon === 'Monitor' ? <Monitor className="w-6 h-6" /> : 
                 item.icon === 'BookOpen' ? <BookOpen className="w-6 h-6" /> : 
                 <BarChart3 className="w-6 h-6" />}
              </div>
                <div className="font-semibold text-sm text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-25 px-20">
        <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
          <div className="w-6 h-0.5 bg-yellow-400"></div>
          What We Do
        </div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Our Core <span className="italic text-yellow-400">Service Lines</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-14 leading-relaxed">
          End-to-end digital infrastructure solutions - from solar arrays and refurbished hardware to certified curriculum and impact monitoring.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-yellow-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="font-mono text-xs font-medium text-yellow-400 tracking-wide mb-5 block">{service.number}</div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-5">
                <div className="w-6 h-6 text-yellow-400">{service.icon}</div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.description}</p>
              <a href="#solution" onClick={(e) => { e.preventDefault(); scrollToSection('solution') }} className="text-yellow-400 text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solution" className="py-25 px-20 bg-gray-50">
        <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
          <div className="w-6 h-0.5 bg-yellow-400"></div>
          Our Solutions
        </div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Engineering Opportunity <span className="italic text-yellow-400">Through Innovation</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-14 leading-relaxed">
          Three integrated pillars that deliver end-to-end digital transformation for schools across Kenya.
        </p>
        <div className="space-y-0">
          {[
            {
              tag: '01 Energy',
              title: 'Solar Infrastructure',
              description: 'Advanced solar arrays and battery systems deliver reliable power to every laboratory, completely independent of national grids. Sized for all-day operation with overnight storage capacity - ensuring zero downtime for learning.',
              image: 'https://images.unsplash.com/photo-1577562380741-2771e72e5a54?w=700&q=80',
              reverse: false
            },
            {
              tag: '02 Technology',
              title: 'Refurbished Computing',
              description: 'Carefully restored devices extend the lifecycle of technology while providing students with professional-grade tools. Every unit is tested, certified, and warranted before deployment - extending usable life by 5-8 years and diverting e-waste from landfill.',
              image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80',
              reverse: true
            },
            {
              tag: '03 Curriculum',
              title: 'Certified Digital Education',
              description: 'Cambridge-aligned programs in coding, digital literacy, and 21st-century skills prepare the next generation of Kenyan leaders for a digitally-driven economy. Certifications awarded on completion across all levels.',
              image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80',
              reverse: false
            }
          ].map((item, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-15 border-t border-gray-200 ${item.reverse ? 'lg:direction-reverse' : ''}`}>
              <div className={item.reverse ? 'lg:order-2' : ''}>
                <div className="rounded-xl overflow-hidden aspect-4/3 group">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-103"
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement!.style.background = '#FEF3C7'
                    }}
                  />
                </div>
              </div>
              <div className={item.reverse ? 'lg:order-1' : ''}>
                <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide mb-4">
                  <span className="font-mono text-xs opacity-60">{item.tag.split(' ')[0]}</span>
                  {item.tag.split(' ')[1]}
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-7">{item.description}</p>
                <a href="#support" onClick={(e) => { e.preventDefault(); scrollToSection('support') }} className="text-yellow-400 px-7 py-3.5 rounded-md text-sm font-semibold border-2 border-yellow-400 hover:bg-yellow-50 transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center gap-2">
                  {item.tag === '01 Energy' ? 'Request Assessment' : item.tag === '02 Technology' ? 'Donate Devices' : 'View Curriculum'} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-25 px-20 bg-yellow-400 text-white">
        <div className="flex items-center gap-2.5 text-yellow-100 text-xs font-bold uppercase tracking-wider mb-4">
          <div className="w-6 h-0.5 bg-yellow-100"></div>
          Engagement Model
        </div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-5">
          From Inquiry <span className="italic text-yellow-100">to Impact</span>
        </h2>
        <p className="text-yellow-100/70 text-lg max-w-3xl mb-14 leading-relaxed">
          A structured four-step process ensures every partnership delivers measurable results from day one.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white/10 rounded-xl overflow-hidden">
          {[
            {
              num: '01',
              title: 'Needs Assessment',
              description: 'Site and institutional audit to map infrastructure gaps and define the scope of intervention for your school or county.'
            },
            {
              num: '02',
              title: 'Proposal & Design',
              description: 'Tailored solution package - hardware, energy, curriculum - with full costings, timeline, and partnership structure.'
            },
            {
              num: '03',
              title: 'Procurement & Deployment',
              description: 'We handle all logistics, installation, and commissioning. Staff training delivered before formal handover of facility.'
            },
            {
              num: '04',
              title: 'Monitoring & Reporting',
              description: 'Ongoing technical support, curriculum updates, and quarterly impact reporting for all institutional and corporate partners.'
            }
          ].map((step, index) => (
            <div key={index} className="bg-white/4 p-10 hover:bg-white/8 transition-colors duration-200">
              <div className="font-serif text-5xl font-bold text-white/10 mb-6">{step.num}</div>
              <h3 className="font-serif text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-25 px-20">
        <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
          <div className="w-6 h-0.5 bg-yellow-400"></div>
          Measurable Impact
        </div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Lasting Change. <span className="italic text-yellow-400">Real Numbers.</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-14 leading-relaxed">
          Every intervention is tracked and verified. These are the outcomes DSAID has delivered across Kenya since 2007.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { target: '340', suffix: '+', label: 'Schools Transformed' },
            { target: '48000', suffix: '+', label: 'Students Trained' },
            { target: '12500', suffix: '+', label: 'Devices Processed' },
            { target: '3200', suffix: '+', label: 'Youth in Employment' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-10 bg-white rounded-xl border border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300">
              <div id={`counter-${index}`} className="counter font-serif text-4xl font-bold text-yellow-400" data-target={stat.target} data-suffix={stat.suffix}>
                {counters[`counter-${index}`] || '0'}
              </div>
              <div className="text-sm font-medium text-gray-500 mt-2.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="stories" className="py-25 px-20 bg-gray-50">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
              <div className="w-6 h-0.5 bg-yellow-400"></div>
              From the Field
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-0">
              Transforming Communities <span className="italic text-yellow-400">Through Technology</span>
            </h2>
          </div>
          <a href="https://www.facebook.com/dsaidke/" target="_blank" rel="noopener" className="text-yellow-400 px-7 py-3.5 rounded-md text-sm font-semibold border-2 border-yellow-400 hover:bg-yellow-50 transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center gap-2 flex-shrink-0">
            View Full Gallery <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <div key={item.id} className={`relative rounded-xl overflow-hidden aspect-3/2 bg-gray-200 group ${index === 0 ? 'lg:row-span-2 lg:aspect-auto' : ''}`}>
              {item.isVideo ? (
                <video 
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img 
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.style.background = index % 2 === 0 ? '#FBBF24' : '#F59E0B'
                  }}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-25 px-20">
        <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
          <div className="w-6 h-0.5 bg-yellow-400"></div>
          Stakeholder Voices
        </div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-14">
          What Our Partners <span className="italic text-yellow-400">Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300">
              <div className="font-serif text-5xl text-yellow-400 leading-none mb-4">"</div>
              <p className="text-gray-700 text-sm leading-relaxed italic mb-6 flex-1">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-15 px-20 bg-gray-50 border-t border-gray-200">
        <div className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500 mb-8">Working With</div>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {[
            'County Governments',
            'Kenya ICT Authority',
            'Cambridge International',
            'Corporate CSR Partners',
            'NGO & Development Agencies',
            'Ministry of Education'
          ].map((partner, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg px-5 py-2.5 text-xs font-semibold text-gray-500 tracking-wide hover:text-yellow-400 hover:border-yellow-400 transition-all duration-200">
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-25 px-20 bg-gray-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="flex items-center gap-2.5 text-yellow-100 text-xs font-bold uppercase tracking-wider mb-4">
              <div className="w-6 h-0.5 bg-yellow-100"></div>
              Invest in Kenya's Digital Future
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Partner With <span className="italic text-yellow-100">DSAID</span>
            </h2>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              Every contribution directly funds solar laboratories and technology access for rural students. Partner with us as a corporate donor, institutional funder, or individual supporter.
            </p>
            <div className="mb-8">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>Annual fundraising progress</span>
                <span>54%</span>
              </div>
              <div className="h-1.5 bg-white/15 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '54%' }}></div>
              </div>
              <div className="font-serif text-2xl font-bold text-white">KSh 2.7M</div>
              <div className="text-xs text-white/40">raised this year toward KSh 5M goal</div>
            </div>
            <div className="space-y-3">
              <a href="tel:+254722867666" className="flex items-center gap-3 text-white/80 hover:text-yellow-100 transition-colors duration-200">
                <div className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+254 722 867 666</span>
              </a>
              <a href="mailto:info@dsaid.world" className="flex items-center gap-3 text-white/80 hover:text-yellow-100 transition-colors duration-200">
                <div className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">info@dsaid.world</span>
              </a>
              <a href="https://dsaid.world" target="_blank" rel="noopener" className="flex items-center gap-3 text-white/80 hover:text-yellow-100 transition-colors duration-200">
                <div className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">www.dsaid.world</span>
              </a>
            </div>
          </div>
          <div>
            <div className="bg-white/6 border border-white/10 rounded-2xl p-9">
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Make a Donation</h3>
              <p className="text-white/60 text-sm mb-7">Support digital access for Kenya's underserved schools.</p>
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {['500', '1000', '2500', '5000', '10000', 'Custom'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleDonationAmount(amount === 'Custom' ? '' : amount)}
                    className={`border border-white/20 bg-transparent text-white/80 text-sm font-semibold py-3 rounded-lg transition-all duration-200 ${
                      selectedAmount === amount || (amount === '1000' && selectedAmount === '1000') ? 'bg-yellow-400 border-yellow-400 text-white' : 'hover:bg-white/10'
                    }`}
                  >
                    {amount === 'Custom' ? 'Custom' : `KSh ${amount}`}
                  </button>
                ))}
              </div>
              <div className="mb-5">
                <label className="text-xs text-white/50 font-semibold tracking-wide uppercase block mb-2">OR ENTER AMOUNT</label>
                <div className="flex items-center bg-white/8 border border-white/15 rounded-lg overflow-hidden">
                  <span className="px-3.5 py-3 text-white/50 text-sm font-semibold border-r border-white/10">KSh</span>
                  <input 
                    type="number" 
                    placeholder="Enter amount"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="bg-transparent border-none outline-none text-white font-medium py-3 px-4 w-full text-sm placeholder-white/40"
                  />
                </div>
              </div>
              <button 
                onClick={() => window.location.href = 'tel:+254722867666'}
                className="w-full bg-yellow-400 text-white py-4 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 hover:bg-yellow-500"
              >
                Complete Secure Donation
              </button>
              <div className="text-center text-xs text-white/40 mt-3.5">M-PESA · Visa · Mastercard · Tax-deductible</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white/60 py-16 px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/8">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src="/dsa-logo.png" 
                  alt="DSAID Logo" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-yellow-100 block leading-tight">DSAID</span>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Digital Solutions · Africa</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-72">
              Delivering solar-powered technology infrastructure and digital education programs to Kenya's schools and communities since 2007.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4.5">Services</h4>
            <div className="space-y-2.5">
              {['Solar Laboratories', 'Device Refurbishment', 'Digital Education', 'ICT Infrastructure', 'CSR Programs'].map((service) => (
                <a key={service} href="#services" className="block text-sm text-white/60 hover:text-white transition-colors duration-200">
                  {service}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4.5">Organisation</h4>
            <div className="space-y-2.5">
              {['About DSAID', 'Impact Reports', 'Gallery', 'Partnerships', 'Annual Report 2025'].map((item) => (
                <a key={item} href={item === 'About DSAID' ? '#about' : item === 'Gallery' ? '#stories' : '#impact'} className="block text-sm text-white/60 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4.5">Contact</h4>
            <div className="space-y-2.5">
              <a href="tel:+254722867666" className="block text-sm text-white/60 hover:text-white transition-colors duration-200">+254 722 867 666</a>
              <a href="mailto:info@dsaid.world" className="block text-sm text-white/60 hover:text-white transition-colors duration-200">info@dsaid.world</a>
              <a href="https://dsaid.world" target="_blank" rel="noopener" className="block text-sm text-white/60 hover:text-white transition-colors duration-200">www.dsaid.world</a>
              <a href="https://www.facebook.com/dsaidke/" target="_blank" rel="noopener" className="block text-sm text-white/60 hover:text-white transition-colors duration-200">Facebook</a>
              <span className="text-xs text-white/35 block mt-1">Nairobi, Kenya</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-7 text-xs">
          <span>© 2025 DSAID. All rights reserved.</span>
          <span className="font-mono text-xs opacity-40">EST. 2007 · REGISTERED IN KENYA · NAIROBI</span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .lg\\:direction-reverse {
          direction: rtl;
        }
        .lg\\:direction-reverse > * {
          direction: ltr;
        }
      `}</style>
    </div>
  )
}