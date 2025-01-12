import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCategory = ({ setSelectedCategory }: Props) => {
  return (
    <div>
      <Label htmlFor="category">Category</Label>
      <Select
        defaultValue="All"
        name="category"
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <SelectTrigger className="max-w-md mt-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Professional">Professional</SelectItem>
          <SelectItem value="Salaries">Salaries</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;
