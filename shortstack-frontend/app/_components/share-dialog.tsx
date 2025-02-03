import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function ShareDialog({ isOpen, onClose, url }: ShareDialogProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const shareButtons = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="#25D366" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      link: `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
      name: "Instagram",
      icon: (
        <svg
          className="w-6 h-6"
          fill="#E4405F"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.328 3.608 1.303.975.975 1.241 2.242 1.303 3.608.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.328 2.633-1.303 3.608-.975.975-2.242 1.241-3.608 1.303-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.328-3.608-1.303-.975-.975-1.241-2.242-1.303-3.608-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.062-1.366.328-2.633 1.303-3.608.975-.975 2.242-1.241 3.608-1.303 1.265-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.378.062-2.626.335-3.672 1.382C2.499 2.5 2.226 3.748 2.164 5.126 2.105 6.405 2.093 6.813 2.093 12s.012 5.667.071 6.947c.062 1.378.335 2.626 1.382 3.672 1.046 1.046 2.294 1.319 3.672 1.381 1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.378-.062 2.626-.335 3.672-1.381 1.046-1.046 1.319-2.294 1.381-3.672.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.062-1.378-.335-2.626-1.381-3.672-1.046-1.046-2.294-1.319-3.672-1.381-1.28-.059-1.688-.071-4.947-.071zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z" />
        </svg>
      ),
      link: `https://www.instagram.com/`,
    },
    {
      name: "X",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      link: `mailto:?body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        {" "}
        <DialogHeader>
          <DialogTitle>Share your Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 py-6">
          {shareButtons.map((button) => (
            <a
              key={button.name}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-orange-800 transition-colors w-24" // Fixed width
            >
              {button.icon}
              <span className="text-sm text-gray-700">{button.name}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
          <div className="flex-1 text-sm text-gray-900 px-2">{url}</div>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
