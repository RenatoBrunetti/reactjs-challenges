import { useRef, useState } from 'react';
import { duplicateRegenerateSortArray } from '../../utils/card-utils';
import { Card, CardProps } from '../Card';

import './styles.css';

export interface GridProps {
  cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });

  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef<boolean>(false);

  const handleReset = () => {
    setStateCards(duplicateRegenerateSortArray(cards));
    first.current = null;
    second.current = null;
    unflip.current = false;
    setMatches(0);
    setMoves(0);
  };

  const handleClick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      if (card.id !== id || card.flipped) {
        return card;
      }

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }

      card.flipped = true;

      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      if (first.current && second.current) {
        if (first.current.back === second.current.back) {
          // Win
          first.current = null;
          second.current = null;
          setMatches((m) => m + 1);
        } else {
          // Loose
          unflip.current = true;
        }

        setMoves((m) => m + 1);
      }

      return card;
    });

    setStateCards(newStateCards);
  };

  return (
    <>
      <div className='grid__info'>
        <h1>Memory Game</h1>
        <p>
          Moves: {moves} | Matches: {matches}/{cards.length} |{' '}
          <button onClick={handleReset}>Reset</button>
        </p>
      </div>
      <div className='grid__cards'>
        {stateCards.map((card) => {
          return <Card {...card} key={card.id} handleClick={handleClick} />;
        })}
      </div>
    </>
  );
}
