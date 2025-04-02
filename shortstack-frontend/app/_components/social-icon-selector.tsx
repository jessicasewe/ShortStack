import { Instagram, Twitter, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialIconSelectorProps {
  onSelect: (type: string) => void;
}

export function SocialIconSelector({ onSelect }: SocialIconSelectorProps) {
  const socialIcons = [
    {
      type: "Threads",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      type: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      type: "Email",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      type: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {socialIcons.map((social) => (
        <Button
          key={social.type}
          variant="ghost"
          className="w-full flex items-center justify-start gap-3 px-4 py-6 hover:bg-gray-100 rounded-lg"
          onClick={() => onSelect(social.type)}
        >
          {social.icon}
          <span className="text-sm font-normal">{social.type}</span>
        </Button>
      ))}
    </div>
  );
}
