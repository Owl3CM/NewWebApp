import Glob, { Permission } from "@/Glob";
import { ILang } from "@/Language";
import { IconButton, IconLink } from "@/Elements";
import React from "react";

export const PageHeaderContainer = ({ children }) => {
  return <div className="col-span-full bg-prim p-lg round-sm shadow-md col gap-lg">{children}</div>;
};

type Props = {
  service?: any;
  printable?: boolean;
  add?: {
    function?: () => void;
    label?: ILang;
    permission: Permission;
    to?: string;
  };
  children?: React.ReactNode;
};
const usePopup = false;
export const PageActions = ({ service, printable = !!service, add, children }: Props) => {
  const label = add && (add.label ?? (add.permission as ILang));
  // if (window.location.search.includes("show_add_popup")) {
  //   setTimeout(() => {
  //     document.getElementById("page-action-popup-button")?.click();
  //   }, 10);
  // }
  return (
    <div className="gap-lg row items-end ms-auto">
      {children}
      {/* {printable && <PrintButton service={service} />} */}
      {add &&
        Glob.HasPermission(add.permission) &&
        (!add.to || usePopup ? (
          <IconButton id="page-action-popup-button" icon="add-outline" onClick={add.function} label={label} />
        ) : (
          <IconLink to={add.to} icon="add-outline" label={label} variant="primary" />
        ))}
    </div>
  );
};
