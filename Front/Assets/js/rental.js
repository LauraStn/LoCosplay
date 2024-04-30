const displayMyRental = document.querySelector('.myrental')
const allRentalActive = document.querySelector('.allRentalActive')
const allRentalArchived = document.querySelector('.allRentArchived')

async function getMyRental() {
    const jwt = localStorage.getItem('token')

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let getAll = await fetch(`http://localhost:4400/rental/mine`, request)
    let result = await getAll.json()

    result.forEach((element) => {
        displayMyRental.innerHTML += `<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Reservation start:${element.reservation_start}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${element.reservation_end}</p>
                </div>
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900"></span>
</div>
</div>
    </div> `
    })
}
if (displayMyRental) {
    getMyRental()
}
async function getAllRentalActive() {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const getAll = await fetch(
        `http://localhost:4400/rental/allactive`,
        request
    )
    const result = await getAll.json()

    result.forEach((element) => {
        allRentalActive.innerHTML += `<div class="flex-nowrap w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <div class="px-5 pb-5">
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">User: ${element.first_name} ${element.last_name}</p>
        </div>
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Reservation start:${element.reservation_start}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${element.reservation_end}</p>
                </div>
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900"></span>
    <button href="#" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onclick="returnCosplay(${element.rental_id})" >Returned</button>
</div>
</div>
    </div> `
    })
}
if (allRentalActive) {
    getAllRentalActive()
}

async function rentCosplay(id) {
    const jwt = localStorage.getItem('token')
    const reservation_start = document.querySelector(
        `.reservation_start-${id}`
    ).value
    const reservation_end = document.querySelector(
        `.reservation_end-${id}`
    ).value

    const newRental = {
        reservation_start: reservation_start,
        reservation_end: reservation_end,
    }
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(newRental),
    }
    const apiRequest = await fetch(
        `http://localhost:4400/rental/add/${id}`,
        request
    )
    const result = await apiRequest.json()
    console.log(result)
    if (apiRequest.status === 201) {
        // addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Created</p>`
        console.log(apiRequest)
        return
    } else {
        // addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Error !</p>`
        return
    }
}

async function returnCosplay(id) {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiRequest = await fetch(
        `http://localhost:4400/rental/update/${id}`,
        request
    )
    const result = await apiRequest.json()
    console.log(result)
    if (apiRequest.status === 201) {
        // addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Created</p>`
        console.log(apiRequest)
        return
    } else {
        // addCosplayMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Error !</p>`
        return
    }
}

async function getAllRentalArchived() {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const getAll = await fetch(
        `http://localhost:4400/rental/allnotactive`,
        request
    )
    const result = await getAll.json()

    result.forEach((element) => {
        allRentalArchived.innerHTML += `<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
                <div class="px-5 pb-5">
                    <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">User: ${element.first_name} ${element.last_name}</p>
                </div>
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${element.image}" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${element.name}</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-xs font-semibold text-left py-0.5 rounded text-blue-800">Reservation start:${element.reservation_start}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${element.reservation_end}</p>
            </div>
           
                <span class="text-3xl font-bold text-red-500">Returned !</span>
           
                                        </div> `
    })
}
if (allRentalArchived) {
    getAllRentalArchived()
}
