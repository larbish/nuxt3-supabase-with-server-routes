<template>
  <div>
    <button v-if="!user" @click="login">Login with github</button>
    <div v-else>
      <p>
        User from vue composable: 
      </p>
      <pre>
        {{ user?.email }}
      </pre>
      ------------------------------
      <br>

      <button @click="fetchMeFromServerRoute">Fetch me from server</button>
      <pre>
        {{ userFromServer?.email }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()

let userFromServer = ref(null)

const login = async () => {
  const { error } = await client.auth.signIn({ provider: 'github' })

  if (error) {
    console.error(error)
    return
  }
}

const fetchMeFromServerRoute = async () => {
  const { data } = await useFetch('/api/profile', { key: `me:${user.value.id}` })

  userFromServer.value = data.value
}

</script>
