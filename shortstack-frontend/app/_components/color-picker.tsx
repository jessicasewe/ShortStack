import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({
  colors,
  selectedColor,
  onChange,
  label,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-gray-600">{label}</Label>
      )}
      <div className="flex items-center gap-4">
        {/* Predefined Colors */}
        <div className="flex gap-1 bg-white rounded-full shadow-lg p-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={cn(
                "w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
                selectedColor === color && "ring-2 ring-offset-2 ring-gray-400"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 p-1"
          />
          <Input
            value={selectedColor.toUpperCase()}
            onChange={(e) => onChange(e.target.value)}
            className="w-24 p-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
