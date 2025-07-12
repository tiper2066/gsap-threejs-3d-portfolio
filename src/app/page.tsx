import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ServiceSummary from '@/components/sections/ServiceSummury';
import Services from '@/components/sections/Services';
import ReactLenis from 'lenis/react';
import About from '@/components/sections/About';
import Works from '@/components/sections/Works';

export default function Home() {
    return (
        <ReactLenis
            root // 이 요소 document 대상으로 적용함
            className="relative w-screen min-h-screen overflow-x-auto"
        >
            <Navbar />
            <Hero />
            <ServiceSummary />
            <Services />
            <About />
            <Works />
            <section className="h-screen"></section>
        </ReactLenis>
    );
}
