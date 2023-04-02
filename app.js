// load-aiTools using fetch()
const loadAiTools = (dataLimit) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools, dataLimit));
};

// display-aiTools
const displayAiTools = (tools, dataLimit) => {
  /*   let arr = [];
  for (const tool of tools) {
    const date = new Date(tool.published_in);
    arr.push({date});
  }
  const btnSort = document.getElementById("btn-sort");
  const sortedAsc = arr.sort(
    (objA, objB) => Number(objA.date) - Number(objB.date)
  ); */
  const aiToolsContainer = document.getElementById("ai-tools-container");
  aiToolsContainer.textContent = "";
  const seeMore = document.getElementById("see-more");

  // DataLimit for showing Limited Data By Default
  if (dataLimit && tools.length > 6) {
    tools.splice(0, 6);
  } else {
    seeMore.classList.add("d-none");
  }

  tools.forEach((tool) => {
    const aiToolDiv = document.createElement("div");
    aiToolDiv.classList.add("col");
    aiToolDiv.innerHTML = `
        <div class="card shadow-sm">
            <img src="${tool.image}" class="card-img-top ai-tool_image p-3"/>
            <div class="card-body">
              <h5 class="card-title ms-2">Features</h5>
              <ol>
                <li>${
                  tool.features[0] ? tool.features[0] : "No Data Found"
                }</li>
                <li>${
                  tool.features[1] ? tool.features[1] : "No Data Found"
                }</li>
                <li>${
                  tool.features[2] ? tool.features[2] : "No Data Found"
                }</li>
              </ol>
            <div>
            <div class="d-flex align-items-center justify-content-between border-top px-2">
                <div class="">
                <h4 class=" pt-3">${tool.name}</h4>
                <p><i class="fa-solid fa-calendar"></i><span class="ms-2 fw-medium opacity-75">${
                  tool.published_in
                }</span></p>
                </div>
            <button onclick="loadAiToolDetails('${
              tool.id
            }')" id="btn-arrow" data-bs-toggle="modal"
             data-bs-target="#aiToolDetailsModal"><i class="fa-solid arrow fa-arrow-right"></i>
            </button>
            </div>
        </div>
        `;
    aiToolsContainer.appendChild(aiToolDiv);
    toggleSpinner(false);
  });
};

const process = (dataLimit) => {
  loadAiTools(dataLimit);
  toggleSpinner(true);
};

document.getElementById("btn-see-more").addEventListener("click", function () {
  process();
});

// loading-spinner
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading === true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// aiTool Details (Modal) with Dynamic fetch url by id
const loadAiToolDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiToolDetails(data.data);
};

// display aiTools Details (modal) dynamically
const displayAiToolDetails = (data) => {
  console.log(data);
  const modalBody = document.getElementById("modal-body");
  const pricing = data.pricing;
  const features = data.features;
  const integrations = data.integrations;
  const examples = data.input_output_examples;
  modalBody.innerHTML = `
    <div class="row row-cols-1 align-items-center row-cols-xl-2 g-4 px-5 my-3">
    <div class="col">
        <div class="special-card card px-2 py-3">
        <div class="card-body">
            <h5 class="card-title">${data.description}</h5>
            <div class= "d-flex flex-wrap flex-lg-nowrap justify-content-center fw-semibold gap-3 my-4">
                <div class="pricing text-success p-4">
                ${
                  pricing
                    ? pricing[0].price + " " + pricing[0].plan
                    : "Free Of Cost/Basic"
                }</div>
                <div class="pricing text-warning p-4">${
                  pricing
                    ? pricing[1].price + " " + pricing[1].plan
                    : "Free Of Cost/Pro"
                }</div>
                <div class="pricing text-danger py-3">${
                  pricing
                    ? pricing[2].price + " " + pricing[2].plan
                    : "Free Of Cost/ Free of Cost/Enterprise"
                }</div>
            </div>
            <div class="d-md-flex justify-content-around">
                <div>
                    <h4>Features</h4>
                    <ul>
                    <li>${features[1].feature_name}</li>
                        <li>${features[2].feature_name}</li>
                        <li>${features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h4>Integrations</h4>
                    <ul>
                        <li>${
                          integrations ? integrations[0] : "No Data Found"
                        }</li>
                        <li>${
                          integrations ? integrations[1] : "No Data Found"
                        }</li>
                        <li>${
                          integrations ? integrations[2] : "No Data Found"
                        }</li>
         
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="col">
        <div class="card p-3">
        <img src="${data.image_link[0]}" class="card-img-top position-relative">
        <span class='accuracy fw-semibold position-absolute'>${
          data.accuracy.score ? data.accuracy.score + " Accuracy" : ""
        }</span>
        <div class="card-body">
            <h5 class="card-title text-center">${
              examples ? examples[0].input : "Can you give any example?"
            }</h5>
            <p class="card-text text-center">${
              examples ? examples[0].output : "No! Not Yet! Take a break!!!"
            }</p>
        </div>
        </div>
    </div>
    </div>
    `;
};

loadAiTools(6);
