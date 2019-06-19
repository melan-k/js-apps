(function() {
	'use strict';
	
	const word = 'apple';
	let location = 0;
	let score = 0;
	let miss = 0;

	const target = document.getElementById('target');
	const scoreLabel = document.getElementById('score');
	const missLabel = document.getElementById('miss');
	target.textContent = word;
	 
	window.addEventListener('keyup', e => {
		console.log(e.key);
		if (e.key === word[location]) {
			console.log(score);
			location++;
			scoreLabel.textContent = ++score;
		} else {
			console.log('miss');
			missLabel.textContent = ++miss;
		}
	});

})();