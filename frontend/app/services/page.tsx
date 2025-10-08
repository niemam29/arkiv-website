import { Heading, Text } from '@/components/ui/Typography'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks and best practices.',
      features: ['React/Next.js Applications', 'Progressive Web Apps (PWA)', 'E-commerce Solutions', 'API Development'],
      pricing: 'Starting at $5,000'
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android.',
      features: ['React Native Apps', 'iOS & Android Native', 'App Store Optimization', 'Push Notifications'],
      pricing: 'Starting at $8,000'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and DevOps implementations.',
      features: ['AWS/Azure/GCP Setup', 'CI/CD Pipelines', 'Container Orchestration', 'Monitoring & Logging'],
      pricing: 'Starting at $3,000'
    },
    {
      title: 'Digital Transformation',
      description: 'Complete business digitalization and process automation.',
      features: ['Process Analysis', 'Custom Software Solutions', 'Integration Services', 'Training & Support'],
      pricing: 'Custom Quote'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design for web and mobile applications.',
      features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing'],
      pricing: 'Starting at $2,500'
    },
    {
      title: 'Consulting',
      description: 'Strategic technology consulting and architecture review.',
      features: ['Technology Assessment', 'Architecture Planning', 'Performance Optimization', 'Security Audit'],
      pricing: 'Starting at $200/hour'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We analyze your requirements and define project scope.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Create detailed project roadmap and technical specifications.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Build your solution using agile methodology with regular updates.'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Deploy, test, and hand over your completed project.'
    }
  ]

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <Heading level={1} className="mb-6">
            Our Services
          </Heading>
          <Text size="xl" color="secondary" className="max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs. From concept to deployment, we've got you covered.
          </Text>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text color="secondary" className="mb-6">
                    {service.description}
                  </Text>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <Text size="sm" color="secondary">
                          {feature}
                        </Text>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-4">
                    <Text weight="semibold" className="mb-4">
                      {service.pricing}
                    </Text>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              Our Process
            </Heading>
            <Text size="lg" color="secondary" className="max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery.
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <Heading level={3} size="lg" className="mb-4">
                  {phase.title}
                </Heading>
                <Text color="secondary">{phase.description}</Text>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-neutral-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <Heading level={2} className="mb-6 text-white">
            Ready to Get Started?
          </Heading>
          <Text size="lg" className="mb-8 max-w-2xl mx-auto text-primary-100">
            Let's discuss your project and find the perfect solution for your needs.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Get Free Quote
            </Button>
            <button className="border border-primary-300 text-white hover:bg-primary-600 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
