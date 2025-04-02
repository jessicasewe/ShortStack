"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Filter,
  Share2,
  MoreHorizontal,
  Copy,
  BarChart2,
  Trash,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ShareDialog } from "@/app/_components/share-dialog";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import PasswordModal from "@/app/_components/password-required";

interface LinkItem {
  id: string;
  title: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

export default function LinksPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedShortUrl, setSelectedShortUrl] = useState("");

  const handleShare = (url: string) => {
    console.log("Share button clicked, URL:", url);
    setSelectedUrl(url);
    setShareDialogOpen(true);
    console.log("shareDialogOpen:", shareDialogOpen);
  };

  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    domain: "shortstck.me",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreateLink = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl: newLink.url,
          title: newLink.title,
          password: isPasswordProtected ? password : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to create link.");
        return;
      }

      const data = await response.json();

      if (data.msg) {
        toast.info(data.msg);
        return;
      }

      const { originalUrl, shortUrl } = data;

      const newId = (links.length + 1).toString();
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newLinkItem: LinkItem = {
        id: newId,
        title: newLink.title || "Untitled",
        shortUrl,
        originalUrl,
        createdAt: currentDate,
      };

      setLinks((prevLinks) => [...prevLinks, newLinkItem]);

      setNewLink({ title: "", url: "", domain: "shortstck.me" });
      setIsDialogOpen(false);

      toast.success("Link created successfully!");
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("Failed to create link.");
    }
  };

  const handleAccessLink = async (shortUrl: string, password?: string) => {
    try {
      const response = await fetch(`http://localhost:5000/${shortUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to access link.");
        return;
      }

      const data = await response.json();
      window.location.href = data.originalUrl;
    } catch (error) {
      console.error("Error accessing link:", error);
      toast.error("Failed to access link.");
    }
  };

  useEffect(() => {
    const handleDirectAccess = async () => {
      const path = window.location.pathname;
      if (path.length > 1) {
        const shortUrlId = path.substring(1);
        const shortUrl = `http://localhost:5000/${shortUrlId}`;

        const response = await fetch(shortUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (response.status === 400) {
          const data = await response.json();
          if (data.msg === "Password required") {
            setSelectedShortUrl(shortUrlId);
            setIsPasswordModalOpen(true);
          }
        }
      }
    };

    handleDirectAccess();
  }, []);

  const handleLinkClick = (shortUrl: string) => {
    setSelectedShortUrl(shortUrl);
    setIsPasswordModalOpen(true);
  };

  const checkPasswordProtection = async (shortUrlId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/${shortUrlId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 400) {
        const data = await response.json();
        if (data.msg === "Password required") {
          setSelectedShortUrl(shortUrlId);
          setIsPasswordModalOpen(true);
        }
      } else if (response.ok) {
        const data = await response.json();
        window.location.href = data.originalUrl;
      }
    } catch (error) {
      console.error("Error checking password protection:", error);
      toast.error("Failed to check password protection.");
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/${selectedShortUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to access link.");
        return;
      }

      const data = await response.json();
      window.location.href = data.originalUrl;
    } catch (error) {
      console.error("Error accessing link:", error);
      toast.error("Failed to access link.");
    }
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the URL: ", err);
        toast.error("Failed to copy the URL!");
      });
  };

  const handleEdit = (link: LinkItem) => {
    setSelectedLink(link);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedLink) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === selectedLink.id ? { ...selectedLink } : link
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/links/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to delete link.");
        return;
      }

      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      toast("Link Deleted 😓.");
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link.");
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/links", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const transformedLinks = data.links.map((link: any) => ({
          id: link._id,
          title: link.title,
          shortUrl: link.shortUrl,
          originalUrl: link.originalUrl,
          createdAt: new Date(link.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));

        setLinks(transformedLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-900">ShortStack Links</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
              onClick={() => setIsDialogOpen(true)}
            >
              Create link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Link</DialogTitle>
              <DialogDescription>
                Enter the URL you want to shorten and customize your link
                settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Destination URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/your-long-url"
                  className="w-full"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Enter a title to help you remember this link"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="domain">Domain</Label>
                <Select
                  value={newLink.domain}
                  onValueChange={(value) =>
                    setNewLink({ ...newLink, domain: value })
                  }
                >
                  <SelectTrigger id="domain">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortstck.me">shortstck.me</SelectItem>
                    <SelectItem value="custom">Custom Domain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="password-protected"
                    checked={isPasswordProtected}
                    onCheckedChange={(checked) =>
                      setIsPasswordProtected(checked === true)
                    }
                  />
                  <Label htmlFor="password-protected">Password Protect</Label>
                </div>
                {isPasswordProtected && (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button
                className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
                onClick={handleCreateLink}
              >
                Create Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search links..." className="pl-10 w-full" />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Filter by created date
            </Button>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Add filters
          </Button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedItems.length > 0}
              onCheckedChange={() => {}}
            />
            <span>{selectedItems.length} selected</span>
          </div>
        </div>
        <Select defaultValue="active">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Show: Active</SelectItem>
            <SelectItem value="archived">Show: Archived</SelectItem>
            <SelectItem value="all">Show: All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-4 w-4 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : links.length > 0 ? (
          links.map((link) => (
            <div key={link.id} className="bg-white rounded-lg border p-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedItems.includes(link.id)}
                  onCheckedChange={() => handleSelectItem(link.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-orange-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{link.title}</h3>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(link.shortUrl);
                          }}
                          className="text-[#a24b33] hover:underline block"
                        >
                          {link.shortUrl}
                        </a>
                        <p className="text-sm text-gray-500">
                          {link.originalUrl}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(link.shortUrl)}
                        className="text-black hover:bg-orange-100"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(`https://${link.shortUrl}`)}
                        className="text-black hover:bg-orange-100"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 hover:bg-orange-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="hover:bg-orange-100">
                          <DropdownMenuItem
                            onClick={() => handleDelete(link.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <button className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4" />
                      Click data
                    </button>
                    <span>{link.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No links found. Create a new link to get started!
          </div>
        )}
      </div>

      <div className="text-center text-gray-500 py-8 border-t border-dashed mt-8">
        You've reached the end of your links
      </div>

      <Alert className="mt-4 bg-cyan-50 border-cyan-200">
        <Sparkles className="h-4 w-4 text-cyan-500" />
        <AlertDescription className="text-cyan-600">
          Change a link's destination, even after you've shared it. Get
          redirects with every plan.{" "}
          <a href="#" className="text-cyan-600 underline underline-offset-2">
            View plans
          </a>
        </AlertDescription>
      </Alert>

      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={selectedUrl}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the link details and save changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Destination URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/your-long-url"
                className="w-full"
                value={selectedLink?.originalUrl || ""}
                onChange={(e) =>
                  setSelectedLink((prev) =>
                    prev ? { ...prev, originalUrl: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title"
                value={selectedLink?.title || ""}
                onChange={(e) =>
                  setSelectedLink((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="domain">Domain</Label>
              <Select
                value={selectedLink?.shortUrl.split("/")[0] || "shortstck.me"}
                onValueChange={(value) =>
                  setSelectedLink((prev) =>
                    prev
                      ? {
                          ...prev,
                          shortUrl: `${value}/${prev.shortUrl.split("/")[1]}`,
                        }
                      : prev
                  )
                }
              >
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shortstck.me">shortstck.me</SelectItem>
                  <SelectItem value="custom">Custom Domain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button
              className="bg-[#a24b33] hover:bg-[#ebd4cd] hover:text-black"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </div>
  );
}
