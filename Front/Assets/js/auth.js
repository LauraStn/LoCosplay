const signInBtn = document.querySelector('.signInBtn')
const logBtn = document.querySelector('.logBtn')

const registerMsg = document.querySelector('.registerMsg')
const loginMsg = document.querySelector('.loginMsg')

const registerBtn = document.querySelector('.registerBtn')
const loginBtn = document.querySelector('.loginBtn')

const logoutBtn = document.querySelector('.logoutBtn')
const userDashboardBtn = document.querySelector('.userDashboardBtn')
const adminDashboardBtn = document.querySelector('.adminDashboardBtn')
const cosplayBtn = document.querySelector('.cosplay')

async function register() {
    const first_name = document.querySelector('#first_nameR').value
    const last_name = document.querySelector('#last_nameR').value
    const address = document.querySelector('#addressR').value
    const email = document.querySelector('#emailR').value
    const password = document.querySelector('#passwordR').value

    const newUser = {
        first_name: first_name,
        last_name: last_name,
        address: address,
        email: email,
        password: password,
    }
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newUser),
    }
    const apiRequest = await fetch(
        'http://localhost:4400/user/register',
        request
    )
    const result = await apiRequest.json()
    if (apiRequest.status === 201) {
        registerMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Registration successful, you can now log in</p>`
        setTimeout(() => {
            window.location.href = './login.html'
        }, '3000')
    } else {
        registerMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Wrong credentials !</p>`
        return
    }
}
async function login() {
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let user = {
        email: email,
        password: password,
    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
    }

    let apiRequest = await fetch('http://localhost:4400/user/login', request)
    let result = await apiRequest.json()

    if (apiRequest.status !== 200) {
        loginMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-red-500 font-bold">Invalid credentials</p>`
        return
    } else {
        const data = await result
        window.localStorage.setItem('token', data.jwt)
        window.localStorage.setItem('role_id', data.role_id)

        loginMsg.innerHTML = `<p class="mt-7 text-center rounded-lg text-green-500 font-bold">Login successful,<br>
          you will be redirected to your dashboard</p>`
        if (data.role_id === 1) {
            setTimeout(() => {
                window.location.href = '../../Views/admin/adminDashboard.html'
            }, '3000')
            return
        } else {
            setTimeout(() => {
                window.location.href = '../../Views/user/userDashboard.html'
            }, '3000')
            return
        }
    }
}
if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault()
        register()
    })
}

if (logBtn) {
    logBtn.addEventListener('click', (e) => {
        e.preventDefault()
        login()
    })
}

;(function isConnected() {
    const jwt = localStorage.getItem('token')
    const role_id = localStorage.getItem('role_id')
    if (jwt !== null) {
        if (registerBtn) {
            registerBtn.classList.add('hidden')
        }
        if (loginBtn) {
            loginBtn.classList.add('hidden')
        }
        if (logoutBtn) {
            logoutBtn.classList.remove('hidden')
        }
        if (role_id === '2') {
            userDashboardBtn.classList.remove('hidden')
        } else {
            adminDashboardBtn.classList.remove('hidden')
            if (cosplayBtn) {
                cosplayBtn.classList.add('hidden')
            }
        }
    }
})()

function logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('role_id')
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault
        logout()
        window.alert('Disconnected successfull')
    })
}
