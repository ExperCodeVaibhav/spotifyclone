console.log('welcome to spotify');
let songIndex = 0;

let audioElement = new Audio('songs/1.mp3');
let play = document.getElementById('play');
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
let pgbar = document.getElementById('pgbar');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName: 'Beliver', filePath: "songs/1.mp3", coverPath: "songs/cover.jpg"},
    {songName: 'Teri Baton', filePath: "songs/2.mp3", coverPath: "songs/cover2.png"},
    {songName: 'Mai Agar Kahoon', filePath: "songs/3.mp3", coverPath: "songs/cover3.png"}
];

// Initialize song items with cover images and song names
songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('name')[0].innerHTML = songs[i].songName;
});

// Handle play/pause for the main play button
play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    }
});

// Listen to audio time updates to update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    pgbar.value = progress;
});

pgbar.addEventListener('change', () => {
    audioElement.currentTime = (pgbar.value * audioElement.duration) / 100;
});

// Function to reset all song item play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Add event listener to each song item play button
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    });
});

// Function to play the previous song
backward.addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    playSong();
});

// Function to play the next song
forward.addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    playSong();
});

// Function to play the current song based on the songIndex
function playSong() {
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementsByClassName('songitemplay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songitemplay')[songIndex].classList.add('fa-pause-circle');
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
}
