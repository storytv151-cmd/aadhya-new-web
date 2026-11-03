import type { Faq } from "@/types";

/**
 * The long-form content of each /services/<slug> page. `slug` matches `services` in
 * site-content.ts, which still holds the card title, description, icon and chips.
 * `work` lists portfolio slugs and `products` product slugs (content/products.ts), so the
 * examples shown are always real projects. No prices, client names or numbers we can't back.
 */
export type ServicePage = {
  slug: string;
  /** <title> before " — Aadhya Infotech"; says the service and the city. */
  metaTitle: string;
  metaDescription: string;
  /** Page H1; wrap a word in *…* for the serif italic. */
  headline: string;
  intro: string;
  overview: string[];
  offerings: { title: string; description: string }[];
  stack: string[];
  work: string[];
  products: string[];
  faqs: Faq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "app-development",
    metaTitle: "Mobile App Development Company in Surat",
    metaDescription:
      "Android and iOS app development in Surat: Flutter, native Kotlin and Swift apps, built, published on Google Play and the App Store, and maintained by Aadhya Infotech.",
    headline: "Mobile apps for Android and *iOS*",
    intro:
      "We design, build and publish mobile apps for businesses and start-ups, from the first screen sketch to the Play Store and App Store listing.",
    overview: [
      "Aadhya Infotech is an app development company in Surat, Gujarat. We build apps people keep on their phones: utility apps, shopping apps, booking and service apps, and the admin panels and APIs behind them.",
      "We build cross-platform apps in Flutter, so one codebase runs on Android and iOS, and native Kotlin or Swift apps when an app needs deep platform features. We also make apps for our own products: Go Cart turns a Shopify store into a branded Android and iOS app.",
    ],
    offerings: [
      {
        title: "Android & iOS apps",
        description: "Cross-platform Flutter apps or native Kotlin and Swift apps, built for phones and tablets.",
      },
      {
        title: "E-commerce apps",
        description: "Shopping apps with product search, cart, UPI and card payments, order tracking and push notifications.",
      },
      {
        title: "Backend & admin panel",
        description: "The API, database and web dashboard your team uses to manage users, content and orders.",
      },
      {
        title: "Store publishing",
        description: "Play Console and App Store Connect setup, listing text, screenshots, privacy forms and review.",
      },
      {
        title: "Push & analytics",
        description: "Firebase push notifications, crash reports and usage analytics wired in from day one.",
      },
      {
        title: "Updates & support",
        description: "New OS versions, store policy changes, bug fixes and new features after launch.",
      },
    ],
    stack: ["Flutter", "Dart", "Kotlin", "Swift", "React Native", "Firebase", "Node.js", "REST APIs"],
    work: ["whatsapp-status-saver", "daily-quotes", "calculator-tape"],
    products: ["gocart"],
    faqs: [
      {
        id: "app-1",
        question: "Do you build apps for both Android and iOS?",
        answer:
          "Yes. We usually build one Flutter app that runs on both, which keeps cost and upkeep down. If your app needs platform-specific features, we build it natively in Kotlin for Android and Swift for iOS.",
      },
      {
        id: "app-2",
        question: "Will you publish the app on Google Play and the App Store?",
        answer:
          "Yes. We prepare the store listing, screenshots, privacy details and builds, submit them under your developer account and handle the review until the app is live.",
      },
      {
        id: "app-3",
        question: "Can you turn my Shopify store into an app?",
        answer:
          "Yes. Our own product Go Cart does exactly that: it builds a branded Android and iOS app from your Shopify store, with push notifications and app analytics. For a fully custom shopping app, we build one to your design.",
      },
      {
        id: "app-4",
        question: "How much does an app cost and how long does it take?",
        answer:
          "It depends on the screens, features and integrations. Tell us about your idea and we'll send a written estimate with the scope, timeline and cost before any work starts.",
      },
      {
        id: "app-5",
        question: "Do you work with clients outside Surat?",
        answer:
          "Yes. Our office is in Surat, where you're welcome to meet us, and we work with clients across India and abroad over calls, chat and shared project boards.",
      },
    ],
  },
  {
    slug: "game-development",
    metaTitle: "Game Development Company in Surat",
    metaDescription:
      "Unity game development in Surat: 2D and 3D mobile games for Android and iOS, from concept and art to publishing, ads and in-app purchases, by Aadhya Infotech.",
    headline: "Mobile games players come *back* to",
    intro:
      "We make 2D and 3D games in Unity for Android, iOS and PC, and handle everything from the core gameplay loop to publishing and live updates.",
    overview: [
      "Aadhya Infotech is a game development company in Surat, Gujarat. Games we've built include the archery hunting game AccuBow, the survival shooter Zombie Shooter and the endless racer Highway Traffic Rider.",
      "We work with studios, brands and founders who want a game made: casual and hyper-casual games, shooters, racing and sports games, and educational games. We can build the whole game or join your team for programming, art or porting.",
    ],
    offerings: [
      {
        title: "2D & 3D games",
        description: "Gameplay, physics, levels and controls built in Unity with C#, tuned for phones.",
      },
      {
        title: "Game art & UI",
        description: "Characters, environments, animations, menus and HUD that match your game's style.",
      },
      {
        title: "Ads & in-app purchases",
        description: "Rewarded and interstitial ads, IAP stores and remote config so the game can earn.",
      },
      {
        title: "Multiplayer & leaderboards",
        description: "Online play, leaderboards, achievements and cloud saves where the game needs them.",
      },
      {
        title: "Porting & optimisation",
        description: "Bring a game to Android, iOS or PC and make it run smoothly on low-end devices.",
      },
      {
        title: "Publishing & live ops",
        description: "Store listings, analytics, new levels and events after the game is out.",
      },
    ],
    stack: ["Unity", "C#", "Unreal Engine", "Blender", "Firebase", "AdMob", "Google Play Games"],
    work: ["accubow", "zombie-shooter", "highway-traffic-rider"],
    products: [],
    faqs: [
      {
        id: "game-1",
        question: "Which game engine do you use?",
        answer:
          "Mostly Unity with C#, which suits mobile games and lets one project ship to Android, iOS and PC. We also work in Unreal Engine for projects that need it.",
      },
      {
        id: "game-2",
        question: "Can you make a game from my idea?",
        answer:
          "Yes. We start with a short game design document and a playable prototype of the core mechanic, so you can feel the game early before we build the levels, art and menus.",
      },
      {
        id: "game-3",
        question: "Do you add ads and in-app purchases?",
        answer:
          "Yes. We integrate ad networks such as AdMob with rewarded and interstitial ads, set up in-app purchases, and add analytics so you can see what players do.",
      },
      {
        id: "game-4",
        question: "Do you also publish and update the game?",
        answer:
          "Yes. We prepare the store listings and builds, publish the game, and keep releasing fixes, new levels and events after launch if you want us to.",
      },
    ],
  },
  {
    slug: "web-development",
    metaTitle: "Website & Web App Development in Surat",
    metaDescription:
      "Website and web app development in Surat: fast business websites, online stores and custom web apps in Next.js, React and Node.js, built SEO-ready by Aadhya Infotech.",
    headline: "Websites and web apps built to *perform*",
    intro:
      "Business websites, online stores and custom web applications that load fast, rank well and are easy for your team to update.",
    overview: [
      "Aadhya Infotech builds websites and web applications from our office in Surat, Gujarat: company websites, landing pages, e-commerce stores, dashboards, portals and SaaS products.",
      "We build with Next.js, React and Node.js and set up the technical SEO, analytics and hosting as part of the job. Our own products run on the same stack: DevStore is a Next.js storefront for developer products, and this website is built the same way.",
    ],
    offerings: [
      {
        title: "Business websites",
        description: "Fast, mobile-first company websites and landing pages with clear calls to action.",
      },
      {
        title: "E-commerce stores",
        description: "Online stores with catalogue, cart, Indian payment gateways, coupons and order emails.",
      },
      {
        title: "Custom web apps",
        description: "Dashboards, portals, booking systems and SaaS products with user accounts and roles.",
      },
      {
        title: "APIs & integrations",
        description: "REST APIs and connections to payment, shipping, CRM, email and WhatsApp services.",
      },
      {
        title: "SEO-ready build",
        description: "Page speed, metadata, structured data, sitemaps and Search Console set up at launch.",
      },
      {
        title: "Hosting & care",
        description: "Domain, SSL, hosting, backups, updates and changes after the site goes live.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "MySQL", "Tailwind CSS"],
    work: ["gift-shop", "vedarch-design", "asal-masala"],
    products: ["devstore"],
    faqs: [
      {
        id: "web-1",
        question: "Will my website work well on mobile phones?",
        answer:
          "Yes. Every site we build is designed mobile-first and tested on real phones, since most visitors in India arrive on a phone.",
      },
      {
        id: "web-2",
        question: "Is the website SEO-friendly?",
        answer:
          "Yes. We build for page speed and set up titles, descriptions, structured data, a sitemap and Google Search Console, so search engines can find and understand every page.",
      },
      {
        id: "web-3",
        question: "Can I update the content myself?",
        answer:
          "Yes. If you want to edit pages, products or blog posts yourself, we add an admin panel or a CMS and show your team how to use it.",
      },
      {
        id: "web-4",
        question: "Do you build web apps as well as websites?",
        answer:
          "Yes. Besides websites we build custom web applications such as dashboards, customer portals, booking systems and SaaS products, with their APIs and databases.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    metaTitle: "UI/UX Design Services in Surat",
    metaDescription:
      "UI/UX design in Surat for apps, websites and software: user research, wireframes, Figma prototypes and design systems that developers can build from, by Aadhya Infotech.",
    headline: "Interfaces that feel *obvious*",
    intro:
      "We design apps, websites and dashboards that people understand at first use, and hand developers a design that is ready to build.",
    overview: [
      "Aadhya Infotech's design team in Surat works on the products we build and on designs for other teams: new apps and websites, redesigns of products that have grown confusing, and design systems.",
      "Because our designers sit with our developers, the screens we design are practical to build. You get clickable Figma prototypes to test with real users before any code is written.",
    ],
    offerings: [
      {
        title: "Research & flows",
        description: "Understand your users and goals, then map the journeys and screens the product needs.",
      },
      {
        title: "Wireframes",
        description: "Low-detail layouts to agree on structure and content before visual design starts.",
      },
      {
        title: "UI design",
        description: "Polished screens with your brand's colours and type, in light and dark themes.",
      },
      {
        title: "Prototypes",
        description: "Clickable Figma prototypes to test the experience and show investors or clients.",
      },
      {
        title: "Design systems",
        description: "Reusable components, colour and type tokens so new screens stay consistent.",
      },
      {
        title: "Redesigns & audits",
        description: "Review an existing app or site for usability and accessibility problems and fix them.",
      },
    ],
    stack: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop", "Material Design", "Apple HIG"],
    work: ["daily-quotes", "vedarch-design", "gift-shop"],
    products: [],
    faqs: [
      {
        id: "ux-1",
        question: "What's the difference between UI and UX design?",
        answer:
          "UX design is how the product works: the journeys, structure and steps a user takes. UI design is how it looks: layout, colour, type and components. We do both together.",
      },
      {
        id: "ux-2",
        question: "Which tool do you design in?",
        answer:
          "Figma. You get access to the files and prototypes, can comment on any screen, and keep everything when the project ends.",
      },
      {
        id: "ux-3",
        question: "Can you redesign our existing app or website?",
        answer:
          "Yes. We start with a review of what users struggle with today, then redesign the key screens and hand them to your developers or build them ourselves.",
      },
      {
        id: "ux-4",
        question: "Can you design only, without development?",
        answer:
          "Yes. We can deliver the Figma designs, prototypes and design system for your own developers, and stay available to answer their questions during the build.",
      },
    ],
  },
  {
    slug: "cyber-security",
    metaTitle: "Cyber Security Services in Surat",
    metaDescription:
      "Cyber security for apps, websites and servers in Surat: security audits, vulnerability testing, server hardening, secure login and monitoring, from Aadhya Infotech.",
    headline: "Keep your apps and data *safe*",
    intro:
      "We find and fix the weak spots in your apps, websites and servers before someone else does, and set up the monitoring to catch problems early.",
    overview: [
      "Aadhya Infotech helps businesses in Surat and across India secure the software they depend on: websites, mobile apps, APIs, admin panels and the servers they run on.",
      "We apply the same practices in our own products: DevStore uses passwordless magic-link sign-in and role-based access for staff, and Go Cart connects to Shopify stores only through Shopify's OAuth sign-in. We bring that care to your systems, in plain language you can act on.",
    ],
    offerings: [
      {
        title: "Security audits",
        description: "Review your app, website and API against the OWASP Top 10 and common misconfigurations.",
      },
      {
        title: "Vulnerability testing",
        description: "Test logins, permissions, uploads and APIs for the ways an attacker would get in.",
      },
      {
        title: "Server hardening",
        description: "SSH keys, firewalls, updates, HTTPS and least-privilege access on your servers.",
      },
      {
        title: "Secure login & roles",
        description: "Passwordless or two-factor sign-in, role-based access and safe session handling.",
      },
      {
        title: "Backups & recovery",
        description: "Automatic backups and a tested plan to restore your data if something goes wrong.",
      },
      {
        title: "Monitoring & fixes",
        description: "Uptime and error monitoring, log reviews and fast fixes when an issue appears.",
      },
    ],
    stack: ["OWASP Top 10", "Burp Suite", "Nmap", "Let's Encrypt", "Linux", "Nginx", "Cloudflare"],
    work: [],
    products: ["devstore", "gocart"],
    faqs: [
      {
        id: "sec-1",
        question: "What does a security audit include?",
        answer:
          "We check your app or website, its API and its server for common weaknesses such as broken access control, injection, weak sign-in and exposed data, then give you a report ranked by risk with the fix for each issue.",
      },
      {
        id: "sec-2",
        question: "Can you fix the problems you find?",
        answer:
          "Yes. We can fix the issues in code and on the server ourselves, or work with your developers and re-test once their fixes are in.",
      },
      {
        id: "sec-3",
        question: "Our website was hacked. Can you help?",
        answer:
          "Yes. We clean the site, close the hole that let the attacker in, restore from a clean backup where possible and set up monitoring so it doesn't happen again.",
      },
      {
        id: "sec-4",
        question: "Do you test mobile apps too?",
        answer:
          "Yes. We review how the app stores data on the phone, how it talks to its API and whether the API checks every request, since that's where most app data leaks happen.",
      },
    ],
  },
  {
    slug: "cloud-services",
    metaTitle: "Cloud & DevOps Services in Surat",
    metaDescription:
      "Cloud and DevOps services in Surat: AWS and cloud server setup, migration, Docker, CI/CD, monitoring and cost control for apps and websites, by Aadhya Infotech.",
    headline: "Cloud that stays up and stays *affordable*",
    intro:
      "We set up, move and run the servers behind your apps and websites, so they stay fast and online while the bill stays sensible.",
    overview: [
      "Aadhya Infotech runs its own products in the cloud: Go Cart and DevStore are served from Linux cloud servers that we set up, deploy to and monitor ourselves. We offer the same work to businesses in Surat and beyond.",
      "Whether you're launching a new app, moving off shared hosting or paying too much for an old setup, we design a hosting plan that fits your traffic, automate deployments and keep watch after go-live.",
    ],
    offerings: [
      {
        title: "Cloud setup",
        description: "AWS, DigitalOcean or Google Cloud servers, databases and storage set up for your app.",
      },
      {
        title: "Migration",
        description: "Move websites, apps and databases from shared hosting or another cloud with no data loss.",
      },
      {
        title: "Docker & CI/CD",
        description: "Containers and automated build-and-deploy pipelines so releases are quick and repeatable.",
      },
      {
        title: "Scaling & speed",
        description: "Caching, CDN, load balancing and database tuning for traffic spikes and fast pages.",
      },
      {
        title: "Monitoring",
        description: "Uptime, error and resource alerts, with log rotation so disks never fill up.",
      },
      {
        title: "Cost control",
        description: "Right-size servers and remove unused resources so you pay only for what you use.",
      },
    ],
    stack: ["AWS", "DigitalOcean", "Google Cloud", "Docker", "Nginx", "PM2", "GitHub Actions", "Linux"],
    work: [],
    products: ["gocart", "devstore"],
    faqs: [
      {
        id: "cloud-1",
        question: "Which cloud providers do you work with?",
        answer:
          "Mainly AWS, DigitalOcean and Google Cloud. We recommend one based on your traffic, budget and where your users are, and set it up in your own account so you stay in control.",
      },
      {
        id: "cloud-2",
        question: "Can you move our website from shared hosting to the cloud?",
        answer:
          "Yes. We copy the site and database, test everything on the new server, then switch the domain over, so visitors see little or no downtime.",
      },
      {
        id: "cloud-3",
        question: "Can you lower our cloud bill?",
        answer:
          "Often, yes. We review what you're running, resize or remove servers you don't need, and add caching so smaller servers can handle the same traffic.",
      },
      {
        id: "cloud-4",
        question: "Do you manage servers after setup?",
        answer:
          "Yes. We can look after updates, backups, monitoring and deployments month to month, and fix problems as soon as alerts come in.",
      },
    ],
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((page) => page.slug === slug);
