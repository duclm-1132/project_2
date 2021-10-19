<template>
  <div class="home-page">
    <TheNavbar />
    <div>
      <TheHeader />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/TheHeader.vue'
import TheNavbar from '../../components/TheNavbar.vue'
import TheContent from '../../components/TheContent.vue'
export default {
	components: {
		TheHeader,
		TheNavbar,
		TheContent
	}
}
</script>
<style>
.home-page {
	display: flex;
}
</style>