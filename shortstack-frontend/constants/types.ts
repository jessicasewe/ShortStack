export interface SocialIcon {
  type: "Instagram" | "Twitter" | "Youtube" | "Github" | "Mail";
  username: string;
}

// Define and export the Template type
export interface Template {
  id: string;
  name: string;
  image: string;
  category: string;
  style: {
    background: string;
    buttonStyle: string;
    textColor: string;
  };
}
