export default {
    components: {},
    data() {
        return {}
    },
    computed: {
        requestHeaders() {
            let header =  {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').getAttribute('content')
            }
            return header;
        }
    },
    template: ``
}