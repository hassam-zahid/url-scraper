import axios from 'redaxios';
import request from 'controllers/components/mixins/request';
import alerts from 'controllers/components/mixins/alerts';

import { useScraperStore } from 'controllers/components/scraper/store';

export default {
    name: 'Search',
    props: [],
    mixins: [request, alerts],
    data() {
        return {
            search_url: "",
            loading: false
        };
    },
    methods: {
        useScraperStoreObj() {
            return useScraperStore();
        },
        async performSearch() {
            if (!this.useScraperStoreObj().search_url) {
                this.showAlert('Enter a valid URL.', 'error');
                return;
            }

            this.loading = true;
            try {
                let headers = this.requestHeaders
                const response = await axios.post('/api/v1/scraper/search', {
                        url: this.useScraperStoreObj().search_url
                    }, 
                    {headers}
                );
                
                this.useScraperStoreObj().linksData = response.data; // Populate the linksData array
                this.useScraperStoreObj().historyData.unshift(response.data);
                this.useScraperStoreObj().isTableVisible = true;
            } catch (error) {
                console.error('Error:', error);
                this.showAlert('Failed to Fetch URLs.', 'error');
            } finally {
                this.loading = false;  // Set loading state to false once the request is complete
            }
        }
    },

    computed: {
    },
    created() {
    },
    template: `
    
    <div class="mt-20 px-4">
        <div class="max-w-lg mx-auto text-center">
            <h1 class="text-4xl font-extrabold text-gray-900 leading-tight">Effortlessly Extract Links from Any Webpage</h1>
            <p class="text-lg text-gray-600 mt-4">Enter a URL, and our tool will instantly scrape and display all the links found on that page. Save time, gather data, and explore the web with ease!</p>
        </div>
        <div class="flex items-center max-w-md mx-auto bg-white border rounded-full shadow-md mt-8">
            <div class="relative w-full">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-4.35-4.35m1.15-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                </svg>
                <input
                    v-model="useScraperStoreObj().search_url" 
                    type="text" 
                    placeholder="https://" 
                    class="w-full pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-0 focus:border-transparent border-gray-300 rounded-l-full"
                />
            </div>
            <button @click="performSearch" class="hover:fill-lightBgSecondary fill-black bg-[#c1c1c1] hover:bg-lightBgButton hover:text-white px-4 py-2 rounded-r-full transition duration-300">
                <span v-if="loading">
                    <svg class="animate-spin w-5 h-5" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"/><g id="spin_x5F_alt"><g><path d="M4.691,27.32C1.664,24.297,0,20.281,0,16C0,7.18,7.176,0,16,0l2,2l-2,2C9.383,4,4,9.383,4,16    c0,3.211,1.25,6.227,3.52,8.492l-2.457,0.32L4.691,27.32L4.691,27.32z"/><path d="M16,32l-2-1.992L16,28c6.617,0,12-5.383,12-12c0-3.203-1.25-6.219-3.523-8.488l2.461-0.324    l0.367-2.504C30.332,7.707,32,11.727,32,16C32,24.82,24.82,32,16,32L16,32z" /></g></g></svg>
                </span>
        
                <span v-else>Search</span>
            </button>
        </div>
    </div>

    <div v-if="useScraperStoreObj().isTableVisible" class="max-w-4xl mx-auto mt-8">
        <p class="text-base font-semibold mb-3 p-2">Results For: <span class="text-base font-normal">{{ useScraperStoreObj().linksData.endpoint }}</span><span title="Total Count" class="text-sm font-normal text-slate-500 ml-2">({{ useScraperStoreObj().linksData.count }})</span></p>
        <div class="w-full overflow-x-auto">
            <table class="min-w-full table-auto border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Sr.</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Text</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sub_link, index) in useScraperStoreObj().linksData.sub_links" :key="index" class="hover:bg-gray-100">
                        <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
                        <td class="px-4 py-2 text-sm">{{ sub_link.name }}</td>
                        <td class="px-4 py-2 text-sm">
                            <a :href="sub_link.endpoint" target="_blank" class="text-blue-600 hover:underline">{{ sub_link.endpoint }}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-if="alertMessage" 
        :class="{'text-green-100 bg-green-700': alertType === 'success', 'text-red-100 bg-red-700': alertType === 'error'}" 
        class="fixed bottom-3 left-1/2 -translate-x-1/2 py-2 px-10 w-[90%] md:w-fit md:max-w-lg mx-auto  z-10 rounded flex justify-between items-center transition-all duration-500 ease-in-out">
        <span>{{ alertMessage }}</span>
        <button @click="alertMessage = ''" class="text-lg font-bold ml-4">&times;</button>
    </div>
  `
};