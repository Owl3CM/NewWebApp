import React from "react";
import { Icon } from "../Icons";

type Props = {};

const EmptyBill = (props: Props) => {
  return (
    <div className="w-full col-center absolute left-0 right-0 top-1/3">
      <Icon icon="empty-bill" className="confirmer-icon" />
    </div>
  );
};

export default EmptyBill;
