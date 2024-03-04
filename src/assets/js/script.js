function getData() {
  let nama = document.getElementById("nama").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if (nama == "") {
    return alert("Please type your name");
  } else if (email == "") {
    return alert("Please type your email");
  } else if (phone == "") {
    return alert("Please type your No Phone");
    // } else if (subject == "") {
    //   return alert("Please type your subject");
  } else if (message == "") {
    return alert("Plese type your message");
  }

  console.log(nama);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(message);

  const emailDestination = "hi.mhmd.raffli09@gmail.com";
  let a = document.createElement("a");
  a.href = `mailto:${emailDestination}?subject=${subject}&body= halo bang nama saya, ${nama}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;
  a.click();

  const data = {
    nama,
    email,
    phone,
    subject,
    message,
  };
  console.log(data);
}
