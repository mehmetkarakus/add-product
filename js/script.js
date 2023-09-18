document.addEventListener("DOMContentLoaded", function () {

  // Ürün Ekleme Modal 

  var modal = document.getElementById("myModal");

  var btn = document.getElementById("myBtn");

  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Ürünleri API ile Tabloya Ekleme 

  const addButton = document.querySelector("#add__button");
  addButton.addEventListener("click", () => {
    productTable()
  })

  function productTable() {

    const brand = document.querySelector("#text__brand");
    const model = document.querySelector("#text__model");
    const price = document.querySelector("#text__price");
    const piece = document.querySelector("#text__piece");

    if (brand.value.trim() === "") {
      console.log("Marka Alanı Boş Bırakılamaz")
      alert("Lütfen Marka ALanını Doldurun")
    }

    if (model.value.trim() === "") {
      console.log("Model Alanı Boş Bırakılamaz")
      alert("Lütfen Model ALanını Doldurun")
    }

    if (price.value.trim() === "") {
      console.log("Fiyat Alanı Boş Bırakılamaz")
      alert("Lütfen Fiyat ALanını Doldurun")
    }

    if (piece.value.trim() === "") {
      console.log("Adet Alanı Boş Bırakılamaz")
      alert("Lütfen Adet ALanını Doldurun")
    }

    const product = {
      productBrand: brand.value,
      productModel: model.value,
      productPrice: price.value,
      productPiece: piece.value,
    };

    tableElements(product);

    fetch(`https://65039199a0f2c1f3faec0896.mockapi.io/new-product/new-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })

      .then((res) => res.json())
      .then((product) => {
        console.log("Yeni Ürün Eklendi: ", product);
        productRow(product);
      })
      .catch((error) => {
        console.error("Hata: ", error);
      });

    brand.value = "";
    model.value = "";
    price.value = "";
    piece.value = "";

    modal.style.display = "none";
  }

  fetch(`https://65039199a0f2c1f3faec0896.mockapi.io/new-product/new-product`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        tableElements(product);
      });
    })
    .catch((error) => {
      console.error("Hata: ", error);
    });

  function tableElements(element) {
    const tableBody = document.querySelector('#new__table tbody');
    tableBody.innerHTML +=
      `<tr>
            <td>${element.productBrand}</td>
            <td>${element.productModel}</td>
            <td>${element.productPrice}</td>
            <td>${element.productPiece}</td>
        </tr>`;
  }

});


