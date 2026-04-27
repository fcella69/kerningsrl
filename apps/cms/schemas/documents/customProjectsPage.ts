import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "customProjectsPage",
    title: "Custom Projects Page",
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
            initialValue: "Progetti Custom",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero title",
            type: "text",
            rows: 3,
            initialValue: "Sistemi su misura",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero subtitle",
            type: "text",
            rows: 5,
            initialValue:
                "Progettiamo e sviluppiamo strumenti digitali costruiti intorno ai processi reali del business: dashboard, piattaforme, aree riservate, automazioni e soluzioni operative pensate per funzionare davvero. Non template adattati, ma sistemi progettati su misura.",
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
            initialValue: "Processo, logica, utilità",
        }),
        defineField({
            name: "introBody",
            title: "Intro body",
            type: "text",
            rows: 7,
            initialValue:
                "Non tutti i progetti digitali possono essere risolti con una soluzione standard. Quando un’azienda ha flussi specifici, esigenze operative precise o strumenti che devono parlare tra loro, serve un progetto costruito intorno alla realtà del lavoro.\nLavoriamo su architettura, esperienza, dati e funzionalità per dare forma a sistemi chiari, utili e capaci di crescere nel tempo.",
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
            initialValue: "Cosa possiamo costruire",
        }),
        defineField({
            name: "servicesIntro",
            title: "Services intro",
            type: "text",
            rows: 4,
            initialValue:
                "Costruiamo soluzioni digitali progettate per risolvere problemi reali, semplificare processi e dare più controllo al lavoro quotidiano.",
        }),
        defineField({
            name: "services",
            title: "Service cards",
            type: "array",
            initialValue: [
                {
                    title: "Analisi dei processi",
                    text: "Partiamo da flussi, criticità e obiettivi reali per capire cosa serve davvero costruire e con quale logica.",
                },
                {
                    title: "Architettura della soluzione",
                    text: "Disegniamo struttura, aree, ruoli, relazioni tra dati e funzionamento generale per dare solidità al progetto.",
                },
                {
                    title: "Dashboard & strumenti",
                    text: "Progettiamo ambienti operativi chiari e su misura per aiutare il team a lavorare meglio e con più controllo.",
                },
                {
                    title: "Portali & aree riservate",
                    text: "Sviluppiamo spazi digitali dedicati a clienti, operatori o collaboratori, organizzati intorno a funzioni reali.",
                },
                {
                    title: "Automazioni & integrazioni",
                    text: "Colleghiamo strumenti, notifichiamo eventi, organizziamo flussi e riduciamo passaggi manuali dove ha senso farlo.",
                },
                {
                    title: "Evoluzione continua",
                    text: "Pensiamo i progetti come sistemi vivi, capaci di essere migliorati, estesi e adattati nel tempo.",
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
                "Ogni progetto custom richiede chiarezza prima ancora dello sviluppo. Per questo lavoriamo per fasi, così da trasformare esigenze complesse in un sistema ordinato e sostenibile.",
        }),
        defineField({
            name: "processSteps",
            title: "Process steps",
            type: "array",
            initialValue: [
                {
                    numberLabel: "01",
                    title: "Lettura del problema",
                    text: "Analizziamo obiettivi, flussi, persone coinvolte e punti critici per capire la natura reale del progetto.",
                },
                {
                    numberLabel: "02",
                    title: "Disegno della soluzione",
                    text: "Definiamo struttura, logiche, moduli e relazioni tra le parti per costruire una base chiara prima dello sviluppo.",
                },
                {
                    numberLabel: "03",
                    title: "Sviluppo progressivo",
                    text: "Realizziamo il sistema per blocchi, con attenzione alla leggibilità, alla coerenza e all’utilità concreta del prodotto.",
                },
                {
                    numberLabel: "04",
                    title: "Rilascio & crescita",
                    text: "Consegniamo una soluzione utilizzabile e la prepariamo a evolvere nel tempo con nuove funzioni e ottimizzazioni.",
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
            initialValue: "Cosa deve fare",
        }),
        defineField({
            name: "pillarsIntro",
            title: "Pillars intro",
            type: "text",
            rows: 4,
            initialValue:
                "Per noi un progetto custom efficace non deve essere solo interessante da vedere. Deve funzionare, integrarsi bene e creare valore reale dentro un processo concreto.",
        }),
        defineField({
            name: "pillars",
            title: "Pillars",
            type: "array",
            initialValue: [
                {
                    title: "Utilità",
                    text: "Ogni funzione deve avere una ragione chiara e risolvere un bisogno reale, non aggiungere complessità inutile.",
                },
                {
                    title: "Chiarezza",
                    text: "Un sistema funziona meglio quando è leggibile, ordinato e semplice da usare per chi ci lavora davvero.",
                },
                {
                    title: "Scalabilità",
                    text: "Costruiamo basi che possano crescere nel tempo, senza obbligare il progetto a ripartire ogni volta da zero.",
                },
                {
                    title: "Connessione",
                    text: "Il valore aumenta quando strumenti, persone e dati riescono a dialogare in modo più fluido e coerente.",
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
            initialValue: "Sistemi in evidenza",
        }),
        defineField({
            name: "showcaseText",
            title: "Showcase text",
            type: "text",
            rows: 4,
            initialValue:
                "Una selezione di progetti in cui struttura, logica e personalizzazione hanno permesso di costruire strumenti più utili, più ordinati e più adatti al contesto reale.",
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
            initialValue: "Cosa possiamo definire",
        }),
        defineField({
            name: "deliverablesIntro",
            title: "Deliverables intro",
            type: "text",
            rows: 4,
            initialValue:
                "Ogni progetto nasce da bisogni diversi. Per questo il set di elementi da costruire può cambiare, ma l’obiettivo resta sempre lo stesso: dare ordine, controllo e utilità reale.",
        }),
        defineField({
            name: "deliverables",
            title: "Deliverables",
            type: "array",
            initialValue: [
                { label: "Discovery & flow mapping" },
                { label: "Architettura funzionale" },
                { label: "Dashboard operative" },
                { label: "Aree riservate" },
                { label: "Automazioni" },
                { label: "Integrazioni API" },
                { label: "Database & logiche" },
                { label: "Roadmap evolutiva" },
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
            initialValue: "Costruiamo il tuo sistema",
        }),
        defineField({
            name: "ctaText",
            title: "CTA text",
            type: "text",
            rows: 4,
            initialValue:
                "Se hai un processo da migliorare, uno strumento da creare o un’idea da trasformare in un sistema concreto, possiamo definire insieme la soluzione giusta.",
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
                title: "Custom Projects Page",
                subtitle: "Service/editorial page",
            };
        },
    },
});