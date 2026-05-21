<template>
  <v-sheet>
    <v-card>
      <v-card-title>About</v-card-title>
      <v-card-text>
        <p>
          Wordle Clone is a full-stack recreation of the NYT Wordle game built with Vue 3 +
          TypeScript on the frontend and ASP.NET 7 on the backend.
        </p>
        <p>
          Features include a daily word of the day, random word mode, a leaderboard, account
          creation and sign-in, a word editor for admins, and a valid-word hint list to help when
          you're stuck.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.back()">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
