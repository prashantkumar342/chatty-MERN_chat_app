import { useCallback, useState } from "react";
import axios from "axios";

const useRegisterUser = () => {
  const [regLoading, setRegLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "chatty_avatar_preset");
    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData
      );
      return response.data.secure_url;
    } catch (err) {
      throw new Error("Image upload failed: " + err.message);
    }
  };

  const registerUser = useCallback(
    async (username, email, phone, password, avatar) => {
      setRegLoading(true);

      try {
        let avatarUrl = "";
        if (avatar) {
          avatarUrl = await uploadImageToCloudinary(avatar);
        }

        const response = await fetch(import.meta.env.VITE_REG_USER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            password,
            avatar: avatarUrl,
          }),
          credentials: "include",
        });
        const registrationStatus = response.status;
        return registrationStatus;
      } catch (error) {
        setError(error);
        throw error; // Ensure the caller knows an error occurred
      } finally {
        setRegLoading(false);
      }
    },
    []
  );

  return { regLoading, error, registerUser };
};

export default useRegisterUser;
