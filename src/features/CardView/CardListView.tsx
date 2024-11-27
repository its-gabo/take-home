import { useEffect, useState } from "react";

import { CardList } from "./CardList";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";

import { ListItem, useGetListData } from "../../api/getListData";

export const CardListView = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [isDeletedCardsHidden, setIsDeletedCardsHidden] = useState(true);
  const { data, isLoading, isFetching, isError, refetch } = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (!isLoading) {
      setVisibleCards(data?.filter((item) => item.isVisible) ?? []);
    }
  }, [data, isLoading]);

  const handleRefetch = () => {
    refetch({ cancelRefetch: false });
  };

  const handleToggleDeletedCards = () => {
    setIsDeletedCardsHidden((prev) => !prev);
  };

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-1">
          <h1 className="font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <Button
            variant="primary"
            onClick={handleRefetch}
            disabled={isFetching || isLoading}
          >
            Reload
          </Button>
        </div>
        <CardList cards={visibleCards} />
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards (0)</h1>
          <Button variant="primary" onClick={handleToggleDeletedCards}>
            {isDeletedCardsHidden ? "Reveal" : "Hide"}
          </Button>
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
