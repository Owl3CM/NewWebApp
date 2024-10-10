import React from "react";

interface Props {
  value?: number | string;
  onChange?: (value: number | string) => void;
  cssVriable?: string;
  unite?: string;
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
}
const RangeInput = ({ value, onChange, cssVriable, unite = "px", title = "", min = 1, max = 100, step, defaultValue }: Props) => {
  React.useMemo(() => {
    if (cssVriable) {
      const _storedValue = localStorage.getItem(cssVriable) ?? value;
      if (_storedValue) document.documentElement.style.setProperty(cssVriable, _storedValue === "auto" ? _storedValue : `${_storedValue}${unite}`);
    }
  }, []);
  const [state, setState] = React.useState(value ?? document.documentElement.style.getPropertyValue(cssVriable ?? "").replace(unite, ""));
  const stateId = `${title}-${unite}`;

  return (
    <div className="row-center gap-lg shadow-md bg-white round-md p-md ">
      <p className="text-black px-sm round-md text-sm min-w-max">
        {title}
        &nbsp;
        <span style={{ minWidth: 100 }} id={stateId} className="text-xl shadow-md px-lg round-sm">
          {state}
          &nbsp;
          {unite}
        </span>
      </p>
      <input
        type="range"
        min={min}
        max={max}
        className="slider flex-grow"
        id="myRange"
        step={step}
        style={{ "--value": state } as any}
        value={state}
        onChange={(e: any) => {
          setState(e.target.value);
          onChange?.(e.target.value);
          if (cssVriable) {
            localStorage.setItem(cssVriable, e.target.value);
            document.documentElement.style.setProperty(cssVriable, `${e.target.value}${unite}`);
            // document.getElementById(stateId)!.innerText = `${e.target.value}${unite}`;
          }
        }}
      />
      <p
        className="button"
        onClick={() => {
          // const value = document.documentElement.style.getPropertyValue(cssVriable ?? "").replace(unite, "");
          setState(defaultValue);
          onChange?.(defaultValue);
          if (cssVriable) {
            localStorage.removeItem(cssVriable);
            document.documentElement.style.setProperty(cssVriable, defaultValue === "auto" ? defaultValue : `${defaultValue}${unite}`);
            // document.getElementById(stateId)!.innerText = `${value}${unite}`;
          }
        }}>
        reset
      </p>
    </div>
  );
};

export default RangeInput;
