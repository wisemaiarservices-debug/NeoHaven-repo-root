import CresAgriPvDemo from "@/components/pages/CresAgriPvDemo";

export const metadata = {
  title: "NOVA OS Agri-PV Validation Demo",
  description: "Synthetic NOVA OS discussion demo for PV transparency and weak-grid agri-PV validation workflows.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <CresAgriPvDemo />;
}
