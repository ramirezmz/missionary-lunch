<template>
  <div class="flex justify-center items-center h-screen">
    <form class="w-1/3 flex flex-col gap-1" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem class="flex flex-col h-24">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="roberto@mail.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem class="flex flex-col h-24">
        <FormLabel>Senha</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Entrar
    </Button>
    <div class="flex justify-center items-center w-full h-12">
      <GoogleSignInComponent />
    </div>
  </form>
</div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserLoginSchema } from '~/database/User'

const formSchema = toTypedSchema(UserLoginSchema)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>