var originalMessage = document.getElementById('Input');
var encrypt = document.getElementById('Encrypt')
var decrypt = document.getElementById ('Decrypt')
var DecryptButton = document.getElementById('DecryptButton')
var result = document.getElementById('result')
var result1 = document.getElementById('result1')
const p = 11
const q = 5
const e = 7
const n  = p * q
const Encrypt = () => {
    var encryptMessage = ""
    var NumberfromMessage = MessagetoNumber(originalMessage.value)
    for (var i = 0 ; i < NumberfromMessage.length ; i++){
        var N = NumberfromMessage[i]
            if (N !== " "){
                var C = (Math.pow (N , e)) % n
                console.log (N + " ^ " + e + " % " + n + " = " + C)
                encryptMessage += C + " "
            }else{
                encryptMessage += " "
            }
    }
    console.log (encryptMessage)
    result.innerHTML = "Original Message : " + originalMessage.value
    result1.innerHTML = "Encrypt to      : " + encryptMessage
    if (DecryptButton.childNodes.length === 0){
        var LI = document.createElement('p')
    LI.appendChild(document.createTextNode("SOLVE"))
    }
    // LI.addEventListener ('click' , () => {
    //     alert (1)
    // })
    DecryptButton.append (LI)
}
const MessagetoNumber = ( Message ) => {
    var NumberfromMessage = [];
    for (var i = 0 ; i < Message.length ; i++){
        var Tmp = Message[i]
        if (Tmp !== " "){
            NumberfromMessage [i]= Message.charCodeAt(i)  - 65
        }else{
            NumberfromMessage[i] = " "
        }
    }
    return NumberfromMessage
}
const extendedEuclidean = (a , b) => {
      if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
      }
    
      const { gcd, x: prevX, y: prevY } = extendedEuclidean(b, a % b);
      const x = prevY;
      const y = prevX - Math.floor(a / b) * prevY;
    
      return { gcd, x, y };
}
const Decrypt = (Message) => {
    Message = originalMessage.value
    Message = Message.split(" ")
    var DecryptMessage = ""
    const Euler = (p -1) * (q - 1)
    var {gcd , x , y} = extendedEuclidean(Euler , e)
    const d = x
    for (var i = 0 ; i < Message.length ; i++){
        var C = (Math.pow (+Message[i] , d)) % n
        DecryptMessage += C + " "
    }
    console.log (NumtoLetter (DecryptMessage))
}
const NumtoLetter = (Message) => {
    var NewMessage = ""
    Message = Message.split(" ")
    for (var i  = 0 ; i < Message.length ; i++){
        if (Message[i] !== ""){
            console.log (Message[i])
            var C = String.fromCharCode (+Message[i] + 65);
            NewMessage += C
        }else{
            NewMessage += " "
        }
    }
    return NewMessage
}