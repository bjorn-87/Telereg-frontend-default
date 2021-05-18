import React, {useState} from 'react';
import UpArrow from '../../icons/2x/outline_arrow_circle_up_black_36dp.png';
import './ScrollArrow.css';


const ScrollArrow = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <div
            className="scrollTop"
            onClick={scrollTop}
            style={{height: 40, display: showScroll ? 'flex' : 'none'}}
        ><img src={UpArrow} alt="Arrow"/></div>
    );
};

export default ScrollArrow;
