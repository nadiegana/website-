"use server"

import { redirect } from "next/navigation"

export async function submitContactForm(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const projectType = formData.get("projectType") as string // Now correctly extracted from the form
  const message = formData.get("message") as string

  // Basic validation
  if (!firstName || !lastName || !email || !projectType || !message) {
    console.error("Validation Error: Missing required fields.")
    return { success: false, error: "Please fill in all required fields." }
  }

  console.log("Attempting to send contact form:", {
    firstName,
    lastName,
    email,
    projectType,
    message,
  })

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY // This is your user_id in EmailJS API

  if (!serviceId || !templateId || !publicKey) {
    console.error(
      "EmailJS Environment Variables Error: One or more EmailJS environment variables are not set correctly on the server.",
    )
    return { success: false, error: "Server configuration error. Please try again later." }
  } else {
    try {
      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          project_type: projectType,
          message: message,
          to_name: "Nicolas Saenz", // Your name
          to_email: "nadiegan4@gmail.com", // Your email
        },
      }
      console.log("Sending payload to EmailJS:", JSON.stringify(payload, null, 2))

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        console.log("Email sent successfully via server-side fetch!")
        redirect("/?success=true") // Redirect on success
      } else {
        const errorText = await response.text() // Get raw error text for more detail
        console.error(`Failed to send email via server-side fetch: Status ${response.status}, Response: ${errorText}`)
        return { success: false, error: `Failed to send message: ${errorText}` }
      }
    } catch (error: any) {
      console.error("Error sending email via server-side fetch:", error.message || error)
      return { success: false, error: `An unexpected error occurred: ${error.message || "Unknown error"}` }
    }
  }
}
