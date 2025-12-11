export const countB = (n,w) => {
  let result = 0;
  for (let i=w;i-->0;n>>=1)
    result+=n&1;
  return result;
}