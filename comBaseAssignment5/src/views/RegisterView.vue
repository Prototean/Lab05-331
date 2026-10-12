<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
import { useRouter } from 'vue-router'
const router = useRouter()
import { useMessageStore } from '@/stores/message';
const messageStore = useMessageStore()


const validationSchema = yup.object({
    username: yup.string().required('The username is required'),
    firstname: yup.string().required('The first name is required'),
    lastname: yup.string().required('The last name is required'),
    email: yup.string().required('The email is required').email('Input must be an email'),
    password: yup.string().required('The password is required')
        .min(6, 'The password must be at least 6 characters'),
    confirmPassword: yup.string().required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
})
const { errors, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
})
const { value: username } = useField<string>('username')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const onSubmit = handleSubmit((values) => {
    authStore.register(values.username, values.firstname, values.lastname, values.email, values.password)
        .then(() => {
            messageStore.updateMessage('Registration successful, please sign in')
            setTimeout(() => {
                messageStore.resetMessage()
            }, 3000)
            router.push({ name: 'login-view' })
        }).catch(() => {
            messageStore.updateMessage('could not register, the username may already be taken')
            setTimeout(() => {
                messageStore.resetMessage()
            }, 3000)
        })
})
</script>
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="@/assets/logo.svg" alt="CAMT" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new
                account</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit">
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <InputText type="text" v-model="username" placeholder="Username" :error="errors['username']"></InputText>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <InputText type="text" v-model="firstname" placeholder="First name" :error="errors['firstname']"></InputText>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <InputText type="text" v-model="lastname" placeholder="Last name" :error="errors['lastname']"></InputText>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <InputText type="text" v-model="email" placeholder="Email address" :error="errors['email']"></InputText>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <InputText type="password" v-model="password" placeholder="Password" :error="errors['password']"></InputText>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
                    <InputText type="password" v-model="confirmPassword" placeholder="Confirm password" :error="errors['confirmPassword']"></InputText>
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        up</button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                {{ ' ' }}
                <RouterLink :to="{ name: 'login-view' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in
                    here</RouterLink>
            </p>
        </div>
    </div>
</template>
