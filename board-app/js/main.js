Vue.component('board-list', {
	template: '<li>{{ name }} {{ date }}</br> {{ message }}</li>',
	props: ['name', 'message', 'date']
})

Vue.component('board-form', {
	template: '<div class="form-area">名前: <input v-model:"name"> </br>コメント:\
	<textarea v-model="message"></textarea> </br><button @click="doAdd">書き込む</button></div>',
	data: function() {
		return {
			message: '',
			name: ''
		}
	},
	methods: {
		doAdd: function() {
			this.$emit('input', this.name, this.message)
		}
	}
})

var board = new Vue({
	el: 'board',
	data: {
		name: '',
		message: '',
		date: '',
		lists: [

		]
	},
	methods: {
		doAdd: function(name, message) {
			var now = new Date();
			this.lists.push({
				name: name,
				message: message,
				date: now.getMonth() + 1 + '月' + 
							now.getDate() + '日' + 
							now.getHours() + '時' + 
							now.getMinutes() + '分'
			})
		}
	}
})
