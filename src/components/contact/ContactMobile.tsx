const ContactMobile = () => {
	return (
		<div className="flex flex-col" style={{gap: "100px"}}>
			<div className="flex gap-8">
				<span className="w-[35%] text-xs-loose">
					For general and project inquiries, feel free to reach us
				</span>

				<div className="w-[65%] flex flex-col gap-6">
					<span className="text-xs-loose">+621234567890</span>

					<span className="text-xs-loose">hsarchitect@gmail.com</span>

					<span className="text-xs-loose">@hsarchitect.id</span>
				</div>
			</div>

			<div className="flex items-start gap-8">
				<span className="w-[35%] text-xs-loose">
					Or Simply, Send us an Email
				</span>

				<div className="w-[65%] flex flex-col gap-4">
					<input
						type="text"
						placeholder="Name"
						className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs-loose 
                focus:outline-none focus:border-white 
              text-white text-xs-loose"
					/>

					<input
						type="text"
						placeholder="Company"
						className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs-loose 
                focus:outline-none focus:border-white 
              text-white text-xs-loose"
					/>

					<input
						type="text"
						placeholder="Subject"
						className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs-loose 
                focus:outline-none focus:border-white 
              text-white text-xs-loose"
					/>

					<textarea
						placeholder="Message"
						className="w-full bg-transparent border-0 border-b border-white 
              placeholder-white/80 placeholder:text-xs-loose 
                focus:outline-none focus:border-white 
              text-white text-xs-loose resize-none"
						rows={4}
					/>

					<button
						type="submit"
						className="flex text-xs-loose cursor-pointer text-white hover:text-white/80 transition-colors duration-200"
					>
						Send
					</button>
				</div>
			</div>

			<div className="flex justify-start gap-8">
				<div className="w-[35%] flex flex-col gap-6">
					<span className="text-xs-loose">
						Studio visits are available by an appointment,
					</span>

					<span className="text-xs-loose">
						Ngesrep timur II no 356, Banyumanik, Kota Semarang, Jawa
						Tengah 50269
					</span>
				</div>

				<div className="w-[65%] overflow-hidden mt-2">
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

export default ContactMobile
