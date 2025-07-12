'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
    const titleService_1_Ref = useRef<HTMLDivElement>(null); // 1번째 줄 참조
    const titleService_2_Ref = useRef<HTMLDivElement>(null); // 2번째 줄 참조
    const titleService_3_Ref = useRef<HTMLDivElement>(null); // 3번째 줄 참조
    const titleService_4_Ref = useRef<HTMLDivElement>(null); // 4번째 줄 참조

    // GSAP를 사용한 애님 함수 정의
    useGSAP(() => {
        // 1번째 줄 애님
        gsap.to(titleService_1_Ref.current, {
            xPercent: 20, // 좌측 20% 위치로 이동
            scrollTrigger: {
                trigger: titleService_1_Ref.current,
                scrub: true,
            },
        });
        // 2번째 줄 애님
        gsap.to(titleService_2_Ref.current, {
            xPercent: -30, // 화면 밖 좌측 30% 위치로 이동
            scrollTrigger: {
                trigger: titleService_2_Ref.current,
                scrub: true,
            },
        });
        // 3번째 줄 애님
        gsap.to(titleService_3_Ref.current, {
            xPercent: 100, // 우측 끝으로 이동
            scrollTrigger: {
                trigger: titleService_3_Ref.current,
                scrub: true,
            },
        });
        // 4번째 줄 애님
        gsap.to(titleService_4_Ref.current, {
            xPercent: -100, // 화면 밖 좌측 100% 위치로 이동
            scrollTrigger: {
                trigger: titleService_4_Ref.current,
                scrub: true,
            },
        });
    });

    return (
        // 얇은 폰트 , 약간 좁은 줄간격, 반응형 텍스트 크기 조절
        <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
            {/* 첫번째 줄 --------------- */}
            <div ref={titleService_1_Ref}>
                <p>Architucture</p>
            </div>
            {/* 두번째 줄 --------------- */}
            <div
                ref={titleService_2_Ref}
                className="flex items-center justify-center gap-3 translate-x-16" // 우측으로 약간 이동
            >
                <p className="font-normal">Development</p>
                {/* 짧은 대쉬 라인 - 두께 1 */}
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p>Deployment</p>
            </div>
            {/* 세번째 줄 --------------- */}
            <div
                ref={titleService_3_Ref}
                className="flex items-center justify-center gap-3 -translate-x-48" // 우측으로 더 이동
            >
                <p>APIs</p>
                {/* 짧은 대쉬 라인 - 두께 1 */}
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p className="italic">Frontends</p>
                {/* 짧은 대쉬 라인 - 두께 1 */}
                <div className="w-10 h-1 md:w-32 bg-gold" />
                <p>Scalability</p>
            </div>
            {/* 네번째 줄 --------------- 우측으로 더 이동 */}
            <div ref={titleService_4_Ref} className="translate-x-48">
                <p>Databases</p>
            </div>
        </section>
    );
};
export default ServiceSummary;
