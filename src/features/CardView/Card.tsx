import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "../../components/Button";
import { ToggleButton } from "../../components/ToggleButton";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  RevertIcon,
} from "../../icons";

import { ExtendedCardType, useCardStore } from "./useCardStore";

type CardProps = {
  card: ExtendedCardType;
};

export const Card: FC<CardProps> = ({
  card: { id, title, description, isCollapsed, isDeleted },
}) => {
  const [cardParentRef] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });

  const { toggleCardCollapse, removeCard, revertCard } = useCardStore();

  const handleCollapse = () => {
    toggleCardCollapse(id);
  };

  const handleRemove = () => {
    removeCard(id);
  };

  const handleRevert = () => {
    revertCard(id);
  };

  return (
    <div ref={cardParentRef} className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {isDeleted ? (
            <Button onClick={handleRevert}>
              <RevertIcon />
            </Button>
          ) : (
            <>
              <ToggleButton
                handleToggle={handleCollapse}
                isToggled={isCollapsed}
                iconNotToggled={<ChevronUpIcon />}
                iconToggled={<ChevronDownIcon />}
              />
              <Button onClick={handleRemove}>
                <XMarkIcon />
              </Button>
            </>
          )}
        </div>
      </div>
      {!isCollapsed && !isDeleted ? (
        <p className="text-sm">{description}</p>
      ) : null}
    </div>
  );
};
