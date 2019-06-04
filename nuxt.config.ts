import { blogDataMock } from './dataMocks'
const Prismic = require('prismic-javascript')
const PrismicDOM = require('prismic-dom')
require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Distantly Yours',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Product Design, UX Design, and Design Consulting in Seattle, WA' },
      { name: 'application-name', content: 'Distantly Yours' },
      { name: 'theme-color', content: '#197FA1' },
      { name: 'msapplication-navbutton-color', content: '#03a1d5'},
      { name: 'apple-mobile-web-app-status-bar-style', content: '#197FA1'}
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=wAO9R4Y0rn' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=wAO9R4Y0rn' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=wAO9R4Y0rn' },
      { rel: 'manifest', href:'/site.webmanifest?v=YAmWaLEo7o' },
      { rel: 'mask-icon', href:'/safari-pinned-tab.svg?v=wAO9R4Y0rn', color: '#5bbad5' },
      { rel: 'shortcut icon', href:'/favicon.ico?v=wAO9R4Y0rn', color: '#5bbad5' },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/czd3cnh.css'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'rgba(3, 161, 213, .3)' },
  modules: [
    ['@nuxtjs/google-tag-manager', { id: process.env.NUXT_ENV_GTM_ID }],
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-media': {},
        'postcss-nesting': {},
      }
    }
  },
  css: ['~/assets/html.css'],
  generate: {
    routes: async function () {
      const paths = Object.freeze ({
        blog: '/blog',
        blog_item: (slug: string) => '/blog/' + slug,
        portfolio: '/portfolio',
        portfolio_item: (slug: string) => '/portfolio/' + slug,
        portfolio_all: '/portfolio/all-projects',
        portfolio_all_item: (slug: string) => '/portfolio/all-projects/' + slug,
        styleguide: '/styleguide',
      })
      const apiUrl = 'https://distantly-yours-blog.cdn.prismic.io/api/v2'
      const blogQuery = await Prismic.getApi(apiUrl)
        .then( api =>  {
          return api.query(
            Prismic.Predicates.at('document.type', 'blog_post'), { orderings: '[my.blog_post.date desc]' }
          )
        })
        .catch(err => {
          console.warn('Hey, something happened to the network.', err)
          console.log('Using datamocks for blog posts: ', blogDataMock)
          // If we’re in dev mode, return a data mock. Otherwise, return null and force an error.
          return process.env.NODE_ENV === 'development' ? { blogDataMock } : { results: [] }
        })
      console.log('blogQuery = ', blogQuery)
      const portfolioQuery = await Prismic.getApi(apiUrl)
        .then( api => { 
          return api.query(
            Prismic.Predicates.at('document.type', 'case_study'), null 
          )
        }).catch(err => {
          console.warn('Hey, something happened to the network.', err)
          // If we’re in dev mode, return a data mock. Otherwise, return null and force an error.
          return process.env.NODE_ENV === 'development' ? { results: [] } : null
        })
      console.log('portfolioQuery = ', portfolioQuery)
      const routesList = [
        {
          route: paths.blog,
          payload: blogQuery.results.map((result) => {
            const { data } = result
            return {
              title: PrismicDOM.RichText.asText(data.title),
              content: PrismicDOM.RichText.asHtml(data.body),
              preview: PrismicDOM.RichText.asHtml(data.preview),
              slug: result.uid,
              url: paths.blog_item(result.uid),
              cta: data.cta,
              indexBgColor: data.index_page_background_color,
            }
          })
        },
        /*
        {
          route: paths.portfolio_all,
          payload: portfolioQuery.results.map(result => {
            return {
              data: result.data,
              slug: result.uid,
              url: paths.portfolio_all_item(result.uid)
            }
          })
        },
        {
          route: '/work',
          redirect: paths.portfolio_all
        }
        */
      ]
      blogQuery.results.map( result => {
        console.log('blog post: ', result)
        const { data } = result
        routesList.push({
          route: paths.blog_item(result.uid),
          payload: {
            title: PrismicDOM.RichText.asText(data.title),
            subhead: PrismicDOM.RichText.asText(data.subhead),
            content: PrismicDOM.RichText.asHtml(data.body),
            slug: result.uid,
            url: '/blog/' + result.uid,
            heroImage: data.hero_image,
            heroBackground: data.hero_background,
          }
        })
      })
      portfolioQuery.results.map( result => {
        console.log('case study: ', result)
        routesList.push({
          route: paths.portfolio_item(result.uid),
          payload: {
            data: result.data
          }
        })
        /*
        routesList.push({
          route: paths.portfolio_all_item(result.uid),
          payload: {
            data: result.data
          }
        })
        */
      })
      console.log('routesList = ', routesList)
      return routesList
    }
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active'
  }
}
