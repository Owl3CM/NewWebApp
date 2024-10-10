import { Icon } from "@/Assets";
import { Popup, PopupMe, PopupOptions } from "@/Libs/eze-spark";
import { FormProps } from "./Form";
import { ActionsProps, FormActions, GetFormActions } from "./FormActions";
import { StatusBee } from "@/Libs/eze-services";
import Glob, { Permission } from "@/Glob";
import { NotPermetedPopupComponent } from "@/Utils/CheckPermissions";

interface Props extends PopupOptions {
  componentProps: FormProps<any>;
}

export const PopupForm = (Component: any, { componentProps, ...props }: Props, permission?: Permission) => {
  if (!Glob.HasPermission(permission))
    return PopupMe(<NotPermetedPopupComponent permission={permission} />, {
      childClass: "form-popup",
      containerClass: "form-popup-container overflow-auto",
      animation: "slide-bottom",
      removeOnOutClick: true,
    });
  const containerProps = {
    children: <Component {...componentProps} />,
    service: componentProps.service,
  };
  console.log({ containerProps });

  PopupMe(FormContainer, {
    childClass: "form-popup",
    containerClass: "form-popup-container overflow-auto",
    removeOnOutClick: false,
    componentProps: containerProps,
    animation: "slide-bottom",
    ...props,
  });
};

export default PopupForm;

const FormContainer = ({ children, close, service }) => {
  console.log({ service });

  return (
    <>
      {children}
      <StatusBee service={service} />
    </>
  );
  return (
    <div className="relative">
      <Icon icon="close" onClick={close} />
      {children}
    </div>
  );
};
