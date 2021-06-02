Vue.component('data-error', {
    data () {
        return {
            errorMsg: "Не удалось выполнить запрос к серверу"
        }
      },
      template: `<div class="error-data">
                    <h3>{{ errorMsg }}</h3>
                </div>`

  });
