const OPEN_SEARCH_EVENT = 'blog-search-open';

export const dispatchOpenSearchEvent = () => {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
};

export const listenOpenSearchEvent = (listener: () => void) => {
  window.addEventListener(OPEN_SEARCH_EVENT, listener);

  return () => {
    window.removeEventListener(OPEN_SEARCH_EVENT, listener);
  };
};
