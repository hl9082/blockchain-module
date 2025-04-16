import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About VerifiedExcess</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At VerifiedExcess, we're on a mission to transform how brands manage and sell excess inventory. By combining
            AI-powered matching with blockchain verification, we create transparency and trust in the off-price fashion
            marketplace.
          </p>
          <p className="text-lg mb-4">
            Our platform helps brands authenticate their excess stock batches, ensuring buyers can trust the origin and
            authenticity of every product they purchase.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Blockchain Verification</h2>
          <p className="text-lg mb-4">
            Our open-source, on-chain verification module allows brands to authenticate excess stock batches with
            immutable blockchain records. This creates a transparent and verifiable supply chain that benefits both
            brands and buyers.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Brands upload batch data through our admin dashboard</li>
              <li>Data is verified and stored on the blockchain</li>
              <li>Each product receives a "Verified Excess Stock" badge</li>
              <li>Buyers can verify authenticity by checking the blockchain record</li>
            </ol>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <p className="text-lg mb-4">Our platform is built using modern, scalable technologies:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Next.js</li>
                <li>TailwindCSS</li>
                <li>Deployed on Vercel</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Smart Contracts</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Solidity</li>
                <li>Polkadot-compatible EVM</li>
                <li>Moonbeam Network</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Web3 Integration</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Ethers.js</li>
                <li>Polkadot.js</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Backend & Auth</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Supabase</li>
                <li>Serverless Functions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg mb-6">
            Whether you're a brand looking to move excess inventory or a buyer seeking authenticated products, we invite
            you to join our platform and be part of the future of fashion retail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
