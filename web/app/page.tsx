import {client} from '@/sanity/client'
import {
  siteSettingsQuery,
  heroQuery,
  aboutQuery,
  skillsQuery,
  projectsQuery,
  experienceQuery,
  educationQuery,
  servicesQuery,
  testimonialsQuery,
  socialLinksQuery,
  contactQuery,
} from '@/sanity/queries'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CursorSpotlight from '@/components/CursorSpotlight'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const [settings, hero, about, skills, projects, experience, education, services, testimonials, socials, contact] =
    await Promise.all([
      client.fetch(siteSettingsQuery, {}, {cache: 'no-store'}).catch(() => null),
      client.fetch(heroQuery, {}, {cache: 'no-store'}).catch(() => null),
      client.fetch(aboutQuery, {}, {cache: 'no-store'}).catch(() => null),
      client.fetch(skillsQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(projectsQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(experienceQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(educationQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(servicesQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(testimonialsQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(socialLinksQuery, {}, {cache: 'no-store'}).catch(() => []),
      client.fetch(contactQuery, {}, {cache: 'no-store'}).catch(() => null),
    ])

  return (
    <main className="relative">
      <CursorSpotlight />
      <Nav logoText={settings?.logoText} labels={settings?.navLabels} />
      <Hero {...hero} resumeUrl={settings?.resumeUrl} />
      <About {...about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <Contact {...contact} />
      <Footer siteName={settings?.siteName} socials={socials} />
    </main>
  )
}
