const ALLOW_EXTENTION = ['txt','docx','pdf','jpeg','jpg','png'];
const { createWorker } = require('tesseract.js');
const worker = createWorker();
//input file here

input = "D:\\gsu-hackathon\\ODST\\odst-feature-backend\\lorumIpsum.png"

if (allowedFiles(input) === 'doc'){
    acceptFile();
}else if (allowedFiles(input) === 'img'){
    try{
        OpticalCharReco()
    }catch{
        ReturnbadRequest();
    }
}
else{
    ReturnbadRequest();
}


function allowedFiles(filename){
    const extention = filename.split('.').pop().toLowerCase();
    console.log(extention)
    if (ALLOW_EXTENTION.includes(extention)){
        if (extention === 'txt' || extention === 'docx' || extention === 'pdf'){
            return 'doc';
        } else if (extention === 'jpeg' || extention === 'jpg' || extention === 'png'){
            return 'img';
        } else{
            ReturnbadRequest()
        }
    }
    
}

//setup and the english language mode for tessaract
function OpticalCharReco(imagePath) {
    //run python text-reader and pull the output
}

function acceptFile(){
    //push file to database
}
function ReturnbadRequest(){
    //return that the file is either incorrect or something went wrong
}


