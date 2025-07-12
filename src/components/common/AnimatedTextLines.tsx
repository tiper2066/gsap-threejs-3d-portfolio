'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react'; // ************************** useGSAP Hook
import gsap from 'gsap'; // ************************** GSAP 라이브러리
import { ScrollTrigger } from 'gsap/all'; // ************************** ScrollTrigger 라이브러리

gsap.registerPlugin(ScrollTrigger); // ************************** ScrollTrigger 라이브러리를 GSAP에 등록함

// 전달할 props 타입 선언
interface AnimatedTextLinesProps {
    text: string;
    className: string;
}
// 애니메이션 문구와 클래스를 전달받음
const AnimatedTextLines = ({ text, className }: AnimatedTextLinesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]); // ***************** 라인애님을 위한 배열 요소 참조
    // 전달받은 text 를 줄 단위로 분리한뒤, 양끝을 trim했을때 빈문자열이 아닌 것만 배열로 저장함
    const lines = text.split('\n').filter((line) => line.trim() !== '');

    // ***************************** GSAP를 애님 함수 정의
    useGSAP(() => {
        // lineRefs 타입이 HTMLSpanElement 또는 null 이 될 수 있으므로 null 이 아닌 HTMLSpanElement 타입 요소만 추출해야 함
        const targetElements = lineRefs.current.filter(
            (el): el is HTMLSpanElement => el !== null
        );

        if (targetElements.length > 0) {
            gsap.from(targetElements, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    // start: 'top bottom', 대상요소의 상단이 화면 하단에 이를때 애님 시작
                    // end: 'bottom top', 대상요소의 하단이 화면 상단에 이를 때 애님 종료
                    // markers: true, // 디버깅용
                },
            });
        }
    }, [lines]);

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    ref={(el) => {
                        lineRefs.current[index] = el; // 인덱스 위치에 저장
                    }}
                    className="block leading-relaxed tracking-wide text-pretty"
                >
                    {line}
                </span>
            ))}
        </div>
    );
};

export default AnimatedTextLines;
