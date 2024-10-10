import { GetLabel, ILang } from "@/Language";
import Glob, { Permission } from "@/Glob";

type Props = {
  permission: Permission;
  Component?: any;
};

const IsComponentPermitted = (permission: Permission, Component: any) => {
  // const isNotPermetedComponent = () => NotPermetedComponent({ permission });
  // isNotPermetedComponent.isNotPermeted = true;
  return Glob.HasPermission(permission) ? Component : () => NotPermetedComponent({ permission });
};
export const IsPermitted = (permission: Permission, Component: any) => {
  return Glob.HasPermission(permission) ? Component : null;
};
export const HasPermissions = (permissions: Permission[], Component: any) => {
  return permissions.every((p) => Glob.HasPermission(p)) ? Component : null;
};
export const HasOneOfPermissions = (permissions: Permission[], Component: any) => {
  return permissions.some((p) => Glob.HasPermission(p)) ? Component : null;
};

export const NotPermetedComponent = ({ permission }: Props) => {
  return (
    <div className="col center">
      <h1 className="text-red">
        "{permission}"{/* {GetLabel(permission)} */}
      </h1>
      <h2 className="text-center">
        {GetLabel("You do not have permission to access this page" as ILang)}
        <br />
        {GetLabel("Please contact your administrator" as ILang)}
      </h2>
    </div>
  );
};

export const NotPermetedPopupComponent = ({ permission }: Props) => {
  return (
    <div className="col center">
      <h1 className="text-red">
        "{permission}"{/* {GetLabel(permission)} */}
      </h1>
      <h2 className="text-center">
        {GetLabel("You do not have permission to access this page" as ILang)}
        <br />
        {GetLabel("Please contact your administrator" as ILang)}
      </h2>
    </div>
  );
};

export default IsComponentPermitted;
