export const intersection = (arr1: string[], arr2: string[]): string[] => {
  return arr1.filter((val1) => {
    return arr2.find((val2) => val1 === val2);
  });
};
