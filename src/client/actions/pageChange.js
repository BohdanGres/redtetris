export const PAGE_CHANGE = 'PAGE_CHANGE';

export const pageChange = (page) => {
  return {
    type: PAGE_CHANGE,
    page,
  }
};
