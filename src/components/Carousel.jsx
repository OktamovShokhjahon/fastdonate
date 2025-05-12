import { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

function FocusOnSelect() {
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container mx-auto my-4" style={{ maxWidth: "90%" }}>
      <Slider ref={sliderRef} {...settings}>
        {[1, 2].map((_, index) => {
          return (
            <div
              key={index}
              className="relative flex justify-center items-center h-[30vh] sm:h-[30vh] md:h-[60vh] lg:h-[70vh]"
            >
              <img
                src="/mobile-legends-carousel.jpg"
                alt={t("carousel.title")}
                className="absolute left-0 top-0 w-full h-full object-cover"
              />

              <div className="absolute left-0 top-0 inset-0 bg-black bg-opacity-50 z-1"></div>

              <div className="absolute z-2 top-[15%] left-[8%] sm:top-[10%] sm:left-[6%] md:top-[200px] md:left-[40px] px-3 md:px-0">
                <h1 className="text-white text-lg sm:text-base md:text-3xl font-bold mb-3 leading-tight md:leading-normal">
                  {t("carousel.title")}
                </h1>
                <p className="mb-3 text-xs sm:text-xs md:text-sm leading-snug md:leading-normal">
                  {t("carousel.description")}
                </p>
                <Link
                  to="/mobile-legends"
                  className="text-white bg-blue-700 hover:bg-blue-500 transition px-2 py-1 sm:px-3 sm:py-1 md:px-5 md:py-2 rounded text-xs sm:text-sm md:text-base"
                >
                  {t("carousel.button")}
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default FocusOnSelect;
