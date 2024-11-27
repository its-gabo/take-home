import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

import { ListItem } from "../../api/getListData";

export type ExtendedCardType = ListItem & {
  isCollapsed: boolean;
  isDeleted: boolean;
};

type CardStoreState = {
  cards: ExtendedCardType[];
  savedCards: Record<string, ExtendedCardType>;
};

type CardStoreActions = {
  saveCardsFromServer: (cards: ListItem[]) => void;
  removeCard: (cardId: number) => void;
  revertCard: (cardId: number) => void;
  toggleCardCollapse: (cardId: number) => void;
};

type PersistedCardStoreState = {
  savedCards: Record<string, ExtendedCardType>;
};

export const useCardStore = create<CardStoreState & CardStoreActions>()(
  devtools(
    persist(
      immer((set) => ({
        cards: [],
        savedCards: {},

        saveCardsFromServer: (cardsFromServer) => {
          set((state) => {
            state.cards = [];

            for (const card of cardsFromServer) {
              const savedCard = state.savedCards[card.id];

              if (!savedCard) {
                const newCard = {
                  ...card,
                  isCollapsed: true,
                  isDeleted: false,
                };

                state.cards.push(newCard);
                state.savedCards[card.id] = newCard;
              } else {
                savedCard.isVisible = card.isVisible;

                state.cards.push(savedCard);
              }
            }
          });
        },

        removeCard: (cardId) => {
          set((state) => {
            const card = state.cards.find((card) => card.id === cardId);

            if (card) {
              card.isDeleted = true;

              state.savedCards[cardId].isDeleted = true;
            }
          });
        },

        revertCard: (cardId) => {
          set((state) => {
            const card = state.cards.find((card) => card.id === cardId);

            if (card) {
              card.isDeleted = false;

              state.savedCards[cardId].isDeleted = false;
            }
          });
        },

        toggleCardCollapse: (cardId) => {
          set((state) => {
            const card = state.cards.find((card) => card.id === cardId);

            if (card) {
              card.isCollapsed = !card.isCollapsed;

              state.savedCards[cardId].isCollapsed =
                !state.savedCards[cardId].isCollapsed;
            }
          });
        },
      })),
      {
        name: "card-store",
        partialize: (state) => ({
          savedCards: state.savedCards,
        }),
        merge: (persistedState, currentState) => {
          return {
            ...currentState,
            savedCards: (persistedState as PersistedCardStoreState).savedCards,
          };
        },
      }
    ),
    { name: "CardStore" }
  )
);
