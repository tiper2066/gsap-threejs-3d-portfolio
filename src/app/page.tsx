import Navbar from '@/components/sections/Navbar';

export default function Home() {
    return (
        <div className='relative w-screen min-h-screen overflow-x-auto'>
            <Navbar />
            <section id='home' className='min-h-screen' />
            <section id='services' className='min-h-screen bg-amber-800' />
        </div>
    );
}
