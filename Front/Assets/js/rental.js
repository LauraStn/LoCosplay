const displayMyRentalActive = document.querySelector('.myRentalActive')
const allRentalActive = document.querySelector('.allRentalActive')
const allRentalArchived = document.querySelector('.allRentArchived')
const displayMyRentalArchived = document.querySelector('.myRentalArchived')

async function getMyRentalActive() {
    const jwt = localStorage.getItem('token')

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let getAll = await fetch(`http://localhost:4400/rental/mineactive`, request)
    let result = await getAll.json()

    result.forEach((element) => {
        displayMyRentalActive.innerHTML += `<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${
                element.image
            }" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${
                    element.name
                }</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation start: ${new Date(
                element.reservation_start
            ).toLocaleDateString('fr-FR')}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${new Date(
                element.reservation_end
            ).toLocaleDateString('fr-FR')}</p>
                </div>
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900"></span>
</div>
</div>
    </div> `
    })
}

if (displayMyRentalActive) {
    getMyRentalActive()
}

async function getMyRentalArchived() {
    const jwt = localStorage.getItem('token')

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    let getAll = await fetch(
        `http://localhost:4400/rental/minearchived`,
        request
    )
    let result = await getAll.json()

    result.forEach((element) => {
        displayMyRentalArchived.innerHTML += `<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${
                element.image
            }" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${
                    element.name
                }</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation start: ${new Date(
                element.reservation_start
            ).toLocaleDateString('fr-FR')}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${new Date(
                element.reservation_end
            ).toLocaleDateString('fr-FR')}}</p>
                </div>
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-red-500">Returned !</span>

    <button href="#" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onclick="deleteRental(${
        element.rental_id
    })">Delete</button>
</div>
</div>
    </div> `
    })
}

if (displayMyRentalArchived) {
    getMyRentalArchived()
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
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">User: ${
                element.first_name
            } ${element.last_name}</p>
        </div>
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${
                element.image
            }" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${
                    element.name
                }</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation start: ${new Date(
                element.reservation_start
            ).toLocaleDateString('fr-FR')}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${new Date(
                element.reservation_end
            ).toLocaleDateString('fr-FR')}</p>
                </div>
    <div class="flex items-center justify-between">
    <span class="text-3xl font-bold text-gray-900"></span>
    <button href="#" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onclick="returnCosplay(${
        element.rental_id
    })" >Returned</button>
</div>
</div>
    </div> `
    })
}

if (allRentalActive) {
    getAllRentalActive()
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
                    <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">User: ${
                        element.first_name
                    } ${element.last_name}</p>
                </div>
        <a href="#">
            <img class="p-8 rounded-t-lg" src="${
                element.image
            }" alt="product image" />
        </a>
            <div class="px-5 pb-5">
                <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900">${
                    element.name
                }</h5>
                </a>
                <div class="mt-2.5 mb-5">

            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation start: ${new Date(
                element.reservation_start
            ).toLocaleDateString('fr-FR')}</p>
            <p class="text-blue-800 text-s font-semibold text-left py-0.5 rounded text-blue-800">Reservation end: ${new Date(
                element.reservation_end
            ).toLocaleDateString('fr-FR')}</p>
            </div>
           
                <span class="text-3xl font-bold text-red-500">Returned !</span>
           
                                        </div> `
    })
}

if (allRentalArchived) {
    getAllRentalArchived()
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
    if (!jwt) {
        window.alert('Please connect for rent !')
        window.location.reload()
        return
    } else {
        if (apiRequest.status === 201) {
            window.alert('Rent successfull !')
            window.location.reload()
            return
        } else {
            window.alert('Choose a date for rent !')
            window.location.reload()
            return
        }
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
    if (apiRequest.status === 200) {
        window.alert('Cosplay deleted !')
        window.location.reload()
        return
    } else {
        window.alert('Error !')
        window.location.reload()
        return
    }
}

async function deleteRental(id) {
    const jwt = localStorage.getItem('token')

    const request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    const apiRequest = await fetch(
        `http://localhost:4400/rental/delete/${id}`,
        request
    )
    const result = await apiRequest.json()
    window.alert('Cosplay deleted !')
    window.location.reload()
}
