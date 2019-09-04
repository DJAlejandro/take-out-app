const ALL = 2

export default {
    data() {
        return {
            hideEmpty: false,
            isActive: ALL
        }
    },
    computed: {

    },

    methods: {
        showItem(item) {
            if (this.hideEmpty && item.text.length == 0) {
                return false;
            }
            if (this.isActive === ALL) {
                return true;
            } else {
                return item.rateType === this.isActive;
            }
        }
    }
}
