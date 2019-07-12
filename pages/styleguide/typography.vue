<template>
  <style-guide-page title="Typography">
    <div class="headings-intro">
      <h2 class="headings-title">Headings<br />are&nbsp;in<br />Poppins</h2>
      <specimen class="heading">
        Aa Ee Dd
      </specimen>
    </div>
    <div class="body-copy-sample">
      <p>Body copy is Libre Franklin. The base font size is 16px on mobile devices, and approximately 18px on desktop devices.</p>
    </div>
    <div class="type-scale">
      <div v-for="(item, index) in textHeadings" :key="`heading-${index}`" :class="`type-scale-${item}`">Type Scale {{ item }}</div>
    </div>
  </style-guide-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import StyleGuidePage from '~/components/layout/StyleGuidePage.vue'
import Specimen from '~/components/styleguide/typography/specimen.vue'

@Component({
  layout: 'styleguide',
  components: {
    StyleGuidePage,
    Specimen,
  },
})
class TypographyPage extends Vue {
  data() {
    return {
      textHeadings: [6, 5, 4, 3, 2, 1, 0, '00'],
    }
  }
}

export default TypographyPage
</script>


<style lang="postcss" scoped>
  .headings-intro {
  }
  .headings-title {
    font-size: var(--type-scale-5);
    line-height: var(--spatial-scale-8);
    margin: 0 0 var(--spatial-scale-5) 0;
  }
  .Specimen.heading {
    font-family: var(--font-heading);
    margin: 0 0 var(--spatial-scale-5) 0;
  }
  @media(--viewport-small) {
    .headings-intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--spatial-scale-2);
    }
  @media(--viewport-medium) {
    .headings-intro {
      margin: 0 0 var(--spatial-scale-5) 0;
    }
    .headings-title {
      font-size: var(--type-scale-6);
      line-height: var(--spatial-scale-8);
      margin: 0;
    }
  }
}


  .type-scale {
    & div {
      background-color: rgb(236, 248, 255);
      font-family: var(--font-heading);
      margin: var(--spatial-scale-2) 0 var(--spatial-scale-2) -.025em;
    }
  }
  .type-scale-6 {
    font-size: var(--type-scale-6);
    line-height: var(--spatial-scale-6);
  }
  .type-scale-5 {
    font-size: var(--type-scale-5);
    line-height: var(--spatial-scale-5);
  }
  .type-scale-4 {
    font-size: var(--type-scale-4);
    line-height: var(--spatial-scale-4);
  }
  .type-scale-3 {
    font-size: var(--type-scale-3);
    line-height: var(--spatial-scale-3);
  }
  .type-scale-2 {
    font-size: var(--type-scale-2);
    line-height: var(--spatial-scale-2);
  }
  .type-scale-1 {
    font-size: var(--type-scale-1);
    line-height: var(--spatial-scale-1);
  }
  .type-scale-0 {
    font-size: var(--type-scale-0);
    line-height: var(--spatial-scale-0);
  }
  .type-scale-00 {
    font-size: var(--type-scale-00);
    line-height: var(--spatial-scale-00);
  }
</style>
