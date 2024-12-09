import { FaUpload } from "react-icons/fa";
import { useState, useRef } from "react";

type FileWithPreview = File & { preview: string };

const FileInput = ({
  userId,
  className,
  setUploadDone,
  token,
  setIsOpen,
  setErrors,
  userType,
}: {
  userId: number;
  className: string;
  setUploadDone: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  userType: "S" | "T";
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      setErrors([]);
      const res = await fetch(
        `http://127.0.0.1:8000/api/${
          userType === "S" ? "students" : userType === "T" ? "teachers" : ""
        }/${userId}/update-profile-picture`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat() as string[];
          setErrors(errorMessages);
        } else {
          setErrors((e) => [...e, "Something went wrong"]);
        }
      } else {
        console.log(data);
        setSelectedFile(null); // Clear file after upload
        setUploadDone(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center flex-col rounded-lg w-full h-auto bg-white p-5 mb-3 mt-3">
          <div
            className="p-3 grid placeitems-center border-2 border-dashed rounded-lg cursor-pointer"
            onClick={() => handleInputClick()}
          >
            <h4 className="flex gap-2 text-neutral-800 items-center justify-center">
              <FaUpload />
              Choose image to upload.
            </h4>
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={(e) => {
                e.preventDefault();
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  const imageURL = URL.createObjectURL(file);
                  setSelectedFile(file);
                  setImagePreview(imageURL); // Set preview image
                }
              }}
            />
          </div>

          {imagePreview && (
            <div className="mt-5">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isLoading && (
            <button
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:opacity-90 transition-opacity text-dhvsu font-semibold w-full py-2 rounded"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FileInput;
