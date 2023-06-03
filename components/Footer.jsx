import React from "react";

function Footer() {
  return (
    <>
      <section className="w-screen text-sm md:text-xl lg:text-2xl font-bold ">
        <div className="flex flex-cols-2">
          <div className="w-full flex flex-col text-gray-900 justify-center lg:x-12 md:p-12 py-5 px-8">
            <h3>GROUP 12</h3>
            <h4>Be Professional With Ease</h4>
            <h4>Over Your Resume Profile</h4>
          </div>
          <div className="w-full flex flex-col justify-center text-white bg-primary-focus lg:p-12 md:p-12 py-5 px-8">
            <h3>Contact Us</h3>
            <h4>T: 0969 420 5678</h4>
            <h4>E: group12@test.com</h4>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
