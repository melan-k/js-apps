Vue.component('board-list', {
	template: '<li class="board-list"><div class="board-list__upper">名前：{{ name }}{{ date }}</div>{{ message }}</li>',
	props: ['name', 'message', 'date', 'id'],
})

Vue.component('board-form', {
	template: '<div class="form-area">名前: <input v-model="name"> </br>コメント: \
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
			this.message = ''
			this.name = ''
		}
	}
})

var board = new Vue({
	el: '#board',
	data: {
		lists: [
		]
	},
	created: function(){
		var vue = this;
		firebase.database().ref('board').on('value', function(snapshot) {
			vue.lists = snapshot.val();
		});
	},
	methods: {
		doAdd: function(name, message) {
			var now = new Date();
			firebase.database().ref('board').push({
				name: name,
				message: message,
				date: now.getMonth() + 1 + '月' + 
							now.getDate() + '日' + 
							now.getHours() + '時' + 
							now.getMinutes() + '分'
			});
		}
	}
})
