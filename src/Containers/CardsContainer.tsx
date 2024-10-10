import { ArrayBee, ArrayBeeProps } from "@/Libs/eze-services";

type ICardsContainerVariant = "large" | "medium" | "small" | "col"; //small

type Props<T> = {
  variant?: ICardsContainerVariant;
  className?: string;
  [key: string]: any;
} & ArrayBeeProps<T>;

export const CardsBuilder = ArrayBee;

export function CardsContainer<T>({ variant = "medium", className = "", hive, Component, ...props }: Props<T>) {
  return (
    <div className={`grid ${variant}-card`} {...props}>
      <CardsBuilder hive={hive} Component={Component} />
      {/* {items.map((item, i) => itemBuilder(item, i))} */}
    </div>
  );
}
