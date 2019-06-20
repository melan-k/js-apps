(function() {
	'use strict';
	
	const words = [
		'apple',
		'sky',
		'blue',
		'middle',
		'set',
	];

	let word = getRandomWord();
	let location = 0;
	let score = 0;
	let miss = 0;
	const timeLimit = 3 * 1000;
	let startTime;

	const target = document.getElementById('target');
	const scoreLabel = document.getElementById('score');
	const missLabel = document.getElementById('miss');
	const timerLabel = document.getElementById('timer');

	function updateTarget() {
		let placeholder = '';
		for (let i=0; i<location; i++) {
			placeholder += '_';
		}
		target.textContent = placeholder + word.substring(location);
	}

	function getRandomWord() {
		return words[Math.floor(Math.random() * words.length)];
	}

	function updateTimer() {
		const timeLeft = startTime + timeLimit - Date.now();
		timerLabel.textContent = (timeLeft / 1000).toFixed(2);

		const timerId =setTimeout(() => {
			updateTimer();
		}, 10);

		if (timeLeft < 0) {
			clearTimeout(timerId);
			timerLabel.textContent = 'finished';
			window.alert('Game over!');
		}
	}

	window.addEventListener('click', () => {
		updateTarget();
		startTime = Date.now();
		updateTimer();
	});
	 
	window.addEventListener('keyup', e => {
		console.log(e.key);
		if (e.key === word[location]) {
			console.log(score);
			location++;
			if (location == word.length) {
				let rw = word;
				while(rw === word) {
					rw = getRandomWord();
				}
				word = rw;
				location = 0;
			}
			scoreLabel.textContent = ++score;
			updateTarget();
		} else {
			console.log('miss');
			missLabel.textContent = ++miss;
		}
	});

})();