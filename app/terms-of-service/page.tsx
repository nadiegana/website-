import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-muted-foreground">
            <p><strong>Effective Date:</strong> Jul 2025</p>

            <p>
              Welcome to the portfolio website of Nicolás Saenz Silva (the "Site"). By accessing or using this website (nicolassaenzdesign.com),
              you agree to be bound by these Terms of Service and the accompanying Privacy Policy. If you do not agree to these terms,
              please do not use the Site.
            </p>

            <h2 className="text-xl font-semibold">1. Use of the Site</h2>
            <p>
              You are welcome to explore this Site for personal, non-commercial purposes. You may view, download, or print content
              for informational use only and not for distribution or modification.
            </p>

            <h2 className="text-xl font-semibold">2. Intellectual Property</h2>
            <p>
              All content on this Site—including text, images, designs, logos, artwork, and code—is the property of Nicolás Saenz Silva
              or is used with permission. You may not reproduce, distribute, modify, or use any materials without express written consent.
            </p>

            <h2 className="text-xl font-semibold">3. Project Showcasing</h2>
            <p>
              This Site includes examples of past work for clients and collaborators. All logos, brand names, and trademarks are the property
              of their respective owners. Their inclusion does not imply endorsement or official partnership unless explicitly stated.
            </p>

            <h2 className="text-xl font-semibold">4. User Conduct</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use it for unlawful, harmful, or fraudulent purposes</li>
              <li>Attempt to gain unauthorized access to the Site or related systems</li>
              <li>Introduce viruses, malware, or other malicious code</li>
            </ul>

            <h2 className="text-xl font-semibold">5. Third-Party Links</h2>
            <p>
              This Site may contain links to external websites. These are provided for reference only. Nicolás Saenz Silva is not responsible
              for the content, privacy policies, or practices of any third-party sites.
            </p>

            <h2 className="text-xl font-semibold">6. Disclaimer</h2>
            <p>
              The Site and its content are provided "as is" without warranties of any kind. Nicolás Saenz Silva makes no guarantees regarding
              accuracy, completeness, or uninterrupted access to the Site.
            </p>

            <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Nicolás Saenz Silva shall not be liable for any damages arising from your use or inability
              to use the Site, including but not limited to indirect or consequential damages.
            </p>

            <h2 className="text-xl font-semibold">8. Modifications</h2>
            <p>
              These Terms of Service may be updated at any time without prior notice. Continued use of the Site constitutes your acceptance
              of any changes made.
            </p>

            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact:
              <br />
              <strong>Email:</strong> <a href="mailto:nadiegan4@gmail.com" className="text-primary-orange hover:underline">nadiegan4@gmail.com</a>
              <br />
              <strong>Website:</strong> <a href="https://nicolassaenzdesign.com" className="text-primary-orange hover:underline" target="_blank">nicolassaenzdesign.com</a>
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
