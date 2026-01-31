import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {useMemo, useState} from "react"

/* ================= TYPES ================= */

type ImageItem =
	| string
	| {
			type?: "image" | "video"
			url: string
			thumb?: string
			alt?: string
	  }

interface ProjectCarouselProps {
	images: ImageItem[]
	wrapperClass?: string
	size?: string
}

type Orientation = "landscape" | "portrait" | "square"

type CarouselItem = {
	type: "image" | "video"
	url: string
	thumb?: string
	alt?: string
}

/* ================= COMPONENT ================= */

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

	/* ✅ Normalize ONCE (fixes TS + logic) */
	const items: CarouselItem[] = useMemo(() => {
		return images.map((it) => {
			if (typeof it === "string") {
				return {
					type: "image",
					url: it,
				}
			}

			return {
				type: it.type ?? "image",
				url: it.url,
				thumb: it.thumb,
				alt: it.alt,
			}
		})
	}, [images])

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
					{items.map((item, index) => {
						const isActive = index === currentSlide
						const orientation = orientations[index]

						const fitClass =
							orientation === "landscape"
								? "object-cover w-full h-full"
								: "object-contain w-auto max-h-full"

						return (
							<div
								key={index}
								className={`keen-slider__slide w-full overflow-hidden flex items-start ${size} h-full`}
							>
								{/* ================= IMAGE ================= */}
								{item.type === "image" && (
									<img
										src={item.thumb ?? item.url}
										srcSet={
											item.thumb
												? `${item.thumb} 800w, ${item.url} 1600w`
												: undefined
										}
										sizes="(max-width: 1024px) 90vw, 840px"
										alt={item.alt ?? `Image ${index + 1}`}
										loading="lazy"
										onLoad={(e) =>
											handleImageLoad(index, e)
										}
										className={`transition-all duration-300 ${fitClass}`}
									/>
								)}

								{/* ================= VIDEO ================= */}
								{item.type === "video" && (
									<>
										{/* Active slide → real video */}
										{isActive ? (
											<video
												src={item.url}
												controls
												autoPlay
												muted
												playsInline
												className="max-w-full h-full object-cover"
											/>
										) : (
											/* Inactive slide → poster only */
											<img
												src={
													item.thumb ??
													"/images/video-placeholder.png"
												}
												alt={
													item.alt ?? "Video preview"
												}
												className="w-full h-full object-cover"
												loading="lazy"
											/>
										)}
									</>
								)}
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

/* ================= ARROW ================= */

function Arrow(props: {left?: boolean; onClick: () => void}) {
	const {left, onClick} = props

	const wrapperBase =
		"absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer flex items-center justify-center"

	const hitArea = "w-[36px] h-[36px] sm:w-[48px] sm:h-[48px]"

	const positionClass = left
		? "left-[4px] sm:left-[8px]"
		: "right-[4px] sm:right-[8px]"

	const imgClasses =
		"h-[20px] sm:h-[28px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"

	const src = left ? "/images/arrow-left.svg" : "/images/arrow-right.svg"

	return (
		<div
			className={`${wrapperBase} ${hitArea} ${positionClass}`}
			onClick={onClick}
			role="button"
			aria-label={left ? "Previous slide" : "Next slide"}
		>
			<img
				src={src}
				alt={left ? "Previous" : "Next"}
				className={imgClasses}
				draggable={false}
			/>
		</div>
	)
}
