'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Menu, X, Phone, ChevronDown, Play, Mail, MapPin, Award, Users, Target, Zap, Globe, Shield, Star } from 'lucide-react'

interface NavItem {
  href: string
  label: string
}

interface StatItem {
  id: string
  value: number
  label: string
  suffix?: string
}

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
  location: string
}

const navItems: NavItem[] = [
  { href: '#about', label: 'Mission' },
  { href: '#solution', label: 'Solar Laboratories' },
  { href: '#recycling', label: 'Sustainable Technology' },
  { href: '#impact', label: 'Impact' },
  { href: '#stories', label: 'Stories' },
]

const heroStats: StatItem[] = [
  { id: 'stat-trained', value: 36214, label: 'Students empowered' },
  { id: 'stat-labs', value: 14, label: 'Mobile laboratories deployed' },
  { id: 'stat-recycled', value: 4820, label: 'Devices responsibly processed' },
]

const impactStats: StatItem[] = [
  { id: 'schools', value: 187, label: 'Schools transformed' },
  { id: 'stat-trained2', value: 36214, label: 'Students trained' },
  { id: 'recycled', value: 4820, label: 'Devices processed' },
  { id: 'jobs', value: 1240, label: 'Youth in employment' },
]

const services: ServiceItem[] = [
  {
    id: 'energy',
    number: '01',
    title: 'Solar infrastructure',
    description: 'Advanced solar arrays and battery systems deliver reliable power to every laboratory, independent of national grids.',
    icon: <Zap className="h-6 w-6" />
  },
  {
    id: 'technology',
    number: '02',
    title: 'Refurbished computing',
    description: 'Carefully restored devices extend the lifecycle of technology while providing students with professional-grade tools.',
    icon: <Shield className="h-6 w-6" />
  },
  {
    id: 'curriculum',
    number: '03',
    title: 'Certified digital education',
    description: 'Cambridge-aligned programs in coding, digital literacy, and 21st-century skills prepare the next generation of Kenyan leaders.',
    icon: <Award className="h-6 w-6" />
  },
]

const testimonials: TestimonialItem[] = [
  {
    quote: "DSAID's solar laboratory opened the world to me. Today I am studying computer science at university.",
    author: "ACHIENG OMONDI",
    location: "Busia County · Class of 2024"
  },
  {
    quote: "Our students now have access to the same tools as those in Nairobi. The difference is profound.",
    author: "MARY WANJIKU",
    location: "Head Teacher, Budalangi Secondary"
  },
  {
    quote: "This initiative proves that sustainable technology can bridge the widest gaps in opportunity.",
    author: "CHIEF OCHIENG",
    location: "Siaya County"
  },
]

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [donationAmount, setDonationAmount] = useState('5000')
  const [showThankYou, setShowThankYou] = useState(false)
  
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const solutionRef = useRef(null)
  const impactRef = useRef(null)
  const storiesRef = useRef(null)
  const supportRef = useRef(null)

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const isSolutionInView = useInView(solutionRef, { once: true, amount: 0.3 })
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 })
  const isStoriesInView = useInView(storiesRef, { once: true, amount: 0.3 })
  const isSupportInView = useInView(supportRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const animateStats = () => {
      const animateValue = (id: string, start: number, end: number, duration: number) => {
        const element = document.getElementById(id)
        if (!element) return
        
        let startTimestamp: number | null = null
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp
          const progress = Math.min((timestamp - startTimestamp) / duration, 1)
          element.textContent = Math.floor(progress * (end - start) + start).toLocaleString('en-US')
          if (progress < 1) {
            window.requestAnimationFrame(step)
          }
        }
        window.requestAnimationFrame(step)
      }

      setTimeout(() => {
        animateValue('stat-trained', 0, 36214, 2200)
        animateValue('stat-labs', 0, 14, 1400)
        animateValue('stat-recycled', 0, 4820, 1800)
        animateValue('schools', 0, 187, 1400)
        animateValue('stat-trained2', 0, 36214, 2200)
        animateValue('recycled', 0, 4820, 1600)
        animateValue('jobs', 0, 1240, 1500)
      }, 500)
    }

    animateStats()
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    setShowThankYou(true)
    setTimeout(() => setShowThankYou(false), 5200)
  }

  return (
    <div className="bg-slate-950 text-slate-200 overflow-x-hidden">
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl"
      >
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-x-4"
          >
            <div className="w-9 h-9 bg-[#0073c0] rounded-2xl flex items-center justify-center text-white text-2xl font-light shadow-lg">
              D
            </div>
            <div>
              <span className="font-semibold text-3xl tracking-[-1px] section-header text-white">DSAID</span>
              <span className="block text-[#ffff00] text-xs font-medium tracking-[2.5px] -mt-1">WORLD</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-10 text-sm font-medium tracking-wide">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                className="nav-link hover:text-[#ffff00] transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-x-6">
            {/* Phone */}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              href="tel:+254722867666"
              className="hidden sm:flex items-center gap-x-2 px-6 py-3 glass rounded-3xl text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="h-4 w-4 text-[#ffff00]" />
              <span>+254 722 867666</span>
            </motion.a>

            {/* Donate */}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              href="#support"
              onClick={(e) => { e.preventDefault(); scrollToSection('#support') }}
              className="btn-primary px-8 py-3.5 text-white font-semibold rounded-3xl flex items-center gap-x-2 shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ background: 'linear-gradient(to right, #0073c0, #005a9e)' }}
            >
              SUPPORT OUR WORK
            </motion.a>

            {/* Mobile Menu */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 glass rounded-3xl flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block glass mx-4 mt-3 rounded-3xl p-8"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                  className="block py-3 text-sm font-medium hover:text-[#ffff00] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+254722867666" className="flex items-center gap-x-3 py-3 text-[#ffff00]">
                <Phone className="h-4 w-4" /> +254 722 867666
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <motion.header 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="hero-bg min-h-screen flex items-center pt-20 relative"
      >
        <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-3xl p-12 md:p-16 max-w-xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-x-3 bg-white/10 text-white text-xs font-semibold px-8 py-3 rounded-3xl mb-8"
              >
                ESTABLISHED 2007 · NAIROBI, KENYA
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-7xl font-semibold leading-none tracking-[-3px] section-header text-white"
              >
                Digital literacy.<br/>Sustainable technology.<br/>A more equitable future.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 text-xl text-slate-300 max-w-md"
              >
                Solar-powered mobile computer laboratories and responsible technology solutions empowering rural communities across Kenya.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 mt-12"
              >
                <motion.a
                  href="#support"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#support') }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(255 255 0 / 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-6 bg-[#ffff00] text-slate-950 font-semibold rounded-3xl text-lg flex items-center justify-center transition-all duration-300"
                >
                  MAKE A DONATION
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowVideoModal(true)}
                  className="px-10 py-6 border border-white/30 font-medium rounded-3xl flex items-center gap-x-3 transition-all duration-300"
                >
                  <Play className="h-6 w-6 text-[#ffff00]" />
                  <span>OUR STORY · 90 SECONDS</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <div id={stat.id} className="count-up text-5xl font-semibold text-[#ffff00]">0</div>
                    <div className="text-xs tracking-[1px] uppercase text-slate-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 hidden lg:flex justify-end"
          >
            <div className="glass rounded-3xl p-8 max-w-sm">
              <img 
                src="https://picsum.photos/id/1074/600/700" 
                alt="Kenyan students learning with solar-powered computers in rural classroom" 
                className="rounded-3xl w-full shadow-2xl"
              />
              <div className="mt-8 flex justify-between text-xs uppercase tracking-widest text-slate-400">
                <span>BUSIA COUNTY, KENYA</span>
                <span className="text-[#ffff00]">EST. 2007</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 text-xs tracking-[2px] text-slate-400 flex flex-col items-center"
        >
          SCROLL TO EXPLORE
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-3 h-px w-6 bg-slate-400"
          />
        </motion.div>
      </motion.header>

      {/* ABOUT */}
      <motion.section 
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={isAboutInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-screen-2xl mx-auto px-8 py-28"
      >
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <div className="sticky top-8">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#ffff00] text-sm font-semibold tracking-[1px]"
              >
                OUR LEGACY
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl section-header font-semibold tracking-[-2px] mt-3 leading-none text-white"
              >
                Technology that transforms communities.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-slate-400 text-lg leading-relaxed"
              >
                For nearly two decades, DSAID has delivered solar-powered digital education and sustainable technology solutions to the most underserved regions of Kenya.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex items-center gap-x-4"
              >
                <div className="text-xs font-medium px-5 py-2.5 border border-white/20 rounded-3xl">14 laboratories deployed</div>
                <div className="text-xs font-medium px-5 py-2.5 border border-white/20 rounded-3xl">187 schools reached</div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            {[
              {
                title: "Solar-Powered Laboratories",
                description: "Self-contained mobile units that operate entirely off-grid, bringing world-class computing education to remote villages.",
                image: "https://picsum.photos/id/1130/600/400",
                imageAlt: "DSAID solar-powered mobile computer laboratory in rural Kenyan village"
              },
              {
                title: "Sustainable Technology",
                description: "Responsible refurbishment and recycling of digital devices, ensuring technology serves both education and environmental stewardship.",
                image: "https://picsum.photos/id/1135/600/400",
                imageAlt: "Technical team refurbishing computers for Kenyan schools"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
              >
                <Card className="glass rounded-3xl border-white/10 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-4 text-slate-400">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SOLUTION */}
      <motion.section 
        ref={solutionRef}
        initial={{ opacity: 0 }}
        animate={isSolutionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <h2 className="text-5xl section-header font-semibold tracking-[-2px]">
              Engineering opportunity through innovation and responsibility.
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isSolutionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="glass rounded-3xl border-white/10 hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={
                        service.id === 'energy' ? 'https://picsum.photos/id/1085/600/400' :
                        service.id === 'technology' ? 'https://picsum.photos/id/1090/600/400' :
                        'https://picsum.photos/id/1095/600/400'
                      }
                      alt={
                        service.id === 'energy' ? 'Solar panels powering DSAID mobile laboratory in rural Kenya' :
                        service.id === 'technology' ? 'Refurbished computers being prepared for Kenyan schools' :
                        'Kenyan students learning digital skills in computer lab'
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-10">
                    <div className="uppercase text-[#ffff00] text-sm font-medium mb-4">
                      {service.number} · {service.id.charAt(0).toUpperCase() + service.id.slice(1, 8)}
                    </div>
                    <h3 className="text-3xl font-semibold mt-4">{service.title}</h3>
                    <p className="mt-6 text-slate-400">{service.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* IMPACT */}
      <motion.section 
        ref={impactRef}
        initial={{ opacity: 0 }}
        animate={isImpactInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-screen-2xl mx-auto px-8 py-28"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isImpactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl section-header font-semibold tracking-[-2px] mb-16"
        >
          Measurable impact. Lasting change.
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isImpactInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass rounded-3xl p-10 text-center border-white/10">
                <div id={stat.id} className="count-up text-6xl font-semibold text-[#ffff00]">0</div>
                <p className="mt-3 text-sm tracking-widest uppercase text-slate-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* GALLERY */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={isStoriesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-screen-2xl mx-auto px-8 py-28"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl section-header font-semibold tracking-[-2px]">Transforming communities through technology</h2>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">From rural classrooms to solar-powered laboratories, witness the impact of digital education across Kenya.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'gallery1', src: 'https://picsum.photos/id/1140/600/600', alt: 'Kenyan students learning coding in solar-powered classroom' },
            { id: 'gallery2', src: 'https://picsum.photos/id/1145/600/600', alt: 'Solar panels powering mobile computer laboratory' },
            { id: 'gallery3', src: 'https://picsum.photos/id/1150/600/600', alt: 'Young woman using laptop in rural Kenyan school' },
            { id: 'gallery4', src: 'https://picsum.photos/id/1155/600/600', alt: 'Technical team setting up computer equipment' },
            { id: 'gallery5', src: 'https://picsum.photos/id/1160/600/600', alt: 'Students collaborating on digital projects' },
            { id: 'gallery6', src: 'https://picsum.photos/id/1165/600/600', alt: 'Community leader receiving computer training' },
            { id: 'gallery7', src: 'https://picsum.photos/id/1170/600/600', alt: 'Children learning basic computer skills' },
            { id: 'gallery8', src: 'https://picsum.photos/id/1175/600/600', alt: 'Mobile computer lab deployment in rural village' },
          ].map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isStoriesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-square"
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a href="https://www.facebook.com/dsaidke/" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-x-3 px-8 py-4 glass rounded-3xl text-sm font-medium hover:bg-white/10 transition-all duration-300">
            VIEW FULL GALLERY ON FACEBOOK
          </a>
        </motion.div>
      </motion.section>

      {/* STORIES */}
      <motion.section 
        ref={storiesRef}
        initial={{ opacity: 0 }}
        animate={isStoriesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-5xl section-header font-semibold tracking-[-2px] mb-12"
          >
            Voices from the field
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isStoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="glass rounded-3xl border-white/10 hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={
                        index === 0 ? 'https://picsum.photos/id/1110/600/400' :
                        index === 1 ? 'https://picsum.photos/id/1115/600/400' :
                        'https://picsum.photos/id/1120/600/400'
                      }
                      alt={
                        index === 0 ? 'Young Kenyan woman using laptop in solar-powered classroom' :
                        index === 1 ? 'Kenyan teacher leading digital literacy class' :
                        'Community leader inspecting solar computer laboratory'
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-10">
                    <p className="text-lg leading-relaxed">"{testimonial.quote}"</p>
                    <div className="mt-12 text-xs">
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-slate-400">{testimonial.location}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SUPPORT */}
      <motion.section 
        ref={supportRef}
        initial={{ opacity: 0 }}
        animate={isSupportInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-screen-2xl mx-auto px-8 py-28"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isSupportInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass rounded-3xl max-w-4xl mx-auto p-16 border-white/10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={isSupportInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-semibold tracking-tight">Invest in Kenya's digital future.</h2>
                <div className="mt-8 text-slate-400">
                  Every contribution directly funds solar laboratories and technology access for rural students.
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSupportInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-10 flex items-baseline gap-x-3"
                >
                  <span className="text-5xl font-semibold text-[#ffff00]">KSh 2.7M</span>
                  <span className="text-slate-400">raised this year</span>
                </motion.div>
              </motion.div>
              
              <motion.form 
                initial={{ opacity: 0, x: 50 }}
                animate={isSupportInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-8"
                onSubmit={handleDonate}
              >
                <div>
                  <label className="block text-xs font-medium tracking-widest mb-2">DONATION AMOUNT (KSh)</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="text" 
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full glass border-0 rounded-3xl px-8 py-7 text-3xl font-light focus:outline-none border-white/10"
                  />
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-8 btn-primary text-white font-semibold text-xl rounded-3xl shadow-xl"
                  style={{ background: 'linear-gradient(to right, #0073c0, #005a9e)' }}
                >
                  COMPLETE SECURE DONATION
                </motion.button>
                <p className="text-center text-xs text-slate-400">M-PESA · Visa · Mastercard · Tax-deductible · +254 722 867666</p>
              </motion.form>
            </div>
          </Card>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-black py-20">
        <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-12 gap-y-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-x-3">
              <div className="w-8 h-8 bg-[#0073c0] rounded-2xl flex items-center justify-center text-white font-light text-3xl">D</div>
              <span className="text-4xl tracking-[-2px] font-semibold text-white">DSAID</span>
            </div>
            <p className="mt-6 max-w-xs text-slate-400">Digital Solutions for Africa's Integrated Development</p>
            <p className="mt-8 text-slate-500">Nairobi, Kenya · www.dsaid.world</p>
            <a href="tel:+254722867666" className="mt-3 inline-flex items-center gap-x-2 text-[#ffff00]">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+254 722 867666</span>
            </a>
          </div>
          
          <div className="md:col-span-2 text-sm">
            <p className="uppercase text-xs mb-4 text-slate-400">Navigation</p>
            <a href="#about" className="block mb-3 hover:text-white transition-colors">Mission</a>
            <a href="#solution" className="block mb-3 hover:text-white transition-colors">Solar Laboratories</a>
            <a href="#recycling" className="block hover:text-white transition-colors">Sustainable Technology</a>
          </div>
          
          <div className="md:col-span-2 text-sm">
            <p className="uppercase text-xs mb-4 text-slate-400">Contact</p>
            <a href="mailto:info@dsaid.world" className="block mb-3 hover:text-white transition-colors">info@dsaid.world</a>
            <a href="#" className="block hover:text-white transition-colors">Annual Report 2025</a>
          </div>
          
          <div className="md:col-span-3 text-xs text-slate-400 leading-relaxed">
            Designed to the highest standards of clarity, precision, and impact.<br />
            A premium digital experience built for one of Kenya's most important missions.
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[10000]"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl w-full mx-4 bg-slate-900 rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-slate-950 flex items-center justify-center">
                <div className="text-center px-12">
                  <Play className="h-20 w-20 text-[#ffff00] mx-auto mb-8" />
                  <p className="text-xl">DSAID · 18 years of impact in rural Kenya</p>
                  <p className="text-sm text-slate-400 mt-2">Solar laboratories · Sustainable technology · Digital futures</p>
                </div>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="block mx-auto my-8 text-slate-400 hover:text-white text-sm tracking-widest transition-colors"
              >
                CLOSE PREVIEW
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THANK YOU MESSAGE */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 bg-[#0073c0] text-white p-8 rounded-3xl shadow-2xl z-50 max-w-md"
          >
            <div className="flex items-start gap-x-4">
              <Heart className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-2">Thank you for your support!</p>
                <p className="text-sm opacity-90">Your contribution is powering the next generation of digital leaders in Kenya.</p>
                <p className="text-xs opacity-75 mt-2">Confirmation sent · +254 722 867666</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        }
        
        .dark .glass {
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .hero-bg {
          background: linear-gradient(135deg, rgba(0, 115, 192, 0.85), rgba(255, 255, 0, 0.75)), 
                      url('https://picsum.photos/id/1062/2000/1200') center/cover no-repeat;
        }
        
        .section-header {
          font-family: 'Inter', 'Space Grotesk', sans-serif;
          letter-spacing: -2px;
        }
        
        .count-up {
          font-variant-numeric: tabular-nums;
        }
        
        .nav-link {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-primary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .accent-yellow {
          color: #ffff00;
        }
      `}</style>
    </div>
  )
}
