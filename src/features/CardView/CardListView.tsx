import { useEffect, useState } from "react";

import { CardList } from "./CardList";
import { Spinner } from "../../components/Spinner";

import { ListItem, useGetListData } from "../../api/getListData";

export const CardListView = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <CardList cards={visibleCards} />
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards (0)</h1>
          <button
            disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};