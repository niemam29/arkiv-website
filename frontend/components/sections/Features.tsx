import { Card, CardContent } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/Typography'

interface Feature {
  id: string
  icon?: React.ReactNode
  title: string
  description: string
  benefits?: string[]
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features: Feature[]
  layout?: 'grid' | 'list'
  columns?: 2 | 3 | 4
}

export default function Features({ title, subtitle, features, layout = 'grid', columns = 3 }: FeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {subtitle && (
              <Text size="lg" color="secondary" className="mb-4 font-medium">
                {subtitle}
              </Text>
            )}
            {title && (
              <Heading level={2} className="mb-6">
                {title}
              </Heading>
            )}
          </div>
        )}

        {/* Features Grid/List */}
        {layout === 'grid' ? (
          <div className={`grid gap-8 ${gridCols[columns]}`}>
            {features.map((feature) => (
              <Card key={feature.id} className="text-center hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Icon */}
                  {feature.icon && (
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <Heading level={3} size="lg" className="mb-4">
                    {feature.title}
                  </Heading>

                  {/* Description */}
                  <Text color="secondary" className="mb-6">
                    {feature.description}
                  </Text>

                  {/* Benefits List */}
                  {feature.benefits && (
                    <ul className="text-left space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <Text size="sm" color="secondary">
                            {benefit}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
              >
                {/* Content */}
                <div className="flex-1">
                  <Heading level={3} size="xl" className="mb-4">
                    {feature.title}
                  </Heading>
                  <Text size="lg" color="secondary" className="mb-6">
                    {feature.description}
                  </Text>
                  {feature.benefits && (
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <svg className="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <Text color="secondary">{benefit}</Text>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Icon/Image */}
                <div className="flex-1 flex justify-center">
                  <Card className="p-12">
                    <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center">{feature.icon}</div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
