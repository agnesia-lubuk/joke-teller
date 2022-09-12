const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable button
function toogleButton() {
  button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'ae6a6c313f7249d8bbb25c411e20994a',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

// Get Jokes from API
async function getJokes() {
  let joke = ''
  // const apiUrl =
  //   'https://dad-jokes.p.rapidapi.com/random/joke/?rapidapi-key=66ed413666msh76bcdace46a32a9p1a7be3jsn92826b81fe72'
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist'

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // joke = `${data.body[0].setup} ... ${data.body[0].punchline}`
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    console.log(joke)
    // Text-To-Speech
    tellMe(joke)
    // Disable button
    toogleButton()
  } catch (error) {
    // Catch errors here
    console.log('Whooops', error)
  }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toogleButton)
