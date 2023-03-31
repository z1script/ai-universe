const loadAiTools = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools));
};

const displayAiTools = (tools) => {
  const aiToolsContainer = document.getElementById("ai-tools-container");
  tools.forEach((tool) => {
    console.log(tool);
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
                <i class="fa-solid arrow fa-arrow-right"></i>
            </div>

        </div>
        `;
    aiToolsContainer.appendChild(aiToolDiv);
  });
};

loadAiTools();
