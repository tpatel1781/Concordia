<template>
    <div id="header">
      <p> {{name}} </p>
      <p> {{albumName}} </p>
      <p> {{spotifyUrl}} </p>
      <p> {{artist}} </p>
      <p> {{numUpvotes}} </p>
    </div>
</template>

<script>
export default {
  props: ["songId", "name", "albumName", "spotifyUrl", "artist", "numUpvotes"],
};
</script>

<style>
</style>