const server = "http://localhost:8000";
//fetch함수
function api(url, method, data) {
  if (method === "GET") {
    return fetch(`${server}${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("응답겟 ------------------------", res);
        if (res.error) {
          //   console.log("에러겟 ------------------------", res.error);
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
  } else {
    const body = { id: data };
    return fetch(`${server}${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("응답포스트 ------------------------", res);
        if (res.error) {
          //   console.log("에러포스트 ------------------------", res.error);
          return Promise.reject(res.error);
        } else {
          return res;
        }
      });
  }
}
//실시간 검색어 렌더
function renderSearchWord(array) {
  const listElement = document.getElementById("searchWord_list");

  for (let i = 0; i < array.length; i++) {
    const searchItem = document.createElement("li");
    searchItem.className = "search_item";
    for (let key in array[i]) {
      searchItem.innerHTML = `<div class='search_itemNum'><strong>${key}</strong> </div><div class='serch_itemWord'> ${array[i][key]}</div>`;
    }
    listElement.appendChild(searchItem);
  }
}
//input 자리수 제한
function checkNumberLength(e) {
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
}
//이벤트 함수
document.getElementById("submit").addEventListener("click", function () {
  const searchTitle = document.querySelector(".searchWord_title");
  searchTitle.style = "visibility: hidden;";
  const listElement = document.getElementById("searchWord_list");
  listElement.innerHTML = "";

  const idNumber1 = document.getElementById("idNumber1").value;
  const idNumber2 = document.getElementById("idNumber2").value;
  if (!(idNumber1 && idNumber2)) {
    alert("주민번호를 모두 입력해주세요");
  } else {
    const idNumber = idNumber1 + idNumber2;
    //or  api(`/naver/realtime/${idNumber}`, "GET")
    api("/naver/realtime", "POST", idNumber)
      .then((res) => {
        searchTitle.style = "visibility: visible;";
        console.log(res.message);
        renderSearchWord(res.data);
      })
      .catch((error) => {
        console.log(`${error.message} : 에러코드 ${error.status}`);
        alert(error.message);
      });
    document.getElementById("idNumber1").value = "";
    document.getElementById("idNumber2").value = "";
  }
});

//할 것 : 에러 처리 다시확인, 그리드로 스타일링, form으로 처리해보기(label도 확인)
