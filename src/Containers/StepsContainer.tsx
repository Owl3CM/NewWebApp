import React from "react";
import { StepsController } from "@/Libs/Eze-Elements";
import { ObserverBee } from "@/Libs/eze-services";
type Props = {
  service: {
    stepsHive: any;
    stepsControllerHive: any;
  };
  className?: string;
  showIndicator?: boolean;
};

export const StepsContainer = ({ service, ...props }: Props) => (
  <ObserverBee hive={service.stepsHive} Component={({ honey }) => <StepsController hive={service.stepsControllerHive} steps={honey} {...props} />} />
);
