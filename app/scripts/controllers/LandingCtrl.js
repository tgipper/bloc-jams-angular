(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn the Music Up!";
		
		this.updateTitle = function() {
			this.heroTitle = "New Title";
		}
	}
	
	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();