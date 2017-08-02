<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Quasar Framework v{{$q.version}}
      </q-toolbar-title>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <!-- <div class="logo-container non-selectable no-pointer-events">
        <div class="logo" :style="position">
          <img src="~assets/quasar-logo.png">
          <p class="caption text-center">
            <span v-if="orienting || rotating">Tilt your device.</span>
            <template v-else>
              <span class="desktop-only">Move your mouse.</span>
              <span class="touch-only">Touch screen and move.</span>

            </template>
          </p>
        </div>
      </div> -->
      <div class="logo-container">
        <button class="primary" @click="roll()">
          <i class="on-left">mail</i> Roll the dice, boiii
        </button>

        <div class="card">
          <div class="card-content">
            #1 {{ this.results.object1 }}
          </div>
        </div>

        <div class="card">
          <div class="card-content">
          #2 {{ this.results.object2 }}
          </div>
        </div>



      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      objects: ['brain', 'balls', 'dick', 'shaft', 'titties', 'pussy'],
      adjectives: ['big', 'small', 'green', 'red', 'blue', 'yellow'],
      results: {}
    }
  },
  methods: {
    roll () {
      const objectsLength = this.objects.length
      const adjectivesLength = this.adjectives.length
      const adjective = Math.floor(Math.random() * adjectivesLength)
      const id1 = Math.floor(Math.random() * objectsLength)
      const id2 = Math.floor(Math.random() * objectsLength)

      const results = {
        object1: this.objects[id1],
        object2: this.objects[id2],
        adjective: this.adjectives[adjective]
      }

      this.results = results
      return results
    }
  }
}
</script>

<style lang="stylus">
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
