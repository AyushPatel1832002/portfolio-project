import {FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiMail, FiExternalLink} from 'react-icons/fi'

type Social = {_id: string; platform?: string; url?: string}

const ICONS: Record<string, any> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  instagram: FiInstagram,
  youtube: FiYoutube,
  email: FiMail,
  other: FiExternalLink,
}

const FALLBACK_SOCIALS = [
  {key: 'github', icon: FiGithub, url: 'https://github.com/AyushPatel1832002', label: "View Aayush Patel's GitHub profile"},
  {key: 'linkedin', icon: FiLinkedin, url: 'https://www.linkedin.com/in/ayush-patel-50674224b/', label: 'Connect with Aayush Patel on LinkedIn'},
]

export default function Footer({siteName, socials}: {siteName?: string; socials: Social[]}) {
  const cmsLinks = socials || []
  const cmsPlatforms = new Set(cmsLinks.map((s) => s.platform?.toLowerCase()))

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteName || 'Portfolio'}. Built with Next.js &amp; Sanity.
        </p>
        <div className="flex gap-5">
          {/* Render CMS social links */}
          {cmsLinks.map((s) => {
            const Icon = ICONS[(s.platform || '').toLowerCase()]
            if (!Icon) return null
            return (
              <a
                key={s._id}
                href={s.platform === 'email' ? `mailto:${s.url}` : s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Aayush Patel on ${s.platform}`}
                className="text-muted transition-colors hover:text-teal"
              >
                <Icon size={20} />
              </a>
            )
          })}
          {/* Fallback icons for GitHub, LinkedIn, Twitter if not in CMS */}
          {FALLBACK_SOCIALS.filter((f) => !cmsPlatforms.has(f.key)).map((f) => (
            <a
              key={f.key}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.label}
              className="text-muted transition-colors hover:text-teal"
            >
              <f.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
