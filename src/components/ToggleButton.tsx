import { FC } from "react";

import { Button } from "./Button";

type ToggleButtonProps = {
  iconToggled: React.ReactNode;
  iconNotToggled: React.ReactNode;
  handleToggle: () => void;
  isToggled: boolean;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  iconNotToggled,
  iconToggled,
  isToggled,
  handleToggle,
}) => {
  return (
    <Button onClick={handleToggle}>
      {isToggled ? iconToggled : iconNotToggled}
    </Button>
  );
};
