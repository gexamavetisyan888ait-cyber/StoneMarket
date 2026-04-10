import React from "react";
// Համոզվիր, որ այս կոմպոնենտները ևս ունեն .tsx ընդլայնում
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

/**
 * React.FC (Functional Component) տիպավորումը կամ ուղղակի ֆունկցիայի սահմանումը 
 * երկուսն էլ ընդունելի են TypeScript-ում:
 */
export default function About(): React.JSX.Element {
    return (
        <div className="bg-white font-sans selection:bg-gray-900 selection:text-white">
            <HeroSection />
            <AboutSection />
        </div>
    );
}