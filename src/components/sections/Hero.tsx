'use client';
import { useRef } from 'react';
import AnimatedTextLines from '../common/AnimatedTextLines';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber'; //  Three.js를 사용한 Canvas 컴포넌트
import { Planet } from '../common/Planet'; //  Planet 컴포넌트
import { Environment, Float, Lightformer } from '@react-three/drei'; // Three.js를 사용한 Environment, Float, Lightformer 컴포넌트
import { useMediaQuery } from 'react-responsive'; // ********************** useMediaQuery Hook

const Hero = () => {
    const contextRef = useRef<HTMLDivElement>(null); // 클리핑 마스크 컨테이너 요소 참조
    const headerRef = useRef<HTMLDivElement>(null); // 애니메이션 대상 헤더 요소 참조
    //  컴포넌트로 전달할 문장의 줄바꿈 처리를 여기서 해준다.
    const aboutText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Fuga ad autem accusantium doloribus, obcaecati quasi quia,
asperiores modi omnis fugiat perferendis magni, aperiam.`;
    const isMobile = useMediaQuery({ maxWidth: 853 }); // ****************** useMediaQuery Hook, 853px 이하 true

    // GSAP를 사용한 애님 함수 정의
    useGSAP(() => {
        const tl = gsap.timeline(); //  GSAP Timeline 객체 생성
        // 헤더 전체 컨텐츠 요소에 애님 적용
        tl.from(contextRef.current, {
            y: '50vh', // 50vh 아래에서 시작
            duration: 1,
            ease: 'circ.out',
        });
        tl.from(
            headerRef.current,
            {
                opacity: 0,
                y: '200', // 50vh 아래에서 시작
                duration: 1,
                ease: 'circ.out',
            },
            '<+0.2' // 이전 애님 0.2초 뒤에 시작
        );
    }, []);

    return (
        <section className="flex flex-col justify-end min-h-screen">
            {/* 클리핑 마스크 요소 참조용 컨테이너 */}
            <div ref={contextRef}>
                {/* 클리핑 마스크 요소: 전체 사각 영역 */}
                <div
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                >
                    {/* 애니메이션 대상: 헤더 */}
                    <div
                        ref={headerRef}
                        className="flex flex-col justify-center gap-12 sm:gap-16 pt-16"
                    >
                        <p className="text-sm font-light tracking-[0.5rem] uppercase px-10 text-black">
                            404 No Bugs Found
                        </p>
                        <div className="px-10">
                            {/* 애니메이션 대상 타이틀 텍스트: banner-text-responsive 클래스로 반응형 텍스트 크기 조정되는 헤드카피 */}
                            <h1 className="banner-text-responsive flex flex-col flex-wrap gap-12 sm:gap-16 md:block text-black uppercase pb-3">
                                Ali Sanati
                            </h1>
                        </div>
                    </div>
                </div>
                {/* 애니메이션 대상 : 문장 컨테이너 */}
                <div className="relative px-10 text-black">
                    {/* 상단 2px 라인 */}
                    <div className="absolute inset-x-0 border-t-2" />
                    {/* 문장 컨테이너 - 우측 정렬 */}
                    <div className="py-12 sm:py-16 text-end">
                        {/*  컴포넌트로 대체함 : 애니메이션 대상 문장 텍스트 */}
                        <AnimatedTextLines
                            text={aboutText}
                            className="font-light uppercase value-text-responsive"
                        />
                    </div>
                </div>
            </div>
            {/* figure: 이미지, 그림, 도표, 사진, 코드 목록 등으로 없어도 무방한 독립된 콘텐츠 */}
            <figure className="absolute inset-0 w-screen h-screen -z-50">
                <Canvas
                    shadows // 그림자
                    camera={{
                        position: [0, 0, -10], // x,y,z : z 축 기준 뒤로 10만큼 떨어진 위치
                        fov: 17.5, // 시야각, 값이 클수록 멀어져 보임
                        near: 1, // 근거리 기준: 1보다 가까우면 숨김
                        far: 20, // 원거러 기준: 20보다 멀면 숨김
                    }}
                >
                    {/* -------------------------- 조명 설정 -------------------------- */}
                    {/* ------------- 주변광 조명 추가, 강조 0.5 (회색) */}
                    <ambientLight intensity={0.5} />
                    {/*  내부 요소를 떠다니는 효과 추가, 흔들리는 속도 */}
                    <Float speed={0.5}>
                        {/*  Planet 컴포넌트 추가 **************************** 모바일 or PC에서의 크기 설정 */}
                        <Planet scale={isMobile ? 0.6 : 1} />
                    </Float>
                    {/*------------- 조명을 위한 환경 추가, 해상도 256 (밝은흰색)  */}
                    <Environment resolution={256}>
                        {/* {/*------------- 조명 컨테이너 */}
                        <group rotation={[-Math.PI / 3, 4, 1]}>
                            {/* {/*------------- 조명형성기 추가 - 실질적인 조명 */}
                            <Lightformer
                                form={'circle'} // 원형 보조광 - 좌상
                                intensity={2} // 강도 2
                                position={[0, 5, -9]} // 조명위치 x,y,z
                                scale={10} // 조명 범위 크기
                            />
                            <Lightformer
                                form={'circle'} // 원형 주광 - 좌앞
                                intensity={2} // 강도 2
                                position={[0, 3, 1]} // 조명위치 x,y,z
                                scale={10} // 조명 범위 크기
                            />
                            <Lightformer
                                form={'circle'} // 원형 보조광 - 우하
                                intensity={2} // 강도 2
                                position={[-5, -1, -1]} // 조명위치 x,y,z
                                scale={10} // 조명 범위 크기
                            />
                            <Lightformer
                                form={'circle'} // 원형 보조광 - 우상
                                intensity={2} // 강도 2
                                position={[10, 1, 0]} // 조명위치 x,y,z
                                scale={16} // 조명 범위 크기
                            />
                        </group>
                    </Environment>
                </Canvas>
            </figure>
        </section>
    );
};
export default Hero;
