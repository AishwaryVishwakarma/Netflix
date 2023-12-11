import React from 'react';

interface Context {
  openMovieModal: (data: any) => void;
  closeMovieModal: () => void;
}

export const ModalContext = React.createContext<Context>({
  openMovieModal: (data: any): void => {},
  closeMovieModal: (): void => {},
});
