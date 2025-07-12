'use client';
import { servicesData } from '@/constants'; // 텍스트 데이터 가져오기
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const serviceRefs = useRef<(HTMLDivElement | null)[]>([]); // 서비스 요소를 배열로 참조
    const [isDesktop, setIsDesktop] = useState(false); // 브라우저 환경에서만 width 체크(PC 너비여부)

    // 브라우저 환경에서만 width 체크 (PC 너비여부)
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768); // 768 이상이면 true
        };
        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // GSAP를 사용한 애님 함수 정의
    useGSAP(() => {
        // 아이템들의 상단위치를 배수 간격 아래로 고정함
        serviceRefs.current.forEach((el) => {
            if (!el) return;
            gsap.from(el, {
                y: 200, // 200 아래 위치에서 출발
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%', // 요소의 상단이 화면 80%에 이를때 애님 시작
                },
                duration: 1,
                ease: 'circ.out',
            });
        });
    }, []);

    return (
        <section
            id="services"
            className="min-h-screen bg-black rounded-t-4xl pt-10"
        >
            {servicesData.map((service, index) => (
                <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                        serviceRefs.current[index] = el;
                    }}
                    // 위치고정, 텍스트 흰색, 배경 검정, 상단 흰색 30% 보더
                    className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
                    // PC 일 경우.. 상단위치를 배수 간격 아래로 고정함
                    style={
                        isDesktop
                            ? {
                                  top: `calc(10vh + ${index * 5}em)`,
                                  marginBottom: `${
                                      (servicesData.length - index - 1) * 5
                                  }rem`,
                              }
                            : { top: 0 }
                    }
                >
                    <div className="flex items-center justify-between gap-4 font-light">
                        <div className="flex flex-col gap-6">
                            {/* 타이틀 큰글자 */}
                            <h2 className="text-4xl lg:text-5xl">
                                {service.title}
                            </h2>
                            {/* 느슨한 줄간격, 자간 최대, 줄바꿈 이쁘게, 텍스트 흰색 60% */}
                            <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                                {service.description}
                            </p>
                            <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                                {/* --------- service 안에 item 이 배열이기에 다시 map()으로 루핑 */}
                                {service.items.map((item, itemIndex) => (
                                    // --------- 키값을 동적으로 유니크하게 만듬
                                    <div key={`item-${index}-${itemIndex}`}>
                                        <h3 className="flex">
                                            <span className="mr-12 text-lg text-white/30">
                                                0{itemIndex + 1}
                                            </span>
                                            {item.title}
                                        </h3>
                                        {itemIndex <
                                            service.items.length - 1 && (
                                            // 마지막 데이터가 아니면... 하단에 줄을 표시함
                                            <div className="w-full h-px my-2 bg-white/30" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};
export default Services;
