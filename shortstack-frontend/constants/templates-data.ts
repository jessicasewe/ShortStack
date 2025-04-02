import { Template } from "@/constants/types";

export const templates: Template[] = [
  {
    id: "personal-flamingo",
    name: "Flamingo Style",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m7MseyALLyKwSOOiu1G462vlD89AgX.png",
    category: "personal",
    style: {
      background: "bg-gradient-to-b from-cyan-200 to-pink-300",
      buttonStyle: "bg-white text-black hover:bg-gray-100 shadow-lg",
      textColor: "text-gray-800",
    },
  },
  {
    id: "music-dj",
    name: "DJ Beats",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m7MseyALLyKwSOOiu1G462vlD89AgX.png",
    category: "music",
    style: {
      background: "bg-gradient-to-b from-purple-900 to-purple-700",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      textColor: "text-white",
    },
  },
  {
    id: "education-modern",
    name: "Academic Portal",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m7MseyALLyKwSOOiu1G462vlD89AgX.png",
    category: "education",
    style: {
      background: "bg-gradient-to-br from-coral-400 to-blue-400",
      buttonStyle: "bg-white/90 hover:bg-white text-gray-800 shadow-lg",
      textColor: "text-gray-800",
    },
  },
];

export const categories = [
  { id: "personal", name: "Personal" },
  { id: "music", name: "Music" },
  { id: "education", name: "Education" },
];
