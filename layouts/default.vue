<template>
  <div>
    <transition :name="this.$route.path === '/' ? '' : 'home'">

      <!-- Display splash when path is '/' -->
      <template v-if="this.$route.path === '/'">
        <nuxt/>
      </template>

      <!-- Display main site template when path isn't '/' -->
      <template v-if="this.$route.path !== '/'">
        <div>
          <site-header />
          <nuxt/>
          <footer class="footer"></footer>
        </div>
      </template>
    </transition>
  </div>
</template>


<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
import SiteHeader from '~/components/layout/SiteHeader.vue'

export default Vue.extend ({
  components: {
    SiteHeader
  }
})
</script>

<style lang="postcss">

/*
  Styles for content retrieved from the cloud CMS
****************************/

.prismic-content {
  font-size: var(--type-scale-0);
  color: var(--gray-400);
  & .lede p {
    font-size: var(--type-scale-1);
    line-height: var(--type-scale-3);
  }
  & img {
    max-width: 100%;
  }
  & p, & ol, & ul {
    line-height: var(--spatial-scale-4);
    margin-top: var(--spatial-scale-1);
    margin-bottom: var(--spatial-scale-2);
  }
  & p, & ol, & ul, & h2, & h3, & h4, & h5, & h6 {
    margin-right: var(--spatial-scale-2);
    margin-left: var(--spatial-scale-2);
  }
  & h1, & h2, & h3, & h4, & h5, & h6 {
    color: var(--gray-600);
    margin-top: 1.5em;
    margin-bottom: .75em;
  }
  & h2 {
    font-size: var(--type-scale-2);
    line-height: var(--spatial-scale-6);
    margin-top: var(--spatial-scale-6);
    margin-bottom: var(--spatial-scale-1);
  }
  & figure {
    background: var(--bg-blue-400);
    color: var(--white);
    font-size: var(--type-scale-0);
    margin: var(--spatial-scale-2);
    padding: calc(1rem/16) calc(1rem/16) 1.5em calc(1rem/16);
    & a {
      color: var(--white);
    }
    & p {
      line-height: var(--spatial-scale-4);
      margin: var(--spatial-scale-0) var(--spatial-scale-2);
    }
  }
}
@media (--viewport-small) {
  .prismic-content {
    font-size: var(--font-scale-1);
    & p, & ol, & ul {
      line-height: var(--spatial-scale-5);
    }
    & p, & ol, & ul, & h2, & h3, & h4, & h5, & h6 {
      margin-right: auto;
      margin-left: auto;
      max-width: 30rem;
    }
    & h2 {
      font-size: var(--type-scale-4);
      line-height: var(--spatial-scale-8);
    }
    & .lede p {
      font-size: var(--type-scale-2);
      line-height: var(--spatial-scale-6);
    }
  }
}
@media (--viewport-medium) {
  .prismic-content {
    font-size: calc(22rem/16);
    & p, & ol, & ul {
      line-height: calc(44em/22);
    }
    & p, & ol, & ul, & h2, & h3, & h4, & h5, & h6 {
      max-width: unset;
      width: calc(100% * 8 / 12);
    }
    & .lede p {
      font-size: calc(32rem/16);
      line-height: calc(53em/32);
    }
    & figure {
      font-size: calc(18rem/16);
      & p {
        margin-right: auto;
        margin-left: auto;
        width: 68%;
      }
    }
    & h2 {
      font-size: calc(48rem/16);
      line-height: 1.5em;
      margin: 2em auto .5em;
    }
    & h3 {
      font-size: calc(35rem/16);
    }  
  }
}
@media (--viewport-large) {
  .prismic-content {
    font-size: calc(74rem/16);
    & p, & ol, & ul {
      line-height: calc(53em/24);
    }
  }
}

/*
  Styles for types of blocks
***********************************/

.block-preview {
  font-size: var(--type-scale-1);
  line-height: 1.5em;
}
@media (--viewport-medium) {
  .block-preview{
    font-size: var(--type-scale-1);
    line-height: var(--spatial-scale-4);
  }
}

@media (--viewport-medium) {
  .grid-8-3 {
    display: grid;
    grid-template-columns: 8fr 1fr 3fr;
    column-gap: calc(20rem/16);
    margin: calc(100% * 1 / 12) 0;
    & > .grid-child-8 {
      grid-area: 1 / 1 / 2 / 2;
    }
    & > .grid-child-3 {
      grid-area: 1 / 3 / 2 / 4;
    }
  }
}
</style>
