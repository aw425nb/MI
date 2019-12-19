import { $, ajax, addtool, bufferMove,siblings} from './toolmodule.js';
class effect {
    constructor(){
        this.nav_li = $('#topbar .topbar-nav .nav_li');
        this.app = $('.app');
        this.classify_ul = $('.classify');
        this.classify = document.querySelector('#calssify');
        this.calssify_menu = $('#calssify_menu');
        this.classify_overtimer = null;
        this.classify_outtimer = null;

        this.seach_input = $('.seachwarp input');
        this.seach_list = $('.seachwarp .seach_list');
        this.seach_seach_border = $('.seachwarp .seach');
        this.seach_btn_border= $('.seachwarp .seach_btn');
        this.seac_a_l = $('.seach_a_l');
        this.seac_a_r = $('.seach_a_r');

        this.logo = $('#header .logo');
        this.logo_warp = $('#header .logo .imgwarp');
        
        this.banner_warp = $('#banner');
        this.banner_left = $('#banner .banner_left');
        this.banner_right = $('#banner .banner_right');

        this.lubo_img = $('.lubo_img')
        this.slideshow_img = $('#banner .lb_img','all');
        this.slideshow_li = $('#lunbo li','all');
        this.left_btn = $('#left_arrow');
        this.right_btn = $('#right_arrow');

        this.flash_h_m_s = $('.countdown span','all')
        this.flash_left = $('.fla_header .left');
        this.flash_right = $('.fla_header .right');
        this.flash_ul = $('.list_warp .flash_list');

        this.as_hot = $('#hot span','all');
        this.as_main_o = $('.main_r_o');
        this.as_main_t = $('.main_r_t');

        this.tool_bar = $('#tool');
        this.gotop = $('.gotop');

        // this.banner_1 = $('.banner1 img');
        
    }
    init(){
        
        this.popup();
        this.input();
        this.logomove();
        this.banner();
        this.slideshow();
        this.flashsale();
        this.tab();
        this.appliances_tab();
        this.tool();
        // this.lazy();
    }
    //弹出事件
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
    //搜索框获得焦点事件
    input(){
        let _this = this;
        this.seach_input.onfocus = function(){
            _this.seach_seach_border.style.border = "1px solid #ff6700";
            _this.seach_btn_border.style.border = "1px solid #ff6700";
            _this.seach_btn_border.style.borderLeft = 0;
            _this.seac_a_l.style.display = 'none';
            _this.seac_a_r.style.display = 'none';
            _this.seach_list.style.display = 'block';
            ajax({
                url: 'http://10.31.161.199/MI/php/index_render.php',
                type: 'post',
                dataType: 'json'
            }).then(data=>{
                let seach_str = '';
                for( let i=0;i<10;i++){
                    seach_str += `
                        <li>${data[i].title}</li>
                    `;
                }
                _this.seach_list.innerHTML = seach_str;
                let seach_li = $('.seach_list li','all');
                for( let i=0;i<seach_li.length;i++){
                    seach_li[i].onmouseover = function(){
                        _this.seach_input.value = seach_li[i].innerHTML;
                        _this.seac_a_l.style.display = 'none';
                        _this.seac_a_r.style.display = 'none';
                        
                    }
                }
            })
        }
        this.seach_input.onblur = function(){
            _this.seach_seach_border.style.border = "1px solid #e0e0e0";
            _this.seach_btn_border.style.border = "1px solid #e0e0e0";
            _this.seach_btn_border.style.borderLeft = 0;
            _this.seach_list.style.display = 'none';
            if(_this.seach_input.value==''){
                _this.seac_a_l.style.display = 'block';
                _this.seac_a_r.style.display = 'block';
            }
        }
        
    }
    //logo移入移出事件
    logomove(){
        let _this = this;
        this.logo.onmouseover = function(){
            bufferMove(_this.logo_warp,{left:0});
        }
        this.logo.onmouseout = function(){
            bufferMove(_this.logo_warp,{left:-55});
        }
    }
    //banner模块弹出事件
    banner(){
        let _this = this;
        this.banner_left.onmouseenter = ()=>{
            _this.banner_right.style.display = 'flex';
        }
        this.banner_left.onmouseleave = ()=>{
            _this.banner_right.style.display = 'none';
        }
    }
    //轮播图
    slideshow(){
        let _this = this;
        let index = 0;
        let timer_tab = null;
        this.slideshow_img[0].style.opacity = '1';
        this.slideshow_li[0].style.backgroundColor = '#fff';
        
        function tab(index){
            let arr_li = siblings(_this.slideshow_li[index]);
            for(let i=0;i<arr_li.length;i++){
                arr_li[i].style.backgroundColor = '#ccc';
            }
            bufferMove(_this.slideshow_img[index],{'opacity':'100'})
            _this.slideshow_li[index].style.backgroundColor = '#fff';
        }
        
        this.right_btn.onclick= function(){
            bufferMove(_this.slideshow_img[index],{'opacity':'0'})
            index++;
            if(index>= _this.slideshow_img.length){
                index = 0;
            }
            tab(index);
        }
        this.left_btn.onclick= function(){
            bufferMove(_this.slideshow_img[index],{'opacity':'0'})
            index--;
            if(index<0){
                index =  _this.slideshow_img.length-1;
            }
            tab(index);
        }
        timer_tab = setInterval(() => {
            bufferMove(_this.slideshow_img[index],{'opacity':'0'})
            index++;
            if(index>= _this.slideshow_img.length){
                index = 0;
            }
            tab(index);
        }, 1000);

        
            this.banner_warp.onmouseenter = function(){
                clearInterval(timer_tab);
            }
            this.banner_warp.onmouseleave = function(){
                clearInterval(timer_tab)
                timer_tab = setInterval(() => {
                    bufferMove(_this.slideshow_img[index],{'opacity':'0'})
                    index++;
                    if(index>= _this.slideshow_img.length){
                        index = 0;
                    }
                    tab(index);
                }, 1000);
            }
        

        for(let i=0;i<this.slideshow_li.length;i++){
            this.slideshow_li[i].onmouseenter = function(){
                
                this.style.backgroundColor = '#fff';
            }
            this.slideshow_li[i].onmouseleave = function(){
                this.style.backgroundColor = '#ccc';
            }

        
        }






    }
    //倒计时
    flashsale(){    
        function num (num){
            let str = num+'';
            if(str.length==2){
                return str
            }else{
                return 0+str;
            }
        }
        let time_timer = null;
        let _this = this;
        time_timer = setInterval(() => {
            let date = new Date();
            let hours = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds()
            _this.flash_h_m_s[0].innerHTML = num(hours);
            _this.flash_h_m_s[1].innerHTML = num(min);
            _this.flash_h_m_s[2].innerHTML = num(sec);
        }, 1000);
    }
    //小米闪购切换
    tab(){
        let _this = this;
        this.flash_right.onclick = function(){
            bufferMove(_this.flash_ul,{left:'-978'});
            this.style.color = '#ccc';
            _this.flash_left.style.color = "#333"
        }
        this.flash_left.onclick = function(){
            bufferMove(_this.flash_ul,{left:'0'});
            this.style.color = '#ccc';
            _this.flash_right.style.color = "#333"
        }
    }
    //家电Tab切换
    appliances_tab(){
        
        let _this = this;
        this.as_main_t.style.display = 'none';
        this.as_hot[0].onmouseover = function(){
            _this.as_main_o.style.display = 'flex';
             _this.as_main_t.style.display = 'none';
            this.style.borderBottom = '2px solid #ff6700';
            _this.as_hot[1].style.borderBottom = 0;
        }

        this.as_hot[1].onmouseover = function(){
            _this.as_main_t.style.display = 'flex';
             _this.as_main_o.style.display = 'none';
            this.style.borderBottom = '2px solid #ff6700';
            _this.as_hot[0].style.borderBottom = 0;
        }
    }
    //右侧工具栏
    tool(){
        let _this = this;
        document.onscroll = function(){
            let scrotop = document.documentElement.scrollTop;
            if(scrotop>400){
                _this.gotop.style.display = 'block';
            }else{
                _this.gotop.style.display = 'none';
            }
        }

        this.gotop.onclick = function(){
            document.documentElement.scrollTop = 0;
        }
    }
    //懒加载
    lazy(){
        let _this = this;
        let banner_1 = document.querySelector('.banner1 img');
        document.onscroll = function(){
            let scrotop = document.documentElement.scrollTop;
            console.log(banner_1)
            if(scrotop>400){
                console.log(banner_1.getAttribute(data_src));
            }
        }
    }
}

export {
    effect
}