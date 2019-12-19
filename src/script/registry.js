import { $, ajax, addtool, bufferMove,siblings} from './toolmodule.js';
class registry {
    constructor(){
        this.form = $('.registry');

        this.un = $('.username');
        this.un_sp = $('.username_sp');
        this.uflag = true;

        this.ps = $('.password');
        this.ps_sp = $('.password_sp');
        this.pflag = false;

        this.te = $('.tell');
        this.te_sp = $('.tell_sp');
        this.tflag = false;

        this.em = $('.email');
        this.em_sp = $('.email_sp');
        this.eflag = false;

    }
    init(){
        this.username();
        this.password();
        this.submit();
        this.tell();
        this.email();
    }
    //公用：改变内容，字体颜色
    change(ele,fcolor,str){//对象，字体颜色，内容
        ele.innerHTML = str;
        ele.style.color = fcolor;
    }
    //用户名
    username(){
        let _this = this;
        this.un.onfocus = function(){
            _this.change(_this.un_sp,'#ccc','中英文均可，最长14个英文或7个汉字');
        }
        this.un.onblur = function(){
            const reguser1 = /^[a-zA-Z]{1,14}$/g;
            const reguser2 = /^[\u4e00-\u9fa5]+$/g;
            const reguser3 = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
            if(this.value !==''){//用户名不为空
                let len = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
                if(len<=14){
                    if(reguser1.test(this.value) || reguser2.test(this.value) || reguser3.test(this.value)){
                        _this.change(_this.un_sp,'green','用户名可以使用');
                        _this.uflag = true;
                    }else{//格式错误
                        _this.change(_this.un_sp,'red','用户名格式错误');
                        _this.uflag = false;
                    }
                }else{//长度错误
                    _this.change(_this.un_sp,'red','用户名长度错误');
                    _this.uflag = false;
                }
            }else{//用户名为空
                _this.change(_this.un_sp,'red','用户名不能为空');
                _this.uflag = false;
            }
        }
    }
    //密码
    password(){
        let _this = this;
        this.ps.onfocus = function(){
            if(this.value == ''){
                _this.change(_this.ps_sp,'#ccc','请输入8-14字符密码');
            }
        }

        this.ps.oninput = function(){
            if(this.value.length >= 8 && this.value.length <= 14){
                const regnum = /\d+/;
                const reglower = /[a-z]+/;
                const regupper = /[A-Z]+/;
                const other = /[\W\_]+/;
                let count = 0;
                if(regnum.test(this.value)){
                    count++;
                }
                if(reglower.test(this.value)){
                    count++;
                }
                if(regupper.test(this.value)){
                    count++;
                }
                if(other.test(this.value)){
                    count++;
                }
                switch(count){
                    case 1:
                        _this.change(_this.ps_sp,'red','密码强度弱');
                        _this.pflag = false;
                        break;
                    case 2:
                    case 3:
                        _this.change(_this.ps_sp,'orange','密码强度中');
                        _this.pflag = true;
                        break;
                    case 4:
                        _this.change(_this.ps_sp,'green','密码强度强');
                        _this.pflag = true;
                        break;
                }
            }else{
                _this.change(_this.ps_sp,'red','密码长度有误');
                _this.pflag = false;
            }
        }

        _this.ps.onblur = function(){
            if(_this.pflag){
                _this.change(_this.ps_sp,'green','√密码设置正确');
                _this.pflag = true;
            }else{
                _this.change(_this.ps_sp,'red','密码设置有误');
                _this.pflag = false;
            }
        }
    }
    //手机号
    tell(){
        let _this = this;
        this.te.onfocus = function(){
            if(this.value == ''){
                _this.change(_this.te_sp,'#ccc','请输入11位手机号');
            }
        }

        this.te.onblur = function(){
            const regtel = /^1[3578]\d{9}$/;
            if(this.value !== ''){
                if(regtel.test(this.value)){
                    _this.change(_this.te_sp,'green','√手机号正确');
                    _this.tflag = true;
                }else{
                    _this.change(_this.te_sp,'red','手机号错误');
                    _this.tflag = false;
                }
            }else{
                _this.change(_this.te_sp,'red','手机号不能为空');
                _this.tflag = false;
            }
        }
    }
    //邮箱
    email(){
        let _this = this;
        this.em.onblur = function(){
            const regtel = /^(\w+[\+\-\_\.]*\w+)\@(\w+[\+\-\_\.]*\w+)\.(\w+[\+\-\_\.]*\w+)$/;
            if(this.value !== ''){
                if(regtel.test(this.value)){
                    _this.change(_this.em_sp,'green','√邮箱正确');
                    _this.eflag = true;
                }else{
                    _this.change(_this.em_sp,'red','邮箱格式有误');
                    _this.eflag = false;
                }
            }else{
                _this.change(_this.em_sp,'red','邮箱不能为空');
                _this.eflag = false;
            }
        
        
        }
    }
    //submit
    submit(){
        let _this = this;
        this.form.onsubmit = function(){
            if(_this.un.value == ''){
                _this.change(_this.un_sp,'red','用户名不能为空');
                _this.uflag = false;
            }
            if(_this.ps.value == ''){
                _this.change(_this.ps_sp,'red','密码不能为空');
                _this.pflag = false;
            }
            if(_this.te.value == ''){
                _this.change(_this.te_sp,'red','手机号码不能为空');
                _this.tflag = false;
            }
            if(_this.em.value == ''){
                _this.change(_this.em_sp,'red','邮箱不能为空');
                _this.eflag = false;
            }


            if(!_this.uflag || !_this.pflag || !_this.tflag || !_this.eflag){
                return false;
            }
        }
    }

}
new registry().init();