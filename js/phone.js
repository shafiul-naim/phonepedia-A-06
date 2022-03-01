const searchThePhone = () => {
    // console.log('helloo')

    const searchValue = document.getElementById('phone-input').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    // console.log(url);

     fetch(url)
     .then(res => res.json())
     .then(data => showPhones(data))
};

const showPhones = (phones) => {
    // console.log(phones);

    for(const phone of phones){
        
    }
}
