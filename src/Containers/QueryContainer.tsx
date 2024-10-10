import { IconButton } from "@/Elements";
import { Filters, Sorts } from "./Filters";
import { ObserverBee, Queryable } from "@/Libs/eze-services";
import { GetLabel } from "@/Language";

type Props = {
  queryBuilder?: any;
  service: {
    filters?: any[];
    sorts?: any[];
  };
  children?: any;
};

const QueryContainer = ({ children, queryBuilder = Queryable, service }: Props) => {
  // return (
  //   <ObserverBee
  //     hive={service.queryParamsHive}
  //     Component={({ honey }) => {
  return (
    <>
      <div className="query-container wrap items-end">
        <Filters queryBuilder={queryBuilder} service={service} />
        <Sorts queryBuilder={queryBuilder} service={service} />
        {children}
      </div>

      {/* <div className="row gap-lg">
        {Object.entries(honey).map(([key, value]: any) => {
          return (
            <IconButton
              icon="close-outline"
              // onTransitionEnd={(target) => {}}
              onClick={({ e, setState, state }) => {
                if (state === "fade-out") return;
                setState("fade-out");
                setTimeout(() => {
                  queryBuilder.updateQueryParams({ id: key, value: "" });
                }, 300);
              }}
              key={key}
              customLabel={`${GetLabel(key)} : ${value}`}
            />
          );
        })}
      </div> */}
    </>
  );
  //     }}
  //   />
  // );
};

export default QueryContainer;
