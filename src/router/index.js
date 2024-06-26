import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaintView from "@/views/PaintView.vue";
import SseClientView from "@/views/SseClientView.vue";
import AudioView from "@/views/AudioView.vue";
import AudioSseClient from "@/components/AudioSseClient.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: "/paint",
            name: "PaintView",
            component: PaintView
        },
        {
            path: "/sse",
            name: "SseClientView",
            component: SseClientView
        },
        {
            path: "/audio",
            name: "AudioView",
            component: AudioView
        },
        {
            path: "/sse/audio",
            name: "AudioSseView",
            component: AudioSseClient
        }
    ]
})

export default router
