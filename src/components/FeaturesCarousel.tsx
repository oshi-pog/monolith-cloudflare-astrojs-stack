import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FeaturesCarousel({ features }: { features: any[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })])

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
                {features.map((feature, index) => (
                    <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0" key={index}>
                        <div className="p-1 h-full">
                            <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-card/80 group">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-500">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
