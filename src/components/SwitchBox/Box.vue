<template lang="pug">
.box
  .image(:style='{ background: "url(" + imageUrl + ")" }', v-if='imageUrl')
  .flex.flex-justify-center(v-if='iconUrl')
    orb(:size='100', :initialX='-70', :initialY='-70', :shadow='false', :transitionDelay='0')
    .relative
      .icon(:style='{ background: "url(" + iconUrl + ")" }', v-inview:class='["visible"]')
  .text
    h4 {{ title }}
    p {{ text }}
    inno-button-alternate(:label='toLabel', :to='to', v-if='to')

</template>

<script>
export default {
  components: {
    Orb: require('src/components/Orb')
  },

  props: {
    title: String,
    text: String,
    imageUrl: String,
    iconUrl: String,
    to: Object,
    toLabel: String
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables";

.box {
  box-shadow: $shadow-large;
  width: 442px;
  max-width: calc(100vw - #{$gutter / 2});
  position: absolute;

  @include mini { // iPhone SE fix
    right: calc(-50vw + #{$gutter/4});
  }

  .relative {
    position: relative;

    .icon {
      $size: 50px;
      height: $size;
      width: $size;
      position: absolute;
      top: -$size/2;
      left: -$size/2;
      opacity: 0;
      transition: opacity 0.5s ease-out 0.5s;

      &.visible {
        opacity: 1;
      }
    }
  }

  .image {
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    width: 100%;
    height: 275px;
  }

  .text {
    text-align: center;
    background: white;
    padding: 70px $gutter 60px $gutter;
    border-bottom-right-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
    margin: 0 auto;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include mini {
      padding: 70px 10px 40px 10px;
    }

    p {
      margin-bottom: 0;
    }
  }
}
</style>
