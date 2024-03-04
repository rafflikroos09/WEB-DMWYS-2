// =======================================================================
// =======================             ===================================
// =======================             ===================================
// ======================= VERSION OOP ===================================
// =======================             ===================================
// =======================             ===================================
// =======================================================================

// class Testimonial {
//   #quote = ""; // # => membuat property menjadi private
//   #image = "";

//   constructor(quote, image) {
//     this.#quote = quote;
//     this.#image = image;
//   }

//   get quote() {
//     return this.#quote;
//   }

//   get image() {
//     return this.#image;
//   }

//   get ShowTestimonials() {
//     return `<div class="testimonial">
//                 <img
//                   class="profile-testimonial"
//                   src=${this.image}
//                   alt="profile"
//                 />
//                 <p class="quote">"${this.quote}"</p>
//                 <p class="author">- ${this.author}</p>
//               </div>`;
//   }
// }

// class Author extends Testimonial {
//   #author = "";

//   constructor(author, quote, image) {
//     super(quote, image);
//     this.#author = author;
//   }

//   get author() {
//     return this.#author;
//   }
// }

// // class Company extends Testimonial {
// //   #company = "";

// //   constructor(company, quote, image) {
// //     super(quote, image);
// //     this.#company = company;
// //   }

// //   get company() {
// //     return this.#company + " Corporation";
// //   }
// // }

// const user = new Author(
//   "Tony Hawk",
//   "Keren banget sumpah",
//   "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 871w, https://images.unsplash.com/photo-1557862921-37829c790f19?q=80"
// );
// const user1 = new Author("Frenky", "Ga ada obat pokoknya", "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80");
// const user2 = new Author("Dora Kroos", "Emang boleh sekeren ini 👋", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80");

// // const user3 = new Company(
// //   "Putri Maharani solid",
// //   "Dijamin jadi gila kalau belajar OOP",
// //   "https://images.unsplash.com/photo-1696246847440-bb0047ba93ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
// // );

// let data = [user, user1, user2];
// let dataForHTML = "";

// for (let i = 0; i < data.length; i++) {
//   dataForHTML += data[i].ShowTestimonials;
// }

// document.getElementById("testimonials").innerHTML = dataForHTML;

// =======================================================================
// =======================             ===================================
// =======================             ===================================
// =======================  VERSION HOF $ CALLBACK===================================
// =======================             ===================================
// =======================             ===================================
// =======================================================================

const data = [
  {
    name: "Tony Hawk ",
    comment: "Keren banget asli",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 871w, https://images.unsplash.com/photo-1557862921-37829c790f19?q=80",
    rating: 4,
  },
  {
    name: "Frenky",
    comment: "Emang boleh sekeren ini",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80",
    rating: 3,
  },
  {
    name: "Budiman",
    comment: "Lumayan lahh yaaa",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80",
    rating: 2,
  },
  {
    name: "Dora",
    comment: "Bintang lima deh pokoknya",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80",
    rating: 5,
  },
  {
    name: "Baron Kroos",
    comment: "Cocok sih buat gw mah",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80",
    rating: 3,
  },
];

// show all testimonial datas
function Testimonials() {
  let dataHTML = "";

  data.forEach(function (data) {
    dataHTML += `
        <div class="testimonial">
        <img
          class="profile-testimonial"
          src="${data.image}"
        />
        <p class="quote">"${data.comment}"</p>
        <p class="author">- ${data.name}</p>
        <p class="author">${data.rating} <i class="fa-solid fa-star"></i></p>
      </div>
    `;
  });

  document.getElementById("testimonials").innerHTML = dataHTML;
}
Testimonials();

const FilterTestimonial = (rating) => {
  let dataHTML = "";

  const dataFiltered = data.filter((data) => {
    return data.rating === rating;
  });

  if (!dataFiltered.length) {
    dataHTML += `<h1>Data not found!!</h1>`;
  } else {
    dataFiltered.forEach((data) => {
      console.log(data);
      dataHTML += `
          <div class="testimonial">
          <img
            class="profile-testimonial"
            src="${data.image}"
          />
          <p class="quote">"${data.comment}"</p>
          <p class="author">- ${data.name}</p>
          <p class="author"> ${data.rating} <i class="fa-solid fa-star"></i></p>
        </div>
      `;
    });
  }
  document.getElementById("testimonials").innerHTML = dataHTML;
};
