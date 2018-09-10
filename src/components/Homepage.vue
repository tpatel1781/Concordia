<template>
    <div>
        <Searchbar />
        <SongPage name="hello1234" />
    </div>
</template>

<script>
import Searchbar from "./Searchbar";
import SongPage from "./SongPage";
export default {
    name: "homepage",
    components: {
        Searchbar,
        SongPage
    }
}
</script>

<style>

</style>

