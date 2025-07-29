"use server"

import { redirect } from "next/navigation"

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const projectType = formData.get("projectType") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    throw new Error("Please fill in all required fields.")
  }

  // For now, we'll just log the data
  console.log("Contact form submission:", {
    firstName,
    lastName,
    email,
    projectType,
    message,
  })

  // Access environment variables without NEXT_PUBLIC_ prefix
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY // This is your user_id in EmailJS API

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS environment variables are not set correctly on the server.")
    // In a production app, you might throw an error or handle this gracefully
  } else {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey, // EmailJS uses user_id for the public key in direct API calls
          template_params: {
            from_name: `${firstName} ${lastName}`,
            from_email: email,
            project_type: projectType,
            message: message,
            to_name: "Nicolas Saenz", // Your name
            to_email: "nadiegan4@gmail.com", // Your email
          },
        }),
      })

      if (response.ok) {
        console.log("Email sent successfully via server-side fetch!")
      } else {
        const errorData = await response.json()
        console.error("Failed to send email via server-side fetch:", response.status, errorData)
        // You might want to throw an error here to indicate failure to the client
      }
    } catch (error) {
      console.error("Error sending email via server-side fetch:", error)
    }
  }

  redirect("/?success=true")
}
