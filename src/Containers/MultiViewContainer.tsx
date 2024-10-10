import React from "react";
import { Bee } from "@/Libs/eze-services";
import { ITableService, Table } from "@/Table";
import { Icon } from "@/Assets";

type Props = {
  service: ITableService;
  cardsContainer: React.ReactNode;
};

const MultiViewContainer = ({ service, cardsContainer }: Props) => {
  return (
    <>
      <Bee
        hive={service.viewTypeHive}
        Component={({ honey, setHoney }) => {
          const isTable = honey === "table";
          return (
            <>
              {isTable ? (
                <>
                  <Table service={service} />
                  <Icon
                    className="absolute size:40px fill-none stroke-owl round-md bg-prim shadow-md bottom:70px right-lg"
                    icon="table-list-outline"
                    onClick={() => setHoney("cards")}
                  />
                </>
              ) : (
                <>
                  {cardsContainer}
                  <Icon
                    className="absolute size:40px fill-owl round-md bg-prim shadow-md bottom:70px right-lg"
                    icon="tablet-outline"
                    onClick={() => setHoney("table")}
                  />
                </>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default MultiViewContainer;
