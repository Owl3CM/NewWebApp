export * from "./types";
import { Lang } from "@/Language";
import { ButtonProps, ButtonState, DynamicIconButtonProps, IconButtonProps, IconLinkButtonProps, IconsButtonProps } from "./types";
import { NoVariants_IconLabel, NoVariants_IconsLabel } from "../Labels/Labels";
import { Link } from "react-router-dom";

export const Button = ({ label = "no", variant = "primary", className = "", customLabel, state, onClick, ...props }: ButtonProps) => {
  return (
    <button onClick={(e) => onButtonClick(e, onClick)} className={`button min-w-max button-${variant} ${className}`} data-button-state={state} {...props}>
      {customLabel ?? Lang[label]}
    </button>
  );
};

export const IconButton = ({ onClick, variant = "menu", containerClass = "", state, ...props }: IconButtonProps) => (
  <NoVariants_IconLabel
    onClick={(e) => onButtonClick(e, onClick)}
    containerClass={`icon-button button-${variant} ${containerClass}`}
    data-button-state={state}
    {...props}
  />
);

export const DynamicIconButton = ({
  onClick,
  variant = "primary",
  containerClass = "",
  color = "--red",
  bg = "--white",
  border,
  state,
  ...props
}: DynamicIconButtonProps) => (
  <NoVariants_IconLabel
    onClick={(e) => onButtonClick(e, onClick)}
    containerClass={`icon-button button-dynamic button-${variant} ${containerClass}`}
    data-button-state={state}
    {...props}
    style={{ "--color": color, "--bg": bg, "--border": border ?? color }}
  />
);

export const IconsButton = ({ variant = "primary", containerClass = "row-center gap-l", state, ...props }: IconsButtonProps) => (
  <NoVariants_IconsLabel containerClass={`icon-button button-${variant} ${containerClass}`} data-button-state={state} {...props} />
);

export const IconLink = ({ to, variant = "menu", containerClass = "", onClick, state, Ref, ...props }: IconLinkButtonProps) => (
  <Link ref={Ref} to={to} onClick={(e) => onButtonClick(e, onClick)} data-button-state={state}>
    <NoVariants_IconLabel containerClass={`icon-button button-${variant} ${containerClass}`} {...props} />
  </Link>
);

export const LinkButton = ({ to, variant = "primary", containerClass = "", onClick, state, ...props }: IconLinkButtonProps) => (
  <Link to={to} onClick={(e) => onButtonClick(e, onClick)} data-button-state={state}>
    <Button variant={variant} className={containerClass} {...props} />
  </Link>
);

const onButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>, onClick) => {
  if (!onClick) return;
  const dataset = e.currentTarget.dataset;
  const setState = (state: ButtonState) => {
    dataset.buttonState = state;
  };
  const state = dataset.buttonState;
  onClick({ e, state, setState });
};
