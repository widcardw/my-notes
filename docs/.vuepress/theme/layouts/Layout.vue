<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables/useDarkMode'
const isDark = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDark" />
    </template>
  </ParentLayout>
</template>
