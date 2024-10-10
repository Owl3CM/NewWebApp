import { PriceVariant } from "./types";

interface IPriceProps {
  price: string | number;
  className?: string;
  isoCode?: IsoCode;
  variant?: PriceVariant;
  [key: string]: any;
}

export const Price = ({ price, className = "", isoCode, variant = "price", ...props }: IPriceProps) => (
  <span className={`${className} ${variant}`} iso-code={isoCode} {...props}>
    {price}
  </span>
);

type Props = {
  isoCode?: IsoCode;
  children?: React.ReactNode;
};

export const PricesWrapper = ({ children, isoCode }: Props) => <div iso-code={isoCode}>{children}</div>;
