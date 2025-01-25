export const  Random = (len : number) =>{
  var res : string = "";
  const options = "qwertyuiopasdfghjklzxcvbnm";
  const length = options.length;
  
  for (var i = 0; i < len; i++) {
    res += options[Math.floor(Math.random() * options.length)];
  }
  return res;
}