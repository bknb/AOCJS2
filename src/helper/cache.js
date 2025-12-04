let cache;
const getCachedFn = (cache,fn)=>
  (...input)=>
  ((key=input.join(','))=>
    cache.has(key)
    ?cache.get(key)
    :setCache(cache,key)
    (fn(...input)))();

const setCache=(cache,k)=>v=>
  cache.set(k,v)&&v;

export const cached = fn=>
  ((cache=new Map())=>getCachedFn(cache,fn))();