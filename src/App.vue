<template>
  <div>

    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" ref="svg_container">

    </svg>
  </div>
</template>

<script>


import SceneSetup from "@lib/bootstrap/SceneSetup.js";
import SVGInteractive from "@lib/interactive/SVGInteractive.js";
import SVGLoader from "@lib/bootstrap/SVGLoader.js";
import KeyboardListener from "@lib/interactive/KeyboardListener.js";
import Collisions from "@lib/helpers/Collisions.js";
import SolidBlocks from "@lib/interactive/SolidBlocks.js";

export default {
  name: 'App',
  mounted() {
    SceneSetup.set(1200,800);
    KeyboardListener.init();
    let map = SVGInteractive.make('/scenario/map.svg', 0 ,0 ,0,0);
    map.collisions = false;
    let player = SVGInteractive.make('/scenario/char.svg', 0, 0);
    let NPC = SVGInteractive.make('/scenario/char.svg', 300, 300);
    let NPC2 = SVGInteractive.make('/scenario/char.svg', 700, 300);
    let SVGContainer = this.$refs.svg_container;
    let loader = new SVGLoader(SVGContainer);
    let collection = [map, player, NPC, NPC2];
    loader.addCollection(collection);
    loader.import();
    SolidBlocks.collection = collection.filter(item=>item.collisions);
    KeyboardListener.setPlayer(player, 3);

  }
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
