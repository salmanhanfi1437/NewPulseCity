export const isValidIndianMobile = (mobile: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile.trim());
};


export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};


export const isValidPAN = (pan: string): boolean => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan.trim().toUpperCase());
};


export const isValidGST = (gst: string): boolean => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst.trim().toUpperCase());
};


// ✅ Utility function for formatting date nicely
export const formatDateTime = (isoString?: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

