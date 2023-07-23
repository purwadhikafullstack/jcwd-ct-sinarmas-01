import { Button, Link } from "react-daisyui";
import CarouselItem from "./CarouselItem";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Promotional() {
  const [slide, setSlide] = useState(1);
  const link = useRef(null);
  const length = 3;

  const goToSlide = (s) => setSlide(s);
  const nextSlide = () => goToSlide(slide + 1);
  const prevSlide = () => goToSlide(slide - 1);
  const navigate = useNavigate();

  useEffect(() => {
    if (slide > length) setSlide(1);
    if (slide < 1) setSlide(length);
    link.current?.click();
    if (slide === 1)
      navigate("#");
  }, [slide, navigate]);

  return (
    <div className="flex bg-base-300 flex-row p-6 gap-3 justify-center items-center">
      <Button size="sm" className="rounded-box" onClick={prevSlide}>
        <FaChevronLeft />
      </Button>
      <div className="carousel w-full">
        <CarouselItem id="slide-1" imgClass="w-full" alt="Banner 1" src="/banner-2.jpg" />
        <CarouselItem id="slide-2" imgClass="w-full" alt="Banner 2" src="/banner-3.jpg" />
        <CarouselItem id="slide-3" imgClass="w-full" alt="Banner 3" src="/banner-4.jpg" />
      </div>
      <Button size="sm" className="rounded-box" onClick={nextSlide}>
        <FaChevronRight />
      </Button>
      <Link ref={link} className="hidden" href={`#slide-${slide}`}>Slide {slide}</Link>
    </div>
  );
}
