import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our blockchain verification process is simple, secure, and transparent.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Upload Inventory</h3>
              <p className="text-muted-foreground">
                Brands upload their excess inventory data through our admin dashboard.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                Our system verifies the inventory data and stores it on the blockchain.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Connect with Buyers</h3>
              <p className="text-muted-foreground">
                Verified inventory is made available to buyers on our marketplace.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 text-primary">
            <span className="font-medium">Learn more about our verification process</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
