// canonical social media links for NUS SoC AI Society.
// this is the single source of truth — update links here only.

export interface SocialLink {
  readonly href: string;
  readonly label: string;
}

export const SOCIAL_LINKS = {
  telegramDiscussion: {
    href: "https://t.me/+iOXKIVLSYcw5OTA1",
    label: "Telegram Discussion",
  },
  telegramAlerts: {
    href: "https://t.me/nusaisociety",
    label: "Telegram Alerts",
  },
  discord: {
    href: "https://discord.com/invite/yazkAEsjww",
    label: "Discord",
  },
  linkedin: {
    href: "https://www.linkedin.com/company/nus-computing-ai-society/",
    label: "LinkedIn",
  },
  github: {
    href: "https://github.com/nus-soc-aisoc",
    label: "GitHub",
  },
  twitter: {
    href: "https://x.com/socaisociety",
    label: "X / Twitter",
  },
  email: {
    href: "mailto:contact@nusaisociety.org",
    label: "Email",
  },
  huggingFace: {
    href: "https://huggingface.co/socaisociety",
    label: "Hugging Face",
  },
} as const satisfies Record<string, SocialLink>;
