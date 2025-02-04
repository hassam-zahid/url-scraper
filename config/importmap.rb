# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin 'vue', to: 'https://ga.jspm.io/npm:vue@3.3.13/dist/vue.esm-browser.prod.js'
pin 'redaxios', to: 'https://ga.jspm.io/npm:redaxios@0.5.1/dist/redaxios.module.js'
pin 'pinia', to: 'https://ga.jspm.io/npm:pinia@2.1.7/dist/pinia.mjs'
pin '@vue/devtools-api', to: 'https://ga.jspm.io/npm:@vue/devtools-api@6.5.1/lib/esm/index.js'
pin 'vue-demi', to: 'https://ga.jspm.io/npm:vue-demi@0.14.6/lib/index.mjs'
