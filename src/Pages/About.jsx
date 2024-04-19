import React from "react";
import { Footer } from "../Components";

import {
  aboutPhoto1,
  aboutPhoto2,
  aboutPhoto3,
  leaf,
  headCall,
  packageicon,
  shoppingbag,
  stars,
  truck,
} from "../assets/AboutAssets";

const About = () => {
  return (
    <div className="w-full flex flex-col items-start justify-between gap-6">
      <div className="w-full flex flex-col justify-between items-start gap-10 px-20 sm:px-10 mt-3 font-Poppins overflow-hidden">
        {/* Componenet 1 */}
        <div className="w-full flex sm:flex-col md:flex-col justify-between items-center gap-2 px-44 sm:px-0 sm:gap-4 md:px-0 md:gap-3 ">
          <div className="sm:block md:block hidden">
            <img src={aboutPhoto1} alt="" className="w-full" />
          </div>
          <div className="w-full flex flex-col justify-between items-start gap-3">
            <h1 className="text-5xl font-semibold">
              100% Trusted <br /> Organic Food Store
            </h1>
            <p className="md:w-[550px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam, eligendi optio vero iste aliquam dolorum
              natus amet voluptatibus facere magni laudantium. Magni quibusdam,
              incidunt possimus expedita vitae fugit id!
            </p>
          </div>
          <div className="sm:hidden md:hidden block">
            <img src={aboutPhoto1} alt="" />
          </div>
        </div>
        {/* Componenet 2 */}
        <div className="w-full flex sm:flex-col md:flex-col justify-between items-center gap-2 px-10 sm:px-2 sm:gap-2 md:px-0 md:gap-4">
          <div>
            <img src={aboutPhoto2} alt="" />
          </div>
          <div className="w-full flex flex-col justify-between items-start gap-3">
            <h1 className="text-5xl font-semibold">
              100% Trusted <br />
              Organic Food Store
            </h1>
            <p className="w-[550px] sm:w-[350px] md:w-[500px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam
            </p>
            <div className="w-[550px] grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className=" flex items-center justify-start gap-3 ">
                <div className=" w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={leaf} alt="" className="w-full " />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">100% Organic food</h1>
                  <p className="text-sm">100% healthy & Fresh food.</p>
                </div>
              </div>

              <div className=" flex items-center justify-start gap-3 ">
                <div className="w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={headCall} alt="" className="w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">Great Support 24/7</h1>
                  <p className="text-sm">Instant access to Contact</p>
                </div>
              </div>

              <div className=" flex items-center justify-start gap-3">
                <div className=" w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={stars} alt="" className="w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">Customer Feedback</h1>
                  <p className="text-sm">Our happy customer</p>
                </div>
              </div>

              <div className=" flex items-center justify-start gap-3 ">
                <div className=" w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={shoppingbag} alt="" className="w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">100% Sucure Payment</h1>
                  <p className="text-sm">We ensure your money is save</p>
                </div>
              </div>

              <div className=" flex items-centerjustify-start gap-3 ">
                <div className=" w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={truck} alt="" className="w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">Free Shipping</h1>
                  <p className="text-sm">Free shipping with discount.</p>
                </div>
              </div>

              <div className=" flex items-center justify-start gap-3 ">
                <div className=" w-[60px] flex items-center justify-center bg-green-200 p-4 rounded-full">
                  <img src={packageicon} alt="" className="w-full" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-sm">100% Organic food</h1>
                  <p className="text-sm">100% healthy & Fresh food.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Componenet 3 */}
        <div className="w-full flex sm:flex-col md:flex-col justify-between items-center gap-2 px-44 sm:px-0 md:px-0 ">
          <div className="w-full flex flex-col justify-between items-start gap-3">
            <div className=" sm:block md:block hidden">
              <img src={aboutPhoto3} alt="" />
            </div>
            <h1 className="text-5xl font-semibold">
              We Delivered, You <br /> Enjoy Your Order.
            </h1>
            <p className="md:w-[550px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              praesentium voluptas ratione deleniti architecto nemo at atque!
              Similique, aperiam quam, eligendi optio vero iste aliquam dolorum
              natus amet voluptatibus facere magni laudantium. Magni quibusdam,
              incidunt possimus expedita vitae fugit id!
            </p>
          </div>
          <div className=" sm:hidden md:hidden block">
            <img src={aboutPhoto3} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
