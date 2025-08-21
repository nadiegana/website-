"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
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
import TiltedCard from "@/components/TiltedCard" // Import TiltedCard
import "@/components/TiltedCard.css" // Import TiltedCard CSS

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
      image: "/hafnco-website-homepage.jpeg",
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
    {
      id: 7,
      title: "Corn Festival Branding",
      category: "Event Branding",
      description:
        "Complete visual identity system for the Annual Corn Festival including event materials, social media campaign, and comprehensive wayfinding signage system for safe festival operations.",
      image: "/corn-festival-poster.jpeg",
      images: [
        "/corn-festival-poster.jpeg",
        "/corn-festival-save-the-date.png",
        "/corn-festival-map.png",
        // Headliners organized A-Z by artist name
        "/corn-festival-jackie-bird-headliner.png", // Jackie Bird & Sons
        "/corn-festival-jackie-bird-description.png",
        "/corn-festival-melissa-headliner.png", // Melissa Ivey & The Future Ancestors
        "/corn-festival-melissa-description.png",
        "/corn-festival-mono-verde-headliner.png", // Mono Verde Collective
        "/corn-festival-mono-verde-description.png",
        "/corn-festival-stella-headliner.png", // Stella Standingbear
        "/corn-festival-stella-description.png",
        // Signage system
        "/corn-festival-no-smoking-sign.png",
        "/corn-festival-waiver-required-sign.png",
        "/corn-festival-no-drugs-alcohol-sign.png",
        "/corn-festival-native-food-court-sign.png",
        "/corn-festival-no-weapons-sign.png",
        "/corn-festival-filming-photography-sign.png",
        "/corn-festival-no-pets-sign.png",
        "/corn-festival-red-barn-sign.png",
        "/corn-festival-sign-waiver-sign.png",
        "/corn-festival-kids-area-sign.png",
      ],
      tags: ["Event Design", "Festival Branding", "Wayfinding", "Signage", "Cultural Design"],
      detailedDescription:
        "This comprehensive festival branding project celebrates Indigenous agricultural heritage through respectful and authentic visual design. The project encompassed all visual touchpoints for the annual Corn Festival, creating a complete brand ecosystem that includes promotional materials, digital campaigns, and operational signage. The main event poster features traditional Native American imagery and cultural elements, complemented by a 'Save the Date' announcement with ceremonial regalia photography and a detailed festival map with complete wayfinding system. The social media campaign featured individual headliner spotlights for Jackie Bird & Sons, Melissa Ivey & The Future Ancestors, Mono Verde Collective, and Stella Standingbear, each with both portrait-style announcements and detailed biographical posts. The comprehensive signage system includes regulatory signs (No Smoking, No Weapons, No Drugs/Alcohol, No Pets), operational signs (Waiver Requirements, Photography Notices), and directional wayfinding (Native Food Court, Red Barn, Kids Area). The design approach honored Indigenous culture while creating clear, functional materials that maintained brand consistency across all platforms and applications. The warm earth-tone color palette, traditional corn motifs, and consistent typography created a cohesive brand identity that respected cultural significance while ensuring accessibility, safety, and engagement across all festival touchpoints.",
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
                <Image
                  src="/hero-mountain-road.jpeg"
                  alt="Creative explorer on mountain road"
                  width={500}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw" // At most 1024px wide, it takes 100% of viewport, otherwise 50%
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 bg-muted/50 overflow-hidden">
        <div className="container mx-auto relative z-10">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <div
                        className="relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                        onClick={() => handleProjectClick(project)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleProjectClick(project)
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={handleImageError}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge
                              variant="secondary"
                              className="bg-background/95 text-foreground backdrop-blur-sm border border-border/50 shadow-lg font-medium px-3 py-1"
                            >
                              {project.category}
                            </Badge>
                          </div>

                          {/* Hover Content */}
                          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="text-white">
                              <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{project.title}</h3>
                              <p className="text-sm text-white/90 line-clamp-2 drop-shadow-md">{project.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 space-y-4">
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-orange transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs border-muted-foreground/30 hover:border-primary-orange/50 transition-colors duration-300"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs border-muted-foreground/30">
                                +{project.tags.length - 3} more
                              </Badge>
                            )}
                          </div>

                          {/* Action Indicator */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-primary-orange transition-colors duration-300">
                              <span className="text-sm font-medium">
                                {project.embedUrl || project.websiteUrl ? "View Project" : "View Details"}
                              </span>
                              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        {/* Subtle Border Glow */}
                        <div className="absolute inset-0 rounded-3xl border border-primary-orange/0 group-hover:border-primary-orange/20 transition-colors duration-500 pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : activeTab === "photography" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photographyProjects.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      className="aspect-square" // Maintain aspect ratio for grid layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TiltedCard
                        imageSrc={photo.image || "/placeholder.svg"}
                        altText={photo.title}
                        containerHeight="100%"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        scaleOnHover={1.05} // Slightly less scale than default to fit grid better
                        rotateAmplitude={8} // Slightly less rotation for subtle effect
                        showMobileWarning={false}
                        onClick={() => handlePhotoClick(photo)} // Pass click handler
                      />
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="relative max-w-6xl w-full max-h-[95vh] bg-background/95 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-border/20"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 z-20 bg-background/90 hover:bg-background text-foreground backdrop-blur-md rounded-full shadow-lg border border-border/50 transition-all duration-300 hover:scale-110"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Image Container */}
              <div className="relative w-full flex-grow flex items-center justify-center p-6">
                <Image
                  src={selectedPhoto.image || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[calc(95vh-200px)] object-contain rounded-2xl shadow-lg"
                  sizes="90vw"
                />
              </div>

              {/* Enhanced Photo Info */}
              {selectedPhoto.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-8 bg-card/95 backdrop-blur-md border-t border-border/50"
                >
                  <div className="max-w-4xl mx-auto space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{selectedPhoto.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedPhoto.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-muted/80 text-muted-foreground border-border/50 backdrop-blur-sm hover:bg-primary-orange/10 hover:border-primary-orange/30 transition-all duration-300 text-xs font-medium px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
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
          <DialogContent className="max-w-7xl w-full p-0 rounded-3xl h-[95vh] flex flex-col overflow-hidden bg-background border-0 shadow-2xl">
            <div className="relative w-full h-full flex flex-col">
              {/* Header Bar */}
              <div className="relative z-20 flex items-center justify-between p-6 bg-background/95 backdrop-blur-md border-b border-border/50">
                {/* Category Badge */}
                <Badge className="bg-primary-orange/90 text-white backdrop-blur-md border-0 shadow-lg font-semibold px-4 py-2 text-sm">
                  {selectedProject.category}
                </Badge>

                {/* Navigation Controls for Multi-Image Projects */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-background/90 hover:bg-background text-foreground border-border/50 backdrop-blur-md shadow-lg transition-all duration-300 rounded-full"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>

                    {/* Image Indicators */}
                    <div className="flex space-x-2 bg-background/90 backdrop-blur-md rounded-full px-3 py-1 border border-border/50 shadow-lg">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-primary-orange shadow-lg scale-125"
                              : "bg-muted-foreground/40 hover:bg-muted-foreground/60 hover:scale-110"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-background/90 hover:bg-background text-foreground border-border/50 backdrop-blur-md shadow-lg transition-all duration-300 rounded-full"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background/90 hover:bg-background text-foreground backdrop-blur-md rounded-full shadow-lg border border-border/50 transition-all duration-300 hover:scale-110"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Image Section */}
                <div className="flex-1 relative bg-muted/20 flex items-center justify-center p-6">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={
                          (selectedProject.images && selectedProject.images[currentImageIndex]) ||
                          selectedProject.image ||
                          "/placeholder.svg"
                        }
                        alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
                        onError={handleImageError}
                        sizes="60vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Keyboard Navigation Hint */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-background/90 backdrop-blur-md rounded-full px-4 py-2 border border-border/50 shadow-lg">
                        <p className="text-xs text-muted-foreground font-medium">Use ← → arrow keys to navigate</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-full lg:w-96 xl:w-[28rem] bg-card/95 backdrop-blur-md border-l border-border/50 flex flex-col"
                >
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                    {/* Title Section */}
                    <div className="space-y-4">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-2xl xl:text-3xl font-bold text-foreground leading-tight tracking-tight"
                      >
                        {selectedProject.title}
                      </motion.h2>

                      {/* Tags */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap gap-2"
                      >
                        {selectedProject.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-muted/80 text-muted-foreground border-border/50 backdrop-blur-sm hover:bg-primary-orange/10 hover:border-primary-orange/30 transition-all duration-300 text-xs font-medium px-3 py-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-foreground">About This Project</h3>
                      <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 border border-border/30">
                        <p className="text-sm xl:text-base text-foreground leading-relaxed">
                          {selectedProject.detailedDescription || selectedProject.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Project Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                          <span className="text-sm font-medium text-muted-foreground">Category</span>
                          <span className="text-sm font-semibold text-foreground">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                          <span className="text-sm font-medium text-muted-foreground">Tags</span>
                          <span className="text-sm font-semibold text-foreground">
                            {selectedProject.tags.length} tags
                          </span>
                        </div>
                        {selectedProject.images && (
                          <div className="flex justify-between items-center py-2 border-b border-border/30">
                            <span className="text-sm font-medium text-muted-foreground">Images</span>
                            <span className="text-sm font-semibold text-foreground">
                              {currentImageIndex + 1} of {selectedProject.images.length}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-sm space-y-3"
                  >
                    {(selectedProject.embedUrl || selectedProject.websiteUrl) && (
                      <Button
                        size="lg"
                        className="w-full bg-primary-orange hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl font-semibold"
                        onClick={() => {
                          if (selectedProject.embedUrl) window.open(selectedProject.embedUrl, "_blank")
                          else if (selectedProject.websiteUrl) window.open(selectedProject.websiteUrl, "_blank")
                        }}
                      >
                        <ArrowRight className="w-5 h-5 mr-2" />
                        {selectedProject.websiteUrl ? "Visit Website" : "View Project"}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-background/90 hover:bg-background text-foreground border-border/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl font-semibold"
                      onClick={() => {
                        setSelectedProject(null)
                        scrollTo("contact")
                      }}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Get In Touch
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
