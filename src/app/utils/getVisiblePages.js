export const getVisiblePages = ({currentPage,totalPages}) => {
  const delta = window.innerWidth < 576 ? 1 : 2;
  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};

