import axios from 'axios'
import store from 'src/store'
import slug from 'slug'

const MARKET_SMART_INDUSTRY = 'smart-industry'
const MARKET_SMART_HEALTH = 'smart-health'
const HASHTAG_REGEX = new RegExp(/(#[a-z0-9][a-z0-9\-_]*)/ig)

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const state = {
  instagram: [],
  news: [],
  events: [],
  blog: []
}

const mutations = {
  load (state) {
    const blog = require('src/../headless/content/blog.json').map(x => {
      return Object.assign(x.content.nl, {
        feedType: 'blog',
        feedCreated: new Date(x.content.nl.publish_date),
        feedId: 'blog' + x.content.nl.title,
        slug: slug(x.content.nl.title).replace('.', '')
      })
    })

    const news = require('src/../headless/content/news.json').map(x => {
      return Object.assign(x.content.nl, {
        feedType: 'news',
        feedCreated: new Date(x.content.nl.publish_date),
        feedId: 'news' + x.content.nl.title,
        slug: slug(x.content.nl.title).replace('.', '')
      })
    })

    const events = require('src/../headless/content/events.json').map(x => {
      return Object.assign(x.content.nl, {
        feedType: 'event',
        feedCreated: new Date(x.content.nl.publish_date),
        feedId: 'event' + x.content.nl.title,
        slug: slug(x.content.nl.title).replace('.', '')
      })
    })

    state.blog = blog
    state.news = news
    state.events = events
  },

  setInstagram (state, instagram) {
    state.instagram = instagram
  }
}

const actions = {
  async load (context) {
    let instagramObject = null

    if (process.env.NODE_ENV === 'production') {
      try {
        const instagramRes = await axios.get('/proxy/instagram/innovadis/?__a=1')

        instagramObject = instagramRes.data
      } catch (error) {
        // nothing
      }
    } else {
      await timeout(500)

      instagramObject = require('src/assets/instagram.json')
    }

    if (instagramObject) {
      // Instagram API is not actually public... it works but may change without notice
      const instagram = instagramObject.graphql.user.edge_owner_to_timeline_media.edges.map(x => {
        return Object.assign(x.node, {
          feedType: 'instagram',
          feedCreated: new Date(x.node.taken_at_timestamp * 1000),
          feedId: x.node.id
        })
      })

      context.commit('setInstagram', instagram)
    }
  }
}

const getters = {
  contentAll (state) {
    const all = [].concat(state.instagram, state.news, state.events, state.blog)

    all.sort((a, b) => b.feedCreated.toISOString().localeCompare(a.feedCreated.toISOString()))

    return all
  },

  contentNone () {
    return []
  },

  /**
   * Frontpage rules:
   * - If event available, show it as first (there should never be 2 events at the same time, events are rare...)
   * - Fill with latest items, no relevancy needed
   */
  contentFrontpage (state) {
    const all = store.getters['feed/contentAll']

    // take first event, if any, and make it the first element
    if (state.events.length > 0) {
      const event = state.events[0]

      all.splice(all.findIndex(x => x.title === event.title), 1)

      all.unshift(event)
    }

    return all
  },

  /**
   * For Complex feed if Smart Health is selected
   * - show only blog with type 'smart-health'
   * - show only news/events/instagram with tag 'smart-health'
   */
  contentMarketSmartHealth (state) {
    const events = state.events.filter(x => x.tags.includes(MARKET_SMART_HEALTH))
    const news = state.news.filter(x => x.tags.includes(MARKET_SMART_HEALTH))
    const blog = state.blog.filter(x => x.blogType === MARKET_SMART_HEALTH)

    // const instagram = state.instagram.filter(x => x.caption.toLowerCase().includes('#' + MARKET_SMART_HEALTH))

    // const items = [].concat(events, news, blog, instagram)
    const items = [].concat(events, news, blog)

    return items
  },

  /**
 * For Complex feed if Smart Industry is selected
 * - show only blog with type 'smart-industry'
 * - show only news/events/instagram with tag 'smart-industry'
 */
  contentMarketSmartIndustry (state) {
    const events = state.events.filter(x => x.tags.includes(MARKET_SMART_INDUSTRY))
    const news = state.news.filter(x => x.tags.includes(MARKET_SMART_INDUSTRY))
    const blog = state.blog.filter(x => x.blogType === MARKET_SMART_INDUSTRY)

    // const instagram = state.instagram.filter(x => x.caption.toLowerCase().includes('#' + MARKET_SMART_INDUSTRY))

    // const items = [].concat(events, news, blog, instagram)
    const items = [].concat(events, news, blog)

    return items
  },

  contentBlog (state) {
    return state.blog
  },

  contentNews (state) {
    return state.news
  },

  contentEvents (state) {
    return state.events
  },

  contentInstagram (state) {
    return state.instagram
  },

  contentTagSmartHealth (state) {
    const events = state.events.filter(x => x.tags.includes(MARKET_SMART_HEALTH))
    const news = state.news.filter(x => x.tags.includes(MARKET_SMART_HEALTH))
    const blog = state.blog.filter(x => x.blogType === MARKET_SMART_HEALTH)

    const items = [].concat(events, news, blog)

    return items
  },

  contentTagSmartIndustry (state) {
    const events = state.events.filter(x => x.tags.includes(MARKET_SMART_INDUSTRY))
    const news = state.news.filter(x => x.tags.includes(MARKET_SMART_INDUSTRY))
    const blog = state.blog.filter(x => x.blogType === MARKET_SMART_INDUSTRY)

    const items = [].concat(events, news, blog)

    return items
  },

  contentTags (state) {
    const allItems = store.getters['feed/contentAll']

    const itemsWithTags = (tags, filterTitle) => {
      const items = allItems.filter(item => {
        if (item.feedType === 'instagram') {
          if (item.caption && tags.some(t => item.caption.toLowerCase().includes('#' + t.toLowerCase()))) {
            return item
          }
        } else {
          if (item.title !== filterTitle && tags.some(t => item.tags.includes(t.toLowerCase()))) return item
        }
      })

      if (items.length === 0) return allItems.filter(x => x.title !== filterTitle)

      return items
    }

    return itemsWithTags
  },

  tags (state) {
    let tags = [].concat(
      state.events.reduce((acc, val) => { return acc.concat(val.tags) }, []),
      state.blog.reduce((acc, val) => { return acc.concat(val.tags) }, []),
      state.news.reduce((acc, val) => { return acc.concat(val.tags) }, [])
    )

    for (const post of state.instagram) {
      if (post.caption) {
        const hashtags = post.caption.match(HASHTAG_REGEX)

        if (hashtags) {
          for (const tag of hashtags) {
            tags.push(tag.replace('#', '').toLowerCase())
          }
        }
      }
    }

    tags = [...new Set(tags)] // dedupe

    {
      const index = tags.findIndex(x => x === MARKET_SMART_HEALTH)
      if (index >= 0) tags.splice(index, 1)
    }

    {
      const index = tags.findIndex(x => x === MARKET_SMART_INDUSTRY)
      if (index >= 0) tags.splice(index, 1)
    }

    return tags
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
