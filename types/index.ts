export interface SolutionFeature {
  id: number
  title: string
  description: string
  color: 'blue' | 'green' | 'purple'
}

export interface ImpactItem {
  id: number
  title: string
  description: string
}

export interface LabFeature {
  id: number
  text: string
}

export interface LeadershipInfo {
  name: string
  title: string
  motivation: string
  experience: string
  image?: string
  quote?: string
}

export interface NavItem {
  href: string
  label: string
}

export interface StatItem {
  id: string
  value: number
  label: string
  prefix?: string
}

export interface SolutionStep {
  id: number
  emoji: string
  title: string
  description: string
  badge?: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  content: string
  imageId: string
  avatarColor: string
}

export interface ImpactMetric {
  id: string
  emoji: string
  value: number
  label: string
}

export interface DonationForm {
  fullName: string
  email: string
  paymentMethod: 'mpesa' | 'visa' | 'paypal'
  amount: number
}
