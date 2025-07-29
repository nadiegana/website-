import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground">
            <p><strong>Effective Date:</strong> Jul 2025</p>

            <p>
              This Privacy Policy describes how your information is collected, used, and shared when you visit or interact with
              <a href="https://nicolassaenzdesign.com" target="_blank" rel="noopener noreferrer" className="text-primary-orange hover:underline"> nicolassaenzdesign.com</a>
              (the "Site").
            </p>

            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>We may collect limited information, including:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Basic usage data (such as pages visited, time spent, browser type, and device info)</li>
              <li>Information you provide directly (for example, through a contact form or email)</li>
              <li>Cookies or similar technologies for analytics purposes</li>
            </ul>

            <h2 className="text-xl font-semibold">2. How We Use the Information</h2>
            <p>
              The information collected is used to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Understand how visitors use the Site</li>
              <li>Improve the content, design, and functionality of the Site</li>
              <li>Respond to inquiries or messages submitted via the contact form</li>
            </ul>

            <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal data. Your information may be shared with service providers
              (e.g., analytics platforms) solely for the purposes described above and only to the extent necessary.
            </p>

            <h2 className="text-xl font-semibold">4. Cookies</h2>
            <p>
              The Site may use cookies or similar technologies to analyze traffic and improve user experience. You can disable cookies in your browser settings at any time.
            </p>

            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p>
              If you are located in the EU or other regions with data protection laws, you may have the right to request access, correction, or deletion of your personal information.
            </p>

            <h2 className="text-xl font-semibold">6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold">7. Third-Party Links</h2>
            <p>
              This Site may contain links to other websites. We are not responsible for the privacy practices of those sites and encourage you to read their policies.
            </p>

            <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes will be posted on this page with an updated effective date.
            </p>

            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact: <br />
              <strong>Email:</strong> <a href="mailto:nadiegan4@gmail.com" className="text-primary-orange hover:underline">nadiegan4@gmail.com</a>
            </p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-primary-orange hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
