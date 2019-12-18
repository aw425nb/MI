import { $, ajax, addtool, bufferMove,siblings} from './toolmodule.js';
class render {
    constructor() {
        this.lunbo_img = $('.lb_img', 'all');//轮播图图片
        this.homr_mg = $('.home_r img', 'all');//home图片
        //商品分类弹出层图片加载
        this.calssify_menu = $('#calssify_menu');
        //小米闪购
        this.flashsale_ul = $('.list_warp .flash_list');
        //banner1
        this.banner1_img = $('.banner1 img');
        //手机
        this.tell_main = $('.sec_tell .main_l');
        this.tell_ul = $('.sec_tell .main_r');
        //家电
        this.appliances_bn = $('.sec_appliances .main .banner');
        this.main_r_o = $('.main_r_o');
        this.main_r_t = $('.main_r_t');
        //banner弹出框
        this.bn_o = $('.bn_o');
        this.bn_t = $('.bn_t');
        this.bn_s = $('.bn_s');
        this.bn_f = $('.bn_f');
    }
    init() {
        let _this = this;
        ajax({
            url: 'http://10.31.161.199/MI/php/index_render.php',
            type: 'post',
            dataType: 'json'
        }).then(function (data) {
            //轮播图图片加载
            for (let i = 0; i < _this.lunbo_img.length; i++) {
                _this.lunbo_img[i].src = data[8 + i].url;
                _this.lunbo_img[i].sid = data[8 + i].sid
            }
            //homer图片加载
            for (let i = 0; i < _this.homr_mg.length; i++) {
                _this.homr_mg[i].src = data[13 + i].url;
                _this.homr_mg[i].sid = data[13 + i].sid;
            }
            //弹出层图片加载
            let calssify_str = '';
            for (let i = 0; i < 4; i++) {
                calssify_str += `
                    <li>
                        <a href="./details.html?sid=${data[i].sid}">
                            <img src="${data[i].url}" alt="">
                            <p>${data[i].title}</p>
                            <span>${data[i].price}元起</span>
                        </a>
                    </li>
                    <div class="line"></div>
                `;
            }
            calssify_str += `
                <li>
                    
                    <a style="width:172px" href="./details.html?sid=${data[4].sid}">
                        <img src="${data[4].url}" alt="">
                        <p>${data[4].title}</p>
                        <span>${data[4].price}元起</span>
                    </a>
                </li>
            `;
            _this.calssify_menu.innerHTML = calssify_str;
            //手机左边广告图片加载
            let main_str = `
            <a href="./details.html?&sid=${data[17].sid}" class="banner">
                <img src="${data[17].url}"alt="">
            </a>
            `;
            _this.tell_main.innerHTML = main_str + _this.tell_main.innerHTML;

            //家电左边广告图片加载
            let appliances_bn_str = `
                <a href="./details.html?sid=${data[18].sid}" class="banner_top">
                    <img src="${data[18].url}" alt="">
                </a>
                <a href="./details.html?sid=${data[19].sid}" class="banndr_bot">
                    <img src="${data[19].url}" alt="">
                </a>
            `;
            _this.appliances_bn.innerHTML = appliances_bn_str;

            //banner弹出框图片加载
            let bn_o_str = '';
            for(let i=0; i<6;i++){
                bn_o_str+=`
                <li>
                    <a href="./details.html?sid=${data[i].sid}">
                        <img src="${data[i].url}" alt="">
                        <span>${data[i].title}</span>
                    </a>
                </li>
                `;
            }
            _this.bn_o.innerHTML = bn_o_str;

            let bn_t_str = '';
            for(let i=6; i<12;i++){
                bn_t_str+=`
                <li>
                    <a href="./details.html?sid=${data[i].sid}">
                        <img src="${data[i].url}" alt="">
                        <span>${data[i].title}</span>
                    </a>
                </li>
                `;
            }
            _this.bn_t.innerHTML = bn_t_str;

            let bn_s_str = '';
            for(let i=12; i<18;i++){
                bn_s_str+=`
                <li>
                    <a href="./details.html?sid=${data[i].sid}">
                        <img src="${data[i].url}" alt="">
                        <span>${data[i].title}</span>
                    </a>
                </li>
                `;
            }
            _this.bn_s.innerHTML = bn_s_str;

            let bn_f_str = '';
            for(let i=18; i<24;i++){
                bn_f_str+=`
                <li>
                    <a href="./details.html?sid=${data[i].sid}">
                        <img src="${data[i].url}" alt="">
                        <span>${data[i].title}</span>
                    </a>
                </li>
                `;
            }
            _this.bn_f.innerHTML = bn_f_str;
            

        })
        document.onscroll = function () {
            let scrolltop = document.documentElement.scrollTop;
            // console.log(scrolltop)
            if (scrolltop > 200 && scrolltop < 800) {
                _this.flashsale()
            } else if (scrolltop > 800) {
                _this.tell()
                _this.appliances()
            }

        }
    }
    // 倒计时和banner1图片加载
    flashsale() {
        let _this = this;
        ajax({
            url: 'http://10.31.161.199/MI/php/index_render.php',
            type: 'post',
            dataType: 'json'
        }).then(data => {
            let flashsale_str = '';
            for (let i = 0; i < 8; i++) {
                flashsale_str += `
                    <li class="li1">
                        <a href="./details.html?sid=${data[i].sid}" id="template">
                            <img src="${data[i].url}" alt="">
                            <h3>${data[i].title}</h3>
                            <h4></h4>
                            <p class="price">
                                <span class="num">${data[i].price}</span>
                                元<span>起</span>
                            </p>
                        </a>
                    </li>
                `;
            }
            _this.flashsale_ul.innerHTML = flashsale_str;
            _this.banner1_img.src = data[16].url;
            _this.banner1_img.sid = data[16].sid;

        })
    }
    //手机和banner2图片加载
    tell() {
        let _this = this;
        ajax({
            url: 'http://10.31.161.199/MI/php/index_render.php',
            type: 'post',
            dataType: 'json'
        }).then(data => {

            let tell_str = '';
            for (let i = 0; i < 7; i++) {
                tell_str += `
                <li>
                    <a href="./details.html?sid=${data[0].sid}" id="template">
                        <img src="${data[0].url}"alt="">
                        <h3>${data[0].title}</h3>
                        <h4></h4>
                        <p class="price">
                            <span class="num">${data[0].price}</span>
                            元<span>起</span>
                        </p>
                    </a>
                </li>
                `;
            }
            tell_str += `
            <li id="hover">
                <a href="./details.html?sid=${data[0].sid}" id="template">
                    <img src="${data[0].url}"alt="">
                    <h3>${data[0].title}</h3>
                    <h4></h4>
                    <p class="price">
                        <span class="num">${data[0].price}</span>
                        元<span>起</span>
                    </p>
                </a>
            </li>
            `;
            _this.tell_ul.innerHTML = tell_str;
        })
    }
    //家电图片加载
    appliances() {
        let _this = this;
        ajax({
            url: 'http://10.31.161.199/MI/php/index_render.php',
            type: 'post',
            dataType: 'json'
        }).then(data => {
            let o_str = '';
            for (let i = 0; i < 7; i++) {
                o_str += `
                    <li>
                        <a href="./details.html?sid=${data[2].sid}" id="template">
                            <img src="${data[2].url}"alt="">
                            <h3>${data[2].title}</h3>
                            <h4></h4>
                            <p class="price">
                                <span class="num">${data[2].price}</span>
                                元<span>起</span>
                            </p>
                        </a>
                    </li>
                `;
            }
            o_str += `
            <li>
                <div class="li_top">
                    <a href="./details.html?sid=${data[20].sid}">
                        <img src="${data[20].url}" alt="">
                        <h3 class="title">${data[20].title}</h3>
                        <p class="price">
                            <span class="num">${data[20].price}</span>
                            <span>元起</span>
                        </p>
                    </a>
                </div>
                <div id="li_bot">
                    <a href="">
                        <span class="iconfont icon-youjiantou"></span>
                        <div class="more">浏览更多</div>
                        <p class="hot">热门</p>
                    </a>
                </div>
            </li>
            `;
            _this.main_r_o.innerHTML = o_str;

            let t_str = '';
            for (let i = 0; i < 7; i++) {
                t_str += `
                    <li>
                        <a href="./details.html?sid=${data[1].sid}" id="template">
                            <img src="${data[1].url}"alt="">
                            <h3>${data[1].title}</h3>
                            <h4></h4>
                            <p class="price">
                                <span class="num">${data[1].price}</span>
                                元<span>起</span>
                            </p>
                        </a>
                    </li>
                `;
            }
            t_str += `
            <li>
                <div class="li_top">
                    <a href="./details.html?sid=${data[28].sid}">
                        <img src="${data[28].url}" alt="">
                        <h3 class="title">${data[28].title}</h3>
                        <p class="price">
                            <span class="num">${data[28].price}</span>
                            <span>元起</span>
                        </p>
                    </a>
                </div>
                <div id="li_bot">
                    <a href="">
                        <span class="iconfont icon-youjiantou"></span>
                        <div class="more">浏览更多</div>
                        <p class="hot">热门</p>
                    </a>
                </div>
            </li>
            `;
            _this.main_r_t.innerHTML = t_str;
        })
    }

}
export {
    render
}