import { useState } from "react";
import { ITableService } from "./TableService";
import { PopupMe } from "@/Libs/eze-spark";
import { Button, IconButton, InputLabel } from "@/Elements";
import { Icon, IconKey } from "@/Assets";
import { Lang } from "@/Language";

type Props = {
  service: ITableService;
};

export const ToggleColsButton = ({ service }: Props) => {
  return (
    <Icon
      onClick={(e) =>
        ShowDataTableViewOptions({
          currentTarget: e.currentTarget,
          columns: service.columns,
          toggle: service.toggleColumnVisibility,
          reset: service.resetColumns,
          toggleAll: service.toggleAllColumns,
        })
      }
      icon="menu-dots-outline"
      // icon="column-add-outline"
      className="pointer p-sm fill-owl bg-king round-sm"
      style={{ marginBottom: -2 }}
    />
  );
};

type OptionsColsButtonProps = {
  onClick: (e: any) => void;
};

export const OptionsColsButton = () => {
  return <Icon icon="menu-dots-outline" style={{ marginBottom: -8 }} />;
};
//  <Button variant="primary" className="self-start" label="toggleColumns" />;

const ShowDataTableViewOptions = ({ currentTarget, ...props }) => {
  let y = Math.round(currentTarget.getBoundingClientRect().top) + 20;
  let placement = "left" as any;
  let animation = "slide-left" as any;
  // if (window.innerHeight < 720) {
  //   y = -10;
  //   // placement = "bottom-left";
  //   animation = "slide-bottom";
  // }

  PopupMe(DataTableViewOptions, {
    // target: currentTarget,
    componentProps: props,
    animation,
    childClass: "bg-king shadow-lg round-lg min-w:280px",
    id: "data-table-view-options",
    containerClass: "p-xl",
    placement,
    offset: { x: 0, y },
  });
};

interface DataTableViewOptionsProps {
  columns: any[];
  toggle: (col: any) => void;
  reset: () => void;
  toggleAll: (checked?: boolean) => void;
}

function DataTableViewOptions({ columns, toggle, reset, toggleAll }: DataTableViewOptionsProps) {
  const [, render] = useState(0);
  const allSelected = !columns.some((col) => col.visible !== false);

  return (
    <>
      <div className="px-xl pb-0 gap-sm row justify-between">
        <Button
          icon="check"
          variant="link"
          onClick={() => {
            toggleAll(allSelected);
            render((prev) => prev + 1);
          }}
          label={allSelected ? "select_all" : "select_none"}
        />
        <Button
          icon="check"
          variant="link"
          onClick={() => {
            reset();
            render((prev) => prev + 1);
          }}
          customLabel={Lang.reset}
          label="reset"
        />
      </div>
      <div className="px-xl col max-h:50vh overflow-auto">
        {columns.map((column) => {
          return (
            column.id && (
              <InputLabel
                type="checkbox"
                variant="checkbox"
                key={column.header}
                checked={column.visible}
                // state={column.visible ? "idle" : "not-selected"}
                onClick={() => {
                  toggle(column);
                  render((prev) => prev + 1);
                }}
                onChange={() => {}}
                customLabel={column.header}
              />
            )
          );
        })}
      </div>
    </>
  );
}
