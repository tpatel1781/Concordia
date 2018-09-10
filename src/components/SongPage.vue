<template>
    <div>
        <p> {{ songId }} </p>
        <p> {{ songName }} </p>
        <p> {{ spotifyUrl }} </p>
        <template v-for="similarSong in similarSongs"> 
            <p> {{ similarSong }} </p>
        </template>
    </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["name"],
  data() {
    return {
      songId: "",
      songName: "",
      spotifyUrl: "",
      similarSongs: []
    };
  },
  components: {},
  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/song/" + this.name
    }).then(
      result => {
        this.songId = result.data._id;
        this.songName = result.data.name;
        this.spotifyUrl = result.data.spotifyUrl;
        this.similarSongs = result.data.similarSongs;
      },
      error => {
        console.error(error);
      }
    );
  }
};
</script>

<style>
</style>