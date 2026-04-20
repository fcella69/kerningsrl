import type { Metadata } from "next";

import WebDesignCta from "@/components/sections/webDesign/WebDesignCta/WebDesignCta";
import WebDesignDeliverables from "@/components/sections/webDesign/WebDesignDeliverables/WebDesignDeliverables";
import WebDesignFeatureImage from "@/components/sections/webDesign/WebDesignFeatureImage/WebDesignFeatureImage";
import WebDesignHero from "@/components/sections/webDesign/WebDesignHero/WebDesignHero";
import WebDesignIntro from "@/components/sections/webDesign/WebDesignIntro/WebDesignIntro";
import WebDesignPillars from "@/components/sections/webDesign/WebDesignPillars/WebDesignPillars";
import WebDesignProcess from "@/components/sections/webDesign/WebDesignProcess/WebDesignProcess";
import WebDesignServices from "@/components/sections/webDesign/WebDesignServices/WebDesignServices";
import WebDesignShowcase from "@/components/sections/webDesign/WebDesignShowcase/WebDesignShowcase";
import type { WebDesignPageData } from "@/components/sections/webDesign/types";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  WEB_DESIGN_PAGE_QUERY,
  WEB_DESIGN_PAGE_SEO_QUERY,
} from "@/lib/sanity/queries";
import { buildSeoMetadata } from "@/lib/seo/buildSeoMetadata";
import styles from "./WebDesignPage.module.css";

const FALLBACK_DATA: WebDesignPageData = {
  heroEyebrow: "Web Design",
  heroTitle: "Siti che lasciano il segno.",
  heroSubtitle:
    "Non solo pagine belle da vedere, ma esperienze digitali pensate per raccontare meglio un brand, guidare le persone e trasformare attenzione in contatto, fiducia o richiesta.",
  heroPrimaryLabel: "Parliamo del progetto",
  heroPrimaryHref: "/contatti",
  heroSecondaryLabel: "Scopri i lavori",
  heroSecondaryHref: "/portfolio",

  introTitle: "Più di un sito.",
  introBody:
    "Ogni progetto parte da una domanda semplice: come deve sentirsi una persona quando entra nel tuo spazio digitale?\n\nDa lì costruiamo interfacce, gerarchie, ritmo visivo e contenuti con un approccio concreto, curato e su misura. Il risultato deve essere chiaro, coerente e riconoscibile, senza perdere presenza, carattere e qualità progettuale.",

  servicesTitle: "Cosa facciamo",
  servicesIntro:
    "Ogni progetto nasce da bisogni diversi. Cambiano obiettivi, tono, struttura e profondità del lavoro, ma resta costante l’attenzione al linguaggio visivo, alla chiarezza e alla qualità dell’esperienza.",
  services: [
    {
      _key: "corporate",
      title: "Siti corporate",
      text: "Per aziende, studi e realtà strutturate che vogliono una presenza più credibile, chiara e contemporanea.",
    },
    {
      _key: "showcase",
      title: "Siti vetrina evoluti",
      text: "Per attività e brand che hanno bisogno di presentarsi bene, raccontarsi meglio e generare contatti.",
    },
    {
      _key: "landing",
      title: "Landing page strategiche",
      text: "Per campagne, lanci, servizi specifici o pagine ad alta focalizzazione, costruite con gerarchie precise.",
    },
    {
      _key: "editorial",
      title: "Portfolio e siti editoriali",
      text: "Per studi creativi, professionisti, progetti culturali e brand che vivono di immagine, tono e racconto.",
    },
    {
      _key: "restyling",
      title: "Restyling di siti esistenti",
      text: "Quando la base c’è già, ma linguaggio, struttura o percezione non sono più allineati a ciò che il progetto è diventato.",
    },
    {
      _key: "custom",
      title: "Esperienze custom",
      text: "Quando serve qualcosa che va oltre il template: più identità, più logica progettuale, più controllo.",
    },
  ],

  processTitle: "Come lavoriamo",
  processIntro:
    "Lavoriamo così: meno soluzioni preconfezionate, più attenzione al progetto. Ogni scelta visiva deve avere una funzione. Ogni funzione deve sentirsi naturale dentro l’esperienza.",
  processSteps: [
    {
      _key: "01",
      numberLabel: "01",
      title: "Ascolto e direzione",
      text: "Capire il progetto, il tono giusto, il pubblico e l’obiettivo reale del sito.",
    },
    {
      _key: "02",
      numberLabel: "02",
      title: "Struttura e gerarchia",
      text: "Organizzare contenuti, percorsi e blocchi in modo chiaro, leggibile e intenzionale.",
    },
    {
      _key: "03",
      numberLabel: "03",
      title: "Design e identità",
      text: "Tradurre il brand in un’interfaccia coerente, riconoscibile e solida nel tempo.",
    },
    {
      _key: "04",
      numberLabel: "04",
      title: "Sviluppo e rifinitura",
      text: "Portare tutto online con attenzione al dettaglio, coerenza visiva e qualità dell’esperienza.",
    },
  ],

  pillarsTitle: "Cosa conta davvero",
  pillarsIntro:
    "Un buon sito non colpisce solo nei primi tre secondi. Rimane coerente, leggibile e convincente anche quando lo si attraversa davvero.",
  pillars: [
    {
      _key: "clarity",
      title: "Chiarezza",
      text: "Un sito deve guidare, non confondere. Le persone devono capire dove si trovano e cosa fare senza sforzo.",
    },
    {
      _key: "presence",
      title: "Presenza",
      text: "Il brand deve sentirsi, non solo vedersi. Atmosfera, tono e ritmo fanno parte del progetto quanto i contenuti.",
    },
    {
      _key: "consistency",
      title: "Coerenza",
      text: "Ogni dettaglio deve appartenere allo stesso linguaggio: titoli, spazi, immagini, interazioni e micro-scelte.",
    },
    {
      _key: "credibility",
      title: "Credibilità",
      text: "La qualità si percepisce nel modo in cui tutto regge insieme: non in un effetto, ma in un equilibrio.",
    },
  ],

  showcaseTitle: "Progetti selezionati",
  showcaseText:
    "Abbiamo selezionato alcuni progetti che raccontano bene il nostro modo di lavorare: identità, struttura, equilibrio e attenzione al dettaglio.",
  featuredProjects: [],

  deliverablesTitle: "Cosa può includere",
  deliverablesIntro:
    "Non esiste una formula fissa. Esiste un progetto da leggere bene e una configurazione da costruire con criterio.",
  deliverables: [
    { _key: "d1", label: "Architettura dei contenuti" },
    { _key: "d2", label: "Wireframe e struttura pagina" },
    { _key: "d3", label: "Direzione visiva" },
    { _key: "d4", label: "UI design responsive" },
    { _key: "d5", label: "Copy support e microcopy" },
    { _key: "d6", label: "Sviluppo frontend" },
    { _key: "d7", label: "CMS per gestione autonoma" },
    { _key: "d8", label: "Ottimizzazione dei contenuti chiave" },
  ],

  ctaTitle: "Parliamo del tuo sito.",
  ctaText:
    "Possiamo capire insieme da dove partire, cosa va ripensato e che tipo di presenza digitale ha davvero senso costruire per il tuo progetto.",
  ctaPrimaryLabel: "Contattaci",
  ctaPrimaryHref: "/contatti",
  ctaSecondaryLabel: "Guarda il portfolio",
  ctaSecondaryHref: "/portfolio",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await sanityFetch<any>(WEB_DESIGN_PAGE_SEO_QUERY);

  return buildSeoMetadata({
    data: seo,
    fallbackTitle: "Web Design",
    fallbackDescription:
      "Siti e interfacce progettati da Kerning per dare autorevolezza, chiarezza e forza al brand.",
    path: "/web-design",
    type: "website",
  });
}

export default async function WebDesignPage() {
  const pageData = await sanityFetch<WebDesignPageData | null>(
    WEB_DESIGN_PAGE_QUERY
  );

  const data: WebDesignPageData = {
    ...FALLBACK_DATA,
    ...(pageData ?? {}),
    services: pageData?.services ?? FALLBACK_DATA.services,
    processSteps: pageData?.processSteps ?? FALLBACK_DATA.processSteps,
    pillars: pageData?.pillars ?? FALLBACK_DATA.pillars,
    featuredProjects: pageData?.featuredProjects ?? FALLBACK_DATA.featuredProjects,
    deliverables: pageData?.deliverables ?? FALLBACK_DATA.deliverables,
  };

  return (
    <main className={styles.page}>
      <WebDesignHero
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        primaryLabel={data.heroPrimaryLabel}
        primaryHref={data.heroPrimaryHref}
        secondaryLabel={data.heroSecondaryLabel}
        secondaryHref={data.heroSecondaryHref}
        image={data.heroImage}
      />

      <WebDesignIntro
        title={data.introTitle}
        body={data.introBody}
        image={data.introImage}
      />

      <WebDesignServices
        title={data.servicesTitle}
        intro={data.servicesIntro}
        items={data.services}
      />

      <WebDesignProcess
        title={data.processTitle}
        intro={data.processIntro}
        steps={data.processSteps}
      />

      <WebDesignFeatureImage
        image={data.featureImage}
        video={data.featureVideo}
      />

      <WebDesignPillars
        title={data.pillarsTitle}
        intro={data.pillarsIntro}
        items={data.pillars}
      />

      <WebDesignShowcase
        title={data.showcaseTitle}
        text={data.showcaseText}
        projects={data.featuredProjects}
      />

      <WebDesignDeliverables
        title={data.deliverablesTitle}
        intro={data.deliverablesIntro}
        items={data.deliverables}
        image={data.deliverablesImage}
      />

      <WebDesignCta
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