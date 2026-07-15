import LeadsClient from "./LeadsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản lý Leads | VinhWorks CMS",
  description: "Quản lý yêu cầu liên hệ và khách hàng tiềm năng.",
};

export default function LeadsPage() {
  return <LeadsClient />;
}
