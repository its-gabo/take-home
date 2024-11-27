import { FC } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Card } from "./Card";

import { ListItem } from "../../api/getListData";

interface CardListProps {
  cards: ListItem[];
}

export const CardList: FC<CardListProps> = ({ cards }) => {
  const [cardListParentRef] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });

  return (
    <div ref={cardListParentRef} className="flex flex-col gap-y-3">
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          isVisible={card.isVisible}
        />
      ))}
    </div>
  );
};
