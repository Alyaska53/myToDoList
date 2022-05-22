export function sortAscending(list) {
  if (list.length <= 1) {
    return list;
  }

  const base = list[list.length - 1];
  const leftList = [];
  const rightList = [];

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i].id > base.id) {
      leftList.push(list[i]);
    } else {
      rightList.push(list[i]);
    }
  }

  return [...sortAscending(leftList), base, ...sortAscending(rightList)];
}