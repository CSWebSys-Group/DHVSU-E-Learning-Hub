import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  const handleRedirectClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-transparent to-dhvsu bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold text-dhvsu">
        Something&apos;s missing
      </h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={handleBackClick}
          className="bg-dhvsu hover:bg-dhvsu/75"
          size="lg"
        >
          Go back
        </Button>
        <Button onClick={handleRedirectClick} variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
