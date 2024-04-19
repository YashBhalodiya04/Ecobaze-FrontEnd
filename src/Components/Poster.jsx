import React from "react";
import { GoArrowRight } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { posterimage, posterimage2, posterimage3 } from "../assets/index";
import {Link} from "react-router-dom"

const Poster = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
    cssEase: "linear",
    accessibility: true,
  };
  return (
    <div className="w-full flex items-center justify-between bg-gray-100 h-[400px] px-11  mt-8 rounded font-Poppins sm:px-0">
      <Slider {...settings} className="w-full">
        {/* Slide 1 */}
        <div className="w-full flex items-center  p-4 h-[300px] ">
          <div className="flex flex-col items-start justify-center h-full gap-3 relative z-10">
            <p className="text-[10px] text-green-600 sm:text-sm ">
              WELCOME TO SHOPERY
            </p>
            <h1 className="text-5xl font-bold  sm:text-3xl">
              Fresh & Healthy <br /> Organic Food
            </h1>
            <Link to={"/shop"} className="flex items-center gap-3 justify-center text-white  border bg-green-600 rounded-full py-3 px-6 hover:bg-white hover:border-green-400 hover:text-green-500 sm:py-2 sm:px-3 sm:text-sm">
              Shop now <GoArrowRight className="text-center" />
            </Link>
          </div>
          <div className="w-full absolute top-0 right-48 h-full sm:right-0 md:right-10">
            <img src={posterimage} alt="" width={450} className="float-right" />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="w-full flex items-center  p-4 h-[300px]  ">
          <div className="flex flex-col items-start justify-center h-full gap-3 relative z-10">
            <p className="text-[10px] text-green-600 sm:text-sm">
              WELCOME TO SHOPERY
            </p>
            <h1 className="text-5xl font-bold sm:text-3xl ">
              Fresh & Healthy <br /> Organic Food
            </h1>
            <Link to={"/shop"} className="flex items-center gap-3 justify-center  border text-white bg-green-600 rounded-full py-3 px-6 hover:bg-white hover:border-green-400 hover:text-green-500 sm:py-2 sm:px-3 sm:text-sm">
              Shop now <GoArrowRight />
            </Link>
          </div>
          <div className="w-full absolute top-0 right-56 h-full sm:right-0 sm:top-[-30px] md:right-10">
            <img
              src={posterimage2}
              alt=""
              width={350}
              className="float-right"
            />
          </div>
        </div>

        {/* Slide 3 */}
        <div className="w-full flex items-center  p-4 h-[300px] ">
          <div className="flex flex-col items-start justify-center h-full gap-3 relative z-10">
            <p className="text-[10px] text-green-600 sm:text-sm">
              WELCOME TO SHOPERY
            </p>
            <h1 className="text-5xl font-bold sm:text-3xl">
              Fresh & Healthy <br /> Organic Food
            </h1>
            <Link to={"/shop"} className="flex items-center gap-3 justify-center  border text-white bg-green-600 rounded-full py-3 px-6 hover:bg-white hover:border-green-400 hover:text-green-500 sm:py-2 sm:px-3 sm:text-sm">
              Shop now <GoArrowRight />
            </Link>
          </div>
          <div className="w-full absolute top-0 right-48 h-full sm:right-0 md:right-10">
            <img
              src={posterimage3}
              alt=""
              width={450}
              className="float-right"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Poster;
