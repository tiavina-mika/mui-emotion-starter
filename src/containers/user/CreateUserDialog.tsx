/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import Dialog from "../../components/Dialog";
import {
  ICreateUserFormValues,
  IInviteUserBasicInfosInput,
  IUserDatesInput,
  IUserProfilesInput
} from "../../types/user.type";
import UserBasicInfosForm from "./forms/UserBasicInfosForm";
import UserProfilesForm from "./forms/UserProfilesForm";
import UserDatesForm from "./forms/UserDatesForm";
import dayjs from "dayjs";

type IStep = 1 | 2 | 3 | number;

type IStepInfos = {
  [step: IStep]: {
    title: string;
    description: string;
  };
};

type Props = {
  open: boolean;
  onClose: () => void;
};
const CreateUserDialog = ({ open, onClose }: Props) => {
  const [finalValues, setFinalValues] = useState<ICreateUserFormValues>(null);
  const [step, setStep] = useState<IStep>(1);

  // use user first name for steps's title
  const stepInfos: IStepInfos = useMemo(() => {
    const firstName = (finalValues as ICreateUserFormValues)?.[1]?.firstName;
    return {
      1: {
        title: "Add new user",
        description:
          "Invite your teams to ProductHero to allow them to follow and contribute to the evolution of your products."
      },
      2: {
        title: "Choose " + firstName + "’s profiles",
        description:
          "You can select one or more profiles to indicate the skills your maker has."
      },
      3: {
        title: "When is " + firstName + " coming ?",
        description:
          "Indicate the dates of arrival and departure allows you to calculate your roadmap with maximum precision."
      }
    };
  }, [finalValues]);

  // previoius step
  const handlePreviousStep = useCallback(() => {
    // close dialog if in step 1
    if (step === 1) {
      setFinalValues(null);
      onClose();
      return;
    }

    setStep((prev: IStep): IStep => prev - 1);
  }, [step, onClose]);

  // confirm form
  const handleConfirm = (
    values: IUserProfilesInput | IInviteUserBasicInfosInput | IUserDatesInput,
    step: IStep
  ) => {
    setFinalValues((prev: ICreateUserFormValues) => {
      return {
        ...prev,
        [step]: values
      };
    });

    if (step === 3) return;
    // next step
    setStep((prev: IStep): IStep => prev + 1);
  };

  const handleConfirmUserBasicInfos = (values: IInviteUserBasicInfosInput) => {
    console.log("basic info values", values);
    handleConfirm(values, 1);
  };

  const handleConfirmProfilesSelection = (values: IUserProfilesInput) => {
    console.log("profiles selection values", values);
    handleConfirm(values, 2);
  };

  const handleConfirmDates = (values: IUserDatesInput) => {
    console.log("dates", dayjs(values.departureDate).toDate());
    handleConfirm(values, 3);
  };

  return (
    <Dialog
      onClose={handlePreviousStep}
      open={open}
      fullScreen
      maxWidth="xl"
      withCloseButton
      closeButtonPosition="start"
      closeIcon="/icons/prev-arrow.svg"
      title={(stepInfos as IStepInfos)[step].title}
      description={(stepInfos as IStepInfos)[step].description}
      contentClassName="stretchSelf flex1 flexColumn"
    >
      {step === 1 && (
        <UserBasicInfosForm
          onConfirm={handleConfirmUserBasicInfos}
          initialValues={finalValues?.[step]}
        />
      )}
      {step === 2 && (
        <UserProfilesForm
          onConfirm={handleConfirmProfilesSelection}
          initialValues={finalValues?.[step]}
        />
      )}
      {step === 3 && (
        <UserDatesForm
          onConfirm={handleConfirmDates}
          initialValues={finalValues?.[step]}
        />
      )}
    </Dialog>
  );
};

export default CreateUserDialog;
