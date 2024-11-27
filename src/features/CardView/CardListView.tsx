import { useEffect, useState } from "react";

import { CardList } from "./CardList";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";

import { useGetListData } from "../../api/getListData";
import { useCardStore } from "./useCardStore";

export const CardListView = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetListData();
  const { saveCardsFromServer, cards } = useCardStore();

  const [isDeletedCardsHidden, setIsDeletedCardsHidden] = useState(true);

  useEffect(() => {
    if (!isLoading && data) {
      saveCardsFromServer(data);
    }
  }, [data, isLoading, saveCardsFromServer]);

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
    return (
      <div className="flex flex-col justify-center gap-y-4">
        <p>Error occured while loading!</p>
        <Button variant="primary" onClick={handleRefetch}>
          Retry
        </Button>
      </div>
    );
  }

  const visibleCards = cards.filter(
    (card) => card.isVisible && !card.isDeleted
  );
  const deletedCards = cards.filter((card) => card.isDeleted);

  return (
    <div className="flex gap-x-8 w-[80vw]">
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-4">
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
      <div className="w-1/2">
        <div className="flex items-center justify-between">
          <h1 className="mb-4 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <Button variant="primary" onClick={handleToggleDeletedCards}>
            {isDeletedCardsHidden ? "Reveal" : "Hide"}
          </Button>
        </div>
        <div className="flex flex-col gap-y-3">
          {!isDeletedCardsHidden && <CardList cards={deletedCards} />}
        </div>
      </div>
    </div>
  );
};
