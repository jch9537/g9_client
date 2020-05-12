const server = "http://localhost:8000";

//fetch함수
function api(url, method, data) {
  //   console.log(url, method, data);
  //   let body = { id: data };
  if (method === "GET") {
    console.log("겟");
    return fetch(`${server}${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //   credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("응답겟 ------------------------", res);
        renderSearchWord(res);
        if (res.error) {
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
  } else {
    // console.log("111111", `${server}${url}`);
    // console.log(JSON.stringify(data));
    return fetch(`${server}${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("응답포스트 ------------------------", res);
        renderSearchWord(res);
        if (res.error) {
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
  }
}
function renderSearchWord(array) {
  for (let i = 0; i < array.length; i++) {
    const listElement = document.getElementById("searchWord_list");

    const searchItem = document.createElement("li");
    searchItem.className = "search_item";
    for (let key in array[i]) {
      searchItem.innerHTML = `<span className='search_itemNum'>${key} </span><span className='serch_itemWord'> ${array[i][key]}</span>`;
    }
    console.log(searchItem);
    listElement.appendChild(searchItem);
  }
}
//input 자리수 제한
function checkNumberLength(e) {
  console.log(e.value, e.maxLength);
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
}

//숫자인지 확인하는 함수
function checkStringNumber(num) {
  var reg = /\d{13}/;
  return reg.test(Number(num));
}

//주민번호 유효성확인
function checkIdNumber(serialNumber) {
  if (serialNumber.length !== 13) {
    return false;
  }
  if (checkStringNumber(serialNumber)) {
    // console.log("시리얼넘버", typeof serialNumber);
    let checkArray = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    let numbers = serialNumber.split("");
    for (let i = 0; i < numbers.length - 1; i++) {
      sum += numbers[i] * checkArray[i];
    }
    let extraNumber = sum % 11;
    let lastNumber = (11 - extraNumber) % 10;
    // console.log("합계", sum, "익스트라", extraNumber, "마지막번호", lastNumber);
    // console.log(numbers[numbers.length - 1]);
    if (Number(numbers[numbers.length - 1]) === lastNumber) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//이벤트 함수
document.getElementById("submit").addEventListener("click", function () {
  let idNumber1 = document.getElementById("idNumber1").value;
  let idNumber2 = document.getElementById("idNumber2").value;
  console.log("----------------", idNumber1, idNumber2);
  let idNumber = idNumber1 + idNumber2;
  console.log(idNumber, typeof idNumber);
  if (checkIdNumber(idNumber)) {
    api("/naver/realtime", "GET");
    document.getElementById("idNumber1").value = "";
    document.getElementById("idNumber2").value = "";
  } else {
    alert("유효한 주민번호가 아닙니다.");
    document.getElementById("idNumber1").value = "";
    document.getElementById("idNumber2").value = "";
  }
});

//할 것 : input 리스트안나오게하기, form으로 처리해보기(label도 확인), 모듈로 나누기
