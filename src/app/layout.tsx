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

export const metadata: Metadata = {
  title: "Suppis Soluções de Interiores - O seu imóvel nas mãos certas",
  description: "Especialistas em projeto de interiores e marcenaria com execução integrada.",
    icons: {
      icon: "/favicon.svg",
    },
};

const SITE_URL = "https://suppis.com.br"
const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-Suppis-Fundo-transparente-1766487680528.png"

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
      telephone: "+5547999247199",
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
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KST5MH6L');` }} />
        {/* End Google Tag Manager */}
        {/* Microsoft Clarity */}
        <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w9jivw0udy");` }} />
        {/* End Microsoft Clarity */}
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
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KST5MH6L"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
