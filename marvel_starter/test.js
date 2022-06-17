class Test {
  constructor(name,mail){
    this.name = name;
    this.mail = mail;
  }
  sayBye = () => {
    console.log('Bye')
  }
}

const oleg = new Test("Vanya","mail.ru");

class Vanya extends Test {
  sayHi(){
    console.log('yo')
  }
}

oleg.sayBye()

console.log(oleg);
console.log(Vanya)