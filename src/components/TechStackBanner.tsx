import { motion } from "framer-motion";

// Import actual logo files
import CloudflareLogo from "@/assets/logos/cloudflare-logo.svg";
import AstroLogo from "@/assets/logos/astro-icon-light-gradient.svg";
import HonoLogo from "@/assets/logos/Hono-logo.svg";
import TrpcLogo from "@/assets/logos/trpc-logo.svg";
import DrizzleLogo from "@/assets/logos/drizzle-logo.png";
import ReactLogo from "@/assets/logos/react-1-logo.svg";
import TailwindLogo from "@/assets/logos/tailwindcss-mark.d52e9897.svg";
import BetterAuthLogo from "@/assets/logos/better-auth-logo.png";

const technologies = [
    {
        name: "Cloudflare",
        url: "https://developers.cloudflare.com/workers/",
        logo: CloudflareLogo.src,
        isSquare: false,
    },
    {
        name: "Astro",
        url: "https://astro.build",
        logo: AstroLogo.src,
        isSquare: false,
    },
    {
        name: "Hono",
        url: "https://hono.dev",
        logo: HonoLogo.src,
        isSquare: false,
    },
    {
        name: "tRPC",
        url: "https://trpc.io",
        logo: TrpcLogo.src,
        isSquare: true,
    },
    {
        name: "Drizzle",
        url: "https://orm.drizzle.team",
        logo: DrizzleLogo.src,
        isSquare: true,
    },
    {
        name: "React",
        url: "https://react.dev",
        logo: ReactLogo.src,
        isSquare: false,
    },
    {
        name: "Tailwind",
        url: "https://tailwindcss.com",
        logo: TailwindLogo.src,
        isSquare: false,
    },
    {
        name: "Better Auth",
        url: "https://better-auth.com",
        logo: BetterAuthLogo.src,
        isSquare: true,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export function TechStackBanner() {
    return (
        <motion.div
            className="relative py-16 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F68220]/5 to-transparent pointer-events-none" />

            {/* Decorative lines */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#F68220]/20 to-transparent" />

            <div className="relative">
                {/* Label */}
                <motion.p
                    className="text-center text-sm font-medium tracking-[0.2em] uppercase text-[#F68220] mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Powered By
                </motion.p>

                {/* Logo Grid */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto px-4"
                    variants={containerVariants}
                >
                    {technologies.map((tech) => (
                        <motion.a
                            key={tech.name}
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-center gap-3"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Logo container */}
                            <div
                                className={`relative w-12 h-12 md:w-14 md:h-14 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(246,130,32,0.5)] flex items-center justify-center ${
                                    tech.isSquare ? 'rounded-xl overflow-hidden' : ''
                                }`}
                            >
                                <img
                                    src={tech.logo}
                                    alt={`${tech.name} logo`}
                                    className={`w-full h-full ${tech.isSquare ? 'object-cover rounded-xl' : 'object-contain'}`}
                                />
                            </div>

                            {/* Name tooltip */}
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-[#F68220] transition-colors duration-300">
                                {tech.name}
                            </span>

                            {/* External link indicator */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-[#F68220]">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#F68220] to-[#FF9A45]" />
                </motion.div>
            </div>
        </motion.div>
    );
}
