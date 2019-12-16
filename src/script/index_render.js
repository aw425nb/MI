import {$,ajax,addtool,bufferMove} from './toolmodule.js';
class render {
    constructor(){
        this.lunbo_img = $('.lb_img','all');
        this.homr_mg = $('.home_r img','all');
    }
    init(){
        let _this = this;
        
        ajax({
            url: 'http://10.31.161.199/MI/php/index_render.php',
            type: 'post',
            dataType: 'json'
        }).then(function(data){
            console.log(data)
            //轮播图图片加载
            for(let i=0;i<_this.lunbo_img.length;i++){
                _this.lunbo_img[i].src = data[8+i].url;
            }
            //homer图片加载
            for(let i=0;i<_this.homr_mg.length;i++){
                _this.homr_mg[i].src = data[13+i].url;
            }
        })
    }
}
export{
    render
}