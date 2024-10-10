import { Permission } from "@/Glob";
import { ILang, LangBuilder } from "@/Language";
import { IconKey } from "@/Assets";
import { Button, IconButton, IconLink, Label } from "@/Elements";
import { Popup, PopupMe, PopupOptions } from "@/Libs/eze-spark";

type ButtonProps = {
  label: ILang;
  icon: IconKey;
  permission?: Permission;
  onClick?: () => void;
  to?: string;
};

type Props = ButtonProps[];

export const OptionsListProvider = (buttons: Props, props: PopupOptions) => {
  if (!buttons.length) return;
  if (Popup.getPopup(props.id)) {
    Popup.remove(props.id);
    return;
  }
  props.target?.getAttribute("has-popup");
  PopupMe(
    <div className="options-list-provider">
      {buttons.map((button: ButtonProps) => {
        return button.to ? <IconLink key={button.label} variant="link" {...button} /> : <IconButton key={button.label} variant="link" {...button} />;
      })}
    </div>,
    {
      ...props,
    }
  );
};

type ConfirmAction =
  | "delete"
  | "add"
  | "edit"
  | "save"
  | "cancel"
  | "confirm"
  | "close"
  | "remove"
  | "removeAll"
  | "removeSelected"
  | "removeAllSelected"
  | "removeAllUnSelected"
  | "removeAllFiltered"
  | "removeAllUnFiltered";

interface ConfirmerProps {
  id?: string;
  title?: ILang;
  content?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  delete?: string;
  confirmLabel?: ILang;
  cancelLabel?: ILang;
  closeOnConfirm?: boolean;
  action?: ConfirmAction;
  actionLabel?: string;
}

export const Confirmer = ({
  id = "confirmer",
  title = "",
  onConfirm,
  onCancel = () => {
    Popup.remove(id);
  },
  confirmLabel = "confirm",
  cancelLabel = "cancel",
  closeOnConfirm = true,
  actionLabel = "",
  action = "delete",
  content = "",
}: ConfirmerProps) => {
  const actionFunc = LangBuilder[`${action}Action`];
  if (!title) title = actionFunc(actionLabel);

  PopupMe(
    <>
      {title && <Label className="text-xl" label={title} />}
      {content && <p>{content}</p>}
      <div className="row gap-2x px-xl">
        <Button
          variant="link"
          label={confirmLabel}
          onClick={() => {
            onConfirm();
            if (closeOnConfirm) Popup.remove(id);
          }}
        />
        <Button variant="link" label={cancelLabel} onClick={onCancel} />
      </div>
    </>,
    { id, childClass: "confirmer-popup" }
  );
};

const ConfirmerComponent = (props: ConfirmerProps) => {
  return <></>;
};
