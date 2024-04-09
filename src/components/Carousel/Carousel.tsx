import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Slide } from "../../types/Slide";
import "./carousel.scss";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type CarouselProps = {
  slides: Slide[];
};

function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);

  const toPrev = () => {
    setCurrent(current === 1 ? slides.length : current - 1);
  };

  const toNext = () => {
    setCurrent(current === slides.length ? 1 : current + 1);
    console.log(current);
  };

  return (
    <>
      <div className="carousel-container">
        {slides.map((slide) => {
          return (
            <div
              className={
                current.toString() === slide.id
                  ? "carousel-card carousel-card-active"
                  : "carousel-card"
              }
              key={slide.id}
            >
              <img src={slide.image} alt={`img ${slide.id}`} />
            </div>
          );
        })}
        <div className="carousel-btn">
          <button onClick={toPrev}>
            <FontAwesomeIcon icon={faLessThan} />
          </button>
          <button onClick={toNext}>
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
