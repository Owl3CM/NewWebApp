export * from "./types";
import { GetLabel, ILang, ILangBuilder, LangBuilder } from "@/Language";
import { Icon } from "@/Assets";
import { IconLabelProps, IconsLabelProps, LabelProps, NoVariants_IconLabelProps, NoVariants_IconsaLbelProps } from "./types";
import { ControllerProps, SilentInfoLabeledController } from "../ElementsContainers";
import { Grid } from "@/Containers";
import { DatesFormats, Utils } from "@/Utils";
import { format, parse } from "date-fns";
import { arDZ } from "date-fns/locale";

export const NoVariants_IconLabel = ({
  icon,
  label,
  customLabel,
  iconPosition = "start",
  iconClass = "",
  labelClass = "",
  containerClass = "",
  children,
  error,
  ...props
}: NoVariants_IconLabelProps) => {
  return (
    <div className={containerClass} data-icon-position={iconPosition} data-form-error={error} {...props}>
      <Icon icon={icon} className={iconClass} />
      <_Label label={label} customLabel={customLabel} className={labelClass} />
      {children}
    </div>
  );
};

export const NoVariants_IconsLabel = ({
  startIcon,
  endIcon,
  label,
  customLabel,
  labelClass = "",
  containerClass = "",
  state,
  ...props
}: NoVariants_IconsaLbelProps) => {
  return (
    <div className={containerClass} {...props}>
      <Icon {...startIcon} />
      <_Label customLabel={customLabel} label={label} className={labelClass} />
      <Icon {...endIcon} />
    </div>
  );
};

export const IconLabel = ({ containerClass = "", variant, state, ...props }: IconLabelProps) => (
  <NoVariants_IconLabel data-label-state={state} containerClass={`icon-label icon-label-${variant} ${containerClass}`} {...props} />
);

export const IconsLabel = ({ variant, containerClass, state, ...props }: IconsLabelProps) => (
  <NoVariants_IconsLabel data-label-state={state} containerClass={`icon-label icon-label-${variant} ${containerClass}`} {...props} />
);

// const _Label = ({ label, customLabel, ...props }: LabelProps) => <span {...props}>{customLabel ?? Lang[label]}</span>;

export const InfoLabel = ({ info, label, className = "bg-king row round-md py-sm px-lg" }: LabelProps & { variant?: string; info?: string | number }) => (
  <p className={className}>
    <span className="label text-sm text-shark min-w:70px">{GetLabel(label)}:</span>
    &nbsp;&nbsp;
    <span className="label text-md">{GetLabel(info)}</span>
  </p>
);
export const InfoPriceLabel = ({ info, label, className = "bg-king round-md py-sm px-lg" }: LabelProps & { variant?: string; info?: string | number }) => (
  <p className={className}>
    <span className="label text-sm text-shark">{GetLabel(label)}</span>
    :&nbsp;&nbsp;
    <span className="label text-lg price">{info}</span>
  </p>
);
export const Label = ({ label, customLabel, className = "", variant = "label", ...props }: LabelProps & { variant?: string }) => (
  <span className={`${variant} ${className}`} {...props}>
    {customLabel !== undefined ? customLabel : GetLabel(label)}
  </span>
);
export const _Label = Label; // ({ label, customLabel, ...props }: LabelProps) => <span {...props}>{customLabel ?? Lang[label]}</span>;

type LabelBuilderProps = {
  builder: ILangBuilder;
  value: any;
  variant?: string;
  className?: string;
};

export const LabelBuilder = ({ builder, value, variant = "label", className = "", ...props }: LabelBuilderProps) => (
  <span className={`${variant} ${className}`} {...props}>
    {(LangBuilder as any)[builder](value as never)}
  </span>
);

interface InfoProps {
  label?: ILang;
  variant?: string;
  className?: string;
}

interface InfoTextProps {
  value?: string;
  size?: "lg" | "2x" | "3x" | "4x";
  label: ILang;
}
interface InfoNumberProps {
  value?: number;
  size?: "lg" | "2x" | "3x" | "4x";
}
interface InfoDateProps {
  format?: keyof typeof DatesFormats;
  value?: Date;
}

export const Info = ({ label, value, variant = "label", className = "", size = "xl", ...props }: InfoTextProps) => (
  <span className={` text-${size}`}>{GetLabel(value)}</span>
);
export const InfoNumber = ({ label, value, variant = "label", className = "", size = "xl", ...props }: InfoNumberProps) => (
  <span className={` text-${size}`}>{Utils.formatNumber(value)}</span>
);
export const InfoDate = ({ label, value, format, variant = "label", className = "", ...props }: InfoNumberProps) => (
  <span className=" text-xl">{Utils.formatDate(value, format)}</span>
);

export const InfoTime = ({ value }: { value: string }) => {
  const parsedDate = parse(value, "HH:mm:ss", new Date());
  const formattedTime = format(parsedDate, "h:mm a", { locale: arDZ });
  return <span className="label text-lg">{formattedTime}</span>;
};

export const InfoTileController = (props: InfoTextProps & ControllerProps) => <SilentInfoLabeledController Element={Info} {...props} />;
export const InfoNumberTile = (props: InfoNumberProps & ControllerProps) => <SilentInfoLabeledController Element={InfoNumber} {...props} />;

export const InfoDateTile = (props: InfoDateProps & ControllerProps) => <SilentInfoLabeledController Element={InfoDate} {...props} />;
export const InfoTimeTile = (props: InfoTextProps & ControllerProps) => <SilentInfoLabeledController Element={InfoTime} {...props} />;

export const InfoTileContainer = ({ children }) => {
  return (
    <Grid className="info-tile-container px-3x" size="lg">
      {children}
    </Grid>
  );
};

export const PageTitle = ({ label, className = "", ...props }: InfoProps) => (
  <h2 className={`page-title ${className}`} {...props}>
    {GetLabel(label)}
  </h2>
);

// type InfoBuilderProps = {
//   label: ILang;
//   value: string;
//   variant?: string;
//   className?: string;
// };

// export const InfoBuilder = ({ label, value, variant = "label", className = "", ...props }: InfoBuilderProps) => (
//   <p className={`${variant} ${className}`} {...props}>
//     <span className="label text-md text-shark">{GetLabel(label)}</span>
//     :&nbsp;&nbsp;
//     <span className="label text-lg">{GetLabel(value)}</span>
//   </p>
// );

export const InfoArea = ({ label, value, variant = "label", className = "", ...props }: InfoTextProps) => (
  <span className="info-area text-xl">{GetLabel(value)}</span>
);

export const InfoLabeled = (props: InfoTextProps) => <InfoLabeledContainer Element={Info} {...props} />;
export const InfoNumberLabeled = (props: InfoNumberProps) => <InfoLabeledContainer Element={InfoNumber} {...props} />;
export const InfoDateLabeled = (props: InfoDateProps) => <InfoLabeledContainer Element={InfoDate} {...props} />;
export const InfoTimeLabeled = (props: InfoTextProps) => <InfoLabeledContainer Element={InfoTime} {...props} />;
export const InfoAreaLabeled = (props: InfoTextProps) => <InfoLabeledContainer Element={InfoArea} {...props} />;

export const InfoLabeledContainer = ({
  label,
  value,
  variant = "label",
  Element,
  containerClass = "",
  size = "xl",
  ...props
}: InfoTextProps & { Element: any }) => (
  <p className={"row info-tile" + containerClass}>
    <span className="text-xl text-shark font-bold" style={{ minWidth: 180 }}>
      {GetLabel(label)}
      &nbsp;:&nbsp;&nbsp;
    </span>
    <Element size={size} value={value} />
  </p>
);
