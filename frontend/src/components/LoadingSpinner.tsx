import React from "react";
import GridLoader from "react-spinners/GridLoader";

type Props = {
  loading: boolean;
};

const LoadingSpinner = ({ loading }: Props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <GridLoader
        color="#701D0B"
        loading={loading}
        size={34}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
