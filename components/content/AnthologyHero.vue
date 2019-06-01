<template>
  <header class="AnthologyHero">
    <h1 class="title">{{ data.title }}</h1>
    <div class="image">
      <img :src="data.image" alt="" />
    </div>
    <div class="description" v-html="data.description" />
    <h2 class="subhead" v-html="data.subhead" />
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

export interface AnthologyHeroData {
  title: string
  image: string
  description: string
  subhead: string
}

@Component({})

class AnthologyHero extends Vue {
  @Prop()
  data!: AnthologyHeroData
}

export default AnthologyHero
</script>

<style lang="postcss" scoped>
.AnthologyHero {
  overflow: hidden;
}
.title {
  color: var(--white);
  font-size: var(--type-scale-2);
  font-weight: 400;
  line-height: 1.375em;
  margin: var(--spatial-scale-4) 0 var(--spatial-scale-1);
  text-align: center;
}
.description {
  font-size: var(--type-scale-1);
  line-height: var(--spatial-scale-5);
}
.image {
  margin: var(--spatial-scale-1) 15%;
  & > img {
    width: 100%;
  }
}
.subhead {
  font-size: var(--type-scale-2);
  font-weight: 400;
  line-height: 1.375em;
  margin: var(--spatial-scale-2) 0 var(--spatial-scale-1);
  text-align: center;
}
@media (--viewport-small) {
  .AnthologyHero {
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
  }
}
@media (--viewport-medium) {
  .AnthologyHero {
    display: flex;
    flex-direction: column;
    height: 25.5rem;
    justify-content: center;
    overflow: hidden;
    padding: 0 60% 0 13%;
    position: relative;
  }
  .title {
    margin: .5em 0 0 0;
    text-align: left; 
  }
  .subhead {
    display: none;
  }
  .description {
    line-height: var(--spatial-scale-4);
  }
  .image {
    margin: 0;
    position: absolute;
      top: 1rem;
      right: calc(100% * 1/12);
    width: calc(100% * 5.5/12);
  }

  /* Modification classes */
  .Anthology--inroads {
    & .title {
      font-size: var(--type-scale-4) !important;
    }
  }
}

</style>
