import { $, ajax, addtool, bufferMove } from './toolmodule.js';
class effect {
    constructor(){
        this.nav_li = $('#topbar .topbar-nav .nav_li');
        this.app = $('.app');
        this.classify_ul = $('.classify');
        this.classify = document.querySelector('#calssify')
        this.calssify_menu = $('#calssify_menu');
        this.classify_overtimer = null;
        this.classify_outtimer = null;

        this.seach_input = $('.seachwarp input');
        this.seach_list = $('.seachwarp .seach_list');
    }
    init(){
        this.popup();
        this.input();
        
    }

    popup(){
        //topbar弹出二维码
        let _this = this;
        let overtimer = null;
        let outtimer = null;
        this.nav_li.onmouseenter = function(){
            let num = 0;
            clearInterval(overtimer);
            overtimer = setInterval(function(){
                num += 10;
                _this.app.style.height = num+'px';
                if(num>=120){
                    clearInterval(overtimer);
                }
            },1000/60)
        }
        this.nav_li.onmouseleave = function(){
            let num = 120;
            clearInterval(outtimer);
            outtimer = setInterval(function(){
                num -= 10;
                _this.app.style.height = num+'px';
                if(num<=0){
                    clearInterval(outtimer);
                }
            },1000/60)
        }
        
        //商品分类弹出框
        //鼠标移入
        this.classify_ul.onmouseenter = function(){
            _this.classify.style.display= 'block';
            let num = 0;
            clearInterval(_this.classify_overtimer);
            _this.classify_overtimer = setInterval(() => {
                if(num>=200){
                    clearInterval(_this.classify_overtimer);
                }
                num+=14;
                _this.classify.style.height = num + 'px';
            }, 1000/60);
            
        }
        //鼠标移出
        this.classify_ul.onmouseleave = function(ev){
            let num = 200;
            clearInterval(_this.classify_outtimer);
            _this.classify_outtimer = setInterval(() => {
                num-=14;
                _this.classify.style.height = num + 'px';
                if(num<=0){
                    clearInterval(_this.classify_outtimer);
                    _this.classify.style.display= 'none';
                }
            }, 1000/60);
        }
    }

    input(){
        function fn(data){
            let str = '';
            for(let value of data.result){
                str+=`
                    <li>
                        <a href="#">${value[0]}<a>
                    </li>
                `;
            }
            this.seach_list.innerHTML=str;
        }
        this.seach_input.oninput = function(fn){
            let csc = document.createElement('script');
            csc.src=`https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1574921437486_791&callback=${fn}&k=1&area=c2c&bucketid=2`;
            document.body.appendChild(csc);
        }
    }



}

export {
    effect
}