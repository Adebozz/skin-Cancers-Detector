function sell() {
  let dis = document.getElementById("guid").style.display;
  if (dis === "block") {
    document.getElementById("guid").style.display = "none";
  } else {
    document.getElementById("guid").style.display = "block";
  }
}
