  <template lang="pug">
.page-event
  .container.pt
    h1.dot {{ newsItem.title }}
    b: p.intro {{ newsItem.lead }}

  .hero-image(:style='{ background: "url(" + heroImage + ")" }')

  .container(v-html='newsItem.body')

  .container.pt
    .date Publicatiedatum: {{ date }}

  social-share

  send-box-with-slot(flip, :subject='"Reactie op nieuwsbericht: " + this.newsItem.title')
    h2 Vragen over dit bericht?

  simple-feed(
    title='Ook interessant',
    :items='feedItems'
    )

</template>

<script>
import Moment from 'moment'
import Slug from 'slug'

export default {
  components: {
    SendBoxWithSlot: require('src/components/SendBox/SendBoxWithSlot'),
    SimpleFeed: require('src/components/Feed/Simple'),
    SocialShare: require('src/components/SocialShare')
  },

  computed: {
    newsItem() {
      if (this.$store.state.feed.news.length === 0) return

      return this.$store.state.feed.news.find(x => x.slug === this.$route.params.name.toLowerCase())
    },

    heroImage() {
      return this.newsItem.heroImage || '/static/images/news_item_header.png'
    },

    date() {
      return Moment(this.newsItem.publish_date).format('DD MMMM YYYY')
    },

    feedItems() {
      return this.$store.getters['feed/contentTags'](this.newsItem.tags, this.newsItem.title)
    }
  },

  head: {
    title () {
      return {
        inner: this.newsItem.title
      }
    },
    meta() {
      return [
        // Google+
        { itemprop: 'name', content: this.newsItem.title },
        { itemprop: 'description', content: this.newsItem.meta_description },

        // Twitter
        { name: 'twitter:title', content: this.newsItem.title },
        { name: 'twitter:description', content: this.newsItem.meta_description },

        // Facebook
        { property: 'og:title', content: this.newsItem.title },
        { property: 'og:description', content: this.newsItem.meta_description }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.intro {
  margin-bottom: 40px;
}

.page-event {
  .image {
    width: 100%;
    height: 800px;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
  }

  .hero-image {
    height: 400px;
  }

  .feed {
    padding-top: 0;
  }
}
</style>
