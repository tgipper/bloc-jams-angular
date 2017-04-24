(function() {
	function AlbumCtrl() {
		var albumData = angular.copy(albumPicasso);
		this.albumData = angular.copy(albumPicasso);
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();