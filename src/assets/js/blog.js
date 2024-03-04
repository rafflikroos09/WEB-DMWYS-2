let dataBlog = []; // untuk menyimpan data-data blog

function addBlog(event) {
  event.preventDefault(); // agar tidak melakukan referesh halaman

  let title = document.getElementById("input-blog-title").value;
  let startDate = document.getElementById("start").value;
  let endDate = document.getElementById("end").value;
  let content = document.getElementById("input-blog-content").value;
  let techCheckbox = [...document.querySelectorAll("input[name='tech-icon']:checked")];

  let tech = techCheckbox.map((item) => item.value);

  // mengelompakan data menjadi object
  let blog = {
    title,
    startDate,
    endDate,
    content,
    tech,
    postAt: new Date(),
  };

  dataBlog.push(blog);

  renderBlog(); // menjalankan function renderBlog agar data blog tampil
}

function renderBlog() {
  document.getElementById("contents").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    console.log(dataBlog[index]);

    document.getElementById("contents").innerHTML += `
        
    <div class="blog-list-item">
    <div class="blog-content">
      <div class="blog-image">
        <img src="../assets/img/blog.jpg" alt="">
      </div>
      <div class="blog-title">
        <h1>${dataBlog[index].title}</h1>
        <h5>${dataBlog[index].startDate} s/d ${dataBlog[index].endDate}</h5>
      </div>
      <div class="blog-detail">
        <p class="p-1">${dataBlog[index].content} </p>
        <p class="p-2"> ${getFullDate(dataBlog[index].postAt)} | Budi Kroos</p>
        <p class="p-3"> ${dataBlog[index].tech.map((item) => `<i class='${item}'></i>`).join("")}</p>
      </div>
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Delete Post</button>
      </div>
      <div class="blog-time">
        <p class="p-4">${getDistanceTime(dataBlog[index].postAt)}</p>
      </div>
    </div>
</div>
        `;
  }
}

function getFullDate(time) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const hour = time.getHours();
  const minute = time.getMinutes();

  return `${date} ${monthNames[month]} ${year} - ${hour}:${minute} WIB`;
}

function getDistanceTime(time) {
  // 1. kapan diposting => time
  // 2. waktu sekarang =>  new Date();
  // result = waktu sekarang - kapan diposting

  let timeNow = new Date();
  let timePost = time;
  let distanceTime = timeNow - timePost; // dalam bentuk milisecond
  console.log(distanceTime);

  let milisecond = 1000; //milisecond
  let secondInHour = 3600; // 1 jam = 3600 detik
  let hourInDay = 24; // 1 hari = 24 jam

  let distanceDay = Math.floor(distanceTime / (milisecond * secondInHour * hourInDay));
  let distanceHour = Math.floor(distanceTime / (milisecond * secondInHour));
  let distanceMinute = Math.floor(distanceTime / (milisecond * 60));
  let distanceSecond = Math.floor(distanceTime / milisecond);

  if (distanceDay > 0) {
    return `${distanceDay} days ago`;
  } else if (distanceHour > 0) {
    return `${distanceHour} hours ago`;
  } else if (distanceMinute > 0) {
    return `${distanceMinute} minutes ago`;
  } else {
    return `${distanceSecond} seconds ago`;
  }
}
