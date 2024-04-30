const displayCosplays = document.querySelector('.cosplays')
const addCosplayMsg = document.querySelector('.addCosplayMsg')
const addCosplayBtn = document.querySelector('.addCosplayBtn')
const notRented = document.querySelector('.notRented')
const cosplaysAdmin = document.querySelector('.cosplaysAdmin')

async function getAllCosplays() {
    const getAll = await fetch('http://localhost:4400/product/all')
    const result = await getAll.json()

    result.forEach((element) => {
        displayCosplays.innerHTML += `<div class="flex-nowrap w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 p-5">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="flex justify-between mt-2.5 mb-5">
            <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Stock: ${element.stock}</p>
                </div>
                <div class="flex justify-between">
                                <label
                                    for="reservation_start"
                                    class="block text-sm font-medium text-gray-700"
                                    >Reservation start</label
                                >
                                <input
                                    type="date"
                                    name="reservation_start"
                                    class="reservation_start-${element.cosplay_id} mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label
                                    for="reservation_end"
                                    class="block text-sm font-medium text-gray-700"
                                    >Reservation end</label
                                >
                                <input
                                    type="date"
                                    name="reservation_end"
                                    class="reservation_end-${element.cosplay_id} mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                </div>            
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900">$${element.price}</span>
    
    <button href="#" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onclick="rentCosplay(${element.cosplay_id})">Rent</button>
</div>
</div>

    </div> `
    })
}
if (displayCosplays) {
    getAllCosplays()
}

async function addCosplay() {
    const name = document.querySelector('#name').value
    const size = document.querySelector('#size').value
    const price = document.querySelector('#price').value
    const stock = document.querySelector('#stock').value
    const image = document.querySelector('#image').value

    const jwt = localStorage.getItem('token')

    const newCosplay = {
        name: name,
        size: size,
        price: price,
        stock: stock,
        image: image,
    }
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(newCosplay),
    }
    const apiRequest = await fetch('http://localhost:4400/product/add', request)
    const result = await apiRequest.json()
    if (apiRequest.status === 201) {
        addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Created</p>`
        setTimeout(() => {
            window.location.reload()
        }, '3000')
        return
    } else {
        addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Error !</p>`
        return
    }
}

if (addCosplayBtn) {
    addCosplayBtn.addEventListener('click', (e) => {
        e.preventDefault()
        addCosplay()
    })
}

async function getCosplayNotRented() {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiRequest = await fetch(
        'http://localhost:4400/product/notrented',
        request
    )
    const result = await apiRequest.json()
    result.forEach((element) => {
        notRented.innerHTML += `<div class="flex-nowrap w-full max-w-sm bg-white border border-gray-200 rounded-lg     shadow:border-gray-700">
                    <a href="#">
                    <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
                    </a>
                    <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="flex justify-between mt-2.5 mb-5">
                     <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Stock: ${element.stock}</p>
                </div>    
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900">$${element.price}</span>
                </div>
                </div>
                    </div> `
    })
}

if (notRented) {
    getCosplayNotRented()
}
async function getAllCosplaysAdmin() {
    const getAll = await fetch('http://localhost:4400/product/all')
    const result = await getAll.json()
    result.forEach((element) => {
        cosplaysAdmin.innerHTML += `<div class="flex-nowrap w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 p-5">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="flex justify-between mt-2.5 mb-5">
            <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Stock: ${element.stock}</p>
                </div>
                </div>            
    <div class="flex justify-between">
    <span class="text-3xl font-bold text-gray-900">$${element.price}</span>
    <button href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="displayEdit(${element.cosplay_id})">Update</button>
    <button href="#" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onclick="deleteCosplay(${element.cosplay_id})">Delete</button>
</div>
</div>
    </div> `
    })
}

if (cosplaysAdmin) {
    getAllCosplaysAdmin()
}
async function displayEdit(id) {
    const jwt = localStorage.getItem('token')

    const editModal = document.querySelector('#edit')
    const createModal = document.querySelector('.addCosplay')
    document.body.classList.add('backdrop-blur-xl')
    document.body.classList.add('overflow-hidden')
    // editModal.classList.remove('hidden')
    notRented.classList.add('hidden')
    cosplaysAdmin.classList.add('hidden')
    createModal.classList.add('hidden')

    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiRequest = await fetch(
        `http://localhost:4400/product/one/${id}`,
        request
    )
    const [result] = await apiRequest.json()
    console.log(result)
    editModal.innerHTML = `
  <div
    id="editCosplay"
    class="lg:px-28 md:px-32 sm:px-8 lg:py-16 md:py-20 sm:py-6 py-6 px-8 my-auto mx-auto mt-8 sm:20 lg:w-2/5 rounded-lg bg-white border shadow-md max-w-xs md:max-w-none absolute h-[800px] top-16 bottom-0 left-0 right-0 h-auto overflow-auto z-10"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Edit your cosplay</h2>
    <form action="#" method="POST">
                        <div class="mt-4">
                            <label
                                for="editName"
                                class="block text-sm font-medium text-gray-700"
                                >Name</label
                            >
                            <input
                                type="text"
                                id="editName"
                                name="editName"
                                class="mt-1 p-2 w-full border rounded-md"
                                value="${result.name}"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="editPrice"
                                class="block text-sm font-medium text-gray-700"
                                >Price</label
                            >
                            <input
                                type="number"
                                id="editPrice"
                                name="editPrice"
                                class="mt-1 p-2 w-full border rounded-md"
                                value="${result.price}"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="editStock"
                                class="block text-sm font-medium text-gray-700"
                                >Stock</label
                            >
                            <input
                                type="number"
                                id="editStock"
                                name="editStock"
                                class="mt-1 p-2 w-full border rounded-md"
                                value="${result.stock}"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="editImage"
                                class="block text-sm font-medium text-gray-700"
                                >Image</label
                            >
                            <input
                                type="url"
                                id="editImage"
                                name="editImage"
                                class="mt-1 p-2 w-full border rounded-md"
                                value="${result.image}"
                            />
                        </div>
                        <div class="mt-4">
                            <label
                                for="editSize"
                                class="block mb-2 text-sm font-medium text-gray-900 text-gray-400"
                            ></label>
                            <select
                                id="editSize"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option selected>${result.size}</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div class="mt-4">
                            <p class="addCosplayMsg"></p>
                        </div>
                        <div class="mt-6">
                            <button onclick="updateCosplay('${result.cosplay_id}')"
                            id="editBtn"
                            type="button"
                            class="editCosplayBtn w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600">Edit
                            </button>
                        </div>
      <p class="edit-msg"></p>

                    </form>
      </div>
    </form>
  </div>`
}

async function deleteCosplay(id) {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiRequest = await fetch(
        `http://localhost:4400/product/delete/${id}`,
        request
    )
    const result = await apiRequest.json()
    console.log(result)
    window.alert('Cosplay deleted !')
    window.location.reload()
}

async function updateCosplay(id) {
    const jwt = localStorage.getItem('token')

    const name = document.querySelector('#editName').value
    const price = document.querySelector('#editPrice').value
    const stock = document.querySelector('#editStock').value
    const image = document.querySelector('#editImage').value
    const size = document.querySelector('#editSize').value

    const editMsg = document.querySelector('.edit-msg')

    const editCosplay = {
        name: name,
        price: price,
        stock: stock,
        image: image,
        size: size,
    }

    const request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(editCosplay),
    }
    const apiRequest = await fetch(
        `http://localhost:4400/product/update/${id}`,
        request
    )
    const result = await apiRequest.json()
    if (apiRequest.status !== 200) {
        editMsg.innerText = 'Missing fields !'
        return
    }
    editMsg.innerText = 'Product updated !'
    setTimeout(() => {
        window.location.reload()
    }, '2000')
    return
}
