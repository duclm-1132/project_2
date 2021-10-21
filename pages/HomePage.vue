<template>
  <div class="home-page">
    <Navbar />
    <div>
      <Header />
      <Content />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'
import Content from '../components/Content.vue'
export default {
	components: {
		Header,
		Navbar,
		Content
	}
}
</script>
<style>
.home-page {
	display: flex;
}
</style>