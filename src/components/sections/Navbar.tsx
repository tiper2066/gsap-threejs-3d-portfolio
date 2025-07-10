'use client';
import { useRef } from 'react';

const Navbar = () => {
    const navRef = useRef<HTMLDivElement>(null); // nav 요소 참조
    const linksRef = useRef<HTMLDivElement[]>([]); // link를 위한 배열 요소 참조
    const contactRef = useRef<HTMLDivElement>(null); // contact 요소(푸터) 참조
    return (
        // 위치 고정, 수직패널 형태, 상하 끝배치(메뉴상단, 푸터는 하단), 패딩 112 40, 간격 40, 768이상에서 너비 50%, left 50%(우측 절반영역 차지)
        <div
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
                                // linksRef.current 가 null 이 아니면 현재 요소를 linksRef 배열에 할당한다.
                                if (e) linksRef.current[index] = e;
                            }}
                        >
                            <a
                                className="transition-all duration-300 cursor-pointer hover:text-white"
                                href="#"
                            >
                                {section}
                            </a>
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
                    <p className="tracking-wider text-white/50">E-mail</p>
                    {/* 자간을 최대로 하고, 소문자로, 줄바꿈 시 줄바꿈지점을 가능한 어색하지 않게함 */}
                    <p className="text-xl tracking-widest lowercase text-pretty">
                        JohnDoe@gmail.com
                    </p>
                </div>
                <div className="font-light">
                    <p className="tracking-wider text-white/50">Social Media</p>
                    {/* 자간을 최대로 하고, 소문자로, 줄바꿈 시 줄바꿈지점을 가능한 어색하지 않게함 */}
                    <div className="flex flex-col flex-wrap md:flex-row gap-x-2"></div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
