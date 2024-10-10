import { Svgs, IconKey } from "./Svgs";
import Icon from "./Icon";
import { IconButton, Label, SearchInput } from "@/Elements";
import React from "react";
import { Wrapper } from "@/Containers";
import { Toast } from "@/Libs/eze-utils";

type Props = {};

const IconsViewer = (props: Props) => {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<IconKey[]>([]);
  React.useEffect(() => {
    setSelected(
      selected.filter((icon) => {
        return Object.keys(Svgs).includes(icon);
      })
    );
  }, []);
  return (
    <Wrapper>
      <div className="row-center gap-2x">
        <SearchInput value={query} setValue={setQuery} className="col-12 p-sm mb-sm" />
        {selected.length > 0 && (
          <div>
            <IconButton
              icon="delete-outline"
              onClick={() => {
                navigator.clipboard.writeText("yarn icons-remover " + selected.join(" ") + "&& yarn icons\n");
                // setSelected([]);
                Toast.success({
                  title: "Ctrl + V on TERMINAL then Enter",
                  timeout: 10000,
                });
              }}
              label="delete"
            />
          </div>
        )}
      </div>
      <div className="icons-viewer-container overflow-auto">
        {Object.keys(Svgs).map(
          (icon: IconKey) =>
            icon.includes(query) && (
              <div
                key={icon}
                style={{
                  border: "2px solid",
                  borderColor: selected.includes(icon) ? "var(--primary)" : "transparent",
                }}
                onClick={() => {
                  if (selected.includes(icon)) {
                    setSelected(selected.filter((i) => i !== icon));
                  } else {
                    setSelected([...selected, icon]);
                  }
                }}
                className="col-center gap-lg bg-prim round-sm px-sm py-md shadow-md">
                <Icon icon={icon} className="fill-red" />
                <Label customLabel={icon} className="text-xl text-center text-shark" />
              </div>
            )
        )}
      </div>
    </Wrapper>
  );
};

export default IconsViewer;
