'use client';
import { useEffect, useRef, useState } from 'react'; //   useEffect 훅
import { socials } from '@/constants'; //  socials 데이터 가져옴
import gsap from 'gsap'; //  GSAP 라이브러리
import { useGSAP } from '@gsap/react'; //  useGSAP Hook
import Link from 'next/link'; //  next.js Link 라이브러리

const Navbar = () => {
    const navRef = useRef<HTMLDivElement>(null); // nav 요소 참조
    const linksRef = useRef<HTMLDivElement[]>([]); // link를 위한 배열 요소 참조
    const contactRef = useRef<HTMLDivElement>(null); // Navbar의 푸터(contact) 요소 참조
    const topLineRef = useRef<HTMLSpanElement>(null); //  햄버거아이콘 상단라인 요소 참조
    const bottomLineRef = useRef<HTMLSpanElement>(null); //  햄버거아이콘 하단라인 요소 참조
    const tl = useRef<GSAPTimeline>(null); //  GSAP Timeline 을 저장할 참조
    const [isOpen, setIsOpen] = useState(false); //  열고,닫기 상태 변수
    const iconTl = useRef<GSAPTimeline>(null); //  햄버거 아이콘 GSAP Timeline 을 저장할 참조
    const [showBurger, setShowBurger] = useState(true); //  햄버거 아이콘 표시 여부 상태(기본 보임)

    //  GSAP를 사용한 애님 함수 정의
    useGSAP(() => {
        // Navbar - 너비 100%로 설정(x축으로 100% 이동하면 우측으로 완전 숨겨짐)
        gsap.set(navRef.current, { xPercent: 100 });
        // 메뉴 링크들과 SNS 영역을 살짝 좌측으로 이동시켜서 숨김
        gsap.set([linksRef.current, contactRef.current], {
            autoAlpha: 0, // opacity 0로 설정
            x: -20, // 좌측으로 20이동
        });

        // GSAP Timeline 을 생성하고 tl.current에 저장
        tl.current = gsap
            .timeline({ paused: true }) // 전체 애니메이션 일시 정지시킴(나중 제어를 위해)
            // Navbar 애니메이션 설정(처음에 숨기기 위함)
            .to(navRef.current, {
                xPercent: 0, // x축 0% 위치로 이동, 밀려있던 영역이 모두 보이게함
                duration: 1, // 1초 동안 애님
                ease: 'power3.out', // 효과
            })
            // 개별 메뉴들의 애니메이션 설정
            .to(
                linksRef.current,
                {
                    autoAlpha: 1, // 보이게함
                    x: 0, // 원래자리로 이동(좌에서 우로)
                    stagger: 0.1, // 0.1초 간격으로 순차적으로 진행
                    duration: 0.5, // 0.5초 동안 애님
                    ease: 'power2.out', // 효과
                },
                '<' // 이전 to() 애니메이션과 동시에 시작함
            )
            // SNS 컨테이너 애니메이션 설정 -
            .to(
                contactRef.current,
                {
                    autoAlpha: 1, // 보이게함
                    x: 0, // 원래자리로 이동(좌에서 우로)
                    duration: 0.5, // 0.5초 동안 애님
                    ease: 'power2.out', // 효과
                },
                '<+0.5' // 이전 애님시작 후 0.2초 후에 시작함
            );

        //  햄버거 아이콘 라인 형태 변형 애니메이션
        iconTl.current = gsap
            .timeline({ paused: true })
            // 위쪽라인은 45도 회전하고 아래로 3.3 이동
            .to(topLineRef.current, {
                rotate: 45,
                y: 3.3,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            // 아래쪽 라인은 -45로 회전하고 위로 3.3 이동
            .to(
                bottomLineRef.current,
                {
                    rotate: -45,
                    y: -3.3,
                    duration: 0.3,
                    ease: 'power2.inOut',
                },
                '<' // 이전 애님과 동시에 진행
            );
    }, []); // 한번만 실행

    //  햄버거 아이콘 Navbar 열고 닫는 토글 핸들러 함수
    const toggleMenu = () => {
        if (isOpen) {
            tl.current?.reverse(); // 열린 상태면 애님을 거꾸로해서 닫히게 함
            iconTl.current?.reverse(); //  열린 상태면 = 로 애님 시작
        } else {
            tl.current?.play(); // 닫힌 상태면 애님을 시작해서 열리게함
            iconTl.current?.play(); //  닫힌상태면 X 로 애님 시작
        }
        setIsOpen(!isOpen); // 열고, 닫기 상태 변경
    };

    //  스크롤 시 햄버거 아이콘 표시 제어 함수
    useEffect(() => {
        let lastScrollY = window.scrollY; // 가장 최근 스크롤 Y 값 저장
        // ---------------------------- 스크롤 이벤트 핸들러 콜백 함수
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // 현재 스크롤 Y 값 저장
            // showBurger 변수에 현재 스크롤 Y 값이 마지막 스크롤 Y 값보다 작은 값이면 true, 또는 현재 스크롤 Y 값이 10보다 작은 값이면 true, 나머지 경우엔 false
            setShowBurger(currentScrollY < lastScrollY || currentScrollY < 10); // 즉, 스크롤이 올라가거나 거의 최상단에 있다면 true, 내려가면 false 로 설정함
            lastScrollY = currentScrollY; // 이전 스크롤 위치를 현재 위치로 업데이트함
        };
        // 스크롤 이벤트 핸들러 추가
        window.addEventListener('scroll', handleScroll, { passive: true }); // handleScroll 함수를 콜백, passive: true(스크롤 성는 최적화)
        return () => window.removeEventListener('scroll', handleScroll); // 언마운트 시 메모리에서 제거
    }, []); // 한번만 실행

    return (
        <>
            {/* 위치 고정, 수직패널 형태, 상하 끝배치(메뉴상단, 푸터는 하단), 패딩 112 40, 간격 40, 768이상에서 너비 50%, left 50%(우측 절반영역차지) */}
            <nav
                className="fixed z-50 flex flex-col justify-between w-full h-full px-10 py-28 gap-y-10 bg-black text-white/80 uppercase md:w-1/2 md:left-1/2"
                ref={navRef}
            >
                {/* 메뉴그룹 : 수직정렬, 너비가 클수록 글자도 커지게함  */}
                <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
                    {['home', 'services', 'about', 'work', 'contact'].map(
                        (section, index) => (
                            <div
                                key={index}
                                ref={(e) => {
                                    // linksRef.current 가 null 이 아니면 현재 요소를 linksRef 배열에 할당함
                                    if (e) linksRef.current[index] = e;
                                }}
                            >
                                <Link
                                    className="transition-all duration-300 cursor-pointer hover:text-white"
                                    href={`#${section}`}
                                >
                                    {section}
                                </Link>
                            </div>
                        )
                    )}
                </div>
                {/* 푸터(이메일 / SNS), 768이상 수평정렬 */}
                <div
                    ref={contactRef}
                    className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
                >
                    <div className="font-light">
                        {/* 자간을 넓게하고, 반투명 흰색 */}
                        <p className="tracking-wider text-white/50">E-mail</p>
                        {/* 자간을 최대로 하고, 소문자, 줄바꿈 시 줄바꿈 지점을 가능한 어색하지 않게함 */}
                        <p className="text-xl tracking-widest lowercase text-pretty">
                            JohnDoe@gmail.com
                        </p>
                    </div>
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">
                            Social Media
                        </p>
                        {/* 수직 정렬, 768 이상에서 수평정렬 */}
                        <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    // sm 사이즈, 대문자, 자간 최대, 줄간격 넉넉하게, 마우스오버 시 흰색, 색변화 0.3s 동안 부드럽게.
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {'{ '}
                                    {social.name}
                                    {' }'}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            {/*  햄버거 아이콘 */}
            <div
                className="fixed top-4 right-10 z-50 flex flex-col items-center justify-center gap-1 
                transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20"
                onClick={toggleMenu} //  햄버거 아이콘 토글 핸들러 함수 적용
                //  showBurger 상태값에 따라 슬라이딩시 아이콘을 clip-path 스타일 속성을 이용해서 보이고 숨김
                style={
                    showBurger
                        ? { clipPath: 'circle(50% at 50% 50%)' } // true (스크롤이 올라가면), 클리핑 영역을 중심에서 50% 큰 원으로 설정, 즉 보임
                        : { clipPath: 'circle(0% at 50% 50%)' } // false (스크롤이 내려가면), 클리핑 영역을 중심에서 0% 크기의 원으로 설정, 즉 숨김
                }
            >
                {/* 8 x 0.5 길이의 흰색라인, 양끝 둥근 모서리, 기준점 중앙 */}
                <span
                    className="block w-8 h-0.5 bg-white rounded-full origin-center"
                    ref={topLineRef}
                ></span>
                <span
                    className="block w-8 h-0.5 bg-white rounded-full origin-center"
                    ref={bottomLineRef}
                ></span>
            </div>
        </>
    );
};
export default Navbar;
