import type { ContactLocation } from "../types";
import styles from "./ContactLocations.module.css";

type ContactLocationsProps = {
    title?: string;
    description?: string;
    locations?: ContactLocation[];
};

export default function ContactLocations({
    title,
    description,
    locations = [],
}: ContactLocationsProps) {
    if (!title && !description && locations.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {(title || description) && (
                    <div className={styles.header}>
                        {title ? <h2 className={styles.title}>{title}</h2> : null}
                        {description ? <p className={styles.description}>{description}</p> : null}
                    </div>
                )}

                {locations.length > 0 ? (
                    <div className={styles.grid}>
                        {locations.map((location, index) => {
                            const key = location._key ?? `${location.name}-${index}`;

                            return (
                                <article className={styles.card} key={key}>
                                    <div className={styles.content}>
                                        {location.city ? (
                                            <span className={styles.city}>{location.city}</span>
                                        ) : null}

                                        {location.name ? (
                                            <h3 className={styles.cardTitle}>{location.name}</h3>
                                        ) : null}

                                        {location.address ? (
                                            <p className={styles.address}>{location.address}</p>
                                        ) : null}

                                        <div className={styles.meta}>
                                            {location.email ? (
                                                <a className={styles.metaLink} href={`mailto:${location.email}`}>
                                                    {location.email}
                                                </a>
                                            ) : null}

                                            {location.phone ? (
                                                <a className={styles.metaLink} href={`tel:${location.phone}`}>
                                                    {location.phone}
                                                </a>
                                            ) : null}

                                            {location.mapUrl ? (
                                                <a
                                                    className={`${styles.metaLink} ${styles.mapButton}`}
                                                    href={location.mapUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Apri in Maps
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </section>
    );
}