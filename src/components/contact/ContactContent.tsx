import {useIsMobile} from "../../utils/useIsMobile"

import LayoutWrapper from "../../layouts/LayoutWrapper"
import ContactInformation from "./ContactInformation"
import ContactForm from "./ContactForm"

import ContactMobile from "./ContactMobile"

export default function ContactContent() {
	const isMobile = useIsMobile()

	return (
		<>
			{!isMobile ? (
				<LayoutWrapper
					sidebar={<ContactInformation />}
					sidebarClass="flex justify-end h-full"
					content={<ContactForm />}
				/>
			) : (
				<LayoutWrapper sidebar={<ContactMobile />} />
			)}
		</>
	)
}
