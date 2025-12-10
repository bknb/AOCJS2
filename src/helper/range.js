export const cmpRng = (x,x1,x2) => {
  if(x>x1) return x>=x2?1:0;
  if(x<x1) return x<=x2?-1:0;
  return x1>x2?1:-1;
}