import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/Typography'

interface HeroProps {
  title: string
  subtitle: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage
}: HeroProps) {
  return (
    <section className="relative hero-gradient min-h-screen flex items-center">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <Text size="lg" color="secondary" className="mb-4 font-medium">
            {subtitle}
          </Text>

          {/* Main Title */}
          <Heading level={1} className="mb-6">
            {title}
          </Heading>

          {/* Description */}
          <Text size="xl" color="secondary" className="mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-4"
            >
              {primaryCTA.text}
            </Button>

            {secondaryCTA && (
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                {secondaryCTA.text}
              </Button>
            )}
          </div>

          {/* Optional scroll indicator */}
          <div className="mt-16">
            <div className="w-6 h-10 border-2 border-neutral-300 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}