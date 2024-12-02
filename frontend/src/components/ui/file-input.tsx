import { UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileWithPreview = File & { preview: string };

const FileInput = ({
  userId,
  className,
  setUploadDone,
  token,
  setIsOpen,
  setErrors,
}: {
  userId: number;
  className: string;
  setUploadDone: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Get the first file only
      setSelectedFile(
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setErrors([]); // Clear any previous error messages
    } else {
      setErrors((e) => [...e, "Please select a valid file."]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 400 * 400,
    multiple: false, // Restrict to a single file
    onDrop,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      setErrors([]);
      const res = await fetch(
        `http://127.0.0.1:8000/api/students/${userId}/update-profile-picture`,
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
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps({ name: "file" })} />
          <div className="flex flex-col items-center justify-center gap-4 cursor-pointer">
            <UploadIcon className="w-5 h-5" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
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
