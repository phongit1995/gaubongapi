const request = require( 'request-promise');
let cheerio = require('cheerio');
let common = require('../commons/string');
let getInFoImages =async(cookie,page)=>{
    if(!page){
        page=1
    }
    console.log(cookie);
    let options = {
        method: 'GET',
        url: `https://chimbuom.us/tool/image-upload/index.php?page=${page}`,
        headers: 
        { 'Postman-Token': '1ce33c15-c7e6-4724-8cf2-92640f816c26',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' ,
            cookie:cookie,
            'Connection': 'keep-alive',
            'Accept-Encoding': '',
            'Accept-Language': 'en-US,en;q=0.8'
        }  
    }
    let result = await request(options);
    console.log(result);
    let $ = cheerio.load(result);
    
    let listContainerImage = $('.left');
    console.log(listContainerImage.length);
    let resultList = [];
    listContainerImage.each(function(index,element){
        if($(this).attr('id')){
            let InfoItem = {};
           let ImageItem = cheerio.load(element);
           let  userimage= ImageItem(' table > tbody > tr > td:nth-child(1) > img').attr('src'); 
           let nameUser = ImageItem(' table > tbody > tr > td:nth-child(2) > b > a > span > font').text() || ImageItem(' table > tbody > tr > td:nth-child(2) > b > a > span > span > font').text() || ImageItem('table > tbody > tr > td:nth-child(2) > b > a > font').text() ;
           let imageLink = ImageItem(' center > a:nth-child(2) > img').attr('src');
           let title= ImageItem('center').text().trim();
           title = title.substr(0, title.lastIndexOf(' '));
           InfoItem.userimage=userimage;
           InfoItem.nameUser= nameUser ;
           InfoItem.imageLink=imageLink;
           InfoItem.title=title;
           resultList.push(InfoItem);
        }
    })
    return resultList ;
   
}
module.exports = {getInFoImages}