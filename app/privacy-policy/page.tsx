import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
              This is a placeholder for your Privacy Policy. A Privacy Policy is a statement or a legal document that
              states how a company or website collects, handles and processes data of its customers and visitors. It
              explicitly describes whether that information is kept confidential, or is shared with or sold to third
              parties.
            </p>
            <p>
              You should replace this text with your own policy. It's recommended to consult with a legal professional
              to ensure your policy is compliant with all applicable laws and regulations, such as GDPR, CCPA, etc.
            </p>
            <div>Typically, a privacy policy will include information about:</div>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>What information is collected (e.g., personal data, usage data).</li>
              <li>How and why the information is collected.</li>
              <li>How the information is used, stored, and protected.</li>
              <li>Any third parties with whom the data is shared.</li>
              <li>Users' rights regarding their data (e.g., access, correction, deletion).</li>
              <li>Use of cookies and other tracking technologies.</li>
              <li>Contact information for privacy-related inquiries.</li>
            </ul>
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
