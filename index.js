(function () {
  const listOfMusic = [
    {
      name: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      image: `./img/sweetChildOMine.jpg`,
      path: `./music/sweetChildOMine.mp3`
    },
    {
      name: "Lose Yourself",
      artist: "Eminem",
      image: `./img/loseYourself.jpg`,
      path: `./music/loseYourself.mp3`
    },
    {
      name: "Michael Jackson",
      artist: "Billie Jean",
      image: `./img/billieJean.jpg`,
      path: `./music/billieJean.mp3`
    },
  ];

  let currentPlaying = document.querySelector(".currentPlaying");
  let trackPicture = document.querySelector(".trackPicture");
  let trackName = document.querySelector(".trackName");
  let trackArtist = document.querySelector(".trackArtist");

  let pausePlayButton = document.querySelector(".playPauseTrack");
  let nextButton = document.querySelector(".nextTrack");
  let previousButton = document.querySelector(".prevTrack");

  let slider = document.querySelector(".seekSlider");
  let volumeSlider = document.querySelector(".volumeSlider");
  let currentTime = document.querySelector(".currentTime");
  let duration = document.querySelector(".totalDuration");

  let musicIndex = 0;
  let isPlaying = false;
  let updateTimer;

  let current = document.createElement('audio');

  function randomColors() {

    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    document.body.style.background = bgColor;
  }

  function loadTrack(musicIndex) {
    clearInterval(updateTimer);
    resetValues();

    current.src = listOfMusic[musicIndex].path;
    current.load();

    trackPicture.style.backgroundImage = "url(" + listOfMusic[musicIndex].image + ")";
    trackName.innerHTML = listOfMusic[musicIndex].name;
    trackArtist.innerHTML = listOfMusic[musicIndex].artist;
    currentPlaying.innerHTML = "PLAYING " + (musicIndex + 1) + " OF " + listOfMusic.length;

    updateTimer = setInterval(seekUpdate, 1000);
    current.addEventListener("ended", nextTrack);
    randomColors();
  }

  function resetValues() {
    currentTime.innerHTML = "00:00";
    duration.innerHTML = "00:00";
    slider.value = 0;
  }

  // Load the first track in the tracklist
  loadTrack(musicIndex);

  function playPauseTrack() {
    if (!isPlaying) {
      playTrack();
    } else {
      pauseTrack();
    }
  }

  function playTrack() {
    current.play();
    isPlaying = true;
    pausePlayButton.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }

  function pauseTrack() {
    current.pause();
    isPlaying = false;
    pausePlayButton.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
  }

  function nextTrack() {
    if (musicIndex < listOfMusic.length - 1) {
      musicIndex += 1;
    } else {
      musicIndex = 0;
    }

    loadTrack(musicIndex);
    playTrack();
  }

  function prevTrack() {
    if (musicIndex > 0) {
      musicIndex -= 1;
    } else {
      musicIndex = listOfMusic.length;
    }

    loadTrack(musicIndex);
    playTrack();
  }

  function seekTo() {
    seekto = current.duration * (slider.value / 100);
    current.currentTime = seekto;
  }

  function setVolume() {
    current.volume = volumeSlider.value / 100;
  }

  function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(current.duration)) {
      seekPosition = current.currentTime * (100 / current.duration);

      slider.value = seekPosition;

      let currentMinutes = Math.floor(current.currentTime / 60);
      let currentSeconds = Math.floor(current.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(current.duration / 60);
      let durationSeconds = Math.floor(current.duration - durationMinutes * 60);

      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }

      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }

      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }

      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }


      currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
      duration.innerHTML = durationMinutes + ":" + durationSeconds;
    }
  }

  // Event listeners

  nextButton.addEventListener('click', () => nextTrack());
  previousButton.addEventListener('click', () => prevTrack());
  pausePlayButton.addEventListener('click', () => playPauseTrack());
  slider.addEventListener('change', () => seekTo());
  volumeSlider.addEventListener('change', () => setVolume());

})()