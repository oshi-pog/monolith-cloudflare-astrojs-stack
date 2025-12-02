import Lottie from "lottie-react";
import heroOrangeGlobe from "@/assets/logos/lottieFiles/hero_orange_globe.json";

interface CloudflareGlobeProps {
    className?: string;
}

export function CloudflareGlobe({ className }: CloudflareGlobeProps) {
    return (
        <div className={className}>
            <Lottie
                animationData={heroOrangeGlobe}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
