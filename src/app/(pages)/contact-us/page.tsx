import ContactUsView from "@/views/ContactUsView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact us - Globe Tales",
  description: "Travel and destination guide",
};
const page = () => {
  return <ContactUsView />;
};

export default page;