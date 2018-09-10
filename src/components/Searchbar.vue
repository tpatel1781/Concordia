<template>
    <div>
        <form>
            <input type="text" v-model="message" v-on:input="autocomplete(message)">
            <input id="searchbar" type="submit" value="Search">
            <p>{{ songs }}</p>
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
            this.songs.push(track.name);
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
</style>