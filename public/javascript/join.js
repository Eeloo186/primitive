const userEmail = document.getElementById("user-email");
const selected = document.getElementById("selected");
const userSelect = document.getElementById("email-select");
const joinBtn = document.querySelector("#join-btn");

//유효성 검사
joinBtn.addEventListener("click", (event) => {
  //-----이메일 양식 검사
  if (userEmail.value !== "") {
    if (!userEmail.value.match("@")) {
      alert("이메일형식이 아닙니다.");
      event.preventDefault();
      userEmail.focus();
      return;
    }
  }

  //----------------------펫나이 숫자확인
  const petAge = document.querySelector(".petAge");
  if (petAge.value !== "" && !Number(petAge.value)) {
    alert("나이에 숫자만 입력가능합니다.");
    event.preventDefault();
  }

  //-------------비밀번호 재확인
  const password = document.getElementById("user-passward");
  const repassword = document.getElementById("user-repassward");
  if (password.value !== "") {
    if (repassword.value !== password.value) {
      alert("비밀번호가 다릅니다.");
      event.preventDefault();
      repassword.value = "";
      repassword.focus();
    }
  }
}); // -----------------------유효성 검사 끝 -----------------------

// 주소선택 함수
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById("zip-code").value = data.zonecode;
      document.getElementById("address-1").value = data.address;
    },
  }).open();
}

//펫 정보 유&무

const petInformation = document.getElementById("pet-information");
const petNo = document
  .getElementById("petNo")
  .addEventListener("change", () => {
    const petInputValue = document.querySelectorAll(".petInput");
    for (let i = 0; i < petInputValue.length; i++) {
      petInputValue[i].value = "";
    }
    petInformation.style.opacity = "0";
    petInformation.style.left = "0";
    petInformation.style.zIndex = "-1";
  });
const petYes = document
  .getElementById("petYes")
  .addEventListener("change", () => {
    petInformation.style.opacity = "1";
    petInformation.style.left = "102%";
    petInformation.style.zIndex = "0";
  });

window.onload = () => {
  if (new URL(location.href).searchParams.get("error")) {
    alert("이미 존재하는 이메일입니다.");
  }
};
