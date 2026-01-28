export default function ContactInformation() {
	const phone = "+628562720060"
	const whatsappLink = "https://wa.me/628562720060"
	const instagram = "@hsarchitect.id"
	const instagramLink = "https://instagram.com/hsarchitect.id"
	const email = "hsarchitect@gmail.com"

	return (
		<div className="w-full max-w-[176px] flex flex-col gap-10 text-left xl:pl-6">
			<div className="flex flex-col gap-6">
				<span className="text-xs-loose">
					For general and project inquiries, feel free to reach us
				</span>

				<span className="text-xs-loose">
					{/* WhatsApp */}
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{phone}
					</a>
					<br />

					{/* Email — plain text only */}
					<span className="select-text">{email}</span>
				</span>

				{/* Instagram */}
				<a
					href={instagramLink}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs-loose hover:underline"
				>
					{instagram}
				</a>
			</div>

			<div className="flex flex-col gap-8">
				<span className="text-xs-loose">
					Studio visits are available by an appointment,
				</span>

				<span className="text-xs-loose">
					Ngesrep timur II no 356, Banyumanik, Kota Semarang, Jawa
					Tengah 50269
				</span>
			</div>
		</div>
	)
}
