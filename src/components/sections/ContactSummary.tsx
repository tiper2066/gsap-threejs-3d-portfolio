'use client';

import { useRef } from 'react';

const ContactSummary = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
        >
            <Marquee items={items} />
            <div className="overflow-hidden font-light text-center contact-text-responsive">
                <p>
                    “ Let’s build a <br />
                    <span className="font-normal">memorable</span> &{' '}
                    <span className="italic">inspiring</span> <br />
                    web application <span className="text-gold">
                        together
                    </span>{' '}
                    “
                </p>
            </div>
            <Marquee
                items={items2}
                reverse={true}
                className="text-black bg-transparent border-y-2"
                iconClassName="stroke-gold stroke-2 text-primary"
                icon="material-symbols-light:square"
            />
        </section>
    );
};
export default ContactSummary;
