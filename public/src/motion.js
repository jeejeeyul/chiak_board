//https://chiakboard.web.app/

var chatting = document.getElementById("chatting");
var submit_btn = document.getElementById("submit_btn");
var main = document.getElementById("main");
var database = firebase.database();

function writeMessage(massage, date) {
  firebase
    .database()
    .ref("messages/" + date)
    .set({ massage: massage, date: date });
}

function getMessage() {
  firebase
    .database()
    .ref("messages")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      }
    });
}

submit_btn.addEventListener("click", function () {
  var date1 = new Date();
  var value1 = chatting.value;
  if (value1 != "") {
    writeMessage(`${value1}`, `${date1}`);
    getMessage();
    main.innerHTML = main.innerHTML + `<div class="textbox">${value1}</div>`;
  }

  chatting.value = "";
});

/*function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase(
    "https://chiakboard-default-rtdb.asia-southeast1.firebasedatabase.app/"
  );
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
writeUserData("hello", "he", "eh", "ekds");
*/
/*<header>
<img id="top_logo" src="./images/top_logo.png" />
</header>
<main>
<div class="textbox"></div>
</main>
<footer>
<input id="chatting" />
<button id="submit_btn">입력</button>
</footer>
*/
