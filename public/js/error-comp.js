Vue.component('data-error', {
    data () {
        return {
            errorMsg: ''
            // errorMsg: "Не удалось выполнить запрос к серверу!"
        }
      },
      template: `<div class="error-data" v-if="errorMsg">
                    <h3>
                    <button class="close-btn" @click="setText('')">&times;</button>
                    {{errorMsg}}</h3>
                </div>`

  });
