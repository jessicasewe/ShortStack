import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a new page
export const createPage = async (
  pageData: {
    userId: string;
    username: string;
    title: string;
    backgroundColor: string;
    gradientFrom: string;
    gradientTo: string;
    bio: string;
    socialIcons: Array<{ name: string; url: string; icon: string }>;
    links: Array<{ title: string; url: string; icon: string }>;
  },
  token?: string
) => {
  console.log("Sending request to create page with data:", pageData);

  try {
    const response = await api.post("/api/pages", pageData);
    console.log("Page creation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    throw error;
  }
};

// Fetch all pages for a user
export const fetchAllPages = async (userId: string, token?: string) => {
  try {
    const response = await api.get(`/api/pages/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
};

// Fetch a single page by ID
export const fetchPageById = async (pageId: string) => {
  try {
    const response = await api.get(`/api/page/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching page by ID:", error);
    throw error;
  }
};

// Update a page by ID
export const updatePage = async (
  pageId: string,
  pageData: {
    title?: string;
    backgroundColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
    bio?: string;
    socialIcons?: Array<{ name: string; url: string; icon: string }>;
    links?: Array<{ title: string; url: string; icon: string }>;
  }
) => {
  try {
    const response = await api.put(`/api/page/${pageId}`, pageData);
    return response.data;
  } catch (error) {
    console.error("Error updating page:", error);
    throw error;
  }
};

// Delete a page by ID
export const deletePage = async (pageId: string) => {
  try {
    const response = await api.delete(`/api/page/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting page:", error);
    throw error;
  }
};
