import FormPageClient from "./FormPageClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Khảo sát trực tuyến",
  description: "Biểu mẫu khảo sát trực tuyến của VinhWorks.",
  path: "/form",
  noIndex: true,
});

export default function FormPage() {
  return <FormPageClient />;
}
