<template lang="pug">
header
  .header
    .wrapper
      router-link.flex.flex-align-center.cp(:to='{ name: "home" }', tag='div')
        img.logo(src='/static/images/svg/logo.svg')

      .header-menus(ref='headerMenus')
        .menu(@mousemove='openMenu("attentionAreas")', @mouseleave='closeMenu', ref='menuAttentionAreas') Vakgebieden.
        .menu(@mousemove='openMenu("about")', @mouseleave='closeMenu', ref='menuAbout') Over ons.
        .menu: router-link(:to='{ name: "contact" }') Contact.
        .menu: inno-button(label='Werken bij.', :to='{ name: "jobs" }', yellow)

      transition(name='headerfade')
        .header-menu(v-if='menuOpen === "attentionAreas"', :style='{ "left": getMenuLeft("menuAttentionAreas") + "px" }', @mouseover='openMenu("attentionAreas")', @mouseleave='closeMenu')
          router-link(:to='{ name: "smart-industry" }', @click.native='closeMenu(true)') Smart Industry
          router-link(:to='{ name: "smart-health" }', @click.native='closeMenu(true)') Smart Health

      transition(name='headerfade')
        .header-menu(v-if='menuOpen === "about"', :style='{ "left": getMenuLeft("menuAbout") + "px" }', @mouseover='openMenu("about")', @mouseleave='closeMenu')
          router-link(:to='{ name: "about" }', @click.native='closeMenu(true)') Onze cultuur
          router-link(:to='{ name: "world" }', @click.native='closeMenu(true)') Onze wereld
          router-link(:to='{ name: "partners" }', @click.native='closeMenu(true)') Onze partners

  .phone-header(:class='{ "open": $store.state.phoneMenuOpen }')
    .icon-menu-container(@click='togglePhoneMenuState')
      .icon-menu
    router-link.flex.flex-align-center.cp(:to='{ name: "home" }', tag='div')
      img(src='/static/images/svg/logo.svg')
    .items
      section.areas.flex.flex-column
        h4.item Vakgebieden.
        .flex.flex-justify-around.full-width.flex-wrap
          inno-button.item.bold(label='Smart Industry', primary, small, :to='{ name: "smart-industry" }', @click.native='closeMenu(true)')
          inno-button.item.bold(label='Smart Health', primary, small, :to='{ name: "smart-health" }', @click.native='closeMenu(true)')

      section.about
        router-link.item(:to='{ name: "about" }', tag='h4') Over ons.
        router-link.item.indent.bold(tag='h3', :to='{ name: "about" }', @click.native='closeMenu(true)') Onze cultuur
        router-link.item.indent.bold(tag='h3', :to='{ name: "world" }', @click.native='closeMenu(true)') Onze wereld
        router-link.item.indent.bold(tag='h3', :to='{ name: "partners" }', @click.native='closeMenu(true)') Onze partners

      section.contact.flex.flex-justify-around.full-width.flex-wrap.flex-align-center
        router-link.item.bold(:to='{ name: "contact" }', tag='h3') Contact
        inno-button.item(label='Werken bij.', yellow, :to='{ name: "jobs" }')
</template>

<script>
import SmoothScroll from 'smooth-scroll'

const scroll = new SmoothScroll()
scroll.init({
  speed: 750
})

export default {
  data () {
    return {
      menuOpen: null,
      lastScrollY: null,
      showHeader: true,
      canOpenHeaderMenu: true,
      closeMenuTimeout: null
    }
  },

  methods: {
    togglePhoneMenuState () {
      this.$store.commit('setPhoneMenuState', !this.$store.state.phoneMenuOpen)

      if (this.$store.state.phoneMenuOpen) {
        this.lastScrollY = window.scrollY
        window.scroll(0, 0)
      } else {
        setTimeout(() => {
          scroll.animateScroll(this.lastScrollY)
        }, 100)
      }
    },

    getMenuLeft (menuRef) {
      const POPUP_WIDTH = 300 // also in scss
      const menu = this.$refs[menuRef]

      const leftDistanceUntilMenuHeader = menu.getBoundingClientRect().left

      const menuWidth = menu.clientWidth

      return leftDistanceUntilMenuHeader - (POPUP_WIDTH / 2) + (menuWidth / 2)
    },

    openMenu (menuName) {
      clearTimeout(this.closeMenuTimeout)

      if (this.canOpenHeaderMenu) {
        this.menuOpen = menuName
      }
    },

    closeMenu (overide) {
      this.closeMenuTimeout = setTimeout(() => {
        this.menuOpen = null
      }, 100)

      if (overide === true) {
        this.canOpenHeaderMenu = false

        setTimeout(() => {
          this.canOpenHeaderMenu = true
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables";
@import "src/styles/layout";
$transition: 0.3s ease-in-out;

.header {
  position: fixed;
  width: 100vw;
  display: flex;
  height: $headerHeight;
  background: white;
  z-index: 2;

  @include phablet {
    display: none;
  }

  img.logo {
    margin: $gutter $gutter $gutter 0;

    @media (max-width: $pageWidth) {
      margin-left: $gutter;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: $pageWidth;
    margin: 0 auto;
    flex-grow: 1;

    .header-menus {
      display: flex;
      align-items: center;

      .menu {
        font-family: "Bitter";
        font-weight: bold;
        margin: 0 15px;
        padding: 40px 0;
        cursor: pointer;
        transition: all $transition;

        a:hover,
        &:hover {
          color: $inno-blue;
        }

        .button {
          margin: 0;
        }
      }
    }

    .header-menu {
      $width: 300px; // also set in js
      position: absolute;
      top: $headerHeight;
      background: white;
      display: flex;
      flex-direction: column;
      width: $width;
      border-radius: $border-radius;
      border-top: 4px solid $inno-blue;
      box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.1);

      &:before {
        $size: 25px;

        position: absolute;
        top: -$size/2;
        left: $width / 2 - $size / 2;
        width: $size;
        height: $size;
        border-radius: 3px;
        background: $inno-blue;
        content: "";
        transform: rotate(45deg);
        z-index: -1;
      }

      a {
        padding: 20px 0;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid $gray1;
        background: white;

        &:hover {
          font-weight: bold;
          color: $inno-blue;
        }

        &:last-child {
          overflow: hidden;
          position: relative;
          border-bottom: none;

          &:after {
            $size: 80px;

            position: absolute;
            bottom: -$size/2 - 10px;
            left: -$size/2;
            width: $size;
            height: $size;
            background: $inno-yellow;
            content: "";
            border-radius: 45%;
          }
        }
      }
    }
  }
}

.phone-header {
  background: white;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 5;
  display: none;
  transition: background $transition;

  @include phablet {
    display: flex;
  }

  .icon-menu-container {
    position: absolute;
    left: 15px;
    top: 15px;
    height: 45px;
    width: 50px;

    .icon-menu {
      $height: 2px;
      $width: 28px;

      height: $height;
      width: $width;
      background: black;
      position: relative;
      left: 10px;
      top: 20px;
      transition: background $transition;

      &:after,
      &:before {
        height: $height;
        width: $width;
        background: black;
        position: absolute;
        content: "";
        left: 0;
        transition: all $transition;
      }

      &:after {
        top: -10px;
      }

      &:before {
        top: 10px;
      }
    }
  }

  .items {
    position: absolute;
    left: 0;
    top: 75px;
    width: 100vw;
    background: linear-gradient(
      to top,
      transparent 0%,
      rgba(0, 0, 0, 0.1),
      transparent
    );
    border-bottom-right-radius: $border-radius;
    opacity: 0;
    transition: all 0.2s ease-in;
    visibility: hidden;

    section {
      &:first-child {
        margin-bottom: 20px;
      }

      &:last-child {
        margin-top: $gutter;
      }
    }

    .item {
      margin: 10px 0;
      opacity: 0;
      transform: translateX(-50px);
      transition: all $transition;
      transition-delay: 0;
      text-align: center;
      font-weight: normal;

      &.indent {
        margin-left: 20px;
        margin: 20px 0;
      }

      &.bold {
        font-weight: bold;
      }
    }

    .button {
      font-size: 20px;
    }

    .areas {
      .button {
        margin-bottom: 20px;
      }
    }
  }

  &.open {
    background: transparent;
    position: initial;

    .icon-menu {
      background: transparent;

      &:after {
        transform: rotate(-45deg);
        top: 0;
      }

      &:before {
        transform: rotate(45deg);
        top: 0;
      }
    }

    .items {
      opacity: 1;
      visibility: visible;

      .item {
        opacity: 1;
        transform: translateX(0);

        $itemCount: 9;
        @for $i from 0 to $itemCount+1 {
          &:nth-child(#{$i}) {
            transition-delay: 0.1s * $i;
          }
        }
      }
    }
  }
}

// Transition
.headerfade-enter-active,
.headerfade-leave-active {
  transition: all 0.5s;
}

.headerfade-enter,
.headerfade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
