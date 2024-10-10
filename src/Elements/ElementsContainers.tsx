import { Label } from "./Labels/Labels";
import { ILang } from "@/Language";
import { FormBee, IFormHive, INestedFormHive, QueryBuilder } from "@/Libs/eze-services";
import { TimedCallback } from "@/Libs/eze-utils";
import { Popup, PopupMe } from "@/Libs/eze-spark";
import { Button } from "./Buttons/Buttons";
import { QrReader } from "react-qr-reader";
import { Icon } from "@/Assets";

interface LabeledProps {
  label?: ILang;
  customLabel?: string;
  Element: any;
  [key: string]: any;
}
export interface ControllerProps<T> {
  id?: keyof T;
  hive: IFormHive<T> | INestedFormHive<T>;
}
interface ControllerElementProps<T> extends LabeledProps {
  hive: IFormHive<T> | INestedFormHive<T>;
  id?: keyof T;
  label?: ILang;
  customLabel?: string;
  Element: any;
}

export function Controller<T>({ id, hive, Element, ...props }: ControllerElementProps<T>) {
  const _Hive = ((hive as IFormHive<T>).getNestedHive ? (hive as IFormHive<T>).getNestedHive(id) : hive) as INestedFormHive<T>;
  return (
    <FormBee
      hive={_Hive}
      Component={({ honey, validate, error, silentSetHoney }) => {
        return (
          <Element
            setValue={validate}
            value={honey}
            error={error}
            id={id}
            // silentSetHoney={silentSetHoney}
            {...props}
          />
        );
      }}
    />
  );
}
export function ISilentController<T>({ id, hive, Element, ...props }: ControllerElementProps<T>) {
  const _Hive = ((hive as IFormHive<T>).getNestedHive ? (hive as IFormHive<T>).getNestedHive(id) : hive) as INestedFormHive<T>;
  return (
    <FormBee
      hive={_Hive}
      Component={({ honey, validate, error, silentSetHoney }) => {
        return (
          <Element
            setValue={silentSetHoney}
            value={honey}
            error={error}
            // silentSetHoney={silentSetHoney}
            {...props}
          />
        );
      }}
    />
  );
}

export function ILabeledController<T>({ id, hive, label = id as ILang, customLabel, Element, ...props }: ControllerElementProps<T>) {
  return (
    <div className="labled-element">
      <Label className="input-label" customLabel={customLabel} label={label} />
      <Controller id={id} hive={hive} label={label} customLabel={customLabel} Element={Element} {...props} />
    </div>
  );
}
export function ISilentLabeledController<T>({ id, hive, label = id as ILang, customLabel, Element, ...props }: ControllerElementProps<T>) {
  return (
    <div className="labled-element">
      <Label className="input-label" customLabel={customLabel} label={label} />
      <ISilentController id={id} hive={hive} label={label} customLabel={customLabel} Element={Element} {...props} />
    </div>
  );
}

export function IQrLabeledController<T>({ id, hive, label = id as ILang, customLabel, Element, ...props }: ControllerElementProps<T>) {
  return (
    <div className="labled-element">
      <Label className="input-label" customLabel={customLabel} label={label} />
      <Controller
        id={id}
        hive={hive}
        label={label}
        customLabel={customLabel}
        Element={(props) => (
          <div className="row-center gap-xl">
            <QrIconReader setValue={props.setValue} />
            <Element {...props} />
          </div>
        )}
        {...props}
      />
    </div>
  );
}

export const SilentInfoLabeledController = ({
  id,
  service,
  label = id as ILang,
  customLabel,
  Element,
  containerClass = "",
  ...props
}: ControllerElementProps) => (
  <Controller
    id={id}
    formService={service}
    Component={({ value, silentSet, error }) => (
      <div className={"row-cneter info-tile" + containerClass}>
        <Label className="input-label text-xl" customLabel={customLabel} label={label} /> :&nbsp;&nbsp;
        <Element label={label} value={value} setValue={silentSet} error={error} {...props} />
      </div>
    )}
  />
);

export const LabeledElement = ({ id, label = id as ILang, customLabel, Element, ...props }: LabeledProps) => (
  <div className="labled-element">
    <Label className="input-label" customLabel={customLabel} label={label} />
    <Element label={label} id={id} {...props} />
  </div>
);

// Query
export interface IQueryProps {
  id: string;
  queryBuilder: QueryBuilder<any>;
  debounce?: number;
  [key: string]: any;
}
interface IQueryElementProps extends IQueryProps {
  Element: any;
}
interface IQueryElementLabeledProps extends IQueryElementProps {
  label?: any;
  customLabel?: string;
}

export const QueryElementLabeled = ({ id, no_label = false, queryBuilder, label = id, customLabel, Element, debounce, ...props }: IQueryElementLabeledProps) =>
  !no_label ? (
    <div className="query-element-container">
      <Label className="query-label" customLabel={customLabel} label={label} />
      <Element
        id={id}
        value={queryBuilder.get(id)}
        setValue={getValueChanged(id, queryBuilder, debounce)}
        label={label}
        customLabel={customLabel}
        // containerClass={"query-element"}
        {...props}
      />
    </div>
  ) : (
    <div className="query-element">
      <Element
        id={id}
        value={queryBuilder.get(id)}
        setValue={getValueChanged(id, queryBuilder, debounce)}
        label={label}
        customLabel={customLabel}
        // containerClass={"query-element"}
        {...props}
      />
    </div>
  );
export const QueryElement = ({ id, queryBuilder, Element, debounce, ...props }: IQueryElementProps) => (
  <Element id={id} value={queryBuilder.get(id)} setValue={getValueChanged(id, queryBuilder, debounce)} {...props} />
);

const getValueChanged = (id, queryBuilder, debounce) =>
  debounce
    ? (value: any) => {
        TimedCallback.create({
          callback: () => {
            queryBuilder.updateQueryParams({ id, value });
          },
          id: id,
          timeout: debounce,
        });
      }
    : (value: any) => {
        queryBuilder.updateQueryParams({ id, value });
      };

//TODO move to a separate file
// Qr reader
export const QrIconReader = ({ handleError, setValue }: { handleError?: (err) => void; setValue: (data?: { text: string }) => void }) => (
  <Icon
    icon="qr-outline"
    className="bg-primary fill-white round-sm p-md"
    onClick={() => {
      const popupQrId = "qr-reader";
      PopupMe(
        <div className="h:300px w:300px">
          <QrReader
            onResult={(data) => {
              if (data) {
                setValue(data.text);
                Popup.remove(popupQrId);
              }
            }}
          />
          <Button
            label="cancel"
            onClick={() => {
              Popup.remove(popupQrId);
            }}
          />
        </div>,
        {
          id: popupQrId,
        }
      );
    }}
  />
);
