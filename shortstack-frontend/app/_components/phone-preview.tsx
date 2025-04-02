import { Button } from "@/components/ui/button";
import { Facebook, Smartphone, Tablet } from "lucide-react";
import {
  BookOpen,
  Film,
  Users,
  Video,
  Book,
  Link as LinkIcon,
  Youtube,
  Instagram,
  Twitter,
  Github,
  Mail,
} from "lucide-react";

interface PhonePreviewProps {
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  links: Array<{ title: string; url: string; icon: string }>;
  newLink?: { title: string; url: string; icon: string };
  deviceType: "iphone" | "android";
  onDeviceChange: (device: "iphone" | "android") => void;
  bio?: string;
  socialIcons?: Array<{
    url: string | undefined;
    label: string;
    type: string;
    username: string;
  }>;
}

const iconComponents = {
  BookOpen: <BookOpen className="h-5 w-5" />,
  Film: <Film className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Book: <Book className="h-5 w-5" />,
  Link: <LinkIcon className="h-5 w-5" />,
  Youtube: <Youtube className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Facebook: <Facebook className="h-5 w-5" />,
  Threads: <Twitter className="h-5 w-5" />,
};

export function PhonePreview({
  backgroundColor,
  gradientFrom,
  gradientTo,
  links,
  newLink,
  deviceType,
  onDeviceChange,
  bio,
  socialIcons,
}: PhonePreviewProps) {
  return (
    <div className="w-[300px] space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          variant={deviceType === "iphone" ? "default" : "outline"}
          size="sm"
          onClick={() => onDeviceChange("iphone")}
        >
          <Smartphone className="h-4 w-4 mr-2" />
          iPhone
        </Button>
        <Button
          variant={deviceType === "android" ? "default" : "outline"}
          size="sm"
          onClick={() => onDeviceChange("android")}
        >
          <Tablet className="h-4 w-4 mr-2" />
          Android
        </Button>
      </div>

      <div
        className={`
          relative bg-white shadow-2xl
          ${
            deviceType === "iphone"
              ? "rounded-[40px] p-3"
              : "rounded-[30px] p-2"
          }
        `}
      >
        <div
          className={`
            relative overflow-hidden
            ${deviceType === "iphone" ? "rounded-[32px]" : "rounded-[24px]"}
          `}
          style={{ backgroundColor, minHeight: "580px" }}
        >
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 px-6 pt-3 flex justify-between items-center text-xs">
            <div>10:21</div>
            <div
              className={
                deviceType === "iphone"
                  ? "w-[115px] h-[23px] bg-black absolute left-1/2 -translate-x-1/2 rounded-b-2xl"
                  : ""
              }
            >
              {deviceType === "android" && (
                <div className="w-3 h-3 rounded-full bg-black" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-current rounded-sm relative">
                <div className="absolute inset-[2px] bg-current rounded-sm" />
              </div>
              {deviceType === "iphone" && <div>100%</div>}
            </div>
          </div>

          <div className="mt-12 mb-6 flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-full mb-3"
              style={{
                background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <p className="text-sm font-medium">@jsewe</p>
            {bio && (
              <p className="text-sm text-gray-600 mt-2 text-center px-4">
                {bio}
              </p>
            )}
            {/* Social Icons Section */}
            {socialIcons && socialIcons.length > 0 && (
              <div className="flex gap-2 mt-3">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 p-2 rounded-lg transition-colors duration-300 text-gray-600 hover:text-white hover:bg-gray-400"
                  >
                    {social.type === "Instagram" && (
                      <Instagram className="h-4 w-4" />
                    )}
                    {social.type === "Threads" && (
                      <Twitter className="h-4 w-4" />
                    )}
                    {social.type === "Facebook" && (
                      <Facebook className="h-4 w-4" />
                    )}
                    {social.type === "Email" && <Mail className="h-4 w-4" />}
                    <span className="text-xs">{social.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links List */}
          <div className="px-4 space-y-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white rounded-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  {iconComponents[link.icon as keyof typeof iconComponents]}
                  <div className="flex-1 text-center font-medium">
                    {link.title}
                  </div>
                </div>
              </a>
            ))}
            {newLink?.title && (
              <a
                href={newLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white/50 rounded-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  {iconComponents[newLink.icon as keyof typeof iconComponents]}
                  <div className="flex-1 text-center font-medium">
                    {newLink.title}
                  </div>
                </div>
              </a>
            )}
          </div>

          <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center gap-12">
              <div className="w-[5px] h-[5px] rounded-full bg-gray-300" />
              <div className="w-[5px] h-[5px] rounded-full bg-gray-300" />
              <div className="w-[5px] h-[5px] rounded-full bg-gray-300" />
            </div>
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
