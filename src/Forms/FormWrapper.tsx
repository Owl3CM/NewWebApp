import { Wrapper as Container, IWrapperProps } from "@/Libs/eze-services";

interface Props extends IWrapperProps {
  "iso-code"?: string;
  style?: React.CSSProperties;
  service?: any;
  [key: string]: any;
}

const FormWrapper = ({ children, className = "form-wrapper overflow-auto", ...props }: Props) => {
  return (
    <Container
      className={className}
      reloaderProps={reloaderProps}
      {...props}
      // TODO REMOVE THIS
      reload={null}>
      {children}
    </Container>
  );
};
export default FormWrapper;
const reloaderProps = {
  className: "static",
  onPull: ({ diff, diffPercentage, reloader }) => {
    const dashOffset = 650 + diffPercentage * 650;
    (reloader.firstChild.lastChild as any).style.strokeDashoffset = `${dashOffset}`;
  },
  Component: (
    <svg viewBox="-50 -50 500 500" className="reload-squiggle-container">
      <path
        fill="none"
        stroke="#DA374633"
        strokeWidth="47"
        d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"></path>
      <path
        fill="none"
        stroke="#DA3746"
        strokeWidth="46"
        className="reload-squiggle"
        d="M111.6,344.3h217.2c33.8-2.5,61.2-29.9,61.2-63.7V88.8c0-33.9-27.5-61.4-61.4-61.4H87.3c-33.8,0-61.1,27.4-61.1,61.1l0.6,238.7c0.1,34.6,28.3,62.5,63.1,62.5h67.8"></path>
    </svg>
  ),
};

// import { ServiceStateBuilder } from "@/libs/eze-services";

// interface Props {
//     children: React.ReactNode;
//     service?: any;
//     addStateBuilder?: boolean;
//     className?: string;
//     isoCode?: string;
// }

// const Wrapper = ({ children, service, className = "wrapper", addStateBuilder = true, isoCode }: Props) => {
//     return (
//         <div className={className} iso-code={isoCode}>
//             {children}
//             {addStateBuilder && <ServiceStateBuilder service={service} />}
//         </div>
//     );
// };

// export default Wrapper;
