import { FC, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "../../components/Button";
import { ChevronUpIcon, ChevronDownIcon, XMarkIcon } from "../../icons";

import { ListItem } from "../../api/getListData";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  isVisible: ListItem["isVisible"];
};

export const Card: FC<CardProps> = ({ title, description, isVisible }) => {
  const [cardParentRef] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });

  const [isCollapsed, setIsCollapsed] = useState(isVisible);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div ref={cardParentRef} className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <Button onClick={handleCollapse}>
            {isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
          <Button>
            <XMarkIcon />
          </Button>
        </div>
      </div>
      {isCollapsed ? <p className="text-sm">{description}</p> : null}
    </div>
  );
};
