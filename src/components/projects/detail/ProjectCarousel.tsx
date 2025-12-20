import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {useMemo, useState} from "react"

type ImageItem = string | {url: string; thumb?: string; alt?: string}

interface ProjectCarouselProps {
	images: ImageItem[]
	wrapperClass?: string
	size?: string
}

export default function ProjectCarousel({
	images,
	wrapperClass,
	size,
}: ProjectCarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)

	// normalize to objects
	const items = useMemo(
		() =>
			images.map((it) =>
				typeof it === "string"
					? {url: it, thumb: undefined, alt: undefined}
					: it,
			),
		[images],
	)

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
		<div className={wrapperClass}>
			<div className="relative">
				{/* Slider */}
				<div ref={sliderRef} className="keen-slider overflow-hidden">
					{items.map((img, index) => (
						<div
							key={index}
							className={`keen-slider__slide w-full overflow-hidden ${size}`}
						>
							<img
								src={img.thumb ?? img.url}
								srcSet={
									img.thumb
										? `${img.thumb} 800w, ${img.url} 1600w`
										: undefined
								}
								sizes="(max-width: 1024px) 90vw, 840px"
								alt={img.alt ?? `Image ${index + 1}`}
								loading="lazy"
								className="max-h-full w-auto max-w-full object-contain"
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
