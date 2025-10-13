import { Heading, Text } from '@/components/ui/Typography'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function About() {
  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      description: '10+ years in software development and digital transformation.',
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      description: 'Former tech lead at major cloud platforms, AI/ML expert.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Design',
      description: 'Award-winning designer with focus on user experience.',
    },
  ]

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <Heading level={1} className="mb-6">
            About ARKIV
          </Heading>
          <Text size="xl" color="secondary" className="max-w-3xl mx-auto">
            We're on a mission to democratize advanced technology and make enterprise-grade
            solutions accessible to businesses of all sizes.
          </Text>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} className="mb-8 text-center">
              Our Story
            </Heading>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Text size="lg" color="secondary" className="mb-6">
                  Founded in 2020, ARKIV emerged from a simple observation: while technology was
                  advancing rapidly, many businesses struggled to keep up with the complexity of
                  modern digital solutions.
                </Text>
                <Text size="lg" color="secondary" className="mb-6">
                  We set out to bridge this gap by creating a platform that combines enterprise-grade
                  capabilities with unprecedented ease of use.
                </Text>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl">
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-neutral-600">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-neutral-600">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-neutral-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              Our Values
            </Heading>
            <Text size="lg" color="secondary" className="max-w-2xl mx-auto">
              The principles that guide everything we do.
            </Text>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'We constantly push the boundaries of what\'s possible, staying ahead of technological trends.',
              },
              {
                title: 'Simplicity',
                description: 'Complex problems deserve simple solutions. We make advanced technology accessible.',
              },
              {
                title: 'Reliability',
                description: 'Your business depends on us. We deliver consistent, dependable solutions.',
              },
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <Heading level={3} size="lg" className="mb-4">
                    {value.title}
                  </Heading>
                  <Text color="secondary">
                    {value.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              Meet Our Team
            </Heading>
            <Text size="lg" color="secondary" className="max-w-2xl mx-auto">
              The talented individuals behind ARKIV's success.
            </Text>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-6"></div>
                  <Heading level={3} size="lg" className="mb-2">
                    {member.name}
                  </Heading>
                  <Text color="primary" className="font-medium mb-4">
                    {member.role}
                  </Text>
                  <Text color="secondary">
                    {member.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <Heading level={2} className="mb-6 text-white">
            Ready to Work Together?
          </Heading>
          <Text size="lg" className="mb-8 max-w-2xl mx-auto text-primary-100">
            Let's discuss how ARKIV can help transform your business.
          </Text>
          <Button variant="secondary" size="lg">
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  )
}