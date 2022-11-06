/*

Goal: Create a simple web application that uses the fs and http modules to validate if a string is a palindrome server side.

*/

//this file is client side



// let buttons = document.querySelectorAll('button')

// buttons.forEach(button => button.addEventListener('click', flipCoin))


// document.querySelectorAll('.button').forEach((elementAsCard) => {
//     elementAsCard.addEventListener('click', flipCoin) //hooks up anything with class .card to our flip function
// })
var trash = document.getElementsByClassName("fa-trash");
document.querySelector('button').addEventListener('click', checkWord)

//this routes our user in put to the '/api/ case on line 32
function checkWord() {
  console.log("TESTING");

  // let word = document.querySelector('input').value
  // fetch(`/api?word=${word}`) // the portion of the string in between the ? and the = makes the key for the object that is generated from this api call. 
  //     //in this case its {word: 'word that the users is checking'} for the coinflip it was {guess: 'user guess'}
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data)

  //         document.querySelector('.display').innerHTML = data.result

  //     })
  //     .catch(err => {
  //         console.log(`error ${err}`);

  //     });


  //-----express version code---------------------------------


  const msg = document.querySelector('input').value

  fetch('guess', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({

      'msg': msg,

    })
  })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })

}


Array.from(trash).forEach(function (element) {
  console.log("this is front end trash");

  element.addEventListener('click', function () {
    const msg = this.parentNode.parentNode.childNodes[1].innerText
    const palindrome = this.parentNode.parentNode.childNodes[3].innerText

    // const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('delete-word', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg,
        'palindrome': palindrome,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});