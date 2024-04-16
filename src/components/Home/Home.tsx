import { useDispatch, useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";
import Commitment from "../Commitment/Commitment";
import Feedback from "../Feedback/Feedback";
import {
  fetchCarouselImage,
  selectHomepageState,
} from "../../redux/reducer/HomepageSlide";
import { useEffect } from "react";

function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { slides } = useSelector(selectHomepageState);

  useEffect(() => {
    dispatch(fetchCarouselImage());
  }, []);

  return (
    <>
      <Carousel slides={slides} />
      <Commitment />
      <Feedback />
    </>
  );
}

export default Home;
