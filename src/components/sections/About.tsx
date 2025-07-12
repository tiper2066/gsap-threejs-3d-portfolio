'use client';
import { useRef } from 'react';
import AnimatedTextLines from '../common/AnimatedTextLines';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {
    // 애니메이션을 위한 텍스트 데이터
    const aboutText = `Obsessed with building fast, intuitive apps—from pixel-perfect React UIs to bulletproof serverless backends. Every line of code is a promise: quality that users feel.
  When I’m not shipping:
⚡️ Open-sourcing my latest experiment (or hacking on yours)
🎥 Teaching devs on Twitch/YouTube—because rising tides lift all ships
🧗 Rock climbing (problem-solving with real stakes)
🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`;
    const imgRef = useRef<HTMLImageElement>(null); // 이미지 참조

    // ***************************** GSAP를 애님 함수 정의
    useGSAP(() => {
        // 텍스트 문구 애니메이션
        gsap.to('#about', {
            scale: 0.95, // 조금 작게
            scrollTrigger: {
                trigger: '#about',
                start: 'bottom 80%', // 요소의 하단이 화면 80%에 이를 경우 시작
                end: 'bottom 20%', // 요소의 하단이 화면 20%에 이를 경우 종료
                scrub: true,
                markers: false,
            },
            ease: 'power1.inOut',
        });
        // 이미지 초기 설정
        gsap.set(imgRef.current, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', // 처음에 라인 형태 클립핑
        });
        // 이미지 애니메이션
        gsap.to(imgRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 전체 영역 클리핑
            duration: 2,
            ease: 'power4.out',
            scrollTrigger: { trigger: imgRef.current },
        });
    });

    return (
        <section id="about" className="min-h-screen bg-black rounded-b-4xl">
            <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
                <img
                    ref={imgRef}
                    src="images/man.jpg"
                    alt="man"
                    className="w-md rounded-3xl"
                />
                <AnimatedTextLines text={aboutText} className={'w-full'} />
            </div>
        </section>
    );
};
export default About;
