import {defineStore} from 'pinia'

export const useScraperStore = defineStore('scraper_store', {
    state: () => {
        return {
            historyData: [],
            isTableVisible: false,
            linksData: {},
            search_url: ""
        }
    },

    actions: {
       
    },
})