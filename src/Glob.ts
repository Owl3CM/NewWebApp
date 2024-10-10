import { createHive } from "./Libs/eze-services";

type LabelPath = {
  label: string;
  to?: string;
  buttonId?: string;
};
export default class Glob {
  static NotificationsCountHive = createHive(0);
  //  NEW
  static UserHive = createHive(null as any, {
    storage: "localStorage",
    storeKey: "user_infos",
  });

  static HasPermission = (permission: Permission) => {
    // return false;
    return Glob.Permissions[permission] !== false;
  };
  static AddPermission = (permission: Permission) => {
    Glob.Permissions[permission] = true;
  };
  static RemovePermission = (permission: Permission) => {
    Glob.Permissions[permission] = false;
  };
  static AddPermissions = (permissions: Permission[]) => {
    permissions.forEach((permission) => {
      Glob.Permissions[permission] = true;
    });
  };
  static RemovePermissions = (permissions: Permission[]) => {
    permissions.forEach((permission) => {
      Glob.Permissions[permission] = false;
    });
  };
  static ClearPermissions = () => {
    Object.keys(Glob.Permissions).forEach((permission) => {
      Glob.Permissions[permission] = false;
    });
  };

  static Init = () => {};

  static Login = async ({}) => {};

  static SetupPermissions = async () => {
    try {
      // const permissions = await Client.getPermissions();
      // Glob.AddPermissions(permissions as Permission[]);
    } catch {}
  };

  static Logout = async () => {};

  static Permissions = {
    "view-users": false,
  };
}

export type Permission = keyof typeof Glob.Permissions;
