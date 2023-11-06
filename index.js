let data = [
  {
    id: 0,
    name: '肥宅心碎賞櫻3日',
    imgUrl:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
    area: '高雄',
    description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: '貓空纜車雙程票',
    imgUrl:
      'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台北',
    description:
      '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: '台中谷關溫泉會1日',
    imgUrl:
      'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台中',
    description:
      '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
    group: 20,
    price: 1765,
    rate: 7,
  },
];
const areaSelect = document.querySelector('[data-area-select]');
const areaSearchSelect = document.querySelector('[data-search-select]');
const areaArr = [...new Set([...data.map((item) => item.area)])];

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

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const submitBtn = document.querySelector('button[type=submit]');

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
function disableSubmitBtn() {
  if (![...inputs].every((item) => item.value)) {
    submitBtn.disabled = true;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputsValue = [...inputs].map((item) => item.value);

  const newData = {
    id: data.length + 1,
    name: inputsValue[0],
    imgUrl: inputsValue[1],
    area: areaSelect.value,
    description: textarea.value,
    group: inputsValue[3],
    price: inputsValue[2],
    rate: inputsValue[4],
  };
  data.push(newData);
  renderData(data);
  form.reset();
  disableSubmitBtn();
});
const list = document.querySelector('[data-list]');
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
renderData(data);
disableSubmitBtn();
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
