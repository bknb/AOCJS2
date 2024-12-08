export const vec = (...x) => {
  let v = x;
  v.add = a=>
    vec(...v.map((x,i)=>x+a[i]));
  v.sub = a=>
    vec(...v.map((x,i)=>x-a[i]));
  v.neg = ()=>
    vec(...v.map(x=>-x));
  return v;
}