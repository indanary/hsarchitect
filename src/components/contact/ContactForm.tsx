export default function ContactForm() {
	return (
		<div className="mt-24 flex flex-col gap-10">
			<div className="flex flex-col gap-6">
				<span className="text-xs font-semibold">
					Or Simply Send us an Email
				</span>

				<div className="w-full flex justify-between gap-16">
					<div className="flex flex-col gap-7 w-2/6">
						<input
							type="text"
							placeholder="Name"
							className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs 
                focus:outline-none focus:border-white 
              text-white text-xs"
						/>

						<input
							type="text"
							placeholder="Company"
							className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs 
                focus:outline-none focus:border-white 
              text-white text-xs"
						/>

						<input
							type="text"
							placeholder="Subject"
							className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs 
                focus:outline-none focus:border-white 
              text-white text-xs"
						/>
					</div>

					<div className="w-3/6">
						<textarea
							placeholder="Message"
							className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs 
                focus:outline-none focus:border-white 
              text-white text-xs resize-none"
							rows={6}
						/>
					</div>

					<div className="w-1/6 flex flex-col justify-end">
						<button
							type="submit"
							className="w-[100px] text-xs cursor-pointer px-4 py-2 rounded-md text-white hover:bg-white hover:text-[#071E50] transition-colors duration-200"
						>
							Send
						</button>
					</div>
				</div>

				{/* maps */}
				<div className="w-full h-[364px] overflow-hidden">
					<iframe
						title="HS Architect Location"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.6893049491823!2d110.4197113!3d-7.045613400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bf76e45a99d%3A0xa48130e3a1999c3c!2sJl.%20Ngesrep%20Tim.%20II%2C%20Kec.%20Banyumanik%2C%20Kota%20Semarang%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1718374800000!5m2!1sen!2sid"
						width="100%"
						height="100%"
						style={{border: 0}}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</div>
	)
}
