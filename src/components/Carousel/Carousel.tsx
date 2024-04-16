import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./carousel.scss";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import type { Slide } from "../../redux/reducer/HomepageSlide";

type CarouselProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides: Slide[];
};

function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);

  const toPrev = () => {
    setCurrent(current === 1 ? slides.length : current - 1);
  };

  const toNext = () => {
    setCurrent(current === slides.length ? 1 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === slides.length ? 1 : current + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="carousel-container">
        {Array.isArray(slides) &&
          slides.map((slide: Slide) => {
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
        <div className="carousel-title">
          <h2>DA KATTY</h2>
          <p>Looking for something beautiful?</p>
          <p>
            This is a right place where you find the cutest things in the world
            !!
          </p>
          <button>Explore now</button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
