const loadAllPhones = async (status, searchBox) => {
  document.getElementById("spinner").style.display = "none";

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchBox ? searchBox : "iphone"
    }`
  );
  const data = await res.json();
  if (status === true) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

const displayAllPhone = (phones) => {
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    const { brand, image, phone_name, slug } = phone;

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-xl my-10">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
   <p>${brand}</p>
   <p class="hidden">${slug}</p>
   
    <h2 class="card-title">${phone_name}</h2>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary bg-blue-500 border-none">Show Details</button>
    </div>
  </div>
</div>`;

    phoneContainer.appendChild(div);
  });
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchBox = document.getElementById("search-box").value.trim();
  setTimeout(() => {
    loadAllPhones(false, searchBox);
  });
};

const handleShowAll = () => {
  loadAllPhones(true);
};

const phoneDetails = async (slug) => {
  const modalContainer = document.getElementById("modal-container");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  console.log(data.data);

  const {
    name,
    mainFeatures: { chipSet, displaySize, memory, storage },
    releaseDate,
  } = data.data;

  modalContainer.innerHTML = `
     <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="text-lg font-bold">${name}</h3>
          <h4  class = "mt-4 text-[18px] font-semibold"> Main Feature </h4>
          <p class="py-1 "><span class="font-semibold text-[17px]" >Chipset</span> : ${chipSet}</p>
          <p class="py-1 "><span class="font-semibold text-[17px]" >Display</span> : ${displaySize}</p>
          <p class="py-1 "><span class="font-semibold text-[17px]" >Memory</span>: ${memory}</p>
          <p class="py-1 "><span class="font-semibold text-[17px]" >Storage</span> : ${storage}</p>
          <p class="py-1 "> ${releaseDate}</p>
        </div>
      </dialog>`;
  my_modal_3.showModal();
};
