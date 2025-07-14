"use server"

import { redirect } from "next/navigation"

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const projectType = formData.get("projectType") as string
  const message = formData.get("message") as string

  // You can add validation here
  if (!firstName || !lastName || !email || !message) {
    throw new Error("Please fill in all required fields")
  }

  // For now, we'll just log the data
  // In production, you'd send this to your email service
  console.log("Contact form submission:", {
    firstName,
    lastName,
    email,
    projectType,
    message,
  })

  // Redirect to a thank you page or back to contact with success message
  redirect("/?success=true")
}
