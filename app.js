const loadAiTools = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data.tools));
};

const displayAiTools = (tools) => {
  console.log(tools);
};

loadAiTools();
