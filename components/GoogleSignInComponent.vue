<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  />
</template>
<script setup lang="ts">
import {
  decodeCredential,
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;
  if (!credential) {
    return;
  }
  const decodedToken = decodeCredential(credential);
  const payload = {
    email: decodedToken.email,
    name: decodedToken.given_name + " " + decodedToken.family_name,
  }
  try {
    const result = await useFetch("/api/user", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  if (result) {
    console.log("User created successfully");
    // Redirect to the home page
  }
  } catch (error: unknown) {
    console.log("Failed to create user"); 
  }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
