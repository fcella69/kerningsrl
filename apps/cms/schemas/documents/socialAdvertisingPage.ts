import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "socialAdvertisingPage",
    title: "Social & Advertising Page",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),

        defineField({
            name: "heroEyebrow",
            title: "Hero eyebrow",
            type: "string",
            initialValue: "Social & Advertising",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero title",
            type: "text",
            rows: 3,
            initialValue: "Presenza che muove",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero subtitle",
            type: "text",
            rows: 5,
            initialValue:
                "Costruiamo strategie social e campagne advertising che danno direzione al brand, valorizzano l’identità e trasformano attenzione in opportunità concrete. Non solo pubblicazione, ma visione, ritmo e continuità.",
        }),
        defineField({
            name: "heroPrimaryLabel",
            title: "Hero primary CTA label",
            type: "string",
            initialValue: "Parliamone",
        }),
        defineField({
            name: "heroPrimaryHref",
            title: "Hero primary CTA link",
            type: "string",
            initialValue: "/contatti",
        }),
        defineField({
            name: "heroSecondaryLabel",
            title: "Hero secondary CTA label",
            type: "string",
            initialValue: "Vedi progetti",
        }),
        defineField({
            name: "heroSecondaryHref",
            title: "Hero secondary CTA link",
            type: "string",
            initialValue: "/portfolio",
        }),
        defineField({
            name: "heroImage",
            title: "Hero image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "introTitle",
            title: "Intro title",
            type: "text",
            rows: 4,
            initialValue: "Strategia, contenuto, continuità",
        }),
        defineField({
            name: "introBody",
            title: "Intro body",
            type: "text",
            rows: 7,
            initialValue:
                "Essere presenti online non significa soltanto pubblicare. Significa costruire una voce riconoscibile, presidiare i canali giusti e trasformare ogni uscita in un tassello coerente del brand.\nLavoriamo su contenuti, direzione visiva, piani editoriali e campagne per dare al progetto una presenza più solida, più leggibile e più efficace nel tempo.",
        }),
        defineField({
            name: "introImage",
            title: "Intro image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "servicesTitle",
            title: "Services title",
            type: "string",
            initialValue: "Cosa attiviamo",
        }),
        defineField({
            name: "servicesIntro",
            title: "Services intro",
            type: "text",
            rows: 4,
            initialValue:
                "Diamo forma a un ecosistema di contenuti e campagne pensato per far crescere la presenza del brand in modo coerente, leggibile e misurabile.",
        }),
        defineField({
            name: "services",
            title: "Service cards",
            type: "array",
            initialValue: [
                {
                    title: "Strategia editoriale",
                    text: "Definiamo direzione, tono, rubriche, frequenza e format per costruire una presenza riconoscibile e sostenibile nel tempo.",
                },
                {
                    title: "Content direction",
                    text: "Impostiamo linguaggio visivo, taglio creativo e coerenza dei contenuti per rendere il brand più forte, più ordinato e più memorabile.",
                },
                {
                    title: "Gestione canali",
                    text: "Organizziamo pubblicazione, calendario e presidio dei profili per mantenere continuità, qualità e controllo operativo.",
                },
                {
                    title: "Campagne ADV",
                    text: "Progettiamo campagne Meta orientate a visibilità, contatti o conversioni, con una struttura chiara e una lettura concreta dei risultati.",
                },
                {
                    title: "Copy & creatività",
                    text: "Lavoriamo su testi, concept e materiali per creare contenuti che siano coerenti con il brand e adatti al contesto in cui vivono.",
                },
                {
                    title: "Ottimizzazione continua",
                    text: "Analizziamo risposta del pubblico, qualità delle uscite e andamento delle campagne per migliorare progressivamente il sistema.",
                },
            ],
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "text",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "processTitle",
            title: "Process title",
            type: "string",
            initialValue: "Come lavoriamo",
        }),
        defineField({
            name: "processIntro",
            title: "Process intro",
            type: "text",
            rows: 4,
            initialValue:
                "Ogni progetto social e advertising funziona meglio quando contenuti, visione e operatività seguono una logica chiara. Per questo lavoriamo per fasi, con un metodo leggero ma solido.",
        }),
        defineField({
            name: "processSteps",
            title: "Process steps",
            type: "array",
            initialValue: [
                {
                    numberLabel: "01",
                    title: "Lettura del brand",
                    text: "Analizziamo posizionamento, obiettivi, tono, pubblico e contesto per capire che tipo di presenza costruire.",
                },
                {
                    numberLabel: "02",
                    title: "Impianto creativo",
                    text: "Definiamo format, direzione visiva, linguaggio e asset di base per dare ai contenuti una forma coerente.",
                },
                {
                    numberLabel: "03",
                    title: "Piano & attivazione",
                    text: "Organizziamo calendario, pubblicazione e campagne in modo coordinato, così da tenere insieme presenza organica e spinta paid.",
                },
                {
                    numberLabel: "04",
                    title: "Misura & evoluzione",
                    text: "Osserviamo ciò che funziona, affiniamo creatività e messaggi e aggiorniamo il lavoro in base ai dati e alla risposta reale.",
                },
            ],
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "numberLabel",
                            title: "Number label",
                            type: "string",
                        }),
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "numberLabel",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "featureImage",
            title: "Break image desktop",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "featureVideo",
            title: "Break video desktop",
            description: "Se è presente il video desktop, avrà priorità sull'immagine desktop.",
            type: "file",
            options: {
                accept: "video/mp4,video/webm",
            },
        }),
        defineField({
            name: "featureImageMobile",
            title: "Break image mobile",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text mobile",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "featureVideoMobile",
            title: "Break video mobile",
            description:
                "Versione mobile/verticale. Su mobile ha priorità sull'immagine mobile e sulla media desktop.",
            type: "file",
            options: {
                accept: "video/mp4,video/webm",
            },
        }),

        defineField({
            name: "pillarsTitle",
            title: "Pillars title",
            type: "string",
            initialValue: "Cosa conta davvero",
        }),
        defineField({
            name: "pillarsIntro",
            title: "Pillars intro",
            type: "text",
            rows: 4,
            initialValue:
                "Per noi una presenza social efficace non nasce dal rumore. Nasce da equilibrio, coerenza e capacità di restare riconoscibili anche nel flusso continuo dei contenuti.",
        }),
        defineField({
            name: "pillars",
            title: "Pillars",
            type: "array",
            initialValue: [
                {
                    title: "Coerenza",
                    text: "Ogni contenuto deve parlare la stessa lingua del brand, anche quando cambia formato, tono o obiettivo.",
                },
                {
                    title: "Ritmo",
                    text: "La presenza digitale cresce quando è continua, leggibile e ben distribuita nel tempo.",
                },
                {
                    title: "Qualità",
                    text: "Visual, copy e struttura devono reggere lo sguardo, non solo riempire il feed.",
                },
                {
                    title: "Direzione",
                    text: "Ogni attività deve avere una logica: far percepire meglio il brand, generare attenzione o attivare risultati.",
                },
            ],
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "text",
                            title: "Text",
                            type: "text",
                            rows: 4,
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "text",
                        },
                    },
                }),
            ],
        }),

        defineField({
            name: "showcaseTitle",
            title: "Showcase title",
            type: "text",
            rows: 3,
            initialValue: "Progetti in evidenza",
        }),
        defineField({
            name: "showcaseText",
            title: "Showcase text",
            type: "text",
            rows: 4,
            initialValue:
                "Una selezione di progetti in cui identità, contenuto e presenza digitale hanno lavorato insieme per costruire un’immagine più forte, più chiara e più attiva.",
        }),
        defineField({
            name: "featuredProjects",
            title: "Featured projects",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "project" }],
                }),
            ],
        }),

        defineField({
            name: "deliverablesTitle",
            title: "Deliverables title",
            type: "text",
            rows: 3,
            initialValue: "Cosa possiamo costruire",
        }),
        defineField({
            name: "deliverablesIntro",
            title: "Deliverables intro",
            type: "text",
            rows: 4,
            initialValue:
                "Ogni progetto può attivare un set diverso di strumenti. L’obiettivo non è fare tutto, ma mettere in campo ciò che serve davvero per dare forza e continuità alla comunicazione.",
        }),
        defineField({
            name: "deliverables",
            title: "Deliverables",
            type: "array",
            initialValue: [
                { label: "Piano editoriale" },
                { label: "Rubriche e format" },
                { label: "Direzione visual" },
                { label: "Copy per contenuti" },
                { label: "Gestione profili" },
                { label: "Campagne Meta" },
                { label: "Report periodici" },
                { label: "Ottimizzazione continua" },
            ],
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "label",
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "deliverablesImage",
            title: "Deliverables image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                }),
            ],
        }),

        defineField({
            name: "ctaTitle",
            title: "CTA title",
            type: "text",
            rows: 3,
            initialValue: "Diamo più forza alla tua presenza",
        }),
        defineField({
            name: "ctaText",
            title: "CTA text",
            type: "text",
            rows: 4,
            initialValue:
                "Se vuoi costruire una comunicazione più coerente, più curata e più efficace, possiamo definire insieme il punto di partenza e il sistema giusto da attivare.",
        }),
        defineField({
            name: "ctaPrimaryLabel",
            title: "CTA primary label",
            type: "string",
            initialValue: "Contattaci",
        }),
        defineField({
            name: "ctaPrimaryHref",
            title: "CTA primary link",
            type: "string",
            initialValue: "/contatti",
        }),
        defineField({
            name: "ctaSecondaryLabel",
            title: "CTA secondary label",
            type: "string",
            initialValue: "Scopri Kerning",
        }),
        defineField({
            name: "ctaSecondaryHref",
            title: "CTA secondary link",
            type: "string",
            initialValue: "/chi-siamo",
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Social & Advertising Page",
                subtitle: "Service/editorial page",
            };
        },
    },
});