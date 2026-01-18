import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const Marquee = () => {
    const textData = [
        { "title": "Multi Speciality Treatments & Doctors" },
        { "title": "Lab Testing Services" },
        { "title": "Medicines & Supplies" },
        { "title": "Hospitals & Clinics" },
        { "title": "Health Care Services" },
        { "title": "Talk to Doctors" },
        { "title": "Home Care Services" }
    ]

    const containerRef = useRef(null) 
    const marqueeRef = useRef(null)
    const tweenRef = useRef(null) // 1. Create a ref to store the animation

    useGSAP(() => {
        const marquee = marqueeRef.current;
        const totalWidth = marquee.offsetWidth / 2;

        // 2. Assign the animation to the tweenRef
        tweenRef.current = gsap.from(marquee, {
            x: -totalWidth,
            duration: 50,
            ease: "none",
            repeat: -1,
        })
    }, { scope: containerRef })

    // 3. Define handler functions
    const handleMouseEnter = () => tweenRef.current?.pause()
    const handleMouseLeave = () => tweenRef.current?.play()

    return (
        <div 
            ref={containerRef} 
            className="overflow-hidden w-full cursor-pointer"
            onMouseEnter={handleMouseEnter} // 4. Attach events
            onMouseLeave={handleMouseLeave}
        >
            <div 
                ref={marqueeRef} 
                className='flex bg-gradient-to-r from-primary to-secondary text-white w-max'
            >
                {[...textData, ...textData].map((item, index) => (
                    <div key={index} className='flex items-center shrink-0'>
                        <p className='text-nowrap hover:text-green-500 p-3 text-lg font-medium'>{item.title}</p>
                        <div className='w-12 h-1 bg-gray-300/40 mx-4'></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Marquee