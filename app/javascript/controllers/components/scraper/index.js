import Search from "controllers/components/scraper/search"
import History from "controllers/components/scraper/history"
export default {
    name: 'ScraperIndex',
    props: [],
    components: {Search, History},
    data() {
        return {
        };
    },
    methods: {
    },

    computed: {
    },
    created() {
    },
    template: `
    <div class="flex">
        <div class="fixed top-0 w-80 bg-lightBgSecondary pr-2 h-screen flex flex-col">
            <History></History>
        </div>
        <div class="w-full ml-80 overflow-y-auto">
            <div class="mt-4 ml-4 text-xl font-bold">
                URLs Scraper
            </div>
            <Search></Search>
        </div>
    </div>
    `
};