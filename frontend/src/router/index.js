import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import AppLayout from '../components/AppLayout.vue';
import Dashboard from '../pages/Dashboard.vue';
import Result from '../pages/Result.vue';
import KelolaUser from '../pages/User.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import KelolaAgen from '../pages/Agen.vue';
import KelolaTerminal from '../pages/Terminal.vue';
import KelolaRute from '../pages/Rute.vue';
import KelolaFasilitas from '../pages/Fasilitas.vue';
import KelolaBus from '../pages/Bus.vue';
import KelolaTiket from '../pages/Tiket.vue';
import KelolaKursi from '../pages/Kursi.vue';
import KelolaTransaksi from '../pages/Transaksi.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
            { path: 'result', component: Result, meta: { requiresAuth: true }, name: 'result' },
            {
                path: 'kelola-user',
                component: KelolaUser,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-agen',
                component: KelolaAgen,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-terminal',
                component: KelolaTerminal,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-rute',
                component: KelolaRute,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-fasilitas',
                component: KelolaFasilitas,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-bus',
                component: KelolaBus,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-tiket',
                component: KelolaTiket,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-kursi',
                component: KelolaKursi,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            },
            {
                path: 'kelola-transaksi',
                component: KelolaTransaksi,
                meta: { requiresAuth: true, role: 'admin' } // Hanya admin yang bisa akses
            }
        ]
    }
];

// Middleware untuk pemeriksaan otorisasi
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.name); // Tambahkan ini

    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = isAuthenticated ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).role : null;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        console.log('Redirecting to login because user is not authenticated');
        next('/login');
    } else if (to.matched.some(record => record.meta.role) && userRole !== to.meta.role) {
        if (userRole === 'admin') {
            next('/dashboard');
        } else {
            next('/result');
        }
    } else {
        next();
    }
});



export default router;
