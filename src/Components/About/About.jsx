import React from "react";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

export default function About() {
    return (
        <div className=" bg-white font-sans selection:bg-gray-900 selection:text-white">
            <HeroSection />
            <AboutSection />
        </div>
    );
}
