<template>
  <article>
    <header class="header">
      <div class="meta">
        <h1 v-html="data.headline" class="title" />
        <div>
          <span class="projectName">{{ data.meta.project_name }}</span><span class="type">{{ data.meta.case_study_type }}</span>
        </div>
        <div class="projectDates">{{ data.meta.start_date }}&ndash;{{ data.meta.end_date }}</div>
      </div>
      <div class="hero">
        <img :src="data.hero_image.url" class="heroImage" :alt="data.hero_image.alt" />
      </div>
    </header>
    <div class="about" v-if="data.meta">
      <div class="team" v-if="data.meta.employer || data.meta.client || data.meta.team">
        <div v-if="data.meta.employer">
          <h2>Employer</h2>
          <div v-html="data.meta.employer" />
        </div>
        <div v-if="data.meta.client">
          <h2>Client</h2>
          <div v-html="data.meta.client" />
        </div>
        <div v-if="data.meta.roles">
          <h2>{{ data.meta.team_label }}</h2>
          <ul class="about-list">
            <li v-for="(role, index) in data.meta.roles" :key="index" v-html="role.title" />
          </ul>
        </div>
      </div>
      <div class="skills" v-if="data.meta.skills || data.meta.tools">
        <div v-if="data.meta.skills">
          <h2>What I did</h2>
          <ul class="about-list">
            <li v-for="(skill, index) in data.meta.skills" v-html="skill.name" :key="index" />
          </ul>
        </div>
        <div v-if="data.meta.tools">
          <h2>What I used</h2>
          <ul class="about-list">
            <li v-for="(tool, index) in data.meta.tools" v-html="tool.name" :key="index" />
          </ul>
        </div>
      </div>
    </div>
    <div v-html="data.parsedContent" class="prismic-content" />
  </article>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
//import { apiEndpoint, parseResponse } from './index'

export interface ICaseStudyData {
  data: {
    headline: string;
    meta: {
      case_study_type: string;
      project_name: string;
      start_date: string;
      end_date: string;
      employer: string;
      client: string;
      team_label: string;
      roles: string;
      skills: string;
      tools: string;
    };
    hero_image: {
      url: string;
    };
    parsedContent: string;
  };
}

const parsers = {
  content (block) {
    let contentString = ''
    !!block.title1 && (contentString += PrismicDOM.RichText.asHtml(block.title1))
    !!block.lede && (contentString += `<div class="lede">${PrismicDOM.RichText.asHtml(block.lede)}</div>`)
    !!block.content && (contentString += PrismicDOM.RichText.asHtml(block.content))
    return contentString
  },
  image (block) {
//    console.log('Current image block is: ', block)
    return `
      <figure>
        <img src="${block.image.url}" alt="${block.image.alt}" />
        <figcaption>${PrismicDOM.RichText.asHtml(block.caption)}</figcaption>
      </figure>
    `
  }
}

export function parseCaseStudy (data): ICaseStudyData {
  let parsedContent = ''
  function parseDate(date) {
    const months = Object.freeze({
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    })
    date = date.split('-')
    return `${months[date[1]]} ${date[0]}`
  }
  data.body.map( slice => {
    switch(slice.slice_type) {
      case 'content_block': return parsedContent = parsedContent + parsers.content(slice.primary)
      case 'image_block': return parsedContent = parsedContent + parsers.image(slice.primary)
    }
  })
  console.log('data = ', data)
//  console.log('parsedContent = ', parsedContent)
  return {
    data: {
      headline: PrismicDOM.RichText.asText(data.headline),
      meta: {
        case_study_type: data.case_study_type,
        project_name:  data.project_name,
        start_date: parseDate(data.start_date),
        end_date: parseDate(data.end_date),
        employer: data.employer,
        client: data.client,
        team_label: data.team_label || 'Team',
        roles: data.roles,
        skills: data.skills,
        tools: data.tools
      },
      hero_image: {
        url: data.hero_image.url
      },
      parsedContent: parsedContent,
    }
  }
}

@Component({})

class CaseStudy extends Vue {

  @Prop()
  data!: ICaseStudyData

}

export default CaseStudy
</script>

<style lang="postcss" scoped>
  .header {
    background: var(--bg-blue-400);
    color: var(--white);
    margin: 0 0 3rem 0;
    overflow: hidden;
  }
  .meta {
    margin: var(--spatial-scale-2);
  }
  .title {
    color: var(--white);
    font-size: var(--type-scale-2);
    line-height: var(--spatial-scale-6);
    margin: 0 0 var(--spatial-scale-2) 0;
  }
  .projectName {
    display: inline-block;
    font-family: var(--font-heading);
    font-weight: 500;
    margin-right: var(--spatial-scale-1);
  }
  .type {
    display: inline-block;
    font-family: var(--font-heading);
    font-weight: 500;
    margin-bottom: var(--spatial-scale-00);
    opacity: .7;
  }
  .hero {
    text-align: center;
    margin: var(--spatial-scale-2);
  }
  .heroImage {
    max-width: 15em;
    width: 100%;
  }
  .about {
    color: var(--gray-400);
    font-size: var(--type-scale-0);
    line-height: var(--spatial-scale-2);
    margin: 2rem 1rem;
    & h2 {
      color: var(--gray-600);
      font-size: var(--type-scale-00);
      line-height: var(--spatial-scale-0);
      margin: var(--spatial-scale-4) 0 var(--spatial-scale-1);
      text-transform: uppercase;
    }
  }
  .about-list {
    list-style: none;
    margin: 0;
    padding: 0;
    & > li {
      display: block;
      margin: .5em 0;
      padding: 0;
    }
  }
  @media (--viewport-small) {
    .title {
      margin-right: auto;
      margin-left: auto;
      max-width: 20em;
      text-align: center;
    }
    .meta {
      text-align: center;
    }
    .about {
      display: grid;
      grid-template-columns: 6fr 4fr;
      grid-column-gap: var(--spatial-scale-2);
      max-width: 30rem;
      margin-right: auto;
      margin-left: auto;
    }
    .team, .skills {
      flex-basis: 50%;
    }
  }
  @media (--viewport-medium) {
    .header {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr 5fr 1fr;
      align-items: center;
      flex-direction: row;
      min-height: 25rem;
    }
    .title {
      font-size: calc(42rem/16);
      line-height: calc(1.275em);
      margin: 0 0 .66em 0;
      text-align: left;
    }
    .meta {
      box-sizing: border-box;
      grid-area: 1 / 2 / 2 / 3;
      margin: 0;
      padding: 0;
      text-align: left;
      width: 100%;
    }
    .projectName {
      font-size: calc(20rem/16);
    }
    .type {
      font-size: calc(20rem/16);
    }
    .dates {
      font-size: calc(18rem/16);
    }
    .hero {
      box-sizing: border-box;
      grid-area: 1 / 4 / 2 / 5;
      margin: 0;
      padding: var(--spatial-scale-5) 0;
      width: 100%;
    }
    .heroImage {
      max-width: 100%;
    }
    .about {
      font-size: var(--type-scale-1);
      line-height: var(--spatial-scale-3);
      margin-right: auto;
      margin-left: auto;
      max-width: unset;
      width: calc(100% * 8/12);
      & h2 {
        font-size: var(--type-scale-0);
      }
    }
  }
</style>
