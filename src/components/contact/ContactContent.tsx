import LayoutWrapper from "../../layouts/LayoutWrapper"
import ContactInformation from "./ContactInformation"
import ContactForm from "./ContactForm"

export default function ContactContent() {
	return (
		<LayoutWrapper
			sidebar={<ContactInformation />}
			sidebarClass="flex justify-end h-full"
			content={<ContactForm />}
		/>
	)
}
