import React, { useRef, useState } from "react";
import { location, email, phonecall } from "../assets";
import { Footer } from "../Components";
import emailjs from "@emailjs/browser";

const Contect = () => {
  const form = useRef();

  const [userData, setUserData] = useState({
    aboutemail: "",
    description: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      userData.aboutemail.trim().length === 0 ||
      userData.description.trim().length === 0
    ) {
      return alert("All Fields are required.");
    }

    emailjs
      .sendForm(
        "service_ng43nmk",
        "template_n5whqqk",
        userData,
        "tzOrC9B3y97X3UctK"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

      setUserData({})
  };

  const handleonChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full flex flex-col justify-between items-start gap-12 mt-5 font-Poppins">
      <div className="w-full  grid grid-cols-about sm:grid-cols-1 md:gap-5 md:grid-cols-aboutmid place-content-start gap-20 px-64 sm:px-10 md:px-4">
        <div className="w-full h-full px-3 py-7 flex flex-col items-start justify-between gap-6 shadow-xl rounded-lg">
          <div className="  w-full h-[100px] sm:h-[90px] flex flex-col items-start justify-center gap-1 border-b-2 py-4">
            <div className=" w-full flex items-center justify-center">
              <img src={location} alt="Location" className="w-1/4 sm:w-1/6" />
            </div>
            <p className="w-full text-xs sm:text-sm px-4 text-center">
              201 ,Swashtik Socity ,Naranpura, Ahmedabad
            </p>
          </div>

          <div className=" w-full  h-[100px] flex flex-col items-start justify-center gap-1 border-b-2 py-4">
            <div className=" w-full flex items-center justify-center">
              <img src={email} alt="Location" className="w-1/4 sm:w-1/6" />
            </div>
            <p className="w-full text-sm px-4 text-center">
              XYZ@gmail.com <br />
              Sample@gmail.com
            </p>
          </div>

          <div className=" w-full h-[100px] flex flex-col items-start  justify-center gap-1 py-4">
            <div className=" w-full flex items-center justify-center">
              <img src={phonecall} alt="Location" className="w-1/4 sm:w-1/6" />
            </div>
            <p className="w-full text-sm px-4 text-center">
              +91-000000000 <br /> +91-999999999
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-between gap-4 shadow-xl px-5 py-3 rounded-lg">
          <h1 className="font-semibold text-2xl">Just Say Hello!</h1>
          <p className="w-3/4 text-xs sm:w-full">
            Do you fancy saying hi to me or you want to get started with your
            project and you need my help? Feel free to contact me.
          </p>
          <div className="w-full h-full flex items-center justify-center">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="w-full flex flex-col items-center justify-center gap-4 "
            >
              <div className="w-full">
                <input
                  type="email"
                  name="aboutemail"
                  value={userData?.aboutemail}
                  onChange={handleonChange}
                  className="w-full border text-sm placeholder:text-sm px-2 py-2  rounded-lg focus:outline-green-500 focus:border-none"
                  placeholder="Enter Email"
                />
              </div>
              <textarea
                name="description"
                value={userData?.description}
                onChange={handleonChange}
                cols="30"
                rows="8"
                className="border resize-none w-full resize-x-none outline-none px-2 py-2 text-sm focus:border-none focus:outline-green-500 rounded-lg"
              />
              <button
                type="submit"
                className="w-1/5 rounded-lg py-2  bg-green-600"
                onClick={sendEmail}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-[300px] px-4 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.568060525836!2d72.55975347521209!3d23.03962657916187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848b5c490c6b%3A0xf14b0795bcd3f161!2sPolaris%20Building%2C%20Swastik%20Society%20Cross%20Rd%2C%20Swastik%20Society%2C%20Navrangpura%2C%20Ahmedabad%2C%20Gujarat%20380009!5e0!3m2!1sen!2sin!4v1712770113368!5m2!1sen!2sin"
          className="w-full h-full rounded-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Contect;
