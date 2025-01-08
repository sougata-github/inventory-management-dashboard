import SettingsCard from "@/components/settings/SettingsCard";
import Header from "@/components/Header";

export default function page() {
  return (
    <section className="flex flex-col">
      <Header name="User Settings" />
      <SettingsCard />
    </section>
  );
}
