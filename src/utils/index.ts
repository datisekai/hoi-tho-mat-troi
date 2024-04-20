export const getCalculator = (
  arrNumber: number[],
  arrSyx: string[],
  value: number
) => {
  let result = 0;
  let index = 0;
  const random = (arr: any, length: number) => {
    const arrTemp = [...arr];
    const newArr = [];
    for (let i = 0; i < length; i++) {
      const item: any = arrTemp[Math.floor(Math.random() * arrTemp.length)];
      newArr.push(item);
      const index = arrTemp.indexOf(item);
      if (index !== -1) {
        arrTemp.splice(index, 1);
      }
    }
    return newArr;
  };

  return new Promise((rs, rj) => {
    while (result !== value && index < 30000) {
      console.log(`index:`, index);
      const arrRandomNum = random(arrNumber, 4);
      const arrRandomSyn = random(arrSyx, 3);
      const arrConcat = [];
      for (let i = 0; i < 4; i++) {
        if (i < 3) arrConcat.push(arrRandomNum[i], arrRandomSyn[i]);
        else arrConcat.push(arrRandomNum[i]);
      }
      const convertString = arrConcat.join("");
      if (!convertString) rs([]);
      result = eval(convertString);
      if (result === value) {
        rs(arrConcat);
      }
      index += 1;
    }
    rj([]);
  });
};
