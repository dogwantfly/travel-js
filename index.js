const areaSelect = document.querySelector('[data-area-select]');
const areaSearchSelect = document.querySelector('[data-search-select]');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const submitBtn = document.querySelector('button[type=submit]');
const list = document.querySelector('[data-list]');
let areaArr;
let ticketData;

function initSelect(data) {
  areaArr = [...new Set([...data.map((item) => item.area)])];
  areaSelect.innerHTML = `
<option value="" disabled selected>請填寫景點地區</option>
${areaArr
  .map(
    (item) => `
<option value="${item}">${item}</option>
`
  )
  .join('')}`;
  areaSearchSelect.innerHTML = `<option value="" disabled selected>地區搜尋</option><option value="all">全部地區</option>${areaArr
    .map(
      (item) => `
<option value="${item}">${item}</option>
`
    )
    .join('')}`;
}

function renderData(filterData) {
  let str = '';
  if (!filterData.length) {
    str = `<div class="text-center">
    <h3 class="text-3xl font-medium mb-6 text-secondary-600">查無此關鍵字資料</h3>
    <img class="mx-auto" src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="not found">
  </div>`;
  } else {
    str = `<ul class="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">${filterData
      .map(
        (item) =>
          `
      <li data-id=${item.id}>
      
        <a href="#" class="card-hover block relative h-full">
        <div class="h-[180px] overflow-hidden rounded">
          <img class="transition-all duration-300" src="${item.imgUrl}" alt="${item.name}" height="180">
          
        </div>
        <div class="absolute -top-3.5 bg-primary-300 text-white px-3 py-4 rounded-e-lg">${item.area}</div>
        <div class="absolute top-[150px] bg-primary-500 px-3 py-2 text-white rounded-e-lg z-10">${item.rate}</div>
      <div class="p-5 text-primary-500 flex flex-col bg-white shadow card-content rounded-b">
      <h3 class="title font-medium text-2xl pb-1 border-b-2 border-primary-600 mb-4">
      ${item.name}
    </h3>
    <p class="text-secondary-600 mb-5 grow">
    ${item.description}
    </p>
        <div class="flex justify-between items-center">
        <p class="font-medium">
        <span><i class="fas fa-exclamation-circle"></i></span>
        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
      </p>
          <p class="ticketCard-price">
            TWD <span class="font-medium text-[32px]" id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
      </a>
    </li>`
      )
      .join('')}</ul>`;
  }
  list.innerHTML = str;
}

function disableSubmitBtn() {
  if (![...inputs].every((item) => item.value)) {
    submitBtn.disabled = true;
  }
}

async function getData() {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
    );
    ticketData = response.data.data;
    initSelect(ticketData);
    renderData(ticketData);
  } catch (error) {
    console.log('error', error);
  }
}

form.addEventListener('input', () => {
  if (
    ![...inputs].every((item) => item.value) ||
    !textarea.value ||
    !areaSelect.value
  ) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputsValue = [...inputs].map((item) => item.value);

  const newData = {
    id: data.length + 1,
    name: inputsValue[0],
    imgUrl: inputsValue[1],
    area: areaSelect.value,
    description: textarea.value,
    group: parseInt(inputsValue[3]),
    price: parseInt(inputsValue[2]),
    rate: parseInt(inputsValue[4]),
  };
  data.push(newData);
  renderData(data);
  form.reset();
  disableSubmitBtn();
});

areaSearchSelect.addEventListener('change', (e) => {
  const filterData =
    e.target.value === 'all'
      ? data
      : data.filter((item) => item.area === e.target.value);
  const searchDataNum = document.querySelector('[data-search-num]');

  renderData(filterData);
  searchDataNum.parentNode.classList.remove('hidden');
  searchDataNum.parentNode.classList.add('block');
  searchDataNum.textContent = filterData.length;
});

getData();
disableSubmitBtn();
