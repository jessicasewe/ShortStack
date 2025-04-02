"use client";

import { useEffect, useState } from "react";
import { fetchAllPages, createPage, deletePage } from "@/service/api.service";
import { ShortStackPageView } from "@/app/_components/shortStack-page-view";
import ShortStackProfile from "@/app/_components/shortstackprofile";
import { jwtDecode } from "jwt-decode";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageTab() {
  const [hasCreatedPage, setHasCreatedPage] = useState(false);
  const [pages, setPages] = useState<
    {
      _id: string;
      links: any[];
      backgroundColor: string;
      gradientFrom: string;
      gradientTo: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserIdFromToken = (token: string): string => {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.userId;
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

        if (pages.length > 0) {
          setHasCreatedPage(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pages:", error);
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  useEffect(() => {
    if (pages.length === 0) {
      setHasCreatedPage(false);
    } else {
      setHasCreatedPage(true);
    }
  }, [pages]);

  const handleSaveChanges = async (
    links: Array<{ title: string; url: string; icon: string }>,
    backgroundColor: string,
    gradientFrom: string,
    gradientTo: string,
    username: string
  ) => {
    try {
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

      const createdPage = await createPage(pageData, token);
      console.log("Page created:", createdPage);

      const updatedPages = await fetchAllPages(userId, token);
      setPages(updatedPages);
      setHasCreatedPage(true);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await deletePage(pageId);

      setPages((prevPages) => prevPages.filter((page) => page._id !== pageId));
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex gap-6">
                <div className="w-32 h-40 flex items-center justify-center overflow-hidden relative">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Skeleton className="h-6 w-[150px] mb-2" />
                      <Skeleton className="h-4 w-[100px] mb-2" />
                      <Skeleton className="h-4 w-[120px]" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {hasCreatedPage ? (
        <ShortStackPageView
          onEdit={() => setHasCreatedPage(false)}
          savedLinks={pages.length > 0 ? pages[0].links : []}
          backgroundColor={
            pages.length > 0 ? pages[0].backgroundColor : "#fff0ec"
          }
          gradientFrom={pages.length > 0 ? pages[0].gradientFrom : "#f97316"}
          gradientTo={pages.length > 0 ? pages[0].gradientTo : "#facc15"}
          onDeletePage={handleDeletePage}
        />
      ) : (
        <ShortStackProfile
          handleSaveChanges={handleSaveChanges}
          initialLinks={pages.length > 0 ? pages[0].links : []}
          initialBackgroundColor={
            pages.length > 0 ? pages[0].backgroundColor : "#fff0ec"
          }
          initialGradientFrom={
            pages.length > 0 ? pages[0].gradientFrom : "#f97316"
          }
          initialGradientTo={pages.length > 0 ? pages[0].gradientTo : "#facc15"}
          onBack={() => {}}
        />
      )}
    </>
  );
}
