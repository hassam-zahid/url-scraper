// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import * as Vue from "vue"
import { createPinia } from 'pinia'
const pinia = createPinia();
import ScrapperIndex from "controllers/components/scraper"

const point = "#vue-app"
document.addEventListener("turbo:load", function () {
        const element = document.querySelector(point)
        if (element !== null) {
            const app = Vue.createApp({
                data() {
                    return {count: 1}
                }
            })
            app.use(pinia)
            app.component('scraper-index', ScrapperIndex)
            app.mount(point)
        }
    }
)