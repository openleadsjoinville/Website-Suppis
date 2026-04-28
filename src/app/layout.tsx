import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://suppis.com.br"
const LOGO_URL = `${SITE_URL}/android-chrome-512x512.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Suppis Soluções de Interiores - O seu imóvel nas mãos certas",
  description: "Especialistas em projeto de interiores e marcenaria com execução integrada.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Suppis Soluções de Interiores - O seu imóvel nas mãos certas",
    description: "Especialistas em projeto de interiores e marcenaria com execução integrada.",
    url: SITE_URL,
    siteName: "Suppis Soluções de Interiores",
    images: [
      { url: "/android-chrome-512x512.png", width: 512, height: 512, alt: "Suppis" },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Suppis Soluções de Interiores",
    description: "Especialistas em projeto de interiores e marcenaria com execução integrada.",
    images: ["/android-chrome-512x512.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Suppis Soluções de Interiores",
      alternateName: "Suppis",
      url: SITE_URL,
      logo: LOGO_URL,
      image: LOGO_URL,
      description: "Especialistas em projeto de interiores e marcenaria com execução integrada. Sofisticação e gestão inteligente para seu lar.",
      telephone: "+5547997623154",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Dr. Marinho Lobo, 512 - sala 23",
        addressLocality: "Joinville",
        addressRegion: "SC",
        postalCode: "89201-020",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -26.3032,
        longitude: -48.8475,
      },
      areaServed: {
        "@type": "City",
        name: "Joinville",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "16",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.instagram.com/suppis.interiores",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços Suppis Integra",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marcenaria" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Iluminação" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gesso" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marmoraria" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pisos e Revestimentos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Metais" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cortinas e Persianas" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elétrica" } },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Suppis Soluções de Interiores",
      url: SITE_URL,
      logo: LOGO_URL,
      sameAs: [
        "https://www.instagram.com/suppis.interiores",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Suppis Soluções de Interiores",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://s.tintim.app https://*.tintim.app; img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.supabase.co https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.googleusercontent.com https://*.tintim.app; connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://*.clarity.ms https://*.supabase.co https://maps.googleapis.com https://*.tintim.app; frame-src https://www.googletagmanager.com https://www.google.com https://*.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; media-src 'self' https://*.supabase.co"
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N9VX243F');` }} />
        {/* End Google Tag Manager */}
        {/* Microsoft Clarity */}
        <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w9jivw0udy");` }} />
        {/* End Microsoft Clarity */}
        {/* Tintim Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `(function(window, document, script) { if (!window.tt) { window.tt = window.tt || {}; c = document.getElementsByTagName('head')[0]; k = document.createElement('script'); k.async = 1; k.src = script; c.appendChild(k); } window.tt.accountCode = '0cdc7886-686e-4429-b608-0e476b585a71'; })(window, document, '//s.tintim.app/static/core/tintim-1.0.js');` }} />
        {/* End Tintim Pixel */}
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N9VX243F"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
