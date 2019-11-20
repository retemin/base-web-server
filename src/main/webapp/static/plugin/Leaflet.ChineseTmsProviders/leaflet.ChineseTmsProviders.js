var key = "2cf6ac4ae2437ace3e1d221a10109518";
L.TileLayer.ChinaProvider = L.TileLayer.extend({

    initialize: function(type, options) { // (type, Object)
        var providers = L.TileLayer.ChinaProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains =providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this,url,options);
    }
});

L.TileLayer.ChinaProvider.providers ={
    TianDiTu : {
        Normal: {
            Map: "http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk="+key,
            Annotion: "http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk="+key,
        },
        Satellite: {
            Map: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk="+key,
            Annotion: "http://t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk="+key
        },
        Terrain: {
            Map: "http://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk="+key,
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk="+key,
        },
        Subdomains:['0','1','2','3','4','5','6','7']
    },

    MapABC:{
        Normal:{
            Map:'http://emap{s}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}'
        },
        Subdomains:["0","1", "2", "3"]
    },
    
    GaoDe:{
        Normal:{
            Map:'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        },
        Satellite:{
            Map:'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion:'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains:["1","2","3","4"]
    },
    superMap_shanxi:{
    	Normal:{
    		Map:"http://192.168.100.210:8090/iserver/services/map-ShanXi/rest/maps/Shanxi/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256"
    	},
    	Subdomains:['0','1','2','3','4','5','6','7']
    }
};

L.tileLayer.chinaProvider= function(type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
};