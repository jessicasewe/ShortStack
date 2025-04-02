"use client";

import { useState, useEffect } from "react";
import { MoreVertical, Share2, Edit, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhonePreview } from "@/app/_components/phone-preview";
import { ShareDialog } from "@/app/_components/share-dialog";
import { fetchAllPages, deletePage, createPage } from "@/service/api.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShortStackProfile from "@/app/_components/shortstackprofile";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export function ShortStackPageView({
  onEdit,
  savedLinks,
  backgroundColor,
  gradientFrom,
  gradientTo,
  onDeletePage,
}: {
  onEdit: () => void;
  savedLinks: Array<{ title: string; url: string; icon: string }>;
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  onDeletePage: (pageId: string) => void;
}) {
  const [pages, setPages] = useState<
    Array<{
      _id: string;
      title: string;
      backgroundColor: string;
      gradientFrom: string;
      gradientTo: string;
      links: Array<{ title: string; url: string; icon: string }>;
    }>
  >([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Function to get userId from token
  const getUserIdFromToken = (token: string): string => {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.userId;
  };

  const handleShare = () => {
    const pageUrl = window.location.href;
    setSelectedUrl(pageUrl);
    setShareDialogOpen(true);
  };

  const handleDelete = async (pageId: string) => {
    try {
      await deletePage(pageId);
      setPages((prevPages) => prevPages.filter((page) => page._id !== pageId));
      toast.success("Page deleted successfully");
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page");
    }
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const userId = getUserIdFromToken(token);
        const pages = await fetchAllPages(userId, token);
        setPages(pages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  const handleCreatePage = () => {
    setShowProfile(true);
  };

  const handleSaveChanges = async (
    links: any,
    backgroundColor: any,
    gradientFrom: any,
    gradientTo: any,
    username: any
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const userId = getUserIdFromToken(token);

    const pageData = {
      userId,
      username,
      title: "My Awesome Page",
      backgroundColor,
      gradientFrom,
      gradientTo,
      bio: "",
      socialIcons: [],
      links,
    };

    try {
      const createdPage = await createPage(pageData, token);
      toast.success("Page created successfully!");
      const updatedPages = await fetchAllPages(userId, token);
      setPages(updatedPages);
      setShowProfile(false);
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error("Failed to create page");
    }
  };

  const handleBack = () => {
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {showProfile ? (
        <ShortStackProfile
          handleSaveChanges={handleSaveChanges}
          initialLinks={[]}
          initialBackgroundColor="#ffffff"
          initialGradientFrom="#ffffff"
          initialGradientTo="#ffffff"
          onBack={handleBack}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-gray-900">
              ShortStack Pages
            </h1>
            <Button
              size="lg"
              className="bg-[#a24b33] hover:bg-[#be6d55] hover:text-black"
              onClick={handleCreatePage}
            >
              <Plus className="h-4 w-4" />
              Create Page
            </Button>
          </div>
          <div className="space-y-6">
            {pages.map((page) => (
              <div
                key={page._id}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex gap-6">
                  <div className="w-32 h-40 flex items-center justify-center overflow-hidden relative">
                    <div className="scale-[0.25] origin-top-left absolute top-0 left-0 w-[400px] h-[800px]">
                      <PhonePreview
                        deviceType="iphone"
                        backgroundColor={page.backgroundColor}
                        gradientFrom={page.gradientFrom}
                        gradientTo={page.gradientTo}
                        links={page.links}
                        onDeviceChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {page.title}
                        </h2>
                        <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                          <span>Feb 20, 2025</span>
                          <span>Updated a few seconds ago</span>
                        </div>
                        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                          <span>0 views</span>
                          <span>0 engagements</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleShare}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={onEdit}>
                          <Edit className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleDelete(page._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={selectedUrl}
      />
    </div>
  );
}
