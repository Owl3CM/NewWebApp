import { Fragment } from "react";
import { ObserverBees } from "@/Libs/eze-services";
import { IconButton } from "@/Elements";
import { PrintMe } from "@/Libs/eze-spark";
import { ITableService } from "./TableService";
import { Lang } from "@/Language";
import { ToggleColsButton } from "./ToggleColsButton";
import { Grid } from "@/Containers";

interface DataTableProps {
  service: ITableService;
}
export const BaseTable = ({ service }: DataTableProps) => (
  <ObserverBees
    hiveCluster={{ data: service.dataHive, visibleColumns: service.columnsHive }}
    Component={({ cell }) => <Table service={service} data={cell.data} visibleColumns={cell.visibleColumns} />}
    // Component={({ cell }) => <Cable service={service} data={cell.data} visibleColumns={cell.visibleColumns} />}
  />
);

const Table = ({ service, data, visibleColumns }) => {
  if (!data) return <div />;

  return (
    <table data-fade={data.length <= 25} className="round-md shadow-md">
      <thead>
        <tr>
          <>
            {service.showIndex && <th style={{ width: "40px" }}>{Lang.tableIndex}</th>}
            {visibleColumns
              .filter((o) => o.hideInHeader !== true)
              .map((col) => (
                <th key={col.id} colSpan={col.colSpan}>
                  {col.header}
                </th>
              ))}
            {service.toggleColumnsBtnVisible !== false && (
              <th className="sticky top-0 left-0 hide-on-print overflow-visible" style={{ width: 0 }}>
                <ToggleColsButton service={service} />
              </th>
            )}
          </>
          {/* ) : (
            <th className="opacity-0">_</th>
          )} */}
        </tr>
      </thead>

      <tbody>
        {service.showIndex
          ? data.map((item, i) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      service.toggleItemSelection(item);
                    }}
                  />
                </td>
                <td style={{ width: "40px" }}>{i + 1}</td>
                {visibleColumns.map(({ id, cell, ...props }) => (
                  <Fragment key={id}>{cell(item, props)}</Fragment>
                ))}
                <td className="opacity-0 hide-on-print"></td>
              </tr>
            ))
          : data.map((item) => (
              <tr key={item.id}>
                {visibleColumns.map(({ id, cell, ...props }) => (
                  <Fragment key={id}>{cell(item, props)}</Fragment>
                ))}
                {/* <td className="opacity-0 hide-on-print"></td> */}
              </tr>
            ))}

        {/* <tr className="sticky bottom-0">
          <td style={{ width: "40px", }}>{data.length}</td>
          {visibleColumns.map(({ id, cell, ...props }) => (
            <Fragment key={id}>{cell(data[data.length - 1], props)}</Fragment>
          ))}
        </tr> */}
      </tbody>
    </table>
  );
};

export const PrintTable = ({ service }: DataTableProps) => {
  PrintMe(<Table service={service} data={service.dataHive.honey} visibleColumns={service.visibleColumns.filter((col) => !col.hideOnPrint)} />);
};

export const PrintButton = ({ service }: any) => {
  return (
    <IconButton
      icon="printer-4-outline"
      label="print"
      onClick={() => {
        PrintTable({ service });
      }}
    />
  );
};
const Cable = ({ service, data, visibleColumns }) => {
  if (!data) return <div />;
  return (
    <>
      {service.toggleColumnsBtnVisible !== false && (
        <div className="sticky bg-king top-0 mr-auto left-0 hide-on-print overflow-visible" style={{ width: 0 }}>
          <ToggleColsButton service={service} />
        </div>
      )}
      <Grid>
        {data.map((item) => (
          <div className="bg-king p-lg round-lg" key={item.id}>
            {visibleColumns.map(({ id, cell, header, ...props }) => (
              <div className="row-center gap-lg" key={id}>
                <p className="text-shark text-md">{header}:</p>
                {cell(item, props)}
              </div>
            ))}
          </div>
        ))}
      </Grid>
    </>
  );
};
