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
export default {
  data() {
    return {
      message: 'hello',
      songs: []
    };
  },
  methods: {
        autocomplete: function(input) {
                        var songs
                        axios({ method: "GET", url: "http://localhost:3000/search/"+input }).then(
                             result => {
                              console.log(result.data);
                               this.songs = result.data;
                               console.log(songs);
                             },
                            error => {
                                 console.error(error);
                            }
                        )
                          console.log(songs);
                        
                        return songs;
                        },
        myFunc: function(input) {
            return input;
        }
            },
  
  mounted() {
    axios({ method: "GET", url: "http://localhost:3000/search/rockstar" }).then(
      result => {
          console.log(result);
        this.songs = result.data;
        console.log(this.songs);
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