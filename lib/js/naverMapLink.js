




function callNaverMapLink () {
console.log('callNaverMapLink');

    if (mapLoaded == false) {
        loadNaverMap();
    } else {
        mapContainer.style.visibility = "visible";
        naverLocationLabel.setVisible(true, naverMapMarker);
        targetList.push(bg);
        status = statusType.mapOpen;
    }
}

function loadNaverMap() {
    mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'map');
    mapContainer.setAttribute('style', 'border:1px solid #000; position:absolute; left:200px; top:100px;');
    container.appendChild(mapContainer);

    processNaverMapApi();

    targetList.push(bg);  //map disappears when the user touches the background
    status = statusType.mapOpen;    
    mapLoaded = true;
}

function processNaverMapApi() {
    //LatLng coord can be found as a parameter to GET request in naver maps. LatLng(y, x);
    var oPoint = new nhn.api.map.LatLng(37.5182257, 126.9851763);
    var oMap = new nhn.api.map.Map(document.getElementById('map'), { 
                    point : oPoint,
                    zoom : 11,
                    enableWheelZoom : true,
                    enableDragPan : true,
                    enableDblClickZoom : true,
                    mapMode : 0,
                    activateTrafficMap : false,
                    activateBicycleMap : false,
                    activateRealtyMap : true,
                    minMaxLevel : [ 1, 14 ],
                    size : new nhn.api.map.Size(400, 400)           
                });

    // 줌 컨트롤러
    var oSlider = new nhn.api.map.ZoomControl();
    oMap.addControl(oSlider);
    oSlider.setPosition({ top:15, left:15 });

    // 아래는 위에서 지정한 좌표에 마커를 표시하는 소스 입니다.
    var oSize = new nhn.api.map.Size(28, 37);
    var oOffset = new nhn.api.map.Size(14, 37);
    var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);

    // //icon 이미지를 바꿔서 사용할 수 있습니다.
    naverMapMarker = new nhn.api.map.Marker(oIcon, { title : '온누리교회' }); 
    naverMapMarker.setPoint(oPoint);
    oMap.addOverlay(naverMapMarker);

    // // 마커라벨 표시
    naverLocationLabel = new nhn.api.map.MarkerLabel(); // 마커 라벨 선언
    oMap.addOverlay(naverLocationLabel);// 마커 라벨 지도에 추가. 기본은 라벨이 보이지 않는 상태로 추가됨
    naverLocationLabel.setVisible(true, naverMapMarker);// 마커 라벨 보이기
}


function removeNaverMapLink() {
console.log('removeNaverMapLink');

    mapContainer.style.visibility = "hidden";
    naverLocationLabel.setVisible(false, naverMapMarker);
    removeBgFromTouchableTargetList();

    status = statusType.normal;
}

function removeBgFromTouchableTargetList() {
    var index = targetList.indexOf(bg);
    
    if (index > -1) {
        targetList.splice(index, 1);
    }
}