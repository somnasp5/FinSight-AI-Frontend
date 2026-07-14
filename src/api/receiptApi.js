import axiosInstance from "./axiosInstance";

// POST /api/receipt/upload
// formData must contain a "file" field with the file.
// axiosInstance already attaches the JWT, so we only need to set the
// multipart content type here.
export const uploadReceipt = async (formData) => {
  const response = await axiosInstance.post("/receipt/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
