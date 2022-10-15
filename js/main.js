const coin = document.querySelector(".coin")
const flipButton = document.querySelector('#flip-button')
const resetButton = document.querySelector('#reset-button')

let heads = 0
let tails = 0

flipButton.addEventListener('click', makeReq)

async function makeReq(){
  const res = await fetch(`/api`)
  const data = await res.json()

  flipAndTrackCoin(data)
  updateStatsDelay(3000)
  disableButton()
}

  //animates and tracks stats
  function flipAndTrackCoin(data){
    //reset animation
    coin.style.animation = 'none'

    if (data.coin){
      setTimeout(() => {
        coin.style.animation = 'spin-heads 3s forwards'
        heads++
      }, 100)
    } else {
      setTimeout(() => {
        coin.style.animation = 'spin-tails 3s forwards'
        tails++
      }, 100)
    }
  }

  //updates counters with delay for visual happiness
  function updateStatsDelay(delay){
    setTimeout(()=> {
      document.querySelector('#heads-count').textContent = `Heads: ${heads}`
      document.querySelector('#tails-count').textContent = `Tails: ${tails}`
    }, delay)
  }

  //no double click of 'flip' button
  function disableButton(){
    flipButton.disabled = true;
    setTimeout(function() {
      flipButton.disabled = false;
    }, 3000)
  }

  //reset coin flip
  resetButton.addEventListener('click', () => {
    coin.style.animation = 'none'
    heads = 0;
    tails = 0
    updateStatsDelay(0)
  })