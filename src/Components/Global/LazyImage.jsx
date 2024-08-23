import React, { useRef, useEffect } from 'react';
import placeholderImage from '../../assets/img/placeholder.png';

//dev: LazyLoadImage  Component
const LazyLoadImage = ({ src, alt, placeholder, width, height,marginLeft,paddingBottom,...props }) => {
    const imageRef = useRef(null);

    useEffect(() => {
        let observer;
        let didCancel = false;

        const setObserver = () => {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        if (!didCancel) {
                            const lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImage.removeAttribute("data-src");
                            observer.unobserve(lazyImage);
                        }
                    }
                });
            });
        };

        const checkImage = () => {
            if (imageRef.current) {
                observer.observe(imageRef.current);
            }
        };

        setObserver();
        checkImage();

        return () => {
            didCancel = true;
            observer.disconnect();
        };
    }, [imageRef]);

    return (
        <img
            ref={imageRef}
            data-src={src}
            className="lazy img-fluid mt-4"
            src={placeholder ? placeholder : placeholderImage}
            alt={alt}
            style={{height:`${height}`,width:`${width}`,marginLeft:`${marginLeft}`,paddingBottom:`${paddingBottom}`}}
            {...props}
        />
    );
};

export default LazyLoadImage;