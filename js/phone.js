const searchThePhone = () => {
    // console.log('helloo')

    const searchValue = document.getElementById('phone-input').value;
    document.getElementById('phone-input').value = '';
    document.getElementById('phone-details').textContent='';
    if(searchValue == ''){
        alert('write something');
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        // console.log(url);
        
    
         fetch(url)
         .then(res => res.json())
         .then(data => showPhones(data.data))
    };
    }
   
let count = 0;
const showPhones = (phones) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if(phones.length == 0){
        alert('no result found');
    }

    for(const phone of phones){
        // console.log(phone);
        count = count + 1;
        if(count <=20){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div class="card d-flex justify-content-center align-items-center h-75 pb-5">
                        <img  src="${phone.image}" class="w-75 h-75 card-img-top img-fluid  pt-5" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Brand: ${phone.brand}</h5>
    
                          <p class="card-text">Phone Name: ${phone.phone_name}</p>
                        </div>
                        <div class="card-footer">
                        <button type="button" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">See Phone Details</button>
                        </div>
                      </div>
            `;
            phoneContainer.appendChild(div);
        }
        
        
    }
    count = 0;
}


const phoneDetails = phoneId => {
    // console.log(phoneId);
    const url =`https://openapi.programming-hero.com/api/phone/${phoneId}`;
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
}

const showPhoneDetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Phone Name: ${phone.name}</h5>
      <p class="card-text">Release Date: ${phone.releaseDate}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}