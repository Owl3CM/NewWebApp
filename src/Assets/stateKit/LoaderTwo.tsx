import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

const LoaderTwo = ({ className = "loader-container", style }: Props) => {
  return <span className="loader-two" />;
};

export default LoaderTwo;
