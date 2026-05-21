import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WordleView from '../views/WordleView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import LastTenWords from '@/views/LastTenWords.vue'
import { Services } from '@/scripts/services'
import { SignInService } from '@/scripts/signInService'
import WordEditor from '@/views/WordEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wordle',
      name: 'wordle',
      component: WordleView
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView
    }
    ,
    {
      path: '/lasttenwords',
      name: 'lastTenWords',
      component: LastTenWords
    },
    {
      path: '/worldoftheday',
      name: 'wordOfTheDay',
      component: WordleView
    },
    {
      path: '/wordeditor',
      name: 'wordEditor',
      component: WordEditor,
      beforeEnter: (to, from, next) => {
        if (SignInService.instance.isSignedIn) next()
        else next({ name: 'home' })
      }
    }
    ,
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/LeaderboardView.vue')
    }
  ]
})

export default router
