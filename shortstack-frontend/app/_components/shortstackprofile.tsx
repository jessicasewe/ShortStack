"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Instagram,
  Youtube,
  Mail,
  Trash2,
  Twitter,
  Github,
  Facebook,
} from "lucide-react";
import { ColorPicker } from "./color-picker";
import { GradientPicker } from "./gradient-picker";
import { PhonePreview } from "@/app/_components/phone-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createPage } from "@/service/api.service";
import { ArrowLeft } from "lucide-react";

interface ShortStackProfileProps {
  handleSaveChanges: (
    links: Array<{ title: string; url: string; icon: string }>,
    backgroundColor: string,
    gradientFrom: string,
    gradientTo: string,
    username: string
  ) => Promise<void>;
  initialLinks: Array<{ title: string; url: string; icon: string }>;
  initialBackgroundColor: string;
  initialGradientFrom: string;
  initialGradientTo: string;
  onBack: () => void;
}

export default function ShortStackProfile({
  handleSaveChanges,
  initialLinks,
  initialBackgroundColor,
  initialGradientFrom,
  initialGradientTo,
  onBack,
}: ShortStackProfileProps) {
  const [links, setLinks] = useState(initialLinks);
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "" });
  const [gradientFrom, setGradientFrom] = useState(initialGradientFrom);
  const [gradientTo, setGradientTo] = useState(initialGradientTo);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor
  );
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [deviceType, setDeviceType] = useState<"iphone" | "android">("iphone");
  const [activeTab, setActiveTab] = useState<"gradient" | "background">(
    "gradient"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [socialIcons, setSocialIcons] = useState<
    Array<{ type: string; username: string; url: string; label: string }>
  >([]);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [selectedSocialType, setSelectedSocialType] = useState<string | null>(
    null
  );
  const [socialUsername, setSocialUsername] = useState("");

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

  const assignIcon = (title: string) => {
    const lowerCaseTitle = title.toLowerCase();
    const iconMapping = [
      { keyword: "youtube", icon: "Youtube" },
      { keyword: "instagram", icon: "Instagram" },
      { keyword: "twitter", icon: "Twitter" },
      { keyword: "github", icon: "Github" },
      { keyword: "course", icon: "BookOpen" },
      { keyword: "video", icon: "Video" },
      { keyword: "film", icon: "Film" },
      { keyword: "portfolio", icon: "Users" },
      { keyword: "link", icon: "Link" },
      { keyword: "book", icon: "Book" },
    ];
    for (const { keyword, icon } of iconMapping) {
      if (lowerCaseTitle.includes(keyword)) {
        return icon;
      }
    }
    return "Link";
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const icon = assignIcon(newLink.title);
      setLinks([...links, { ...newLink, icon }]);
      setNewLink({ title: "", url: "", icon: "" });
    }
  };

  const deleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSave = async () => {
    console.log("Saving page with data:", {
      links,
      backgroundColor,
      gradientFrom,
      gradientTo,
      username,
    });

    try {
      await handleSaveChanges(
        links,
        backgroundColor,
        gradientFrom,
        gradientTo,
        username
      );
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const SocialIconSelector = ({
    onSelect,
  }: {
    onSelect: (type: string) => void;
  }) => {
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
      <div className="flex flex-col gap-2 w-full">
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
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Button>
        <div className="flex items-center gap-2 bg-[#fff0ec] rounded-lg p-2">
          <span className="text-orange-500">🔥</span>
          <span>Your shortstack is live:</span>
          <a href="https://shortstck/jsewe" className="hover:underline block">
            shortstack/jsewe
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <div
                className="w-20 h-20 rounded-full overflow-hidden"
                style={{
                  background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
                }}
              />

              <div className="space-y-2">
                <h1 className="text-xl font-semibold">@{username}</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-gray-500 hover:text-gray-900"
                    >
                      {bio ? bio : "Add bio"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Bio</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea
                          placeholder="Write something about yourself..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setIsDialogOpen(false)}
                        className="bg-[#a24b33] hover:bg-[#a65038]"
                      >
                        Save Bio
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex gap-2 items-center">
                  {socialIcons.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
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
                    </Button>
                  ))}
                  <Dialog
                    open={isSocialDialogOpen}
                    onOpenChange={setIsSocialDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {selectedSocialType
                            ? `Add ${selectedSocialType} Profile`
                            : "Select Social Platform"}
                        </DialogTitle>
                      </DialogHeader>
                      {!selectedSocialType ? (
                        <SocialIconSelector
                          onSelect={(type) => {
                            setSelectedSocialType(type);
                          }}
                        />
                      ) : (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Username</Label>
                            <Input
                              placeholder={`Enter your ${selectedSocialType} username`}
                              value={socialUsername}
                              onChange={(e) =>
                                setSocialUsername(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedSocialType(null);
                                setSocialUsername("");
                              }}
                            >
                              Back
                            </Button>
                            <Button
                              onClick={() => {
                                if (socialUsername) {
                                  setSocialIcons([
                                    ...socialIcons,
                                    {
                                      type: selectedSocialType,
                                      username: socialUsername,
                                      url: "",
                                      label: "",
                                    },
                                  ]);
                                  setSelectedSocialType(null);
                                  setSocialUsername("");
                                  setIsSocialDialogOpen(false);
                                }
                              }}
                              className="bg-[#a24b33] hover:bg-[#a65038]"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 space-y-4">
            <h2 className="text-lg font-semibold">Add New Link</h2>
            <div className="space-y-2">
              <Label htmlFor="linkTitle">Link Title</Label>
              <Input
                id="linkTitle"
                value={newLink.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const icon = assignIcon(title);
                  setNewLink({ ...newLink, title, icon });
                }}
                placeholder="Enter link title"
                className="w-10/12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input
                id="linkUrl"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
                placeholder="Enter link URL"
                className="w-10/12"
              />
            </div>
            <Button
              onClick={addLink}
              className="w-10/12 bg-[#a24b33] hover:bg-[#a65038] text-white py-6 rounded-full"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Link
            </Button>
          </div>

          <div className="mb-6 space-y-6">
            <h2 className="text-lg font-semibold">Color Settings</h2>

            <div className="flex gap-2">
              <Button
                variant={activeTab === "gradient" ? "default" : "outline"}
                onClick={() => setActiveTab("gradient")}
              >
                Gradient
              </Button>
              <Button
                variant={activeTab === "background" ? "default" : "outline"}
                onClick={() => setActiveTab("background")}
              >
                Background Color
              </Button>
            </div>

            {activeTab === "gradient" && (
              <GradientPicker
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                onFromChange={setGradientFrom}
                onToChange={setGradientTo}
                label="Gradient Picker"
              />
            )}

            {activeTab === "background" && (
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker
                  colors={colors}
                  selectedColor={backgroundColor}
                  onChange={setBackgroundColor}
                  label="Select a Color"
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Links</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow key={index}>
                    <TableCell>{link.title}</TableCell>
                    <TableCell>{link.url}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLink(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-gray-600">
              <Plus className="h-4 w-4 mr-2" />
            </Button>
            <Button
              variant="default"
              className="bg-[#a24b33] hover:bg-[#a65038]"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Phone preview */}
        <div className="w-[300px] hidden lg:block">
          <PhonePreview
            deviceType={deviceType}
            backgroundColor={backgroundColor}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            links={links}
            newLink={newLink.title ? newLink : undefined}
            onDeviceChange={setDeviceType}
            bio={bio}
            socialIcons={socialIcons}
          />
        </div>
      </div>
    </div>
  );
}
