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
  Download,
  ExternalLink,
  Palette,
  Layers,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import emailjs from "@emailjs/browser"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Brand Identity Design",
      category: "Branding",
      description:
        "Complete brand identity system for Food Security Network (FSN) featuring an interconnected icon system representing various aspects of food security - from farming and nutrition to community support. The design includes logo variations, systematic iconography, and professional brand guidelines.",
      image: "/fsn-logo-mockup.jpeg",
      tags: ["Logo Design", "Brand Guidelines", "Food Security", "Non-Profit Branding", "Identity Systems"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/ommr/",
    },
    {
      id: 2,
      title: "Annual Report Design",
      category: "Publication Design",
      description:
        "2024 Annual Report design for Boulder Food Rescue featuring clean typography, organic rope elements, and hand-drawn bicycle illustrations that reflect the organization's community-focused food delivery mission.",
      image: "/boulder-food-rescue-annual-report.jpeg",
      tags: ["Annual Report", "Non-Profit Design", "Publication Design", "Community Branding"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/mdtu/",
    },
    {
      id: 7,
      title: "Informe no financiero Colpatria 2018",
      category: "Publication Design",
      description:
        "Corporate non-financial report design for Colpatria featuring clean typography, strategic use of the brand's red color palette, and a distinctive green 'NO' stamp design element that emphasizes the non-financial nature of the report while maintaining professional corporate standards.",
      image: "/colpatria-informe-cover.png",
      tags: ["Corporate Design", "Non-Financial Report", "Spanish Language", "Brand Consistency", "Publication Design"],
      embedUrl: "https://online.fliphtml5.com/zcsyb/meze/",
    },
    {
      id: 3,
      title: "Cultural Event Poster Series",
      category: "Print Design",
      description:
        "Comprehensive poster design series for cultural events and theatrical productions, featuring consistent branding with mandala motifs and culturally-sensitive illustrations.",
      image: "/abrazo-latino-poster.jpeg",
      images: ["/abrazo-latino-poster.jpeg", "/chai-chat-poster.jpeg", "/cage-poster.jpeg", "/bibi-poster.jpeg"],
      tags: ["Poster Design", "Cultural Design", "Event Marketing", "Illustration"],
      detailedDescription:
        "This poster series represents a comprehensive approach to cultural event marketing, featuring four distinct designs that maintain visual consistency while celebrating diverse cultural expressions. Each poster incorporates traditional mandala motifs with contemporary design elements, creating a bridge between cultural heritage and modern aesthetic appeal. The series includes designs for 'Abrazo Latino', 'Chai Chat', 'Cage', and 'Bibi' - each maintaining cultural sensitivity while delivering impactful visual communication.",
    },
    {
      id: 4,
      title: "HAFNCO Website Design",
      category: "Web Design",
      description:
        "Complete website design and development for Harvest of All First Nations, featuring cultural sensitivity, modern UX, and community-focused storytelling. The design emphasizes accessibility, cultural authenticity, and user engagement while maintaining professional standards for non-profit organizations.",
      image: "/hafnco-website.jpeg",
      tags: ["Web Design", "Non-Profit", "Cultural Design", "UX/UI"],
      websiteUrl: "https://www.hafnco.org",
      detailedDescription:
        "This website project required deep cultural sensitivity and community collaboration. The design process involved extensive consultation with First Nations community members to ensure authentic representation while delivering a modern, accessible web experience that serves the organization's mission effectively. The site features a clean navigation structure, culturally appropriate imagery, and clear messaging about indigenous-led collaborative community empowerment.",
    },
    {
      id: 6,
      title: "Calligraphy & Lettering",
      category: "Typography",
      description:
        "Hand-lettered design series for 'Cumbia Chicansombiana' featuring vibrant gradient typography with multiple color variations. This project celebrates Colombian musical culture through expressive brush lettering, demonstrating mastery of script typography, color theory, and cultural design sensitivity.",
      image: "/cumbia-lettering-cyan.png",
      images: [
        "/cumbia-lettering-cyan.png",
        "/cumbia-lettering-green.png",
        "/cumbia-lettering-pink.png",
        "/cumbia-lettering-white.png",
        "/cumbia-lettering-yellow.png",
        "/cumbia-lettering-purple.png",
      ],
      tags: [
        "Hand Lettering",
        "Typography",
        "Colombian Culture",
        "Brush Script",
        "Color Variations",
        "Cultural Design",
      ],
      detailedDescription:
        "This lettering project explores the intersection of Colombian musical heritage and contemporary typography design. Created with traditional brush techniques and modern color theory, the series includes six color variations that each evoke different emotional responses while maintaining the energetic spirit of Cumbia music. Each color variation represents a different mood and cultural expression within the broader Colombian musical landscape.",
    },
  ]

  const skills = [
    { name: "Adobe Creative Suite", level: 95 },
    { name: "Canva & Adobe Express", level: 90 },
    { name: "Brand Identity", level: 88 },
    { name: "UI/UX Design", level: 85 },
    { name: "Typography", level: 92 },
    { name: "Print Design", level: 87 },
  ]

  const handleProjectClick = (project) => {
    if (project.embedUrl) {
      window.open(project.embedUrl, "_blank")
    } else if (project.websiteUrl) {
      window.open(project.websiteUrl, "_blank")
    } else {
      setSelectedProject(project)
      setCurrentImageIndex(0)
    }
  }

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  const getCurrentImage = () => {
    if (selectedProject) {
      if (selectedProject.images && selectedProject.images.length > 0) {
        return selectedProject.images[currentImageIndex]
      }
      return selectedProject.image
    }
    return "/placeholder.svg"
  }

  const hasMultipleImages = selectedProject && selectedProject.images && selectedProject.images.length > 1

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget

    try {
      const result = await emailjs.sendForm(
        "service_pn31v0w", // Your EmailJS service ID
        "template_9xpa19k", // Your EmailJS template ID
        form,
        "B2ctk4MAR2FPgAsj0", // Your EmailJS public key
      )

      console.log("Email sent successfully:", result.text)

      // Reset form
      form.reset()

      // Show success message (you can redirect or show a toast)
      window.location.href = "/?success=true"
    } catch (error) {
      console.error("Failed to send email:", error)
      alert("Failed to send message. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue/10 to-lime-green/10 dark:from-charcoal dark:to-slate-800">
      {/* Success Message */}
      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Image src="/nadie-gana-logo.png" alt="NADIE GANA" width={120} height={40} className="h-8 w-auto" />
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 dark:text-slate-300 hover:text-bright-orange transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="text-slate-600 dark:text-slate-300 hover:text-bright-orange transition-colors"
              >
                About
              </a>
              <a href="#work" className="text-slate-600 dark:text-slate-300 hover:text-bright-orange transition-colors">
                Work
              </a>
              <a
                href="#contact"
                className="text-slate-600 dark:text-slate-300 hover:text-bright-orange transition-colors"
              >
                Contact
              </a>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-sky-blue/20 dark:bg-charcoal/20 text-golden-yellow dark:text-lime-green px-4 py-2 rounded-full text-sm font-medium">
                  <Palette className="w-4 h-4" />
                  <span>Creative Explorer</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                  Creative
                  <span className="block bg-gradient-to-r from-sky-blue to-lime-green bg-clip-text text-transparent">
                    Design
                  </span>
                  Solutions
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg">
                  I craft compelling visual experiences that tell your story and connect with your audience through
                  innovative design.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-blue to-lime-green hover:from-blue-400 hover:to-green-400"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Get In Touch
                </Button>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-blue to-bright-orange rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <Image
                  src="/hero-mountain-road.jpeg"
                  alt="Creative explorer on mountain road"
                  width={500}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-golden-yellow to-bright-orange rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Creative Process</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Always Innovating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Hi there, I'm Nicolas!</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                 a visual designer, storyteller, and creative collaborator.
I work at the intersection of design, community, and cultural transformation. My practice blends graphic design, video, participatory art, and web development often with a focus on projects rooted in social impact, activism, and collective imagination.
Over the past few years, I’ve collaborated with artists, grassroots organizations, and creative teams in Colombia, the U.S., and beyond — designing visual identities, animated pieces, printed matter, and multimedia narratives that aim to move people and spark dialogue.
Whether I’m designing a poster, editing a short film, or building a website, I care about the story behind each project — and about making the process collaborative, intentional, and human.
I'm always exploring how design can act not just as decoration, but as a tool for connection, resistance, and joy.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  My approach combines playful aesthetics with functional design, creating work that's both visually
                  striking and purposeful. Let's create something amazing together!
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-700 rounded-2xl">
                  <Palette className="w-8 h-8 text-bright-orange mx-auto mb-3" />
                  <div className="font-semibold text-slate-900 dark:text-white">Brand Design</div>
                </div>
                <div className="text-center p-6 bg-slate-50 dark:bg-slate-700 rounded-2xl">
                  <Layers className="w-8 h-8 text-bright-orange mx-auto mb-3" />
                  <div className="font-semibold text-slate-900 dark:text-white">UI/UX Design</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Skills & Expertise</h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-900 dark:text-white">{skill.name}</span>
                    <span className="text-slate-600 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-golden-yellow to-bright-orange h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Work</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A selection of my recent projects showcasing various design disciplines and creative solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full"
                        onClick={() => handleProjectClick(project)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {project.embedUrl
                          ? "View Interactive Guide"
                          : project.websiteUrl
                            ? "Visit Live Website"
                            : "View Project Details"}
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-bright-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={getCurrentImage() || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {selectedProject.category}
                  </Badge>

                  {/* Navigation arrows for multiple images */}
                  {hasMultipleImages && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Image counter */}
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail navigation for multiple images */}
                {hasMultipleImages && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-bright-orange"
                            : "border-transparent hover:border-slate-300"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`${selectedProject.title} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    {selectedProject.detailedDescription || selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Let's Work Together</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Ready to bring your vision to life? I'd love to hear about your project and discuss how we can create
                  something amazing together.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sky-blue/20 dark:bg-charcoal/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-bright-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Email</div>
                    <div className="text-slate-600 dark:text-slate-400">nadiegan4@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sky-blue/20 dark:bg-charcoal/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-bright-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Phone</div>
                    <div className="text-slate-600 dark:text-slate-400">+573165516640</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sky-blue/20 dark:bg-charcoal/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-bright-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Location</div>
                    <div className="text-slate-600 dark:text-slate-400">Bogota, Colombia</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/nadie_gana"
                  className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-sky-blue/30 dark:hover:bg-charcoal/30 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Link>
              </div>
            </div>

            <Card className="p-8 shadow-xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">First Name</label>
                    <Input name="from_name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-white">Last Name</label>
                    <Input name="from_lastname" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Email</label>
                  <Input name="from_email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Project Type</label>
                  <select
                    name="project_type"
                    className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option>Brand Identity</option>
                    <option>Web Design</option>
                    <option>Print Design</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-white">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-blue to-lime-green hover:from-blue-400 hover:to-green-400 disabled:opacity-50"
                  size="lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              © 2025 Portfolio. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-bright-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-bright-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
