import {groq} from 'next-sanity'

// Reusable SEO fragment — resolves Sanity image asset URLs inline
export const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    noIndex,
    noFollow,
    ogTitle,
    ogDescription,
    "ogImageUrl": ogImage.asset->url,
    ogImageAlt,
    twitterTitle,
    twitterDescription,
    "twitterImageUrl": twitterImage.asset->url,
    twitterCard
  }
`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName, logoText, metaTitle, metaDescription,
  favicon, "resumeUrl": resumeFile.asset->url, navLabels,
  _updatedAt,
  ${seoFragment}
}`


export const heroQuery = groq`*[_type == "hero"][0]{
  greeting, name, roles, tagline, profileImage,
  primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, stats
}`

export const aboutQuery = groq`*[_type == "about"][0]{
  heading, bio, image, highlights, yearsExperience, location, availableForWork
}`

export const skillsQuery = groq`*[_type == "skill"] | order(order asc){
  _id, name, category, icon, proficiency, order
}`

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id, title, slug, coverImage, gallery, shortDescription, description,
  techStack, liveUrl, githubUrl, featured, category, year
}`

export const experienceQuery = groq`*[_type == "experience"] | order(order asc){
  _id, role, company, companyUrl, companyLogo, location,
  startDate, endDate, current, description
}`

export const educationQuery = groq`*[_type == "education"] | order(order asc){
  _id, degree, institution, logo, startYear, endYear, description
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, description, icon
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, quote, authorName, authorRole, authorImage
}`

export const socialLinksQuery = groq`*[_type == "socialLink"] | order(order asc){
  _id, platform, url
}`

export const contactQuery = groq`*[_type == "contact"][0]{
  heading, subheading, email, phone, location, formEndpoint
}`
