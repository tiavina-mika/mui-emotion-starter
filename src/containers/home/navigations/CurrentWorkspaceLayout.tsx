/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { Fragment, ReactNode, useMemo, useState } from "react";
import UserAvatar from "../../../components/UserAvatar";
import ButtonsSwitch from "../../../components/ButtonsSwitch";
import Dialog from "../../../components/Dialog";
import { users } from "../../../utils/data/user";
import { profiles } from "../../../utils/data/profiles";
import {
  IProjectProductOption,
  ISelectedOptionValue
} from "../../../types/app.type";
import { IProfile } from "../../../types/profile.type";
import { LAYOUT_CONTENT_PADDING } from "../../../utils/constants";
import { cutText } from "../../../utils/utils";
import ProjectProductSwitch from "./ProjectProductSwitch";

const currentUser = users[0];
const workspace = "1lalana Inc.";

const projectProductOptions: IProjectProductOption[] = [
  {
    label: "Roadmap",
    value: "roadmap"
  },
  {
    label: "Insight",
    value: "insight"
  }
];

const classes = {
  top: {
    padding: 24
  },
  content: {
    paddingLeft: LAYOUT_CONTENT_PADDING,
    paddingRight: LAYOUT_CONTENT_PADDING
  },
  dialog: {
    "& .MuiDialog-paper": {
      height: 136
    }
  },
  switchRoot: {
    width: 294
  },
  setting: {
    width: 294,
    border: "1px solid #f3f3f3",
    padding: "0 16px",
    borderRadius: 6
  },
  button: {
    paddingLeft: 0,
    paddingRight: 0
  },
  avatar: {
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 400
  }
};

type Props = {
  children: ReactNode;
  renderSetting?: (goBack: () => void) => ReactNode;
};
const CurrentWorkspaceLayout = ({ children, renderSetting }: Props) => {
  const [openWorkspaceDialog, setOpenWorkspaceDialog] = useState<boolean>(
    false
  );
  const [selectedProductOption, setSelectedProductOption] = useState<
    IProjectProductOption
  >(projectProductOptions[0]);
  const [showSetting, setShowSetting] = useState<boolean>(false);

  // simulate profiles from db
  const profileNames = useMemo((): string => {
    const names = profiles?.map((profile: IProfile) => profile.label) || [];
    const profileNames = names?.join(", ");
    return profileNames;
  }, []);

  const workspaceOptions = [
    {
      label: workspace,
      value: "selectedWorskpace"
    },
    {
      label: "+ Espace de travail",
      value: "otherWorkspace"
    }
  ];

  const toggleShowSetting = () => setShowSetting(!showSetting);

  const toggleOpenWorkspaceDialog = () =>
    setOpenWorkspaceDialog(!openWorkspaceDialog);

  const closeSettingDialog = () => {
    toggleShowSetting();
    toggleOpenWorkspaceDialog();
  };

  const handleSelectProjectProduct = (value: IProjectProductOption) => {
    setSelectedProductOption(value);
  };

  const handleSelectWorkspace = (value: ISelectedOptionValue) => {
    console.log("handleSelectWorkspace value", value);
  };

  if (showSetting && renderSetting) {
    return <Fragment>{renderSetting(closeSettingDialog)}</Fragment>;
  }

  return (
    <Fragment>
      <div className="flexColumn flex1 stretchSelf">
        {/* --------- header ------- */}
        <div css={classes.top} className="flexRow spaceBetween stretchSelf">
          {/* left */}
          <button
            className="transparentButton"
            onClick={toggleOpenWorkspaceDialog}
            css={classes.button}
          >
            <Stack direction="row" className="center" spacing={1.7}>
              {currentUser && (
                <UserAvatar user={currentUser} size={48} css={classes.avatar} />
              )}
              <Stack spacing={0.58}>
                <Typography variant="h3" className="textLeft">
                  {workspace}
                </Typography>
                <Typography className="textLeft" variant="body2">
                  {cutText(profileNames, 30)}
                </Typography>
              </Stack>
              <div className="stretchSelf flexCenter">
                <img alt="chevron-down" src="/icons/chevron-down.svg" />
              </div>
            </Stack>
          </button>
          {/* right */}
          <div>
            <Stack direction="row" className="center" spacing={1}>
              <ProjectProductSwitch
                onSelect={handleSelectProjectProduct}
                selectedOption={selectedProductOption}
                options={projectProductOptions}
                checked={selectedProductOption.value === "roadmap"}
              />
            </Stack>
          </div>
        </div>
        <div css={classes.content} className="flexColumn stretchSelf flex1">
          {/* simulate React Router outlet component */}
          {children}
        </div>
      </div>
      <Dialog
        onClose={toggleOpenWorkspaceDialog}
        open={openWorkspaceDialog}
        fullWidth
        maxWidth="xl"
        css={classes.dialog}
      >
        <div className="flexCenter stretchSelf flex1">
          <ButtonsSwitch
            onSelect={handleSelectWorkspace}
            css={classes.switchRoot}
            options={workspaceOptions}
          />
          <div
            className="flexRow center stretchSelf gapSixteen cursorPointer"
            css={classes.setting}
          >
            <img src="/icons/setting-menu.svg" alt="setting" />
            <img src="/icons/line.svg" alt="line" />
            <div className="flex1" onClick={toggleShowSetting}>
              <Typography variant="h4">Paramètres</Typography>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default CurrentWorkspaceLayout;
