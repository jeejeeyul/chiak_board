//https://chiakboard.web.app/

var chatting = document.getElementById("chatting");
var submit_btn = document.getElementById("submit_btn");
var main = document.getElementById("main");
var database = firebase.database();

/*var start = () => {
  firebase
    .database()
    .ref()
    .update({ "idstore": { "id": 0 } });
};

start();
*/
function writeMessage(message, date, id) {
  firebase
    .database()
    .ref("messages")
    .push()
    .set({ message: message, date: date, id: id });
}

function updateId() {
  firebase
    .database()
    .ref("idstore/id")
    .get()
    .then((snapshot) => {
      console.log(snapshot.val());
      firebase
        .database()
        .ref("idstore")
        .set({ "id": Number(snapshot.val() + 1) });
    });
}

function getId() {
  firebase
    .database()
    .ref("idstore/id")
    .get()
    .then((snapshot) => {
      console.log(snapshot.val());
    });
}

submit_btn.addEventListener("click", function () {
  var date1 = new Date();
  var value1 = chatting.value;
  if (value1 != "") {
    firebase
      .database()
      .ref("idstore/id")
      .get()
      .then((snapshot) => {
        writeMessage(`${value1}`, `${date1}`, snapshot.val());
        updateId();
      });
  }

  chatting.value = "";
});

database.ref("messages").on("value", (snapshot) => {
  main.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData);
    main.innerHTML =
      main.innerHTML +
      `<div class=textbox><p>${childData.date}</p>/${childData.message}</div>`;
  });
});

/*
for (let i = 0; i < 10; i++) {
      main.innerHTML =
        main.innerHTML +
        `<div class=textbox>${list.message0.date}/${list.message0.message}</div>`;
    }

    firebase
  .database()
  .ref("messages")
  .once("value", (snapshot) => {
    snapshot.slice.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData.date);
    });
  });
*/

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
