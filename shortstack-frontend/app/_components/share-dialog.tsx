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
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-orange-800 transition-colors w-24"
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
