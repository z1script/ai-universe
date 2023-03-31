const loadAiTools = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools));
};

const displayAiTools = (tools) => {
  const aiToolsContainer = document.getElementById("ai-tools-container");
  tools.forEach((tool) => {
    // console.log(tool);
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
            <button onclick="loadAiToolsDetails('${
              tool.id
            }')" id="btn-arrow" data-bs-toggle="modal"
             data-bs-target="#aiToolDetailsModal"><i class="fa-solid arrow fa-arrow-right"></i>
            </button>
            </div>
        </div>
        `;
    aiToolsContainer.appendChild(aiToolDiv);
  });
};

const loadAiToolsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiToolDetails(data.data);
};

const displayAiToolDetails = (data) => {
  console.log(data);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <div class="row row-cols-1 align-items-center row-cols-xl-2 g-4 px-5">
    <div class="col">
        <div class="special-card card px-2 py-3">
        <div class="card-body">
            <h5 class="card-title">${data.description}</h5>
            <div class= "d-flex flex-wrap flex-lg-nowrap justify-content-center fw-semibold gap-3 my-4">
                <div class="pricing text-success p-4">
                ${data.pricing[0].price + " " + data.pricing[0].plan}</div>
                <div class="pricing text-warning p-4">${
                  data.pricing[1].price + " " + data.pricing[1].plan
                }</div>
                <div class="pricing text-danger py-3">${
                  data.pricing[2].price + " " + data.pricing[2].plan
                }</div>
            </div>
            <div class="d-md-flex justify-content-around">
                <div>
                    <h4>Features</h4>
                    <ul>
                    <li>${data.features[1].feature_name}</li>
                        <li>${data.features[2].feature_name}</li>
                        <li>${data.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h4>Integrations</h4>
                    <ul>
                        <li>${data.integrations[0]}</li>
                        <li>${data.integrations[1]}</li>
                        <li>${data.integrations[2]}</li>
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
              data.input_output_examples[0].input
            }</h5>
            <p class="card-text text-center">${
              data.input_output_examples[0].output
            }</p>
        </div>
        </div>
    </div>
    </div>
    `;
};

loadAiTools();
