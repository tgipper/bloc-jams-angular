(function() {
	function albumCtrl() {
		this.albumData = [];
		this.albumData.push(angular.copy(albumPicasso));
	}
	
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();