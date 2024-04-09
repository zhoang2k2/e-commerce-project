import { useEffect } from "react";
import Carousel from "../components/Carousel/Carousel";
import Navbar from "../components/Navbar/Navbar";
// import { Slide } from "../types/Slide";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselImage } from "../redux/reducer/HomepageSlide";
import type { RootState } from "../redux/Store";

function HomePage() {
  const dispatch = useDispatch();
  const slides = useSelector((state: RootState) => state.homepage.slides);

  useEffect(() => {
    dispatch(fetchCarouselImage());
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel slides={slides} />
    </div>
  );
}

export default HomePage;
