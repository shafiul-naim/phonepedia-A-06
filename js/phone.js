const searchThePhone = () => {

    const searchValue = document.getElementById('phone-input').value;
    document.getElementById('phone-input').value = '';
    document.getElementById('phone-details').textContent='';
    if(searchValue == ''){
        document.getElementById('error-1').style.display = 'block';
        document.getElementById('error-2').style.display = 'none';
    }
    else{
        document.getElementById('error-1').style.display = 'none';
        document.getElementById('error-2').style.display = 'none';
        
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;

         fetch(url)
         .then(res => res.json())
         .then(data => showPhones(data.data))
    };
    }
   
let count = 0;
const showPhones = (phones) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if(phones.length == 0){
        document.getElementById('error-2').style.display = 'block';
        document.getElementById('error-1').style.display = 'none';
    }

    for(const phone of phones){
        count = count + 1;
        if(count <= 20){
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.innerHTML = `
                    <div class="card-style card d-flex justify-content-center align-items-center pb-2">
                        <div><img  src="${phone.image}" class="card-img-top w-75 img-fluid pt-2" alt="..."></div>
                        <div class="card-body">
                          <h5 class="card-title">Brand: ${phone.brand}</h5>
                          <p class="card-text">Phone Name: ${phone.phone_name}</p>
                        </div>
                        <div class="card-footer">
                       
                        <button type="button" onclick="phoneDetails('${phone.slug}')" class="btn btn-info">See Phone Details</button>
                       
                        </div>
                      </div>
            `;
            phoneContainer.appendChild(div);
            
        }
        
        
    }
    count = 0;
}


const phoneDetails = phoneId => {
    document.getElementById('error-1').style.display = 'none';
        document.getElementById('error-2').style.display = 'none';
    
    const url =`https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
}

const showPhoneDetails = phone => {

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="row g-2">
    <div class="col-md-3 col-12">
       <div class="">
           <img src="${phone.image}" class="w-100 img-fluid" alt="...">
        </div>
       
   </div>
    
   <div class="col-md-9 col-12">
       <div class="">
       <h5 class="card-title mt-2"><b>Phone Name: </b>${phone?.name}</h5>
       <p class="card-text"><b>Release Date: </b>${phone?.releaseDate || 'not found'}</p>
       <p><b>Sensors: </b>${phone?.mainFeatures?.sensors.join(", ") || 'not found'}</p>
       <h5 class="py-2 fw-bold"><u>Others</u></h5>    
       <p><b>Bluetooth: </b>${phone?.others?.Bluetooth || 'not found'}</p>
       <p><b>GPS: </b>${phone?.others?.GPS || 'not found'}</p>
       <p><b>NFC: </b>${phone?.others?.NFC || 'not found'}</p>
       <p><b>Radio: </b>${phone?.others?.Radio || 'not found'}</p>
       <p><b>USB: </b>${phone?.others?.USB || 'not found'}</p>
       <p><b>WLAN: </b>${phone?.others?.WLAN || 'not found'}</p>
       </div>
   </div>
</div>
    
   
    `;
    phoneDetails.appendChild(div);
};
