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
        if(count <= 20){
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.innerHTML = `
                    <div class="card d-flex justify-content-center align-items-center pb-2">
                        <div><img  src="${phone.image}" class="card-img-top w-75 img-fluid pt-2" alt="..."></div>
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
    <div class="d-flex flex-sm-row justify-content-around align-items-center">
    <div class="flex-shrink-0">
        <img src="${phone.image}" class="w-75 img-fluid" alt="...">
        
    </div>
    <div class="text-center flex-grow-1 ms-3">
    <h5 class="card-title mt-2">Phone Name: ${phone.name}</h5>
    <p class="card-text">Release Date: ${phone.releaseDate}</p>
    </div>
    <div class="text-center flex-grow-1 ms-3">
        <p>${phone.others.USB}others</p>
    </div>
    <div class="text-center flex-grow-1 ms-3">
        <ul>
            <h5>Sensors</h5>
            <li>${phone.mainFeatures.sensors[0]}</li>
            <li>${phone.mainFeatures.sensors[1]}</li>
            <li>${phone.mainFeatures.sensors[2]}</li>
        </ul>
    </div>
    </div>
    
   
    `;
    phoneDetails.appendChild(div);
}