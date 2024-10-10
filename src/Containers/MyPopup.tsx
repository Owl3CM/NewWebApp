import { Icon } from "@/Assets";
import { Label, ILabel } from "@/Elements";
import { Popup, PopupMe } from "@/Libs/eze-spark";

type Props = {
  close?: () => void;
  children: any;
} & ILabel;

const PopupChild = ({ close, label, customLabel, children }: Props) => {
  return (
    <>
      <div className="row-center">
        <Icon icon="close" onClick={close} />
        <Label label={label} customLabel={customLabel} />
      </div>
      {children}
    </>
  );
};

const MyPopup = (Children: any, props, id) => {
  if (!id) id = `popup-id-${Math.random()}`;
  return PopupMe(PopupChild, {
    id,
    componentProps: {
      children: <Children {...props} />,
      close: () => {
        Popup.remove(id);
      },
      label: "edit",
    },
    childClass: "round-lg p-xl gap-xl bg-king",
  });
};

export default MyPopup;
