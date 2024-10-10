import { Button } from "@/Elements";
import { ILang } from "@/Language";
import { Bee, Bees } from "@/Libs/eze-services";

export type ActionsProps = {
  btnClassName?: string;
  submitLabel?: ILang;
  close?: any;
  state?: any;
  formHive?: any;
  prev?: () => void;
};

export const FormActions = ({ btnClassName, formHive, submitLabel, close, prev }: ActionsProps) => {
  return (
    <>
      <Bees
        hiveCluster={{
          isValidHive: formHive.isValidHive,
          isDirtyHive: formHive.isDirtyHive,
        }}
        Component={({ cell }) => {
          const { isValidHive, isDirtyHive } = cell;
          const isValid = formHive.validateMode === "onSubmit" ? true : isValidHive;
          return <Button type="submit" variant="form-action" className={btnClassName} label={submitLabel} disabled={!isValid || !isDirtyHive} />;
        }}
      />

      {prev && <Button type="button" onClick={prev} variant="outline" label={"prev"} />}
      {close && <Button type="button" onClick={close} variant="outline" label={"cancel"} />}
    </>
  );
};

export const GetFormActions = ({ close, submitLabel, btnClassName }: ActionsProps) => {
  return <FormActions submitLabel={submitLabel} close={close} btnClassName={btnClassName} />;
};
