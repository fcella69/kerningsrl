import type { Metadata } from "next";

import ContactCta from "@/components/sections/contact/ContactCta/ContactCta";
import ContactFormSection from "@/components/sections/contact/ContactFormSection/ContactFormSection";
import ContactHero from "@/components/sections/contact/ContactHero/ContactHero";
import ContactLocations from "@/components/sections/contact/ContactLocations/ContactLocations";
import type { ContactPageData } from "@/components/sections/contact/types";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  CONTACT_PAGE_QUERY,
  CONTACT_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import styles from "./ContactPage.module.css";

const FALLBACK_DATA: ContactPageData = {
  heroEyebrow: "Contatti",
  heroTitle: "Parliamo del tuo\nprossimo progetto.",
  heroSubtitle:
    "Che tu stia costruendo un nuovo sito, ripensando il posizionamento del brand o cercando un partner per un progetto su misura, possiamo partire da una conversazione concreta, chiara e senza sovrastrutture.",

  quickContacts: [],

  formTitle: "Raccontaci cosa hai in mente",
  formDescription:
    "Più contesto ci dai, meglio possiamo capire il progetto e indirizzarti nel modo giusto. Anche una descrizione semplice va benissimo per iniziare.",
  serviceOptions: [
    "Sito web",
    "Brand identity",
    "Social & advertising",
    "Progetto custom",
    "Altro",
  ],

  sidebarBlocks: [
    {
      title: "Come lavoriamo",
      text: "Ogni progetto parte da ascolto, obiettivi e metodo. Non proponiamo soluzioni standard dove serve costruire qualcosa di davvero adatto.",
      ctaLabel: "Chi siamo",
      ctaHref: "/chi-siamo",
    },
    {
      title: "Hai già del materiale?",
      text: "Se hai un brief, dei riferimenti, un sito esistente o semplicemente qualche appunto, puoi anticiparci tutto nel messaggio.",
    },
    {
      title: "Vuoi vedere come lavoriamo?",
      text: "Prima di scriverci puoi dare uno sguardo ai progetti già realizzati e al nostro modo di costruire identità, interfacce ed esperienze digitali.",
      ctaLabel: "Guarda i progetti",
      ctaHref: "/portfolio",
    },
  ],

  locationsTitle: "Dove trovarci",
  locationsDescription:
    "Lavoriamo con una presenza diretta, vicina e concreta. La relazione conta tanto quanto il risultato finale.",
  locations: [],

  ctaTitle: "Hai già in mente da dove partire?",
  ctaText:
    "Scrivici una prima idea, un’esigenza o anche solo il punto in cui ti trovi oggi. Al resto pensiamo insieme, passo dopo passo.",
  ctaPrimaryLabel: "Compila il form",
  ctaPrimaryHref: "#contact-form",
  ctaSecondaryLabel: "Scopri i progetti",
  ctaSecondaryHref: "/portfolio",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(CONTACT_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Contatti",
    fallbackDescription:
      "Contatta Kerning per branding, web design, social, advertising e progetti digitali su misura.",
    path: "/contatti",
    type: "website",
  });
}

export default async function ContattiPage() {
  const contactPage = await sanityFetch<ContactPageData | null>(
    CONTACT_PAGE_QUERY
  );

  const data: ContactPageData = {
    ...FALLBACK_DATA,
    ...(contactPage ?? {}),
    quickContacts: contactPage?.quickContacts ?? FALLBACK_DATA.quickContacts,
    serviceOptions: contactPage?.serviceOptions ?? FALLBACK_DATA.serviceOptions,
    sidebarBlocks: contactPage?.sidebarBlocks ?? FALLBACK_DATA.sidebarBlocks,
    locations: contactPage?.locations ?? FALLBACK_DATA.locations,
  };

  return (
    <main className={styles.page}>
      <ContactHero
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        quickContacts={data.quickContacts}
      />

      <ContactFormSection
        title={data.formTitle}
        description={data.formDescription}
        serviceOptions={data.serviceOptions}
        sidebarBlocks={data.sidebarBlocks}
      />

      <ContactLocations
        title={data.locationsTitle}
        description={data.locationsDescription}
        locations={data.locations}
      />

      <ContactCta
        title={data.ctaTitle}
        text={data.ctaText}
        primaryLabel={data.ctaPrimaryLabel}
        primaryHref={data.ctaPrimaryHref}
        secondaryLabel={data.ctaSecondaryLabel}
        secondaryHref={data.ctaSecondaryHref}
      />
    </main>
  );
}