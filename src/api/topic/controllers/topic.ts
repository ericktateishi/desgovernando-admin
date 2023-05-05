/**
 * topic controller
 */

import { factories } from '@strapi/strapi'

const SUGGESTION_LIMIT = 3

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default factories.createCoreController('api::topic.topic', ({ strapi }) =>  ({
  async suggestion(ctx) {
    try {
      const ID = ctx.params.id

      if (!ID) return ctx.body = []
      
      const topic = await strapi.entityService.findOne('api::topic.topic', ID, {
        fields: ['category'],
        populate: { series: true }
      })

      if (!topic?.id) return ctx.body = []

      const ids = await strapi.entityService.findMany('api::topic.topic', {
        fields: ['id'],
        filters: { category: topic.category, series: topic?.series?.id || null },
        publicationState: 'live',
        sort: { createdAt: 'DESC' },
        limit: 50
      })

      const to_filter = shuffle((ids || []).map(({ id }) => id).filter(id => id !== parseInt(ID)))

      if (to_filter?.length < (SUGGESTION_LIMIT + 1)) {
        const lastest_ids = await strapi.entityService.findMany('api::topic.topic', {
          fields: ['id'],
          filters: {
            id: {
              $notIn: [...to_filter, parseInt(ID)]
            }
          },
          publicationState: 'live',
          sort: { createdAt: 'DESC' },
          limit: SUGGESTION_LIMIT
        })
        to_filter.push(...(lastest_ids || []).map(({ id }) => id))
      }

      const items = await strapi.entityService.findMany('api::topic.topic', {
        filters: {
          id: to_filter.slice(0, SUGGESTION_LIMIT)
        },
        publicationState: 'live',
        populate: { series: true }
      })
      
      return ctx.body = items
    } catch (err) {
      ctx.body = err;
    }
  },
}));
