export const part1 = input=> {
  let pass = input;
  while(!checkAsc(pass) || !checkReq(pass))
    pass = inc(pass);
  return pass;
}

export const part2 = input=>
  part1(inc(part1(input)));

export const init = data=>data;

const charCode = pass=>
  pass.split('').map(x=>x.charCodeAt(0)-97);

const checkAsc = pass=> (parr=>
  !parr.slice(1).reduce((a,c,i,arr)=>!a
    ?arr.splice(1)&&a:(parr[i]+1===c?a+1:-2),-2))
  (charCode(pass));

const inc = pass=> {
  const chars = charCode(pass);
  let over = true;
  for(let i=chars.length;i-->0;)
    if(over) over=!(chars[i]=(chars[i]+1)%26);
    else break;
  return String.fromCharCode(...chars.map(n=>n+97));
}

const checkReq = (pass) =>
  !/[iol]/.test(pass) && pass.match(/(\w)\1/g)?.length>1;