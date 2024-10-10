import React from "react";

type VarinatType = "outlined" | "filled" | "standard";

type Props = {
  children?: any;
  variant?: VarinatType;
};

const FormTable = ({ children, variant }: Props) => {
  return <div className={`form-table ${variant}`}>{children}</div>;
};

export default FormTable;
