import type {
  BlogPostSummary,
  Faq,
  PortfolioProject,
  ProcessStep,
  Service,
  Stat,
  Technology,
  Testimonial,
} from "@aadhya/types";

/**
 * Real Aadhya Infotech content, sourced from the live site (aadhya-infotech.com).
 * This is the single source of truth for the homepage today and becomes the Payload
 * seed in W5. Placeholder values (stats, testimonials) are flagged — replace via CMS.
 *
 * `icon` values are lucide-react icon names, mapped to components at render time.
 */

export const heroContent = {
  eyebrow: "Welcome to Aadhya Infotech",
  headline: "We Craft Software Masterpieces.",
  subhead:
    "A software company providing app, game and web development, design, cloud, security and digital solutions — engineered to help your business grow.",
  primaryCta: { label: "Let's Connect", href: "/contact" },
  secondaryCta: { label: "View our work", href: "/portfolio" },
  marquee: ["App Development", "Game Development", "UI/UX Design", "Digital Marketing", "Cloud"],
};

export const aboutContent = {
  eyebrow: "About our company",
  title: "Software, designed and engineered to move your business forward.",
  body: [
    "Aadhya Infotech specializes in the design, development and distribution of software products and services. We create applications, systems and solutions that address real needs across industries.",
    "We leverage modern technology to solve problems, enhance productivity and drive innovation — partnering with clients from the first idea through to a confident launch and beyond.",
  ],
  highlights: [
    "Full-cycle product engineering",
    "Design-led, user-first thinking",
    "Reliable delivery & support",
  ],
};

export const services: Service[] = [
  {
    slug: "app-development",
    title: "App Development",
    description:
      "Custom mobile app development tailored to your business needs — native and cross-platform apps for iOS and Android, from concept to launch.",
    icon: "smartphone",
    features: ["iOS & Android", "Flutter & React Native", "App Store launch"],
  },
  {
    slug: "game-development",
    title: "Game Development",
    description:
      "End-to-end game development creating immersive, engaging experiences across mobile, PC and console platforms.",
    icon: "gamepad-2",
    features: ["2D & 3D games", "Unity & Unreal", "Cross-platform"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Dynamic, responsive and high-performing websites and web applications built on modern, scalable foundations.",
    icon: "globe",
    features: ["Next.js & React", "Scalable backends", "SEO-ready"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User-centric interface and experience design that turns complex products into intuitive, delightful journeys.",
    icon: "palette",
    features: ["Product design", "Design systems", "Prototyping"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    description:
      "Security assessments, hardening and monitoring to keep your applications, data and customers protected.",
    icon: "shield-check",
    features: ["Audits & pen-testing", "Hardening", "Monitoring"],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    description:
      "Cloud architecture, migration and DevOps to scale your product reliably, securely and cost-effectively.",
    icon: "cloud",
    features: ["Architecture", "Migration", "DevOps & CI/CD"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery & Consultation",
    description:
      "We understand your goals, challenges and requirements through initial meetings and consultations.",
    icon: "search",
  },
  {
    step: 2,
    title: "Design & Architecture",
    description:
      "We craft a user-centric design and a solid technical architecture for your interfaces and systems.",
    icon: "pen-tool",
  },
  {
    step: 3,
    title: "Development",
    description:
      "Our engineers build your solution with clean, scalable and well-tested code — with progress you can see.",
    icon: "code-2",
  },
  {
    step: 4,
    title: "Documentation & Launch",
    description:
      "We document, deploy and support your product through a smooth, confident launch and beyond.",
    icon: "rocket",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "whatsapp-status-saver",
    title: "WhatsApp Status Saver",
    category: "App Development",
    description: "An Android app to save and re-share WhatsApp statuses effortlessly.",
    technologies: ["Android", "Kotlin"],
    image: {
      url: "/portfolio/whatsapp-status-saver.svg",
      alt: "WhatsApp Status Saver app screens",
    },
  },
  {
    slug: "daily-quotes",
    title: "Daily Quotes",
    category: "App Development",
    description: "A daily quotes application delivering fresh motivation every day.",
    technologies: ["Android", "Flutter"],
    image: { url: "/portfolio/daily-quotes.svg", alt: "Daily Quotes app screens" },
  },
  {
    slug: "calculator-tape",
    title: "Calculator — Tape to Calculate",
    category: "App Development",
    description: "A smart calculator app with tape history to review every calculation.",
    technologies: ["Android"],
    image: {
      url: "/portfolio/calculator-tape.svg",
      alt: "Calculator — Tape to Calculate app screens",
    },
  },
  // --- Game Development ---
  {
    slug: "accubow",
    title: "AccuBow",
    category: "Game Development",
    description:
      "An immersive archery hunting game with realistic bow mechanics and multiple modes.",
    technologies: ["Unity", "C#"],
    image: { url: "/portfolio/accubow.webp", alt: "AccuBow archery game" },
  },
  {
    slug: "zombie-shooter",
    title: "Zombie Shooter",
    category: "Game Development",
    description:
      "A fast-paced survival shooter — hold back relentless waves of zombies across intense levels.",
    technologies: ["Unity", "C#"],
    image: { url: "/portfolio/zombie-shooter.webp", alt: "Zombie Shooter game" },
  },
  {
    slug: "highway-traffic-rider",
    title: "Highway Traffic Rider",
    category: "Game Development",
    description: "An endless racing game weaving through highway traffic at high speed.",
    technologies: ["Unity", "C#"],
    image: { url: "/portfolio/highway-traffic-rider.webp", alt: "Highway Traffic Rider game" },
  },
  // --- Website Development ---
  {
    slug: "gift-shop",
    title: "Gift Shop",
    category: "Website Development",
    description:
      "A warm e-commerce storefront for curated gifts, built for an effortless shopping flow.",
    technologies: ["React", "Node.js"],
    image: { url: "/portfolio/gift-shop.jpg", alt: "Gift Shop e-commerce website" },
    href: "https://shop-gift.netlify.app",
  },
  {
    slug: "vedarch-design",
    title: "Vedarch Design",
    category: "Website Development",
    description: "A refined portfolio site for an architecture and interior-design studio.",
    technologies: ["React", "Tailwind"],
    image: { url: "/portfolio/vedarch.jpg", alt: "Vedarch Design architecture website" },
    href: "https://vedartharchitech.netlify.app",
  },
  {
    slug: "asal-masala",
    title: "Asal Masala",
    category: "Website Development",
    description:
      "A flavourful brand site for a premium spice company, rich with taste and character.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: { url: "/portfolio/asal-masala.jpg", alt: "Asal Masala spice brand website" },
    href: "https://effulgent-bonbon-a558df.netlify.app",
  },
];

export const technologies: Technology[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "Flutter", category: "mobile" },
  { name: "React Native", category: "mobile" },
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "cloud" },
];

/**
 * Placeholder statistics — the live site shows 0+ everywhere. Replace with real
 * numbers via the CMS before launch.
 */
export const stats: Stat[] = [
  { id: "clients", label: "Happy clients", value: 50, suffix: "+" },
  { id: "experts", label: "Expert engineers", value: 15, suffix: "+" },
  { id: "projects", label: "Projects delivered", value: 80, suffix: "+" },
  { id: "satisfaction", label: "Client satisfaction", value: 98, suffix: "%" },
];

/**
 * Placeholder testimonials — the live site uses lorem ipsum. Replace with real
 * client quotes via the CMS.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Mehta",
    role: "Founder",
    company: "Retail Startup",
    quote:
      "Aadhya Infotech turned our idea into a polished app faster than we imagined. Communication was clear and the quality exceeded our expectations.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Arjun Desai",
    role: "Product Manager",
    company: "FinTech Company",
    quote:
      "Their engineering team is thorough and reliable. The web platform they built for us is fast, secure and easy to maintain.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Neha Shah",
    role: "Marketing Head",
    company: "D2C Brand",
    quote:
      "From design to launch, the process was smooth and collaborative. Our new site looks premium and converts noticeably better.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "What services does Aadhya Infotech offer?",
    answer:
      "We offer mobile app development, game development, web development, UI/UX design, cyber security and cloud services — plus digital marketing to help your product grow.",
  },
  {
    id: "f2",
    question: "How does a typical project work?",
    answer:
      "We follow four phases: Discovery & Consultation, Design & Architecture, Development, and Documentation & Launch. You stay in the loop at every step.",
  },
  {
    id: "f3",
    question: "Which technologies do you work with?",
    answer:
      "We build with modern stacks including React, Next.js, TypeScript, Vue, Angular, Node.js, Flutter and React Native, deployed on cloud platforms like AWS with Docker and CI/CD.",
  },
  {
    id: "f4",
    question: "Do you work with startups and established businesses?",
    answer:
      "Yes. We partner with early-stage startups and established companies alike, tailoring our engagement to your goals, timeline and budget.",
  },
  {
    id: "f5",
    question: "How can I get a project estimate?",
    answer:
      "Reach out through our contact page with a short description of your idea. We'll get back to you quickly to discuss scope, timeline and a tailored estimate.",
  },
];

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "comprehensive-seo-services-for-increased-visibility",
    title: "Comprehensive SEO Services for Increased Visibility",
    excerpt:
      "How a structured SEO strategy — technical, on-page and content — compounds into durable organic visibility for modern businesses.",
    category: "SEO",
    author: { name: "Aadhya Infotech" },
    publishedAt: "2022-05-04",
    readingTimeMinutes: 6,
    href: "/blog/comprehensive-seo-services-for-increased-visibility",
  },
  {
    slug: "professional-web-design-for-modern-businesses",
    title: "Professional Web Design for Modern Businesses",
    excerpt:
      "What separates a professional, high-performing website from a template — and why design and speed drive conversions.",
    category: "Design",
    author: { name: "Aadhya Infotech" },
    publishedAt: "2022-04-04",
    readingTimeMinutes: 5,
    href: "/blog/professional-web-design-for-modern-businesses",
  },
  {
    slug: "creative-branding-solutions-to-elevate-your-brand",
    title: "Creative Branding Solutions to Elevate Your Brand",
    excerpt:
      "Branding is more than a logo. A look at how cohesive visual identity builds trust and recognition for growing brands.",
    category: "Branding",
    author: { name: "Aadhya Infotech" },
    publishedAt: "2022-04-04",
    readingTimeMinutes: 5,
    href: "/blog/creative-branding-solutions-to-elevate-your-brand",
  },
];
