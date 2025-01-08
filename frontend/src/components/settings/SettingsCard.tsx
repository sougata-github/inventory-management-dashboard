"use client";

import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsCard = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "light" ? false : true;

  const themeLabel = theme === "light" ? "Light Mode" : "Dark Mode";

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Card className="mt-5 max-w-xl">
      <CardHeader>
        <CardTitle>Manage your Account</CardTitle>
        <CardDescription>
          Update your personal details and set preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-md flex flex-col gap-2">
        <CardRow label="Username">
          <Input
            placeholder="John Doe"
            className="placeholder:text-sm"
            type="text"
          />
        </CardRow>
        <CardRow label="Email">
          <Input
            placeholder="johndoe@test.com"
            className="placeholder:text-sm"
            type="text"
          />
        </CardRow>
        <CardRow label="Notifications">
          <Switch />
        </CardRow>
        <CardRow label={themeLabel}>
          <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
        </CardRow>
        <CardRow label="Language">
          <Select>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>
        </CardRow>
      </CardContent>
    </Card>
  );
};

const CardRow = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex items-center py-2 gap-8">
      <p className="w-[40%]">{label}</p>
      <div className="w-[60%]">{children}</div>
    </div>
  );
};

export default SettingsCard;
