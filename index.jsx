var originalMessage = document.getElementById('Input');
var encrypt = document.getElementById('Encrypt')
var decrypt = document.getElementById ('Decrypt')
var DecryptButton = document.getElementById('DecryptButton')
var result = document.getElementById('result')
var result1 = document.getElementById('result1')
const p = 3
const q = 11
const e = 7
const n  = p * q
const Encrypt = () => {
    var encryptMessage = ""
    var NumberfromMessage = MessagetoNumber(originalMessage.value.toUpperCase())
    for (var i = 0 ; i < NumberfromMessage.length ; i++){
        var N = NumberfromMessage[i]
            if (N !== " "){
                var C = ((Math.pow (+N , e)) % n)
                console.log (+N + " ^ " + e + " % " + n + " " + C)
                encryptMessage += C + " "
            }else if (N == ' ' ){
                encryptMessage += "&nbsp"
            }
            console.log (encryptMessage)
    }
    result.innerHTML = "Original Message : " + originalMessage.value.toUpperCase()
    result1.innerHTML = "Encrypt to      : " + encryptMessage //.replace ("  " , "&nbsp")
    if (DecryptButton.childNodes.length == 0){
        var LI = document.createElement('p')
    LI.appendChild(document.createTextNode("View Detail"))
    LI.addEventListener ('click' , () => {
        var re = document.createElement('p')
        if (LI.children.length == 0){
            re.appendChild (document.createTextNode(`p = ${p} ,`))
            re.appendChild (document.createTextNode(`q = ${q} , `))
            re.appendChild (document.createTextNode(`n = ${n} , `))
            re.appendChild (document.createTextNode(`Public key = {${e} , ${n}}`))
            LI.append (re)
        }
        // console.log (`p = ${p}`)
        // console.log (`q = ${q}`)
        console.log (`Public key = {${e} , ${n}}`)
    })
    DecryptButton.append (LI)
    }
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
    var Ori = Message
    Message = Message.split(" ")
    var DecryptMessage = ""
    const Euler = (p -1) * (q - 1)
    var {gcd , x , y} = extendedEuclidean(e , Euler)
    console.log (Euler + " " + e)
    const d = x
    console.log (d)
    for (var i = 0 ; i < Message.length ; i++){
        if (Message[i] !== ""){
            var C = (Math.pow (+Message[i] , d)) % n
            DecryptMessage += C + " "
        }else{
            DecryptMessage += "  "
        }
    }
    result.innerHTML = "Encrypt Message : " + Ori
    result1.innerHTML = "Decrypt Message : " + NumtoLetter (DecryptMessage)
}
const NumtoLetter = (Message) => {
    var NewMessage = ""
    var j = Message
    Message = Message.split(" ")
    for (var i  = 0 ; i < Message.length ; i++){
        if (Message[i] !== ""){
            var C = String.fromCharCode (+Message[i] + 65);
            NewMessage += C
        }
        else if (Message[i] === "  "){
            NewMessage += "  "
        }
        else{
            NewMessage += " "
        }
    }
    return NewMessage
}