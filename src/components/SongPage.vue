<template>
    <div id="header">
      <img v-bind:src="albumArt" />
      <div id="info">
        <Searchbar />
        <modal name="hello-world"></modal>
        <h1> {{ songName }} </h1>
        <h2> {{ artist }}, {{ albumName }} </h2>
        <a v-bind:href= "spotifyUrl" class="button" id="spotify">Open in Spotify</a>
        <button v-bind:href= "spotifyUrl" class="button" id="suggest" v-on:click="show">Suggest Song</button>
      </div>
      <template v-for="similarSong in similarSongs"> 
          <SimilarSong v-bind:name="similarSong.songName" v-bind:albumName="similarSong.albumName" v-bind:spotifyUrl="similarSong.spotifyUrlHref" v-bind:artist="similarSong.artists"/>
      </template>
    </div>
</template>

<script>
import axios from "axios";
import Searchbar from './Searchbar'
console.log(this.name);
export default {
  props: ["name"],
  data() {
    return {
      songId: "",
      songName: "",
      spotifyUrl: "",
      similarSongs: [],
      albumArt: "",
      artist: "",
      albumName: ""
    };
  },
  components: {
    Searchbar
  },
  mounted() {
    axios({
      method: "POST",
      url: "http://localhost:3000/add/",
      data: {
          spotifyId: this.name
      }
    }).then(
      error => {
        console.error(error);
      }
    );
    axios({
      method: "GET",
      url: "http://localhost:3000/song/" + this.name
    }).then(
      result => {
        this.songId = result.data._id;
        this.songName = result.data.name;
        this.spotifyUrl = result.data.spotifyUrl;
        this.similarSongs = result.data.similarSongs;
        this.albumArt = result.data.image;
        this.artist = result.data.artists[0].name;
        this.albumName = result.data.album;
      },
      error => {
        console.error(error);
      }
    );
  },
  methods: {
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    }
  }
};
</script>

<style>
  body {
    background-color: #1d2127;
    margin-left: auto;
    margin-right: auto;
    color: white;
    font-family: 'productSansRegular';
    margin-top: 125px;
  }
  #header {
    width: 50%;
    margin: auto;
  }
  #info {
    display: inline-block;
    vertical-align: top;
    margin-left: 50px;
    max-width: 69.55%;
  }
  h1 {
    font-size: 64px;
    display: block;
    margin: 0 auto;
    font-family: 'productSansBold';
  }
  h2 {
    font-family: 'productSansRegular';
    opacity: 0.5;
    font-size: 32px;
    margin-top: 8px;
    margin-bottom: 32px;
  }
  .button {
    text-decoration: none;
    font-family: 'productSansRegular';
    border-radius: 40px;
    padding: 10px 24px;
    background-color: #1d2127;
    border: 2px solid;
    margin-right: 10px;
    font-size: 16px;
  }
  .button:hover {

  }
  #spotify {
    color: #00B472;
    border-color: #00B472;
  }
  #suggest {
    color: #AF4544;
    border-color: #AF4544;
  }
  @font-face {
    font-family: productSansRegular;
    src: url(productSansRegular.ttf);
  }
  @font-face {
    font-family: productSansBold;
    src: url(productSansBold.ttf);
    font-weight: bold;
  }
  img {
    border-radius: 16px;
    height: 200px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
  }
</style>