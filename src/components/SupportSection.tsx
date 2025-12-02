import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, Coffee, Bitcoin } from "lucide-react";

// Placeholder - replace with your actual addresses/links
const BTC_ADDRESS = "bc1qYOUR_BTC_ADDRESS_HERE";
const COFFEE_LINK = "https://buymeacoffee.com/YOUR_USERNAME";

export function SupportSection() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(BTC_ADDRESS);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <section className="relative py-24">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F68220]/5 rounded-[100%] blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Header with animated coffee */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <AnimatedCoffee />
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Fuel the Stack
                    </h2>
                    <AnimatedCoffee />
                </div>

                <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
                    If this template saved you hours of setup time, consider buying me a coffee
                    <span className="text-[#F68220]"> (or some Bitcoin)</span>
                </p>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* Coffee Card */}
                    <motion.a
                        href={COFFEE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block"
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F68220] to-[#FF9A45] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                        <div className="relative bg-background border border-[#F68220]/20 rounded-2xl p-8 h-full">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-[#F68220]/10 flex items-center justify-center group-hover:bg-[#F68220]/20 transition-colors">
                                        <Coffee className="w-8 h-8 text-[#F68220]" />
                                    </div>
                                    {/* Steam effect on hover */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <SteamEffect />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Buy Me a Coffee</h3>
                                    <p className="text-sm text-muted-foreground">Quick & easy support</p>
                                </div>
                                <div className="flex items-center gap-2 text-[#F68220] font-medium">
                                    <span>Support</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    {/* Bitcoin Card */}
                    <motion.div
                        className="group relative"
                        whileHover={{ y: -4 }}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F7931A] to-[#F68220] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                        <div className="relative bg-background border border-[#F7931A]/20 rounded-2xl p-8 h-full">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#F7931A]/10 flex items-center justify-center group-hover:bg-[#F7931A]/20 transition-colors">
                                    <Bitcoin className="w-8 h-8 text-[#F7931A]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Send Bitcoin</h3>
                                    <p className="text-sm text-muted-foreground">For the crypto natives</p>
                                </div>

                                {/* BTC Address with copy */}
                                <div className="w-full">
                                    <div className="flex items-center gap-2 bg-[#F7931A]/5 border border-[#F7931A]/20 rounded-lg px-3 py-2">
                                        <code className="text-xs text-muted-foreground truncate flex-1">
                                            {BTC_ADDRESS}
                                        </code>
                                        <motion.button
                                            onClick={copyToClipboard}
                                            className="p-1.5 rounded-md hover:bg-[#F7931A]/10 transition-colors"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {copied ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4 text-[#F7931A]" />
                                            )}
                                        </motion.button>
                                    </div>
                                    {copied && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-green-500 mt-2"
                                        >
                                            Copied to clipboard!
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Playful footer text */}
                <p className="text-sm text-muted-foreground mt-8">
                    Every coffee keeps the commits flowing
                </p>
            </div>
        </section>
    );
}

// Animated coffee cup component
function AnimatedCoffee() {
    return (
        <div className="relative w-10 h-10">
            <motion.div
                animate={{
                    rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
            >
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                    {/* Steam */}
                    <motion.path
                        d="M8 2c0 1.5-1 2-1 3.5S8 7.5 8 9"
                        stroke="#F68220"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ opacity: 0.3, pathLength: 0 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            pathLength: [0, 1, 0],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.path
                        d="M12 2c0 1.5-1 2-1 3.5s1 2 1 3.5"
                        stroke="#F68220"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ opacity: 0.3, pathLength: 0 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            pathLength: [0, 1, 0],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.path
                        d="M16 2c0 1.5-1 2-1 3.5s1 2 1 3.5"
                        stroke="#F68220"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ opacity: 0.3, pathLength: 0 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            pathLength: [0, 1, 0],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                    {/* Cup */}
                    <path
                        d="M3 12h15c0 4.97-4.03 9-9 9s-9-4.03-9-9z"
                        fill="url(#coffeeGradient)"
                        stroke="#F68220"
                        strokeWidth="1.5"
                    />
                    {/* Handle */}
                    <path
                        d="M18 12h1a3 3 0 0 1 0 6h-1"
                        stroke="#F68220"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="coffeeGradient" x1="3" y1="12" x2="18" y2="21">
                            <stop offset="0%" stopColor="#F68220" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#E5740F" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </div>
    );
}

// Steam effect for coffee card hover
function SteamEffect() {
    return (
        <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 h-4 bg-gradient-to-t from-[#F68220]/40 to-transparent rounded-full"
                    animate={{
                        y: [-8, -16],
                        opacity: [0.6, 0],
                        scaleY: [1, 1.5],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}
