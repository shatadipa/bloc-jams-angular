(function () {
    var SongPlayer = function (Fixtures) {

        /**
         * @desc SongPlayer to return
         * @type {Object} 
         */
        var SongPlayer = {};
        
        SongPlayer.currentAlbum = Fixtures.getAlbum();

        var getSongIndex = function (song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Stores the currently playing song
         * @type {Object} 
         */
        SongPlayer.currentSong = null;

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc Plays the currentBuzz file and sets the song to playing
         * @param {Object} song
         */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        };

        /**
         * @function SongPlayer.play
         * @desc Plays the given song
         * @param {Object} song
         */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;

            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function SongPlayer.pause
         * @desc Pauses the given song.
         * @param {Object} song
         */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;

            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


         SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex === SongPlayer.currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    };

    angular.module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();