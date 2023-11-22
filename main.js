// main.js
const url = "https://fakestoreapi.com/products";
const cart = [];

const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  const divProduk = document.querySelector(".div-produk");

  data.forEach((item) => {
    const produkDiv = document.createElement("div");
    produkDiv.classList.add("bg-gray-800", "p-3", "text-white");

    produkDiv.innerHTML = `
      <img src="${item.image}" class="w-full h-56 object-cover"/>
      <span class="block font-bold text-xl title">${item.title}</span>
      <span class="block">${item.category}</span>
      <span class="block">${item.description}</span>
      <button class="bg-sky-500 px-3 py-1 rounded text-black tambah-ke-Troli">Tambah ke keranjang</button>
    `;

    divProduk.appendChild(produkDiv);

    const btnAddCart = produkDiv.querySelector(".tambah-ke-Troli");
    btnAddCart.addEventListener("click", function () {
      let title = produkDiv.querySelector(".title").innerText;
      addToCart(title);
      showSuccessPopup(title);
    });
  });
};

  const addToCart = (title) => {
  cart.push({ title });
  updateCartCount(cart.length);
};

  const toggleCartPopup = () => {
  const cartPopup = document.getElementById("cartPopup");
  const closeCartPopup = document.getElementById("closeCartPopup");
  const sortCartButton = document.getElementById("sortCart");

  closeCartPopup.addEventListener("click", () => {
    cartPopup.classList.add("hidden");
  });

  sortCartButton.addEventListener("click", () => {
    sortCart();
  });

  cartPopup.classList.toggle("hidden");
};

  const sortCart = () => {
  cart.sort((a, b) => a.title.localeCompare(b.title));
  updateCartView();
};

  const showCartPopup = () => {
  const cartPopup = document.getElementById("cartPopup");
  const cartItemsList = document.getElementById("cartItemsList");

  cartItemsList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.title}`;

    cartItemsList.appendChild(li);
  });

  toggleCartPopup();
};

const showCartView = () => {
  updateCartView();
  toggleCartPopup();
};

const updateCartCount = (count) => {
  const cartCount = document.querySelector(".cart_count");
  cartCount.textContent = count;

  // ini Untuk Menampilkan Jumlah barang bang
  const cartLink = document.getElementById("cartLink");
  cartLink.innerHTML = `<a href="#"> <span class="cart_count">${count}</span> keranjang</a>`;
};

const showSuccessPopup = (title) => {
  const successPopup = document.getElementById("myModal");
  const successText = document.getElementById("modal-text");

  successText.textContent = `Produk "${title}" berhasil ditambahkan ke keranjang`;
  successPopup.classList.remove("hidden");

  const closeModal = document.getElementById("closeModal");
  closeModal.addEventListener("click", function () {
    successPopup.classList.add("hidden");
  });

  // untuk Menampilkan tampilan keranjang saat di klik bang
const cartLink = document.getElementById("cartLink");
cartLink.addEventListener("click", function () {
  showCartView();
});

const showCartView = () => {
  const cartView = document.getElementById("cartView");
  const closeCartView = document.getElementById("closeCartView");
  const cartItemsView = document.getElementById("cartItemsView");

  // Menampilkan barang yang ada di keranjang di tampilan cart
  updateCartView();

  // Menutup tampilan cart ketika tombol close diklik
  closeCartView.addEventListener("click", function () {
    cartView.classList.add("hidden");
  });
};

const hapusItemDariKeranjang = (index) => {
  cart.splice(index, 1);
  updateCartView();
  updateCartCount(cart.length);
};


const updateCartView = () => {
  const cartView = document.getElementById("cartView");
  const cartItemsView = document.getElementById("cartItemsView");

  // Menampilkan barang yang ada di keranjang di tampilan cart
  cartItemsView.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.title}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.classList.add("bg-orange-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
    deleteButton.setAttribute("data-index", index);
    deleteButton.addEventListener("click", () => {
      hapusItemDariKeranjang(index);
    });

    

    li.appendChild(deleteButton);
    cartItemsView.appendChild(li);
  });

  

  // Menampilkan tampilan cart
  cartView.classList.remove("hidden");
};

};

ambilData();