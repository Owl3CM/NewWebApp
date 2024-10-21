import React from "react";
import { Icon } from "@/Assets";
import { Popup, PopupMe } from "@/Libs/eze-spark";
import { BaseTable } from "./BaseTable";
import { ITableService } from "./TableService";
import { JsonBuilder } from "@/Libs/eze-utils";
import { Wrapper } from "@/Containers";
import { Bee, ObserverBee } from "eze-services";

interface Props {
  service: ITableService;
  children?: React.ReactNode;
}

export const Table = React.memo(({ service, children }: Props) => {
  return (
    <Wrapper
      service={service}
      className="table-parent overflow-auto round-lg p-0 gap-lg col"
      //style={{ height: "fit-content", maxHeight: "100%"}}
    >
      <Icon
        icon="json-outline"
        className="bg-bord round-lg p-sm size-32 fixed bottom-6x left-lg z-50 cursor-pointer"
        onClick={() => {
          PopupMe(
            <>
              <Icon className="sticky z-50 top-0 right-0 p-sm cursor-pointer fill-white bg-red round-full" icon="close-outline" onClick={Popup.removeAll} />
              <JsonBuilder json={service.dataHive.honey} className="col gap-2x p-lg round-lg max-w:90vw" />
            </>
          );
        }}
      />
      {children}

      <BaseTable service={service} />
    </Wrapper>
  );
});
