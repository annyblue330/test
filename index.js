Vue.config.devtools = true
import jsonp from "jsonp";

Vue.component('image-item', {
    template: `<div class="image-item" v-bind:style="{backgroundImage: 'url('+item.thumb+')'}">
    <div class="image-name">{{ item.title }}</div>
    </div>`,
    props: {
        item: {},
        index: 0
    },
    data: function () {

    },
    created() {
        // console.log("item:" + this.item)
    }
})
var app = new Vue({
    el: "#app",
    data: {
        screenWidth: document.body.clientWidth,
        pageData: {},
        albumData: {}
    },
    created() {
        this.getJsonp();
        console.log("created~");
    },
    methods: {
        getAlbunData: function () {
            const url = "http://emma.pixnet.cc/album/elements?set_id=5681828&user=tysh310246&callback=JSON_CALLBACK";
            axios.get(url)
                .then((resp) => {
                    var data = resp.data.split('(');
                    console.log(data);
                    data = data[1].slice(0, data[1].length - 1);
                    this.pageData = JSON.parse(data);
                    this.albumData = this.pageData.elements;
                    console.log(this.albumData);    
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getJsonp: function () {
            
            let self = this;
            // var jsonp = require('jsonp');
            jsonp('http://emma.pixnet.cc/album/elements?set_id=5681828&user=tysh310246', { 
                // set_id: '5681828',
                // user: 'tysh310246',
                callback: 'JSON_CALLBACK'
             },
                function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        self.pageData = data;
                        console.log(self.pageData);
                        self.albumData = data.elements;
                        console.log(self.albumData);
                    }
                });
        }
    }
})