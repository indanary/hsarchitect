import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {useState} from "react"

interface ProjectCarouselProps {
	images: string[]
}

export default function ProjectCarousel({images}: ProjectCarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		},
		created() {
			setLoaded(true)
		},
	})

	const slider = instanceRef.current

	return (
		<div className="h-[440px]">
			<div className="relative mt-25">
				{/* Slider */}
				<div ref={sliderRef} className="keen-slider overflow-hidden">
					{images.map((src, index) => (
						<div key={index} className="keen-slider__slide">
							<img
								src={src}
								alt={`Image ${index + 1}`}
								className="w-full h-auto object-cover"
							/>
						</div>
					))}
				</div>

				{/* Arrows (loop enabled) */}
				{loaded && slider && (
					<>
						<Arrow left onClick={() => slider.prev()} />
						<Arrow onClick={() => slider.next()} />
					</>
				)}

				{/* Dots */}
				<div className="flex justify-center mt-4 gap-2">
					{images.map((_, idx) => (
						<button
							key={idx}
							onClick={() => instanceRef.current?.moveToIdx(idx)}
							className={`w-3 h-3 rounded-full ${
								currentSlide === idx
									? "bg-white"
									: "bg-white/30"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function Arrow(props: {left?: boolean; onClick: () => void}) {
	const {left, onClick} = props

	const baseClasses =
		"w-8 h-8 absolute top-1/2 -translate-y-1/2 cursor-pointer z-10"
	const positionClass = left ? "left-2" : "right-2"
	const src = left ? "/images/arrow-left.svg" : "/images/arrow-right.svg" // adjust path if needed

	return (
		<img
			src={src}
			alt={left ? "Previous" : "Next"}
			onClick={onClick}
			className={`${baseClasses} ${positionClass}`}
		/>
	)
}
