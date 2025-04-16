import { CheckCircle, Shield, TrendingUp, Zap } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Our Platform</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our blockchain-powered platform offers unique advantages for brands and buyers.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <Shield className="h-10 w-10 text-primary" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                Every batch of excess inventory is verified on-chain, providing immutable proof of authenticity.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <Zap className="h-10 w-10 text-primary" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our AI algorithms match excess inventory with the right buyers, optimizing for price and speed.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <TrendingUp className="h-10 w-10 text-primary" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Market Analytics</h3>
              <p className="text-muted-foreground">
                Access real-time market data and analytics to make informed decisions about your inventory.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <CheckCircle className="h-10 w-10 text-primary" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Easy Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly integrate with your existing inventory management systems through our API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
