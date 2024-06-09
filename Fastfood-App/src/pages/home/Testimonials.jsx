import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md: w-1/2">
          <img src="/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle"> Testimonials</p>
            <h2 className="title"> What Our Customers says About Us</h2>
            <blockquote className="my-5 text-[#807e7e]">
              "I had the pleasure of dining at FastFoood last night, and I'm
              still craving about the experience! The attention to detail in
              presentation and service was impeccable"
            </blockquote>

            {/* Comment Avatar */}
            <div className="flex items-center gap-2 flex-wrap">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="testimonials/testimonial1.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="/testimonials/new passport.jpg" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="testimonials/testimonial3.png" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="/testimonials/CEO.jpeg" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-12 bg-neutral text-neutral-content">
                  <span>+99</span>
                </div>
              </div>
            </div>
              <div className="space-y-1">
              <h5 className="text-lg font-semibold">Costumer Feedback</h5>
              <div className="flex items-center gap-2">
                <FaStar  className=" text-yellow-400"/>
                <span className="font-medium">4.9</span><span className="text-[#807e7e]">(17.9k Reviews)</span>
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
