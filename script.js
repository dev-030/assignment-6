const all = async (val) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const url2 = await fetch(url);
  const url3 = await url2.json();
  const spin = url3.data.tools;

  if (spin.length > 0) {
    spinner(true);
  } else {
    spinner(false);
  }
  pageitems(val, url3.data.tools);
};






let vv = 0;

// <----------------------Main function ------------------->
let counting = 0;

const pageitems = (limit, pagedata) => {
  const cards_box = document.getElementById("cards-box");

  if (limit != true && pagedata.length > 6) {
    pagedata = pagedata.slice(0, 6);
    document.getElementById("loadmore").classList.remove("d-none");
  } else {
    document.getElementById("loadmore").classList.add("d-none");
    pagedata = pagedata.slice(6, pagedata.length);
    counting = 0;
  }

  pagedata.forEach((items) => {
    const cards = document.createElement("div");

    cards.classList.add("card");
    cards.classList.add("inner-card");
    cards.classList.add('card-main-body')
    cards.style.width = "22rem";

    cards.innerHTML = `
      <img src="${items.image}" class="card-img-top image" alt="...">
      <div class="card-body">
      <h4>Features</h4>
      <ol class = 'ol'>
          <li>${items.features[0]}</li>
          <li>${items.features[1]}</li>
          <li>${items.features[2]}</li>
      </ol>
      <div class="spen"></div>
      <div class = 'middle-part'>
          <div class="middle-part2">
              <h5 class="card-text">${items.name}</h5>

              <div class = 'date-and-calender'>
                  <img src="calender.png" class="calender">

                  <div>
                  <p class = 'date-and-time'>${items.published_in}</p>
                  </div>
                 
              </div>
          </div>
          <button onclick = button(${pagedata[counting].id}) data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="icon"></button>
      </div>
      
      </div> `;
    cards_box.appendChild(cards);
    counting++;
  });
};
//<-------------------main function end----------------------->




function button(data) {
  if (data <= 9) { data = "0" + data;} else {data = data + "";}
  second(data);
}



//<------------------Modal function---------------->

const second = async (data) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${data}`;
  await fetch(url)
    .then((data) => data.json())
    .then((details) => modal(details.data));
};

function modal(data) {

  const modal = document.getElementById("modal-input-body");

 
  
  modal.innerHTML = `

  <button type="button" class="modal-btn" data-bs-dismiss="modal"></button>

  <div class="modal-body box-body" id="modal-body">
      

      <div class="box-1">
          <h5>${data.description}</h5>
          <div class="box-1-inner-body mt-2">
              <div class="box-1-inner"><p class = 'box-1-inner-body-text text-success'> ${(data.pricing === null || data.pricing[0].price === undefined ) ? `No data` : `${data.pricing[0].price} <br>${data.pricing[0].plan}`}</p></div>

              <div class="box-1-inner"><p class = 'box-1-inner-body-text text-warning'> ${(data.pricing === null || data.pricing[1].price === undefined ) ? `No data` : `${data.pricing[1].price} <br>${data.pricing[1].plan}`}</p></div>
              <div class="box-1-inner"><p class = 'box-1-inner-body-text text-danger'> ${(data.pricing === null || data.pricing[2].price === undefined ) ? `No data` : `${data.pricing[2].price} <br>${data.pricing[2].plan}`}</p></div>
          </div>
          <div class="box-1-inner-body2 mt-3">
              <div> <h4>Features</h4>
          <ul>
              <li>${data.features[1].feature_name}</li>
              <li>${data.features[2].feature_name}</li>
              <li>${data.features[3].feature_name}</li>
          </ul>
              </div>
              <div> <h4>Integrations</h4>
                  <ul>
              <li> ${(data.integrations === null || data.integrations[0] === undefined ) ? `No data` : `${data.integrations[0]}`}</li>
              <li> ${(data.integrations === null || data.integrations[1] === undefined ) ? `No data` : `${data.integrations[1]}`}</li>
              <li> ${(data.integrations === null || data.integrations[2] === undefined ) ? `No data` : `${data.integrations[2]}`}</li>

                  </ul>
              </div>
          </div>
      </div>
      <div class="box-2">
          <img src=${data.image_link[0]} class="box-2-image">
          <p class="p">${(data.accuracy.score === null) ? 'No data' : `${data.accuracy.score*100}% accuracy`}</p>
          <h5>${(data.input_output_examples === null) ? ` ` : `${data.input_output_examples[0].input}`}</h4>
          <p>${(data.input_output_examples === null) ? ` ` : `${data.input_output_examples[0].output}`}</p>
      </div>
  </div>
  
  `
}





// ---------Load more button function--------

document.getElementById("loadmore").addEventListener("click", () => {
  const val = true;
  all(val);
});





// Spinner before loading done ......

const spinner = (active) => {
  const loading = document.getElementById("spinner");
  if (active) {
    loading.classList.add("d-none");
  } else {
    loading.classList.remove("d-none");
  }
};
//<------------------------------------------>

all();
