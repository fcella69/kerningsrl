import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
    name: "brandIdentityPage",
    title: "Brand Identity Page",
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
            initialValue: "Brand Identity",
        }),
        defineField({
            name: "heroTitle",
            title: "Hero title",
            type: "text",
            rows: 3,
            initialValue: "Identità che resta",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero subtitle",
            type: "text",
            rows: 5,
            initialValue:
                "Costruiamo identità visive capaci di dare forma al brand, renderlo più riconoscibile e farlo vivere in modo coerente su tutti i punti di contatto. Non solo un logo, ma un sistema chiaro, solido e credibile.",
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
            initialValue: "Sistema, forma, riconoscibilità",
        }),
        defineField({
            name: "introBody",
            title: "Intro body",
            type: "text",
            rows: 7,
            initialValue:
                "Un’identità visiva efficace non deve solo piacere. Deve chiarire, distinguere e sostenere il brand nel tempo. Per questo lavoriamo su struttura, linguaggio, tono visivo e coerenza applicativa.\nDiamo forma a sistemi che aiutano il progetto a presentarsi meglio, a essere ricordato e a mantenere continuità su ogni touchpoint.",
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
            initialValue: "Cosa costruiamo",
        }),
        defineField({
            name: "servicesIntro",
            title: "Services intro",
            type: "text",
            rows: 4,
            initialValue:
                "Lavoriamo su identità visive pensate per essere coerenti, applicabili e capaci di sostenere davvero la crescita del brand.",
        }),
        defineField({
            name: "services",
            title: "Service cards",
            type: "array",
            initialValue: [
                {
                    title: "Strategia di marca",
                    text: "Partiamo da posizionamento, tono e obiettivi per definire una base chiara prima ancora di entrare nella forma visiva.",
                },
                {
                    title: "Logo system",
                    text: "Progettiamo marchi e sistemi di utilizzo capaci di funzionare con ordine, presenza e flessibilità nei diversi contesti.",
                },
                {
                    title: "Palette & typography",
                    text: "Selezioniamo combinazioni cromatiche e tipografiche coerenti con il carattere del brand e con la sua applicazione reale.",
                },
                {
                    title: "Direzione visiva",
                    text: "Definiamo uno stile riconoscibile attraverso griglie, rapporti, ritmo, immagini, texture e linguaggio compositivo.",
                },
                {
                    title: "Applicazioni",
                    text: "Traduciamo l’identità su supporti digitali e materiali per renderla concreta, leggibile e coerente nei touchpoint principali.",
                },
                {
                    title: "Linee guida",
                    text: "Consegniamo un sistema più ordinato e più facile da mantenere, così il brand può restare coerente anche nel tempo.",
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
                "Un’identità forte nasce da un processo chiaro. Per questo costruiamo il lavoro per fasi, così da dare al brand una forma visiva che abbia logica, struttura e continuità.",
        }),
        defineField({
            name: "processSteps",
            title: "Process steps",
            type: "array",
            initialValue: [
                {
                    numberLabel: "01",
                    title: "Analisi & posizionamento",
                    text: "Leggiamo il brand, il contesto e i suoi obiettivi per capire quale direzione visiva abbia davvero senso costruire.",
                },
                {
                    numberLabel: "02",
                    title: "Territorio visivo",
                    text: "Definiamo atmosfera, riferimenti, tono e principi del sistema per dare una base coerente alla progettazione.",
                },
                {
                    numberLabel: "03",
                    title: "Costruzione del sistema",
                    text: "Sviluppiamo logo, palette, tipografia, composizione e regole per trasformare la direzione in un’identità concreta.",
                },
                {
                    numberLabel: "04",
                    title: "Applicazione & consegna",
                    text: "Portiamo il sistema nei touchpoint principali e lo organizziamo in modo chiaro, così da renderlo utilizzabile e duraturo.",
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
            title: "Break image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "featureVideo",
            title: "Break video",
            description: "Se è presente il video, avrà priorità sull'immagine",
            type: "file",
            options: {
                accept: "video/mp4,video/webm",
            },
        }),

        defineField({
            name: "pillarsTitle",
            title: "Pillars title",
            type: "string",
            initialValue: "Cosa deve avere",
        }),
        defineField({
            name: "pillarsIntro",
            title: "Pillars intro",
            type: "text",
            rows: 4,
            initialValue:
                "Per noi una brand identity efficace deve essere leggibile, distintiva e abbastanza solida da accompagnare il progetto nel tempo, senza diventare fragile o decorativa.",
        }),
        defineField({
            name: "pillars",
            title: "Pillars",
            type: "array",
            initialValue: [
                {
                    title: "Chiarezza",
                    text: "Il brand deve farsi capire subito, senza ambiguità visive o soluzioni che complicano la percezione.",
                },
                {
                    title: "Coerenza",
                    text: "Ogni elemento deve far parte dello stesso linguaggio, così il sistema resta ordinato anche nei diversi contesti.",
                },
                {
                    title: "Distintività",
                    text: "L’identità deve avere carattere e presenza, senza inseguire effetti gratuiti o mode troppo fragili.",
                },
                {
                    title: "Durata",
                    text: "Costruiamo sistemi pensati per reggere nel tempo, crescere con il brand e mantenere valore anche evolvendo.",
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
            initialValue: "Identità in evidenza",
        }),
        defineField({
            name: "showcaseText",
            title: "Showcase text",
            type: "text",
            rows: 4,
            initialValue:
                "Una selezione di progetti in cui identità, linguaggio visivo e applicazione hanno costruito un sistema più chiaro, più forte e più riconoscibile.",
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
                "Ogni identità nasce da esigenze diverse. Il nostro obiettivo è costruire un sistema su misura, capace di dare ordine, riconoscibilità e continuità reale al brand.",
        }),
        defineField({
            name: "deliverables",
            title: "Deliverables",
            type: "array",
            initialValue: [
                { label: "Logo system" },
                { label: "Palette cromatica" },
                { label: "Typography selection" },
                { label: "Griglie e composizioni" },
                { label: "Brand assets" },
                { label: "Materiali coordinati" },
                { label: "Social brand kit" },
                { label: "Linee guida" },
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
            initialValue: "Diamo forma al tuo brand",
        }),
        defineField({
            name: "ctaText",
            title: "CTA text",
            type: "text",
            rows: 4,
            initialValue:
                "Se vuoi costruire un’identità più chiara, più forte e più coerente, possiamo definire insieme la direzione giusta e trasformarla in un sistema reale.",
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
                title: "Brand Identity Page",
                subtitle: "Service/editorial page",
            };
        },
    },
});