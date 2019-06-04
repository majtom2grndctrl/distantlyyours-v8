<template>
  <div>
    <header class="hero" :style="`background-image: url('${post.heroBackground.url}')`" ref="heroRoot">
      <div class="meta">
        <h1 class="title" v-html="post.title" />
        <div class="subtitle" v-html="post.subhead" />
      </div>
      <img class="image" v-if="post.heroImage" :src="post.heroImage.url" :alt="post.heroImage.alt" />
    </header>
    <article v-html="post.content" class="prismic-content" />
  </div>
</template>


<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Prismic from 'prismic-javascript'
import { apiEndpoint, parseResponse, BlogPostData } from './index.vue'
import { blogPostMock } from '~/dataMocks';

@Component({})
class BlogView extends Vue {
  async asyncData (ctx) {
//    console.log ('ctx.params.slug = ', ctx.params.slug)
    if (ctx.payload) {
//      console.log('payload = ', ctx.payload)
      return { post: ctx.payload as BlogPostData }
    } else return Prismic.getApi(apiEndpoint).then( api => {
      return api.query(
        Prismic.Predicates.at('my.blog_post.uid', ctx.params.slug),
        {}
      ).then( response => {
//        console.log('Response = ', response)
        return { post: parseResponse(response) as BlogPostData }
      }, err => {
        console.log('Something went wrong: ', err)
        return { title: err }
      })
    }).catch( err => {
      console.warn('Error downloading posts (/pages/blog/_slug.vue)', err)
      console.log('Using data mock: ', { post: parseResponse(blogPostMock)})
      const returnPost = parseResponse(blogPostMock) as BlogPostData
      returnPost.heroImage = ''
      returnPost.heroBackground = 'var(--bg-blue-400)'

      return { post: returnPost }
    })
  }
}

export default BlogView
</script>


<style lang="postcss" scoped>
  .hero {
    background: var(--bg-blue-400) 50% 50% / cover;
    color: white;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 0 2rem 0;
    padding: 0 var(--spatial-scale-2);
  }
  .meta {
  }
  .title {
    font-size: var(--type-scale-2);
    line-height: var(--spatial-scale-6);
    margin: var(--spatial-scale-3) 0 var(--spatial-scale-0);
  }
  .subtitle {
    font-family: var(--font-heading);
    font-size: var(--type-scale-0);
    line-height: var(--spatial-scale-4);
    margin: 0 auto var(--spatial-scale-3);
  }
  .hero .image {
    display: block;
    margin: 15% auto var(--spatial-scale-0);
    max-width: 50%;
  }
  @media (--viewport-small) {
    .hero {
      margin: 0 0 var(--spatial-scale-6) 0;
    }
    .title {
      margin: 1em auto .5em;
      max-width: 30rem;
    }
    .subtitle {
      max-width: 30rem;
    }
    .hero .image {
      margin-top: 8.25%;
    }
  }
  @media (--viewport-medium) {
    .hero {
      display: grid;
      grid-template-columns: 1fr 5fr 1fr 4fr 1fr;
      justify-items: center;
      column-gap: var(--spatial-scale-1);
      padding: calc(100% * 1 / 12) 0;
    }
    .meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-area: 1 / 2 / 2 / 2;
      padding: 0;
    }
    .title {
      font-size: var(--type-scale-3);
      line-height: var(--spatial-scale-6);
      max-width: unset;
    }
    .subtitle {
      font-size: var(--type-scale-1);
      line-height: var(--spatial-scale-4);
      margin: unset;
    }
    .hero .image {
      grid-area: 1 / 4 / 2 / 5;
      max-width: unset;
      margin: unset;
      width: 100%;
    }
  }
</style>

