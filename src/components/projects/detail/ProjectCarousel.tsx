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
		<div className="pl-10 overflow-hidden mt-24">
			<div className="relative">
				{/* Slider */}
				<div ref={sliderRef} className="keen-slider overflow-hidden">
					{images.map((src, index) => (
						<div
							key={index}
							className="keen-slider__slide aspect-[800/480] w-full overflow-hidden"
						>
							<img
								src={src}
								alt={`Image ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>

				{/* Arrows */}
				{loaded && slider && (
					<>
						<Arrow left onClick={() => slider.prev()} />
						<Arrow onClick={() => slider.next()} />
					</>
				)}
			</div>
		</div>
	)
}

function Arrow(props: {left?: boolean; onClick: () => void}) {
	const {left, onClick} = props
	const baseClasses =
		"w-8 h-8 absolute top-1/2 -translate-y-1/2 cursor-pointer z-10"
	const positionClass = left ? "left-2" : "right-2"
	const src = left ? "/images/arrow-left.svg" : "/images/arrow-right.svg"

	return (
		<img
			src={src}
			alt={left ? "Previous" : "Next"}
			onClick={onClick}
			className={`${baseClasses} ${positionClass}`}
		/>
	)
}
