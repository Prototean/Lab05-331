<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
interface UploadMedia {
    name: string
    url?: string
    size?: number
    type?: string
}
const modelVaule = defineModel<string[]>({
    default: () => [],
})


const props = withDefaults(defineProps<{ max?: number }>(), {
    max: undefined,
})
const convertStringToMedia = (str: string[]): UploadMedia[] => {
    return str.map((element) => {
        return {
            name: element,
        }
    })
}

const convertMediaToString = (media: UploadMedia[]) : string[] => {
    const output : string[] = []
    media.forEach((element)=> {
        output.push(element.name)
    })
    return output
}
const media = ref<UploadMedia[]>(convertStringToMedia(modelVaule.value))
const uploadeUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChange = (files: UploadMedia[]): void => {
    modelVaule.value = convertMediaToString(files)
}

const authorizeHeader = computed(() => {
    return { Authorization: authStore.authorizationHeader }
})

</script>
<template>
    <Uploader :server="uploadeUrl" @change="onChange" :media="media" :max="props.max" :headers="authorizeHeader"></Uploader>
</template>