import React from "react";
import { createPortal } from "react-dom";

type Props = { children: any };

const TopbarAction = ({ children }: Props) => {
  const [loaded, setLoaded] = React.useState(null);
  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 10);
  }, []);

  return loaded && createPortal(children, document.getElementById("top-bar-action"));
};

export default TopbarAction;
