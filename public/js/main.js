const app = new Vue({
    el: '#app',
    methods: {
        getFile(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },

        postFile(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },

        putFile(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },

        delFile(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(result => result.json())
            .catch(error => this.$refs.error.setText(error))
        },
    },
});
            