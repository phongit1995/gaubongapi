const request = require( 'request-promise');
let cheerio = require('cheerio');
let common = require('../commons/string');
class UserController {
     static async login(username,password){
        return new Promise(async(reslove,jeject)=>{
            try {
                let options={
                        method: 'POST',
                        url: 'https://chimbuom.us/login.php',
                        headers: 
                        { 'Postman-Token': '1ce33c15-c7e6-4724-8cf2-92640f816c26',
                            'cache-control': 'no-cache',
                            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                            formData: { 
                                account: username, 
                                password:password, 
                                m: '1' } 
                    }
                let result = await request(options);
                return jeject(new Error('Tên Đăng Nhập Sai Hoặc Mật Khẩu Chưa Chính Xác'));
            } catch (error) {
                console.log(error);
                let result = error.response.headers['set-cookie'].join(";");
                let obj = common.parseCookie(result);
                let userinfo = await this.getInfoUser(obj);
                reslove( userinfo) ;
            }
        })
        
    }
     static async getInfoUser(cookie){
        let optionlogin = {
            method:"get",
            uri:"https://chimbuom.us/users/profile.php",
            headers:{
            cookie:cookie,
            'Connection': 'keep-alive',
            'Accept-Encoding': '',
            'Accept-Language': 'en-US,en;q=0.8'
            }
        }
        let result = await request(optionlogin);
        let obj = {} ;
        obj['cookie'] = cookie ;
        let $ = cheerio.load(result);
        let username = $("#container > div.menu > table > tbody > tr > td:nth-child(2) > b > font").text();
        obj['username'] = username ;
        let gender = $("body > div:nth-child(10) > font:nth-child(2)").text();
        obj['gender'] = gender;
        let lever = $("body > div:nth-child(10) > font:nth-child(5)").text();
        obj['lever'] = lever ;
        let taisan = $("body > div:nth-child(10) > font:nth-child(9)").text();
        obj['taisan']= taisan;
        let Idweb = $("body > div:nth-child(4) > div > span:nth-child(2) > font").text();
        obj['Idweb'] = Idweb ;
        let image = $('#container > div.menu > table > tbody > tr > td:nth-child(1) > img').attr('src') ;
        obj['image'] = image ;
        // console.log(obj);
        return obj ;
    }
}
export default  UserController;