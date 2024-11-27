import { FC } from "react";

import { Card } from "./Card";

import { ListItem } from "../../api/getListData";

interface CardListProps {
  cards: ListItem[];
}

export const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col gap-y-3">
      {cards.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} />
      ))}
    </div>
  );
};
