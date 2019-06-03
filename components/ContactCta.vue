<template>
  <section class="ContactCta">
    <div class="image-container">
      <img class="image-mobile" src="/img/project-collage-tablet.jpg" alt="" />
      <img class="image-desktop" src="/img/project-collage-desktop.jpg" alt="" />
    </div>
    <div class="content">
      <h1 class="title">There’s so much more to talk&nbsp;about!</h1>
      <p>I’ve worked on many different teams and challenges. Some of that work hasn’t been published here yet&mdash;<strong>much of it can’t be</strong>. The&nbsp;best way to get to know what I have to offer is to talk shop over&nbsp;coffee.</p>
      <cta-link class="cta" href="https://www.linkedin.com/in/danhiester" variant="white">Contact me on LinkedIn</cta-link>
    </div>
  </section>
</template>


<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CtaLink from '~/components/buttons/CtaLink.vue'

@Component({
  components: {
    CtaLink
  }
})

class ContactCta extends Vue {}

export default ContactCta
</script>


<style lang="postcss" scoped>
.ContactCta {
  background: #486172;
  color: var(--white);
  padding: 0 0 var(--spatial-scale-3) 0;
}
.image-mobile {
  width: 100%;
}
.image-desktop {
  display: none;
}
.content {
  margin: 0 var(--spatial-scale-3);
  padding: 0;
  overflow: hidden;
  & > .title {
    font-weight: 400;
    font-size: var(--type-scale-2);
    line-height: var(--spatial-scale-6);
    margin: 1em 0 var(--spatial-scale-1);
  }
  & > p {
    font-size: var(--type-scale-1);
    line-height: var(--spatial-scale-5);
    margin: var(--spatial-scale-1) 0 var(--spatial-scale-3);
  }
}
.cta {
  max-width: 20rem;
  margin-right: auto;
  margin-left: auto;
}

@media (--viewport-small) {
  .content {
    margin: 0 auto;
    max-width: 30rem;
    & > .title {
      text-align: center;
    }
  }
}
@media (--viewport-medium) {
  .ContactCta {
    display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: center;
    margin: calc(1 / 12 * 100%) 0;
    padding: 1rem 0;
  }
  .content {
    flex-basis: 47%;
    padding-right: 1.5rem;
    & > .title, & > p, & > .cta {
      max-width: 22rem;
      margin-right: auto;
      margin-left: auto;
    }
    & > .title {
      font-size: var(--type-scale-2);
      line-height: var(--spatial-scale-5);
      margin-top: 0;
      margin-bottom: var(--spatial-scale-1);
      text-align: left;
    }
    & > p {
      font-size: var(--type-scale-0);
      line-height: var(--spatial-scale-3);
      margin-bottom: var(--spatial-scale-2);
    }
  }
  .image-container {
    flex-basis: 53%;
  }
  .image-mobile {
    display: none;
  }
  .image-desktop {
    display: block;
    width: 100%;
  }
}
</style>

