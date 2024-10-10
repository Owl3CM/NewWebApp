import { IHive, ObserverBee } from "@/Libs/eze-services";
import { ReactNode } from "react";
import { GetLabel, ILang } from "@/Language";

type Props<HiveType> = {
  hive: IHive<HiveType>;
  steps: {
    [key: string]: {
      component: ReactNode;
      label?: string;
    };
  };
  className?: string;
  [key: string]: any;
  gap?: any;
  children?: ReactNode;
  showIndicator?: boolean;
};

export function StepsController<HT>({ hive, steps: Components, children, showIndicator, gap = 40, ...props }: Props<HT>) {
  // const steps=useHoney(hive)
  // const stepsControll er = useHoney(hive);

  return (
    <ObserverBee
      hive={hive}
      Component={({ honey }) => {
        const { step, animation, action } = honey as any;
        const keys = Object.entries(Components).map(([key, value]) => value.label || key);
        const currIdx = Object.keys(Components).indexOf(step);
        const persantige = keys.length > 2 ? 100 : 120;
        document.documentElement.style.setProperty("--stepper-line-w", `${(currIdx / keys.length) * persantige}%`);
        return showIndicator === true || (showIndicator === undefined && keys.length > 1) ? (
          <div className="relative w-full h-fill">
            <>
              {/* <div className="row justify-center p-lg gap-xl bottom-0 bg-prim"> */}
              {/* {children} */}
              <div className="row-center stepper-con mx-auto" style={{ gap }}>
                {keys.map((comName, i) => {
                  const stepState = currIdx === i ? "stepper-active" : currIdx > i ? "stepper-passed" : "stepper-none-active";
                  return (
                    <div key={comName} className={`stepper z-20 ${stepState}`}>
                      {/* {currIdx === i && keys[currIdx]} */}
                      <p>{GetLabel(keys[currIdx] as ILang)}</p>
                    </div>
                  );
                })}
              </div>
              <div data-transitional-stage={`${action}-${animation}`} className="h-fill" {...props}>
                {Components[step]?.component}
              </div>
            </>
          </div>
        ) : (
          <div data-transitional-stage={`${action}-${animation}`} className="h-fill" {...props}>
            {Components[step]?.component}
          </div>
          // <>{Components[step]?.component}</>
        );
      }}
    />
  );
}
