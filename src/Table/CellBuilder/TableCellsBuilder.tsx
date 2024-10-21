import { GetLabel, ILang } from "@/Language";
import { Link } from "react-router-dom";
import { TableColumnDef } from "../Types";
import { OptionsColsButton } from "../ToggleColsButton";
import { Price } from "@/Attr";
import { IconInput, IconLinkButtonProps } from "@/Elements";
import { Icon, IconKey } from "@/Assets";
import { PopupMe } from "@/Libs/eze-spark";

export const CellTransactionBuilder = (val: any, type: any, props?: any) => (
  <td className="trans-table-td" data-table-trans-type={type} {...props}>
    {/* {val} */}
    <Price price={val} />
  </td>
);
export const CellTransactionsBuilder = (trans: any, props?: any) => (
  <td {...props}>
    {trans.map((t, i) => (
      <div
        key={t.id}
        style={{
          backgroundColor: i % 2 === 0 ? "var(--king)" : "var(--prim)",
        }}
        className="trans-table-td p-sm row justify-between gap-lg round-xs"
        data-table-trans-type={t.type}>
        <span className="text-md text-primary">{t.account_name}</span>
        <Price price={t.amount} />
      </div>
    ))}
  </td>
);

export const CellBuilder = (val: any, props?: any) => <td {...props}>{val}</td>;
export const CellBtnBuilder = (val: string, onClick: () => void, props?: any) => {
  return (
    <td {...props}>
      <button onClick={onClick} className="bg-owl text-prim p-lg round-md">
        {val}
      </button>
    </td>
  );
};
export const CellBooleanBuilder = (val: any, props?: any) => <td {...props}>{GetLabel(val ? "yes" : "no")}</td>;
export const CellPriceBuilder = (val: any, isoCode?: IsoCode, props?: any) => <td {...props}>{<Price isoCode={isoCode} price={val} />}</td>;
export const CellLinkIconBuilder = ({ to, ...props }: IconLinkButtonProps) => (
  <td className="pointer">
    <Link to={to}>
      <Icon icon={props.icon} className="fill-none text-nice" style={{ marginTop: 3, width: 22 }} />
    </Link>
  </td>
);
export const CellIconLinkBuilder = (icon: IconKey, to: string, props?: any) => (
  <td className="pointer" {...props}>
    <Link to={to}>
      <Icon
        icon={icon}
        className="fill-none text-primary"
        style={{
          marginTop: 3,
          width: 22,
        }}
      />
    </Link>
  </td>
);
export const CheckCellBuilder = (val: any, props?: any) => (
  <td {...props}>
    <IconInput checked={val} />
  </td>
);
export const CellOptionsBuilder = (onClick, props?: any) => ({
  id: "",
  cell: (item: any) => (
    <td
      onClick={(e) => onClick(e, item)}
      className="sticky pointer bg-prim top-0 left-0 hide-on-print overflow-visible td-options"
      style={{ width: 0, position: "sticky" }}>
      <OptionsColsButton />
    </td>
  ),
  // cell: (item: any) => CellLinkBuilder("details", to(item), props),
  hideOnPrint: true,
  hideInHeader: true,
});

export const TableShowMore = (to: Function, visible = true, props?: any) => {
  const id = "show";
  return {
    id,
    header: GetLabel("show"),
    visible,
    hideOnPrint: true,
    cell: (item: any) => CellLinkIconBuilder({ id, to: to(item), icon: "eye-outline" }),
  } as TableColumnDef;
};
export const TableUpdateAction = (to: Function, visible = true, props?: any) => {
  const id = "edit";
  return {
    header: GetLabel("edit"),
    id,
    // Todo : return this visi
    visible,
    cell: (item: any) => CellLinkIconBuilder({ id, to: to(item), icon: "edit-outline" }),
    hideOnPrint: true,
  } as TableColumnDef;
};
export const TableAction = (to: Function, id: ILang, icon: IconKey, visible = false, props?: Function) => {
  return {
    id,
    // Todo : return this visible
    visible,
    cell: (item: any) => CellLinkIconBuilder(icon, to(item), props?.(item)),
    hideOnPrint: true,
  } as TableColumnDef;
};

export const TableDeleteAction = ({ onClick, visible = true }) => {
  return {
    header: GetLabel("delete"),
    id: "delete",
    visible,
    cell: (item: any) => (
      <td className="pointer" onClick={(e) => onClick(item)}>
        <Icon icon="trash-outline" className="fill-red" />
      </td>
    ),
    hideOnPrint: true,
  } as TableColumnDef;
};

export const CellImgBuilder = (val: any, props?: any) => (
  <td
    {...props}
    onClick={() => {
      PopupMe(
        <img
          src={val}
          onError={(e) => {
            if (e.currentTarget.src === val)
              e.currentTarget.src = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg";
          }}
          alt=""
          style={{ width: "70vw", objectFit: "contain", maxHeight: "70vh" }}
        />
      );
    }}>
    <img
      src={val}
      onError={(e) => {
        if (e.currentTarget.src === val)
          e.currentTarget.src = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg";
      }}
      alt=""
      style={{ width: 30, height: 30, objectFit: "contain" }}
      className="round-md"
    />
  </td>
);
