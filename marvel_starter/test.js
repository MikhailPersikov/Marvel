const plus = (i) => {
  return (i++)
}

console.log(plus((()=>{ return 2} )()))
console.log(plus((()=>{ return 2} )()))
console.log(plus((()=>{ return 2} )()))
console.log(plus((()=>{ return 2} )()))