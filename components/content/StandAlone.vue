<template>
  <section class="StandAlone">
    <div class="content">
      <h2 class="title">{{story.title}}</h2>
      <block-type class="type">{{story.type}}</block-type>
      <div class="description block-preview">{{story.description}}</div>
      <cta-link class="cta" :to="story.href">{{story.ctaLabel}}</cta-link>
    </div>
    <div class="image">
      <img :src="story.imgSrc" :alt="story.imgAlt" />
    </div>
  </section>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CtaLink from '~/components/buttons/CtaLink.vue'
import BlockType from '~/components/text/BlockType.vue'

export interface StandAloneProps {
  title: string
  type: string
  description: string
  ctaLabel: string
  href: string
  imgSrc: string
  imgAlt: string
  bgColor?: string
  bgImg?: string
}

@Component({
  components: {
    CtaLink,
    BlockType,
  }
})
class StandAlone extends Vue {
  @Prop()
  story!: StandAloneProps
}

export default StandAlone
</script>


<style lang="postcss" scoped>
  .StandAlone {
    background: var(--blue-400);
    color: var(--white);
    display: flex;
      flex-direction: column-reverse;
    overflow: hidden;
  }
  .content {
    max-width: 30rem;
    margin: 0 auto;
    padding: 0 var(--spatial-scale-3);
  }
  .title {
    font-size: var(--type-scale-2);
    line-height: 1.375em;
    margin: var(--spatial-scale-2) 0 var(--spatial-scale-2) 0;
  }
  .description {
    /* should extend .block-preview */
    margin: calc(5rem/16) 0 calc(15rem/16) 0;
  }
  .image {
    box-sizing: border-box;
    margin: 2rem auto 0;
    padding: 0 1.5rem;
    width: 75%;
      max-width: 20rem;
    & img {
      max-width: 100%;
    }
  }
  .cta {
    margin: 1rem auto 2rem;
    max-width: 20rem;
  }
  @media (--viewport-small) {
    .content {
      padding: 0 var(--spatial-scale-4);
    }
  }
  @media (--viewport-medium) {
    .StandAlone {
      flex-direction: row;
      align-items: center;
      padding-top: calc(100% * 1 / 14);
      padding-bottom: calc(100% * 1 / 14);
    }
    .content {
      padding: 0;
      width: calc(100% * 3 / 8);
    }
    .type {
      font-size: var(--type-scale-00);
      line-height: var(--spatial-scale-00);
    }
    .title {
      font-size: calc(28rem/16);
      margin-top: 0;
    }
    .cta {
      padding-right: 1em;
      padding-left: 1em;
      margin-bottom: 0;
    }
    .image {
      margin: 1rem 0 0;
      padding: 0 0 0 calc(10rem/16);
      overflow: hidden;
      & img {
        max-width: 110%;
        width: 110%;
      }
    }
  }
  @media (--viewport-large) {
  }
</style>

