import { GetLabel } from "@/Language";

export const CellPackageTypeBuilder = (val: any, props?: any) => (
  <td {...props}>
    <p data-package-type={val} className="package-type ">
      {GetLabel(val)}
    </p>
  </td>
);
export const CellOrderStatusBuilder = (status: any, statusStr: any, props?: any) => (
  <td {...props}>
    <p data-order-status={status} className="order-status">
      {statusStr}
    </p>
  </td>
);
