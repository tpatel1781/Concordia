<template>
    <div id="header">
      <p> {{name}} </p>
      <p> {{albumName}} </p>
      <p> {{spotifyUrl}} </p>
      <p> {{artist}} </p>
    </div>
</template>

<script>
export default {
  props: ["name", "albumName", "spotifyUrl", "artist"],
};
</script>

<style>
</style>