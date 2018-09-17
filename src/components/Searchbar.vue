<template>
    <div>
        <form>
            <input type="text" placeholder="Search" v-model="message" v-on:input="autocomplete(message)">
            <div class="songs">
              <template v-for="song in songs">
                <p class="song"> 
                    <router-link class="song" :to="{ name: 'songs', params: {name: song.id}}"> 
                        {{ song.name + ", " + song.artists[0].name }}
                    </router-link> 
                </p>
              </template>
            </div>
        </form> 
    </div>
</template>

<script>
import axios from "axios";
import VueRouter from "vue-router";
import SongPage from "./SongPage";

export default {
  name: "Searchbar",
  data() {
    return {
      message: "",
      songs: []
    };
  },
  methods: {
    autocomplete: function(input) {
      var songs;
      axios({
        method: "GET",
        url: "http://localhost:3000/search/" + input
      }).then(
        result => {
          this.songs = [];
          for (var track of result.data) {
            this.songs.push(track);
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }
};
</script>

<style>
@font-face {
  font-family: productSansRegular;
  src: url(productSansRegular.ttf);
}
@font-face {
  font-family: productSansBold;
  src: url(productSansBold.ttf);
  font-weight: bold;
}
body {
  background-color: #1d2127;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
input {
  background-color: #1d2127;
  color: white;
  font-family: "productSansBold";
  font-size: 64px;
  opacity: 0.75;
  border: none;
  display: block;
  margin: 0 auto;
  width: 100%;
  margin-top: 125px;
}
a {
  text-decoration: none;
}

*:focus {
  outline: none;
}
.song {
  color: white;
  font-family: "productSansRegular";
  transition-duration: 300ms;
  font-size: 32px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.song:hover {
  color: springgreen;
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
  text-shadow: 2px 2px 4px #000000;
  transition-duration: 300ms;
}
</style>