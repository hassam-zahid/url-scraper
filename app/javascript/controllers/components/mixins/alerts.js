export default {
    components: {},
    data() {
        return {
            alertMessage: '',
            alertType: '', // 'success' or 'error'
        };
    },
    methods: {
        showAlert(message, type = 'success') {
            this.alertMessage = message;
            this.alertType = type;

            setTimeout(() => {
                this.clearAlert();
            }, 3000);
        },
        clearAlert() {
            this.alertMessage = '';
            this.alertType = '';
        }
    },
    template: ``
}