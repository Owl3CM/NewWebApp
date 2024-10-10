import { ILang } from "@/Language";
import React from "react";
import { FormActions } from "./FormActions";
import { IFormHive } from "@/Libs/eze-services";

export interface FormProps<T = any> {
  // service: IFormService<any, any>;
  formHive?: IFormHive<T>;
  onSubmit?: (e?: any, validateKeys?: any) => void;
  className?: string;
  submitBtnLabel?: ILang;
  btnClassName?: string;
  actions?: any;
  close?: any;
  actionsClassName?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  size?: "auto" | "xs" | "sm" | "md" | "lg" | "xl" | "2x" | "3x";
  validateKeys?: Array<string>;
  [key: string]: any;
}

export function Form<T>({
  formHive,
  children,
  prev,
  onSubmit = formHive?.submit,
  submitBtnLabel = prev ? "next" : "submit",
  className = "form",
  btnClassName = "",
  close,
  actions: Actions = FormActions,
  actionsClassName = "form-actions",
  containerClassName = "",
  validateKeys,
  size = "auto",
  ...props
}: FormProps<T> & { children: React.ReactNode }) {
  return (
    <form
      className={containerClassName}
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(e, validateKeys);
      }}
      data-size={size}
      {...props}>
      <div className={className}>{children}</div>
      {Actions && (
        <div className={actionsClassName}>
          <Actions btnClassName={btnClassName} submitLabel={submitBtnLabel} close={close} formHive={formHive} prev={prev} />
        </div>
      )}
    </form>
  );
}
