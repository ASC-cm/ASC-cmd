"use client";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | ASC-cm</title>
        <meta
          name="description"
          content="ASC-cm's comprehensive Privacy Policy detailing data collection, usage, and protection for our technology services, websites, and digital solutions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-blue-400 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400">
              Effective Date:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              This policy governs data collection, processing, and security for
              all services provided by ASC-cm.
            </p>
          </div>

          <div className="prose prose-xl max-w-none text-gray-300">
            {/* Expanded Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                1. Introduction
              </h2>
              <p className="mb-4">
                ASC-cm (&quot;Company,&quot; &quot;we,&quot; or &quot;us&quot;)
                respects your privacy and is committed to protecting your
                personal data. This Privacy Policy applies to:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>
                  Our primary website (
                  <a
                    href="https://www.asc-cm.com.ng"
                    className="text-blue-400 hover:underline"
                  >
                    asc-cm.com.ng
                  </a>
                  ) and all subdomains
                </li>
                <li>Our web development, hosting, and SEO services</li>
                <li>All client portals and project management systems</li>
                <li>Any mobile applications or tools we provide</li>
              </ul>
              <p>
                By using our services, you consent to the data practices
                described in this policy. We comply with the Nigeria Data
                Protection Regulation (NDPR) and other applicable laws.
              </p>
            </section>

            {/* Detailed Data Collection Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                2. Information We Collect
              </h2>
              <h3 className="text-2xl font-semibold text-gray-200 mt-6 mb-4">
                2.1 Personal Identification Data
              </h3>
              <ul className="list-disc pl-8 space-y-3">
                <li>
                  <strong>Contact Information:</strong> Full name, email
                  address, phone number, physical address
                </li>
                <li>
                  <strong>Business Details:</strong> Company name, job title,
                  tax identification numbers
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details,
                  bank account information (processed securely via PCI-compliant
                  providers)
                </li>
                <li>
                  <strong>Service-Specific Data:</strong> Domain names, hosting
                  credentials, content for website development
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
                2.2 Technical and Usage Data
              </h3>
              <ul className="list-disc pl-8 space-y-3">
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  operating system, device identifiers
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent,
                  clickstream data, error logs
                </li>
                <li>
                  <strong>Location Data:</strong> Approximate geographic
                  location derived from IP address
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
                2.3 Data Collection Methods
              </h3>
              <ul className="list-disc pl-8 space-y-3">
                <li>
                  Directly from you via forms, emails, or service agreements
                </li>
                <li>Automatically through cookies and tracking technologies</li>
                <li>
                  From third parties like payment processors or analytics
                  providers
                </li>
              </ul>
            </section>

            {/* Comprehensive Usage Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                3. How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Service Delivery
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To create and manage your website hosting account</li>
                    <li>
                      To process transactions and send service notifications
                    </li>
                    <li>To provide technical support and troubleshooting</li>
                    <li>
                      To implement SEO strategies as per service agreements
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Business Operations
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To improve our services and develop new features</li>
                    <li>To conduct analytics and market research</li>
                    <li>To prevent fraud and enhance security measures</li>
                    <li>To comply with legal and regulatory requirements</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
                Marketing Communications
              </h3>
              <p>
                We may contact you about promotions, new services, or industry
                updates if you&apos;ve opted in. You can unsubscribe anytime
                using the link in our emails or by contacting us directly.
              </p>
            </section>

            {/* Expanded Data Sharing Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                4. Data Sharing and Disclosure
              </h2>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                4.1 Service Providers
              </h3>
              <p className="mb-4">
                We share data with trusted third parties who assist in
                delivering our services:
              </p>
              <ul className="list-disc pl-8 space-y-3">
                <li>
                  <strong>Hosting Providers:</strong> For website deployment and
                  server management
                </li>
                <li>
                  <strong>Payment Processors:</strong> Such as Paystack,
                  Flutterwave for secure transactions
                </li>
                <li>
                  <strong>Analytics Tools:</strong> Google Analytics, Hotjar for
                  usage analysis
                </li>
                <li>
                  <strong>Marketing Platforms:</strong> Mailchimp for email
                  campaigns (if opted-in)
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
                4.2 Legal Requirements
              </h3>
              <p>
                We may disclose information when required by law, such as in
                response to:
              </p>
              <ul className="list-disc pl-8 space-y-3 mt-3">
                <li>Court orders or legal processes</li>
                <li>Government or regulatory requests</li>
                <li>Investigations of potential violations</li>
                <li>Protection of our rights, property, or safety</li>
              </ul>
            </section>

            {/* Enhanced Security Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                5. Data Security Measures
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Technical Safeguards
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>256-bit SSL encryption for all data transmissions</li>
                    <li>Enterprise-grade firewalls and intrusion detection</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Secure password policies with hashing algorithms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Administrative Controls
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Strict access controls and role-based permissions</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response protocols</li>
                    <li>Regular policy reviews and updates</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6">
                Despite these measures, no system is 100% secure. We encourage
                users to:
              </p>
              <ul className="list-disc pl-8 space-y-3 mt-3">
                <li>Use strong, unique passwords</li>
                <li>Enable two-factor authentication where available</li>
                <li>Keep their devices and software updated</li>
                <li>Report suspicious activity immediately</li>
              </ul>
            </section>

            {/* Comprehensive User Rights Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                6. Your Data Protection Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Access and Control
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Right to Access:</strong> Request copies of your
                      personal data
                    </li>
                    <li>
                      <strong>Right to Rectification:</strong> Correct
                      inaccurate information
                    </li>
                    <li>
                      <strong>Right to Erasure:</strong> Request deletion under
                      certain conditions
                    </li>
                    <li>
                      <strong>Right to Restriction:</strong> Limit processing of
                      your data
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Additional Rights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Right to Object:</strong> Opt out of processing
                      for direct marketing
                    </li>
                    <li>
                      <strong>Right to Portability:</strong> Receive your data
                      in a structured format
                    </li>
                    <li>
                      <strong>Right to Withdraw Consent:</strong> Revoke
                      permissions at any time
                    </li>
                    <li>
                      <strong>Right to Complain:</strong> Lodge complaints with
                      regulatory authorities
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-6">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:contact@asc-cm.com.ng"
                  className="text-blue-400 hover:underline"
                >
                  privacy@asc-cm.com
                </a>
                . We may require identity verification for security purposes.
              </p>
            </section>

            {/* Detailed Cookie Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                7. Cookie Policy
              </h2>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                7.1 Types of Cookies Used
              </h3>
              <table className="min-w-full border border-gray-700 mt-4 mb-6">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="py-3 px-4 text-left">Cookie Type</th>
                    <th className="py-3 px-4 text-left">Purpose</th>
                    <th className="py-3 px-4 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 px-4">Essential Cookies</td>
                    <td className="py-3 px-4">
                      Enable core functionality (e.g., login, shopping cart)
                    </td>
                    <td className="py-3 px-4">Session</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 px-4">Performance Cookies</td>
                    <td className="py-3 px-4">
                      Collect analytics on site usage
                    </td>
                    <td className="py-3 px-4">1-2 years</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 px-4">Functional Cookies</td>
                    <td className="py-3 px-4">
                      Remember preferences (e.g., language, region)
                    </td>
                    <td className="py-3 px-4">Up to 1 year</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-3 px-4">Targeting Cookies</td>
                    <td className="py-3 px-4">
                      Used for advertising (if applicable)
                    </td>
                    <td className="py-3 px-4">Up to 1 year</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
                7.2 Managing Cookies
              </h3>
              <p>You can control cookies through:</p>
              <ul className="list-disc pl-8 space-y-3 mt-3">
                <li>
                  Browser settings (usually found in Privacy or Security
                  sections)
                </li>
                <li>Our cookie consent banner (if implemented)</li>
                <li>
                  Third-party opt-out tools like the Digital Advertising
                  Alliance
                </li>
              </ul>
              <p className="mt-4">
                Disabling essential cookies may impair website functionality.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                8. International Data Transfers
              </h2>
              <p>
                As a global service provider, your data may be processed outside
                Nigeria, including in:
              </p>
              <ul className="list-disc pl-8 space-y-3 mt-3">
                <li>The United States (for hosting and analytics services)</li>
                <li>
                  The European Union (for client projects when applicable)
                </li>
                <li>Other jurisdictions where our partners operate</li>
              </ul>
              <p className="mt-4">
                We ensure all international transfers comply with applicable
                laws and implement safeguards like Standard Contractual Clauses
                (SCCs) where required.
              </p>
            </section>

            {/* Policy Updates */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                9. Policy Updates
              </h2>
              <p>We may update this policy to reflect:</p>
              <ul className="list-disc pl-8 space-y-3 mt-3">
                <li>Changes in our services or business practices</li>
                <li>New legal or regulatory requirements</li>
                <li>Technological developments</li>
              </ul>
              <p className="mt-4">
                Material changes will be communicated via email or prominent
                website notices at least 30 days before taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                10. Contact Us
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    Data Protection Officer
                  </h3>
                  <address className="not-italic">
                    ASC-cm
                    <br />
                    Jubilee School Road,Uyo
                    <br />
                    Akwa Ibom, Nigeria
                    <br />
                    Email:{" "}
                    <a
                      href="mailto:contact@asc-cm.com.ng"
                      className="text-blue-400 hover:underline"
                    >
                      contact@asc-cm.com.ng
                    </a>
                    <br />
                    Phone: +234 7034418309
                  </address>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                    General Inquiries
                  </h3>
                  <address className="not-italic">
                    Email:{" "}
                    <a
                      href="mailto:contact@asc-cm.com.ng"
                      className="text-blue-400 hover:underline"
                    >
                      contact@asc-cm.com.ng
                    </a>
                    <br />
                    Support:{" "}
                    <a
                      href="mailto:contact@asc-cm.com.ng"
                      className="text-blue-400 hover:underline"
                    >
                      support@asc-cm.com.ng
                    </a>
                  </address>
                  <p className="mt-4">
                    For urgent security issues:{" "}
                    <a
                      href="mailto:contact@asc-cm.com.ng"
                      className="text-blue-400 hover:underline"
                    >
                      security@asc-cm.com.ng
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
