<template>
    <div>
        <form>
            <input type="text" v-model="message" v-on:input="autocomplete(message)">
            <input id="searchbar" type="submit" value="Search">
            <div class="songs">
              <template v-for="song in songs">
                <p class="song"> {{ song.name + ", " + song.artists[0].name }}</p>
              </template>
            </div>
        </form> 
    </div>
</template>

<script>
import axios from "axios";
import SongPage from "./SongPage";
export default {
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
  .song {
	padding-left: 26px;
	border-radius: 8px;
	margin-bottom: 10px;
	margin-right: 94px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	transition-duration: 200ms;
}
  .song:hover {
	-webkit-transform: scale(1.05);
	-ms-transform: scale(1.05);
	transform: scale(1.05);
	transition-duration: 200ms;
}
</style>