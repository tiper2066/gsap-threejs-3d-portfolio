import React, { useRef } from 'react'; // ************************ useRef
import { useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react'; // ************************ useGSAP
import gsap from 'gsap'; // ************************ GSAP 라이브러리

export function Planet(props) {
    const { nodes, materials } = useGLTF('/models/Planet.glb');
    const shapeContainer = useRef(null); // ************************ 3D 모델을 참조하는 변수 선언
    const shperesContainer = useRef(null); // ************************ 행성 그룹을 참조하는 변수 선언
    const ringContainer = useRef(null); // ************************ 링을 참조하는 변수 선언

    // ****************************** GSAP를 사용한 애님 함수 정의
    useGSAP(() => {
        const tl = gsap.timeline(); //  GSAP Timeline 객체 생성
        // 전체 모델이 위에서 아래로 빠르게 내려오다 서서히 멈춤
        tl.from(shapeContainer.current.position, {
            y: 5, // 상단 5px 위치에서
            duration: 3, // 3초 동안 현재 위치로 내려온다.
            ease: 'circ.out',
        });
        // 작은 행성이 큰 행성 주의를 아래로 부터 돌아서 위에 멈춘다.
        tl.from(
            shperesContainer.current.rotation,
            {
                x: 0,
                y: Math.PI,
                z: -Math.PI,
                duration: 10,
                ease: 'power1.inOut',
            },
            '-=25%' // 이전 애님이 75% 진행되면 애님 시작함
        );
        // 링 컨테이너가 수직으로 있다가 큰원 앞쪽으로 회전하면서 수평으로 된다
        tl.from(
            ringContainer.current.rotation,
            {
                x: 0.8,
                y: 0,
                z: 0,
                duration: 10,
                ease: 'power1.inOut',
            },
            '<' // 이전 링 애님과 동시에 진행
        );
    }, []);

    return (
        // ****************************** group에 참조변수 적용
        <group ref={shapeContainer} {...props} dispose={null}>
            // ****************************** 행성 그룹을 참조 변수 적용
            <group ref={shperesContainer}>
                <mesh // ****************************** 큰 행성
                    geometry={nodes.Sphere.geometry}
                    material={materials['Material.002']}
                    rotation={[0, 0, 0.741]}
                />
                <mesh // ****************************** 작은 행성
                    geometry={nodes.Sphere2.geometry}
                    material={materials['Material.001']}
                    position={[0.647, 1.03, -0.724]}
                    rotation={[0, 0, 0.741]}
                    scale={0.223}
                />
            </group>
            <mesh // 링 테두리
                ref={ringContainer} // **************************** 링 참조 변수 적용
                geometry={nodes.Ring.geometry}
                material={materials['Material.001']}
                rotation={[-0.124, 0.123, -0.778]}
                scale={2}
            />
        </group>
    );
}

useGLTF.preload('/models/Planet.glb');
