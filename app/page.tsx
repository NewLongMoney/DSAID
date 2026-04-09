'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, Zap, Monitor, BookOpen, Users, Target, Award, ChevronRight } from 'lucide-react'

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
  imageId: number
}

interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
  size?: 'large' | 'small'
}

const services: ServiceItem[] = [
  {
    id: 'solar',
    number: '01',
    title: 'Solar Mobile Laboratories',
    description: 'Fully self-contained, off-grid computer labs. Solar arrays and battery banks power 20–30 workstations — independent of Kenya Power, deployable anywhere in the country.',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'refurbish',
    number: '02',
    title: 'Device Refurbishment',
    description: 'We receive, test, refurbish, and certify decommissioned corporate hardware for redeployment into schools. Full lifecycle management and certified e-waste recycling included.',
    icon: <Monitor className="w-5 h-5" />
  },
  {
    id: 'education',
    number: '03',
    title: 'Digital Education Programs',
    description: 'Cambridge-aligned coding, digital literacy, and 21st-century skills curricula by certified instructors — for primary, secondary, and youth vocational levels with certifications on completion.',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 'ict',
    number: '04',
    title: 'ICT Infrastructure Setup',
    description: 'Complete school ICT room design and installation — network cabling, server rooms, device procurement, LAN/WAN configuration, and ongoing technical support. Turnkey delivery.',
    icon: <Target className="w-5 h-5" />
  },
  {
    id: 'csr',
    number: '05',
    title: 'CSR & Partnership Programs',
    description: 'We structure corporate social responsibility programs around technology donation and deployment — with verified impact reports, brand visibility, and KRA-compliant tax documentation.',
    icon: <Award className="w-5 h-5" />
  },
  {
    id: 'monitoring',
    number: '06',
    title: 'Impact Monitoring & Reporting',
    description: 'Quarterly verified impact reports for donor partners and CSR stakeholders — tracking enrolment, assessment scores, device utilisation, and employment outcomes. Board-ready data.',
    icon: <Users className="w-5 h-5" />
  }
]

const testimonials: TestimonialItem[] = [
  {
    quote: "DSAID's solar laboratory opened the world to me. Today I am studying computer science at university — something I never imagined possible growing up in our village.",
    author: "Achieng Omondi",
    role: "University Student",
    location: "Busia County · Class of 2024",
    imageId: 1110
  },
  {
    quote: "Our students now have access to the same tools as those in Nairobi. The difference in their confidence is profound. DSAID delivered and supported us every step of the way.",
    author: "Mary Wanjiku",
    role: "Head Teacher",
    location: "Budalangi Secondary School",
    imageId: 1115
  },
  {
    quote: "This initiative proves sustainable technology can bridge the widest gaps in opportunity. The impact reports DSAID provides give our county assembly the evidence we need to keep investing.",
    author: "Chief Ochieng",
    role: "County Administration",
    location: "Siaya County",
    imageId: 1120
  }
]

const galleryItems: GalleryItem[] = [
  {
    id: 'gallery1',
    src: 'https://picsum.photos/id/1140/800/800',
    alt: 'Students learning coding in solar-powered classroom',
    caption: 'Students learning coding — Busia County',
    size: 'large'
  },
  {
    id: 'gallery2',
    src: 'https://picsum.photos/id/1145/600/400',
    alt: 'Solar panels on mobile laboratory',
    caption: 'Solar array — Mobile Lab Unit #7',
    size: 'small'
  },
  {
    id: 'gallery3',
    src: 'https://picsum.photos/id/1150/600/400',
    alt: 'Young woman using laptop in rural school',
    caption: 'Digital literacy program — Siaya',
    size: 'small'
  },
  {
    id: 'gallery4',
    src: 'https://picsum.photos/id/1155/600/400',
    alt: 'Technical team setting up equipment',
    caption: 'Lab installation — Homa Bay',
    size: 'small'
  },
  {
    id: 'gallery5',
    src: 'https://picsum.photos/id/1160/600/400',
    alt: 'Students collaborating on digital projects',
    caption: 'Collaborative learning — Migori',
    size: 'small'
  },
  {
    id: 'gallery6',
    src: 'https://picsum.photos/id/1165/600/400',
    alt: 'Community leader receiving training',
    caption: 'Community leader training',
    size: 'small'
  },
  {
    id: 'gallery7',
    src: 'https://picsum.photos/id/1170/600/400',
    alt: 'Children learning basic computer skills',
    caption: 'Primary digital skills — Kisumu',
    size: 'small'
  },
  {
    id: 'gallery8',
    src: 'https://picsum.photos/id/1175/600/400',
    alt: 'Mobile computer lab deployment',
    caption: 'Lab deployment — Turkana County',
    size: 'small'
  }
]

const processSteps = [
  { number: '1', title: 'Needs Assessment', description: 'Site and institutional audit to map infrastructure gaps and define scope of intervention for your school or county.' },
  { number: '2', title: 'Proposal & Design', description: 'Tailored solution package — hardware, energy, curriculum — with full costings, timeline, and partnership structure.' },
  { number: '3', title: 'Procurement & Deployment', description: 'We handle all logistics, installation, and commissioning. Staff training delivered before formal handover of facility.' },
  { number: '4', title: 'Monitoring & Reporting', description: 'Ongoing technical support, curriculum updates, and quarterly impact reporting for all institutional and corporate partners.' }
]

const impactStats = [
  { id: 'schools', value: 187, label: 'Schools Transformed' },
  { id: 'students', value: 12400, label: 'Students Trained' },
  { id: 'devices', value: 8200, label: 'Devices Processed' },
  { id: 'youth', value: 340, label: 'Youth in Employment' }
]

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState('2500')
  const [activeDonation, setActiveDonation] = useState('2500')
  
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const solutionRef = useRef(null)
  const processRef = useRef(null)
  const recyclingRef = useRef(null)
  const impactRef = useRef(null)
  const galleryRef = useRef(null)
  const testimonialsRef = useRef(null)
  const supportRef = useRef(null)

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98])

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 })
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.3 })
  const isSolutionInView = useInView(solutionRef, { once: true, amount: 0.3 })
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 })
  const isRecyclingInView = useInView(recyclingRef, { once: true, amount: 0.3 })
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 })
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.3 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  const isSupportInView = useInView(supportRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const animateValue = (id: string, start: number, end: number, duration: number) => {
      const element = document.getElementById(id)
      if (!element) return
      
      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        element.textContent = Math.floor(ease * (end - start) + start).toLocaleString()
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !(entry.target as HTMLElement).dataset.animated) {
            const target = entry.target as HTMLElement
            const endValue = parseInt(target.dataset.target || '0')
            animateValue(target.id, 0, endValue, 1800)
            target.dataset.animated = 'true'
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('[data-target]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleDonationAmount = (amount: string) => {
    setDonationAmount(amount)
    setActiveDonation(amount)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* NAVIGATION */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-yellow-400/95 backdrop-blur-xl border-b-3 border-gray-900/90 shadow-lg"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 h-17 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}
          >
            <div className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-xl border border-gray-800/50 overflow-hidden">
              <img 
                src="/dsa-logo.svg" 
                alt="DSAID Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-condensed font-extrabold text-2xl text-gray-900 tracking-wider">DSAID</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#solution', label: 'Solutions' },
              { href: '#impact', label: 'Impact' },
              { href: '#stories', label: 'Gallery' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href.slice(1)) }}
                className="text-gray-700/80 font-bold text-xs tracking-wider uppercase hover:text-gray-900 transition-all duration-300"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#support"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={(e) => { e.preventDefault(); scrollToSection('support') }}
              className="bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg hover:bg-gray-900/90 transition-all duration-300 shadow-lg"
            >
              Partner With Us
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 bg-white/20 backdrop-blur-sm rounded-lg"
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-gray-900/80"></span>
            <span className="w-6 h-0.5 bg-gray-900/80"></span>
            <span className="w-6 h-0.5 bg-gray-900/80"></span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-17 left-0 right-0 bg-yellow-400/95 backdrop-blur-xl border-t border-gray-200/50 z-50 shadow-xl"
            >
              <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-4">
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
                    className="block py-4 text-gray-700/80 font-bold text-xs tracking-wider uppercase border-b border-gray-200/30 hover:text-gray-900 transition-all duration-300"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#support"
                  onClick={(e) => { e.preventDefault(); scrollToSection('support') }}
                  className="block py-4 mt-2 bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-5 text-xs font-bold tracking-wider uppercase rounded-lg"
                >
                  Partner With Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="bg-yellow-400/90 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-68px)] overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/80 via-transparent to-blue-600/20 pointer-events-none"></div>
        
        <div className="p-14 lg:p-24 lg:pr-6 lg:pl-16 flex flex-col justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 bg-gray-900/80 backdrop-blur-md text-yellow-400 text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-lg mb-7 shadow-xl border border-gray-800/50"
          >
            Est. 2007 · Nairobi, Kenya
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-condensed font-extrabold text-5xl lg:text-7xl leading-none tracking-tight text-gray-900 uppercase"
          >
            Powering<br />
            Schools.<br />
            <span className="text-blue-600">Driving</span><br />
            Digital<br />
            Africa.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-700/80 backdrop-blur-sm text-base leading-relaxed max-w-md mb-10 bg-white/20 rounded-2xl p-6 shadow-lg border border-white/30"
          >
            DSAID delivers solar-powered mobile computer laboratories, refurbished technology infrastructure, and Cambridge-aligned digital education programs to underserved institutions across Kenya.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.preventDefault(); scrollToSection('services') }}
              className="bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-lg inline-flex items-center gap-2 hover:bg-gray-900/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Explore Solutions
            </motion.a>
            
            <motion.a
              href="#support"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.preventDefault(); scrollToSection('support') }}
              className="border-2 border-gray-900/50 text-gray-900/80 backdrop-blur-sm px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-lg inline-flex items-center gap-2 hover:bg-gray-900/90 hover:text-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Request a Proposal
            </motion.a>
          </motion.div>
        </div>

        <div className="relative overflow-hidden lg:block hidden">
          <img 
            src="https://picsum.photos/id/1074/900/900" 
            alt="Kenyan students with solar-powered computers" 
            className="w-full h-full object-cover brightness-75 saturate-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-yellow-400/12 to-transparent pointer-events-none backdrop-blur-sm"></div>
          
          {/* Stats Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md grid grid-cols-3 border-t border-white/10"
          >
            <div className="p-6 text-center border-r border-white/10">
              <div id="schools" data-target="187" className="font-condensed font-extrabold text-4xl lg:text-5xl text-yellow-400 leading-none mb-1">0</div>
              <div className="text-xs font-bold tracking-wider uppercase text-white/60">Schools Reached</div>
            </div>
            <div className="p-6 text-center border-r border-white/10">
              <div id="labs" data-target="14" className="font-condensed font-extrabold text-4xl lg:text-5xl text-yellow-400 leading-none mb-1">0</div>
              <div className="text-xs font-bold tracking-wider uppercase text-white/60">Labs Deployed</div>
            </div>
            <div className="p-6 text-center">
              <div className="font-condensed font-extrabold text-4xl lg:text-5xl text-yellow-400 leading-none mb-1">18<span className="text-3xl">yr</span></div>
              <div className="text-xs font-bold tracking-wider uppercase text-white/60">Track Record</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* TICKER */}
      <div className="bg-gray-900/90 backdrop-blur-md py-3 overflow-hidden whitespace-nowrap border-b border-white/5">
        <motion.div 
          animate={{ x: [0, -50] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="inline-flex"
        >
          {[
            'Solar-Powered Laboratories',
            'Device Refurbishment & Recycling',
            'Cambridge-Aligned Curriculum',
            'Off-Grid ICT Infrastructure',
            'Corporate CSR Technology Programs',
            'Measurable Learning Outcomes',
            'Rural Community Deployment',
            'Solar-Powered Laboratories',
            'Device Refurbishment & Recycling',
            'Cambridge-Aligned Curriculum',
            'Off-Grid ICT Infrastructure',
            'Corporate CSR Technology Programs',
            'Measurable Learning Outcomes',
            'Rural Community Deployment'
          ].map((item, index) => (
            <span key={index} className="inline-flex items-center gap-2.5 px-10 text-xs font-extrabold tracking-wider uppercase text-gray-600/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ABOUT SECTION */}
      <motion.section 
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={isAboutInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="about" 
        className="bg-white/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/id/1130/800/700" 
                alt="DSAID solar mobile laboratory" 
                className="w-full h-120 lg:h-96 object-cover rounded-lg shadow-2xl border border-white/20"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-5 -right-5 bg-yellow-400/90 backdrop-blur-md p-6 rounded-lg border-3 border-gray-900/50 shadow-xl"
              >
                <div className="font-condensed font-extrabold text-5xl text-gray-900">18+</div>
                <div className="text-xs font-bold tracking-wider uppercase text-gray-900 -mt-0.5">Years of Impact</div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 text-blue-600/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4.5"
              >
                Who We Are
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase"
              >
                Technology Infrastructure Built for <span className="text-blue-600">Schools. Scaled for Kenya.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-700/80 backdrop-blur-sm text-base leading-relaxed mb-4.5 mt-6 bg-white/20 rounded-2xl p-6 shadow-lg border border-white/30"
              >
                For nearly two decades, DSAID has been Kenya's most trusted partner for school technology infrastructure. We design, deploy, and maintain end-to-end digital learning environments — from solar energy systems and refurbished hardware to certified software curricula.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-700/80 backdrop-blur-sm text-base leading-relaxed bg-white/20 rounded-2xl p-6 shadow-lg border border-white/30"
              >
                We partner with corporates, NGOs, county governments, and development agencies to bridge the digital divide through responsible, sustainable technology. Every solution is built to last, designed for off-grid operation, and engineered to produce measurable learning outcomes.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mt-9"
              >
                {[
                  { title: 'Solar Energy', description: 'Off-grid power for every lab, every time.' },
                  { title: 'Refurbished Tech', description: 'Professional-grade devices, responsibly sourced.' },
                  { title: 'Digital Curriculum', description: 'Cambridge-aligned coding and literacy programs.' },
                  { title: 'Impact Reporting', description: 'Quarterly verified outcomes for all partners.' }
                ].map((item, index) => (
                  <div key={index} className="bg-yellow-400/80 backdrop-blur-sm p-4.5 border-l-4 border-gray-900/50 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="font-condensed font-extrabold text-sm text-gray-900 uppercase mb-1">{item.title}</div>
                    <p className="text-xs text-gray-700/80 backdrop-blur-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SERVICES SECTION */}
      <motion.section 
        ref={servicesRef}
        initial={{ opacity: 0 }}
        animate={isServicesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="services" 
        className="bg-yellow-400/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-gray-900/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              What We Do
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase">
              Our Core <span className="text-blue-600">Service Lines</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 mt-13">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md p-9 relative overflow-hidden group rounded-lg shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                
                <div className="font-condensed font-extrabold text-5xl text-blue-600/70 leading-none mb-4">{service.number}</div>
                
                <div className="w-11 h-11 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 shadow-lg border border-gray-800/50">
                  <div className="text-yellow-400">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="font-condensed font-extrabold text-lg text-gray-900 uppercase tracking-wide mb-2.5">{service.title}</h3>
                <p className="text-gray-700/80 backdrop-blur-sm text-sm leading-relaxed">{service.description}</p>
                
                <motion.a
                  href="#solution"
                  whileHover={{ gap: 10 }}
                  onClick={(e) => { e.preventDefault(); scrollToSection('solution') }}
                  className="inline-flex items-center gap-1.5 mt-4.5 text-xs font-bold tracking-wide uppercase text-blue-600 transition-all duration-300"
                >
                  Learn more 
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SOLUTION SECTION */}
      <motion.section 
        ref={solutionRef}
        initial={{ opacity: 0 }}
        animate={isSolutionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="solution" 
        className="bg-white/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-yellow-400/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              Our Solutions
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase">
              Engineering Opportunity <span className="text-blue-600">Through Innovation</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-13">
            {[
              {
                image: 'https://picsum.photos/id/1085/700/480',
                tag: '01 · Energy',
                title: 'Solar Infrastructure',
                description: 'Advanced solar arrays and battery systems deliver reliable power to every laboratory, independent of national grids. Sized for all-day operation with overnight storage capacity.'
              },
              {
                image: 'https://picsum.photos/id/1090/700/480',
                tag: '02 · Technology',
                title: 'Refurbished Computing',
                description: 'Carefully restored devices extend the lifecycle of technology while providing students with professional-grade tools. Every unit is tested, certified, and warranted before deployment.'
              },
              {
                image: 'https://picsum.photos/id/1095/700/480',
                tag: '03 · Curriculum',
                title: 'Certified Digital Education',
                description: 'Cambridge-aligned programs in coding, digital literacy, and 21st-century skills prepare the next generation of Kenyan leaders for a digitally-driven economy.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isSolutionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-lg mb-5"
                />
                <div className="inline-block bg-yellow-400/80 backdrop-blur-sm text-gray-900 text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-lg mb-2.5">
                  {item.tag}
                </div>
                <h3 className="font-condensed font-extrabold text-xl text-gray-900 uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-gray-700/80 backdrop-blur-sm text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROCESS SECTION */}
      <motion.section 
        ref={processRef}
        initial={{ opacity: 0 }}
        animate={isProcessInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="process" 
        className="bg-gray-900/90 backdrop-blur-md py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2.5 text-yellow-400/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              Engagement Model
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-white uppercase">
              From <span className="text-yellow-400">Inquiry to Impact</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mt-16 relative">
            <div className="absolute top-7 left-[12%] right-[12%] h-px bg-white/10 backdrop-blur-sm"></div>
            
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full border-2 border-yellow-400 bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5.5 relative z-10 shadow-lg">
                  <span className="font-condensed font-extrabold text-2xl text-yellow-400">{step.number}</span>
                </div>
                <h3 className="font-condensed font-extrabold text-base text-white uppercase tracking-wide mb-2.5">{step.title}</h3>
                <p className="text-white/60 backdrop-blur-sm text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* RECYCLING SECTION */}
      <motion.section 
        ref={recyclingRef}
        initial={{ opacity: 0 }}
        animate={isRecyclingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="recycling" 
        className="bg-yellow-400/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isRecyclingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-gray-900/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              Sustainable Technology
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase">
              Responsible Technology. <span className="text-blue-600">Circular Impact.</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-13">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isRecyclingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://picsum.photos/id/1135/800/700" 
                alt="Technical team refurbishing computers" 
                className="w-full h-96 object-cover rounded-lg border-4 border-gray-900/50 shadow-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isRecyclingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-0"
            >
              {[
                {
                  icon: <Zap className="w-4.5 h-4.5" />,
                  title: 'Circular Technology Lifecycle',
                  description: 'Decommissioned corporate devices are collected, refurbished, certified, and redeployed into schools — extending usable life by 5–8 years and diverting e-waste from landfill.'
                },
                {
                  icon: <Monitor className="w-4.5 h-4.5" />,
                  title: 'Certified Responsible Disposal',
                  description: 'Devices beyond refurbishment are processed through certified e-waste channels in full compliance with Kenya\'s EMCA regulations.'
                },
                {
                  icon: <Users className="w-4.5 h-4.5" />,
                  title: 'Nationwide Collection Network',
                  description: 'We partner with businesses and county governments across Kenya to collect surplus technology — providing asset certificates and CSR documentation for all donations received.'
                },
                {
                  icon: <Award className="w-4.5 h-4.5" />,
                  title: 'Donor Benefits & Tax Compliance',
                  description: 'All corporate technology donors receive valuation certificates, impact attribution reports, and KRA-compliant documentation supporting tax-deductible contributions.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isRecyclingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4.5 items-start py-5 border-b border-gray-200/15 last:border-0 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  <div className="w-10.5 h-10.5 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-800/50">
                    <div className="text-yellow-400">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 mb-1">{item.title}</div>
                    <p className="text-gray-700/80 backdrop-blur-sm text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* IMPACT SECTION */}
      <motion.section 
        ref={impactRef}
        initial={{ opacity: 0 }}
        animate={isImpactInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="impact" 
        className="bg-blue-600/90 backdrop-blur-md py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isImpactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-yellow-400/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              Measurable Impact
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-white uppercase">
              Lasting <span className="text-yellow-400">Change. Real Numbers.</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 mt-13">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isImpactInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/15 backdrop-blur-md p-10 text-center rounded-lg shadow-lg border border-white/10 hover:shadow-2xl transition-all duration-300"
              >
                <div id={stat.id} data-target={stat.value} className="font-condensed font-extrabold text-5xl lg:text-6xl text-yellow-400 leading-none mb-1.5">0</div>
                <div className="text-xs font-bold tracking-wider uppercase text-white/65">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GALLERY SECTION */}
      <motion.section 
        ref={galleryRef}
        initial={{ opacity: 0 }}
        animate={isGalleryInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="stories" 
        className="bg-gray-900/90 backdrop-blur-md py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-yellow-400/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              From the Field
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-white uppercase">
              Transforming Communities <span className="text-yellow-400">Through Technology</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-[220px_220px] gap-1 mt-13">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isGalleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-lg group bg-white/10 backdrop-blur-sm ${item.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''} hover:bg-white/20 transition-all duration-300`}
              >
                <img 
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 saturate-80 group-hover:brightness-55 group-hover:saturate-60"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-gray-900/90 to-transparent backdrop-blur-sm"
                >
                  <p className="text-xs font-medium text-white/80">{item.caption}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-7"
          >
            <motion.a
              href="https://www.facebook.com/dsaidke/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/50 text-white text-xs font-bold tracking-wider uppercase rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              View Full Gallery on Facebook
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION */}
      <motion.section 
        ref={testimonialsRef}
        initial={{ opacity: 0 }}
        animate={isTestimonialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="testimonials" 
        className="bg-gray-50/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-13"
          >
            <div className="inline-flex items-center gap-2.5 text-gray-900/80 backdrop-blur-sm text-xs font-extrabold tracking-wider uppercase mb-4">
              Stakeholder Voices
            </div>
            <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase">
              What Our Partners <span className="text-yellow-400">Say</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-13">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border-t-4 border-yellow-400/50 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={`https://picsum.photos/id/${testimonial.imageId}/600/400`}
                  alt={testimonial.author}
                  className="w-full h-48 object-cover object-top grayscale-15"
                />
                <div className="p-6 lg:p-8">
                  <span className="font-serif text-5xl text-yellow-400 leading-none block mb-3.5">"</span>
                  <p className="text-gray-700/80 backdrop-blur-sm text-sm leading-relaxed italic mb-4.5">{testimonial.quote}</p>
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-700/80 backdrop-blur-sm mt-0.5">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PARTNERS SECTION */}
      <div className="bg-yellow-400/90 backdrop-blur-sm border-t-3 border-b-3 border-gray-900/50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-9 flex items-center gap-6 flex-wrap">
          <span className="text-xs font-extrabold tracking-wider uppercase text-gray-700/50 mr-1">Working With</span>
          {[
            'County Governments',
            'Kenya ICT Authority',
            'Cambridge International',
            'Corporate CSR Partners',
            'NGO & Development Agencies',
            'Ministry of Education'
          ].map((partner, index) => (
            <span key={index} className="px-4.5 py-2 border-2 border-gray-900/50 rounded-lg text-xs font-semibold text-gray-900 tracking-wide bg-white/10 backdrop-blur-sm hover:bg-gray-900/90 hover:text-yellow-400 transition-all duration-300 shadow-lg">
              {partner}
            </span>
          ))}
        </div>
      </div>

      {/* SUPPORT SECTION */}
      <motion.section 
        ref={supportRef}
        initial={{ opacity: 0 }}
        animate={isSupportInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        id="support" 
        className="bg-white/90 backdrop-blur-sm py-18 lg:py-28"
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isSupportInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-condensed font-extrabold text-4xl lg:text-5xl leading-none tracking-tight text-gray-900 uppercase mb-3.5">
                Invest in Kenya's <span className="text-blue-600">Digital Future.</span>
              </h2>
              <p className="text-gray-700/80 backdrop-blur-sm text-base leading-relaxed mb-7">
                Every contribution directly funds solar laboratories and technology access for rural students. Partner with us as a corporate donor, institutional funder, or individual supporter.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isSupportInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-baseline gap-3 mb-8"
              >
                <span className="font-condensed font-extrabold text-4xl text-blue-600">KSh 2.7M</span>
                <span className="text-xs font-bold tracking-wider uppercase text-gray-700/80">Raised This Year</span>
              </motion.div>
              
              <div className="flex flex-wrap gap-3.5">
                <motion.a
                  href="tel:+254722867666"
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-600/80 backdrop-blur-sm text-white px-7 py-3.5 text-xs font-bold tracking-wider uppercase rounded-lg inline-flex items-center gap-2 hover:bg-blue-700/90 transition-all duration-300 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Call: +254 722 867 666
                </motion.a>
                <motion.a
                  href="mailto:info@dsaid.world"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-gray-900/50 text-gray-900/80 backdrop-blur-sm px-7 py-3.5 text-xs font-bold tracking-wider uppercase rounded-lg inline-flex items-center gap-2 hover:bg-gray-900/90 hover:text-yellow-400 transition-all duration-300 shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Email a Proposal
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isSupportInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-yellow-400/90 backdrop-blur-sm p-10 rounded-lg border-3 border-gray-900/50 shadow-lg"
            >
              <label className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-2.5 block">Select Donation Amount (KSh)</label>
              
              <div className="flex flex-wrap gap-2 mb-4.5">
                {['500', '1000', '2500', '5000', '10000'].map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDonationAmount(amount)}
                    className={`px-4.5 py-2 border-2 border-gray-900/50 bg-transparent text-gray-900/80 backdrop-blur-sm font-bold text-xs tracking-wide uppercase rounded-lg transition-all duration-300 ${
                      activeDonation === amount ? 'bg-gray-900/90 text-yellow-400' : 'hover:bg-gray-900/90 hover:text-yellow-400'
                    }`}
                  >
                    {amount}
                  </motion.button>
                ))}
              </div>
              
              <label className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-2.5 block">Or Enter Amount</label>
              
              <div className="flex mb-5">
                <span className="bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-3 py-3 font-bold text-sm rounded-r-lg">KSh</span>
                <input 
                  type="number" 
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="100"
                  className="flex-1 px-3.5 py-3 border-2 border-gray-900/50 border-l-0 rounded-lg text-gray-900/80 backdrop-blur-sm font-semibold text-base bg-white/70 focus:outline-none focus:bg-white transition-all duration-300"
                />
              </div>
              
              <motion.a
                href="tel:+254722867666"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-900/80 backdrop-blur-sm text-yellow-400 px-8 py-7 font-bold text-sm tracking-wide uppercase rounded-lg text-center block hover:bg-gray-800/90 transition-all duration-300 shadow-lg"
              >
                Complete Secure Donation
              </motion.a>
              
              <p className="text-center text-xs font-semibold tracking-wide uppercase text-gray-700/55 mt-2.5">
                M-PESA · Visa · Mastercard · Tax-deductible
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-gray-900/90 backdrop-blur-md py-18 lg:py-28 border-t-4 border-yellow-400/50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-9 h-9 bg-yellow-400/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-gray-800/50 overflow-hidden">
                  <img 
                    src="/dsa-logo.svg" 
                    alt="DSAID Logo" 
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <span className="font-condensed font-extrabold text-2xl text-white tracking-wider">DSAID</span>
              </div>
              <p className="text-white/30 leading-tight mb-3.5">Digital Solutions for Africa's Integrated Development</p>
              <p className="text-gray-400/80 backdrop-blur-sm text-sm leading-relaxed max-w-[280px]">
                Delivering solar-powered technology infrastructure and digital education programs to Kenya's schools and communities since 2007.
              </p>
            </div>
            
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-yellow-400 mb-4">Services</div>
              <div className="flex flex-col gap-2.5">
                {['Solar Laboratories', 'Device Refurbishment', 'Digital Education', 'ICT Infrastructure', 'CSR Programs'].map((service) => (
                  <a
                    key={service}
                    href="#services"
                    onClick={(e) => { e.preventDefault(); scrollToSection('services') }}
                    className="text-gray-400/80 backdrop-blur-sm text-sm hover:text-white transition-all duration-300"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-yellow-400 mb-4">Organisation</div>
              <div className="flex flex-col gap-2.5">
                {['About DSAID', 'Impact Reports', 'Gallery', 'Annual Report 2025', 'Partnerships'].map((link) => (
                  <a
                    key={link}
                    href="#about"
                    onClick={(e) => { e.preventDefault(); scrollToSection('about') }}
                    className="text-gray-400/80 backdrop-blur-sm text-sm hover:text-white transition-all duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-bold tracking-wider uppercase text-yellow-400 mb-4">Contact</div>
              <div className="text-gray-400/80 backdrop-blur-sm text-sm leading-relaxed mb-2">Nairobi, Kenya</div>
              <div className="flex flex-col gap-1">
                <a href="tel:+254722867666" className="text-yellow-400 text-sm hover:text-white transition-all duration-300">+254 722 867 666</a>
                <a href="mailto:info@dsaid.world" className="text-yellow-400 text-sm hover:text-white transition-all duration-300">info@dsaid.world</a>
                <a href="https://dsaid.world" className="text-yellow-400 text-sm hover:text-white transition-all duration-300">www.dsaid.world</a>
              </div>
            </div>
          </div>
          
          <div className="pt-5.5 border-t border-white/8 flex justify-between items-center flex-wrap gap-2.5">
            <span className="text-gray-400/80 backdrop-blur-sm text-xs"> 2025 DSAID. All rights reserved. Registered in Kenya.</span>
            <span className="text-gray-400/18 backdrop-blur-sm text-xs tracking-wide">Est. 2007 · Nairobi · www.dsaid.world</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        :global(body) {
          font-family: 'Barlow', sans-serif;
        }
        
        .font-condensed {
          font-family: 'Barlow Condensed', sans-serif;
        }
        
        .tracking-wider {
          letter-spacing: 0.05em;
        }
        
        .tracking-wide {
          letter-spacing: 0.025em;
        }
        
        .tracking-tight {
          letter-spacing: -0.025em;
        }
      `}</style>
    </div>
  )
}
