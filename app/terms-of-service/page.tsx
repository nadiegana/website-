import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
              This is a placeholder for your Terms of Service. A Terms of Service agreement is the legal agreement
              between a service provider and a person who wants to use that service. The person must agree to abide by
              the terms of service in order to use the offered service.
            </p>
            <p>
              You should replace this text with your own terms. It's highly recommended to consult with a legal
              professional to draft this document.
            </p>
            <div>Key sections often include:</div>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Acceptance of Terms.</li>
              <li>Description of Service.</li>
              <li>User Responsibilities and Conduct.</li>
              <li>Intellectual Property Rights.</li>
              <li>Termination of Use.</li>
              <li>Disclaimer of Warranties and Limitation of Liability.</li>
              <li>Governing Law.</li>
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
