import axios from 'redaxios';
import request from 'controllers/components/mixins/request';
import { useScraperStore } from 'controllers/components/scraper/store';


export default {
    name: 'History',
    props: [],
    mixins: [request],
    data() {
        return {
            historyData: [],
            openIndex: null,
        };
    },
    methods: {
        useScraperStoreObj() {
            return useScraperStore();
        },

        async getHistory() {
            try {
                let headers = this.requestHeaders;
                const response = await axios.get('/api/v1/scraper/history', {
                    headers,
                    // params: { query: this.search_url }
                });
        
                console.log('Response:', response.data);
                this.useScraperStoreObj().historyData = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        },

        showSubLinks(id) {
            // this.openIndex = this.openIndex === index ? null : index;
            this.useScraperStoreObj().linksData = this.useScraperStoreObj().historyData.find(item => item.id === id);
            this.useScraperStoreObj().isTableVisible =  true;
            this.useScraperStoreObj().search_url = this.useScraperStoreObj().linksData.endpoint;
            this.$emit('link-selected');
        },

        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                alert("Copied: " + text);
            } catch (err) {
                console.error("Failed to copy: ", err);
            }
        },
    },

    computed: {
        groupedHistoryData() {
            return this.useScraperStoreObj().historyData.reduce((acc, item) => {
                // Format `created_at` to a readable date (MM-DD-YYYY)
                let date = new Date(item.created_at).toLocaleDateString(undefined, {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                });
    
                // If the date doesn't exist in `acc`, create a new array for it
                if (!acc[date]) {
                    acc[date] = [];
                }
    
                // Push the item to the respective date group
                acc[date].push(item);
    
                return acc;
            }, {});
        }
    },
    created() {
        this.getHistory();
    },
    template: `
    
    <div class="p-4 sticky top-0 z-20">
        <p class="text-lg font-semibold">History</p>
        <p class="text-xs">Recent Web Scraping Results</p>
    </div>
    <div class="flex-1 overflow-auto p-3 space-y-3">
        <div v-for="(links, date) in groupedHistoryData" :key="date">
            <div class="pl-1 py-2 text-xs font-bold">{{ date }}</div>
            <div v-for="(link, index) in links" :key="index" class="py-1">
                <div class="group flex justify-between items-center cursor-pointer hover:bg-lightBgHover p-1 rounded-md" @click="showSubLinks(link.id)">
                    <p class="text-sm truncate whitespace-nowrap overflow-hidden w-full" :title="link.name">
                        {{ link.name }} 
                        <span class="text-xs text-slate-500">({{ link.count }})</span>
                    </p>
                    <button @click.stop="copyToClipboard(link.endpoint)" class="hidden group-hover:block mx-1" title="Copy Url">
                        <svg fill="none" class="w-4 h-4 hover:w-5 hover:h-5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13 6.75V2H8.75C7.50736 2 6.5 3.00736 6.5 4.25V17.25C6.5 18.4926 7.50736 19.5 8.75 19.5H17.75C18.9926 19.5 20 18.4926 20 17.25V9H15.25C14.0074 9 13 7.99264 13 6.75Z" fill="#212121"/><path d="M14.5 6.75V2.5L19.5 7.5H15.25C14.8358 7.5 14.5 7.16421 14.5 6.75Z" fill="#212121"/><path d="M5.5028 4.62701C4.62745 4.9351 4 5.76926 4 6.74997V17.2542C4 19.8775 6.12665 22.0042 8.75 22.0042H15.2444C16.224 22.0042 17.0573 21.3782 17.3663 20.5044L8.75 20.5042C6.95507 20.5042 5.5 19.0491 5.5 17.2542L5.5028 4.62701Z" fill="#212121"/></svg>
                    </button>
                    <a :href="link.endpoint" target="_blank" class="hidden group-hover:block">
                        <svg baseProfile="tiny" class="w-4 h-4 hover:w-5 hover:h-5" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.821,12.43c-0.083-0.119-2.062-2.944-4.793-4.875C15.612,6.552,13.826,6,12,6c-1.825,0-3.611,0.552-5.03,1.555  c-2.731,1.931-4.708,4.756-4.791,4.875c-0.238,0.343-0.238,0.798,0,1.141c0.083,0.119,2.06,2.944,4.791,4.875  C8.389,19.448,10.175,20,12,20c1.826,0,3.612-0.552,5.028-1.555c2.731-1.931,4.71-4.756,4.793-4.875  C22.06,13.228,22.06,12.772,21.821,12.43z M12,16.5c-1.934,0-3.5-1.57-3.5-3.5c0-1.934,1.566-3.5,3.5-3.5c1.93,0,3.5,1.566,3.5,3.5  C15.5,14.93,13.93,16.5,12,16.5z"/><g><path d="M14,13c0,1.102-0.898,2-2,2c-1.105,0-2-0.898-2-2c0-1.105,0.895-2,2-2C13.102,11,14,11.895,14,13z"/></g></svg>
                    </a>
                </div>
            </div>
        </div>    
    </div>
    <div class="p-4 sticky bottom-0 z-20">
    </div>
    `
};