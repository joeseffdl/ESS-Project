import React from "react";

function Footer() {
    return (
        <>
            <section className="w-screen md:text-2xl font-bold">
                <div className="flex flex-cols-2">
                    <div className="w-full flex flex-col justify-center text-primary-focus lg:p-12 md:p-8 p-4">
                        <h3>GROUP 12</h3>
                        <h4>Document with ease over your</h4>
                        <h4>Research Journal</h4>
                    </div>
                    <div className="w-full flex flex-col justify-center px-5 text-accent bg-neutral-focus">
                        <h3>Contact Us</h3>
                        <h4>T: 0969 420 5678</h4>
                        <h4>E: group12@test.com</h4>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer;
