// DOM ELEMENTS 
let resultBox = document.querySelector('#result');
let lengthEl = document.querySelector('#slider');
let uppercaseEl = document.querySelector('#uppercase');
let lowercaseEl = document.querySelector('#lowercase');
let numberEl = document.querySelector('#number');
let symbolEl = document.querySelector('#symbol');
let generateBtn = document.querySelector('#generate');


// generate btn click event 

generateBtn.addEventListener('click', () => {
    let hasUpper = uppercaseEl.checked;
    let hasLower = lowercaseEl.checked ;
    let hasNumber = numberEl.checked; 
    let hasSymbol = symbolEl.checked;
    let length = lengthEl.value;


    resultBox.textContent = generateRandomPass(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// copy generated password to clipboard function
let copy_to_clipboard_btn = document.querySelector('#copy-btn');

copy_to_clipboard_btn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultBox.innerText;

    if(!password){
        return;
    };

    textarea.value = password; // add value of password to the textarea
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('copied to clipboard successful');

})

// update slider value function 
let slider_value = document.querySelector('#slider-length-output');

lengthEl.addEventListener('mouseup', () => {
    slider_value.innerText = lengthEl.value;
})

// generate random password function 

function generateRandomPass(uppercase, lowercase, number, symbols, length){
    let generatedPass = '';

    let typesCount = uppercase + lowercase + number + symbols;

    let typesArray = [{uppercase}, {lowercase}, {number}, {symbols}].filter(type => Object.values(type)[0]);

    // check if no setting option checked 
    if(typesCount === 0 ){
        return 'NO OPTION SELECTED';
    }

    for(i = 0; i < length; i += typesCount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPass += randomFunc[funcName]();
        })
    }

    copy_to_clipboard_btn.style.opacity = 1;

    let finalPass = generatedPass.slice(0, length);
    
    return finalPass;

}

// generate functions object 
let randomFunc = {
    uppercase: getRandomUpper,
    lowercase: getRandomLower,
    number: getRandomNumber,
    symbols: getRandomSymbol
}

// generate functions 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() *26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


// contact developer function 
let dev_contact_modal = document.querySelector('.contact-dev-modal');
let close_dev_contact_modal = document.querySelector('.close-dev-modal');

function contactDev(){
   dev_contact_modal.classList.toggle('active');
}

close_dev_contact_modal.addEventListener('click', ()=>{
    dev_contact_modal.classList.remove('active');
})