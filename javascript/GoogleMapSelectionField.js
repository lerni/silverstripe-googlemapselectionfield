$(document).ready(function() {
	
	// default values
	var map = new GMap2(document.getElementById("map_$Name"));
	var center = new GLatLng($DefaultLat, $DefaultLon);
	var geocoder = new GClientGeocoder();
	var marker = new GMarker(center, {draggable: true});

	map.setCenter(center, $Zoom);
	map.addOverlay(marker);
	map.addControl(new GMenuMapTypeControl());
	map.addControl(new GSmallZoomControl3D());

	GEvent.addListener(marker, "dragend", function(overlay, point) {
		var point = marker.getLatLng();
		map.setCenter(point);
		geocoder.getLocations(new GLatLng(point.y, point.x), function(response) {
			if(response.Status.code == 200) {
				$("input[name=$Name]").val(response.Placemark[0].address);
				var link = "http://maps.google.com/?ll=" + point.toUrlValue() +"&q="+ point.toUrlValue() +"&z="+ map.getZoom();
				$("input[name=$Name_MapURL]").val("<a href=" + link +">"+ link +"</a>");
			}
		});
	});

	$("input[name=$Name]").focus(function() {
		if($(this).val() == $(this).attr("value")) {
			$(this).val("");	
		}
	});
	$("input.googleMapAddressSubmit").click(function() {
		var address = $("input.googleMapAddressField").val();
	 	geocoder.getLatLng(
	 		address,
	 		function(point) {
	 			if (!point) {
	 				alert(address + " not found");
	 			} else {
	 				map.setCenter(point,16);
	 				marker.setPoint(point);
	 			}
	 		}
		);
		return false;
	});
});