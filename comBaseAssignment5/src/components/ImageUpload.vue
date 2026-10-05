<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref } from 'vue'
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
</script>
<template>
    <Uploader :server="uploadeUrl" @change="onChange" :media="media" :max="props.max"></Uploader>
</template>