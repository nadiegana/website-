"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  ArrowRight,
  Palette,
  CheckCircle,
  X,
  Menu,
  PlayCircle,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { submitContactForm } from "@/app/contact-action"
import LightRays from "@/components/light-rays"
import SplitText from "@/components/split-text" // Import SplitText

const MotionWrapper = motion.div

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("graphic-design")
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  // State for form handling (React 18 compatible)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard navigation for project modal
  const handlePrevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1))
    }
  }

  const handleNextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedProject && selectedProject.images && selectedProject.images.length > 1) {
        if (event.key === "ArrowLeft") {
          handlePrevImage()
        } else if (event.key === "ArrowRight") {
          handleNextImage()
        }
      }
    }

    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProject])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError(null)
    setShowSuccess(false)

    const formData = new FormData(event.currentTarget)
    const result = await submitContactForm(formData)

    setIsSubmitting(false)

    if (result?.success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      event.currentTarget.reset()
    } else if (result?.error) {
      setFormError(result.error)
      console.error("Form submission error:", result.error)
    }
  }

  const projects = [
    {
      id: 1,
      title: "Brand Identity Design",
      category: "Branding",
      description:
        "Complete brand identity system for Food Security Network (FSN) featuring an interconnected icon system representing various aspects of food security.",
      image: "/fsn-logo-mockup.jpeg",
      tags: ["Logo Design", "Brand Guidelines", "Food Security", "Non-Profit Branding", "Identity Systems"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/ommr/",
    },
    {
      id: 2,
      title: "Annual Report Design",
      category: "Publication Design",
      description:
        "2024 Annual Report design for Boulder Food Rescue featuring clean typography, organic rope elements, and hand-drawn bicycle illustrations.",
      image: "/boulder-food-rescue-annual-report.jpeg",
      tags: ["Annual Report", "Non-Profit Design", "Publication Design", "Community Branding"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/mdtu/",
    },
    {
      id: 3,
      title: "Informe no financiero Colpatria 2018",
      category: "Publication Design",
      description:
        "Corporate non-financial report design for Colpatria featuring clean typography and strategic use of the brand's red color palette.",
      image: "/colpatria-informe-cover.png",
      tags: ["Corporate Design", "Non-Financial Report", "Spanish Language", "Brand Consistency", "Publication Design"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/meze/",
    },
    {
      id: 4,
      title: "Cultural Event Poster Series",
      category: "Print Design",
      description:
        "Comprehensive poster design series for cultural events and theatrical productions, featuring consistent branding with mandala motifs.",
      image: "/abrazo-latino-poster.jpeg",
      images: ["/abrazo-latino-poster.jpeg", "/chai-chat-poster.jpeg", "/cage-poster.jpeg", "/bibi-poster.jpeg"],
      tags: ["Poster Design", "Cultural Design", "Event Marketing", "Illustration"],
      detailedDescription:
        "This poster series represents a comprehensive approach to cultural event marketing, featuring four distinct designs that maintain visual consistency while celebrating diverse cultural expressions. Each poster incorporates traditional mandala motifs with contemporary design elements, creating a bridge between cultural heritage and modern aesthetic appeal.",
    },
    {
      id: 5,
      title: "HAFNCO Website Design",
      category: "Web Design",
      description:
        "Complete website design and development for Harvest of All First Nations, featuring cultural sensitivity, modern UX, and community-focused storytelling.",
      image: "/hafnco-website.jpeg",
      tags: ["Web Design", "Non-Profit", "Cultural Design", "UX/UI"],
      websiteUrl: "https://www.hafnco.org",
      detailedDescription:
        "This website project required deep cultural sensitivity and community collaboration. The design process involved extensive consultation with First Nations community members to ensure authentic representation while delivering a modern, accessible web experience that serves the organization's mission effectively.",
    },
    {
      id: 6,
      title: "Calligraphy & Lettering",
      category: "Typography",
      description:
        "Hand-lettered design series for 'Cumbia Chicanombiana' featuring vibrant gradient typography with multiple color variations.",
      image: "/cumbia-lettering-cyan.png",
      images: [
        "/cumbia-lettering-cyan.png",
        "/cumbia-lettering-green.png",
        "/cumbia-lettering-pink.png",
        "/cumbia-lettering-white.png",
        "/cumbia-lettering-yellow.png",
        "/cumbia-lettering-purple.png",
      ],
      tags: ["Hand Lettering", "Typography", "Colombian Culture", "Brush Script", "Cultural Design"],
      detailedDescription:
        "This lettering project explores the intersection of Colombian musical heritage and contemporary typography design. Created with traditional brush techniques and modern color theory, the series includes six color variations that each evoke different emotional responses while maintaining the energetic spirit of Cumbia music.",
    },
  ]

  const photographyProjects = [
    {
      id: 1,
      image: "/mountain-lake-sunset.jpeg",
      title: "Mountain Lake Sunset",
      description:
        "Aerial view of a winding lake system during golden hour, capturing the warm reflections and layered mountain silhouettes.",
      tags: ["Landscape", "Aerial", "Golden Hour", "Nature"],
    },
    {
      id: 2,
      image: "/colonial-church-aerial.jpeg",
      title: "Colonial Church",
      description:
        "Historic white colonial church with dome architecture nestled in a colorful Latin American hillside town.",
      tags: ["Architecture", "Cultural", "Aerial", "Heritage"],
    },
    {
      id: 3,
      image: "/coastal-fortress-aerial.jpeg",
      title: "Coastal Fortress",
      description:
        "Geometric concrete fortification structures creating striking patterns against white sand and coastal landscape.",
      tags: ["Architecture", "Geometric", "Coastal", "Historical"],
    },
    {
      id: 4,
      image: "/bogota-cityscape.jpeg",
      title: "Bogotá Skyline",
      description:
        "Modern urban landscape of Colombia's capital city with high-rise buildings set against the Andean mountains.",
      tags: ["Urban", "Cityscape", "Modern", "Colombia"],
    },
    {
      id: 5,
      image: "/ocean-surfer-aerial.jpeg",
      title: "Ocean Surfer",
      description:
        "Lone surfer navigating choppy waters during golden hour, emphasizing the scale and beauty of the ocean.",
      tags: ["Action", "Ocean", "Surfing", "Adventure"],
    },
    {
      id: 6,
      image: "/rock-climbing-aerial.jpeg",
      title: "Rock Climbing",
      description:
        "Aerial perspective of climbers on a vertical rock face, showcasing the thrill and technical aspects of the sport.",
      tags: ["Adventure", "Climbing", "Extreme Sports", "Vertical"],
    },
    {
      id: 7,
      image: "/aerial-forest-road.jpeg",
      title: "Forest Road",
      description:
        "Two vehicles navigating a dirt road through dense woodland, capturing the essence of wilderness exploration.",
      tags: ["Adventure", "Forest", "Exploration", "Vehicles"],
    },
    {
      id: 8,
      image: "/photo1.jpeg",
      title: "Adventure Portrait",
      description: "Dynamic outdoor portrait capturing the spirit of adventure and exploration in natural settings.",
      tags: ["Portrait", "Adventure", "Outdoor", "Lifestyle"],
    },
    {
      id: 9,
      image: "/photo2.jpeg",
      title: "Nature Scene",
      description: "Serene natural landscape showcasing the beauty and tranquility of untouched wilderness areas.",
      tags: ["Nature", "Landscape", "Serene", "Wilderness"],
    },
    {
      id: 10,
      image: "/photo3.jpeg",
      title: "Outdoor Adventure",
      description:
        "Action-packed outdoor adventure scene highlighting the excitement of exploring natural environments.",
      tags: ["Adventure", "Action", "Outdoor", "Exploration"],
    },
    {
      id: 11,
      image: "/photo4.jpeg",
      title: "Landscape Vista",
      description: "Breathtaking landscape vista showcasing dramatic natural formations and expansive views.",
      tags: ["Landscape", "Vista", "Dramatic", "Natural"],
    },
    {
      id: 12,
      image: "/img-0844-polarr.jpeg",
      title: "Aerial Surfer in Foam",
      description:
        "An aerial perspective of a surfer in a black wetsuit, paddling through the intricate patterns of white ocean foam against dark green water.",
      tags: ["Surfing", "Aerial", "Ocean", "Abstract", "Action"],
    },
  ]

  const videoProjects = [
    {
      id: 1,
      title: "Graffiti - BOCHICA ART - California",
      description:
        "A collaborative project showcasing vibrant graffiti art in California, capturing the creative process and final pieces.",
      embedUrl: "https://www.youtube.com/embed/e_zoOxFzjxk",
      tags: ["Graffiti", "Art", "California", "Collaboration", "Street Art"],
    },
    {
      id: 2,
      title: "Street Rollerblade ft. Milu Guevara - BOGOTA COVID",
      description:
        "Aggressive street rollerblading with Milu Guevara in Bogotá during the COVID era, filmed in 4K for optimal visual experience.",
      embedUrl: "https://www.youtube.com/embed/t_inbdnpyzQ",
      tags: ["Rollerblading", "Street Sports", "Bogotá", "COVID", "4K Video"],
    },
    {
      id: 3,
      title: "RenovaTrax 2020",
      description:
        "En el corazón de Bogotá, la calle se convirtió en un escenario de arte, música y deporte. Esta manifestación pacífica, organizada de forma autogestionada y con el apoyo de diversos colectivos sociales, transformó el espacio público en un laboratorio vivo de experimentación artística y expresión colectiva. Una jornada para encontrarnos, resistir y crear juntxs. 💥🎶🛹🎨",
      embedUrl: "https://www.youtube.com/embed/3cZvImm6Fgw",
      tags: ["Motion Graphics", "Visual Effects", "Animation", "Creative", "Digital Art"],
    },
    {
      id: 4,
      title: "Higiene Mental - Resonar Lab",
      description: "Distance co-production that reflects on the negative impact of social networks and media.",
      embedUrl: "https://www.youtube.com/embed/8yJCPB92W1I",
      tags: ["Music Video", "Experimental", "Social Commentary", "Resonar Lab"],
    },
    {
      id: 5,
      title: "Barrio Obrero - Resonar Lab",
      description: "An immersive journey through abstract visuals synchronized with unique soundscapes.",
      embedUrl: "https://www.youtube.com/embed/lzYrsDsCXrc",
      tags: ["Abstract", "Visuals", "Soundscapes", "Experimental"],
    },
    {
      id: 6,
      title: "Cumbia Chicanombiana - Resonar Lab",
      description:
        "Activist musical journey through Colorado, USA, where we explore the combination of participatory art and music in the service of environmental justice. La Cumbia Chicanombiana highlights the struggle of diverse communities and activists against social injustice and environmental damage caused by the fracking and oil industries. This co-production is inspired by interviews and workshops we conducted throughout the state, supported by local initiatives fighting against the destruction of their homelands and the serious deterioration of their health.",
      embedUrl: "https://www.youtube.com/embed/GrnuJulYmz0",
      tags: ["Activist", "Musical", "Showcase", "Creative"],
    },
  ]

  const skills = [
    { name: "Adobe Creative Suite", level: 95 },
    { name: "Canva & Adobe Express", level: 90 },
    { name: "Brand Identity", level: 88 },
    { name: "Video Editing", level: 85 },
    { name: "Typography", level: 92 },
    { name: "Print Design", level: 87 },
    { name: "Languages (Spanish)", level: 100 },
  ]

  const tools = [
    { name: "Photoshop", abbr: "Ps", color: "from-blue-600 to-blue-800" },
    { name: "Illustrator", abbr: "Ai", color: "from-orange-600 to-orange-800" },
    { name: "InDesign", abbr: "Id", color: "from-pink-600 to-pink-800" },
    { name: "DaVinci Resolve", abbr: "DV", color: "from-gray-800 to-black" },
    { name: "Lightroom", abbr: "Lr", color: "from-blue-500 to-blue-700" },
    { name: "Notion", abbr: "N", color: "from-gray-900 to-black" },
    { name: "After Effects", abbr: "Ae", color: "from-purple-600 to-purple-800" },
    { name: "Procreate", abbr: "Pr", color: "from-green-600 to-green-800" },
  ]

  const handleProjectClick = (project) => {
    if (project.embedUrl) window.open(project.embedUrl, "_blank")
    else if (project.websiteUrl) window.open(project.websiteUrl, "_blank")
    else {
      setSelectedProject(project)
      setCurrentImageIndex(0)
    }
  }

  const handlePhotoClick = (photo) => setSelectedPhoto(photo)
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const handleImageError = (e) => (e.target.src = "/placeholder.svg?height=400&width=400&text=Error")

  const getYouTubeVideoId = (url: string | null) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <>
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Thank you! Your message has been sent.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          headerScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Image
              src="/nadie-gana-logo-white.png"
              alt="NADIE GANA Logo"
              width={140}
              height={40}
              className="h-8 w-auto dark:invert-0 invert transition-all duration-300"
            />
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "work", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="capitalize text-sm font-medium text-foreground hover:text-primary-orange transition-colors"
                >
                  {item}
                </button>
              ))}
              <ThemeToggleButton />
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-background p-8 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-8">
              {["home", "about", "work", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="capitalize text-2xl font-medium text-foreground hover:text-primary-orange transition-colors"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4">
                <ThemeToggleButton onThemeChange={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* LightRays Background */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#F26522" /* Using primary-orange from your tailwind config */
          raysSpeed={0.8}
          lightSpread={0.7}
          rayLength={1.5}
          pulsating={true}
          fadeDistance={0.8}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.05}
          distortion={0.02}
          className="absolute inset-0 z-0"
        />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Removed MotionWrapper from here to avoid animation conflicts */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm font-medium text-muted-foreground"
                >
                  <Palette className="w-4 h-4 text-primary-orange" />
                  <span>Creative Explorer</span>
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
                  <SplitText
                    text="Creative"
                    tag="span"
                    splitType="chars"
                    delay={0.03}
                    duration={0.6}
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                  {/* Use motion.span for "Design" to ensure gradient visibility */}
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "power3.out" }}
                    className="block bg-gradient-to-r from-primary-orange to-orange-500 bg-clip-text text-transparent"
                  >
                    Design
                  </motion.span>
                  <SplitText
                    text="Solutions"
                    tag="span"
                    splitType="chars"
                    delay={0.03}
                    duration={0.6}
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </h1>
                <SplitText
                  text="I craft compelling visual experiences that tell your story and connect with your audience through innovative design."
                  splitType="words" // Animates word by word
                  delay={0.01} // Smaller stagger delay for paragraph
                  duration={0.8}
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  className="text-lg max-w-lg text-muted-foreground"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }} // Adjusted delay to follow text animation
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollTo("work")}
                  className="bg-primary-orange hover:bg-orange-600 text-white"
                >
                  View My Work <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollTo("contact")}>
                  Get In Touch
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-orange to-orange-400 rounded-3xl blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
                <Image
                  src="/hero-mountain-road.jpeg"
                  alt="Creative explorer on mountain road"
                  width={500}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <MotionWrapper className="lg:col-span-3 space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Hi there, I'm Nicolas!</h2>
              <p className="text-lg text-muted-foreground">
                A visual designer, storyteller, and creative collaborator. I work at the intersection of design,
                community, and cultural transformation. My practice blends graphic design, video, participatory art, and
                web development, often with a focus on projects rooted in social impact, activism, and collective
                imagination.
              </p>
              <p className="text-lg text-muted-foreground">
                My approach combines playful aesthetics with functional design, creating work that's both visually
                striking and purposeful. Let's create something amazing together!
              </p>
            </MotionWrapper>
            <MotionWrapper className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Skills & Expertise</h3>
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between font-medium text-foreground">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <motion.div
                      className="bg-gradient-to-r from-primary-orange to-orange-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <MotionWrapper>
            <h2 className="text-3xl font-bold text-primary-orange mb-4">Tools I Use</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Professional software and tools that power my creative workflow.
            </p>
          </MotionWrapper>
          <MotionWrapper className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mt-12">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="flex flex-col items-center space-y-3 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20`}
                >
                  <span className="text-white font-bold text-2xl drop-shadow-md">{tool.abbr}</span>
                </motion.div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary-orange transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <MotionWrapper className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Work</h2>
            <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
              A selection of my recent projects showcasing various creative disciplines.
            </p>
          </MotionWrapper>

          <div className="flex justify-center mb-12">
            <div className="bg-muted rounded-full p-1 inline-flex">
              <button
                onClick={() => setActiveTab("graphic-design")}
                className="px-6 py-2 rounded-full text-sm font-medium relative"
              >
                {activeTab === "graphic-design" && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-primary-orange rounded-full"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeTab === "graphic-design"
                      ? "font-semibold text-dark-charcoal"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Graphic Design
                </span>
              </button>
              <button
                onClick={() => setActiveTab("photography")}
                className="px-6 py-2 rounded-full text-sm font-medium relative"
              >
                {activeTab === "photography" && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-primary-orange rounded-full"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeTab === "photography"
                      ? "font-semibold text-dark-charcoal"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Photography
                </span>
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className="px-6 py-2 rounded-full text-sm font-medium relative"
              >
                {activeTab === "videos" && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-primary-orange rounded-full"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeTab === "videos"
                      ? "font-semibold text-dark-charcoal"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Video
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "graphic-design" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <motion.div key={project.id} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card
                        className="group cursor-pointer overflow-hidden h-full flex flex-col"
                        onClick={() => handleProjectClick(project)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleProjectClick(project)
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="relative overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={handleImageError}
                          />
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col">
                          <div className="space-y-3 flex-grow">
                            <Badge variant="secondary">{project.category}</Badge>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-orange transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : activeTab === "photography" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photographyProjects.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg"
                      onClick={() => handlePhotoClick(photo)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handlePhotoClick(photo)
                      }}
                      role="button"
                      tabIndex={0}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={handleImageError}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-white"
                        >
                          <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                          <p className="text-sm text-gray-200 mb-3 line-clamp-2">{photo.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {photo.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Corner indicator */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videoProjects.map((video) => {
                    const videoId = getYouTubeVideoId(video.embedUrl)
                    return (
                      <motion.div
                        key={video.id}
                        className="group relative aspect-video overflow-hidden cursor-pointer rounded-lg shadow-lg"
                        onClick={() => setSelectedVideo(video)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setSelectedVideo(video)
                        }}
                        role="button"
                        tabIndex={0}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: video.id * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {videoId ? (
                          <Image
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={video.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.onerror = null // prevent infinite loop
                              // Try sddefault.jpg first, then hqdefault.jpg
                              if (target.src.includes("maxresdefault.jpg")) {
                                target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
                              } else if (target.src.includes("sddefault.jpg")) {
                                target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                              } else {
                                target.src = "/placeholder.svg?height=400&width=400&text=Video+Error"
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">No preview</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                          <PlayCircle className="w-16 h-16 text-white/80 mb-4 transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="font-bold text-lg text-white drop-shadow-md transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <MotionWrapper className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Let's Work Together</h2>
                <p className="text-lg text-muted-foreground">
                  Ready to bring your vision to life? I'd love to hear about your project.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "nadiegan4@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+573165516640" },
                  { icon: MapPin, label: "Location", value: "Bogota, Colombia" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-orange" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{item.label}</div>
                      <div className="text-muted-foreground">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </MotionWrapper>
            <MotionWrapper>
              <Card className="p-8 shadow-xl bg-muted/50 border-0">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-sm font-medium">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-primary-orange focus:border-primary-orange sm:text-sm"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Publication Design">Publication Design</option>
                      <option value="Print Design">Print Design</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Typography">Typography</option>
                      <option value="Photography">Photography</option>
                      <option value="Video Production">Video Production</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" name="message" placeholder="Tell me about your project..." required />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-orange hover:bg-orange-600 text-white"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {formError && <p className="text-sm text-red-500 mt-2">{formError}</p>}
                </form>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="mb-4 md:mb-0">© 2025 Nicolas Saenz. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-primary-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary-orange transition-colors">
              Terms of Service
            </Link>
            <Link
              href="https://www.instagram.com/nadie_gana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 hover:text-primary-orange transition-colors" />
            </Link>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div layoutId={`photo-${selectedPhoto.id}`} className="relative max-w-4xl max-h-[90vh]">
              <Image
                src={selectedPhoto.image || "/placeholder.svg"}
                alt="Enlarged photo"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
              <div className="aspect-video">
                <iframe
                  src={`${selectedVideo.embedUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl w-full p-0 rounded-lg h-[90vh] flex flex-col">
            <div className="relative w-full flex-grow flex flex-col items-center justify-center group">
              {/* Background Image */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={
                      (selectedProject.images && selectedProject.images[currentImageIndex]) ||
                      selectedProject.image ||
                      "/placeholder.svg"
                    }
                    alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain" // Ensures the entire image is visible
                    onError={handleImageError}
                  />
                </motion.div>
              </AnimatePresence>
              {/* Semi-transparent Overlay and Content */}
              <div className="absolute inset-0 bg-black/70 md:bg-black/0 md:group-hover:bg-black/70 flex flex-col justify-end p-6 md:p-10 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-sm md:text-base mb-4 overflow-y-auto custom-scrollbar">
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>
                {/* Navigation Controls for Multi-Image Projects */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/20 hover:bg-white/40 text-white"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div className="flex space-x-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-primary-orange" : "bg-white/50 hover:bg-white"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/20 hover:bg-white/40 text-white"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
