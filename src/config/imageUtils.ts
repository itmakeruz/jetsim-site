export const getStorageBaseUrl = () => {
  const storageUrl = import.meta.env.VITE_STORAGE_URL;
  const apiUrl = import.meta.env.VITE_API_URL;

  if (storageUrl) {
    return storageUrl;
  }

  // If using API URL, remove /api suffix if present
  if (apiUrl) {
    return apiUrl.replace(/\/api$/, "");
  }

  return "";
};

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // Construct full URL
  const baseUrl = getStorageBaseUrl();
  return `${baseUrl}/${cleanPath}`;
};

export const getPassportImageUrl = (passportPath: string) => {
  return getImageUrl(passportPath);
};

/**
 * Get news photo URL specifically
 * @param {string} photoPath - The news photo path
 * @returns {string} Full news photo URL
 */
export const getNewsPhotoUrl = (photoPath: string) => {
  return getImageUrl(photoPath);
};
