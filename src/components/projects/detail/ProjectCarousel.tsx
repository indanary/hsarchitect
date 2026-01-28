import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {useMemo, useState} from "react"

type ImageItem = string | {url: string; thumb?: string; alt?: string}

interface ProjectCarouselProps {
	images: ImageItem[]
	wrapperClass?: string
	size?: string
}

type Orientation = "landscape" | "portrait" | "square"

export default function ProjectCarousel({
	images,
	wrapperClass,
	size,
}: ProjectCarouselProps) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [orientations, setOrientations] = useState<
		Record<number, Orientation>
	>({})

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

	const handleImageLoad = (
		index: number,
		e: React.SyntheticEvent<HTMLImageElement>,
	) => {
		const img = e.currentTarget
		const w = img.naturalWidth
		const h = img.naturalHeight

		let orientation: Orientation = "square"
		if (w > h) orientation = "landscape"
		else if (h > w) orientation = "portrait"

		setOrientations((prev) => ({
			...prev,
			[index]: orientation,
		}))
	}

	return (
		<div className={wrapperClass}>
			<div className="relative">
				{/* Slider */}
				<div ref={sliderRef} className="keen-slider overflow-hidden">
					{items.map((img, index) => {
						const orientation = orientations[index]

						const fitClass =
							orientation === "landscape"
								? "object-cover w-full h-full"
								: "object-contain max-h-full w-auto max-w-full"

						const alignClass =
							orientation === "portrait"
								? "justify-start"
								: "justify-center"

						return (
							<div
								key={index}
								className={`keen-slider__slide w-full overflow-hidden flex items-center ${alignClass} ${size}`}
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
									onLoad={(e) => handleImageLoad(index, e)}
									className={`transition-all duration-300 ${fitClass}`}
								/>
							</div>
						)
					})}
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
		"h-[28px] absolute top-1/2 -translate-y-1/2 cursor-pointer z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
	const positionClass = left ? "left-[24px]" : "right-[24px]"
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
