import React, { useEffect, useRef } from 'react';
import {jQuery,$} from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import jqueryMin from '../js/jquery.min';

const OwlCarouselComponent = () => {
    const carouselRef = useRef(null);
    const cards = [
        {
            name: 'University of California',
            description: 'Highly ranked public university in California.',
            detailedDescription: 'The University of California is known for its world-class research and academic excellence. It offers a variety of undergraduate and graduate programs in diverse fields.',
            rank: '1st in Public Universities (U.S.)'
        },
        {
            name: 'Cincinnati University',
            description: 'Top-tier university in Ohio.',
            detailedDescription: 'The University of Cincinnati is renowned for its engineering programs and innovative teaching methods. It has a vibrant campus and offers multiple research opportunities.',
            rank: '75th in National Universities (U.S.)'
        },
        {
            name: 'University of Arizona',
            description: 'Research-focused university in the Southwest.',
            detailedDescription: 'Located in Tucson, the University of Arizona is famous for its research in agriculture and environmental science. It also has a strong business and law school.',
            rank: '115th in National Universities (U.S.)'
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.next();
            }
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <OwlCarousel ref={carouselRef} items={1} loop margin={10} autoplay={true} autoplayTimeout={3000} autoplayHoverPause={true}>
            {cards.map((card, index) => (
                <div key={index} className="item">
                    <div className="icon">
                  <img src="assets/images/service-icon-03.png" alt=""/>
                </div>
                <div className="down-content">
                    <h4>{card.name}</h4>
                    <p>{card.description}</p>
                </div>
                </div>
            ))}
        </OwlCarousel>
    );
};

export default OwlCarouselComponent;
