<template>
  <v-container class="text-center">
    <h1><strong>Welcome to World Redux</strong></h1>
    <br/>
    <h3>A game a casual game of Wordle</h3>
    <v-btn @click="$router.push('/Wordle')" color="primary">Wordle</v-btn>
    <br/>
    <br/>
    <h3>Compete to be the first to guess our wordle of the day</h3>
    <v-btn @click="$router.push('/worldoftheday')" color="primary">Wordle of the day</v-btn>
    <br/>
    <br/>
    <h3>Check out how you stack up against other players</h3>
    <v-btn @click="$router.push('/Leaderboard')" color="primary">Leaderboard</v-btn>
    <br/>
    <br/>
    <h3>See the last 10 wordles of the day</h3>
    <v-btn @click="$router.push('/lasttenwords')" color="primary">Last 10 Wordle of the day</v-btn>
    <br/>
    <br/>
    <h3>Learn more about us</h3>
    <v-btn @click="$router.push('/about')" color="primary">About</v-btn>
    <br/>
    <br/>
    <h3>Want to add a word to our word bank?</h3>
    <v-btn @click="goToWordEditor" color="primary">Word Editor</v-btn>
  </v-container>

  <v-dialog v-model="showLoginRequired" max-width="360">
    <v-card>
      <v-card-title>Sign In Required</v-card-title>
      <v-card-text>You must be signed in to use the Word Editor.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="elevated" @click="openSignIn">Sign In</v-btn>
        <v-btn @click="showLoginRequired = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <SignInDialog v-model="showSignInDialog" />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Services } from '@/scripts/services'
import type { SignInService } from '@/scripts/signInService'
import SignInDialog from '@/components/SignInDialog.vue'

const router = useRouter()
const signInService = inject(Services.SignInService) as SignInService

const showLoginRequired = ref(false)
const showSignInDialog = ref(false)

function goToWordEditor() {
  if (signInService.isSignedIn) {
    router.push('/wordeditor')
  } else {
    showLoginRequired.value = true
  }
}

function openSignIn() {
  showLoginRequired.value = false
  showSignInDialog.value = true
}
</script>
