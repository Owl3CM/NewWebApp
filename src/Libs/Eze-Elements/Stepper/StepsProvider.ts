import React from "react";
import { Toast } from "@/Libs/eze-utils";
import { IHive, createHive } from "@/Libs/eze-services";

export type IStepsProvider = typeof StepsProvider;

export class StepsProvider<Step extends string> {
  skippedSteps = [] as Step[];
  stepsControllerHive: IHive<{
    step: Step;
    animation: typeof StepsProvider.prototype._animations.entering | typeof StepsProvider.prototype._animations.leaving;
    action: "next" | "prev" | "idle";
  }> = createHive({
    step: "" as Step,
    animation: "entering" as typeof StepsProvider.prototype._animations.entering,
    action: "idle",
  });

  stepsHive = createHive<{
    [key in Step]: {
      component: React.ReactNode;
      label: string;
    };
  }>(null);

  changeSteps = (steps: {
    [key in Step]: {
      component: React.ReactNode;
      label: string;
    };
  }) => {
    if (!Object.keys(steps).includes(this.stepsControllerHive.honey.step)) {
      this.stepsControllerHive.setHoney({
        step: Object.keys(steps)[0] as Step,
        animation: this._animations.entering,
        action: "idle",
      });
    }
    this.stepsHive.setHoney(steps);
  };

  skipStep = (step: Step) => {
    this.skippedSteps.push(step);
  };
  unSkipStep = (step: Step) => {
    this.skippedSteps = this.skippedSteps.filter((s) => s !== step);
  };
  clearSkippedSteps = () => {
    this.skippedSteps = [];
  };

  nextStep = () => {
    this.changeStep(true);
  };
  prevStep = () => {
    this.changeStep(false);
  };
  jumpToStep = async (step: Step) => {
    this.transitoinToStep(step);
  };

  private changeStep = async (forword = true) => {
    const _Steps = Object.entries(this.stepsHive.honey) as [Step, { component: React.ReactNode; label: string }][];
    const currStep = this.stepsControllerHive.honey.step;
    const indexOfCurrStep = _Steps.findIndex(([key]) => key === currStep);
    const step = _Steps[indexOfCurrStep + (forword ? 1 : -1)]?.[0];

    // const step = (
    //   forword
    //     ? _Steps.find(([key], index) => {
    //         if (this.skippedSteps.includes(key)) return false;
    //         return index > indexOfCurrStep;
    //       })
    //     : _Steps.find(([key], index) => {
    //         if (this.skippedSteps.includes(key)) return false;
    //         return index > indexOfCurrStep;
    //       })
    // )?.[0];

    this.transitoinToStep(step, forword);
  };

  private transitoinToStep = async (step: Step, forword = null) => {
    if (!this.stepsHive.honey[step]) return Toast.error({ title: "No Step with this name" });
    const currStep = this.stepsControllerHive.honey.step;

    if (forword === null) {
      const keys = Object.keys(this.stepsHive.honey);
      forword = keys.indexOf(step) > keys.indexOf(currStep);
    }

    const animationDir = forword ? "next" : "prev";

    this.stepsControllerHive.setHoney({
      step: currStep,
      animation: this._animations.leaving,
      action: animationDir,
    });

    await new Promise((res) => setTimeout(res, 490));
    this.stepsControllerHive.setHoney({
      step,
      animation: this._animations.entering,
      action: animationDir,
    });

    await new Promise((res) => setTimeout(res, 490));
    this.stepsControllerHive.silentSetHoney({
      step,
      animation: this._animations.entering,
      action: "idle",
    });
  };

  private _animations = {
    entering: "entering",
    leaving: "leaving",
  };

  constructor(props?: Props) {
    if (props?.animations) this._animations = props.animations;
    else
      this._animations = {
        entering: "entering",
        leaving: "leaving",
      };
    // const steps = getSteps(this, null);
    // this.stepsHive.setHoney(steps);
  }
}

type Props = {
  animations?: {
    entering: string;
    leaving: string;
  };
};
