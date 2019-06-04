<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DyLogo from '~/components/DyLogo.vue'
//import MobileNavLauncher from '~/components/buttons/MobileNavLauncher.vue'

@Component({
  components: {
    DyLogo,
//    MobileNavLauncher
  }
})

class SiteHeader extends Vue {
/*
  data() {
    return {
      mobileNav: false
    }
  }
*/
}


export default SiteHeader
</script>


<template>
  <header class="SiteHeader">
    <div class="logo-container">
      <nuxt-link to="/" class="logo-link">
        <dy-logo class="logo" width="" height="" />
        <span class="distantly-yours">Distantly Yours</span>
      </nuxt-link>
    </div>
    <nav class="site-nav">
      <nuxt-link to="/portfolio">Portfolio</nuxt-link>
      <nuxt-link to="/blog">Blog</nuxt-link>
    </nav>
    <div class="push-farther">Push Farther</div>
  </header>
</template>


<style lang="postcss" scoped>
  .SiteHeader {
    display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
    margin: var(--spatial-scale-2) var(--spatial-scale-2) 0 var(--spatial-scale-2);
  }
  .logo-container {
    display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
    margin-right: var(--spatial-scale-2);
    &:hover {
      & .distantly-yours {
        opacity: 1;
        filter: blur(0);
        transform: translate(0, -50%) rotate3d(0, 0, 0, 45deg);
      }
      & + .site-nav {
        opacity: 0;
        transform: translate3d(3em, 0, 0);
        & + .push-farther {
          opacity: 0;
          filter: blur(.25em);
          transform: translate3d(3em, 0, 0);
        }
      }
    }
  }
  .logo-link {
    display: block;
    position: relative;
  }
  .logo {
    height: var(--spatial-scale-5);
  }
  .distantly-yours {
    color: var(--gray-500);
    filter: blur(.66em);
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: var(--type-scale-0);
    letter-spacing: .166ex;
    opacity: 0;
    pointer-events: none;
    position: absolute;
      top: 50%;
      left: 142%;
    width: 12em;
    text-transform: uppercase;
    transform: translate(0, -50%) rotate3d(-1, 2, 0, 55deg);
    transition: opacity .4s, filter .6s ease, transform .6s;
  }
  @media (--viewport-small) {
    .SiteHeader {
      margin-right: var(--spatial-scale-4);
      margin-left: var(--spatial-scale-4);
    }
  }
  @media (--viewport-medium) {
    .SiteHeader {
      display: grid;
        grid-column-gap: var(--spatial-scale-2);
        grid-template-columns: 1fr 7fr 4fr;
      margin: var(--spatial-scale-4) auto 0 auto;
      width: calc(100% * 12 / 14);
    }
    .logo-container {
      grid-area: 1 / 1 / 2 / 2;
      width: auto;
      margin-right: 0;
    }
    .logo {
      height: var(--spatial-scale-4);
    }
  }


/* Push Farther */
.push-farther {
  display: none;
}
@media (--viewport-small) {
  .push-farther {
    color: #797979;
    display: block;
    font-weight: 300;
    font-size: var(--type-scale-0);
    letter-spacing: .05ex;
    opacity: .6;
    padding: 0;
    position: absolute;
      top: calc(32rem/16);
      right: var(--spatial-scale-4);
    text-transform: uppercase;
    transition: transform .5s ease, opacity .5s, filter .5s;
    &:before {
      color: #076381;
      content: '//';
      font-size: calc(26em/15);
      font-weight: bold;
      font-style: italic;
      mix-blend-mode: color-burn;
      padding: 0 .125em;
      position: absolute;
        left: calc(-20em/15);
        top: 45%;
      transform: translate(0, -50%);
    }
  }
}
@media (--viewport-medium) {
  .push-farther{
    top: calc(var(--spatial-scale-5) + .25em);
    right: calc(100% * 1/14);
  }
}


/* 
   Navigation
******************************/
.site-nav {
  display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
  margin: 0;
  transition: transform .5s ease, opacity .5s;
  & > a {
    border-bottom: calc(1rem/16) solid rgba(3, 161, 213, 0);
    color: #97A3A7;
    display: flex;
      align-items: center;
    font-size: var(--type-scale-0);
    height: var(--spatial-scale-4);
    line-height: var(--spatial-scale-0);
    margin: 0 var(--type-scale-1) 0 0;
    padding: 0 var(--spatial-scale-1);
    text-decoration: none;
    transition: border-bottom-color .66s;
    &.active {
      border-bottom-color: rgba(3, 161, 213, .3);
    }
  }
}
@media (min-resolution: 1.25dppx) {
  .site-nav > a.active {
    border-bottom-width: calc(1.5rem/16);
  }
}
@media (--viewport-medium) {
  .site-nav {
    grid-area: 1 / 2 / 2 / 3;
    margin-left: calc(var(--spatial-scale-1) * -1);
    & > a {
      font-size: var(--type-scale-0);
    }
  }
}

</style>
