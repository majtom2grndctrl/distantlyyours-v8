<template>
  <div class="AnthologyItem">
    <div class="content">
      <block-type class="type">{{ data.type }}</block-type>
      <div class="description block-preview" v-html="data.description" />
      <cta-link :to="data.href" v-html="data.ctaText" class="cta" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import CtaLink from '~/components/buttons/CtaLink.vue'
import BlockType from '~/components/text/BlockType.vue'

export interface AnthologyItemData {
  type: string
  description: string
  ctaText: string
  href: string
}

@Component({
  components: {
    CtaLink,
    BlockType
  }
})

class AnthologyItem extends Vue {
  @Prop()
  data!: AnthologyItemData
}

export default AnthologyItem
</script>

<style lang="postcss" scoped>
.AnthologyItem {
  background-color: var(--white);
  border-radius: calc(8rem/16);
  color: var(--gray-400);
  margin: var(--spatial-scale-2) 0;
  padding: var(--spatial-scale-3) var(--spatial-scale-1) var(--spatial-scale-1);
  & .type {
    color: var(--gray-600);
  }
  & .cta {
    background-color: var(--gray-800);
    opacity: 1;
  }
}
.description {
  margin: 0 0 var(--spatial-scale-1) 0;
}
@media (--viewport-small) {
  .AnthologyItem {
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
    padding: var(--type-scale-1);

    & .cta {
      max-width: 20rem;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
@media (--viewport-medium) {
  .AnthologyItem {
    color: inherit;
    box-sizing: border-box;
    display: flex;
      flex-direction: column;
      flex-basis: 50%;
    padding: var(--spatial-scale-8) 0 var(--spatial-scale-8) 0;
    margin: 0;
    max-width: none;
    &:nth-child(2n+1) {
      background: var(--bg-blue-600);
    }
    &:nth-child(2n) {
      background: var(--bg-blue-200);
    }
    & .type {
      color: inherit;
      font-size: var(--type-scale-00);
      line-height: var(--spatial-scale-00);
    }
    & .description {
    }
    & .cta {
      background-color: var(--white);
      opacity: .85;
      margin-right: 0;
      margin-left: 0;
    }
  }
  .content {
    display: flex;
      flex-direction: column;
      flex-basis: 100%;
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
    width: 50%;
  }
  .description {
    flex-basis: 100%;
  }
}
</style>

