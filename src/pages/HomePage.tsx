import { useEffect } from "react";
import Carousel from "../components/Carousel/Carousel";
import Navbar from "../components/Navbar/Navbar";
// import { Slide } from "../types/Slide";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselImage } from "../redux/reducer/HomepageSlide";
import type { RootState } from "../redux/Store";
import Feedback from "../components/Feedback/Feedback";
import Commitment from "../components/Commitment/Commitment";

function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const slides = useSelector((state: RootState) => state.homepage.slides);

  useEffect(() => {
    dispatch(fetchCarouselImage());
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel slides={slides} />
      <Commitment />
      <Feedback />
    </div>
  );
}

export default HomePage;
