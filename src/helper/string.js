export const uniqChars = (str) =>
  [...new Set(str.split(''))];

export const checkCharNM = (min,max,letter,str)=>
  ((l=letter,nl=`[^${l}]*`)=>
    new RegExp(`^${nl}(${l}${nl}){${min},${max}}${nl}$`))()
  .test(str);