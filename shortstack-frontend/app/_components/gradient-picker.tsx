import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface GradientPickerProps {
  gradientFrom: string;
  gradientTo: string;
  onFromChange: (color: string) => void;
  onToChange: (color: string) => void;
  label?: string;
}

export function GradientPicker({
  gradientFrom,
  gradientTo,
  onFromChange,
  onToChange,
  label,
}: GradientPickerProps) {
  const [activeColor, setActiveColor] = useState<"from" | "to">("from");

  const colors = [
    "#000000",
    "#6B7280",
    "#EF4444",
    "#EC4899",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#06B6D4",
    "#3B82F6",
    "#A855F7",
  ];

  return (
    <div className="space-y-4">
      {label && (
        <span className="text-sm font-medium text-gray-600">{label}</span>
      )}
      <div className="flex items-center gap-4">
        {/* Gradient Preview */}
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
          }}
        />

        {/* Color Picker and Custom Inputs */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveColor("from")}
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                activeColor === "from"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500"
              )}
            >
              From
            </button>
            <button
              onClick={() => setActiveColor("to")}
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                activeColor === "to"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500"
              )}
            >
              To
            </button>
          </div>

          {/* Predefined Colors and Custom Input */}
          <div className="flex items-center gap-4">
            {/* Predefined Colors */}
            <div className="flex gap-1 bg-white rounded-full shadow-lg p-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    if (activeColor === "from") {
                      onFromChange(color);
                    } else {
                      onToChange(color);
                    }
                  }}
                  className={cn(
                    "w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    (activeColor === "from" && gradientFrom === color) ||
                      (activeColor === "to" && gradientTo === color)
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={activeColor === "from" ? gradientFrom : gradientTo}
                onChange={(e) => {
                  const newColor = e.target.value;
                  if (activeColor === "from") {
                    onFromChange(newColor);
                  } else {
                    onToChange(newColor);
                  }
                }}
                className="w-8 h-8 p-1"
              />
              <Input
                value={
                  activeColor === "from"
                    ? gradientFrom.toUpperCase()
                    : gradientTo.toUpperCase()
                }
                onChange={(e) => {
                  const newColor = e.target.value;
                  if (activeColor === "from") {
                    onFromChange(newColor);
                  } else {
                    onToChange(newColor);
                  }
                }}
                className="w-24 p-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
