// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRangePicker as DateRangePickerPKG } from "react-date-range";
import { IInputController, IconInputProps, InputProps } from "./types";
import { ILabeledController, IQueryProps, LabeledElement, QueryElementLabeled } from "../ElementsContainers";
import { format } from "date-fns";
import { IconInput } from "./Inputs";

interface IInputDateController extends IInputController {
  min?: number | string;
  max?: number | string;
}

export const IconDateController = (props: IInputDateController) => <ILabeledController Element={IconDateInput} {...props} />;
export const IconDate = (props: IInputDateController) => <LabeledElement Element={IconDateInput} {...props} />;
export const IconDateInput = ({ value, type = "date", setValue, isQuery = false, defaultValue, ...props }: IconInputProps & { isQuery: boolean }) => {
  try {
    if (value)
      if (type === "date") value = format(new Date(value), "yyyy-MM-dd");
      else if (type === "time") value = format(new Date(value), "HH:mm");
      else if (type === "datetime-local") value = format(new Date(value), "yyyy-MM-dd'T'HH:mm");

    if (defaultValue) {
      if (type === "date") defaultValue = format(new Date(defaultValue), "yyyy-MM-dd");
      else if (type === "time") defaultValue = format(new Date(defaultValue), "HH:mm");
      else if (type === "datetime-local") defaultValue = format(new Date(defaultValue), "yyyy-MM-dd'T'HH:mm");
    }
  } catch (e) {
    console.error(e);
    console.log({ value, defaultValue, id: props.id });
  }

  return (
    <IconInput //
      icon="calendar-outline"
      containerClass="input-date"
      type={type}
      value={value}
      setValue={(value) => {
        // if (type === "datetime-local" || isQuery === true) {
        if (isQuery === true) {
          value = new Date(value).toISOString();
        }
        setValue?.(value);
      }}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export const DateQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={IconDateInput} type="date" {...props} isQuery />;
};

type Props = {
  setValue: (key: string, value: any) => void;
  onChange: (ranges: any) => void;
  ranges: any[];
  value: any;
};
export const DateRangePicker = ({ label = "Date Range" }: Props) => {
  return <div>DATE RANGE</div>;
  // { setValue, onChange, ranges, value }
  // const [selectionRange, setSelectionRange] = React.useState({ startDate: new Date(), endDate: new Date(), key: "selection" });
  // const handleSelect = (ranges: any) => {
  //   console.log("ranges", ranges);

  //   setSelectionRange(ranges.selection);
  //   // onChange(ranges);
  // };

  // return (
  //   <div dir="ltr col">
  //     <div
  //       className="labled-element"
  //       onClick={(e) => {
  //         PopupMe(
  //           <div dir="ltr">
  //             <DateRangePickerPKG ranges={[selectionRange]} onChange={handleSelect} />
  //           </div>,
  //           {
  //             target: e.target,
  //           }
  //         );
  //       }}>
  //       <p>{label}</p>
  //       <p className="icon-button button-outline row min-w-max">
  //         <span>{Utils.formatDate(selectionRange?.startDate.toISOString())}</span>
  //         <span className="text-shark">to</span>
  //         <span>{Utils.formatDate(selectionRange?.endDate.toISOString())}</span>
  //       </p>
  //     </div>
  //   </div>
  // );
};
