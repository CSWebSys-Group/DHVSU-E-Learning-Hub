'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import dhvsuPic1 from '../assets/images/dhvsu-pic-1.jpg';
import dhvsuPic2 from '../assets/images/dhvsu-pic-2.jpg';
import dhvsuPic3 from '../assets/images/dhvsu-pic-3.jpg';
import dhvsuPic4 from '../assets/images/dhvsu-pic-4.jpg';
import dhvsuPic5 from '../assets/images/dhvsu-pic-5.jpg';

const imgs = [
    dhvsuPic1,
    dhvsuPic2,
    dhvsuPic3,
    dhvsuPic4,
    dhvsuPic5,
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: 'spring',
    mass: 3,
    stiffness: 400,
    damping: 50,
};

export const SwipeCarousel = () => {
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    return (
        <>
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${imgIndex * 100}%`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab items-center active:cursor-grabbing w-full relative h-full"
            >
                <Images imgIndex={imgIndex} />
            </motion.div>

            <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </>
    );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        animate={{
                            scale: imgIndex === idx ? 0.95 : 0.85,
                        }}
                        transition={SPRING_OPTIONS}
                        className="h-full w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({
                  imgIndex,
                  setImgIndex,
              }: {
    imgIndex: number;
    setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
            {imgs.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                            idx === imgIndex ? 'bg-neutral-50' : 'border border-white'
                        }`}
                    />
                );
            })}
        </div>
    );
};
